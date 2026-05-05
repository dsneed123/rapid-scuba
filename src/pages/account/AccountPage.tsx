import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ApiError } from '@/lib/api'
import * as api from '@/lib/api'

const TOKENS = {
  bg: '#f8fafc',
  panel: '#ffffff',
  panelMuted: '#f9fafb',
  border: '#e5e7eb',
  borderSoft: '#f3f4f6',
  text: '#0f172a',
  textMuted: '#64748b',
  textSubtle: '#94a3b8',
  accent: '#0ea5e9',
  shadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)',
  shadowSoft: '0 1px 2px rgba(15,23,42,0.04)',
}

const STATUS_META: Record<
  string,
  { label: string; bg: string; fg: string; dot: string }
> = {
  new: { label: 'New', bg: '#eff6ff', fg: '#1d4ed8', dot: '#3b82f6' },
  contacted: { label: 'Contacted', bg: '#ecfeff', fg: '#0e7490', dot: '#06b6d4' },
  scheduled: { label: 'Scheduled', bg: '#fef3c7', fg: '#92400e', dot: '#f59e0b' },
  completed: { label: 'Completed', bg: '#dcfce7', fg: '#166534', dot: '#10b981' },
  archived: { label: 'Archived', bg: '#f1f5f9', fg: '#475569', dot: '#94a3b8' },
}

function StatusPill({ status, label }: { status: string; label: string }) {
  const m = STATUS_META[status] ?? STATUS_META.new
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: m.bg,
        color: m.fg,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: m.dot,
        }}
      />
      {label}
    </span>
  )
}

function fmtMoney(amount: string | null): string | null {
  if (!amount) return null
  const n = Number(amount)
  if (!Number.isFinite(n)) return null
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  })
}

function fmtScheduled(iso: string): {
  weekday: string
  date: string
  time: string
} {
  const d = new Date(iso)
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: 'long' }),
    date: d.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }),
  }
}

export function AccountPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState<api.MyRequest[] | null>(null)
  const [tab, setTab] = useState<'overview' | 'history' | 'settings'>(
    'overview',
  )

  useEffect(() => {
    if (loading) return
    if (!user) {
      navigate('/login', { state: { from: '/account' }, replace: true })
      return
    }
    api.fetchMyRequests().then((r) => setRequests(r.requests))
  }, [loading, user, navigate])

  const { upcoming, past, active } = useMemo(() => {
    const list = requests ?? []
    const now = Date.now()
    const upcoming = list
      .filter(
        (r) =>
          r.scheduledAt && new Date(r.scheduledAt).getTime() > now,
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledAt!).getTime() -
          new Date(b.scheduledAt!).getTime(),
      )
    const past = list.filter(
      (r) =>
        (r.scheduledAt && new Date(r.scheduledAt).getTime() <= now) ||
        r.status === 'completed' ||
        r.status === 'archived',
    )
    const active = list.filter(
      (r) =>
        !past.includes(r) &&
        !upcoming.includes(r),
    )
    return { upcoming, past, active }
  }, [requests])

  if (loading || !user) {
    return (
      <section className="page-content" style={{ background: TOKENS.bg }}>
        <div className="container">Loading…</div>
      </section>
    )
  }

  const totalSpend = (requests ?? []).reduce(
    (s, r) => s + (r.quotedAmount ? Number(r.quotedAmount) : 0),
    0,
  )

  return (
    <section className="page-content" style={{ background: TOKENS.bg, paddingTop: 28 }}>
      <div className="container" style={{ maxWidth: 920 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: TOKENS.text,
              }}
            >
              Welcome back, {user.first_name || user.email.split('@')[0]}
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: 4,
                color: TOKENS.textMuted,
                fontSize: 14,
              }}
            >
              {user.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {user.is_staff && (
              <Link to="/staff" className="btn btn--primary" style={{ fontSize: 14 }}>
                Staff dashboard
              </Link>
            )}
            <button
              type="button"
              className="btn"
              onClick={() => logout().then(() => navigate('/'))}
              style={{ fontSize: 14 }}
            >
              Log out
            </button>
          </div>
        </div>

        {/* Hero appointment card */}
        {upcoming.length > 0 ? (
          <UpcomingHero appt={upcoming[0]} />
        ) : (
          <EmptyHero />
        )}

        {/* Tab strip */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: TOKENS.panel,
            border: `1px solid ${TOKENS.border}`,
            borderRadius: 12,
            padding: 4,
            marginBottom: '1.5rem',
            boxShadow: TOKENS.shadowSoft,
            width: 'fit-content',
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'history', label: 'History' },
              { id: 'settings', label: 'Settings' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                padding: '8px 16px',
                background: tab === t.id ? TOKENS.accent : 'transparent',
                color: tab === t.id ? 'white' : TOKENS.textMuted,
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <OverviewTab
            upcoming={upcoming}
            active={active}
            past={past}
            totalSpend={totalSpend}
          />
        )}
        {tab === 'history' && <HistoryList requests={past} />}
        {tab === 'settings' && <SettingsPanel />}
      </div>
    </section>
  )
}

