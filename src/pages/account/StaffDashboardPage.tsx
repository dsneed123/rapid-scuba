import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAuth } from '@/contexts/AuthContext'
import * as api from '@/lib/api'

// ───── Design tokens ─────

const TOKENS = {
  bg: '#f8fafc',
  panel: '#ffffff',
  panelMuted: '#f9fafb',
  border: '#e5e7eb',
  borderSoft: '#f3f4f6',
  text: '#111827',
  textMuted: '#6b7280',
  textSubtle: '#9ca3af',
  accent: '#0ea5e9',
  accentHover: '#0284c7',
  shadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)',
  shadowSoft: '0 1px 2px rgba(15,23,42,0.04)',
  shadowHover: '0 4px 16px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04)',
}

const CHART_COLORS = [
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#6366f1',
  '#84cc16',
]

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

const STATUS_ORDER = ['new', 'contacted', 'scheduled', 'completed', 'archived']

const STATUS_OPTIONS = STATUS_ORDER.map((v) => ({
  value: v,
  label: STATUS_META[v].label,
}))

// ───── Reusable bits ─────

const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: TOKENS.panel,
  border: `1px solid ${TOKENS.border}`,
  borderRadius: 14,
  padding: '1.25rem',
  boxShadow: TOKENS.shadow,
  ...extra,
})

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={card()}>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: TOKENS.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {value.toLocaleString()}
      </div>
      <div
        style={{
          fontSize: 12,
          color: TOKENS.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
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
        letterSpacing: '0.02em',
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
      {m.label}
    </span>
  )
}

function shortDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

type Tab = 'tickets' | 'calendar' | 'overview' | 'analytics'

