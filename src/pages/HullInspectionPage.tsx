import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hull Inspection Seattle',
  serviceType: 'Underwater Hull Inspection',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Rapid Scuba',
    telephone: '+12062402687',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    areaServed: 'Seattle, WA and Puget Sound',
  },
  description:
    'Comprehensive below-waterline hull inspection with HD video documentation by ADCI-certified divers in Seattle. Pre-purchase surveys, annual condition assessments, post-grounding inspections, and insurance documentation. Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas. Starting at $200.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '200',
    highPrice: '500',
    offerCount: '2',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does an underwater hull inspection cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underwater hull inspections in Seattle start at $200 for a basic condition report on vessels up to 40 ft, and up to $500 for a comprehensive inspection with full HD video documentation on larger or more complex vessels. The inspection covers the complete hull surface, keel, rudder, propeller, shaft, through-hull fittings, and zinc anodes. Call 206-240-2687 to schedule — most Seattle-area inspections can be completed same-day or next-day.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does an underwater hull inspection include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every hull inspection covers the full hull plate surface from stem to stern, the keel and keel attachment area, rudder and rudder bearing condition, propeller and shaft condition, cutlass bearing area, through-hull fittings and seacock accessibility, and all zinc anodes. We also inspect for hull blistering, osmotic damage, impact damage from grounding, and corrosion around metal fittings. A written findings report is provided after every inspection, and HD video documentation is included in comprehensive inspection packages.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a hull inspection take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most hull inspections take 1–2 hours depending on vessel size and the scope of the inspection. A 35 ft sailboat with no known issues typically takes 60–90 minutes for a thorough below-waterline examination. Larger vessels, multi-hull designs, or vessels with suspected structural issues may take 2–3 hours. We document findings as we go, so the written report is usually ready within a few hours of the dive.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a hull inspection replace a haul-out survey?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An underwater inspection provides most of the information a haul-out visual survey would reveal for the below-waterline hull surface, keel, running gear, and through-hulls. However, it cannot provide osmotic blister tap testing, hull thickness measurements, or access to interior structural framing — tests that require the vessel to be out of the water. For pre-purchase situations, many buyers combine our inspection with a full survey to get a complete picture at lower cost than a haul-out. Some marine surveyors in Seattle are happy to co-sign our underwater inspection reports.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I get an underwater hull inspection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common triggers for an underwater hull inspection are: pre-purchase due diligence (know what you\'re buying before the sale closes), annual maintenance assessment, after a grounding or collision event, before a long offshore passage, when investigating unexplained vibration or noise underwater, and when insurance or lenders require documentation of hull condition. We also recommend a dedicated inspection for any vessel that hasn\'t had a below-waterline look in more than two years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide video documentation of the inspection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Comprehensive inspection packages include HD underwater video documentation of the entire below-waterline surface, with narration by the diver noting conditions as they are observed. The video record is yours to keep and share with your surveyor, insurance company, or future buyer. Still photo documentation is also available. The written report issued after the dive references specific video timestamps for any areas of concern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to prepare my boat for a hull inspection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Very little preparation is needed. We ask that you have the vessel accessible at the slip, that you or someone with knowledge of the boat\'s systems is available to answer questions before and after the dive, and that through-hull fittings and seacocks are identified (we will test operability from outside). If the inspection is for pre-purchase, it helps to have the seller\'s disclosure documents available so we can cross-reference any known issues. We handle all dive setup and equipment — there is nothing you need to provide from the vessel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you inspect a boat I am considering buying before I close the sale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — pre-purchase hull inspection is one of our most requested services. We can typically schedule within 24–48 hours and complete the dive and written report the same day, so you have the information you need before your purchase agreement expires. The inspection covers everything below the waterline that would be visible in a haul-out: hull condition, keel, rudder, running gear, through-hulls, and zincs. Many buyers in the Seattle market use our inspection as the final step before finalizing a purchase or negotiating repairs into the price.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function HullInspectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Hull Inspection Seattle</h1>
          <p>
            Comprehensive below-waterline inspection with HD video documentation for pre-purchase
            surveys, annual maintenance, and insurance requirements in Seattle and Puget Sound.
            ADCI-certified divers. No haul-out required.
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
              make confident decisions without hauling the vessel out. A written findings report
              is issued after every inspection, with photo or video documentation of any areas
              of concern.
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

            <h2 style={{ marginTop: '2rem' }}>Pre-Purchase Hull Inspections</h2>
            <p>
              Buying a used boat without an underwater inspection is one of the most common
              mistakes in the Seattle market. Issues that are expensive to fix — keel bolt
              corrosion, propeller shaft damage, dezincified through-hull fittings, advanced
              osmotic blistering — are invisible above the waterline and often absent from a
              seller's disclosure. Our pre-purchase inspection gives you documented, objective
              information about what you are buying before the sale closes.
            </p>
            <p>
              Most Seattle-area pre-purchase inspections can be scheduled within 24–48 hours
              and completed in a single dive session. The written report is typically ready
              the same day. Many buyers use our findings to negotiate repairs into the purchase
              price or, in some cases, to walk away from a vessel with undisclosed structural
              problems.
            </p>
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

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Inspection Pricing</h3>
              <ul>
                <li>
                  <strong>Basic condition report (up to 40 ft):</strong> from $200
                </li>
                <li>
                  <strong>Full HD video documentation:</strong> up to $500
                </li>
                <li>
                  <strong>Pre-purchase inspection:</strong> from $250
                </li>
                <li>
                  <strong>Post-grounding assessment:</strong> call for quote
                </li>
              </ul>
              <Link
                to="/contact"
                className="btn btn--primary"
                style={{ marginTop: '1.25rem', display: 'inline-block' }}
              >
                Schedule Inspection
              </Link>
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
            We inspect vessels throughout Seattle and Puget Sound — at your berth, no haul-out needed.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole Bay', l: 'Marina — 1,400+ slips' },
              { v: 'Elliott Bay', l: 'Marina' },
              { v: 'Lake Union', l: 'Drydock & Marinas' },
              { v: 'Eastlake', l: 'Marina' },
              { v: 'Portage Bay', l: 'Anchorage & Marinas' },
              { v: 'Lake Washington', l: 'Kirkland & Bellevue' },
              { v: 'Bainbridge Island', l: 'Eagle Harbor & Port Madison' },
              { v: 'Edmonds', l: 'Marina' },
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
          <h2 className="section__title">Hull Inspection FAQ</h2>
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
            Combine a hull inspection with these services for complete below-waterline care.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                Schedule a hull cleaning alongside your inspection to arrive at a clean hull
                with full knowledge of its condition — and antifouling paint that's working
                properly. Combined visits are cost-effective and cover everything in one dive session.
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
              <h3>Underwater Boat Repair Seattle</h3>
              <p>
                If our inspection identifies issues that need repair — zinc replacement, through-hull
                service, or minor epoxy patching — we can often complete them in the same dive or
                schedule a follow-up without a separate mobilization charge.
              </p>
              <Link
                to="/underwater-boat-repair-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Underwater Repair
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Schedule a hull inspection today</h2>
          <p>
            Starting from $200. Full video documentation included. Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request online — same-day and next-day availability.
          </p>
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
