import { Link } from 'react-router-dom'
import type { Service } from '@/types'

const SERVICE_ROUTES: Record<string, string> = {
  'hull-cleaning': '/hull-cleaning-seattle',
  'inspection': '/hull-inspection-seattle',
}

type Props = {
  service: Service
}

export function ServiceCard({ service }: Props) {
  return (
    <div className="card">
      <div className="card__icon">{service.icon}</div>
      <h3 className="card__title">{service.name}</h3>
      <p className="card__body">{service.description}</p>
      <div className="card__footer">
        <span className="card__price">
          From <strong>${service.priceFrom}</strong> {service.unit}
        </span>
        <Link to={SERVICE_ROUTES[service.id] || '/contact'} className="btn btn--secondary">
          Learn More
        </Link>
      </div>
    </div>
  )
}
