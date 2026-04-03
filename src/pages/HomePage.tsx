import { Link } from 'react-router-dom'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SERVICES } from '@/lib/services'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rapid Scuba',
  telephone: '+12062402687',
  url: 'https://rapidscuba.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'Place', name: 'Shilshole Bay Marina, Seattle, WA' },
    { '@type': 'Place', name: 'Lake Union, Seattle, WA' },
    { '@type': 'Place', name: 'Eastlake, Seattle, WA' },
    { '@type': 'Place', name: 'Portage Bay, Seattle, WA' },
    { '@type': 'Place', name: 'Elliott Bay Marina, Seattle, WA' },
    { '@type': 'Place', name: 'Lake Washington, WA' },
    { '@type': 'Place', name: 'Bainbridge Island, WA' },
    { '@type': 'Place', name: 'Puget Sound, WA' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
}

export function HomePage() {
  return (
    <>
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

      {/* Service Areas */}
      <section className="section" id="service-areas">
        <div className="container">
          <h2 className="section__title">Seattle Marina Service Areas</h2>
          <p className="section__subtitle">
            We come to your slip throughout Seattle, Puget Sound, and greater King County — no haul-out, no trailering.
          </p>
          <div className="card-grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Shilshole Bay Marina — Ballard</h3>
              <p>
                The largest marina in the Pacific Northwest with 1,400+ slips, Shilshole Bay Marina
                is one of our most active service locations. Hull cleaning Shilshole Bay is needed
                year-round due to the marina's direct saltwater exposure and strong biofouling
                pressure from Puget Sound tidal exchange. We also perform zinc anode replacement
                Shilshole Bay for vessels experiencing accelerated corrosion from neighboring shore
                power connections.
              </p>
            </div>
            <div className="info-box">
              <h3>Lake Union — Houseboats &amp; Marina Row</h3>
              <p>
                Lake Union's mix of liveaboard houseboats, classic sailboats, wooden vessels, and
                marina restaurants makes it one of Seattle's most diverse mooring areas. Hull
                cleaning Lake Union targets freshwater algae and slime rather than barnacles —
                a different fouling profile than saltwater locations. Underwater welding Lake Union
                is common on older wooden and steel vessels at Westlake Marina and Lake Union Drydock.
              </p>
            </div>
            <div className="info-box">
              <h3>Eastlake &amp; Portage Bay — Quiet Moorage</h3>
              <p>
                Eastlake and Portage Bay offer calm, protected freshwater moorage close to the
                University of Washington. Hull cleaning Eastlake and propeller cleaning Portage Bay
                follow the same freshwater schedule as Lake Union — every 3–6 months for most
                vessels. The proximity to the Ship Canal makes these some of the most conveniently
                accessible locations for our dive team.
              </p>
            </div>
            <div className="info-box">
              <h3>Elliott Bay Marina — Downtown Waterfront</h3>
              <p>
                Elliott Bay Marina sits on Seattle's downtown waterfront and sees heavy commercial
                traffic alongside recreational vessels. Saltwater exposure, ferry wakes, and dense
                mooring conditions make hull cleaning Elliott Bay one of the most frequently
                scheduled services in our rotation. Underwater welding Elliott Bay is common for
                dock hardware, piling repairs, and commercial vessel structural work.
              </p>
            </div>
            <div className="info-box">
              <h3>Lake Washington — Kirkland &amp; Bellevue Side</h3>
              <p>
                Lake Washington's freshwater marinas — including Kirkland Marina, Carillon Point,
                and Meydenbauer Bay on the Bellevue side — require hull cleaning Lake Washington
                on a longer interval than saltwater locations. Algae and biofilm accumulate quickly
                in the warm summer months. Zinc anode replacement Lake Washington uses aluminum
                anodes rather than zinc, which are better suited to freshwater conductivity levels.
              </p>
            </div>
            <div className="info-box">
              <h3>Bainbridge Island — Ferry Accessible</h3>
              <p>
                We serve Bainbridge Island marinas including Eagle Harbor and Port Madison via
                ferry and private vessel. Hull cleaning Bainbridge Island and propeller cleaning
                Bainbridge Island follow Puget Sound saltwater schedules — every 60–90 days during
                summer. Our crew regularly makes the crossing for both scheduled maintenance and
                emergency dive response on vessels based at Eagle Harbor Marina.
              </p>
            </div>
          </div>
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
