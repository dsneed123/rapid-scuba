import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function HullCleaningPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Hull Cleaning Seattle</h1>
          <p>
            Professional underwater hull cleaning that removes barnacles, algae, and marine growth
            — without hauling out. Serving all Seattle marinas and Puget Sound.
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
            <h2>Keep Your Hull Clean &amp; Your Fuel Bills Low</h2>
            <p>
              Fouling on your hull is more than an eyesore — a dirty hull can increase fuel
              consumption by 10–40% and reduce top speed. Our ADCI-certified divers clean your hull
              in-water at your slip, so you never need to schedule dry-dock time or pay haul-out
              fees.
            </p>
            <p>
              We use soft brushes and gentle techniques that are safe for ablative antifouling
              paints. After cleaning, we inspect the hull for damage and report any concerns.
            </p>
            <ul>
              <li>Barnacle, algae, and slime removal</li>
              <li>Safe for all antifouling paint types</li>
              <li>In-water at your slip — no haul-out required</li>
              <li>Full visual hull inspection included</li>
              <li>Photo documentation available on request</li>
              <li>Running gear and keel cleaning</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>Recommended Schedule</h3>
              <p>
                In Seattle waters, most vessels benefit from hull cleaning every 2–3 months during
                summer and every 3–4 months in winter. High-growth periods (May–September) may
                require more frequent service.
              </p>
              <ul>
                <li>Sailboats: every 60–90 days</li>
                <li>Motor yachts: every 60–90 days</li>
                <li>Commercial vessels: monthly or as needed</li>
                <li>Vessels in fresh water: every 3–6 months</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section about" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <div className="container">
          <h2 className="section__title">Service Areas for Hull Cleaning</h2>
          <p className="section__subtitle">
            We clean hulls throughout the greater Seattle area and Puget Sound.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole', l: 'Bay Marina' },
              { v: 'Elliott Bay', l: 'Marina' },
              { v: 'Lake Union', l: 'Drydock &amp; Marinas' },
              { v: 'Lake Washington', l: 'Marinas' },
              { v: 'Puget Sound', l: 'Anchorages' },
              { v: 'Bainbridge', l: 'Island' },
              { v: 'Edmonds', l: 'Marina' },
              { v: 'Des Moines', l: 'Marina' },
            ].map(({ v, l }) => (
              <div key={v} className="about__stat">
                <span className="about__stat-value" style={{ fontSize: '1.1rem' }}>
                  {v}
                </span>
                <span
                  className="about__stat-label"
                  dangerouslySetInnerHTML={{ __html: l }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready to schedule hull cleaning?</h2>
          <p>Starting from $350 per vessel. We respond within one business day.</p>
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
