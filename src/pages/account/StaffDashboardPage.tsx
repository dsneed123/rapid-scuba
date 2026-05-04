import { useEffect, useState } from 'react'
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

const COLORS = [
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

const CARD_STYLE: React.CSSProperties = {
  background: 'white',
  border: '1px solid var(--gray-200)',
  borderRadius: 12,
  padding: '1.25rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
}

const STAT_VALUE: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
}

const STAT_LABEL: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--gray-600)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: 0,
  marginTop: 4,
}

const SECTION_TITLE: React.CSSProperties = {
  marginTop: '2rem',
  marginBottom: '1rem',
  fontSize: 18,
  fontWeight: 700,
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={CARD_STYLE}>
      <p style={STAT_VALUE}>{value.toLocaleString()}</p>
      <p style={STAT_LABEL}>{label}</p>
    </div>
  )
}

function shortDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function StaffDashboardPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState<api.DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

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
      <section className="page-content">
        <div className="container">Loading…</div>
      </section>
    )
  }
  if (!user.is_staff) return null

  if (error) {
    return (
      <section className="page-content">
        <div className="container">
          <div className="form-error-banner">{error}</div>
        </div>
      </section>
    )
  }
  if (!data) {
    return (
      <section className="page-content">
        <div className="container">Loading dashboard…</div>
      </section>
    )
  }

  const leadDays = data.leadsPerDay.map((d) => ({
    date: shortDate(d.date),
    inquiries: d.inquiries,
    bookings: d.bookings,
  }))

  return (
    <section className="page-content">
      <div className="container" style={{ maxWidth: 1280 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <h1 style={{ margin: 0 }}>Staff dashboard</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/account" className="btn">
              My account
            </Link>
            <a href="/admin/" className="btn btn--primary">
              Django admin
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          <StatCard label="Inquiries" value={data.totals.inquiries} />
          <StatCard label="Bookings" value={data.totals.bookings} />
          <StatCard label="New (unworked)" value={data.totals.new} />
          <StatCard label="Completed" value={data.totals.completed} />
          {data.analytics.available && data.analytics.totals && (
            <>
              <StatCard
                label="Page views (all-time)"
                value={data.analytics.totals.pageviews}
              />
              <StatCard
                label="Unique sessions"
                value={data.analytics.totals.uniqueSessions}
              />
            </>
          )}
        </div>

        <h2 style={SECTION_TITLE}>Leads per day (last 30)</h2>
        <div style={{ ...CARD_STYLE, padding: '1rem' }}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={leadDays}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="inquiries"
                stroke={COLORS[0]}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke={COLORS[1]}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 16,
            marginTop: 16,
          }}
        >
          <div style={CARD_STYLE}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Status funnel</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.statusFunnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={CARD_STYLE}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Top services</h3>
            {data.topServices.length === 0 ? (
              <p style={{ color: 'var(--gray-500)' }}>No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={data.topServices}
                    dataKey="count"
                    nameKey="service"
                    outerRadius={90}
                    label
                  >
                    {data.topServices.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div style={CARD_STYLE}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Top locations</h3>
            {data.topLocations.length === 0 ? (
              <p style={{ color: 'var(--gray-500)' }}>No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={data.topLocations.slice(0, 8)}
                  layout="vertical"
                  margin={{ left: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="location"
                    tick={{ fontSize: 12 }}
                    width={120}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill={COLORS[2]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {data.analytics.available && (
          <>
            <h2 style={SECTION_TITLE}>Site traffic</h2>
            <div style={{ ...CARD_STYLE, padding: '1rem' }}>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={(data.analytics.pageviewsPerDay ?? []).map((d) => ({
                    date: shortDate(d.date),
                    views: d.count,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke={COLORS[3]}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: 16,
                marginTop: 16,
              }}
            >
              <RankList
                title="Top pages"
                items={(data.analytics.topPaths ?? []).map((r) => ({
                  label: r.path,
                  count: r.count,
                }))}
              />
              <RankList
                title="Top referrers"
                items={(data.analytics.topReferrers ?? []).map((r) => ({
                  label: r.referrer,
                  count: r.count,
                }))}
              />
              <RankList
                title="Top traffic sources (UTM)"
                items={(data.analytics.topSources ?? []).map((r) => ({
                  label: r.source,
                  count: r.count,
                }))}
              />
              <RankList
                title="Top exit pages"
                items={(data.analytics.topExitPaths ?? []).map((r) => ({
                  label: r.path,
                  count: r.count,
                }))}
              />
              <RankList
                title="Top click targets"
                items={(data.analytics.topClicks ?? []).map((r) => ({
                  label: r.target,
                  count: r.count,
                }))}
              />
            </div>
          </>
        )}

        <h2 style={SECTION_TITLE}>Recent activity</h2>
        <div style={CARD_STYLE}>
          {data.recentActivity.length === 0 ? (
            <p style={{ color: 'var(--gray-500)' }}>No activity yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {data.recentActivity.map((row) => (
                <div
                  key={`${row.type}-${row.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--gray-100)',
                    fontSize: 14,
                  }}
                >
                  <span>
                    <strong style={{ marginRight: 8 }}>
                      {row.type === 'booking' ? 'Booking' : 'Inquiry'}
                    </strong>
                    {row.name}
                    {row.service && (
                      <span style={{ color: 'var(--gray-500)' }}> · {row.service}</span>
                    )}
                  </span>
                  <span style={{ color: 'var(--gray-500)', fontSize: 13 }}>
                    {new Date(row.createdAt).toLocaleString()} · {row.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
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
    <div style={CARD_STYLE}>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>{title}</h3>
      {items.length === 0 ? (
        <p style={{ color: 'var(--gray-500)' }}>No data yet.</p>
      ) : (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.slice(0, 10).map((item, i) => (
            <li
              key={`${item.label}-${i}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid var(--gray-100)',
                fontSize: 14,
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginRight: 12,
                }}
              >
                {item.label || '(empty)'}
              </span>
              <strong>{item.count}</strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
