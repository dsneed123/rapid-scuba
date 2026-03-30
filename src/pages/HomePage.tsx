import { Link } from 'react-router-dom'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SERVICES } from '@/lib/services'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function HomePage() {
  return (
    <>
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
            <strong>15+</strong>
            <span>Years Experience</span>
          </div>
          <div className="trust-bar__item">
            <strong>3,200+</strong>
            <span>Vessels Serviced</span>
          </div>
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
              For over 15 years, Rapid Scuba has been the go-to underwater services provider for
              Seattle's maritime community. Our ADCI-certified commercial divers and AWS D3.6-certified
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
              <span className="about__stat-value">3,200+</span>
              <span className="about__stat-label">Vessels Serviced</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">15+</span>
              <span className="about__stat-label">Years in Seattle</span>
            </div>
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
