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
          <img
            src="/images/Logo For RapidScuba Clean & Emergency Repair.png"
            alt="RapidScuba logo"
            className="footer__brand-logo"
          />
          <strong>RapidScuba</strong>
          <p>Professional underwater marine services in Seattle, WA.</p>
          <p>Licensed · Insured · ADCI Certified</p>
          <div className="footer__brand-contact">
            <a href={PHONE_HREF}>{PHONE}</a>
            <a href="mailto:info@rapidscuba.com">info@rapidscuba.com</a>
          </div>
          <div className="footer__hours">
            <p>Friday to Sunday: 7am – 6pm</p>
          </div>
        </div>

        <div className="footer__links">
          <h4>Services</h4>
          <Link to="/hull-cleaning-seattle">Hull Cleaning</Link>
          <Link to="/propeller-cleaning-seattle">Propeller Cleaning</Link>
          <Link to="/hull-inspection-seattle">Hull Inspection</Link>
        </div>

        <div className="footer__links">
          <h4>Company</h4>
          <Link to="/pricing">Pricing</Link>
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
        <p>© {new Date().getFullYear()} RapidScuba LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
