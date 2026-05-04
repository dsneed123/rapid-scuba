import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ApiError } from '@/lib/api'

type Form = { email: string; password: string }

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? '/account'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>()

  const onSubmit = async (data: Form) => {
    setSubmitError(null)
    try {
      await login(data)
      navigate(redirectTo)
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setSubmitError('Invalid email or password.')
      } else {
        setSubmitError('Login failed. Try again.')
      }
    }
  }

  return (
    <section className="page-content">
      <div className="container" style={{ maxWidth: 480 }}>
        <h1>Log in</h1>
        <p style={{ marginBottom: '1.5rem', color: 'var(--gray-600)' }}>
          New here?{' '}
          <Link to="/signup" style={{ color: 'var(--brand)' }}>
            Create an account
          </Link>
          .
        </p>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
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
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </section>
  )
}
