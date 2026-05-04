/**
 * Tiny client for the Django backend.
 *
 * Base URL is configured via VITE_API_URL. When unset (production single-service
 * deploy) we default to a same-origin "/api" prefix, which is what Django routes.
 *
 * Auth uses Django's session middleware. We always send credentials and echo
 * the csrftoken cookie in the X-CSRFToken header on unsafe methods.
 */

const RAW_BASE = (import.meta.env.VITE_API_URL ?? '').trim()
export const API_BASE = RAW_BASE ? RAW_BASE.replace(/\/$/, '') : ''

export class ApiError extends Error {
  status: number
  fieldErrors?: Record<string, string>

  constructor(status: number, message: string, fieldErrors?: Record<string, string>) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

function readCookie(name: string): string | null {
  const match = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}

async function request<TResponse>(
  method: string,
  path: string,
  body?: unknown,
): Promise<TResponse> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }
  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = readCookie('csrftoken')
    if (csrf) headers['X-CSRFToken'] = csrf
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (res.status === 204) {
    return undefined as TResponse
  }

  const text = await res.text()
  let parsed: any = null
  if (text) {
    try {
      parsed = JSON.parse(text)
    } catch {
      // Non-JSON response — leave parsed as null.
    }
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      parsed?.error ?? `Request failed (${res.status})`,
      parsed?.errors,
    )
  }
  return parsed as TResponse
}

const get = <T>(path: string) => request<T>('GET', path)
const post = <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {})

// ───── Auth ─────

export type User = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
  is_superuser: boolean
}

export const ensureCsrf = () => get<{ csrfToken: string }>('/api/auth/csrf/')
export const fetchMe = () => get<{ user: User | null }>('/api/auth/me/')

export const signup = (data: {
  email: string
  password: string
  firstName: string
  lastName?: string
}) => post<{ user: User }>('/api/auth/signup/', data)

export const login = (data: { email: string; password: string }) =>
  post<{ user: User }>('/api/auth/login/', data)

export const logout = () => post<{ status: string }>('/api/auth/logout/')

// ───── Inquiries ─────

export type ContactInquiryPayload = {
  name: string
  email: string
  phone: string
  vesselLength?: string
  service?: string
  location?: string
  message?: string
}

export type BookingRequestPayload = {
  name: string
  email: string
  phone: string
  serviceId: string
  vesselType: string
  vesselLength: number
  location: string
  preferredDate: string
  notes?: string
}

export type InquiryReceipt = { id: number; status: 'received' }

export const submitContactInquiry = (data: ContactInquiryPayload) =>
  post<InquiryReceipt>('/api/inquiries/', data)

export const submitBookingRequest = (data: BookingRequestPayload) =>
  post<InquiryReceipt>('/api/bookings/', data)

// ───── My submissions ─────

export type MyInquiry = {
  id: number
  name: string
  email: string
  phone: string
  service: string
  vesselLength: string
  location: string
  message: string
  status: string
  statusDisplay: string
  createdAt: string
  updatedAt: string
}

export type MyBooking = {
  id: number
  name: string
  email: string
  phone: string
  serviceId: string
  vesselType: string
  vesselLengthFt: number
  location: string
  preferredDate: string
  notes: string
  status: string
  statusDisplay: string
  createdAt: string
  updatedAt: string
}

export const fetchMyInquiries = () =>
  get<{ inquiries: MyInquiry[] }>('/api/me/inquiries/')

export const fetchMyBookings = () =>
  get<{ bookings: MyBooking[] }>('/api/me/bookings/')

// ───── Staff dashboard ─────

export type DashboardData = {
  totals: { inquiries: number; bookings: number; new: number; completed: number }
  leadsPerDay: { date: string; inquiries: number; bookings: number; total: number }[]
  statusFunnel: { status: string; label: string; count: number }[]
  topServices: { service: string; count: number }[]
  topLocations: { location: string; count: number }[]
  recentActivity: {
    type: 'inquiry' | 'booking'
    id: number
    name: string
    service: string
    status: string
    createdAt: string
  }[]
  analytics: {
    available: boolean
    totals?: { pageviews: number; events: number; uniqueSessions: number }
    pageviewsPerDay?: { date: string; count: number }[]
    topPaths?: { path: string; count: number }[]
    topReferrers?: { referrer: string; count: number }[]
    topSources?: { source: string; count: number }[]
    topExitPaths?: { path: string; count: number }[]
    topClicks?: { target: string; count: number }[]
  }
}

export const fetchDashboard = () =>
  get<DashboardData>('/api/staff/dashboard/')

// ───── Analytics tracking ─────

export type PageViewPayload = {
  sessionId: string
  path: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export type EventPayload = {
  sessionId: string
  name: string
  path?: string
  target?: string
  durationMs?: number
  properties?: Record<string, unknown>
}

export const trackPageView = (data: PageViewPayload) =>
  post('/api/analytics/pageview/', data).catch(() => {
    /* swallow — tracking should never break the app */
  })

export const trackEvent = (data: EventPayload) =>
  post('/api/analytics/event/', data).catch(() => {
    /* swallow */
  })
