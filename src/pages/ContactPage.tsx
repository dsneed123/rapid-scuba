import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { submitContactInquiry } from '@/lib/api'
import { useDocumentHead } from '@/hooks/useDocumentHead'

const PHONE = '206-240-2687'
const PHONE_HREF = 'tel:+12062402687'

const HOW_IT_WORKS = [
  {
    icon: '📞',
    title: 'Contact & Quote',
    body: 'Call 206-240-2687 or fill out the form below. We provide a free quote within 24 hours based on your vessel size and service needed.',
  },
  {
    icon: '📅',
    title: 'Schedule',
    body: 'Pick a day that works for you. We come directly to your marina slip — no haul-out, no travel on your part.',
  },
  {
    icon: '🤿',
    title: 'Dive & Service',
    body: 'ADCI-certified divers enter the water at your berth with underwater cameras documenting every step of the work.',
  },
  {
    icon: '📋',
    title: 'Report & Invoice',
    body: 'Receive a photo and video report of the completed work. You pay only after the job is done to your satisfaction.',
  },
]

const SERVICE_AREAS = [
  'Shilshole Bay Marina',
  'Lake Union',
  'Elliott Bay Marina',
  'Eastlake Marina',
  'Portage Bay',
  'Lake Washington',
  'Edmonds Marina',
  'Des Moines Marina',
  'Bainbridge Island',
  'Puget Sound — All Marinas',
]

type ContactFormData = {
  name: string
  email: string
  phone: string
  vesselLength: string
  service: string
  location: string
  message: string
}

