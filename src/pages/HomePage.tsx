import { Link } from 'react-router-dom'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SERVICES } from '@/lib/services'

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">
            Seattle's Premier
            <br />
            Underwater Marine Services
          </h1>
          <p className="hero__subtitle">
            Hull cleaning, underwater welding, and full below-waterline maintenance — without the
            cost of dry-docking. Serving Puget Sound since 2009.
          </p>
          <div className="hero__actions">
            <Link to="/book" className="btn btn--primary btn--lg">
              Book a Dive
            </Link>
            <Link to="/services" className="btn btn--outline btn--lg">
              Our Services
            </Link>
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
          <Link to="/book" className="btn btn--white btn--lg">
            Request a Booking
          </Link>
        </div>
      </section>
    </>
  )
}
