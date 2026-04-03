import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Propeller Cleaning Seattle',
  serviceType: 'Underwater Propeller Cleaning and Polishing',
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
    'Professional underwater propeller cleaning and polishing by ADCI-certified divers in Seattle. Marine growth removal, pitting repair, and blade polishing at your slip — no haul-out required. Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas. From $75 per propeller.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '75',
    highPrice: '250',
    offerCount: '3',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often should I clean my propeller in Puget Sound?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Puget Sound, we recommend propeller cleaning every 90 days during the active boating season. The cold, nutrient-rich waters of Shilshole Bay, Elliott Bay, and Lake Union support aggressive marine growth that attaches directly to propeller blades within weeks of a cleaning. Vessels that operate frequently benefit from cleaning every 60 days in summer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does propeller cleaning cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Propeller cleaning in Seattle starts at $75 per propeller for a standard single outboard or sterndrive prop. Twin-engine vessels are priced at $75 per prop. Fixed-pitch sailboat props run $75–$100. Large diameter commercial or feathering props start at $150. When bundled with a full hull cleaning, prop service is discounted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is involved in a propeller polishing service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Propeller polishing involves removing all marine growth from each blade face and the hub, using hand scrapers and abrasive pads to achieve a smooth surface finish, inspecting each blade for nicks, pitting, erosion, and cavitation damage, checking the shaft seal for weeping, and confirming the prop nut torque. The goal is a hydrodynamically clean surface that moves water efficiently without turbulence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you repair nicks and pitting on propeller blades underwater?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minor nicks and edge damage can be dressed underwater using marine-grade files and abrasive tools. This removes sharp stress-riser edges and smooths the blade profile to reduce cavitation. Significant blade damage — bent blades, large chunks missing, or severe pitting from electrolytic corrosion — typically requires out-of-water repair at a propeller shop, and we will advise you accordingly after inspection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is cavitation and how does a dirty propeller cause it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cavitation occurs when a propeller blade moves through water fast enough that local pressure drops below the vapor pressure of seawater, forming vapor bubbles that implode violently against the blade surface. Marine growth — even a thin biofilm — disrupts the smooth flow of water over the blade, triggering cavitation at lower RPMs than a clean prop would experience. Over time, cavitation erosion pits and corrodes the blade metal, reducing efficiency and eventually requiring expensive repairs or replacement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much fuel can I save with a clean propeller?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A well-polished propeller on a clean hull can reduce fuel consumption by 5–15% compared to a fouled combination. For a typical 30 ft powerboat burning 10 gallons per hour at cruise, a 10% savings means 1 gallon less per hour — easily $6–$8 per hour at current Seattle fuel prices. Over a full season of weekend use, that adds up to several hundred dollars in fuel savings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you remove fishing line and rope from the propeller shaft?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Rope and fishing line removal from the propeller shaft and cutlass bearing area is included in every propeller cleaning. Wrapped line can damage shaft seals, heat the cutlass bearing, and create significant vibration. We cut and remove all wrapped material and check the shaft seal for damage before surfacing.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function PropellerCleaningPage() {
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
          <h1>Propeller Cleaning &amp; Polishing Seattle</h1>
          <p>
            ADCI-certified divers clean, polish, and inspect propeller blades at your slip — no
            haul-out required. Reduced vibration, better fuel economy, and extended prop life.
            Serving Shilshole Bay, Lake Union, Elliott Bay, and all Puget Sound marinas.
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
            <h2>The Propeller Cleaning and Polishing Process</h2>
            <p>
              Propeller cleaning begins before our diver enters the water. We review your vessel
              type, propeller configuration, and any notes from previous service visits. For twin-
              engine vessels, both props are serviced in a single dive. For sailboats with folding
              or feathering props, we confirm the blade configuration to ensure proper cleaning of
              all exposed surfaces.
            </p>
            <p>
              In the water, the diver positions directly below the propeller and begins with a
              thorough visual assessment — documenting growth level, blade condition, and any obvious
              damage before touching the prop. Marine growth is removed blade by blade using
              stainless hand scrapers, nylon abrasive pads, and — for heavily fouled props — a soft
              rotary tool. Each blade face, the trailing and leading edges, the blade root where it
              meets the hub, and the hub itself are all cleaned individually. The shaft between the
              prop and the strut bearing is cleared of slime and checked for corrosion.
            </p>
            <p>
              After the growth is removed, each blade is polished using progressively finer abrasive
              pads to achieve a smooth hydrodynamic surface. This step is what separates a cleaning
              from a polishing — the goal is not just a biofouling-free prop but a blade surface
              that moves through water with minimal turbulence. A polished prop generates more thrust
              per revolution, runs cooler, and produces less vibration than even a mildly roughened
              surface.
            </p>
            <p>
              The final step is a blade-by-blade edge inspection. The diver runs a gloved hand along
              each leading and trailing edge to feel for nicks, dings, and burrs that the eye might
              miss in the underwater visibility. Minor edge damage is dressed with a marine file to
              remove sharp stress-riser points. After surfacing, findings are reported to the owner —
              including any blade damage, shaft seal condition, and zinc anode status.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Marine Growth Removal: What Attaches to Your Prop</h2>
            <p>
              Propeller blades are among the first surfaces to accumulate fouling on any vessel. The
              rotation of the prop during operation keeps the blades relatively clear while the
              engine is running, but stationary blades in Puget Sound waters develop biofilm within
              days. The fouling progression on a Seattle-area vessel typically follows this pattern:
            </p>
            <p>
              In the first two to four weeks, bacterial slime and diatom films coat the blade
              surface. This biofilm is invisible to the naked eye but creates a microscopically rough
              surface that disrupts laminar flow. By weeks four through eight, green and brown algae
              establish on the blades — visible as a greenish or brownish coating. In Shilshole Bay
              and Elliott Bay, barnacle larvae settle from the water column continuously during the
              warmer months and begin cementing to any hard surface, including blades. By 90 days
              without cleaning, most Puget Sound propellers have a combination of algae, hard
              barnacle bases, and tube worm casings that measurably reduce thrust efficiency.
            </p>
            <p>
              In Lake Union and other fresh water locations, barnacles cannot survive, but a thick
              layer of algae and slime develops quickly and is just as damaging to propeller
              hydrodynamics. Vessels moored near marinas with poor water circulation tend to foul
              faster than those in high-tidal-exchange locations.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Pitting Repair and Edge Dressing</h2>
            <p>
              Propeller pitting occurs for two primary reasons in Seattle waters: cavitation erosion
              and electrolytic corrosion. Cavitation pitting appears as irregular cratered areas on
              the low-pressure face of the blade, typically near the blade tips or at the leading
              edge. It develops when vapor bubbles form and implode against the blade surface at
              high velocity — each implosion removes a tiny amount of metal and roughens the surface,
              which promotes more cavitation and more erosion.
            </p>
            <p>
              Electrolytic pitting results from galvanic corrosion — the bronze or stainless alloy
              of the propeller acting as part of an electrochemical cell in saltwater. Under-protected
              vessels with inadequate zinc anodes are especially vulnerable. Pitting from this source
              tends to appear more uniformly distributed across the blade surface rather than
              concentrated at the cavitation zones.
            </p>
            <p>
              Minor pitting can be addressed underwater by removing sharp pit edges that accelerate
              cavitation onset. However, significantly pitted blades benefit from out-of-water
              repair at a prop shop, where the metal can be built up and re-profiled. We identify
              the severity during our inspection and give you a clear picture of whether in-water
              dressing is sufficient or a prop shop visit is warranted.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Benefits of Regular Propeller Maintenance</h2>
            <p>
              The performance benefits of a clean, polished propeller are well-documented across
              commercial and recreational marine sectors. On the fuel side, studies of commercial
              vessels show that a severely fouled propeller increases fuel consumption by 10–25%
              compared to a clean baseline. For a recreational powerboat burning $100 in fuel on a
              typical weekend trip, even a 10% savings adds up to real money across a full season.
            </p>
            <p>
              Vibration is the other major quality-of-life benefit. A rough or unevenly fouled
              propeller creates harmonic vibration through the shaft, into the engine mounts, and
              throughout the hull. Over time, this vibration loosens fittings, fatigues shaft
              couplings, and creates unwanted wear in the cutlass bearing. A polished prop runs
              smoothly and quietly — the difference is immediately noticeable to most skippers after
              a cleaning.
            </p>
            <p>
              Propeller life is also extended by regular cleaning. Cavitation and electrolytic
              corrosion are both accelerated by marine growth — by keeping the blades clean, you
              slow the degradation process. A bronze prop that might need replacement in five years
              under neglected conditions can last ten or more years with consistent maintenance.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Recommended Service Interval in Puget Sound</h2>
            <p>
              We recommend propeller cleaning every 90 days for most Seattle-area vessels. This
              interval keeps growth at a manageable level and prevents the barnacle settlement that
              begins in earnest after 60–90 days in Puget Sound's nutrient-rich waters. Vessels
              moored in Elliott Bay or Shilshole Bay — both high-fouling saltwater locations — may
              benefit from a 60-day interval during summer. Lake Union and Lake Washington vessels
              can generally go 90–120 days between cleanings due to the lower fouling rate of fresh
              water.
            </p>
            <p>
              For maximum efficiency, propeller cleaning should be scheduled alongside or immediately
              after a{' '}
              <Link to="/hull-cleaning-seattle">hull cleaning</Link>. The combination of a clean hull
              and polished props delivers the full fuel efficiency benefit — cleaning the hull alone
              while leaving a fouled prop still costs you thrust efficiency, and vice versa.
            </p>
            <p>
              Propeller cleaning Shilshole Bay Marina is one of our most frequent service calls —
              the 1,400+ slip facility houses everything from small outboard runabouts to large
              twin-screw motor yachts. Propeller cleaning Bainbridge Island follows the same Puget
              Sound saltwater schedule and is available via ferry crossing. Propeller cleaning Lake
              Union and Eastlake/Portage Bay vessels uses a freshwater cleaning protocol with
              extended intervals, while propeller cleaning Lake Washington (Kirkland and Bellevue)
              boats benefits from aluminum anode pairing to address freshwater galvanic protection.
            </p>
          </div>

          <div>
            <div className="info-box">
              <h3>Propeller Cleaning Pricing</h3>
              <p>Pricing per propeller:</p>
              <ul>
                <li>
                  <strong>Single outboard / sterndrive:</strong> from $75
                </li>
                <li>
                  <strong>Twin-engine vessels:</strong> $75 per prop
                </li>
                <li>
                  <strong>Sailboat fixed-pitch prop:</strong> $75–$100
                </li>
                <li>
                  <strong>Large / feathering / commercial:</strong> from $150
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Propeller service bundled with hull cleaning receives a discount.{' '}
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
              <h3>What's Included</h3>
              <ul>
                <li>All blade surfaces cleaned and polished</li>
                <li>Hub and blade root cleaning</li>
                <li>Shaft and cutlass bearing area cleared</li>
                <li>Rope and line removal</li>
                <li>Blade edge inspection and minor nick dressing</li>
                <li>Shaft seal check</li>
                <li>Zinc anode condition noted</li>
                <li>Post-dive findings report</li>
              </ul>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Recommended Service Interval</h3>
              <ul>
                <li>Saltwater (Shilshole, Elliott Bay): every 60–90 days</li>
                <li>Saltwater (general Puget Sound): every 90 days</li>
                <li>Fresh water (Lake Union, Lake Washington): every 90–120 days</li>
                <li>Commercial / charter vessels: every 30–60 days</li>
                <li>Racing / performance vessels: before major events</li>
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
            We come to your berth throughout Seattle and Puget Sound — no haul-out, no trailering.
          </p>
          <div className="about__stats">
            {[
              { v: 'Shilshole Bay', l: 'Marina — 1,400+ slips' },
              { v: 'Lake Union', l: 'Drydock & Marinas' },
              { v: 'Elliott Bay', l: 'Marina' },
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
          <h2 className="section__title">Propeller Cleaning FAQ</h2>
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
            Combine propeller cleaning with these services for complete below-waterline care.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                Schedule prop cleaning alongside a full hull cleaning for the best fuel efficiency
                gains. Our divers clean the entire hull surface, running gear, and propellers in a
                single visit — priced as a package.
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
              <h3>Zinc Anode Replacement Seattle</h3>
              <p>
                Inadequate zinc protection accelerates propeller pitting through electrolytic
                corrosion. We inspect and replace shaft zincs, hull zincs, and trim tab anodes
                on the same dive — protecting your props and running gear.
              </p>
              <Link
                to="/zinc-anode-replacement-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Zinc Anode Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Schedule propeller cleaning in Seattle</h2>
          <p>
            From $75 per prop. Call{' '}
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
