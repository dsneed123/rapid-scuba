/**
 * Tiny client for the Django backend.
 *
 * Base URL is configured via VITE_API_URL. When unset (production single-service
 * deploy) we default to a same-origin "/api" prefix, which is what Django routes.
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

async function postJSON<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return (await res.json()) as TResponse
  }

  let detail: { errors?: Record<string, string>; error?: string } = {}
  try {
    detail = await res.json()
  } catch {
    // Server returned non-JSON — fall through with empty detail.
  }
  throw new ApiError(
    res.status,
    detail.error ?? 'Request failed',
    detail.errors,
  )
}

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
  postJSON<InquiryReceipt>('/api/inquiries/', data)

export const submitBookingRequest = (data: BookingRequestPayload) =>
  postJSON<InquiryReceipt>('/api/bookings/', data)
