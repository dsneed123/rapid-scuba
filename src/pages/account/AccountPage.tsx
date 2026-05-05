import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ApiError } from '@/lib/api'
import * as api from '@/lib/api'

const STATUS_BADGE_COLORS: Record<string, string> = {
  new: '#6b7280',
  contacted: '#3b82f6',
  scheduled: '#f59e0b',
  completed: '#10b981',
  archived: '#9ca3af',
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span
      style={{
        background: STATUS_BADGE_COLORS[status] ?? '#6b7280',
        color: 'white',
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {label}
    </span>
  )
}

function formatScheduledAt(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function AccountPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState<api.MyRequest[] | null>(null)
  const [tab, setTab] = useState<'requests' | 'settings'>('requests')

  useEffect(() => {
    if (loading) return
    if (!user) {
      navigate('/login', { state: { from: '/account' }, replace: true })
      return
    }
    api.fetchMyRequests().then((r) => setRequests(r.requests))
  }, [loading, user, navigate])

  if (loading || !user) {
    return (
      <section className="page-content">
        <div className="container">Loading…</div>
      </section>
    )
  }

  const upcoming = (requests ?? []).filter(
    (r) => r.scheduledAt && new Date(r.scheduledAt).getTime() > Date.now(),
  )

  return (
    <section className="page-content">
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h1 style={{ marginBottom: 4 }}>
              Hi {user.first_name || user.email}
            </h1>
            <p style={{ color: 'var(--gray-600)' }}>{user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {user.is_staff && (
              <Link to="/staff" className="btn btn--primary">
                Staff dashboard
              </Link>
            )}
            <button
              type="button"
              className="btn"
              onClick={() => {
                logout().then(() => navigate('/'))
              }}
            >
              Log out
            </button>
          </div>
        </div>

        {/* Upcoming appointment block */}
        {upcoming.length > 0 && (
          <div
            style={{
              background:
                'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              borderRadius: 12,
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 14px rgba(14,165,233,0.25)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                opacity: 0.9,
                marginBottom: 6,
              }}
            >
              Your next appointment
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {formatScheduledAt(upcoming[0].scheduledAt!)}
            </div>
            <div style={{ opacity: 0.92 }}>
              {upcoming[0].service || 'Service'} · {upcoming[0].location}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            borderBottom: '1px solid var(--gray-200)',
            marginBottom: '1.5rem',
          }}
        >
          {(['requests', 'settings'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                border: 'none',
                borderBottom:
                  tab === t ? '3px solid #0ea5e9' : '3px solid transparent',
                marginBottom: -1,
                fontSize: 15,
                fontWeight: 600,
                color: tab === t ? '#0ea5e9' : 'var(--gray-600)',
                cursor: 'pointer',
              }}
            >
              {t === 'requests' ? 'My requests' : 'Account settings'}
            </button>
          ))}
        </div>

        {tab === 'requests' ? (
          <RequestsList requests={requests} />
        ) : (
          <SettingsPanel />
        )}
      </div>
    </section>
  )
}

function RequestsList({ requests }: { requests: api.MyRequest[] | null }) {
  if (requests === null) return <p>Loading requests…</p>
  if (requests.length === 0) {
    return (
      <p style={{ color: 'var(--gray-600)' }}>
        You haven't submitted any requests yet.{' '}
        <Link to="/contact" style={{ color: 'var(--brand)' }}>
          Submit one now
        </Link>
        .
      </p>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {requests.map((r) => (
        <div
          key={r.id}
          style={{
            border: '1px solid var(--gray-200)',
            borderRadius: 8,
            padding: '1rem 1.25rem',
            background: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <strong>{r.service || 'General request'}</strong>
            <StatusBadge status={r.status} label={r.statusDisplay} />
          </div>
          {r.scheduledAt && (
            <div
              style={{
                color: '#0c4a6e',
                background: '#e0f2fe',
                fontSize: 14,
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: 6,
                marginBottom: 8,
                display: 'inline-block',
              }}
            >
              📅 {formatScheduledAt(r.scheduledAt)}
            </div>
          )}
          {r.message && (
            <div
              style={{ color: 'var(--gray-700)', fontSize: 14, marginBottom: 4 }}
            >
              {r.message}
            </div>
          )}
          <div
            style={{
              color: 'var(--gray-500)',
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {r.location && `${r.location} · `}Submitted{' '}
            {new Date(r.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}

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

  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 560 }}>
      <form
        onSubmit={onSave}
        className="contact-form"
        style={{
          background: 'white',
          border: '1px solid var(--gray-200)',
          borderRadius: 8,
          padding: '1.5rem',
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 12 }}>Profile</h2>

        <div className="contact-form__group">
          <label htmlFor="first">First name</label>
          <input
            id="first"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
          {errors.firstName && <span className="form-error">{errors.firstName}</span>}
        </div>

        <div className="contact-form__group">
          <label htmlFor="last">Last name</label>
          <input
            id="last"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </div>

        <div className="contact-form__group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <h3 style={{ marginTop: 16, marginBottom: 8 }}>Change password</h3>
        <div className="contact-form__group">
          <label htmlFor="currentPwd">Current password</label>
          <input
            id="currentPwd"
            type="password"
            autoComplete="current-password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
          />
          {errors.currentPassword && (
            <span className="form-error">{errors.currentPassword}</span>
          )}
        </div>

        <div className="contact-form__group">
          <label htmlFor="newPwd">New password</label>
          <input
            id="newPwd"
            type="password"
            autoComplete="new-password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        {errors._ && (
          <div className="form-error-banner" role="alert">
            {errors._}
          </div>
        )}
        {savedMsg && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 6,
              background: '#dcfce7',
              color: '#166534',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {savedMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn btn--primary btn--lg"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <div
        style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 8,
          padding: '1.5rem',
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 6, color: '#991b1b' }}>
          Danger zone
        </h2>
        <p style={{ color: '#7f1d1d', fontSize: 14, marginBottom: 12 }}>
          Permanently delete your account. Your past requests stay in our system
          (unlinked from you), but you'll lose access to track their status.
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
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
