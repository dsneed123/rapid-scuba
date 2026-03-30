import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function HullInspectionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Hull Inspection Seattle</h1>
          <p>
            Comprehensive below-waterline inspection with video documentation for pre-purchase
            surveys, annual maintenance, and insurance requirements in Seattle and Puget Sound.
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
            <h2>Know What's Below the Waterline</h2>
            <p>
              Our underwater hull inspections provide a complete picture of your vessel's
              below-waterline condition. We use underwater video cameras to document every detail,
              giving you and your surveyor a thorough record of hull, keel, running gear, and
              appendage condition.
            </p>
            <p>
              Pre-purchase inspections are often completed same-day or next-day, helping buyers
              make confident decisions without hauling the vessel out.
            </p>
            <ul>
              <li>Full hull plate inspection for damage, blistering, or osmosis</li>
              <li>Keel condition and attachment check</li>
              <li>Rudder and rudder bearing inspection</li>
              <li>Propeller and shaft assessment</li>
              <li>Through-hull fitting condition report</li>
              <li>Zinc anode inspection and status</li>
              <li>HD underwater video documentation</li>
              <li>Written inspection report provided</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>When You Need an Inspection</h3>
              <ul>
                <li>Pre-purchase survey — know before you buy</li>
                <li>Annual maintenance inspection</li>
                <li>After grounding or collision</li>
                <li>Insurance requirement documentation</li>
                <li>Before a long offshore passage</li>
                <li>Investigating unusual vibration or noise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Schedule a hull inspection today</h2>
          <p>Starting from $250. Full video documentation included.</p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request Inspection
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
