import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function BoatRepairPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Underwater Boat Repair Seattle</h1>
          <p>
            In-water hull repairs, through-hull work, and below-waterline maintenance for Seattle
            vessels — faster and more affordable than hauling out.
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
        <div className="container page-content__grid">
          <div>
            <h2>Underwater Repairs Without the Haul-Out</h2>
            <p>
              Many below-waterline repairs can be completed in-water by our certified commercial
              diving team. From through-hull fitting replacement to minor hull patching, we bring
              professional repair capability directly to your slip.
            </p>
            <p>
              Our divers assess the repair scope underwater, provide a clear estimate, and complete
              most jobs in a single visit — saving you haul-out fees and weeks of waiting.
            </p>
            <ul>
              <li>Through-hull fitting replacement and repair</li>
              <li>Seacock inspection and service</li>
              <li>Hull patch and epoxy repair (minor damage)</li>
              <li>Keel bolt inspection and tightening</li>
              <li>Rudder bearing and gudgeon repair</li>
              <li>Transducer installation and replacement</li>
              <li>Depth sounder and speed paddle replacement</li>
              <li>Emergency leak response 24/7</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>Emergency Response</h3>
              <p>
                Vessel taking on water? Our emergency dive team is available 24/7 throughout
                Seattle, Puget Sound, and surrounding waters. We can often be on-site within 2
                hours for critical situations.
              </p>
              <p>
                Call <a href={PHONE_HREF} style={{ color: 'var(--ocean-600)', fontWeight: 700 }}>{PHONE}</a> for
                emergency service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Need underwater boat repair in Seattle?</h2>
          <p>24/7 emergency response. Call us now or request a quote online.</p>
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
