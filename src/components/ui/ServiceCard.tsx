import { Link } from 'react-router-dom'
import type { Service } from '@/types'

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
        <Link to={`/book?service=${service.id}`} className="btn btn--secondary">
          Book Now
        </Link>
      </div>
    </div>
  )
}
