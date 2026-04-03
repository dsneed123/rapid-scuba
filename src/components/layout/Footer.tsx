import { Link } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const SERVICE_AREAS = [
  'Shilshole Bay Marina (Ballard)',
  'Lake Union',
  'Eastlake / Portage Bay',
  'Elliott Bay Marina',
  'Lake Washington (Kirkland/Bellevue)',
  'Bainbridge Island',
  'Edmonds Marina',
  'Des Moines Marina',
  'Puget Sound Anchorages',
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>Rapid Scuba</strong>
          <p>Professional underwater marine services in Seattle, WA.</p>
          <p>Licensed · Insured · ADCI Certified</p>
          <div className="footer__brand-contact">
            <a href={PHONE_HREF}>{PHONE}</a>
            <a href="mailto:info@rapidscuba.com">info@rapidscuba.com</a>
          </div>
          <div className="footer__hours">
            <p>Mon–Sat: 7am – 6pm</p>
            <p>Emergency: 24/7</p>
          </div>
        </div>

        <div className="footer__links">
          <h4>Services</h4>
          <Link to="/hull-cleaning-seattle">Hull Cleaning</Link>
          <Link to="/underwater-welding-seattle">Underwater Welding</Link>
          <Link to="/propeller-cleaning-seattle">Propeller Cleaning</Link>
          <Link to="/boat-repair-underwater-seattle">Underwater Boat Repair</Link>
          <Link to="/zinc-anode-replacement-seattle">Zinc Anode Replacement</Link>
          <Link to="/hull-inspection-seattle">Hull Inspection</Link>
        </div>

        <div className="footer__links">
          <h4>Company</h4>
          <Link to="/pricing">Pricing</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog/how-often-clean-boat-hull-seattle">Blog</Link>
        </div>

        <div className="footer__contact">
          <h4>Service Areas</h4>
          {SERVICE_AREAS.map((area) => (
            <p key={area}>{area}</p>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Rapid Scuba LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
