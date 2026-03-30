import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Underwater Boat Repair Seattle',
  serviceType: 'Underwater Marine Repair',
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
    'Emergency and scheduled underwater boat repair by ADCI-certified divers in Seattle. Zinc anode replacement, through-hull fittings, hull inspections, and 24/7 emergency dive response. Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '30',
    highPrice: '500',
    offerCount: '4',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What underwater boat repairs can be done without hauling out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many common repairs can be completed in-water by certified commercial divers: zinc anode replacement, through-hull fitting inspection and replacement, seacock service, transducer swaps, minor hull epoxy patching, keel bolt inspection, rudder bearing checks, rope and line removal from the shaft, and emergency leak response. Whether a specific repair requires haul-out depends on the scope — we assess it underwater and advise you honestly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does zinc anode replacement cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zinc anode replacement in Seattle starts at $30 per anode including labor. This covers hull-mounted zincs, shaft zincs, trim tab anodes, and rudder anodes. Most vessels have 2–6 anodes that need periodic replacement. We inspect all anodes during a hull cleaning or dedicated inspection dive and replace only those that are 50% or more depleted.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer 24/7 emergency dive response in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide 24/7 emergency underwater response throughout Seattle, Puget Sound, and surrounding waters. If your vessel is taking on water through a failed through-hull fitting, a damaged seacock, or an unknown hull breach, call us immediately. For critical situations at Shilshole Bay, Elliott Bay, or Lake Union, we can typically be on-site within 1–2 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a hull inspection cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underwater hull inspections in Seattle range from $200 for a basic condition report on a vessel up to 40 ft to $500 for a comprehensive inspection with photo and video documentation on larger or more complex vessels. The inspection covers the full hull surface, running gear, keel, rudder, through-hull fittings, and zinc anodes. A written report is provided after every inspection.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my through-hull fittings need service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Through-hull fittings should be inspected at least annually. Signs of trouble include a seacock that is stiff or seized and cannot be fully closed, visible corrosion or dezincification around the fitting body, minor weeping or seepage around the stuffing, or a fitting that moves when you apply lateral pressure. Any of these conditions warrants an underwater inspection — a failed through-hull is one of the most common causes of vessel sinking at the dock.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you replace a through-hull fitting underwater?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Replacement of through-hull fittings in-water is possible in some cases, depending on vessel construction, fitting location, and access from the inside. Our divers work in coordination with a topside crew member who handles the interior side of the fitting. For fittings that cannot be safely replaced in-water, we will recommend haul-out and can refer you to a trusted local boatyard.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens during an emergency underwater dive response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you call for emergency dive response, we gather information about the nature of the problem, vessel location, and marina access, then dispatch our nearest available diver. On arrival, the diver performs a rapid underwater assessment to locate and identify the source of the problem. Temporary mitigation — plugging a fitting, installing a softwood bung, or placing an underwater patch — is performed immediately where possible. A plan for permanent repair is discussed with you before we leave the scene.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function BoatRepairPage() {
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
          <h1>Underwater Boat Repair Seattle — Emergency &amp; Scheduled</h1>
          <p>
            ADCI-certified divers handle zinc anode replacement, through-hull fittings, hull
            inspections, and 24/7 emergency response at your slip. Serving Shilshole Bay, Lake
            Union, Elliott Bay, and all Puget Sound marinas.
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
            <h2>Underwater Repairs Without the Haul-Out</h2>
            <p>
              Hauling a vessel for below-waterline repairs is the default in the marine industry,
              but it is not always the only option. Many of the most common repair needs —
              replacing a depleted zinc anode, servicing a seized seacock, swapping a transducer,
              or inspecting a suspect through-hull fitting — can be handled in-water by our
              ADCI-certified commercial diving team. The vessel stays in its berth, the work gets
              done, and you avoid haul-out costs that can run thousands of dollars before a single
              hour of repair labor is performed.
            </p>
            <p>
              We work throughout Seattle marinas including Shilshole Bay Marina, Lake Union's
              working waterfront, and Elliott Bay Marina. Our dive kit travels in a standard vehicle
              and sets up on most marina docks in under 30 minutes. For emergency situations, we
              prioritize rapid dispatch and can typically reach most Seattle-area marinas within one
              to two hours.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Zinc Anode Replacement</h2>
            <p>
              Zinc anodes are the sacrificial corrosion protection system for your vessel's
              underwater metals. In Puget Sound's electrically conductive saltwater, bronze
              propellers, stainless steel shafts, bronze through-hull fittings, and aluminum
              outdrives are all subject to galvanic corrosion if not properly protected. Anodes
              work by corroding preferentially — sacrificing themselves so the more expensive metals
              on your boat survive.
            </p>
            <p>
              The problem is that zinc anodes deplete over time and must be replaced before they
              are fully consumed. A zinc anode that has corroded more than 50% has lost most of its
              protective capacity. An anode that has corroded away entirely leaves the underlying
              metal exposed to accelerated electrolytic attack. We have inspected vessels at
              Shilshole Bay and Elliott Bay where the zincs were completely gone and pitting damage
              to the propeller and shaft was already underway — an expensive outcome that regular
              inspection would have prevented.
            </p>
            <p>
              Zinc anode replacement starts at $30 per anode including labor. Most vessels carry
              two to six anodes in various locations — shaft zincs, hull-mounted keel zincs, trim
              tab anodes, and rudder anodes. We inspect all anode locations during each dive and
              replace only those that are at or past the 50% depletion threshold. We also use the
              anode condition as a diagnostic tool: rapid depletion often signals a stray current
              corrosion problem that warrants further electrical investigation.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Through-Hull Fittings and Seacocks</h2>
            <p>
              Through-hull fittings are the openings in your hull where hoses pass to and from the
              ocean — raw water intakes for the engine cooling system, cockpit drains, bilge pump
              discharge, head intake and discharge, and other systems. Every one of them is a
              potential path for water to enter your vessel. The seacock — the valve on each
              through-hull — is what you close to stop that flow if the fitting fails or a hose
              breaks.
            </p>
            <p>
              Seacocks should be exercised (opened and closed) at least twice per year. A seacock
              that cannot be fully closed is a significant safety hazard — in a hose failure
              scenario, it is the last line of defense against sinking. Unfortunately, seacocks on
              older Seattle-area vessels are often corroded, seized, or marginally functional. We
              inspect seacock operation from the exterior during dive visits and coordinate with
              topside crew to verify full closure.
            </p>
            <p>
              Through-hull fittings themselves can suffer from dezincification — a form of
              corrosion where the zinc content of brass fittings leaches away, leaving a weak,
              porous structure that fails catastrophically. Dezincified fittings feel lighter than
              they should and may show a pinkish color. We flag these during hull inspections, and
              replacement is strongly recommended before they fail at the dock.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Hull Inspections: $200–$500</h2>
            <p>
              An underwater hull inspection is the most cost-effective way to understand the
              condition of your vessel's below-waterline surfaces without hauling out. Our divers
              perform a systematic examination of the full hull surface from stem to stern,
              including the keel, rudder, propeller shaft, cutlass bearing area, through-hull
              fittings, and all zinc anodes.
            </p>
            <p>
              Inspections are priced from $200 for a basic condition report on vessels up to 40 ft,
              and up to $500 for comprehensive photo and video documentation on larger or more
              complex vessels. The inspection includes a written findings report delivered after the
              dive, noting any areas of concern, recommended repairs, and the estimated urgency of
              each item. Many buyers use our pre-purchase hull inspection service before finalizing
              a boat purchase — it is one of the highest-value due-diligence steps available for
              any vessel transaction.
            </p>
            <p>
              For vessels that have not had a below-waterline inspection in more than two years, or
              any vessel with a known or suspected hull issue, we recommend a dedicated inspection
              dive before the next scheduled{' '}
              <Link to="/hull-cleaning-seattle">hull cleaning</Link>. Combining the two services
              is cost-effective and ensures you have a complete picture of your vessel's condition.
            </p>

            <h2 style={{ marginTop: '2rem' }}>24/7 Emergency Dive Services</h2>
            <p>
              When a vessel is taking on water, every minute matters. A failed through-hull fitting,
              a ruptured hose, a damaged keel fitting, or an unknown hull breach can sink a vessel
              at the dock in hours. Our emergency dive response is available 24 hours a day, 7 days
              a week throughout Seattle, Puget Sound, and adjacent waters.
            </p>
            <p>
              When you call our emergency line, we begin the dispatch process immediately. We
              gather the essential information — marina location, slip number, nature of the
              problem, rate of water ingress — and send our nearest available diver with a full
              emergency kit including plugs, underwater-cure epoxy, hydraulic patches, and line
              cutting tools. For vessels at Shilshole Bay, Elliott Bay Marina, or Lake Union, we
              can typically be in the water within 1–2 hours of your call.
            </p>
            <p>
              The diver's first priority is stopping the water ingress or slowing it enough to
              allow pumping to keep pace. Temporary measures — softwood emergency bungs, underwater
              patch compounds, and closed seacocks — are employed to stabilize the situation. Once
              the vessel is secured, we brief you on the permanent repair options and whether a
              haul-out is required to complete the fix safely.
            </p>
          </div>

          <div>
            <div className="info-box">
              <h3>Emergency Response — 24/7</h3>
              <p>
                Vessel taking on water? Call us immediately. We respond throughout Seattle, Puget
                Sound, Shilshole Bay, Elliott Bay, and Lake Union — day or night.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                Call{' '}
                <a href={PHONE_HREF} style={{ color: 'var(--ocean-600)', fontWeight: 700 }}>
                  {PHONE}
                </a>{' '}
                for emergency service.
              </p>
              <a
                href={PHONE_HREF}
                className="btn btn--primary"
                style={{ marginTop: '1.25rem', display: 'inline-block' }}
              >
                Call Now
              </a>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Repair Services &amp; Pricing</h3>
              <ul>
                <li>
                  <strong>Zinc anode replacement:</strong> from $30/anode
                </li>
                <li>
                  <strong>Hull inspection (basic):</strong> from $200
                </li>
                <li>
                  <strong>Hull inspection (full documentation):</strong> up to $500
                </li>
                <li>
                  <strong>Through-hull inspection:</strong> included in inspection
                </li>
                <li>
                  <strong>Transducer swap:</strong> call for quote
                </li>
                <li>
                  <strong>Emergency response:</strong> call for quote
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

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Services We Provide Underwater</h3>
              <ul>
                <li>Zinc anode inspection and replacement</li>
                <li>Through-hull fitting inspection</li>
                <li>Seacock exercise and condition check</li>
                <li>Transducer installation / replacement</li>
                <li>Keel bolt inspection</li>
                <li>Rudder bearing and gudgeon check</li>
                <li>Shaft seal inspection</li>
                <li>Minor hull epoxy patching</li>
                <li>Emergency leak response</li>
                <li>Pre-purchase hull inspection</li>
              </ul>
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
            We respond to your location throughout Seattle and Puget Sound — emergency and scheduled.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole Bay', l: 'Marina' },
              { v: 'Elliott Bay', l: 'Marina' },
              { v: 'Lake Union', l: 'Drydock &amp; Marinas' },
              { v: 'Eastlake', l: 'Marina' },
              { v: 'Portage Bay', l: 'Anchorage &amp; Marinas' },
              { v: 'Lake Washington', l: 'Marinas' },
              { v: 'Edmonds', l: 'Marina' },
              { v: 'Des Moines', l: 'Marina' },
            ].map(({ v, l }) => (
              <div key={v} className="about__stat">
                <span className="about__stat-value" style={{ fontSize: '1.1rem' }}>
                  {v}
                </span>
                <span className="about__stat-label" dangerouslySetInnerHTML={{ __html: l }} />
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
          <h2 className="section__title">Underwater Boat Repair FAQ</h2>
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
            Combine underwater repair with these services for complete below-waterline care.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Zinc Anode Replacement Seattle</h3>
              <p>
                Dedicated zinc anode service for vessels needing protection assessment or full
                replacement of hull, shaft, and trim tab anodes. We inspect every anode location
                and replace only what needs it.
              </p>
              <Link
                to="/zinc-anode-replacement-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Zinc Anode Service
              </Link>
            </div>
            <div className="info-box">
              <h3>Hull Inspection Seattle</h3>
              <p>
                Scheduled underwater hull inspection with photo documentation and written report.
                Ideal for pre-purchase surveys, annual condition assessments, or after a grounding
                event. Includes all through-hull and running gear review.
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
          <h2>Need underwater boat repair in Seattle?</h2>
          <p>
            24/7 emergency response. Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request a quote online. We respond within one business day for scheduled work.
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
