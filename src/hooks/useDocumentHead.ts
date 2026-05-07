import { useEffect } from 'react'

type DocHead = {
  title?: string
  description?: string
  canonical?: string
}

const DEFAULTS = {
  title: 'RapidScuba — Seattle Hull Cleaning & Underwater Marine Services',
  description:
    'ADCI-certified divers serving Seattle and Puget Sound marinas. In-water hull cleaning, propeller polishing, hull inspection, zinc anode replacement, and underwater welding.',
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets <title>, meta description, canonical URL, and OG/Twitter mirrors for
 * the current page. Call from the top of any page component.
 *
 * On unmount, restores the document defaults so navigating away doesn't
 * leave stale metadata.
 */
export function useDocumentHead({ title, description, canonical }: DocHead) {
  useEffect(() => {
    const finalTitle = title || DEFAULTS.title
    const finalDesc = description || DEFAULTS.description
    const finalCanonical =
      canonical ||
      (typeof window !== 'undefined'
        ? `https://rapidscuba.com${window.location.pathname}`
        : 'https://rapidscuba.com/')

    document.title = finalTitle
    setMeta('description', finalDesc)
    setMeta('og:title', finalTitle, 'property')
    setMeta('og:description', finalDesc, 'property')
    setMeta('og:url', finalCanonical, 'property')
    setMeta('twitter:title', finalTitle)
    setMeta('twitter:description', finalDesc)
    setLink('canonical', finalCanonical)

    return () => {
      // Restore defaults when this page unmounts.
      document.title = DEFAULTS.title
      setMeta('description', DEFAULTS.description)
      setMeta('og:title', DEFAULTS.title, 'property')
      setMeta('og:description', DEFAULTS.description, 'property')
    }
  }, [title, description, canonical])
}
