import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Underwater Welding Seattle',
  serviceType: 'Underwater Welding & Wet Welding Repairs',
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
    'Certified wet welding and structural repairs for vessels, docks, pilings, and seawalls in Seattle and Puget Sound. AWS D3.6M certified underwater welders. No dry-dock required.',
  offers: {
    '@type': 'Offer',
    priceRange: '$150–$250/hr',
    priceCurrency: 'USD',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is underwater welding safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underwater welding carries inherent risks that are managed through strict safety protocols and professional certification. Our divers follow ADCI guidelines, which require continuous topside communication, a dedicated standby diver on every commercial dive, documented power isolation procedures, and a pre-dive safety checklist before any job begins. The welding power supply is controlled exclusively by the topside tender — not by the diver — so power can be cut instantly if needed. Wet welding in professional hands, following established procedures, has a strong safety track record in the commercial marine industry.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does underwater welding cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Certified underwater welders in Seattle bill $150–$250 per hour depending on depth, job complexity, and site access. Most jobs carry a minimum 2-hour booking to cover equipment mobilization and dive preparation. Call us at 206-240-2687 for a free on-site estimate — most Seattle-area jobs qualify for a no-cost pre-job assessment before any work begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does underwater welding last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underwater welds performed correctly to AWS D3.6M Class-B standards have service lives comparable to equivalent surface welds in the same marine environment — typically 10–20 years or more on steel structures in saltwater, depending on cathodic protection maintenance and coating condition at the repair site. We provide zinc anode placement recommendations with every structural weld to slow galvanic corrosion at the repair location.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of vessels and structures can you weld?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We weld steel and cast iron on recreational vessels, commercial fishing boats, tugboats, barges, ferries, and workboats of all sizes. We also weld fixed structures including steel-framed docks, steel sheet pile seawalls, mooring dolphins, piling brackets, and mooring hardware. Aluminum requires TIG or MIG welding processes that are not compatible with wet welding methods — aluminum repairs typically require drydock.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to move my boat for underwater welding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most repairs, no. We work at your berth or anchorage throughout Seattle and surrounding Puget Sound. If the repair requires working around a tight slip or dock structure, we may ask you to shift to an open side-tie, but we coordinate all logistics with you and your marina before arriving on site. Our surface-supply diving equipment travels in a standard pickup truck and can be set up on most docks and piers within 30 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What underwater welding certifications do your divers hold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our welding divers are dual-certified: ADCI (Association of Diving Contractors International) certified as commercial divers, and individually qualified to AWS D3.6M underwater welding procedures. AWS D3.6M is the American Welding Society standard specifically developed for underwater welding — it defines Class-A and Class-B weld quality requirements that govern structural marine repairs. We maintain documented weld procedures and qualification records that can be provided for insurance, survey, or Coast Guard purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does underwater welding compare to dry-dock repairs in cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In-water welding almost always costs less than a comparable dry-dock repair for accessible below-waterline jobs. Haul-out fees at Seattle-area boatyards run $25–$50 per foot of vessel length for the lift alone — before yard storage ($10–$20 per foot per day), blocking, power hook-up, pressure washing, and re-applying antifouling paint. For a 40-foot vessel, a dry-dock welding visit easily exceeds $5,000 before the welder starts work. In-water welding at $150–$250 per hour typically delivers the same structural result at a fraction of the cost.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function UnderwaterWeldingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Underwater Welding Seattle — Certified Wet Welding &amp; Repairs</h1>
          <p>
            AWS D3.6M and ADCI-certified underwater welders serving Seattle marinas, commercial
            docks, and Puget Sound. Structural wet welding without dry-docking your vessel.
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
            <h2>How Underwater Wet Welding Works</h2>
            <p>
              Wet welding uses Shielded Metal Arc Welding (SMAW) — a technique adapted specifically
              for submerged conditions. Our certified divers use waterproofed stick electrodes and
              specialized welding machines to generate an electric arc that burns at over 6,500°F,
              hot enough to displace the surrounding water and fuse steel directly underwater. The
              process requires deep technical knowledge: water rushing past the weld accelerates
              cooling, which creates hydrogen embrittlement risks that a surface welder would never
              encounter. Our welders use procedures specifically developed to compensate for rapid
              quench rates and achieve consistent, sound fusion below the waterline.
            </p>
            <p>
              Our divers are dual-certified as commercial diving operators and qualified welding
              technicians. Before entering the water, we assess tidal conditions, water clarity,
              structural access, and current flow. Each diver works with a hardwired communication
              system connected to a topside tender who controls the power supply throughout the job.
              Power can be isolated instantly from the surface — a critical safety feature that sets
              professional underwater welding apart from improvised repairs.
            </p>
            <p>
              All of our work is performed to AWS D3.6M — the American Welding Society standard for
              underwater welding. Class-B welds are used for structural repairs where full joint
              penetration and consistent mechanical properties are required. We maintain documented
              weld procedures and our welders are individually qualified to these procedures, so
              every repair we complete can be supported with paperwork for insurance, survey, or
              Coast Guard requirements.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Underwater Welding Services We Provide</h2>
            <ul>
              <li>Steel crack repair on hulls, keels, and structural frames</li>
              <li>Hole patching — emergency and scheduled below-waterline plate repairs</li>
              <li>Corroded steel replacement below the waterline</li>
              <li>Dock and piling structural welding and bracket repair</li>
              <li>Seawall repair — sheet pile welding and tie-back plate installation</li>
              <li>Through-hull fitting installation and reinforcement welding</li>
              <li>Keel bolt and keel attachment structural repair</li>
              <li>Rudder fitting, skeg, and stabilizer fin repair</li>
              <li>Zinc anode welded attachment and replacement</li>
              <li>Emergency 24/7 response for vessels in immediate danger</li>
            </ul>
          </div>

          <div>
            <h2 style={{ marginTop: '0' }}>Underwater Welding by Location</h2>
            <p>
              Underwater welding Lake Union is among our most common structural assignments —
              Lake Union Drydock and the surrounding commercial docks see heavy vessel traffic,
              aging dock hardware, and steel vessels that require periodic structural repair.
              Underwater welding Elliott Bay Marina addresses both recreational vessel repairs and
              the commercial dock infrastructure serving Seattle's working waterfront.
            </p>
            <p>
              Underwater welding Shilshole Bay Marina covers the full spectrum from recreational
              sailboats needing keel reinforcement to larger powerboats with hull plate corrosion.
              We also serve Bainbridge Island — underwater welding Bainbridge Island is accessible
              via ferry, and we mobilize to Eagle Harbor for emergency structural repairs with the
              same 24-hour response time available to mainland customers.
            </p>
            <div className="info-box">
              <h3>Underwater Welding Pricing</h3>
              <p>
                Certified underwater welders in Seattle bill $150–$250 per hour depending on depth,
                job complexity, and site access. Most jobs carry a minimum 2-hour booking to cover
                equipment mobilization and dive preparation.
              </p>
              <ul>
                <li>Hourly rate: $150–$250/hr</li>
                <li>Minimum booking: 2 hours</li>
                <li>Materials (rod, plate, fittings) quoted separately</li>
                <li>Free on-site assessments for most Seattle-area jobs</li>
                <li>Emergency after-hours callout rate may apply</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                <strong>Compare to drydock:</strong> haul-out fees in Seattle run $25–$50 per foot
                of vessel length — before travel lift charges, yard storage, or the cost of
                re-applying antifouling paint. For a 40-foot vessel, a drydock welding visit easily
                exceeds $5,000 before the welder arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container page-content__grid">
          <div>
            <h2>Why Choose In-Water Welding Over Dry-Dock?</h2>
            <p>
              Drydocking a vessel for below-waterline repairs is expensive, slow, and often
              unnecessary. In-water welding eliminates haul-out fees, travel lift charges, blocking
              fees, and yard storage costs — savings that add up quickly. For commercial operators
              including fishing boats, charter vessels, and workboats, keeping the vessel in service
              during repairs means no lost revenue days.
            </p>
            <p>
              Scheduling is another critical advantage. Haul-out facilities in the Seattle area
              often have waiting lists of weeks or months, particularly during peak season. An
              underwater welding crew can typically mobilize within 24–48 hours for non-emergency
              work and same-day for urgent repairs. Your vessel stays in its slip, and there is no
              need to re-apply antifouling paint after the job is done.
            </p>
            <ul>
              <li>No haul-out fees ($25–$50/ft at Seattle-area yards)</li>
              <li>No yard storage, blocking, or power hook-up fees</li>
              <li>Vessel stays in service — no lost revenue for commercial operators</li>
              <li>Faster mobilization — often same day or next day</li>
              <li>No antifouling paint re-application required after the repair</li>
              <li>Lower total project cost for most standard repair categories</li>
            </ul>
          </div>
          <div>
            <div className="info-box">
              <h3>When Dry-Dock Is the Right Choice</h3>
              <p>
                We will tell you honestly when dry-dock is the better option for your situation:
              </p>
              <ul>
                <li>Extensive hull plating replacement over large sections</li>
                <li>Repairs requiring full internal access to the vessel</li>
                <li>Class surveys that mandate out-of-water inspection</li>
                <li>
                  Critical structural welds requiring Class-A AWS D3.6M standard with full NDT
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                For those jobs, we can refer you to trusted Pacific Northwest boatyards and provide
                our inspection documentation to support the scope of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ocean-100)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section__title">Underwater Welding FAQ</h2>
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

      <section className="section about" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <div className="container">
          <h2 className="section__title">Underwater Welding Service Areas</h2>
          <p className="section__subtitle">
            We mobilize to all major Seattle marinas, commercial docks, and Puget Sound locations.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole Bay', l: 'Marina — 1,400+ slips' },
              { v: 'Elliott Bay', l: 'Marina' },
              { v: 'Lake Union', l: 'Commercial Docks' },
              { v: 'Eastlake', l: 'Marina' },
              { v: 'Portage Bay', l: 'Anchorage & Marinas' },
              { v: 'Lake Washington', l: 'Kirkland & Bellevue' },
              { v: 'Bainbridge Island', l: 'Eagle Harbor & Port Madison' },
              { v: 'Puget Sound', l: 'Anchorages' },
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

      <section className="section" style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className="section__title">Related Services</h2>
          <p className="section__subtitle">
            Combine underwater welding with these services for comprehensive vessel care.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                A clean hull makes it easier to spot new corrosion developing near a weld repair
                site. We offer regular in-water hull cleaning that removes barnacles and growth,
                keeps your antifouling paint working, and catches problems before they become
                expensive repairs.
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
                Not sure whether you need welding? Start with a below-waterline inspection. Our
                certified divers provide video-documented inspection reports that identify cracks,
                corrosion, and structural concerns — so you know the full scope before committing
                to any repair work.
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
          <h2>Need certified underwater welding in Seattle?</h2>
          <p>$150–$250/hr for AWS D3.6M certified divers. 24/7 emergency response available.</p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request Welding Service
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
