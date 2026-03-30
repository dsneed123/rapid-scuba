import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function PropellerCleaningPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Propeller Cleaning Seattle</h1>
          <p>
            Underwater propeller inspection, cleaning, and polishing to restore efficiency and
            reduce cavitation — at your slip in Seattle or Puget Sound.
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
            <h2>Maximize Performance with Clean, Polished Props</h2>
            <p>
              A fouled propeller can cost you significant fuel efficiency and performance. Our divers
              remove marine growth, polish the blades, and inspect for nicks, erosion, and
              cavitation damage — all without leaving the marina.
            </p>
            <p>
              Routine propeller maintenance extends blade life and keeps your vessel running at
              peak efficiency through Seattle's busy boating season.
            </p>
            <ul>
              <li>Barnacle and slime removal from blades and hub</li>
              <li>Full blade polishing to smooth finish</li>
              <li>Inspection for nicks, erosion, and damage</li>
              <li>Shaft and cutlass bearing check</li>
              <li>Rope and line removal from shaft</li>
              <li>Photo documentation available</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>Why Propeller Cleaning Matters</h3>
              <p>
                Even a thin layer of marine growth on propeller blades increases drag and reduces
                thrust efficiency. Studies show a fouled propeller can increase fuel consumption by
                5–15% and noticeably reduce top speed.
              </p>
              <ul>
                <li>Fuel savings of 5–15%</li>
                <li>Improved top speed and acceleration</li>
                <li>Reduced vibration and cavitation</li>
                <li>Extended blade lifespan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready for a propeller clean?</h2>
          <p>Starting from $200 per propeller. Quick turnaround at your slip.</p>
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
