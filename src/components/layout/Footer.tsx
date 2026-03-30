import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>Rapid Scuba</strong>
          <p>Professional underwater marine services in Seattle, WA.</p>
          <p>Licensed · Insured · ADCI Certified</p>
        </div>

        <div className="footer__links">
          <h4>Services</h4>
          <Link to="/services">Hull Cleaning</Link>
          <Link to="/services">Underwater Welding</Link>
          <Link to="/services">Zinc Replacement</Link>
          <Link to="/services">Propeller Polishing</Link>
        </div>

        <div className="footer__links">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/book">Book a Dive</Link>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <p>📍 Seattle, WA</p>
          <p>📞 (206) 555-0192</p>
          <p>✉️ dive@rapidscuba.com</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Rapid Scuba LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