// ───── Hero blocks ─────

function UpcomingHero({ appt }: { appt: api.MyRequest }) {
  const t = fmtScheduled(appt.scheduledAt!)
  const cost = fmtMoney(appt.quotedAmount)
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #38bdf8 100%)',
        color: 'white',
        borderRadius: 18,
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: '0 12px 40px rgba(14,165,233,0.32)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -60,
          top: -60,
          width: 240,
          height: 240,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0.85,
          marginBottom: 10,
        }}
      >
        Your next appointment
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 6,
          lineHeight: 1.15,
        }}
      >
        {t.weekday}, {t.date}
      </div>
      <div
        style={{ fontSize: 18, fontWeight: 600, opacity: 0.95, marginBottom: 14 }}
      >
        {t.time} · {appt.service || 'Service'}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          fontSize: 14,
          opacity: 0.95,
        }}
      >
        {appt.location && (
          <span>
            <span style={{ opacity: 0.7, marginRight: 6 }}>📍</span>
            {appt.location}
          </span>
        )}
        <span>
          <span style={{ opacity: 0.7, marginRight: 6 }}>⏱</span>
          {appt.scheduledDurationMinutes} min
        </span>
        {cost && (
          <span style={{ fontWeight: 700 }}>
            <span style={{ opacity: 0.7, marginRight: 6, fontWeight: 400 }}>
              💵
            </span>
            {cost}
          </span>
        )}
      </div>
    </div>
  )
}

