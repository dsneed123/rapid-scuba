import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">⚓</span>
          <span>
            <strong>Rapid Scuba</strong>
            <small>Seattle Marine Services</small>
          </span>
        </Link>

        <nav className="header__nav">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                ['header__nav-link', isActive ? 'header__nav-link--active' : ''].join(' ').trim()
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn--primary">
            Book a Dive
          </Link>
        </nav>
      </div>
    </header>
  )
}
