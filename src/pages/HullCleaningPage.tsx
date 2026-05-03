import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hull Cleaning Seattle',
  serviceType: 'Underwater Hull Cleaning',
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
    'Professional underwater hull cleaning by ADCI-certified divers in Seattle. Barnacle, algae, and biofouling removal at your slip — no haul-out required. Serving Shilshole Bay, Lake Union, Eastlake, Portage Bay, and all Puget Sound marinas.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '500',
    highPrice: '1500',
    offerCount: '3',
  },
}

export function HullCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Hull Cleaning Seattle — Professional Underwater Boat Hull Cleaning</h1>
          <p>
            ADCI-certified divers remove barnacles, algae, and biofouling at your slip — no
            haul-out required. Serving Shilshole Bay, Lake Union, Eastlake, Portage Bay, and all
            Puget Sound marinas.
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
            Underwater hull cleaning is performed entirely in-water at your berth. Our ADCI-certified
            divers work systematically from the waterline down to the keel using hydraulic rotary
            brushes for open flat surfaces and hand scrapers for tight areas around the keel, rudder,
            shaft, and through-hull fittings. The vessel stays in its slip throughout — no haul-out
            fees, no dry-dock scheduling, and no waiting days for a travel lift slot.
          </p>
          <p>
            Puget Sound's cold, nutrient-rich water produces aggressive biofouling year-round.
            Barnacles, algae, and marine growth attach within days of submersion, and a fouled hull
            can increase drag by 25–40%, costing you hundreds in extra fuel per trip. We recommend
            cleaning every 60–90 days in saltwater and every 3–6 months for freshwater marinas like
            Lake Union and Lake Washington. Regular cleaning keeps your antifouling paint intact and
            working while maintaining peak fuel efficiency.
          </p>
          <p>
            Every hull cleaning includes a full visual below-waterline inspection — we report any
            blistering, corrosion, or zinc anode issues we find at no extra cost. HD video
            documentation is included so you have a complete record of the work performed. We serve
            Shilshole Bay, Lake Union, Eastlake, Portage Bay, Elliott Bay, Lake Washington,
            Bainbridge Island, and every marina across Puget Sound.
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
          <h2>Schedule hull cleaning in Seattle</h2>
          <p>
            Call <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>{PHONE}</a> or
            request a quote online. We respond within one business day.
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