export function ContactPage() {
  useDocumentHead({
    title: 'Contact RapidScuba — Free Quote for Seattle Hull Cleaning',
    description:
      'Request a free quote for hull cleaning, propeller polishing, or underwater inspection in Seattle. Call (206) 240-2687 or fill out the form. We respond within one business day.',
    canonical: 'https://rapidscuba.com/contact',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(false)
    try {
      await submitContactInquiry(data)
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__label">Get in Touch</span>
          <h1>Contact RapidScuba — Seattle Underwater Marine Services</h1>
          <p>
            Ready to schedule hull cleaning, prop polishing, zinc replacement, or underwater
            repair? Call us for a free quote or fill out the form below.
          </p>
          <div className="page-hero__actions">
            <a href={PHONE_HREF} className="btn btn--primary btn--lg">
              📞 Call {PHONE}
            </a>
            <a href="mailto:info@rapidscuba.com" className="hero__phone">
              info@rapidscuba.com
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <h2 className="section__title">How It Works</h2>
          <p className="section__subtitle">
            Simple, hassle-free service from first contact to final invoice.
          </p>
          <div className="how-it-works">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="how-it-works__step">
                <div className="how-it-works__icon">{step.icon}</div>
                <div className="how-it-works__num">Step {i + 1}</div>
                <h3 className="how-it-works__title">{step.title}</h3>
                <p className="how-it-works__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact grid: form + sidebar */}
      <section className="page-content">
        <div className="container contact-grid">
          {/* Booking form */}
          <div>
            <h2>Request a Free Quote</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--gray-600)' }}>
              Fill out the form and we'll get back to you within 24 hours. For urgent needs, call{' '}
              <a href={PHONE_HREF} style={{ color: 'var(--brand)' }}>
                {PHONE}
              </a>
              .
            </p>

            {submitted ? (
              <div className="booking-success" role="status">
                <h3>✅ Request Received</h3>
                <p>
                  Thanks — someone from our team will contact you shortly at the email
                  and phone number you provided.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="contact-form__group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Smith"
                    {...register('name', { required: 'Name is required' })}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                    })}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(206) 555-0123"
                    {...register('phone', { required: 'Phone number is required' })}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="vesselLength">Vessel Length *</label>
                  <select
                    id="vesselLength"
                    {...register('vesselLength', { required: 'Please select vessel length' })}
                    aria-invalid={!!errors.vesselLength}
                  >
                    <option value="">Select vessel length…</option>
                    <option value="under-30">Under 30 ft</option>
                    <option value="31-60">31–60 ft</option>
                    <option value="61-plus">61 ft+</option>
                  </select>
                  {errors.vesselLength && (
                    <span className="form-error">{errors.vesselLength.message}</span>
                  )}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="service">Service Needed *</label>
                  <select
                    id="service"
                    {...register('service', { required: 'Please select a service' })}
                    aria-invalid={!!errors.service}
                  >
                    <option value="">Select a service…</option>
                    <option value="hull-cleaning">Hull cleaning</option>
                    <option value="propeller-polishing">Propeller polishing</option>
                    <option value="inspection">Underwater inspection</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && <span className="form-error">{errors.service.message}</span>}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="location">Marina / Location *</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g. Shilshole Bay Marina, slip C-42"
                    {...register('location', { required: 'Marina or location is required' })}
                    aria-invalid={!!errors.location}
                  />
                  {errors.location && (
                    <span className="form-error">{errors.location.message}</span>
                  )}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your vessel, any known issues, or questions…"
                    {...register('message')}
                  />
                </div>

                {submitError && (
                  <div className="form-error-banner" role="alert">
                    Something went wrong. Please call{' '}
                    <a href={PHONE_HREF}>{PHONE}</a> or email{' '}
                    <a href="mailto:info@rapidscuba.com">info@rapidscuba.com</a>.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  disabled={isSubmitting}
                  style={{ marginTop: '4px' }}
                >
                  {isSubmitting ? 'Sending…' : 'Send Request'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Big phone CTA */}
            <div className="contact-phone-cta">
              <p className="contact-phone-cta__label">Call for Immediate Service</p>
              <a href={PHONE_HREF} className="contact-phone-cta__number">
                📞 {PHONE}
              </a>
              <p className="contact-phone-cta__sub">Free quote within 24 hours</p>
            </div>

            {/* Contact details */}
            <div className="info-box" style={{ marginBottom: '1.5rem' }}>
              <div className="contact-info">
                <div className="contact-info__item">
                  <span className="contact-info__icon">🕐</span>
                  <div>
                    <p className="contact-info__label">Hours</p>
                    <p className="contact-info__value">Friday to Sunday: 7am – 6pm</p>
                  </div>
                </div>
                <div className="contact-info__item">
                  <span className="contact-info__icon">📧</span>
                  <div>
                    <p className="contact-info__label">Email</p>
                    <a href="mailto:info@rapidscuba.com" className="contact-info__value">
                      info@rapidscuba.com
                    </a>
                  </div>
                </div>
                <div className="contact-info__item">
                  <span className="contact-info__icon">📍</span>
                  <div>
                    <p className="contact-info__label">Base</p>
                    <p className="contact-info__value">Seattle, WA</p>
                    <p style={{ fontSize: '14px', color: 'var(--gray-500)', margin: '2px 0 0' }}>
                      We come to your marina
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service areas */}
            <div className="info-box" style={{ marginBottom: '1.5rem' }}>
              <h3>Service Areas</h3>
              <ul
                style={{
                  marginTop: '0.75rem',
                  paddingLeft: '1.25rem',
                  color: 'var(--gray-700)',
                }}
              >
                {SERVICE_AREAS.map((area) => (
                  <li key={area} style={{ marginBottom: '4px', fontSize: '15px' }}>
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* In-water vs drydock */}
            <div className="info-box">
              <h3>Why In-Water Service?</h3>
              <p>
                A drydock haul for a 40-foot vessel costs $3,000–$6,000 before any work begins —
                yard fees, travel lift, power hook-up, and re-painting all add up. In-water
                service eliminates those costs entirely. Your vessel stays in its slip, the
                antifouling paint stays intact, and the work is done the same day.
              </p>
              <ul
                style={{
                  marginTop: '0.75rem',
                  paddingLeft: '1.25rem',
                  color: 'var(--gray-700)',
                }}
              >
                <li style={{ marginBottom: '4px' }}>No haul-out fees</li>
                <li style={{ marginBottom: '4px' }}>No yard storage charges</li>
                <li style={{ marginBottom: '4px' }}>Same-day service</li>
                <li style={{ marginBottom: '4px' }}>Antifouling paint preserved</li>
              </ul>
              <Link
                to="/pricing"
                className="btn btn--primary"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready to schedule?</h2>
          <p>
            Call{' '}
            <a href={PHONE_HREF} style={{ color: 'inherit', fontWeight: 600 }}>
              {PHONE}
            </a>{' '}
            or submit the form above. We respond within one business day.
          </p>
          <div className="cta__actions">
            <a href={PHONE_HREF} className="btn btn--white btn--lg">
              📞 {PHONE}
            </a>
            <a href="mailto:info@rapidscuba.com" className="cta__phone">
              info@rapidscuba.com
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
