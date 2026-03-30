export type Service = {
  id: string
  name: string
  description: string
  priceFrom: number
  unit: string
  icon: string
}

export type BookingFormData = {
  name: string
  email: string
  phone: string
  serviceId: string
  vesselType: string
  vesselLength: number
  location: string
  preferredDate: string
  notes?: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export type Booking = BookingFormData & {
  id: string
  status: BookingStatus
  createdAt: string
}
