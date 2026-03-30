import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function UnderwaterWeldingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Underwater Welding Seattle</h1>
          <p>
            Certified wet welding and structural repairs for vessels, docks, and pilings in Seattle
            and Puget Sound — no dry-dock required.
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
            <h2>Expert Underwater Welding in Seattle Waters</h2>
            <p>
              Our ADCI-certified commercial divers perform structural wet welding and repairs on
              vessel hulls, keel attachments, rudder fittings, through-hull hardware, docks, and
              pilings. We bring the welding to your vessel — eliminating the cost and downtime of
              dry-docking.
            </p>
            <p>
              We use AWS D3.6M certified techniques for underwater structural welds, ensuring
              repairs meet or exceed industry standards for strength and durability.
            </p>
            <ul>
              <li>Hull plate repair and patch welding</li>
              <li>Keel bolt and keel attachment repair</li>
              <li>Rudder fitting and skeg repair</li>
              <li>Through-hull fitting installation and repair</li>
              <li>Dock and piling structural welding</li>
              <li>Zinc anode welded attachment</li>
              <li>Emergency 24/7 response available</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>When to Call Us</h3>
              <p>Underwater welding is the right solution when:</p>
              <ul>
                <li>Your vessel has hull damage below the waterline</li>
                <li>A through-hull fitting is failing or leaking</li>
                <li>Keel or rudder fittings need structural repair</li>
                <li>Dock pilings or brackets require emergency welding</li>
                <li>Dry-docking would cause unacceptable downtime</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Need underwater welding in Seattle?</h2>
          <p>Starting from $800 per job. 24/7 emergency response available.</p>
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
