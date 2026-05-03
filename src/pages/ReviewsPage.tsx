import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

interface Review {
  id: number
  name: string
  role?: string
  rating: number
  service: string
  location: string
  text: string
  date: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Captain Mike R.',
    rating: 5,
    service: 'Hull Cleaning',
    location: 'Lake Union',
    text: "Had RapidScuba out to clean the hull on my 45-foot sloop at Lake Union. They showed up on time, were efficient, and the bottom looked great afterward. The diver also caught a small crack near the keel I hadn't noticed — gave me a heads-up before it became a real problem. Highly recommend for any Lake Union boat owner.",
    date: '2024-09-12',
  },
  {
    id: 2,
    name: 'Sarah K.',
    role: 'Marina Manager, Shilshole Bay Marina',
    rating: 5,
    service: 'Tenant Hull Inspections',
    location: 'Shilshole Bay Marina',
    text: "We use RapidScuba for tenant underwater inspections at Shilshole. Professional, reliable, and the divers communicate well with both our staff and the boat owners. They handle every vessel size we have in the marina, from 22-foot day sailors to 65-foot trawlers. Wouldn't trust anyone else for our inspection needs.",
    date: '2024-08-03',
  },
  {
    id: 3,
    name: 'James T.',
    rating: 5,
    service: 'Emergency Propeller Clearing',
    location: 'Shilshole Bay Marina',
    text: "Called at 2am because my prop got badly fouled on a crab pot line just outside Shilshole. Couldn't back down, couldn't go forward. They had a diver in the water within two hours — cleared the line, checked the shaft seal, and I was underway by 4am. Unreal response time. Saved what could have been a very expensive tow and shaft repair.",
    date: '2024-07-20',
  },
  {
    id: 4,
    name: 'Pacific NW Towing LLC',
    rating: 5,
    service: 'Underwater Welding',
    location: 'Elliott Bay',
    text: "Had a cracked exhaust port on one of our tow boats and were facing a drydock bill that would have taken us out of service for at least a week. RapidScuba's underwater welding team came out to Elliott Bay and made the repair in-water. Saved us the haul-out cost, the yard storage fees, and a week of lost revenue. The weld has held perfectly for six months.",
    date: '2024-06-15',
  },
  {
    id: 5,
    name: 'David L.',
    rating: 4,
    service: 'Hull Cleaning',
    location: 'Portage Bay',
    text: "Great work — the hull was seriously overgrown after a long winter and they got it looking clean again. Only reason for 4 stars instead of 5 is scheduling: it took about two weeks to get an appointment in late August. They mentioned summer is their busiest season, so if you can plan ahead you're set. Quality of the work itself was excellent.",
    date: '2024-08-28',
  },
  {
    id: 6,
    name: 'Lisa M.',
    rating: 5,
    service: 'Zinc Anode Replacement',
    location: 'Eastlake Marina',
    text: "My zincs were nearly completely eaten through and I had no idea. RapidScuba came out to Eastlake Marina, replaced all four anodes, and did a full hull clean while they were at it. The diver showed me photos afterward — the electrolysis damage to the prop was worse than I thought. Now on a regular maintenance schedule with them to keep it in check.",
    date: '2024-05-10',
  },
  {
    id: 7,
    name: 'Tom & Sandra W.',
    rating: 5,
    service: 'Annual Hull Maintenance Contract',
    location: 'Lake Union',
    text: "We've been on an annual maintenance contract with RapidScuba for two years now. They handle our quarterly hull cleans, annual zinc replacement, and running gear inspections on our trawler. Having a consistent team who knows our boat has made a huge difference — they catch things we'd miss and the hull stays in top shape year-round.",
    date: '2024-10-05',
  },
  {
    id: 8,
    name: 'Harbor Patrol Vessel Group',
    rating: 5,
    service: 'Commercial Fleet Maintenance',
    location: 'Seattle Waterfront',
    text: "RapidScuba manages hull maintenance for our patrol vessel fleet along the Seattle waterfront. Operating on public safety timelines means we can't afford vessels being out of service for scheduled maintenance. Their team works around our patrol schedules and has never missed a window. Truly professional commercial service.",
    date: '2024-09-30',
  },
  {
    id: 9,
    name: 'Chris B.',
    rating: 5,
    service: 'Pre-Purchase Hull Inspection',
    location: 'Shilshole Bay Marina',
    text: "Almost bought a ketch at Shilshole that looked great above the waterline. RapidScuba's pre-purchase inspection found severe osmotic blistering across the entire underbody, a cracked keel bolt, and a corroded through-hull the seller hadn't disclosed. Saved me from a $40,000 mistake. If you're buying a boat in Seattle, get an underwater inspection first.",
    date: '2024-04-22',
  },
  {
    id: 10,
    name: 'Marina del Rey Yacht Club Member',
    rating: 5,
    service: 'Propeller Polishing',
    location: 'Eastlake Marina',
    text: "Had RapidScuba polish the prop on my 50-foot motor yacht at Eastlake. The performance difference was noticeable immediately — smoother at cruise RPM and a real improvement in fuel economy over the following weeks. They also balanced the shaft while they were under there. Professional job start to finish.",
    date: '2024-11-08',
  },
]

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'RapidScuba',
  telephone: '+12062402687',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: String(reviews.length),
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
    reviewBody: r.text,
    datePublished: r.date,
  })),
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="review-card__stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

export function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />

      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Seattle Marine Services</span>
          <h1>Customer Reviews — RapidScuba Seattle</h1>
          <div className="reviews-summary">
            <span className="reviews-summary__score">4.9</span>
            <div className="reviews-summary__right">
              <span className="reviews-summary__stars" aria-label="4.9 out of 5 stars">
                ★★★★★
              </span>
              <span className="reviews-summary__count">
                Based on {reviews.length} verified reviews
              </span>
            </div>
          </div>
          <p>
            Real feedback from boat owners, marina managers, and commercial operators across
            Seattle — Lake Union, Shilshole Bay, Eastlake, Portage Bay, and Elliott Bay.
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

      <section className="section">
        <div className="container">
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article key={review.id} className="review-card">
                <Stars rating={review.rating} />
                <p className="review-card__text">"{review.text}"</p>
                <div>
                  <p className="review-card__author">{review.name}</p>
                  <span className="review-card__meta">
                    {review.role ? `${review.role} · ` : ''}
                    {review.service} · {review.location}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready to Schedule Your Service?</h2>
          <p>
            Join hundreds of Seattle boat owners who trust RapidScuba for hull cleaning,
            underwater welding, zinc replacement, and marine inspections.
          </p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--white btn--lg">
              Request a Free Quote
            </Link>
            <a href={PHONE_HREF} className="cta__phone">
              📞 {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
