import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const SERVICE_LINKS = [
  { to: '/hull-cleaning-seattle', label: 'Hull Cleaning' },
  { to: '/underwater-welding-seattle', label: 'Underwater Welding' },
  { to: '/propeller-cleaning-seattle', label: 'Propeller Cleaning' },
  { to: '/boat-repair-underwater-seattle', label: 'Underwater Boat Repair' },
  { to: '/zinc-anode-replacement-seattle', label: 'Zinc Anode Replacement' },
  { to: '/hull-inspection-seattle', label: 'Hull Inspection' },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return ['header__nav-link', isActive ? 'header__nav-link--active' : ''].join(' ').trim()
}

function mobileNavLinkClass({ isActive }: { isActive: boolean }) {
  return ['header__mobile-link', isActive ? 'header__mobile-link--active' : ''].join(' ').trim()
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isServiceActive = SERVICE_LINKS.some((s) => location.pathname === s.to)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-icon">⚓</span>
          <span>
            <strong>Rapid Scuba</strong>
            <small>Seattle Marine Services</small>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <div className="header__dropdown">
            <button
              className={[
                'header__nav-link',
                'header__dropdown-trigger',
                isServiceActive ? 'header__nav-link--active' : '',
              ]
                .join(' ')
                .trim()}
              aria-haspopup="true"
            >
              Services ▾
            </button>
            <ul className="header__dropdown-menu" role="menu">
              {SERVICE_LINKS.map(({ to, label }) => (
                <li key={to} role="none">
                  <NavLink
                    to={to}
                    role="menuitem"
                    className={({ isActive }) =>
                      [
                        'header__dropdown-link',
                        isActive ? 'header__dropdown-link--active' : '',
                      ]
                        .join(' ')
                        .trim()
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
          <NavLink to="/reviews" className={navLinkClass}>
            Reviews
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          <a href={PHONE_HREF} className="btn btn--primary header__phone-btn">
            📞 {PHONE}
          </a>
        </nav>

        <button
          className={['header__menu-toggle', menuOpen ? 'header__menu-toggle--open' : '']
            .join(' ')
            .trim()}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={['header__mobile-nav', menuOpen ? 'header__mobile-nav--open' : '']
          .join(' ')
          .trim()}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="container header__mobile-inner">
          <details className="header__mobile-services">
            <summary className="header__mobile-link">Services</summary>
            <ul className="header__mobile-services-list">
              {SERVICE_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      [
                        'header__mobile-link',
                        'header__mobile-services-link',
                        isActive ? 'header__mobile-link--active' : '',
                      ]
                        .join(' ')
                        .trim()
                    }
                    onClick={closeMenu}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </details>

          <NavLink to="/pricing" className={mobileNavLinkClass} onClick={closeMenu}>
            Pricing
          </NavLink>
          <NavLink to="/reviews" className={mobileNavLinkClass} onClick={closeMenu}>
            Reviews
          </NavLink>
          <NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMenu}>
            Contact
          </NavLink>

          <a href={PHONE_HREF} className="btn btn--primary header__mobile-phone">
            📞 {PHONE}
          </a>
        </div>
      </nav>
    </header>
  )
}
