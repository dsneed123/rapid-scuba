import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cost of Hull Cleaning in Seattle Marinas (2026 Guide)',
  description:
    'Complete 2026 pricing guide for hull cleaning in Seattle. Package prices by vessel size, add-on services, and comparison against drydock haul-out costs.',
  author: {
    '@type': 'Organization',
    name: 'Rapid Scuba',
  },
  publisher: {
    '@type': 'LocalBusiness',
    name: 'Rapid Scuba',
    telephone: '+12062402687',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
  },
  datePublished: '2026-01-15',
  dateModified: '2026-03-01',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://rapidscuba.com/blog/cost-hull-cleaning-seattle-marinas',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does hull cleaning cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hull cleaning in Seattle is priced by vessel size. Small vessels up to 30 ft run $3,000–$3,500. Medium vessels 31–60 ft run $3,500–$4,250. Large vessels 61 ft and over start at $4,250–$5,000+. All packages include hull surface cleaning, running gear cleaning, and zinc anode inspection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the base hull cleaning price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every hull cleaning package includes full hull surface cleaning from the waterline to the keel, propeller and shaft cleaning, rudder cleaning, and a zinc anode condition check. A verbal findings report is provided after every dive. Photo documentation is available on request.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does in-water hull cleaning compare to drydock haul-out costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drydock haul-out for a 40 ft vessel at a Seattle-area boatyard typically costs $5,000–$15,000+ when you factor in haul fees, yard storage, pressure washing, new antifouling paint, and labor. In-water cleaning at $3,500–$4,250 for the same vessel eliminates all those costs and leaves the existing paint intact. For regular maintenance cycles, in-water cleaning is significantly more cost-effective.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there add-on services available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Common add-ons include propeller polishing (removing pitting and surface corrosion for improved efficiency), zinc anode replacement, hull inspection with written report and photos, and light underwater welding repairs. Add-ons can typically be scheduled in the same dive to save mobilization costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do commercial vessels get different pricing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial operators, charter companies, and multi-vessel fleets typically receive custom pricing based on vessel count, service frequency, and specific requirements. Monthly or bi-monthly maintenance contracts are available and priced at a discount compared to individual service calls.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function CostHullCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Hull Cleaning Pricing</span>
          <h1>Cost of Hull Cleaning in Seattle Marinas (2026 Guide)</h1>
          <p>
            Current package pricing for hull cleaning at Seattle-area marinas, what is included
            at each tier, add-on services, and a direct comparison against drydock haul-out costs.
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
            <h2>2026 Hull Cleaning Package Prices in Seattle</h2>
            <p>
              Hull cleaning in Seattle is priced by vessel length, which is the primary driver of
              dive time and labor. The packages below reflect current rates for standard in-water
              cleaning at your berth throughout Seattle and Puget Sound. Pricing includes travel to
              any marina in the greater Seattle area.
            </p>
            <p>
              <strong>Small vessels — up to 30 ft: $3,000–$3,500.</strong> This tier covers most
              day sailors, small powerboats, and trailer boats kept in a slip. A typical 28 ft
              sailboat or 25 ft runabout falls in this range. Dive time is usually 60–90 minutes
              for vessels with moderate fouling. The lower end of the range applies to boats that
              are on a regular cleaning schedule and kept clean; the upper end reflects vessels
              with heavier fouling that require more scraping time.
            </p>
            <p>
              <strong>Medium vessels — 31–60 ft: $3,500–$4,250.</strong> This is the most common
              size tier for Seattle area boat owners. It covers most coastal cruisers, mid-size
              motor yachts, and larger sailboats. A 42 ft sloop, a 45 ft trawler, and a 55 ft
              pilothouse all fall in this category. Dive time ranges from 90 minutes to about 3
              hours depending on the vessel's underwater profile, keel type, and fouling level.
              Full keel sailboats take longer than fin keel designs due to the additional surface
              area along the keel base.
            </p>
            <p>
              <strong>Large vessels — 61 ft and over: $4,250–$5,000+.</strong> Large motor yachts,
              commercial fishing vessels, tugboats, and expedition-style cruisers fall in this
              range. The plus sign reflects the reality that very large or heavily fouled vessels
              may require two-diver teams or multiple dives, which adds to the base cost. We provide
              a specific quote for vessels over 80 ft or those with unusual underwater profiles.
            </p>

            <h2 style={{ marginTop: '2rem' }}>What Is Included at Every Tier</h2>
            <p>
              All three package tiers include the same core scope of work. The hull surface is
              cleaned from the waterline to the keel using hydraulic rotary brushes on flat surfaces
              and hand scrapers in tight areas around through-hull fittings, keel bolts, and hull
              penetrations. Running gear — the propeller, shaft, and rudder — is cleaned in every
              service. The prop is brushed free of barnacles, algae, and biofouling; the shaft is
              scraped clean; and the rudder is fully cleaned on both faces.
            </p>
            <p>
              Every dive includes a zinc anode condition check. Zinc anodes protect underwater metal
              components from galvanic corrosion. Our diver checks the condition of each zinc during
              the cleaning dive and reports the findings. If anodes are more than 50% depleted, we
              recommend replacement — which can typically be done in the same visit as an add-on
              service.
            </p>
            <p>
              After every dive, we provide a verbal findings report covering hull condition, paint
              assessment, zinc status, and anything else noted during the dive. For vessels that
              haven't been serviced in a while, we often spot early signs of osmotic blistering,
              running gear wear, or structural issues that the owner was not aware of. Written
              inspection reports with photographs are available as an add-on.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Add-On Services and Pricing</h2>
            <p>
              Several additional services can be performed in the same dive as hull cleaning,
              saving mobilization time and cost compared to scheduling separate visits.
            </p>
            <p>
              <strong>Propeller polishing:</strong> Beyond basic cleaning, propeller polishing
              removes surface pitting, corrosion, and micro-fouling from the blade faces using
              progressive grits of underwater abrasive. A polished prop reduces drag and improves
              thrust efficiency compared to a merely clean but rough surface. This service adds
              approximately $150–$350 depending on propeller count and size.
            </p>
            <p>
              <strong>Zinc anode replacement:</strong> If your anodes are depleted, we can replace
              them during the same dive. We carry the most common anode configurations for Seattle
              vessels in stock. Labor plus materials typically runs $75–$200 per zinc depending on
              size and location.
            </p>
            <p>
              <strong>Written hull inspection report:</strong> A formal written inspection with
              underwater photographs covers hull structural condition, bottom paint assessment,
              through-hull fittings, keel attachment, and running gear. This service is useful for
              pre-purchase surveys, insurance requirements, or vessels that haven't been inspected
              in several seasons.
            </p>
            <p>
              <strong>Minor underwater repairs:</strong> Small structural issues found during
              cleaning — minor hull cracks, corroded fittings — can sometimes be
              addressed in the same visit. Larger repairs are scoped separately.{' '}
              <Link to="/contact">Contact us for details.</Link>
            </p>

            <h2 style={{ marginTop: '2rem' }}>In-Water Cleaning vs. Drydock Haul-Out: Full Cost Comparison</h2>
            <p>
              Many boat owners consider drydock haul-out as the "proper" alternative to in-water
              cleaning. The reality is that for routine biofouling removal, hauling out almost always
              costs more — often dramatically more — than in-water service.
            </p>
            <p>
              At Seattle-area boatyards in 2026, haul-out fees typically run $15–$25 per foot of
              vessel length for the travel lift alone. A 42 ft vessel costs $630–$1,050 just to
              lift out of the water. Add yard storage at $10–$20 per foot per day ($420–$840 per
              day for the same boat), power connection fees, and pressure washing ($150–$400),
              and a two-day haul-out for basic hull work on a 42 ft vessel runs $1,700–$3,000
              before any labor or materials are added.
            </p>
            <p>
              If the haul-out involves repainting the bottom — which is typically required if the
              boat is out of the water for any meaningful time, since antifouling paint dries out
              and loses effectiveness — add another $1,500–$4,000 for surface prep and two coats
              of antifouling paint on a mid-size vessel. The total cost for a routine 42 ft
              haul-out with repaint easily reaches $5,000–$8,000, compared to roughly $3,750–$4,250
              for in-water cleaning.
            </p>
            <p>
              For a vessel on a regular 90-day cleaning schedule — four cleanings per year — the
              annual cost of in-water cleaning at $4,000 per service is roughly $16,000. The same
              vessel hauled out four times per year for equivalent maintenance would cost $20,000–
              $32,000 per year in haul fees, yard storage, and paint alone. In-water cleaning is not
              a budget option: it is simply the more efficient maintenance approach for regular
              biofouling removal.
            </p>
            <p>
              Drydock makes sense for specific work that genuinely requires the vessel to be out of
              the water: osmotic blister repair, keel removal or replacement, through-hull replacement,
              or a complete bottom repaint after paint has built up to the point where sanding to
              bare substrate is required. For regular cleaning cycles, in-water service delivers
              equivalent results at a fraction of the cost.
            </p>
          </div>

          <div>
            <div className="info-box">
              <h3>2026 Hull Cleaning Pricing</h3>
              <ul>
                <li>
                  <strong>Small — up to 30 ft:</strong> $3,000–$3,500
                </li>
                <li>
                  <strong>Medium — 31–60 ft:</strong> $3,500–$4,250
                </li>
                <li>
                  <strong>Large — 61 ft+:</strong> $4,250–$5,000+
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Includes hull, running gear, and zinc inspection.{' '}
                <Link to="/pricing">See full pricing details.</Link>
              </p>
              <Link
                to="/contact"
                className="btn btn--primary"
                style={{ marginTop: '1.25rem', display: 'inline-block' }}
              >
                Get a Quote
              </Link>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Add-On Services</h3>
              <ul>
                <li>Propeller polishing: $150–$350</li>
                <li>Zinc anode replacement: $75–$200/zinc</li>
                <li>Written inspection report with photos</li>
                <li>Minor underwater repairs</li>
              </ul>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Drydock vs. In-Water (42 ft vessel)</h3>
              <ul>
                <li>
                  <strong>In-water cleaning:</strong> ~$3,750–$4,250
                </li>
                <li>
                  <strong>Haul-out + repaint:</strong> $5,000–$15,000+
                </li>
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                Haul-out figures include lift fees, yard storage, pressure wash, and antifouling
                repaint. In-water cleaning leaves existing paint intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <div className="container">
          <h2 className="section__title">Seattle Marinas We Serve</h2>
          <p className="section__subtitle">
            We travel to your berth throughout Seattle and Puget Sound — no haul-out required.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole Bay', l: 'Marina' },
              { v: 'Lake Union', l: 'Drydock & Marinas' },
              { v: 'Eastlake', l: 'Marina' },
              { v: 'Portage Bay', l: 'Anchorage & Marinas' },
              { v: 'Elliott Bay', l: 'Marina' },
              { v: 'Lake Washington', l: 'Marinas' },
              { v: 'Edmonds', l: 'Marina' },
              { v: 'Des Moines', l: 'Marina' },
            ].map(({ v, l }) => (
              <div key={v} className="about__stat">
                <span className="about__stat-value" style={{ fontSize: '1.1rem' }}>
                  {v}
                </span>
                <span className="about__stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ background: 'var(--ocean-100)', paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <div className="container">
          <h2 className="section__title">Frequently Asked Questions</h2>
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {faqs.map((faq) => (
              <div key={faq.name}>
                <h3>{faq.name}</h3>
                <p>{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '3rem', paddingBottom: '3rem' }}
      >
        <div className="container">
          <h2 className="section__title">Related Services</h2>
          <p className="section__subtitle">
            Combine hull cleaning with these services for complete below-waterline maintenance.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                ADCI-certified divers remove barnacles, algae, and biofouling at your slip — no
                haul-out required. Package pricing by vessel size with same-day scheduling
                throughout Seattle and Puget Sound.
              </p>
              <Link
                to="/hull-cleaning-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Hull Cleaning
              </Link>
            </div>
            <div className="info-box">
              <h3>Hull Inspection Seattle</h3>
              <p>
                Comprehensive below-waterline inspection with HD video documentation.
                Pre-purchase surveys, annual assessments, and insurance documentation —
                all performed at your slip.
              </p>
              <Link
                to="/hull-inspection-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Hull Inspection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Get a hull cleaning quote for your Seattle vessel</h2>
          <p>
            Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request a quote online. We respond within one business day.
          </p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request a Quote
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
