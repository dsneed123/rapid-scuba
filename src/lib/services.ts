import type { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id: 'hull-cleaning',
    name: 'Hull & Propeller Cleaning',
    description:
      'Professional underwater hull cleaning and propeller polishing using hydraulic brushes and scrapers. Removes barnacles, algae, and marine growth while your vessel stays in the water. Restores fuel efficiency and reduces vibration.',
    priceFrom: 500,
    unit: 'small boat package',
    icon: '🐚',
  },
  {
    id: 'inspection',
    name: 'Underwater Inspection',
    description:
      'Comprehensive below-waterline inspection with HD underwater video and detailed report. For insurance compliance, pre-purchase surveys, and annual maintenance. Photos delivered same day.',
    priceFrom: 200,
    unit: 'per inspection',
    icon: '🔍',
  },
]

export const VESSEL_TYPES = [
  'Sailboat',
  'Motor Yacht',
  'Commercial Vessel',
  'Fishing Boat',
  'Tugboat',
  'Barge',
  'Ferry',
  'Other',
]
