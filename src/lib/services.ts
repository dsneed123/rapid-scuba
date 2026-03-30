import type { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id: 'hull-cleaning',
    name: 'Hull Cleaning',
    description:
      'Full underwater hull cleaning to remove barnacles, algae, and marine growth. Improves fuel efficiency and vessel performance.',
    priceFrom: 350,
    unit: 'per vessel',
    icon: '🐚',
  },
  {
    id: 'underwater-welding',
    name: 'Underwater Welding',
    description:
      'Wet welding and hyperbaric welding for structural repairs, zinc installation, and emergency hull repairs — without dry-docking.',
    priceFrom: 800,
    unit: 'per job',
    icon: '⚡',
  },
  {
    id: 'propeller-polishing',
    name: 'Propeller Polishing',
    description:
      'Propeller inspection, cleaning, and polishing to restore efficiency and reduce cavitation.',
    priceFrom: 200,
    unit: 'per propeller',
    icon: '🔄',
  },
  {
    id: 'zinc-replacement',
    name: 'Zinc Anode Replacement',
    description:
      'Underwater replacement of sacrificial zinc anodes to protect your hull from electrolytic corrosion.',
    priceFrom: 150,
    unit: 'per set',
    icon: '🛡️',
  },
  {
    id: 'inspection',
    name: 'Underwater Inspection',
    description:
      'Full below-waterline inspection with video documentation. Ideal before purchase or as part of annual maintenance.',
    priceFrom: 250,
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
