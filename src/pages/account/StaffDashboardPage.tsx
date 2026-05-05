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

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
]

const STATUS_BADGE_BG: Record<string, string> = {
  new: '#f3f4f6',
  contacted: '#dbeafe',
  scheduled: '#fef3c7',
  completed: '#dcfce7',
  archived: '#f3f4f6',
}
const STATUS_BADGE_FG: Record<string, string> = {
  new: '#374151',
  contacted: '#1e40af',
  scheduled: '#92400e',
  completed: '#166534',
  archived: '#6b7280',
}

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

type Tab = 'requests' | 'calendar' | 'analytics'

export function StaffDashboardPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState<api.DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('requests')

  const reloadDashboard = async () => {
    try {
      const d = await api.fetchDashboard()
      setData(d)
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

        {/* Headline stats — always visible */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
            marginBottom: '1.5rem',
          }}
        >
          <StatCard label="Total requests" value={data.totals.requests} />
          <StatCard label="New (unworked)" value={data.totals.new} />
          <StatCard label="Scheduled" value={data.totals.scheduled} />
          <StatCard label="Completed" value={data.totals.completed} />
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            borderBottom: '1px solid var(--gray-200)',
            marginBottom: '1.5rem',
          }}
        >
          {(['requests', 'calendar', 'analytics'] as const).map((t) => (
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
                textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'requests' && (
          <RequestsTab data={data} reloadDashboard={reloadDashboard} />
        )}
        {tab === 'calendar' && <CalendarTab />}
        {tab === 'analytics' && <AnalyticsTab data={data} />}
      </div>
    </section>
  )
}

// ───── Tab 1: Requests (charts + activity feed with inline actions) ─────

function RequestsTab({
  data,
  reloadDashboard,
}: {
  data: api.DashboardData
  reloadDashboard: () => Promise<void>
}) {
  const days = data.requestsPerDay.map((d) => ({
    date: shortDate(d.date),
    count: d.count,
  }))

  return (
    <>
      <h2 style={SECTION_TITLE}>Requests per day (last 30)</h2>
      <div style={{ ...CARD_STYLE, padding: '1rem' }}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke={COLORS[0]}
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
          <ResponsiveContainer width="100%" height={240}>
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
            <ResponsiveContainer width="100%" height={240}>
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

      <h2 style={SECTION_TITLE}>Recent activity</h2>
      <ActivityFeed
        rows={data.recentActivity}
        onChange={reloadDashboard}
      />
    </>
  )
}

