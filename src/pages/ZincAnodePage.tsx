import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function ZincAnodePage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Zinc Anode Replacement Seattle</h1>
          <p>
            Underwater replacement of sacrificial zinc anodes to protect your hull, shaft, and
            running gear from galvanic corrosion in Seattle and Puget Sound.
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
            <h2>Protect Your Vessel from Galvanic Corrosion</h2>
            <p>
              Sacrificial zinc anodes are your vessel's primary defense against electrolytic and
              galvanic corrosion. When zinc anodes are depleted, corrosion attacks your hull,
              shaft, propeller, and other metal components — leading to costly repairs.
            </p>
            <p>
              Our divers inspect and replace all below-waterline anodes in-water at your slip.
              We stock hull, shaft, propeller, and rudder zincs for most common vessel types.
            </p>
            <ul>
              <li>Hull plate zinc replacement</li>
              <li>Shaft zinc inspection and replacement</li>
              <li>Propeller and hub zinc replacement</li>
              <li>Rudder zinc replacement</li>
              <li>Trim tab zinc replacement</li>
              <li>Keel zinc inspection</li>
              <li>Full corrosion survey available</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>How Often to Replace Zincs</h3>
              <p>
                Inspect zinc anodes every time your hull is cleaned. Replace when the anode has
                lost 50% or more of its original mass. In Seattle's electrically active marinas,
                zincs may deplete faster than expected.
              </p>
              <ul>
                <li>Check every hull cleaning visit</li>
                <li>Replace at 50% depletion</li>
                <li>Consider aluminum anodes for freshwater (Lake Union / Lake Washington)</li>
                <li>Magnesium anodes for mixed salt/fresh use</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Protect your vessel from corrosion</h2>
          <p>Zinc anode replacement starting from $150 per set. Quick service at your slip.</p>
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
