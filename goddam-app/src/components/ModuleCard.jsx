import { Link } from 'react-router-dom'

export default function ModuleCard({ to, title, subtitle, accent }) {
  return (
    <Link to={to} className="module-card" style={{ '--card-accent': accent }}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </Link>
  )
}
