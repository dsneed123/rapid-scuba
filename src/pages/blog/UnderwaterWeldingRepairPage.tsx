import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Underwater Welding Repair for Seattle Docks & Pilings',
  description:
    'How saltwater corrosion damages Seattle docks and pilings, the underwater welding repair process, and how to decide when to repair vs. replace marine structures.',
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
    '@id': 'https://rapidscuba.com/blog/underwater-welding-repair-seattle-docks',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is underwater welding and how does it work for dock repair?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underwater welding (wet welding) uses specialized waterproof electrodes and equipment to create welds while submerged. For dock and piling repair in Seattle, it is used to reinforce corroded steel pilings, repair failed piling brackets, weld replacement sections onto damaged structural members, and attach sacrificial anodes to slow future corrosion. The technique avoids the need to dewater a dock area or remove structural members from the water.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast does saltwater corrode steel dock pilings in Puget Sound?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Puget Sound, unprotected steel corrodes at roughly 5–8 mils per year in the splash zone (the area alternately wet and dry with tidal action) and 3–5 mils per year below the waterline. The splash zone is more aggressive because alternating wet-dry cycles accelerate oxidation. A 1/4-inch steel piling wall can lose structural integrity in the splash zone in as little as 10–15 years without cathodic protection or protective coatings.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should a dock piling be repaired vs. replaced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Repair is typically the right choice when corrosion is localized, the piling retains at least 50–60% of its original wall thickness, and the failure mode is surface degradation rather than structural fracture. Replacement is warranted when corrosion has penetrated through the full wall thickness, when the piling has buckled or fractured, or when the damage zone extends over more than 30–40% of the piling length. A diver inspection with wall thickness measurement is the reliable way to assess which applies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does underwater dock repair typically cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underwater dock and piling repair in Seattle is scoped and priced per project based on the extent of corrosion, the number of pilings involved, the required repair method, and access conditions. An initial diver inspection to assess the damage and scope the repair is the appropriate first step. Contact us at 206-240-2687 for a site visit and assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can underwater welding repair be done at an occupied marina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with appropriate safety precautions. Underwater welding work in an active marina requires coordination with the marina management and adjacent slip holders to clear the immediate work area during welding operations. The work itself is contained to the specific structural member being repaired. We coordinate all site access and safety requirements before beginning any dock repair work.',
      },
    },
  ],
}

const faqs = faqSchema.mainEntity

