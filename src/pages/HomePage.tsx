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
            Underwater Ship Services
          </h1>
          <p className="hero__subtitle">
            Professional Hull Cleaning, Underwater Welding &amp; Marine Maintenance
          </p>
          <div className="hero__actions">
            <Link to="/book" className="btn btn--primary btn--lg">
              Book Now
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
            <strong>2,000+</strong>
            <span>Vessels Serviced</span>
          </div>
          <div className="trust-bar__item">
            <strong>ADCI</strong>
            <span>Certified Divers</span>
          </div>
          <div className="trust-bar__item">
            <strong>24/7</strong>
            <span>Emergency Response</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section about" id="about">
        <div className="container about__inner">
          <div className="about__text">
            <h2 className="section__title">About Rapid Scuba</h2>
            <p className="about__lead">
              Rapid Scuba has been serving the Seattle maritime community for over 15 years. Our
              team of certified commercial divers specializes in underwater hull cleaning and
              welding, delivering professional below-waterline services without the cost or
              downtime of dry-docking.
            </p>
            <p>
              We operate throughout the greater Seattle area, including{' '}
              <strong>Puget Sound</strong>, <strong>Lake Union</strong>,{' '}
              <strong>Lake Washington</strong>, and all Seattle-area marinas. Whether you
              captain a sailboat, motor yacht, commercial vessel, or working tug, our divers
              bring the job to your berth.
            </p>
            <ul className="about__highlights">
              <li>ADCI-certified commercial diving crew</li>
              <li>Licensed, bonded &amp; fully insured</li>
              <li>All Seattle-area marinas &amp; anchorages</li>
              <li>Emergency response available 24/7</li>
            </ul>
          </div>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">2,000+</span>
              <span className="about__stat-label">Vessels Serviced</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">15+</span>
              <span className="about__stat-label">Years in Seattle</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">4</span>
              <span className="about__stat-label">Service Regions</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">24/7</span>
              <span className="about__stat-label">Emergency Line</span>
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

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready to schedule a dive?</h2>
          <p>We respond to all requests within one business day.</p>
          <div className="cta__actions">
            <Link to="/book" className="btn btn--white btn--lg">
              Book Now
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
