import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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

const T = {
  bg: '#f6f7fb',
  panel: '#ffffff',
  panelMuted: '#fafbfc',
  border: '#e7eaee',
  borderSoft: '#eef0f3',
  text: '#0b1220',
  textMuted: '#5d6470',
  textSubtle: '#9aa0a8',
  accent: '#0ea5e9',
  accentDeep: '#0369a1',
  shadow:
    '0 1px 2px rgba(11,18,32,0.04), 0 4px 16px rgba(11,18,32,0.05)',
  shadowSoft: '0 1px 2px rgba(11,18,32,0.04)',
  shadowHover:
    '0 8px 24px rgba(11,18,32,0.08), 0 2px 6px rgba(11,18,32,0.05)',
  shadowDeep:
    '0 12px 40px rgba(11,18,32,0.12), 0 4px 8px rgba(11,18,32,0.06)',
}

const CHART = ['#0ea5e9', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6']

const STATUS_META: Record<
  string,
  {
    label: string
    bg: string
    fg: string
    dot: string
    soft: string
  }
> = {
  new: {
    label: 'New',
    bg: '#eff6ff',
    fg: '#1d4ed8',
    dot: '#3b82f6',
    soft: '#dbeafe',
  },
  contacted: {
    label: 'Contacted',
    bg: '#ecfeff',
    fg: '#0e7490',
    dot: '#06b6d4',
    soft: '#cffafe',
  },
  scheduled: {
    label: 'Scheduled',
    bg: '#fffbeb',
    fg: '#92400e',
    dot: '#f59e0b',
    soft: '#fef3c7',
  },
  completed: {
    label: 'Completed',
    bg: '#ecfdf5',
    fg: '#166534',
    dot: '#10b981',
    soft: '#d1fae5',
  },
  archived: {
    label: 'Archived',
    bg: '#f8fafc',
    fg: '#475569',
    dot: '#94a3b8',
    soft: '#e2e8f0',
  },
}

const STATUS_ORDER = ['new', 'contacted', 'scheduled', 'completed', 'archived']

const STATUS_OPTIONS = STATUS_ORDER.map((v) => ({
  value: v,
  label: STATUS_META[v].label,
}))

// ───── Reusable bits ─────

const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: T.panel,
  border: `1px solid ${T.border}`,
  borderRadius: 16,
  padding: '1.25rem',
  boxShadow: T.shadow,
  ...extra,
})

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('')
  // Hash name → hue for stable pastel color.
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  const hue = Math.abs(hash) % 360
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: `linear-gradient(135deg, hsl(${hue} 70% 65%), hsl(${(hue + 30) % 360} 75% 55%))`,
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.42,
        letterSpacing: '0.02em',
        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}
    >
      {initials || '?'}
    </div>
  )
}

function StatusPill({ status, size = 'md' }: { status: string; size?: 'sm' | 'md' }) {
  const m = STATUS_META[status] ?? STATUS_META.new
  const fontSize = size === 'sm' ? 11 : 12
  const pad = size === 'sm' ? '3px 8px' : '4px 10px'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: m.bg,
        color: m.fg,
        padding: pad,
        borderRadius: 999,
        fontSize,
        fontWeight: 600,
        letterSpacing: '0.01em',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: m.dot,
          boxShadow: `0 0 0 2px ${m.soft}`,
        }}
      />
      {m.label}
    </span>
  )
}

// Simple inline icons.
const Icon = {
  tickets: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  overview: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 7-7" />
      <path d="M14 8h6v6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7" />
      <path d="M22 13H17l-2 3H9l-2-3H2v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M17 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H7" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 7-7" />
    </svg>
  ),
  inboxIn: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7" />
      <path d="M22 13H17l-2 3H9l-2-3H2v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h7l-1 8 11-12h-7l0-8z" />
    </svg>
  ),
  cal: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
    </svg>
  ),
}

function shortDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true })
  } catch {
    return new Date(iso).toLocaleDateString()
  }
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