export function StaffDashboardPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState<api.DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('tickets')

  const reloadDashboard = async () => {
    try {
      setData(await api.fetchDashboard())
    } catch {
      setError('Failed to load dashboard data.')
    }
  }

  useEffect(() => {
    if (loading) return
    if (!user) {
      navigate('/login', { state: { from: '/staff' }, replace: true })
      return
    }
    if (!user.is_staff) {
      navigate('/account', { replace: true })
      return
    }
    let cancelled = false
    const load = async () => {
      try {
        const d = await api.fetchDashboard()
        if (!cancelled) setData(d)
      } catch {
        if (!cancelled) setError('Failed to load dashboard data.')
      }
    }
    load()
    const interval = setInterval(load, 30_000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [loading, user, navigate])

  if (loading || !user) {
    return (
      <section className="page-content" style={{ background: TOKENS.bg }}>
        <div className="container">Loading…</div>
      </section>
    )
  }
  if (!user.is_staff) return null

  if (error) {
    return (
      <section className="page-content" style={{ background: TOKENS.bg }}>
        <div className="container">
          <div className="form-error-banner">{error}</div>
        </div>
      </section>
    )
  }
  if (!data) {
    return (
      <section className="page-content" style={{ background: TOKENS.bg }}>
        <div className="container">Loading dashboard…</div>
      </section>
    )
  }

  return (
    <section className="page-content" style={{ background: TOKENS.bg }}>
      <div className="container" style={{ maxWidth: 1320 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Staff dashboard
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: 4,
                color: TOKENS.textMuted,
                fontSize: 14,
              }}
            >
              Manage tickets, schedule appointments, and review performance.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/account" className="btn">
              My account
            </Link>
            <a href="/admin/" className="btn btn--primary">
              Django admin
            </a>
          </div>
        </div>

        {/* Stat strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginBottom: '1.5rem',
          }}
        >
          <StatCard label="Total requests" value={data.totals.requests} />
          <StatCard label="New (unworked)" value={data.totals.new} />
          <StatCard label="Scheduled" value={data.totals.scheduled} />
          <StatCard label="Completed" value={data.totals.completed} />
        </div>

        {/* Tab bar */}
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
          {(['tickets', 'calendar', 'overview', 'analytics'] as const).map(
            (t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                style={{
                  padding: '8px 16px',
                  background: tab === t ? TOKENS.accent : 'transparent',
                  color: tab === t ? 'white' : TOKENS.textMuted,
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </button>
            ),
          )}
        </div>

        {tab === 'tickets' && <TicketsTab onChange={reloadDashboard} />}
        {tab === 'calendar' && <CalendarTab />}
        {tab === 'overview' && <OverviewTab data={data} />}
        {tab === 'analytics' && <AnalyticsTab data={data} />}
      </div>
    </section>
  )
}

// ───── Tab: TICKETS (the main workspace) ─────

function TicketsTab({ onChange }: { onChange: () => Promise<void> }) {
  const [tickets, setTickets] = useState<api.ActivityRow[] | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('') // '' = all
  const [view, setView] = useState<'kanban' | 'list'>('kanban')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [creating, setCreating] = useState(false)

  // Debounce search to avoid a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(search), 250)
    return () => clearTimeout(t)
  }, [search])

  const reload = async () => {
    const data = await api.fetchTickets({
      status: statusFilter || undefined,
      q: debouncedQ || undefined,
    })
    setTickets(data.tickets)
  }

  useEffect(() => {
    let cancelled = false
    api
      .fetchTickets({
        status: statusFilter || undefined,
        q: debouncedQ || undefined,
      })
      .then((d) => {
        if (!cancelled) setTickets(d.tickets)
      })
    return () => {
      cancelled = true
    }
  }, [statusFilter, debouncedQ])

  const handleChange = async () => {
    await Promise.all([reload(), onChange()])
  }

  return (
    <>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: 420,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: TOKENS.textSubtle,
              pointerEvents: 'none',
              fontSize: 14,
            }}
          >
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, location, message…"
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              border: `1px solid ${TOKENS.border}`,
              borderRadius: 10,
              fontSize: 14,
              background: TOKENS.panel,
              outline: 'none',
              boxShadow: TOKENS.shadowSoft,
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = TOKENS.accent
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(14,165,233,0.15)`
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = TOKENS.border
              e.currentTarget.style.boxShadow = TOKENS.shadowSoft
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 4,
            background: TOKENS.panel,
            border: `1px solid ${TOKENS.border}`,
            borderRadius: 10,
            padding: 3,
            boxShadow: TOKENS.shadowSoft,
            marginLeft: 'auto',
          }}
        >
          {(['kanban', 'list'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              style={{
                padding: '6px 12px',
                background: view === v ? TOKENS.text : 'transparent',
                color: view === v ? 'white' : TOKENS.textMuted,
                border: 'none',
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCreating(true)}
          style={{
            background: TOKENS.accent,
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 1px 4px rgba(14,165,233,0.4)',
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>＋</span>
          New ticket
        </button>
      </div>

      {/* Status filter chips */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 16,
        }}
      >
        <FilterChip
          label="All"
          active={statusFilter === ''}
          onClick={() => setStatusFilter('')}
          count={tickets?.length}
        />
        {STATUS_OPTIONS.map((s) => {
          const count = tickets?.filter((t) => t.status === s.value).length
          return (
            <FilterChip
              key={s.value}
              label={s.label}
              active={statusFilter === s.value}
              onClick={() =>
                setStatusFilter(statusFilter === s.value ? '' : s.value)
              }
              count={statusFilter === s.value ? tickets?.length : count}
              accentDot={STATUS_META[s.value].dot}
            />
          )
        })}
      </div>

      {tickets === null ? (
        <p style={{ color: TOKENS.textMuted }}>Loading tickets…</p>
      ) : tickets.length === 0 ? (
        <div
          style={{
            ...card(),
            textAlign: 'center',
            padding: '3rem',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
          <h3 style={{ margin: 0, marginBottom: 6 }}>No tickets match</h3>
          <p style={{ color: TOKENS.textMuted, margin: 0 }}>
            {search || statusFilter
              ? 'Try clearing the filters.'
              : 'Customer requests will appear here.'}
          </p>
        </div>
      ) : view === 'kanban' ? (
        <KanbanBoard tickets={tickets} onChange={handleChange} />
      ) : (
        <ListView tickets={tickets} onChange={handleChange} />
      )}

      {creating && (
        <CreateTicketDrawer
          onClose={() => setCreating(false)}
          onCreated={async () => {
            setCreating(false)
            await handleChange()
          }}
        />
      )}
    </>
  )
}

function CreateTicketDrawer({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: () => Promise<void>
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [vesselLength, setVesselLength] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('new')
  const [scheduledAtLocal, setScheduledAtLocal] = useState('')
  const [duration, setDuration] = useState('120')
  const [quotedAmount, setQuotedAmount] = useState('')
  const [staffNotes, setStaffNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setErrors({})
    try {
      await api.staffCreateTicket({
        name,
        email,
        phone,
        service: service || undefined,
        vesselLength: vesselLength || undefined,
        location: location || undefined,
        message: message || undefined,
        status,
        scheduledAt: scheduledAtLocal
          ? new Date(scheduledAtLocal).toISOString()
          : null,
        scheduledDurationMinutes: Number(duration) || 120,
        quotedAmount: quotedAmount.trim() === '' ? null : quotedAmount.trim(),
        staffNotes: staffNotes || undefined,
      })
      await onCreated()
    } catch (err) {
      const fe =
        err && typeof err === 'object' && 'fieldErrors' in err
          ? (err as { fieldErrors?: Record<string, string> }).fieldErrors
          : undefined
      if (fe) setErrors(fe)
      else setErrors({ _: 'Failed to create ticket. Try again.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      role="dialog"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 100%)',
          background: TOKENS.panel,
          height: '100%',
          overflowY: 'auto',
          padding: '1.5rem',
          boxShadow: '-8px 0 32px rgba(15,23,42,0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              New ticket
            </h2>
            <div style={{ fontSize: 13, color: TOKENS.textMuted, marginTop: 2 }}>
              Walk-up customer or phone-in. They'll see this if they sign up
              with the same email.
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              border: 'none',
              background: TOKENS.borderSoft,
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: 16,
              color: TOKENS.textMuted,
            }}
          >
            ✕
          </button>
        </div>

        <Field label="Customer name *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </Field>

        <div style={twoCol}>
          <Field label="Email *">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>
          <Field label="Phone *">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={inputStyle}
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </Field>
        </div>

        <div style={twoCol}>
          <Field label="Service">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={inputStyle}
            >
              <option value="">—</option>
              <option value="hull-cleaning">Hull cleaning</option>
              <option value="propeller-polishing">Propeller polishing</option>
              <option value="inspection">Hull inspection</option>
              <option value="zinc-anode">Zinc anode replacement</option>
              <option value="boat-repair">Boat repair</option>
              <option value="underwater-welding">Underwater welding</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Vessel length">
            <select
              value={vesselLength}
              onChange={(e) => setVesselLength(e.target.value)}
              style={inputStyle}
            >
              <option value="">—</option>
              <option value="under-30">Under 30 ft</option>
              <option value="31-60">31–60 ft</option>
              <option value="61-plus">61 ft+</option>
            </select>
          </Field>
        </div>

        <Field label="Location / marina">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Shilshole Bay, slip C-42"
            style={inputStyle}
          />
        </Field>

        <Field label="Message / details">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            style={{ ...inputStyle, fontFamily: 'inherit' }}
          />
        </Field>

        <div
          style={{
            paddingTop: 8,
            marginTop: 4,
            borderTop: `1px solid ${TOKENS.borderSoft}`,
          }}
        >
          <SectionTitle>Scheduling</SectionTitle>
          <div style={twoCol}>
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={inputStyle}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Quoted amount (USD)">
              <input
                type="number"
                min={0}
                step={0.01}
                value={quotedAmount}
                onChange={(e) => setQuotedAmount(e.target.value)}
                placeholder="e.g. 750"
                style={inputStyle}
              />
            </Field>
          </div>
          <div style={twoCol}>
            <Field label="Scheduled at">
              <input
                type="datetime-local"
                value={scheduledAtLocal}
                onChange={(e) => setScheduledAtLocal(e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label="Duration (minutes)">
              <input
                type="number"
                min={0}
                max={1440}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={inputStyle}
              />
            </Field>
          </div>
        </div>

        <Field label="Staff notes (internal)">
          <textarea
            value={staffNotes}
            onChange={(e) => setStaffNotes(e.target.value)}
            rows={3}
            style={{ ...inputStyle, fontFamily: 'inherit' }}
          />
        </Field>

        {errors._ && <div className="form-error-banner">{errors._}</div>}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            marginTop: 8,
            paddingTop: 16,
            borderTop: `1px solid ${TOKENS.borderSoft}`,
          }}
        >
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="btn btn--primary"
          >
            {busy ? 'Creating…' : 'Create ticket'}
          </button>
        </div>
      </form>
    </div>
  )
}

const twoCol: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 12,
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 4, color: '#dc2626', fontSize: 13 }}>{children}</div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
  count,
  accentDot,
}: {
  label: string
  active: boolean
  onClick: () => void
  count?: number
  accentDot?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 999,
        border: `1px solid ${active ? TOKENS.text : TOKENS.border}`,
        background: active ? TOKENS.text : TOKENS.panel,
        color: active ? 'white' : TOKENS.text,
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {accentDot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: accentDot,
          }}
        />
      )}
      {label}
      {count !== undefined && (
        <span
          style={{
            color: active ? 'rgba(255,255,255,0.7)' : TOKENS.textSubtle,
            fontWeight: 500,
            fontSize: 12,
          }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

function KanbanBoard({
  tickets,
  onChange,
}: {
  tickets: api.ActivityRow[]
  onChange: () => Promise<void>
}) {
  const columns = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      status,
      meta: STATUS_META[status],
      items: tickets.filter((t) => t.status === status),
    }))
  }, [tickets])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      {columns.map((col) => (
        <div
          key={col.status}
          style={{
            background: col.meta.bg,
            border: `1px solid ${TOKENS.border}`,
            borderRadius: 14,
            padding: 12,
            minHeight: 200,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              padding: '0 4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: col.meta.dot,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: col.meta.fg,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {col.meta.label}
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: col.meta.fg,
                background: 'rgba(255,255,255,0.7)',
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              {col.items.length}
            </span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {col.items.length === 0 ? (
              <div
                style={{
                  fontSize: 12,
                  color: TOKENS.textSubtle,
                  textAlign: 'center',
                  padding: '20px 8px',
                  fontStyle: 'italic',
                }}
              >
                No tickets
              </div>
            ) : (
              col.items.map((t) => (
                <KanbanCard key={t.id} ticket={t} onChange={onChange} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function KanbanCard({
  ticket,
  onChange,
}: {
  ticket: api.ActivityRow
  onChange: () => Promise<void>
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          textAlign: 'left',
          background: 'white',
          border: `1px solid ${TOKENS.border}`,
          borderRadius: 10,
          padding: 12,
          cursor: 'pointer',
          boxShadow: TOKENS.shadowSoft,
          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
          display: 'block',
          width: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = TOKENS.shadowHover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = TOKENS.shadowSoft
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 4,
            color: TOKENS.text,
          }}
        >
          {ticket.name}
        </div>
        <div style={{ fontSize: 12, color: TOKENS.textMuted, marginBottom: 6 }}>
          {ticket.service || '(no service)'}
        </div>
        {ticket.location && (
          <div style={{ fontSize: 12, color: TOKENS.textSubtle, marginBottom: 6 }}>
            📍 {ticket.location}
          </div>
        )}
        {ticket.scheduledAt && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: STATUS_META.scheduled.fg,
              background: STATUS_META.scheduled.bg,
              padding: '3px 8px',
              borderRadius: 6,
              display: 'inline-block',
            }}
          >
            📅 {new Date(ticket.scheduledAt).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
        <div
          style={{
            fontSize: 11,
            color: TOKENS.textSubtle,
            marginTop: 8,
            paddingTop: 8,
            borderTop: `1px solid ${TOKENS.borderSoft}`,
          }}
        >
          {new Date(ticket.createdAt).toLocaleDateString()}
        </div>
      </button>

      {open && (
        <TicketDrawer
          ticket={ticket}
          onClose={() => setOpen(false)}
          onChange={onChange}
        />
      )}
    </>
  )
}

function ListView({
  tickets,
  onChange,
}: {
  tickets: api.ActivityRow[]
  onChange: () => Promise<void>
}) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {tickets.map((t) => (
        <ListRow key={t.id} ticket={t} onChange={onChange} />
      ))}
    </div>
  )
}

function ListRow({
  ticket,
  onChange,
}: {
  ticket: api.ActivityRow
  onChange: () => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const apply = async (patch: api.StaffInquiryUpdate) => {
    setBusy(true)
    try {
      await api.updateInquiry(ticket.id, patch)
      await onChange()
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div
        style={{
          ...card({ padding: '14px 18px' }),
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              color: TOKENS.text,
              fontSize: 15,
              marginBottom: 2,
            }}
          >
            {ticket.name}
          </div>
          <div style={{ fontSize: 13, color: TOKENS.textMuted }}>
            {ticket.email} · {ticket.phone}
          </div>
        </div>
        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          <div style={{ fontSize: 14, color: TOKENS.text }}>
            {ticket.service || '(no service)'}
          </div>
          <div style={{ fontSize: 13, color: TOKENS.textSubtle }}>
            {ticket.location || '—'}
          </div>
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <StatusPill status={ticket.status} />
        </div>
        {ticket.scheduledAt && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: STATUS_META.scheduled.fg,
              background: STATUS_META.scheduled.bg,
              padding: '3px 8px',
              borderRadius: 6,
            }}
          >
            📅 {new Date(ticket.scheduledAt).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          {ticket.status !== 'completed' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => apply({ status: 'completed' })}
              className="btn"
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                fontSize: 13,
                padding: '6px 12px',
              }}
            >
              ✓ Resolve
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn"
            style={{ fontSize: 13, padding: '6px 12px' }}
          >
            Open
          </button>
        </div>
      </div>
      {open && (
        <TicketDrawer
          ticket={ticket}
          onClose={() => setOpen(false)}
          onChange={onChange}
        />
      )}
    </>
  )
}

function TicketDrawer({
  ticket,
  onClose,
  onChange,
}: {
  ticket: api.ActivityRow
  onClose: () => void
  onChange: () => Promise<void>
}) {
  const [statusValue, setStatusValue] = useState(ticket.status)
  const [scheduledAtLocal, setScheduledAtLocal] = useState(
    isoToLocalInput(ticket.scheduledAt),
  )
  const [staffNotes, setStaffNotes] = useState(ticket.staffNotes ?? '')
  const [quotedAmount, setQuotedAmount] = useState(ticket.quotedAmount ?? '')
  const [busy, setBusy] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)

  const save = async (extra: api.StaffInquiryUpdate = {}) => {
    setBusy(true)
    try {
      await api.updateInquiry(ticket.id, {
        status: statusValue,
        scheduledAt: scheduledAtLocal
          ? new Date(scheduledAtLocal).toISOString()
          : null,
        quotedAmount: quotedAmount.trim() === '' ? null : quotedAmount.trim(),
        staffNotes,
        ...extra,
      })
      await onChange()
      setSavedFlash(true)
      setTimeout(() => setSavedFlash(false), 1500)
    } finally {
      setBusy(false)
    }
  }

  const onResolve = async () => {
    setStatusValue('completed')
    await save({ status: 'completed' })
    onClose()
  }
  const onClose_ = async () => {
    setStatusValue('archived')
    await save({ status: 'archived' })
    onClose()
  }

  const onDelete = async () => {
    if (!confirm('Delete this ticket forever? This cannot be undone.')) return
    setBusy(true)
    try {
      await api.deleteInquiry(ticket.id)
      await onChange()
      onClose()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      role="dialog"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 100%)',
          background: TOKENS.panel,
          height: '100%',
          overflowY: 'auto',
          padding: '1.5rem',
          boxShadow: '-8px 0 32px rgba(15,23,42,0.18)',
          animation: 'slideIn 0.2s ease',
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }`}</style>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {ticket.name}
            </h2>
            <div style={{ fontSize: 13, color: TOKENS.textMuted, marginTop: 2 }}>
              Ticket #{ticket.id} · {new Date(ticket.createdAt).toLocaleString()}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: TOKENS.borderSoft,
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: 16,
              color: TOKENS.textMuted,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {ticket.status !== 'completed' && (
            <button
              type="button"
              disabled={busy}
              onClick={onResolve}
              style={{
                flex: 1,
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 14px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ✓ Resolve
            </button>
          )}
          {ticket.status !== 'archived' && (
            <button
              type="button"
              disabled={busy}
              onClick={onClose_}
              style={{
                flex: 1,
                background: TOKENS.panel,
                color: TOKENS.text,
                border: `1px solid ${TOKENS.border}`,
                padding: '10px 14px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close ticket
            </button>
          )}
        </div>

        {/* Customer info */}
        <div style={{ ...card({ padding: '1rem', marginBottom: 16 }) }}>
          <SectionTitle>Customer</SectionTitle>
          <KV label="Email">
            <a href={`mailto:${ticket.email}`} style={{ color: TOKENS.accent }}>
              {ticket.email}
            </a>
          </KV>
          <KV label="Phone">
            <a href={`tel:${ticket.phone}`} style={{ color: TOKENS.accent }}>
              {ticket.phone}
            </a>
          </KV>
          <KV label="Linked user">
            {ticket.userId != null ? `User #${ticket.userId}` : 'Guest'}
          </KV>
        </div>

        {/* Request details */}
        <div style={{ ...card({ padding: '1rem', marginBottom: 16 }) }}>
          <SectionTitle>Request</SectionTitle>
          <KV label="Service">{ticket.service || '—'}</KV>
          <KV label="Vessel length">{ticket.vesselLengthDisplay || '—'}</KV>
          <KV label="Location">{ticket.location || '—'}</KV>
          {ticket.message && (
            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: TOKENS.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 4,
                }}
              >
                Message
              </div>
              <div
                style={{
                  background: TOKENS.panelMuted,
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontSize: 14,
                  color: TOKENS.text,
                  whiteSpace: 'pre-wrap',
                  border: `1px solid ${TOKENS.borderSoft}`,
                }}
              >
                {ticket.message}
              </div>
            </div>
          )}
        </div>

        {/* Workflow editor */}
        <div style={{ ...card({ padding: '1rem', marginBottom: 16 }) }}>
          <SectionTitle>Workflow</SectionTitle>
          <Field label="Status">
            <select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              style={inputStyle}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Scheduled at">
            <input
              type="datetime-local"
              value={scheduledAtLocal}
              onChange={(e) => setScheduledAtLocal(e.target.value)}
              style={inputStyle}
            />
          </Field>
          <Field label="Quoted amount (USD, visible to customer)">
            <input
              type="number"
              min={0}
              step={0.01}
              value={quotedAmount}
              onChange={(e) => setQuotedAmount(e.target.value)}
              placeholder="e.g. 750"
              style={inputStyle}
            />
          </Field>
          <Field label="Staff notes (internal)">
            <textarea
              value={staffNotes}
              onChange={(e) => setStaffNotes(e.target.value)}
              rows={4}
              style={{ ...inputStyle, fontFamily: 'inherit' }}
            />
          </Field>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingTop: 16,
            borderTop: `1px solid ${TOKENS.borderSoft}`,
          }}
        >
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            style={{
              background: 'transparent',
              color: '#dc2626',
              border: 'none',
              padding: '8px 0',
              fontSize: 13,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Delete ticket
          </button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {savedFlash && (
              <span
                style={{
                  color: '#10b981',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                ✓ Saved
              </span>
            )}
            <a href={ticket.adminUrl} className="btn" style={{ fontSize: 13 }}>
              Open in admin
            </a>
            <button
              type="button"
              onClick={() => save()}
              disabled={busy}
              className="btn btn--primary"
              style={{ fontSize: 13 }}
            >
              {busy ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: TOKENS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  )
}

function KV({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '6px 0',
        fontSize: 14,
        borderBottom: `1px solid ${TOKENS.borderSoft}`,
      }}
    >
      <div style={{ flex: '0 0 110px', color: TOKENS.textMuted }}>{label}</div>
      <div style={{ color: TOKENS.text, flex: 1, wordBreak: 'break-word' }}>
        {children}
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 700,
          color: TOKENS.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: `1px solid ${TOKENS.border}`,
  borderRadius: 8,
  fontSize: 14,
  background: TOKENS.panel,
  outline: 'none',
}

function isoToLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`
}

// ───── Tab: CALENDAR ─────

function CalendarTab() {
  const [monthStart, setMonthStart] = useState(() => firstOfMonth(new Date()))
  const [calendar, setCalendar] = useState<api.CalendarData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const start = monthStart
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
    api
      .fetchCalendar(toIsoDate(start), toIsoDate(end))
      .then((d) => setCalendar(d))
      .finally(() => setLoading(false))
  }, [monthStart])

  const days = useMemo(() => buildMonthGrid(monthStart), [monthStart])
  const byDay = useMemo(() => {
    const map = new Map<string, api.CalendarAppointment[]>()
    if (!calendar) return map
    for (const a of calendar.appointments) {
      const key = a.scheduledAt.slice(0, 10)
      const arr = map.get(key) ?? []
      arr.push(a)
      map.set(key, arr)
    }
    return map
  }, [calendar])

  const monthLabel = monthStart.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {monthLabel}
        </h2>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            className="btn"
            onClick={() => setMonthStart(addMonths(monthStart, -1))}
            style={{ fontSize: 13, padding: '6px 12px' }}
          >
            ← Prev
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setMonthStart(firstOfMonth(new Date()))}
            style={{ fontSize: 13, padding: '6px 12px' }}
          >
            Today
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setMonthStart(addMonths(monthStart, 1))}
            style={{ fontSize: 13, padding: '6px 12px' }}
          >
            Next →
          </button>
        </div>
      </div>

      <div
        style={{
          ...card({ padding: 0, overflow: 'hidden' }),
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            background: TOKENS.borderSoft,
          }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div
              key={d}
              style={{
                background: TOKENS.panelMuted,
                padding: '10px 12px',
                fontSize: 11,
                fontWeight: 700,
                color: TOKENS.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            const inMonth = day.getMonth() === monthStart.getMonth()
            const key = toIsoDate(day)
            const apps = byDay.get(key) ?? []
            const isToday = sameDay(day, new Date())
            return (
              <div
                key={i}
                style={{
                  background: inMonth ? TOKENS.panel : TOKENS.panelMuted,
                  padding: 8,
                  minHeight: 110,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  opacity: inMonth ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isToday ? 700 : 500,
                    color: isToday ? TOKENS.accent : TOKENS.text,
                    marginBottom: 2,
                  }}
                >
                  {day.getDate()}
                  {isToday && (
                    <span
                      style={{
                        marginLeft: 6,
                        fontSize: 10,
                        background: TOKENS.accent,
                        color: 'white',
                        padding: '1px 6px',
                        borderRadius: 4,
                        fontWeight: 700,
                      }}
                    >
                      TODAY
                    </span>
                  )}
                </div>
                {apps.map((a) => {
                  const m = STATUS_META[a.status] ?? STATUS_META.scheduled
                  return (
                    <div
                      key={a.id}
                      title={`${a.name} — ${a.service || 'service'} at ${a.location}`}
                      style={{
                        background: m.bg,
                        color: m.fg,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 6px',
                        borderRadius: 5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        borderLeft: `2px solid ${m.dot}`,
                      }}
                    >
                      {new Date(a.scheduledAt).toLocaleTimeString(undefined, {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}{' '}
                      {a.name}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <h3
        style={{
          marginTop: '2rem',
          marginBottom: 12,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        Appointments this month ({calendar?.appointments.length ?? 0})
      </h3>
      {loading ? (
        <p style={{ color: TOKENS.textMuted }}>Loading…</p>
      ) : !calendar || calendar.appointments.length === 0 ? (
        <p style={{ color: TOKENS.textMuted }}>
          Nothing scheduled in this month yet. Set "Scheduled at" on a ticket
          from the Tickets tab to populate the calendar.
        </p>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {calendar.appointments.map((a) => (
            <div
              key={a.id}
              style={{
                ...card({ padding: '12px 16px' }),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <strong style={{ color: TOKENS.text }}>{a.name}</strong>
                <span style={{ color: TOKENS.textMuted, marginLeft: 8 }}>
                  {a.service || 'Service'} · {a.location || '—'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: TOKENS.text, fontSize: 14 }}>
                  {new Date(a.scheduledAt).toLocaleString()}
                </span>
                <StatusPill status={a.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function firstOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function addMonths(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1)
}
function toIsoDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
function buildMonthGrid(monthStart: Date): Date[] {
  const firstWeekday = monthStart.getDay()
  const start = new Date(monthStart)
  start.setDate(1 - firstWeekday)
  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }
  return days
}

// ───── Tab: OVERVIEW (charts only) ─────

function OverviewTab({ data }: { data: api.DashboardData }) {
  const days = data.requestsPerDay.map((d) => ({
    date: shortDate(d.date),
    count: d.count,
  }))

  return (
    <>
      <h2
        style={{
          margin: 0,
          marginBottom: 16,
          fontSize: 16,
          fontWeight: 700,
          color: TOKENS.text,
        }}
      >
        Requests per day (last 30)
      </h2>
      <div style={{ ...card({ padding: '1rem' }) }}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={days}>
            <CartesianGrid strokeDasharray="3 3" stroke={TOKENS.border} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS[0]}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 12,
          marginTop: 16,
        }}
      >
        <div style={card()}>
          <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>
            Status funnel
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.statusFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke={TOKENS.border} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card()}>
          <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>
            Top services
          </h3>
          {data.topServices.length === 0 ? (
            <p style={{ color: TOKENS.textMuted }}>No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data.topServices}
                  dataKey="count"
                  nameKey="service"
                  outerRadius={80}
                  label
                >
                  {data.topServices.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div style={card()}>
          <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>
            Top locations
          </h3>
          {data.topLocations.length === 0 ? (
            <p style={{ color: TOKENS.textMuted }}>No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={data.topLocations.slice(0, 8)}
                layout="vertical"
                margin={{ left: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={TOKENS.border} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="location"
                  tick={{ fontSize: 12 }}
                  width={120}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill={CHART_COLORS[2]}
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  )
}

// ───── Tab: ANALYTICS ─────

function AnalyticsTab({ data }: { data: api.DashboardData }) {
  if (!data.analytics.available) {
    return (
      <div style={{ ...card({ padding: '3rem', textAlign: 'center' }) }}>
        <p style={{ color: TOKENS.textMuted, margin: 0 }}>
          No analytics data yet. Visit a few pages on the live site to start
          collecting page views.
        </p>
      </div>
    )
  }

  const a = data.analytics

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: '1rem',
        }}
      >
        <StatCard label="Page views" value={a.totals?.pageviews ?? 0} />
        <StatCard label="Unique sessions" value={a.totals?.uniqueSessions ?? 0} />
        <StatCard label="Tracked events" value={a.totals?.events ?? 0} />
      </div>

      <h2
        style={{
          margin: 0,
          marginBottom: 12,
          marginTop: '1.5rem',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        Traffic (last 30 days)
      </h2>
      <div style={{ ...card({ padding: '1rem' }) }}>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={(a.pageviewsPerDay ?? []).map((d) => ({
              date: shortDate(d.date),
              views: d.count,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={TOKENS.border} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke={CHART_COLORS[3]}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 12,
          marginTop: 16,
        }}
      >
        <RankList
          title="Top pages"
          items={(a.topPaths ?? []).map((r) => ({ label: r.path, count: r.count }))}
        />
        <RankList
          title="Top referrers"
          items={(a.topReferrers ?? []).map((r) => ({
            label: r.referrer,
            count: r.count,
          }))}
        />
        <RankList
          title="Top sources (UTM)"
          items={(a.topSources ?? []).map((r) => ({
            label: r.source,
            count: r.count,
          }))}
        />
        <RankList
          title="Top exit pages"
          items={(a.topExitPaths ?? []).map((r) => ({
            label: r.path,
            count: r.count,
          }))}
        />
        <RankList
          title="Top click targets"
          items={(a.topClicks ?? []).map((r) => ({
            label: r.target,
            count: r.count,
          }))}
        />
      </div>
    </>
  )
}

function RankList({
  title,
  items,
}: {
  title: string
  items: { label: string; count: number }[]
}) {
  return (
    <div style={card()}>
      <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 15 }}>{title}</h3>
      {items.length === 0 ? (
        <p style={{ color: TOKENS.textMuted }}>No data yet.</p>
      ) : (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.slice(0, 10).map((item, i) => (
            <li
              key={`${item.label}-${i}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: `1px solid ${TOKENS.borderSoft}`,
                fontSize: 14,
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginRight: 12,
                  color: TOKENS.text,
                }}
              >
                {item.label || '(empty)'}
              </span>
              <strong style={{ color: TOKENS.text }}>{item.count}</strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