function EmptyHero() {
  return (
    <div
      style={{
        background: TOKENS.panel,
        border: `1px dashed ${TOKENS.border}`,
        borderRadius: 14,
        padding: '1.75rem',
        marginBottom: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>🤿</div>
      <h2 style={{ margin: 0, marginBottom: 6, fontSize: 20, fontWeight: 700 }}>
        No upcoming appointments
      </h2>
      <p
        style={{
          margin: 0,
          marginBottom: 16,
          color: TOKENS.textMuted,
          fontSize: 14,
        }}
      >
        Submit a quote request and we'll get you on the schedule.
      </p>
      <Link to="/contact" className="btn btn--primary">
        Request a quote
      </Link>
    </div>
  )
}

// ───── Overview tab ─────

function OverviewTab({
  upcoming,
  active,
  past,
  totalSpend,
}: {
  upcoming: api.MyRequest[]
  active: api.MyRequest[]
  past: api.MyRequest[]
  totalSpend: number
}) {
  return (
    <>
      {/* Stat strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: '1.5rem',
        }}
      >
        <StatTile label="Upcoming" value={upcoming.length} accent="#0ea5e9" />
        <StatTile label="In progress" value={active.length} accent="#f59e0b" />
        <StatTile label="Completed" value={past.length} accent="#10b981" />
        <StatTile
          label="Total spent"
          value={
            totalSpend > 0
              ? totalSpend.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })
              : '—'
          }
          accent="#8b5cf6"
        />
      </div>

      {/* Upcoming section */}
      {upcoming.length > 1 && (
        <Section title="Other upcoming">
          {upcoming.slice(1).map((r) => (
            <UpcomingCard key={r.id} appt={r} />
          ))}
        </Section>
      )}

      {/* Active section */}
      {active.length > 0 && (
        <Section title="In progress">
          {active.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </Section>
      )}

      {/* If everything else is empty, show recent past */}
      {upcoming.length === 0 && active.length === 0 && past.length > 0 && (
        <Section title="Recent">
          {past.slice(0, 3).map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </Section>
      )}

      {upcoming.length === 0 &&
        active.length === 0 &&
        past.length === 0 && (
          <p style={{ color: TOKENS.textMuted, textAlign: 'center', padding: '2rem' }}>
            No requests yet.{' '}
            <Link to="/contact" style={{ color: TOKENS.accent }}>
              Submit one
            </Link>
            .
          </p>
        )}
    </>
  )
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string
  value: number | string
  accent: string
}) {
  return (
    <div
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.border}`,
        borderRadius: 14,
        padding: '1rem 1.25rem',
        boxShadow: TOKENS.shadowSoft,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: accent,
        }}
      />
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: TOKENS.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: TOKENS.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <h3
        style={{
          margin: 0,
          marginBottom: 10,
          fontSize: 15,
          fontWeight: 700,
          color: TOKENS.text,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'grid', gap: 10 }}>{children}</div>
    </div>
  )
}

function UpcomingCard({ appt }: { appt: api.MyRequest }) {
  const t = fmtScheduled(appt.scheduledAt!)
  const cost = fmtMoney(appt.quotedAmount)
  return (
    <div
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.border}`,
        borderLeft: `4px solid ${STATUS_META.scheduled.dot}`,
        borderRadius: 12,
        padding: '14px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
        boxShadow: TOKENS.shadowSoft,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: TOKENS.text,
          }}
        >
          {t.weekday}, {t.date} · {t.time}
        </div>
        <div style={{ fontSize: 13, color: TOKENS.textMuted, marginTop: 2 }}>
          {appt.service || 'Service'}
          {appt.location && ` · ${appt.location}`}
        </div>
      </div>
      {cost && (
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: TOKENS.text,
          }}
        >
          {cost}
        </span>
      )}
    </div>
  )
}

