import { Link } from 'react-router-dom'
import { useDocumentHead } from '@/hooks/useDocumentHead'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Propeller Cleaning Seattle',
  serviceType: 'Underwater Propeller Cleaning and Polishing',
  provider: {
    '@type': 'LocalBusiness',
    name: 'RapidScuba',
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
    'Professional underwater propeller cleaning and polishing by ADCI-certified divers in Seattle. Marine growth removal, pitting repair, and blade polishing at your slip — no haul-out required. Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '500',
    highPrice: '1500',
    offerCount: '3',
  },
}

export function PropellerCleaningPage() {
  useDocumentHead({
    title: 'Propeller Polishing Seattle | Prop Cleaning | RapidScuba',
    description:
      'Restore fuel efficiency and reduce vibration with professional propeller polishing in Seattle. Same-day in-water service at Shilshole Bay, Lake Union, Elliott Bay, and Puget Sound marinas. ADCI-certified divers. Free quote.',
    canonical: 'https://rapidscuba.com/propeller-cleaning-seattle',
  })
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Propeller Cleaning &amp; Polishing Seattle</h1>
          <p>
            ADCI-certified divers clean, polish, and inspect propeller blades at your slip — no
            haul-out required. Reduced vibration, better fuel economy, and extended prop life.
            Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas.
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
            Our propeller cleaning service removes all marine growth from each blade face and hub,
            then polishes blade surfaces using progressively finer abrasive pads to achieve a smooth
            hydrodynamic finish. A polished prop generates more thrust per revolution, runs cooler,
            and produces less vibration than even a mildly roughened surface. We also clear the shaft
            of slime, remove any wrapped rope or fishing line, and inspect each blade edge for nicks
            and cavitation damage.
          </p>
          <p>
            In Puget Sound's nutrient-rich waters, propeller blades develop biofilm within days and
            visible barnacle growth within 60–90 days. A fouled propeller increases fuel consumption
            by 10–25% and creates harmonic vibration that loosens fittings and fatigues shaft
            couplings over time. We recommend propeller cleaning every 90 days for most Seattle-area
            vessels — every 60 days during summer for high-fouling locations like Shilshole Bay and
            Elliott Bay.
          </p>
          <p>
            For maximum efficiency, schedule propeller cleaning alongside a{' '}
            <Link to="/hull-cleaning-seattle">hull cleaning</Link>. The combination of a clean hull
            and polished props delivers the full fuel efficiency benefit. We serve all Seattle-area
            marinas including Shilshole Bay, Lake Union, Eastlake, Portage Bay, Elliott Bay, Lake
            Washington, and Bainbridge Island.
          </p>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Schedule propeller cleaning in Seattle</h2>
          <p>
            Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request a quote online. We respond within one business day.
          </p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request Service
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
