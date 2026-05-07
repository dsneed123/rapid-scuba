import { Link } from 'react-router-dom'
import { useDocumentHead } from '@/hooks/useDocumentHead'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const PACKAGES = [
  {
    tier: 'Small Boat',
    size: 'Up to 30 ft',
    price: '$500',
    icon: '⛵',
    features: [
      'Underwater hull cleaning & scrubbing',
      'Barnacle, algae & marine growth removal',
      'HD video documentation',
      'Propeller inspection included',
      'Visual inspection included',
    ],
  },
  {
    tier: 'Medium Boat',
    size: '31 – 60 ft',
    price: '$1,000',
    icon: '🚤',
    featured: true,
    features: [
      'Extensive underwater cleaning & scrubbing',
      'Full hull barnacle & growth removal',
      'HD video documentation',
      'Propeller inspection included',
    ],
  },
  {
    tier: 'Large Boat',
    size: '61 ft +',
    price: '$1,500',
    icon: '🚢',
    features: [
      'Full underwater cleaning & scrubbing',
      'Complete hull restoration',
      'HD video documentation',
      'Propeller inspection included',
    ],
  },
]


export function PricingPage() {
  useDocumentHead({
    title: 'Pricing — Hull Cleaning, Propeller Polishing, Inspection | RapidScuba Seattle',
    description:
      'Transparent pricing for in-water hull cleaning, propeller polishing, and underwater inspection in Seattle. Packages from $500. No haul-out fees, free quote within 24 hours.',
    canonical: 'https://rapidscuba.com/pricing',
  })
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Transparent Pricing</span>
          <h1>Seattle Underwater Services Pricing</h1>
          <p>
            All-inclusive packages by vessel size. Every package includes
            cleaning, scrubbing, and inspection — performed in-water at your slip.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Service Packages</h2>
          <p className="section__subtitle">
            Choose your vessel size. All packages include on-site service at any Seattle-area marina — no haul-out needed.
          </p>

          <div className="pricing-grid">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.tier}
                className={['pricing-card', pkg.featured ? 'pricing-card--featured' : '']
                  .join(' ')
                  .trim()}
              >
                <div className="pricing-card__icon">{pkg.icon}</div>
                <h3 className="pricing-card__name">{pkg.tier}</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-400)', margin: 0 }}>{pkg.size}</p>
                <div className="pricing-card__price">{pkg.price}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--gray-600)' }}>
                      <span style={{ color: 'var(--brand)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn--primary" style={{ marginTop: '8px' }}>
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* What's included */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">What's Always Included</h2>
          <p className="section__subtitle">
            Every service call includes these at no extra charge.
          </p>
          <div className="card-grid" style={{ marginTop: '32px' }}>
            {[
              {
                icon: '📍',
                title: 'On-Site at Your Slip',
                body: 'We come to any Seattle-area marina. Shilshole, Eastlake, Portage Bay, Lake Union — no need to move your vessel.',
              },
              {
                icon: '📋',
                title: 'Full Visual Inspection',
                body: 'Every dive includes a below-waterline inspection. We report any issues we find at no extra cost.',
              },
              {
                icon: '📸',
                title: 'Before & After Photos',
                body: 'Photo documentation of all work performed, delivered same day. HD video available as add-on.',
              },
              {
                icon: '⚡',
                title: 'Same-Day Availability',
                body: 'We respond to all requests within 24 hours. Same-day and next-day service available for most jobs.',
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

      {/* Note */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="container">
          <div className="info-box" style={{ textAlign: 'center' }}>
            <h3>Custom Quotes Available</h3>
            <p>
              Final pricing depends on vessel condition, marine growth severity, and location.
              Commercial fleet contracts and recurring maintenance plans available at discounted rates.
              Call <a href={PHONE_HREF} style={{ color: 'var(--ocean-600)', fontWeight: 700 }}>{PHONE}</a> for
              a free no-obligation quote.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready for a Free Quote?</h2>
          <p>Tell us your vessel size and location — we'll respond within 24 hours.</p>
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
