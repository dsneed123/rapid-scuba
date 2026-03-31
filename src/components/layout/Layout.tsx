import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

export function Layout() {
  const location = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Scroll-triggered fade-in via IntersectionObserver
  useEffect(() => {
    // Small delay so the new page's DOM is in place
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>('.section')
      if (sections.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08 }
      )

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
        section.classList.add('fade-in')
        if (alreadyVisible) {
          section.classList.add('is-visible')
        } else {
          observer.observe(section)
        }
      })

      return () => observer.disconnect()
    }, 50)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="site">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <div className="mobile-phone-bar" aria-hidden="true">
        <a href={PHONE_HREF} className="mobile-phone-bar__link">
          <span className="mobile-phone-bar__icon">📞</span>
          {PHONE}
        </a>
      </div>
    </div>
  )
}
