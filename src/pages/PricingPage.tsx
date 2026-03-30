import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const SERVICES = [
  {
    icon: '🐚',
    name: 'Hull Cleaning',
    price: 350,
    unit: 'per vessel',
    desc: 'Full underwater hull cleaning — barnacles, algae, and slime removal. Safe for all antifouling paint types.',
    to: '/hull-cleaning-seattle',
  },
  {
    icon: '🔄',
    name: 'Propeller Cleaning',
    price: 200,
    unit: 'per propeller',
    desc: 'Propeller cleaning, polishing, and inspection. Shaft and cutlass bearing check included.',
    to: '/propeller-cleaning-seattle',
  },
  {
    icon: '🛡️',
    name: 'Zinc Anode Replacement',
    price: 150,
    unit: 'per set',
    desc: 'Replace hull, shaft, and running gear zincs in-water at your slip. Parts not included.',
    to: '/zinc-anode-replacement-seattle',
  },
  {
    icon: '🔍',
    name: 'Hull Inspection',
    price: 250,
    unit: 'per inspection',
    desc: 'Full below-waterline inspection with HD video documentation and written report.',
    to: '/hull-inspection-seattle',
  },
  {
    icon: '⚡',
    name: 'Underwater Welding',
    price: 800,
    unit: 'starting from',
    desc: 'Structural wet welding for hull repairs, fittings, docks, and pilings. Custom quote based on scope.',
    to: '/underwater-welding-seattle',
    featured: true,
  },
  {
    icon: '🔧',
    name: 'Underwater Boat Repair',
    price: 400,
    unit: 'starting from',
    desc: 'Through-hull fitting replacement, transducer installation, and minor hull repairs in-water.',
    to: '/boat-repair-underwater-seattle',
  },
]

export function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Transparent Pricing</span>
          <h1>Seattle Marine Services Pricing</h1>
          <p>
            Straightforward pricing with no hidden fees. All services performed in-water at your
            slip — no haul-out costs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Service Rates</h2>
          <p className="section__subtitle">
            Prices listed are starting rates. Final price depends on vessel size and job scope.
            Contact us for a custom quote.
          </p>

          <div className="pricing-grid">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className={['pricing-card', s.featured ? 'pricing-card--featured' : '']
                  .join(' ')
                  .trim()}
              >
                <div className="pricing-card__icon">{s.icon}</div>
                <h3 className="pricing-card__name">{s.name}</h3>
                <div className="pricing-card__price">
                  ${s.price} <span>/ {s.unit}</span>
                </div>
                <p className="pricing-card__desc">{s.desc}</p>
                <Link to={s.to} className="btn btn--secondary">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about"
        style={{
          padding: '64px 0',
          borderTop: '1px solid var(--gray-200)',
          borderBottom: '1px solid var(--gray-200)',
        }}
      >
        <div className="container">
          <h2 className="section__title">What's Always Included</h2>
          <p className="section__subtitle">
            Every service call includes these at no extra charge.
          </p>
          <div className="card-grid" style={{ marginTop: '32px' }}>
            {[
              {
                icon: '📍',
                title: 'On-Site Service',
                body: 'We come to your slip at any Seattle-area marina. No need to move your vessel.',
              },
              {
                icon: '📋',
                title: 'Visual Inspection',
                body: 'We always report any issues we spot below the waterline during our visit.',
              },
              {
                icon: '📸',
                title: 'Photo Report',
                body: 'Before and after photos available on request for all cleaning services.',
              },
              {
                icon: '💬',
                title: 'Fast Response',
                body: 'We respond to all service requests within one business day.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card">
                <div className="card__icon">{icon}</div>
                <h3 className="card__title">{title}</h3>
                <p className="card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready for a custom quote?</h2>
          <p>Tell us your vessel type, length, and location and we'll get back to you fast.</p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Get a Quote
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
