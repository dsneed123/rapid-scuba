import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Zinc Anode Replacement Seattle',
  serviceType: 'Underwater Zinc Anode Replacement',
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
    'Underwater zinc anode inspection and replacement by ADCI-certified divers in Seattle. Sacrificial anode service for hull, shaft, propeller, rudder, and trim tab — at your slip, no haul-out required. Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas. Starting at $30 per anode.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '30',
    highPrice: '200',
    offerCount: '4',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a zinc anode and why does my boat need one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A zinc anode is a sacrificial metal block attached to your vessel\'s underwater surfaces that corrodes preferentially in saltwater — protecting your more valuable underwater metals (bronze propellers, stainless steel shafts, aluminum drives, and through-hull fittings) from galvanic and electrolytic corrosion. In Puget Sound\'s electrically conductive saltwater, an unprotected bronze propeller or stainless shaft can suffer significant corrosion damage within a single boating season. Zinc anodes are cheap insurance against expensive metal repairs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I replace zinc anodes in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zinc anodes should be inspected every time your hull is cleaned — typically every 60–120 days depending on your marina and water type. Replace any anode that has lost 50% or more of its original mass. In Seattle\'s busier marinas like Shilshole Bay and Elliott Bay, stray electrical currents from neighboring vessels can accelerate zinc depletion significantly, so inspecting more frequently than the standard interval is wise. Never let an anode deplete completely before replacing it.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does zinc anode replacement cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zinc anode replacement starts at $30 per anode including labor — this covers hull-mounted zincs, shaft zincs, trim tab anodes, and rudder anodes. Most vessels have 2–6 anodes in various locations. Call us at 206-240-2687 to schedule an inspection dive; we assess all anode locations and replace only those at or past the 50% depletion threshold, so you\'re not paying to replace anodes that still have life left.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if my zinc anodes are completely depleted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When zinc anodes are fully depleted, galvanic corrosion begins attacking the next least-noble metal in the circuit — typically your bronze propeller, stainless steel shaft, or aluminum outdrive. Damage can progress rapidly in saltwater and is expensive to repair: a corroded propeller may require re-pitching or replacement, and a pitted shaft may need to be pulled and machined or replaced entirely. We have inspected vessels at Seattle-area marinas where fully depleted zincs led to thousands of dollars in running gear damage that could have been prevented with a $30 anode.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use zinc, aluminum, or magnesium anodes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The right anode material depends on your water type. Zinc anodes are the standard choice for saltwater vessels throughout Puget Sound and most Seattle marinas. Aluminum anodes are more efficient in fresh water and are recommended for vessels kept in Lake Union or Lake Washington. Magnesium anodes are used on vessels that move between salt and fresh water environments, as they provide protection across the wider conductivity range. We carry all three types and can advise based on your vessel\'s location and usage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you replace zinc anodes without hauling out my boat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Zinc anode replacement is one of the most common in-water services we perform. Our ADCI-certified divers work at your berth throughout Seattle and Puget Sound — no haul-out, no travel lift fees, and no need to re-apply antifouling paint afterward. We stock hull, shaft, propeller hub, rudder, and trim tab anodes for the most common vessel makes and sizes and can complete most anode replacements in a single dive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of zinc anodes does my boat need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most vessels carry multiple anode types in different locations: hull plate zincs bolted through the hull to protect the plating itself, shaft zincs clamped around the propeller shaft to protect the shaft and cutlass bearing, propeller hub zincs to protect the prop, rudder zincs attached to the rudder blade or pintle area, and trim tab anodes on outdrives or swim platforms. We inspect every anode location on your vessel during each dive and give you a complete picture of which anodes need replacement and which still have useful life remaining.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function ZincAnodePage() {
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
          <h1>Zinc Anode Replacement Seattle</h1>
          <p>
            Underwater replacement of sacrificial zinc anodes to protect your hull, shaft, and
            running gear from galvanic corrosion in Seattle and Puget Sound. ADCI-certified divers
            work at your slip — no haul-out required.
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
              galvanic corrosion in Puget Sound's saltwater. When zinc anodes are depleted,
              corrosion begins attacking your hull, shaft, propeller, and other metal components —
              leading to costly repairs that could have been avoided with a $30 anode replacement.
            </p>
            <p>
              Our divers inspect and replace all below-waterline anodes in-water at your slip.
              We stock hull, shaft, propeller, and rudder zincs for most common vessel types.
              Every anode inspection includes a written condition report and replacement
              recommendations based on actual depletion level — we replace what needs it, not
              everything on the vessel.
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

            <h2 style={{ marginTop: '2rem' }}>Stray Current Corrosion in Seattle Marinas</h2>
            <p>
              Beyond natural galvanic corrosion, Seattle-area vessels face an additional threat:
              stray electrical current from neighboring boats, shore power connections, and marina
              electrical systems. In a crowded marina like Shilshole Bay or Elliott Bay, a single
              boat with a faulty shore power connection can accelerate zinc depletion on every
              vessel within 100 feet. Rapid zinc consumption — anodes depleting in weeks rather
              than months — is a warning sign of stray current corrosion that warrants a deeper
              electrical investigation.
            </p>
            <p>
              We use the anode condition we find during each inspection as a diagnostic tool.
              Abnormally fast depletion, uneven consumption across multiple anodes, or signs of
              electrolytic pitting on protected metals are all indicators that something beyond
              normal galvanic activity is occurring. When we observe these signs, we document
              and report them so you can work with a marine electrician to identify the source.
            </p>
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

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Zinc Anode Pricing</h3>
              <ul>
                <li>
                  <strong>Per anode (including labor):</strong> from $30
                </li>
                <li>
                  <strong>Full anode inspection dive:</strong> included with hull cleaning
                </li>
                <li>
                  <strong>Standalone inspection:</strong> from $100
                </li>
                <li>
                  <strong>Full corrosion survey:</strong> call for quote
                </li>
              </ul>
              <Link
                to="/contact"
                className="btn btn--primary"
                style={{ marginTop: '1.25rem', display: 'inline-block' }}
              >
                Get a Quote
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
            We come to your berth throughout Seattle and Puget Sound — no haul-out required.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole Bay', l: 'Marina' },
              { v: 'Elliott Bay', l: 'Marina' },
              { v: 'Lake Union', l: 'Drydock & Marinas' },
              { v: 'Eastlake', l: 'Marina' },
              { v: 'Portage Bay', l: 'Anchorage & Marinas' },
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
          <h2 className="section__title">Zinc Anode FAQ</h2>
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
            Combine zinc anode service with these for complete below-waterline protection.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                Anode inspection is included with every hull cleaning visit. Schedule a cleaning
                to keep your bottom paint working and get a full anode condition report in the
                same dive — no separate service call needed.
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
              <h3>Propeller Cleaning Seattle</h3>
              <p>
                Inadequate zinc protection accelerates propeller pitting through electrolytic
                corrosion. We inspect and replace shaft zincs, hull zincs, and trim tab anodes
                on the same dive as propeller cleaning — protecting your running gear completely.
              </p>
              <Link
                to="/propeller-cleaning-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Propeller Cleaning
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Protect your vessel from corrosion</h2>
          <p>
            Zinc anode replacement from $30 per anode. Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request a quote online.
          </p>
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