type Tab = 'tickets' | 'calendar' | 'overview' | 'analytics'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'tickets', label: 'Tickets', icon: Icon.tickets },
  { id: 'calendar', label: 'Calendar', icon: Icon.calendar },
  { id: 'overview', label: 'Overview', icon: Icon.overview },
  { id: 'analytics', label: 'Analytics', icon: Icon.analytics },
]

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
      <section className="page-content" style={{ background: T.bg }}>
        <div className="container">Loading…</div>
      </section>
    )
  }
  if (!user.is_staff) return null

  if (error) {
    return (
      <section className="page-content" style={{ background: T.bg }}>
        <div className="container">
          <div className="form-error-banner">{error}</div>
        </div>
      </section>
    )
  }
  if (!data) {
    return (
      <section className="page-content" style={{ background: T.bg }}>
        <div className="container">Loading dashboard…</div>
      </section>
    )
  }

  return (
    <section
      className="page-content"
      style={{ background: T.bg, paddingTop: 28 }}
    >
      <style>{globalCss}</style>
      <div className="container" style={{ maxWidth: 1320 }}>
        {/* HEADER */}
        <Header user={user} />

        {/* STAT STRIP */}
        <StatStrip data={data} />

        {/* TAB BAR */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: T.panel,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: 5,
            marginBottom: '1.5rem',
            boxShadow: T.shadowSoft,
            width: 'fit-content',
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          {TABS.map((t) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  background: active
                    ? 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)'
                    : 'transparent',
                  color: active ? 'white' : T.textMuted,
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: active
                    ? '0 1px 2px rgba(2,132,199,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : 'none',
                }}
              >
                {t.icon}
                {t.label}
              </button>
            )
          })}
        </div>

        <div className="rs-fade" key={tab}>
          {tab === 'tickets' && <TicketsTab onChange={reloadDashboard} />}
          {tab === 'calendar' && <CalendarTab />}
          {tab === 'overview' && <OverviewTab data={data} />}
          {tab === 'analytics' && <AnalyticsTab data={data} />}
        </div>
      </div>
    </section>
  )
}

const globalCss = `
@keyframes rsFade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }
@keyframes rsSlideIn { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
.rs-fade { animation: rsFade 0.22s ease both }
`

function Header({ user }: { user: api.User }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '1.5rem',
        padding: '1.5rem 1.75rem',
        borderRadius: 18,
        background:
          'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)',
        color: 'white',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(3,105,161,0.25)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -80,
          top: -80,
          width: 280,
          height: 280,
          borderRadius: 999,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: -40,
          bottom: -100,
          width: 240,
          height: 240,
          borderRadius: 999,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 14,
          position: 'relative',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.85,
              marginBottom: 8,
            }}
          >
            {today}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            Welcome back, {user.first_name || user.email.split('@')[0]}
          </h1>
          <p
            style={{
              margin: 0,
              marginTop: 6,
              opacity: 0.9,
              fontSize: 14,
            }}
          >
            Here's what's happening across the shop today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
          <Link
            to="/account"
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            My account
          </Link>
          <a
            href="/admin/"
            className="btn"
            style={{
              background: 'white',
              color: T.accentDeep,
              border: '1px solid white',
              fontWeight: 700,
            }}
          >
            Django admin
          </a>
        </div>
      </div>
    </div>
  )
}

function StatStrip({ data }: { data: api.DashboardData }) {
  const trend7 = data.requestsPerDay.slice(-7)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: '1.5rem',
      }}
    >
      <BigStat
        label="Total requests"
        value={data.totals.requests}
        icon={Icon.inboxIn}
        accent="#0ea5e9"
        trend={trend7}
      />
      <BigStat
        label="New (unworked)"
        value={data.totals.new}
        icon={Icon.bolt}
        accent="#3b82f6"
      />
      <BigStat
        label="Scheduled"
        value={data.totals.scheduled}
        icon={Icon.cal}
        accent="#f59e0b"
      />
      <BigStat
        label="Completed"
        value={data.totals.completed}
        icon={Icon.sparkles}
        accent="#10b981"
      />
    </div>
  )
}

