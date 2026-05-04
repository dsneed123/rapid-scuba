import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent, trackPageView } from '@/lib/api'

const SESSION_KEY = 'rs.session'
const SESSION_TTL_MS = 30 * 60 * 1000 // 30-min idle window
const UTM_KEY = 'rs.utm'

type StoredSession = { id: string; updatedAt: number }
type StoredUtm = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function getSessionId(): string {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoredSession
      if (Date.now() - parsed.updatedAt < SESSION_TTL_MS) {
        parsed.updatedAt = Date.now()
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed))
        return parsed.id
      }
    }
  } catch {
    /* sessionStorage unavailable / parse error */
  }
  const fresh: StoredSession = { id: genId(), updatedAt: Date.now() }
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(fresh))
  } catch {
    /* ignore */
  }
  return fresh.id
}

function readUtmParams(): StoredUtm {
  // We use HashRouter, so the canonical URL is e.g. /#/contact?utm_source=...
  // UTMs typically arrive on the *outer* URL though, so check both window.location
  // and any embedded query string after the hash.
  const out: StoredUtm = {}
  const sources: URLSearchParams[] = []
  if (window.location.search) {
    sources.push(new URLSearchParams(window.location.search))
  }
  if (window.location.hash.includes('?')) {
    sources.push(
      new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf('?'))),
    )
  }
  for (const params of sources) {
    const s = params.get('utm_source')
    if (s) out.utmSource = s
    const m = params.get('utm_medium')
    if (m) out.utmMedium = m
    const c = params.get('utm_campaign')
    if (c) out.utmCampaign = c
    const t = params.get('utm_term')
    if (t) out.utmTerm = t
    const k = params.get('utm_content')
    if (k) out.utmContent = k
  }
  return out
}

function rememberUtm(utm: StoredUtm) {
  if (Object.keys(utm).length === 0) return
  try {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
  } catch {
    /* ignore */
  }
}

function recallUtm(): StoredUtm {
  try {
    const raw = sessionStorage.getItem(UTM_KEY)
    if (raw) return JSON.parse(raw) as StoredUtm
  } catch {
    /* ignore */
  }
  return {}
}

/**
 * Wires up automatic page-view tracking on every route change, click tracking
 * on `[data-track]` elements, and an "exit" event on tab close with the
 * total time the user spent on this page.
 *
 * Mount once near the top of the app inside the Router.
 */
export function useAnalytics() {
  const location = useLocation()
  const enterTimeRef = useRef<number>(Date.now())
  const lastPathRef = useRef<string>('')
  const sessionIdRef = useRef<string>(getSessionId())

  useEffect(() => {
    const utmFromUrl = readUtmParams()
    rememberUtm(utmFromUrl)
    const utm = { ...recallUtm(), ...utmFromUrl }

    const path = location.pathname + location.search
    if (path === lastPathRef.current) return
    lastPathRef.current = path
    enterTimeRef.current = Date.now()

    void trackPageView({
      sessionId: sessionIdRef.current,
      path,
      referrer: document.referrer || undefined,
      ...utm,
    })
  }, [location])

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const el = (ev.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
      if (!el) return
      const target = el.getAttribute('data-track') ?? el.tagName
      void trackEvent({
        sessionId: sessionIdRef.current,
        name: 'click',
        path: location.pathname + location.search,
        target: target.slice(0, 200),
        properties: {
          text: (el.innerText || '').trim().slice(0, 120),
          href: el.getAttribute('href') ?? undefined,
        },
      })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [location])

  useEffect(() => {
    const fireExit = () => {
      const durationMs = Date.now() - enterTimeRef.current
      const path = lastPathRef.current
      if (!path) return
      const payload = JSON.stringify({
        sessionId: sessionIdRef.current,
        name: 'exit',
        path,
        durationMs,
      })
      // sendBeacon is the only way to reliably get a request out during unload.
      try {
        const blob = new Blob([payload], { type: 'application/json' })
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/analytics/event/', blob)
          return
        }
      } catch {
        /* fall through to fetch */
      }
      void trackEvent({
        sessionId: sessionIdRef.current,
        name: 'exit',
        path,
        durationMs,
      })
    }
    window.addEventListener('beforeunload', fireExit)
    return () => window.removeEventListener('beforeunload', fireExit)
  }, [])
}
