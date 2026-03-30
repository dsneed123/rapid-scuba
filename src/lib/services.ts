import type { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id: 'hull-cleaning',
    name: 'Hull Cleaning',
    description:
      'Professional underwater hull cleaning using hydraulic brushes and scrapers. Removes barnacles, algae, and marine growth while your vessel stays in the water. Puget Sound hulls need cleaning every 60–90 days. Improves fuel efficiency by 10–40%.',
    priceFrom: 150,
    unit: 'starting price',
    icon: '🐚',
  },
  {
    id: 'underwater-welding',
    name: 'Underwater Welding',
    description:
      'AWS D3.6-certified wet welding using shielded metal arc welding (SMAW). Crack repair, hole patching, corroded steel replacement, dock piling repair — all below the waterline without dry-docking. $300–$500/hr.',
    priceFrom: 300,
    unit: 'per hour',
    icon: '⚡',
  },
  {
    id: 'propeller-polishing',
    name: 'Propeller Cleaning & Polish',
    description:
      'Restore propeller efficiency by removing marine growth and pitting. Reduces vibration, improves fuel consumption, and extends prop life. Recommended every 90 days in Puget Sound.',
    priceFrom: 75,
    unit: 'per propeller',
    icon: '🔄',
  },
  {
    id: 'zinc-replacement',
    name: 'Zinc Anode Replacement',
    description:
      'Underwater replacement of sacrificial zinc anodes to prevent galvanic corrosion. Critical for aluminum and steel hulls in saltwater. $30–$80 labor per anode plus parts.',
    priceFrom: 30,
    unit: 'per anode + parts',
    icon: '🛡️',
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
  {
    id: 'emergency',
    name: 'Emergency Dive Services',
    description:
      'Diver in the water within 2 hours. 24/7 emergency response for sinking vessels, fouled propellers, lost objects, and urgent hull repairs. We respond day or night, any marina in Puget Sound.',
    priceFrom: 500,
    unit: 'emergency call',
    icon: '🚨',
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