function ActivityFeed({
  rows,
  onChange,
}: {
  rows: api.ActivityRow[]
  onChange: () => Promise<void>
}) {
  const [filter, setFilter] = useState<'all' | string>('all')
  const filtered = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [filter, rows],
  )

  if (rows.length === 0) {
    return (
      <div style={CARD_STYLE}>
        <p style={{ color: 'var(--gray-500)' }}>No activity yet.</p>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <FilterPill label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
        {STATUS_OPTIONS.map((s) => (
          <FilterPill
            key={s.value}
            label={s.label}
            active={filter === s.value}
            onClick={() => setFilter(s.value)}
          />
        ))}
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {filtered.map((row) => (
          <ActivityCard key={row.id} row={row} onChange={onChange} />
        ))}
      </div>
    </>
  )
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: 999,
        border: '1px solid var(--gray-200)',
        background: active ? '#0ea5e9' : 'white',
        color: active ? 'white' : 'var(--gray-700)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

function ActivityCard({
  row,
  onChange,
}: {
  row: api.ActivityRow
  onChange: () => Promise<void>
}) {
  const [expanded, setExpanded] = useState(false)
  const [busy, setBusy] = useState(false)
  const [scheduledAtLocal, setScheduledAtLocal] = useState(
    isoToLocalInput(row.scheduledAt),
  )
  const [staffNotes, setStaffNotes] = useState(row.staffNotes ?? '')
  const [statusValue, setStatusValue] = useState(row.status)

  const apply = async (patch: api.StaffInquiryUpdate) => {
    setBusy(true)
    try {
      await api.updateInquiry(row.id, patch)
      await onChange()
    } finally {
      setBusy(false)
    }
  }

  const onResolve = () => apply({ status: 'completed' })
  const onArchive = () => apply({ status: 'archived' })

  const onSaveDetails = () => {
    apply({
      status: statusValue,
      scheduledAt: scheduledAtLocal
        ? new Date(scheduledAtLocal).toISOString()
        : null,
      staffNotes,
    })
  }

  const onDelete = async () => {
    if (!confirm('Delete this request? This cannot be undone.')) return
    setBusy(true)
    try {
      await api.deleteInquiry(row.id)
      await onChange()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={CARD_STYLE}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <strong style={{ fontSize: 16 }}>{row.name}</strong>
          <span style={{ color: 'var(--gray-500)', fontSize: 14 }}>
            {row.service || '(no service specified)'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '4px 10px',
              borderRadius: 999,
              background: STATUS_BADGE_BG[row.status] ?? '#e5e7eb',
              color: STATUS_BADGE_FG[row.status] ?? '#374151',
            }}
          >
            {row.statusDisplay}
          </span>
          {row.status !== 'completed' && (
            <button
              type="button"
              disabled={busy}
              onClick={onResolve}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Resolve
            </button>
          )}
          {row.status !== 'archived' && (
            <button
              type="button"
              disabled={busy}
              onClick={onArchive}
              style={{
                background: 'white',
                color: 'var(--gray-700)',
                border: '1px solid var(--gray-300)',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            style={{
              border: '1px solid var(--gray-200)',
              background: 'white',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {expanded ? 'Hide' : 'Edit'}
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 8,
          color: 'var(--gray-600)',
          fontSize: 13,
          flexWrap: 'wrap',
        }}
      >
        <span>📧 {row.email}</span>
        <span>📞 {row.phone}</span>
        <span>📍 {row.location || '—'}</span>
        {row.scheduledAt && (
          <span style={{ color: '#92400e', fontWeight: 600 }}>
            📅 {new Date(row.scheduledAt).toLocaleString()}
          </span>
        )}
        <span style={{ marginLeft: 'auto', color: 'var(--gray-500)' }}>
          {new Date(row.createdAt).toLocaleString()}
        </span>
      </div>

      {expanded && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid var(--gray-100)',
            display: 'grid',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-600)' }}>
                Status
              </label>
              <select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 4,
                  padding: '6px 8px',
                  borderRadius: 6,
                  border: '1px solid var(--gray-300)',
                }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-600)' }}>
                Scheduled at
              </label>
              <input
                type="datetime-local"
                value={scheduledAtLocal}
                onChange={(e) => setScheduledAtLocal(e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 4,
                  padding: '6px 8px',
                  borderRadius: 6,
                  border: '1px solid var(--gray-300)',
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-600)' }}>
              Staff notes
            </label>
            <textarea
              value={staffNotes}
              onChange={(e) => setStaffNotes(e.target.value)}
              rows={3}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 4,
                padding: '6px 8px',
                borderRadius: 6,
                border: '1px solid var(--gray-300)',
                fontFamily: 'inherit',
                fontSize: 14,
              }}
            />
          </div>
          {row.message && (
            <div
              style={{
                background: 'var(--gray-50)',
                padding: '10px 12px',
                borderRadius: 6,
                fontSize: 14,
                color: 'var(--gray-700)',
              }}
            >
              <strong style={{ marginRight: 6 }}>Customer message:</strong>
              {row.message}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              style={{
                background: 'white',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
            <a
              href={row.adminUrl}
              className="btn"
              style={{ fontSize: 13, padding: '6px 14px' }}
            >
              Open in admin
            </a>
            <button
              type="button"
              onClick={onSaveDetails}
              disabled={busy}
              className="btn btn--primary"
              style={{ fontSize: 13, padding: '6px 14px' }}
            >
              {busy ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function isoToLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  // Format as YYYY-MM-DDTHH:MM in local time for datetime-local input.
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`
}

// ───── Tab 2: Calendar ─────

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
          marginTop: '0.5rem',
        }}
      >
        <h2 style={{ margin: 0 }}>{monthLabel}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            className="btn"
            onClick={() => setMonthStart(addMonths(monthStart, -1))}
          >
            ← Prev
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setMonthStart(firstOfMonth(new Date()))}
          >
            Today
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setMonthStart(addMonths(monthStart, 1))}
          >
            Next →
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
          background: 'var(--gray-200)',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid var(--gray-200)',
        }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            style={{
              background: 'var(--gray-50)',
              padding: '8px 12px',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--gray-600)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
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
                background: inMonth ? 'white' : '#fafafa',
                padding: 8,
                minHeight: 110,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: inMonth ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: isToday ? 700 : 500,
                  color: isToday ? '#0ea5e9' : 'var(--gray-700)',
                  marginBottom: 2,
                }}
              >
                {day.getDate()}
                {isToday && (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 10,
                      background: '#0ea5e9',
                      color: 'white',
                      padding: '1px 6px',
                      borderRadius: 4,
                    }}
                  >
                    TODAY
                  </span>
                )}
              </div>
              {apps.map((a) => (
                <div
                  key={a.id}
                  title={`${a.name} — ${a.service || 'service'} at ${a.location}`}
                  style={{
                    background:
                      a.status === 'completed'
                        ? '#d1fae5'
                        : a.status === 'scheduled'
                          ? '#fef3c7'
                          : '#dbeafe',
                    color:
                      a.status === 'completed'
                        ? '#065f46'
                        : a.status === 'scheduled'
                          ? '#92400e'
                          : '#1e40af',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 6px',
                    borderRadius: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {new Date(a.scheduledAt).toLocaleTimeString(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}{' '}
                  {a.name}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <h3 style={{ ...SECTION_TITLE, marginTop: '2rem' }}>
        Appointments this month ({calendar?.appointments.length ?? 0})
      </h3>
      {loading ? (
        <p>Loading…</p>
      ) : !calendar || calendar.appointments.length === 0 ? (
        <p style={{ color: 'var(--gray-500)' }}>
          No appointments scheduled in this month yet. Set a "Scheduled at" date
          on a request from the Requests tab to populate the calendar.
        </p>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {calendar.appointments.map((a) => (
            <div
              key={a.id}
              style={{
                ...CARD_STYLE,
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <strong>{a.name}</strong>
                <span style={{ color: 'var(--gray-500)', marginLeft: 8 }}>
                  {a.service || 'Service'} · {a.location || '—'}
                </span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={{ color: 'var(--gray-700)', fontSize: 14 }}>
                  {new Date(a.scheduledAt).toLocaleString()}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 999,
                    background: STATUS_BADGE_BG[a.status] ?? '#e5e7eb',
                    color: STATUS_BADGE_FG[a.status] ?? '#374151',
                  }}
                >
                  {a.statusDisplay}
                </span>
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
  const firstWeekday = monthStart.getDay() // 0 Sun … 6 Sat
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

// ───── Tab 3: Analytics ─────

function AnalyticsTab({ data }: { data: api.DashboardData }) {
  if (!data.analytics.available) {
    return (
      <div style={{ ...CARD_STYLE, padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--gray-600)', margin: 0 }}>
          No analytics data yet. Visit a few pages on the live site to start
          collecting page views, then return here.
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
          gap: 16,
          marginBottom: '1rem',
        }}
      >
        <StatCard label="Page views" value={a.totals?.pageviews ?? 0} />
        <StatCard label="Unique sessions" value={a.totals?.uniqueSessions ?? 0} />
        <StatCard label="Tracked events" value={a.totals?.events ?? 0} />
      </div>

      <h2 style={SECTION_TITLE}>Traffic (last 30 days)</h2>
      <div style={{ ...CARD_STYLE, padding: '1rem' }}>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={(a.pageviewsPerDay ?? []).map((d) => ({
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
          items={(a.topPaths ?? []).map((r) => ({
            label: r.path,
            count: r.count,
          }))}
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
