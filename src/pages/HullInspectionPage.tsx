import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hull Inspection Seattle',
  serviceType: 'Underwater Hull Inspection',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Rapid Scuba',
    telephone: '+12062402687',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    areaServed: 'Seattle, WA and Puget Sound',
  },
  description:
    'Comprehensive below-waterline hull inspection with HD video documentation by ADCI-certified divers in Seattle. Pre-purchase surveys, annual condition assessments, post-grounding inspections, and insurance documentation. Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas. Starting at $200.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '200',
    highPrice: '500',
    offerCount: '2',
  },
}

export function HullInspectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Hull Inspection Seattle</h1>
          <p>
            Comprehensive below-waterline inspection with HD video documentation for pre-purchase
            surveys, annual maintenance, and insurance requirements in Seattle and Puget Sound.
            ADCI-certified divers. No haul-out required.
          </p>
          <div className="page-hero__actions">
            <Link to="/contact" className="btn btn--primary btn--lg">
              Get a Free Quote
            </Link>
            <a href={PHONE_HREF} className="hero__phone">
              <span className="hero__phone-icon">📞</span>
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container" style={{ maxWidth: '800px' }}>
          <p>
            Our underwater hull inspections provide a complete picture of your vessel's
            below-waterline condition using HD video cameras to document every detail. We cover the
            full hull plate surface from stem to stern, the keel and keel attachment area, rudder and
            rudder bearing condition, propeller and shaft, cutlass bearing area, through-hull fittings,
            and all zinc anodes. A written findings report is provided after every inspection.
          </p>
          <p>
            Pre-purchase inspections are one of our most requested services — we can typically
            schedule within 24–48 hours and complete the dive and written report the same day. Issues
            that are expensive to fix — keel bolt corrosion, propeller shaft damage, dezincified
            through-hull fittings, advanced osmotic blistering — are invisible above the waterline
            and often absent from a seller's disclosure. Our inspection gives you documented,
            objective information before the sale closes.
          </p>
          <p>
            We also perform annual maintenance inspections, post-grounding assessments, and insurance
            documentation dives. Inspections start at $200 for vessels up to 40 ft, with full HD
            video documentation packages up to $500 for larger or more complex vessels. We serve all
            Seattle-area marinas including Shilshole Bay, Lake Union, Elliott Bay, Lake Washington,
            and Bainbridge Island.
          </p>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">
              Schedule Inspection
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Schedule a hull inspection today</h2>
          <p>
            Starting from $200. Full video documentation included. Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request online — same-day and next-day availability.
          </p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request Inspection
            </Link>
            <a href={PHONE_HREF} className="cta__phone">
              {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
