import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hull Cleaning Seattle',
  serviceType: 'Underwater Hull Cleaning',
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
    'Professional underwater hull cleaning by ADCI-certified divers in Seattle. Barnacle, algae, and biofouling removal at your slip — no haul-out required. Serving Shilshole Bay, Lake Union, Eastlake, Portage Bay, and all Puget Sound marinas.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '3000',
    highPrice: '5000',
    offerCount: '3',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often should I clean my hull in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Puget Sound, most vessels need hull cleaning every 60–90 days during summer (May–September) and every 90–120 days in winter. Cold, nutrient-rich water accelerates biofouling compared to many other regions. Vessels kept in fresh water (Lake Union, Lake Washington) can typically go 3–6 months between cleanings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does hull cleaning cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hull cleaning in Seattle is priced by vessel size: small boats up to 30 ft run $3,000–$3,500, medium vessels 31–60 ft run $3,500–$4,250, and large vessels 61 ft and over start at $4,250–$5,000+. Package pricing is available for regular maintenance schedules.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does hull cleaning take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most hull cleanings take 1–3 hours depending on vessel size, the extent of fouling, and bottom paint condition. A 30 ft sailboat with moderate growth typically takes about 90 minutes. Heavily fouled hulls or vessels with complex appendages (full keels, twin rudders) may take longer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to move my boat for hull cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We work at your berth in Seattle or anywhere in Puget Sound. Our dive equipment travels in a standard vehicle and sets up on most marina docks in under 30 minutes. We coordinate with your marina before arriving to ensure dock access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will hull cleaning damage my antifouling paint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When done correctly, hull cleaning extends the life of antifouling paint rather than damaging it. We use soft brushes and scrapers matched to your paint type — ablative paints get the gentlest touch, hard paints can tolerate more aggressive cleaning. We assess your paint condition before diving and adjust our technique accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a hull cleaning service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every hull cleaning includes full hull surface cleaning from the waterline to the keel, running gear cleaning (propeller, shaft, rudder), a visual below-waterline inspection with findings reported to you, and zinc anode condition check. Photo documentation is available on request.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you clean my hull if it has been a long time since the last cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Heavily fouled hulls with thick barnacle or mussel accumulation may require additional time and are priced accordingly. In some cases, very heavy fouling can damage soft ablative paints during removal — we will assess this before diving and discuss options with you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you service commercial vessels and liveaboards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We service recreational boats, sailing vessels, motor yachts, charter boats, commercial fishing vessels, and workboats throughout Seattle and Puget Sound. Commercial operators often set up monthly or bi-monthly service contracts to keep vessels in compliance and performing at peak efficiency.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function HullCleaningPage() {
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
          <h1>Hull Cleaning Seattle — Professional Underwater Boat Hull Cleaning</h1>
          <p>
            ADCI-certified divers remove barnacles, algae, and biofouling at your slip — no
            haul-out required. Serving Shilshole Bay, Lake Union, Eastlake, Portage Bay, and all
            Puget Sound marinas.
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
            <h2>How Underwater Hull Cleaning Works</h2>
            <p>
              Underwater hull cleaning is performed entirely in-water at your berth. Our
              ADCI-certified divers enter the water alongside your vessel and work systematically
              from the waterline down to the keel, using hydraulic rotary brushes for open flat
              surfaces and hand scrapers for tight areas around the keel, rudder, shaft, and
              through-hull fittings. The vessel stays in its slip throughout the entire process —
              there is no scheduling a haul-out, no travel lift fees, and no waiting days or weeks
              for a dry-dock slot.
            </p>
            <p>
              The tools we use are matched to the bottom paint on your vessel. Soft-bristle rotating
              brushes are the standard for ablative antifouling paints — they remove growth without
              stripping the biocide layer that makes the paint effective. Hard paints can tolerate
              more aggressive cleaning. Before entering the water, our diver assesses the paint type
              and fouling level to select the right approach. The goal is to leave the antifouling
              paint intact and working, not to strip it down to the gelcoat.
            </p>
            <p>
              While cleaning, the diver also inspects the hull visually — looking for blistering,
              cracks, corrosion, osmotic damage, and the condition of zinc anodes. Any concerns are
              documented and reported to the owner after the dive. For vessels that haven't been
              inspected in a while, combining a cleaning with a formal{' '}
              <Link to="/hull-inspection-seattle">hull inspection</Link> is a cost-effective option.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Biofouling in Puget Sound: Why Seattle Hulls Get Dirty Fast</h2>
            <p>
              Puget Sound is one of the most biologically productive waterways in North America. Cold
              water, strong tidal exchange, and high nutrient levels create ideal conditions for
              barnacle, mussel, and algae growth year-round. The primary fouling organisms in local
              waters — acorn barnacles (<em>Balanus glandula</em>), giant barnacles (<em>Balanus
              nubilus</em>), tube worms, and a wide variety of green and brown algae — attach
              aggressively to any submerged surface within days of submersion.
            </p>
            <p>
              In warmer months, from May through September, larval settlement is at its peak.
              Barnacle larvae actively seek hard surfaces and can cement themselves to hull paint
              within 24 hours of contact. A vessel that was cleaned in May may show visible growth
              by July and significant barnacle accumulation by September. During winter, growth slows
              but does not stop — water temperatures in Elliott Bay and Lake Union rarely drop low
              enough to fully halt settlement, so year-round maintenance is still necessary for most
              vessel types.
            </p>
            <p>
              Fresh water marinas — Lake Union, Eastlake, and Portage Bay — have different fouling
              profiles than saltwater locations. Barnacles cannot survive in fresh water, but algae,
              zebra-mussel-adjacent invasive species, and bacterial slime form quickly. Vessels kept
              in these marinas often develop a thick slime layer that can be just as harmful to fuel
              efficiency as a heavy barnacle coating.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Fuel Efficiency: What a Fouled Hull Actually Costs You</h2>
            <p>
              The fuel penalty from biofouling is well-documented in the marine industry. A hull
              covered in a thin slime film increases hull drag by approximately 10–15%. Moderate
              barnacle growth — typical after 90–120 days without cleaning in Puget Sound — can
              increase drag by 25–35%. Heavy barnacle accumulation brings that number to 40% or more.
              For a motor yacht burning 15 gallons per hour at cruise, a 30% drag increase means
              spending an additional $150–$200 extra in fuel on a single 8-hour trip at current
              Seattle fuel prices.
            </p>
            <p>
              Sailboat owners feel the effect differently: a fouled hull means reduced boat speed
              at a given wind angle, more leeway, and — in light air — the difference between
              making headway and being stuck on a slow tack. Racing sailors clean before every major
              event, but even cruising sailors benefit from regular cleaning to maintain comfortable
              passage speeds.
            </p>
            <p>
              For commercial operators — charter boats, water taxis, fishing vessels — fuel
              efficiency is directly tied to operating margin. A 20% fuel penalty on a vessel that
              operates 200 days per year is a significant line item. Regular hull cleaning is one of
              the highest-return maintenance investments available to commercial boat owners.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Cost Savings vs. Drydock</h2>
            <p>
              Hauling a vessel for hull maintenance is the traditional alternative to in-water
              cleaning, but the costs add up quickly. Haul-out fees at Seattle-area boatyards
              typically run $15–$25 per foot of vessel length for the lift alone. Add yard storage
              fees ($10–$20 per foot per day), power hook-up, pressure washing, and the cost of
              re-applying antifouling paint after the work is done, and a routine maintenance haul
              for a 40-foot vessel can easily reach $3,000–$6,000 before any labor is performed.
            </p>
            <p>
              In-water hull cleaning eliminates all of those costs. The vessel stays in its slip,
              the existing antifouling paint stays intact, and the service is completed in a few
              hours rather than a few days. For most Seattle boat owners on a regular maintenance
              schedule, in-water cleaning costs a fraction of what a comparable drydock haul would
              run.
            </p>
          </div>

          <div>
            <div className="info-box">
              <h3>Hull Cleaning Pricing</h3>
              <p>Package pricing by vessel size:</p>
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
                All packages include hull, running gear, and zinc inspection. Commercial vessels
                and multi-vessel accounts receive custom pricing.{' '}
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
              <h3>Recommended Cleaning Schedule</h3>
              <ul>
                <li>Saltwater (summer): every 60–90 days</li>
                <li>Saltwater (winter): every 90–120 days</li>
                <li>Fresh water (Lake Union, Lake Washington): every 3–6 months</li>
                <li>Commercial / charter vessels: monthly or as needed</li>
                <li>Racing sailboats: before each major event</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section__title">Seattle Marinas We Serve</h2>
          <p className="section__subtitle">
            We travel to your berth throughout Seattle, Lake Union, and Puget Sound.
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

      <section className="section" style={{ background: 'var(--ocean-100)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section__title">Hull Cleaning FAQ</h2>
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
            Combine hull cleaning with these services for complete below-waterline care.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Propeller Cleaning Seattle</h3>
              <p>
                A clean hull paired with polished props delivers the best fuel efficiency gains.
                We clean and polish propeller blades, remove shaft rope, and inspect for nicks and
                cavitation damage — all in the same dive when scheduled together.
              </p>
              <Link
                to="/propeller-cleaning-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Propeller Cleaning
              </Link>
            </div>
            <div className="info-box">
              <h3>Underwater Welding Seattle</h3>
              <p>
                Need a structural repair while we're already in the water? Our certified divers
                perform wet welding for hull cracks, through-hull reinforcement, and running gear
                repairs — without hauling out.
              </p>
              <Link
                to="/underwater-welding-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Underwater Welding
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Schedule hull cleaning in Seattle</h2>
          <p>
            Call <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>{PHONE}</a> or
            request a quote online. We respond within one business day.
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