function RequestCard({ request }: { request: api.MyRequest }) {
  const cost = fmtMoney(request.quotedAmount)
  return (
    <div
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.border}`,
        borderRadius: 12,
        padding: '14px 18px',
        boxShadow: TOKENS.shadowSoft,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 8,
          flexWrap: 'wrap',
        }}
      >
        <strong style={{ fontSize: 15, color: TOKENS.text }}>
          {request.service || 'General request'}
        </strong>
        <StatusPill status={request.status} label={request.statusDisplay} />
      </div>
      {request.scheduledAt && (
        <div
          style={{
            fontSize: 13,
            color: STATUS_META.scheduled.fg,
            background: STATUS_META.scheduled.bg,
            padding: '4px 10px',
            borderRadius: 6,
            display: 'inline-block',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          📅 {new Date(request.scheduledAt).toLocaleString()}
        </div>
      )}
      {request.message && (
        <div
          style={{
            color: TOKENS.text,
            fontSize: 14,
            marginBottom: 8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {request.message}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 13,
          color: TOKENS.textMuted,
          paddingTop: 8,
          borderTop: `1px solid ${TOKENS.borderSoft}`,
        }}
      >
        {request.location && <span>📍 {request.location}</span>}
        <span>
          Submitted {new Date(request.createdAt).toLocaleDateString()}
        </span>
        {cost && (
          <span
            style={{
              marginLeft: 'auto',
              color: TOKENS.text,
              fontWeight: 700,
            }}
          >
            {cost}
          </span>
        )}
      </div>
    </div>
  )
}

// ───── History tab ─────

function HistoryList({ requests }: { requests: api.MyRequest[] }) {
  if (requests.length === 0) {
    return (
      <p style={{ color: TOKENS.textMuted, textAlign: 'center', padding: '2rem' }}>
        No past requests yet.
      </p>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {requests.map((r) => (
        <RequestCard key={r.id} request={r} />
      ))}
    </div>
  )
}

// ───── Settings tab (unchanged but restyled) ─────

function SettingsPanel() {
  const { user, updateProfile, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [first, setFirst] = useState(user?.first_name ?? '')
  const [last, setLast] = useState(user?.last_name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  if (!user) return null

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setSavedMsg(null)
    const payload: api.ProfileUpdate = {}
    if (first !== user.first_name) payload.firstName = first
    if (last !== user.last_name) payload.lastName = last
    if (email !== user.email) payload.email = email
    if (newPwd) {
      payload.password = newPwd
      payload.currentPassword = currentPwd
    }
    if (Object.keys(payload).length === 0) {
      setSaving(false)
      return
    }
    try {
      await updateProfile(payload)
      setNewPwd('')
      setCurrentPwd('')
      setSavedMsg('Saved.')
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        setErrors(err.fieldErrors)
      } else {
        setErrors({ _: 'Save failed. Try again.' })
      }
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async () => {
    setDeleting(true)
    try {
      await deleteAccount()
      navigate('/', { replace: true })
    } catch {
      setDeleting(false)
      setErrors({ _: 'Delete failed. Try again.' })
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${TOKENS.border}`,
    borderRadius: 10,
    fontSize: 14,
    outline: 'none',
    background: TOKENS.panel,
  }

  return (
    <div style={{ display: 'grid', gap: 20, maxWidth: 560 }}>
      <form
        onSubmit={onSave}
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.border}`,
          borderRadius: 14,
          padding: '1.5rem',
          boxShadow: TOKENS.shadowSoft,
          display: 'grid',
          gap: 14,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Profile
        </h2>

        <div>
          <label style={labelStyle}>First name</label>
          <input
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            style={inputStyle}
          />
          {errors.firstName && (
            <div style={errorStyle}>{errors.firstName}</div>
          )}
        </div>

        <div>
          <label style={labelStyle}>Last name</label>
          <input
            value={last}
            onChange={(e) => setLast(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div
          style={{
            paddingTop: 12,
            borderTop: `1px solid ${TOKENS.borderSoft}`,
          }}
        >
          <h3 style={{ margin: 0, marginBottom: 12, fontSize: 14 }}>
            Change password
          </h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <div>
              <label style={labelStyle}>Current password</label>
              <input
                type="password"
                autoComplete="current-password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                style={inputStyle}
              />
              {errors.currentPassword && (
                <div style={errorStyle}>{errors.currentPassword}</div>
              )}
            </div>
            <div>
              <label style={labelStyle}>New password</label>
              <input
                type="password"
                autoComplete="new-password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                style={inputStyle}
              />
              {errors.password && (
                <div style={errorStyle}>{errors.password}</div>
              )}
            </div>
          </div>
        </div>

        {errors._ && <div className="form-error-banner">{errors._}</div>}
        {savedMsg && (
          <div
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: '#dcfce7',
              color: '#166534',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ✓ {savedMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={saving}
          style={{ alignSelf: 'flex-start' }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <div
        style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 14,
          padding: '1.5rem',
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 6, color: '#991b1b', fontSize: 16 }}>
          Danger zone
        </h2>
        <p style={{ color: '#7f1d1d', fontSize: 14, margin: 0, marginBottom: 12 }}>
          Permanently delete your account. Past requests stay in our records
          (unlinked from you), but you'll lose access to track them.
        </p>
        {!confirmDelete ? (
          <button
            type="button"
            className="btn"
            style={{ background: '#dc2626', color: 'white', border: 'none' }}
            onClick={() => setConfirmDelete(true)}
          >
            Delete account
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: '#991b1b' }}>
              Are you sure?
            </span>
            <button
              type="button"
              className="btn"
              style={{ background: '#dc2626', color: 'white', border: 'none' }}
              disabled={deleting}
              onClick={onDelete}
            >
              {deleting ? 'Deleting…' : 'Yes, delete forever'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  color: TOKENS.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 4,
}

const errorStyle: React.CSSProperties = {
  marginTop: 4,
  color: '#dc2626',
  fontSize: 13,
}
