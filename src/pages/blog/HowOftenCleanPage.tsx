import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Often Should You Clean a Boat Hull in Seattle?',
  description:
    'Puget Sound conditions, seasonal fouling patterns, signs your hull needs cleaning, and the true cost of neglecting regular hull maintenance in Seattle.',
  author: {
    '@type': 'Organization',
    name: 'RapidScuba',
  },
  publisher: {
    '@type': 'LocalBusiness',
    name: 'RapidScuba',
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
    '@id': 'https://rapidscuba.com/blog/how-often-clean-boat-hull-seattle',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often should I clean my boat hull in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Puget Sound saltwater, most vessels need cleaning every 60–90 days from May through September and every 90–120 days October through April. Fresh water marinas on Lake Union or Lake Washington can typically go 3–6 months between cleanings. Commercial and charter vessels often require monthly service to maintain fuel efficiency and compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the signs that a hull needs cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key signs include reduced top speed at normal throttle, noticeably higher fuel consumption, increased engine RPM required to maintain cruise speed, visible green or brown slime at the waterline, and a "grabby" feeling when accelerating in calm water. In sailboats, heavy fouling shows as reduced boat speed, excessive leeway, and poor light-air performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does hull cleaning frequency change by season in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Barnacle larval settlement peaks from May through September when water temperatures rise above 50°F. During these months, a hull can develop significant fouling in as little as 6–8 weeks. Winter growth slows considerably but does not stop — even in January, algae and biofilm continue to form. Year-round maintenance is still recommended for most vessels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it matter if my boat is in fresh water vs. salt water?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, significantly. Barnacles cannot survive in fresh water, so vessels on Lake Union, Portage Bay, and Lake Washington do not face barnacle fouling. However, green and brown algae, zebra mussel relatives, and bacterial slime form quickly in warm months. Fresh water hulls typically need cleaning every 3–6 months rather than every 60–90 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much fuel does a fouled hull actually waste?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A thin biofilm layer increases drag by 10–15%. Moderate barnacle growth after 90–120 days without cleaning increases drag by 25–35%. Heavy fouling can push drag increases to 40% or more. For a motor yacht burning 15 gallons per hour, a 30% drag increase means spending $150–$200 more in fuel on a single 8-hour trip at current Seattle prices.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function HowOftenCleanPage() {
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
          <span className="page-hero__label">Seattle Hull Cleaning Guide</span>
          <h1>How Often Should You Clean a Boat Hull in Seattle?</h1>
          <p>
            Puget Sound's cold, nutrient-rich saltwater creates some of the fastest biofouling
            conditions on the West Coast. Here's what the data says about cleaning cycles,
            seasonal patterns, and the real cost of going too long between services.
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
            <h2>Why Puget Sound Is Especially Aggressive for Biofouling</h2>
            <p>
              Puget Sound ranks among the most biologically productive bodies of water on the West
              Coast of North America. The combination of cold temperature, strong tidal exchange,
              and high concentrations of dissolved nutrients creates near-ideal conditions for
              barnacle, mussel, and algae growth year-round. Unlike marinas in warmer but less
              productive waters — much of Southern California, for example — Seattle hulls accumulate
              biofouling quickly even outside peak summer months.
            </p>
            <p>
              The primary fouling organisms in local waters include acorn barnacles (
              <em>Balanus glandula</em>), giant barnacles (<em>Balanus nubilus</em>), tube worms,
              encrusting bryozoans, and a wide variety of green and brown algae. Barnacle larvae
              are microscopic and free-swimming. They actively seek hard surfaces and can cement
              themselves permanently to hull paint within 24 hours of first contact. Once cemented,
              they cannot be removed without mechanical force — and if left long enough, they begin
              to undercut the antifouling coating itself.
            </p>
            <p>
              Fresh water marinas present a different challenge. Vessels kept in Lake Union, Eastlake,
              Portage Bay, and Lake Washington do not face barnacle fouling — barnacles cannot survive
              in fresh water. However, algae, bacterial biofilm, and certain invasive mussel species
              thrive in these environments. The slime layer that forms on a fresh water hull over
              three to four months can create nearly as much drag as light barnacle fouling in a
              saltwater marina.
            </p>

            <h2 style={{ marginTop: '2rem' }}>The 60–90 Day Rule for Puget Sound</h2>
            <p>
              The standard maintenance recommendation for saltwater vessels in Puget Sound is a hull
              cleaning every 60–90 days during active boating season (May through September) and
              every 90–120 days during the colder months (October through April). This schedule
              reflects the fouling rate observed on vessels with properly applied antifouling paint
              in good condition.
            </p>
            <p>
              A vessel cleaned in early May and not serviced again until late August — roughly 110
              days — will typically have a dense layer of early barnacle growth, heavy algae, and
              may already be showing noticeable speed loss. At 120 days or beyond in summer conditions,
              barnacles have had time to grow large enough that their sharp edges begin to damage
              surrounding antifouling paint during removal, which adds to the cost of the service.
            </p>
            <p>
              Vessels with worn or thin antifouling paint biofoul faster than vessels with fresh,
              properly applied coatings. If your bottom paint is more than two seasons old without
              reapplication, expect fouling to start appearing sooner than the 60-day mark during
              summer. A visual inspection at the waterline after 30–45 days is a good early indicator
              of what is happening below the surface.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Seasonal Patterns: Spring Peak, Winter Slowdown</h2>
            <p>
              Barnacle larval settlement is directly tied to water temperature. In Puget Sound, water
              temperatures in Elliott Bay and the main basin typically rise above 50°F by late April
              or early May — the threshold at which barnacle larvae become most active. Settlement
              peaks in June and July when temperatures reach 55–60°F, then tapers off as summer
              progresses into fall. By November, water temperatures have usually dropped back below
              50°F and barnacle settlement slows significantly.
            </p>
            <p>
              This seasonal pattern means that vessels that are out of the water over winter (stored
              on the hard, or launched late in spring) start each season with a clean slate. For
              vessels that remain in their slips year-round, a cleaning in October or November locks
              in a clean hull for the slow-growth winter period. A second cleaning in March or April,
              just before peak settlement season begins, sets the vessel up for efficient summer
              operation.
            </p>
            <p>
              Racing sailboats and performance powerboats often add a third cleaning mid-season in
              July, when peak larval settlement pressure is highest. Charter operators and commercial
              fishing vessels typically move to monthly service during the May–September window.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Signs Your Hull Needs Cleaning Now</h2>
            <p>
              You do not need to be a diver to recognize the signs of significant biofouling. The
              most reliable indicator is performance: a vessel that is noticeably slower at a given
              throttle setting compared to earlier in the season almost certainly has fouling drag.
              For motor vessels, this shows as reduced top speed and increased fuel consumption at
              cruise RPM. For sailboats, fouling shows as reduced VMG in known conditions, extra
              leeway on close-hauled points of sail, and sluggish light-air performance.
            </p>
            <p>
              At the waterline, visible slime, discoloration, or patches of green growth are a
              reliable sign that the underwater portion of the hull is fouled. Barnacles on the hull
              may not be visible from the dock, but if you can see growth at or just below the
              waterline, there is almost certainly more significant fouling further down. Running
              your hand along the hull at the waterline and feeling roughness or hard nodules is
              another simple check.
            </p>
            <p>
              Increased engine temperature at cruise RPM, unusual vibration, or a propeller that
              does not feel as responsive as usual can indicate propeller fouling — barnacles and
              tube worms colonize props just as readily as hull surfaces.
            </p>

            <h2 style={{ marginTop: '2rem' }}>The Cost of Neglect vs. Regular Maintenance</h2>
            <p>
              Skipping hull cleanings might seem like a way to save money, but the math generally
              runs the other direction. A motor yacht burning 15 gallons per hour that develops a
              30% drag penalty from fouling spends roughly $150–$200 more per 8-hour trip at current
              Seattle fuel prices. A vessel that makes 20 trips per season effectively burns an extra
              $3,000–$4,000 in fuel — more than the cost of two hull cleanings.
            </p>
            <p>
              Beyond fuel, neglected fouling leads to more expensive problems. Barnacles that remain
              on a hull for more than 4–6 months begin to physically damage the antifouling coating
              as their base plates expand. Removing old barnacle colonies often strips the surrounding
              paint down to the gelcoat or fiberglass, requiring repainting before antifouling
              protection is restored. Repeated barnacle scarring over multiple seasons can create
              osmotic pathways that lead to blistering — a serious structural repair issue on
              fiberglass hulls.
            </p>
            <p>
              For commercial operators, the stakes are higher still. A vessel operating at reduced
              efficiency due to fouling not only burns more fuel but may fall out of compliance with
              charter or commercial certification requirements that specify hull condition standards.
              Regular maintenance is insurance against both fuel costs and compliance risk.
            </p>
          </div>

          <div>
            <div className="info-box">
              <h3>Recommended Cleaning Schedule</h3>
              <ul>
                <li>
                  <strong>Saltwater (May–Sep):</strong> every 60–90 days
                </li>
                <li>
                  <strong>Saltwater (Oct–Apr):</strong> every 90–120 days
                </li>
                <li>
                  <strong>Fresh water (Lake Union / Lake Washington):</strong> every 3–6 months
                </li>
                <li>
                  <strong>Commercial / charter:</strong> monthly or as needed
                </li>
                <li>
                  <strong>Racing sailboats:</strong> before each major event
                </li>
              </ul>
              <Link
                to="/contact"
                className="btn btn--primary"
                style={{ marginTop: '1.25rem', display: 'inline-block' }}
              >
                Schedule a Cleaning
              </Link>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Signs Your Hull Needs Cleaning</h3>
              <ul>
                <li>Reduced top speed at normal throttle</li>
                <li>Higher fuel consumption at cruise RPM</li>
                <li>Visible slime or growth at the waterline</li>
                <li>Roughness felt along the hull below the water</li>
                <li>Propeller vibration or sluggish response</li>
                <li>Sailboat slow in light air, excessive leeway</li>
              </ul>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Hull Cleaning Pricing</h3>
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
                All packages include hull, running gear, and zinc inspection.{' '}
                <Link to="/pricing">See full pricing.</Link>
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
            We clean hulls at your berth throughout Seattle and Puget Sound.
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
            Combine hull cleaning with these services for complete below-waterline care.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                ADCI-certified divers remove barnacles, algae, and biofouling at your slip — no
                haul-out required. Serving all Seattle and Puget Sound marinas with package pricing
                by vessel size.
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
                Fouled propellers can reduce thrust efficiency by 10–15% on their own. We clean
                and polish prop blades, remove shaft rope, and check for nicks and cavitation
                damage in the same dive.
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
          <h2>Schedule hull cleaning in Seattle</h2>
          <p>
            Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or request a quote online. We respond within one business day.
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