export function UnderwaterWeldingRepairPage() {
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
          <span className="page-hero__label">Seattle Underwater Welding</span>
          <h1>Underwater Welding Repair for Seattle Docks &amp; Pilings</h1>
          <p>
            Saltwater corrosion is relentless in Puget Sound. Our certified underwater welders
            repair dock structures, pilings, and marine hardware in place — without dewatering
            or removing structural members from the water.
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
            <h2>How Saltwater Corrosion Damages Seattle Docks and Pilings</h2>
            <p>
              Puget Sound's saltwater environment is aggressive to steel, aluminum, and cast iron
              marine structures. Chloride ions in seawater penetrate protective coatings and
              disrupt the passive oxide layer that normally protects ferrous metals from
              oxidation. Once the protective layer is compromised, corrosion accelerates
              dramatically — especially in the splash zone, the band of a piling or dock
              support that alternates between wet and dry with tidal cycles.
            </p>
            <p>
              The splash zone is the most destructive environment for structural steel in a
              marine setting. When steel is wetted by seawater and then exposed to air, oxygen
              availability is high and the electrolyte (saltwater) clings to the surface.
              This combination drives extremely high corrosion rates — typically 5–8 mils of
              steel loss per year on unprotected surfaces. A standard steel H-pile with a
              3/8-inch wall can lose half its structural wall thickness in the splash zone
              within 20–25 years in Seattle-area conditions without cathodic protection or
              coating maintenance.
            </p>
            <p>
              Below the waterline, corrosion is slower but still significant. Dissolved
              oxygen levels in Puget Sound are high compared to many other saltwater environments
              due to the cold, well-mixed water column, which accelerates underwater corrosion
              relative to warmer, more oxygen-depleted harbors. Steel pilings below the
              waterline in Seattle typically lose 3–5 mils per year without protection.
            </p>
            <p>
              Wood pilings — still common in older Seattle marinas — face a different but equally
              serious threat: marine borers. Teredo worms (<em>Teredo navalis</em>) and gribble
              crustaceans are active in Puget Sound and can hollow out an unprotected wood piling
              from the inside within a few years of submersion. Creosote-treated pilings have
              better resistance, but creosote treatment degrades over time and is subject to
              increasingly strict environmental regulations. Modern wood pilings typically use
              ACZA (ammoniacal copper zinc arsenate) preservative treatment, which has good
              marine borer resistance but must be maintained.
            </p>

            <h2 style={{ marginTop: '2rem' }}>What Underwater Welding Repair Involves</h2>
            <p>
              Underwater welding — technically "wet welding" when performed without a dry habitat
              — uses specialized waterproof electrodes and shielded metal arc welding (SMAW)
              equipment adapted for submerged operation. The welder-diver works alongside or
              below the structural member to be repaired, using the same fundamental welding
              technique as surface welding but with electrodes formulated to displace water
              from the weld puddle and maintain arc stability in wet conditions.
            </p>
            <p>
              For dock and piling repair in Seattle, the most common applications include:
            </p>
            <p>
              <strong>Piling sleeve installation:</strong> A corroded piling section — typically
              in the splash zone where corrosion is most severe — can be reinforced by welding
              a steel sleeve over the damaged area. The sleeve is fitted over the existing
              piling and welded at top and bottom to create a structural composite that
              restores the original load capacity. This is significantly cheaper than piling
              replacement and can extend piling service life by 20–30 years.
            </p>
            <p>
              <strong>Bracket and connection repair:</strong> Dock float connections, brow
              gangways, and mooring hardware attach to pilings via welded brackets. These
              connections corrode at the weld toe — the point where the bracket meets the
              piling — and are a common failure point in aging dock structures. Failed or
              cracked weld connections can be repaired in-water, avoiding the need to remove
              dock sections or dewater the work area.
            </p>
            <p>
              <strong>Anode installation:</strong> Sacrificial zinc or aluminum anodes can be
              welded directly to steel pilings or dock hardware to establish cathodic protection.
              This is particularly valuable after a repair: fresh welded steel has no protective
              coating and will begin corroding immediately without cathodic protection.
            </p>
            <p>
              <strong>Through-hull and fitting repair:</strong> On vessels, wet welding is used
              for hull cracks, failed sea cock reinforcements, and running gear structural repairs
              that do not require the precision of dry-habitat welding. For structural boat repairs
              where weld quality requirements are high, we assess whether wet welding is appropriate
              or whether a drydock repair is warranted.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Repair vs. Replace: How to Decide</h2>
            <p>
              The repair vs. replace decision for dock pilings and structural members depends
              primarily on three factors: the remaining wall thickness relative to original
              specification, the extent of the damage zone along the piling length, and the
              cost comparison between repair methods and new installation.
            </p>
            <p>
              As a general framework: a piling that retains at least 50–60% of its original
              wall thickness, has localized corrosion damage confined to a section of 2–4 feet,
              and is structurally sound above and below the damage zone is a good candidate for
              sleeve repair. The repair cost is typically 30–50% of new piling installation when
              mobilization and access factors are similar. Sleeve repairs can also be performed
              without disturbing the dock structure above — no demolition, no heavy equipment,
              no dock closure.
            </p>
            <p>
              Replacement is the correct call when: the piling has buckled or fractured (a sleeve
              cannot restore structural integrity to a buckled member), corrosion has penetrated
              through the full wall thickness over a significant length, the piling shows signs
              of internal marine borer damage (for wood) that has compromised the full cross-section,
              or when the dock structure overall is at end of service life and a comprehensive
              rebuild is the more economic long-term choice.
            </p>
            <p>
              The most important first step for any dock owner concerned about piling condition
              is an underwater inspection. Visual inspection from above the waterline misses the
              splash zone and submerged sections where damage is typically worst. A diver inspection
              with ultrasonic thickness testing provides the data needed to make an informed
              repair vs. replace decision, rather than relying on guesswork based on what can
              be seen above the waterline.
            </p>

            <h2 style={{ marginTop: '2rem' }}>Maintaining Your Investment After Repair</h2>
            <p>
              Underwater welding repairs extend the service life of dock structures, but ongoing
              maintenance is still required to prevent the repaired section from corroding on
              the same timeline as the original. The most important post-repair maintenance
              element is cathodic protection: sacrificial zinc or aluminum anodes attached to
              the repaired section (and the broader dock structure) direct galvanic corrosion
              away from the structural steel.
            </p>
            <p>
              Anodes should be inspected annually by a diver and replaced when they are more
              than 50% depleted. Depleted anodes provide no protection. In Seattle-area waters,
              zinc anodes on dock structures typically last 2–4 years depending on surface area,
              water chemistry, and the stray current environment at the specific marina.
            </p>
            <p>
              Protective coatings — marine epoxy or polyurethane coatings applied to steel
              surfaces — provide a secondary barrier against corrosion. Coatings cannot be
              applied underwater, so any coating program requires access to the structure out
              of water. However, coating the splash zone during a planned maintenance window
              significantly reduces the cathodic protection load and extends anode life.
            </p>
            <p>
              For Seattle dock and marina owners, pairing an annual diver inspection with anode
              replacement is the most cost-effective way to get ahead of structural deterioration
              before it reaches the point where major repair or replacement is required.{' '}
              <Link to="/underwater-welding-seattle">See our underwater welding service page</Link>{' '}
              for full details on vessel and dock repair capabilities.
            </p>
          </div>

          <div>
            <div className="info-box">
              <h3>Underwater Welding Services</h3>
              <ul>
                <li>Steel piling sleeve installation</li>
                <li>Dock bracket and connection repair</li>
                <li>Sacrificial anode installation</li>
                <li>Hull crack and structural repair</li>
                <li>Running gear and through-hull repair</li>
              </ul>
              <Link
                to="/contact"
                className="btn btn--primary"
                style={{ marginTop: '1.25rem', display: 'inline-block' }}
              >
                Request an Assessment
              </Link>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Repair vs. Replace Indicators</h3>
              <ul>
                <li>
                  <strong>Repair:</strong> ≥50% wall thickness remaining, localized damage,
                  structurally sound above and below damage zone
                </li>
                <li>
                  <strong>Replace:</strong> Buckled or fractured piling, full wall thickness loss,
                  internal marine borer damage, end-of-life dock system
                </li>
              </ul>
            </div>

            <div className="info-box" style={{ marginTop: '1.5rem' }}>
              <h3>Seattle Corrosion Rates (Unprotected Steel)</h3>
              <ul>
                <li>
                  <strong>Splash zone:</strong> 5–8 mils/year
                </li>
                <li>
                  <strong>Submerged:</strong> 3–5 mils/year
                </li>
                <li>
                  Cathodic protection (zinc anodes) dramatically reduces these rates
                </li>
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
          <h2 className="section__title">Seattle Areas We Serve</h2>
          <p className="section__subtitle">
            Dock and piling repair throughout Seattle, Lake Union, and Puget Sound.
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
            Complete underwater services for vessels and marine structures in Seattle.
          </p>
          <div className="page-content__grid" style={{ marginTop: '2rem' }}>
            <div className="info-box">
              <h3>Underwater Welding Seattle</h3>
              <p>
                Certified wet welding for hull repairs, running gear, through-hull reinforcement,
                and structural vessel repairs — performed in-water at your berth without
                hauling out.
              </p>
              <Link
                to="/underwater-welding-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Underwater Welding
              </Link>
            </div>
            <div className="info-box">
              <h3>Hull Cleaning Seattle</h3>
              <p>
                Regular hull cleaning by ADCI-certified divers keeps your vessel performing
                efficiently and provides regular opportunities to catch structural issues
                before they become expensive repairs.
              </p>
              <Link
                to="/hull-cleaning-seattle"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Hull Cleaning
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Underwater dock and piling repair in Seattle</h2>
          <p>
            Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            to schedule a diver inspection and repair assessment. We respond within one business day.
          </p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request Assessment
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
