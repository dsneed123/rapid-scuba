import { Link } from 'react-router-dom'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SERVICES } from '@/lib/services'
import { PageHead } from '@/components/seo/PageHead'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rapid Scuba',
  telephone: '+12062402687',
  url: 'https://rapidscuba.com',
  description:
    'ADCI-certified commercial divers offering hull cleaning, underwater welding, propeller cleaning, and boat repair in Seattle and Puget Sound.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  areaServed: [
    'Seattle',
    'Puget Sound',
    'Lake Union',
    'Lake Washington',
    'Shilshole Bay',
    'Elliott Bay',
    'Edmonds',
    'Des Moines',
  ],
  priceRange: '$3000-$5000+',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Marine Underwater Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hull Cleaning Seattle' } },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Underwater Welding Seattle' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Propeller Cleaning Seattle' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Zinc Anode Replacement Seattle' },
      },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hull Inspection Seattle' } },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Underwater Boat Repair Seattle' },
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '87',
  },
}

export function HomePage() {
  return (
    <>
      <PageHead
        title="Rapid Scuba — Seattle Underwater Welding & Hull Cleaning | 206-240-2687"
        description="ADCI-certified commercial divers serving Seattle, Puget Sound, Lake Union & Lake Washington. Hull cleaning, underwater welding, propeller cleaning. Same-day service. Call 206-240-2687."
        canonical="/"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">
            Seattle's Premier<br />
            Underwater Welding &amp; Hull Cleaning
          </h1>
          <p className="hero__subtitle">
            ADCI-Certified Commercial Divers Serving Puget Sound, Lake Union &amp; Lake Washington — Same-Day Service Available
          </p>
          <div className="hero__actions">
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

      {/* Trust bar */}
      <section className="trust-bar">
        <div className="container trust-bar__inner">
          <div className="trust-bar__item">
            <strong>ADCI &amp; AWS</strong>
            <span>Certified Divers &amp; Welders</span>
          </div>
          <div className="trust-bar__item">
            <strong>24/7</strong>
            <span>Emergency Response</span>
          </div>
          <div className="trust-bar__item">
            <strong>47,000+</strong>
            <span>WA Registered Vessels</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section about" id="about">
        <div className="container about__inner">
          <div className="about__text">
            <h2 className="section__title">Seattle's Most Trusted Underwater Services Team</h2>
            <p className="about__lead">
              Rapid Scuba is Seattle's go-to underwater services provider. Our ADCI-certified
              commercial divers and AWS D3.6-certified
              underwater welders deliver professional below-waterline services — without the cost
              or downtime of dry-docking. We come to your slip.
            </p>
            <p>
              We service vessels at <strong>Shilshole Bay Marina</strong>, <strong>Eastlake Marina</strong>,{' '}
              <strong>Portage Bay</strong>, <strong>Lake Union</strong>, <strong>Lake Washington</strong>,{' '}
              <strong>Elliott Bay</strong>, and every marina and anchorage across Puget Sound. From
              28-foot sailboats to 200-foot commercial tugs, our divers bring the job to your berth — often
              same-day.
            </p>
            <ul className="about__highlights">
              <li>ADCI-certified commercial divers &amp; AWS D3.6 underwater welders</li>
              <li>Licensed, bonded &amp; fully insured ($1M+ liability)</li>
              <li>OSHA 29 CFR 1910.430 compliant operations</li>
              <li>Before/after underwater video documentation on every job</li>
              <li>Same-day or next-day service availability</li>
              <li>Emergency dive response 24/7 — diver in the water within 2 hours</li>
            </ul>
          </div>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">20+</span>
              <span className="about__stat-label">Marinas Covered</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">4.9★</span>
              <span className="about__stat-label">Google Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Our Services</h2>
          <p className="section__subtitle">
            Everything your vessel needs below the waterline — scheduled or emergency.
          </p>
          <div className="card-grid">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why In-Water */}
      <section className="section" style={{ background: 'var(--ocean-100)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <h2 className="section__title">Why In-Water Service Beats Dry-Docking</h2>
          <p className="section__subtitle" style={{ maxWidth: '100%' }}>
            A fouled hull reduces fuel efficiency by <strong>10–40%</strong>. Drydock haul-outs cost thousands
            and take your vessel out of commission for days. Our in-water services are completed in hours at your
            slip — at a fraction of the cost. Puget Sound's cold, nutrient-rich water produces aggressive
            biofouling, meaning hulls need cleaning every <strong>60–90 days</strong> to maintain peak performance.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <h2>Get a Free Quote — We'll Respond Within 24 Hours</h2>
          <p>Same-day service available. We come to your marina. No need to move your vessel.</p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Get a Free Quote
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