function BigStat({
  label,
  value,
  icon,
  accent,
  trend,
}: {
  label: string
  value: number
  icon: React.ReactNode
  accent: string
  trend?: { date: string; count: number }[]
}) {
  return (
    <div
      style={{
        background: T.panel,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: '1.1rem 1.25rem',
        boxShadow: T.shadow,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -30,
          top: -30,
          width: 120,
          height: 120,
          borderRadius: 999,
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
          position: 'relative',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: T.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            {value.toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 12,
              color: T.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontWeight: 600,
              marginTop: 6,
            }}
          >
            {label}
          </div>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${accent}1a`,
            color: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
      {trend && trend.length > 0 && (
        <div style={{ height: 36, marginTop: 12 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs>
                <linearGradient id={`spark-${accent}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="count"
                stroke={accent}
                strokeWidth={1.6}
                fill={`url(#spark-${accent})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

// ───── TICKETS TAB ─────

function TicketsTab({ onChange }: { onChange: () => Promise<void> }) {
  const [tickets, setTickets] = useState<api.ActivityRow[] | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [view, setView] = useState<'kanban' | 'list'>('kanban')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [creating, setCreating] = useState(false)

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
          marginBottom: 14,
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: 480,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: T.textSubtle,
              pointerEvents: 'none',
              display: 'inline-flex',
            }}
          >
            {Icon.search}
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, location, message…"
            style={{
              width: '100%',
              padding: '11px 14px 11px 40px',
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              fontSize: 14,
              background: T.panel,
              outline: 'none',
              boxShadow: T.shadowSoft,
              transition: 'all 0.18s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = T.accent
              e.currentTarget.style.boxShadow = `0 0 0 4px rgba(14,165,233,0.12)`
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = T.border
              e.currentTarget.style.boxShadow = T.shadowSoft
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 4,
            background: T.panel,
            border: `1px solid ${T.border}`,
            borderRadius: 11,
            padding: 3,
            boxShadow: T.shadowSoft,
            marginLeft: 'auto',
          }}
        >
          {(['kanban', 'list'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              style={{
                padding: '6px 14px',
                background: view === v ? T.text : 'transparent',
                color: view === v ? 'white' : T.textMuted,
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.18s',
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
            background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 11,
            padding: '9px 16px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            boxShadow:
              '0 1px 3px rgba(2,132,199,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          {Icon.plus}
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
        <p style={{ color: T.textMuted }}>Loading tickets…</p>
      ) : tickets.length === 0 ? (
        <div
          style={{
            ...card({ padding: '3rem', textAlign: 'center' }),
          }}
        >
          <div
            style={{
              color: T.textSubtle,
              marginBottom: 12,
              display: 'inline-flex',
            }}
          >
            {Icon.inbox}
          </div>
          <h3 style={{ margin: 0, marginBottom: 4, fontSize: 17 }}>No tickets match</h3>
          <p style={{ color: T.textMuted, margin: 0, fontSize: 14 }}>
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
        padding: '6px 13px',
        borderRadius: 999,
        border: `1px solid ${active ? T.text : T.border}`,
        background: active ? T.text : T.panel,
        color: active ? 'white' : T.text,
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
        boxShadow: active ? '0 1px 3px rgba(11,18,32,0.2)' : 'none',
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
            color: active ? 'rgba(255,255,255,0.7)' : T.textSubtle,
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 14,
        alignItems: 'flex-start',
      }}
    >
      {columns.map((col) => (
        <div
          key={col.status}
          style={{
            background: col.meta.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: 12,
            minHeight: 220,
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
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${col.meta.dot}, ${col.meta.dot}cc)`,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              padding: '4px 4px 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: col.meta.dot,
                  boxShadow: `0 0 0 3px ${col.meta.soft}`,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: col.meta.fg,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {col.meta.label}
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: col.meta.fg,
                background: 'rgba(255,255,255,0.85)',
                padding: '2px 9px',
                borderRadius: 999,
                minWidth: 22,
                textAlign: 'center',
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
                  color: T.textSubtle,
                  textAlign: 'center',
                  padding: '24px 8px',
                  fontStyle: 'italic',
                }}
              >
                No tickets here
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
  const cost = fmtMoney(ticket.quotedAmount)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          textAlign: 'left',
          background: 'white',
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: 12,
          cursor: 'pointer',
          boxShadow: T.shadowSoft,
          transition: 'transform 0.15s, box-shadow 0.15s',
          display: 'block',
          width: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = T.shadowHover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = T.shadowSoft
        }}
      >
        <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
          <Avatar name={ticket.name} size={36} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: T.text,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {ticket.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: T.textMuted,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {ticket.service || '(no service)'}
            </div>
          </div>
        </div>
        {ticket.location && (
          <div
            style={{
              fontSize: 12,
              color: T.textSubtle,
              marginBottom: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {Icon.pin} {ticket.location}
          </div>
        )}
        {ticket.scheduledAt && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: STATUS_META.scheduled.fg,
              background: STATUS_META.scheduled.soft,
              padding: '4px 8px',
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 6,
            }}
          >
            {Icon.calendar}{' '}
            {new Date(ticket.scheduledAt).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: T.textSubtle,
            marginTop: 8,
            paddingTop: 8,
            borderTop: `1px solid ${T.borderSoft}`,
          }}
        >
          <span>{timeAgo(ticket.createdAt)}</span>
          {cost && (
            <span style={{ color: T.text, fontWeight: 700, fontSize: 13 }}>
              {cost}
            </span>
          )}
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
    <div style={{ display: 'grid', gap: 8 }}>
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
  const cost = fmtMoney(ticket.quotedAmount)

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
        onClick={() => setOpen(true)}
        style={{
          ...card({ padding: '12px 16px', cursor: 'pointer' }),
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
          transition: 'transform 0.12s, box-shadow 0.12s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = T.shadowHover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = T.shadow
        }}
      >
        <Avatar name={ticket.name} size={38} />
        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              color: T.text,
              fontSize: 15,
            }}
          >
            {ticket.name}
          </div>
          <div style={{ fontSize: 13, color: T.textMuted }}>
            {ticket.email} · {ticket.phone}
          </div>
        </div>
        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          <div style={{ fontSize: 14, color: T.text }}>
            {ticket.service || '(no service)'}
          </div>
          <div style={{ fontSize: 13, color: T.textSubtle }}>
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
              background: STATUS_META.scheduled.soft,
              padding: '4px 10px',
              borderRadius: 7,
            }}
          >
            {new Date(ticket.scheduledAt).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
        {cost && (
          <div style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>
            {cost}
          </div>
        )}
        <div
          style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          {ticket.status !== 'completed' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => apply({ status: 'completed' })}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {Icon.check} Resolve
            </button>
          )}
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
  const onCloseTicket = async () => {
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
        background: 'rgba(11,18,32,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(580px, 100%)',
          background: T.panel,
          height: '100%',
          overflowY: 'auto',
          padding: '1.5rem 1.75rem',
          boxShadow: '-12px 0 40px rgba(11,18,32,0.22)',
          animation: 'rsSlideIn 0.22s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar name={ticket.name} size={48} />
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
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 12, color: T.textMuted }}>
                  Ticket #{ticket.id}
                </span>
                <span style={{ color: T.textSubtle }}>·</span>
                <span style={{ fontSize: 12, color: T.textMuted }}>
                  {timeAgo(ticket.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: T.borderSoft,
              borderRadius: 10,
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: 16,
              color: T.textMuted,
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
                background:
                  'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 14px',
                borderRadius: 11,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow:
                  '0 1px 3px rgba(5,150,105,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              {Icon.check} Resolve
            </button>
          )}
          {ticket.status !== 'archived' && (
            <button
              type="button"
              disabled={busy}
              onClick={onCloseTicket}
              style={{
                flex: 1,
                background: T.panel,
                color: T.text,
                border: `1px solid ${T.border}`,
                padding: '10px 14px',
                borderRadius: 11,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close ticket
            </button>
          )}
        </div>

        {/* Customer */}
        <DrawerCard title="Customer">
          <KV label="Email">
            <a href={`mailto:${ticket.email}`} style={{ color: T.accent }}>
              {ticket.email}
            </a>
          </KV>
          <KV label="Phone">
            <a href={`tel:${ticket.phone}`} style={{ color: T.accent }}>
              {ticket.phone}
            </a>
          </KV>
          <KV label="Linked user">
            {ticket.userId != null ? `User #${ticket.userId}` : 'Guest'}
          </KV>
        </DrawerCard>

        {/* Request */}
        <DrawerCard title="Request">
          <KV label="Service">{ticket.service || '—'}</KV>
          <KV label="Vessel length">{ticket.vesselLengthDisplay || '—'}</KV>
          <KV label="Location">{ticket.location || '—'}</KV>
          {ticket.message && (
            <div style={{ marginTop: 10 }}>
              <SectionLabel>Message</SectionLabel>
              <div
                style={{
                  background: T.panelMuted,
                  padding: '10px 12px',
                  borderRadius: 10,
                  fontSize: 14,
                  color: T.text,
                  whiteSpace: 'pre-wrap',
                  border: `1px solid ${T.borderSoft}`,
                }}
              >
                {ticket.message}
              </div>
            </div>
          )}
        </DrawerCard>

        {/* Workflow editor */}
        <DrawerCard title="Workflow">
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
        </DrawerCard>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingTop: 16,
            borderTop: `1px solid ${T.borderSoft}`,
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {Icon.check} Saved
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
        background: 'rgba(11,18,32,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(580px, 100%)',
          background: T.panel,
          height: '100%',
          overflowY: 'auto',
          padding: '1.5rem 1.75rem',
          boxShadow: '-12px 0 40px rgba(11,18,32,0.22)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          animation: 'rsSlideIn 0.22s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
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
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>
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
              background: T.borderSoft,
              borderRadius: 10,
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: 16,
              color: T.textMuted,
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
              <option value="inspection">Underwater inspection</option>
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
            borderTop: `1px solid ${T.borderSoft}`,
          }}
        >
          <SectionLabel>Scheduling</SectionLabel>
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
            borderTop: `1px solid ${T.borderSoft}`,
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

function DrawerCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ ...card({ padding: '1rem 1.1rem', marginBottom: 14 }) }}>
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: T.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 10,
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
        borderBottom: `1px solid ${T.borderSoft}`,
      }}
    >
      <div style={{ flex: '0 0 110px', color: T.textMuted }}>{label}</div>
      <div style={{ color: T.text, flex: 1, wordBreak: 'break-word' }}>
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
          color: T.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 4, color: '#dc2626', fontSize: 13 }}>{children}</div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: `1px solid ${T.border}`,
  borderRadius: 10,
  fontSize: 14,
  background: T.panel,
  outline: 'none',
}

const twoCol: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 12,
}

function isoToLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`
}

// ───── CALENDAR TAB ─────

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
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {monthLabel}
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: T.panel,
            border: `1px solid ${T.border}`,
            borderRadius: 11,
            padding: 3,
            boxShadow: T.shadowSoft,
          }}
        >
          <CalNavBtn onClick={() => setMonthStart(addMonths(monthStart, -1))}>
            ← Prev
          </CalNavBtn>
          <CalNavBtn
            onClick={() => setMonthStart(firstOfMonth(new Date()))}
            primary
          >
            Today
          </CalNavBtn>
          <CalNavBtn onClick={() => setMonthStart(addMonths(monthStart, 1))}>
            Next →
          </CalNavBtn>
        </div>
      </div>

      <div style={{ ...card({ padding: 0, overflow: 'hidden' }) }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            background: T.borderSoft,
          }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div
              key={d}
              style={{
                background: T.panelMuted,
                padding: '11px 14px',
                fontSize: 11,
                fontWeight: 700,
                color: T.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
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
                  background: inMonth ? T.panel : T.panelMuted,
                  padding: 8,
                  minHeight: 116,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  opacity: inMonth ? 1 : 0.45,
                  transition: 'background 0.15s',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isToday ? 700 : 500,
                    color: isToday ? T.accent : T.text,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {isToday ? (
                    <span
                      style={{
                        background: T.accent,
                        color: 'white',
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                      }}
                    >
                      {day.getDate()}
                    </span>
                  ) : (
                    day.getDate()
                  )}
                </div>
                {apps.map((a) => {
                  const m = STATUS_META[a.status] ?? STATUS_META.scheduled
                  return (
                    <div
                      key={a.id}
                      title={`${a.name} — ${a.service || 'service'} at ${a.location}`}
                      style={{
                        background: m.soft,
                        color: m.fg,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '4px 7px',
                        borderRadius: 6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        borderLeft: `3px solid ${m.dot}`,
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
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        Appointments this month{' '}
        <span style={{ color: T.textMuted, fontWeight: 500 }}>
          ({calendar?.appointments.length ?? 0})
        </span>
      </h3>
      {loading ? (
        <p style={{ color: T.textMuted }}>Loading…</p>
      ) : !calendar || calendar.appointments.length === 0 ? (
        <p style={{ color: T.textMuted }}>
          Nothing scheduled this month yet. Set "Scheduled at" on a ticket from
          the Tickets tab.
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
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Avatar name={a.name} size={36} />
                <div>
                  <strong style={{ color: T.text }}>{a.name}</strong>
                  <div style={{ fontSize: 13, color: T.textMuted, marginTop: 2 }}>
                    {a.service || 'Service'} · {a.location || '—'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: T.text, fontSize: 14 }}>
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

function CalNavBtn({
  onClick,
  children,
  primary,
}: {
  onClick: () => void
  children: React.ReactNode
  primary?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        background: primary ? T.text : 'transparent',
        color: primary ? 'white' : T.text,
        border: 'none',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
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

// ───── OVERVIEW TAB ─────

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
          fontSize: 17,
          fontWeight: 700,
          color: T.text,
        }}
      >
        Requests per day · last 30
      </h2>
      <div style={{ ...card({ padding: '1rem' }) }}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={days}>
            <defs>
              <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART[0]} stopOpacity={0.32} />
                <stop offset="100%" stopColor={CHART[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: T.textMuted }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: T.textMuted }} />
            <Tooltip
              contentStyle={{
                background: T.panel,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                fontSize: 13,
                boxShadow: T.shadow,
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke={CHART[0]}
              strokeWidth={2.5}
              fill="url(#reqGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 12,
          marginTop: 14,
        }}
      >
        <div style={card()}>
          <h3 style={chartTitle}>Status funnel</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.statusFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: T.textMuted }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: T.textMuted }} />
              <Tooltip
                contentStyle={{
                  background: T.panel,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  fontSize: 13,
                  boxShadow: T.shadow,
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {data.statusFunnel.map((row, i) => (
                  <Cell
                    key={i}
                    fill={STATUS_META[row.status]?.dot ?? CHART[0]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card()}>
          <h3 style={chartTitle}>Top services</h3>
          {data.topServices.length === 0 ? (
            <p style={{ color: T.textMuted }}>No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data.topServices}
                  dataKey="count"
                  nameKey="service"
                  outerRadius={80}
                  innerRadius={42}
                  paddingAngle={2}
                  label
                >
                  {data.topServices.map((_, i) => (
                    <Cell key={i} fill={CHART[i % CHART.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: T.panel,
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    boxShadow: T.shadow,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div style={card()}>
          <h3 style={chartTitle}>Top locations</h3>
          {data.topLocations.length === 0 ? (
            <p style={{ color: T.textMuted }}>No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={data.topLocations.slice(0, 8)}
                layout="vertical"
                margin={{ left: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: T.textMuted }} />
                <YAxis
                  type="category"
                  dataKey="location"
                  tick={{ fontSize: 12, fill: T.textMuted }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    background: T.panel,
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    boxShadow: T.shadow,
                  }}
                />
                <Bar dataKey="count" fill={CHART[2]} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  )
}

const chartTitle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 15,
  fontWeight: 700,
  color: T.text,
  letterSpacing: '-0.01em',
}

// ───── ANALYTICS TAB ─────

function AnalyticsTab({ data }: { data: api.DashboardData }) {
  if (!data.analytics.available) {
    return (
      <div style={{ ...card({ padding: '3rem', textAlign: 'center' }) }}>
        <div
          style={{
            color: T.textSubtle,
            marginBottom: 12,
            display: 'inline-flex',
          }}
        >
          {Icon.inbox}
        </div>
        <p style={{ color: T.textMuted, margin: 0 }}>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          marginBottom: '1rem',
        }}
      >
        <BigStat
          label="Page views"
          value={a.totals?.pageviews ?? 0}
          icon={Icon.trend}
          accent="#a855f7"
        />
        <BigStat
          label="Unique sessions"
          value={a.totals?.uniqueSessions ?? 0}
          icon={Icon.bolt}
          accent="#06b6d4"
        />
        <BigStat
          label="Tracked events"
          value={a.totals?.events ?? 0}
          icon={Icon.sparkles}
          accent="#f59e0b"
        />
      </div>

      <h2
        style={{
          margin: 0,
          marginBottom: 12,
          marginTop: '1.25rem',
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        Traffic · last 30 days
      </h2>
      <div style={{ ...card({ padding: '1rem' }) }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={(a.pageviewsPerDay ?? []).map((d) => ({
              date: shortDate(d.date),
              views: d.count,
            }))}
          >
            <defs>
              <linearGradient id="trafGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART[3]} stopOpacity={0.36} />
                <stop offset="100%" stopColor={CHART[3]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: T.textMuted }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: T.textMuted }} />
            <Tooltip
              contentStyle={{
                background: T.panel,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                fontSize: 13,
                boxShadow: T.shadow,
              }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke={CHART[3]}
              strokeWidth={2.5}
              fill="url(#trafGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 12,
          marginTop: 14,
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
  const max = Math.max(...items.map((i) => i.count), 1)
  return (
    <div style={card()}>
      <h3 style={chartTitle}>{title}</h3>
      {items.length === 0 ? (
        <p style={{ color: T.textMuted }}>No data yet.</p>
      ) : (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.slice(0, 10).map((item, i) => (
            <li key={`${item.label}-${i}`} style={{ marginBottom: 6 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginRight: 12,
                    color: T.text,
                  }}
                >
                  {item.label || '(empty)'}
                </span>
                <strong style={{ color: T.text }}>{item.count}</strong>
              </div>
              <div
                style={{
                  height: 4,
                  background: T.borderSoft,
                  borderRadius: 999,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(item.count / max) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${CHART[i % CHART.length]}, ${CHART[i % CHART.length]}aa)`,
                    borderRadius: 999,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
