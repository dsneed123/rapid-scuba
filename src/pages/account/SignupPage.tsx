import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ApiError } from '@/lib/api'

type Form = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Form>()

  const onSubmit = async (data: Form) => {
    setSubmitError(null)
    try {
      await signup(data)
      navigate('/account')
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        for (const [field, message] of Object.entries(err.fieldErrors)) {
          setError(field as keyof Form, { message })
        }
      } else {
        setSubmitError('Signup failed. Try again.')
      }
    }
  }

  return (
    <section className="page-content">
      <div className="container" style={{ maxWidth: 480 }}>
        <h1>Create your account</h1>
        <p style={{ marginBottom: '1.5rem', color: 'var(--gray-600)' }}>
          Track the status of your bookings and inquiries. Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--brand)' }}>
            Log in
          </Link>
          .
        </p>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="contact-form__group">
            <label htmlFor="firstName">First name *</label>
            <input
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <span className="form-error">{errors.firstName.message}</span>
            )}
          </div>

          <div className="contact-form__group">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" {...register('lastName')} />
          </div>

          <div className="contact-form__group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email', { required: 'Email is required' })}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>

          <div className="contact-form__group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
              })}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>

          {submitError && (
            <div className="form-error-banner" role="alert">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>
    </section>
  )
}
