import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://rapidscuba.com'
const OG_IMAGE = `${BASE_URL}/favicon.svg`

interface PageHeadProps {
  title: string
  description: string
  /** Path after BASE_URL, e.g. "/" or "/#/hull-cleaning-seattle" */
  canonical: string
  ogType?: 'website' | 'article'
  ogTitle?: string
  ogDescription?: string
}

export function PageHead({
  title,
  description,
  canonical,
  ogType = 'website',
  ogTitle,
  ogDescription,
}: PageHeadProps) {
  const canonicalUrl = `${BASE_URL}${canonical}`
  const resolvedOgTitle = ogTitle ?? title
  const resolvedOgDesc = ogDescription ?? description

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Rapid Scuba" />
      <meta property="og:image" content={OG_IMAGE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  )
}
