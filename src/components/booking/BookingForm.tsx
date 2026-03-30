import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { SERVICES, VESSEL_TYPES } from '@/lib/services'
import type { BookingFormData } from '@/types'

type Props = {
  onSubmit: (data: BookingFormData) => void
  isSubmitting?: boolean
  isSuccess?: boolean
}

export function BookingForm({ onSubmit, isSubmitting = false, isSuccess = false }: Props) {
  const [searchParams] = useSearchParams()
  const defaultService = searchParams.get('service') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: { serviceId: defaultService },
  })

  if (isSuccess) {
    return (
      <div className="booking-success" role="status">
        <h2>✅ Booking Request Received!</h2>
        <p>
          We'll review your request and contact you within one business day to confirm your dive
          appointment.
        </p>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-section">
        <h3>Contact Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
              })}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <span className="form-error">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Service Details</h3>
        <div className="form-group">
          <label htmlFor="serviceId">Service Required *</label>
          <select
            id="serviceId"
            {...register('serviceId', { required: 'Please select a service' })}
            aria-invalid={!!errors.serviceId}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.serviceId && <span className="form-error">{errors.serviceId.message}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="vesselType">Vessel Type *</label>
            <select
              id="vesselType"
              {...register('vesselType', { required: 'Please select vessel type' })}
              aria-invalid={!!errors.vesselType}
            >
              <option value="">Select vessel type…</option>
              {VESSEL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.vesselType && <span className="form-error">{errors.vesselType.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="vesselLength">Vessel Length (ft) *</label>
            <input
              id="vesselLength"
              type="number"
              min={10}
              max={500}
              {...register('vesselLength', {
                required: 'Vessel length is required',
                min: { value: 10, message: 'Minimum 10 ft' },
                max: { value: 500, message: 'Maximum 500 ft' },
                valueAsNumber: true,
              })}
              aria-invalid={!!errors.vesselLength}
            />
            {errors.vesselLength && (
              <span className="form-error">{errors.vesselLength.message}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Marina / Location *</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Shilshole Bay Marina"
              {...register('location', { required: 'Location is required' })}
              aria-invalid={!!errors.location}
            />
            {errors.location && <span className="form-error">{errors.location.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="preferredDate">Preferred Date *</label>
            <input
              id="preferredDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('preferredDate', { required: 'Preferred date is required' })}
              aria-invalid={!!errors.preferredDate}
            />
            {errors.preferredDate && (
              <span className="form-error">{errors.preferredDate.message}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea id="notes" rows={4} {...register('notes')} />
        </div>
      </div>

      <button type="submit" className="btn btn--primary btn--lg" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Request Booking'}
      </button>
    </form>
  )
}
