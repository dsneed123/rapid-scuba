import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
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

export function AccountPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<api.MyBooking[] | null>(null)
  const [inquiries, setInquiries] = useState<api.MyInquiry[] | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      navigate('/login', { state: { from: '/account' }, replace: true })
      return
    }
    api.fetchMyBookings().then((r) => setBookings(r.bookings))
    api.fetchMyInquiries().then((r) => setInquiries(r.inquiries))
  }, [loading, user, navigate])

  if (loading || !user) {
    return (
      <section className="page-content">
        <div className="container">Loading…</div>
      </section>
    )
  }

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

        <h2>Your bookings</h2>
        {bookings === null ? (
          <p>Loading bookings…</p>
        ) : bookings.length === 0 ? (
          <p style={{ color: 'var(--gray-600)' }}>
            No booking requests yet.{' '}
            <Link to="/contact" style={{ color: 'var(--brand)' }}>
              Submit a request
            </Link>
            .
          </p>
        ) : (
          <div style={{ display: 'grid', gap: 12, marginBottom: '2.5rem' }}>
            {bookings.map((b) => (
              <div
                key={b.id}
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
                  <strong>{b.serviceId}</strong>
                  <StatusBadge status={b.status} label={b.statusDisplay} />
                </div>
                <div style={{ color: 'var(--gray-600)', fontSize: 14 }}>
                  {b.vesselType} · {b.vesselLengthFt} ft · {b.location}
                </div>
                <div
                  style={{
                    color: 'var(--gray-500)',
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  Preferred date: {b.preferredDate} · Submitted{' '}
                  {new Date(b.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2>Your inquiries</h2>
        {inquiries === null ? (
          <p>Loading inquiries…</p>
        ) : inquiries.length === 0 ? (
          <p style={{ color: 'var(--gray-600)' }}>No inquiries yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {inquiries.map((i) => (
              <div
                key={i.id}
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
                  <strong>{i.service || 'General inquiry'}</strong>
                  <StatusBadge status={i.status} label={i.statusDisplay} />
                </div>
                {i.message && (
                  <div style={{ color: 'var(--gray-700)', fontSize: 14 }}>
                    {i.message}
                  </div>
                )}
                <div
                  style={{
                    color: 'var(--gray-500)',
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  Submitted {new Date(i.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
