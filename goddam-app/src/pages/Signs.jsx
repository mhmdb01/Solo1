import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import signs from '../data/signs.json'
import categories from '../data/signCategories.json'
import './Signs.css'

export default function Signs() {
  return (
    <PageShell title="الإشارات">
      <div className="sign-category-grid">
        {categories.map((cat) => {
          const count = signs.filter((s) => s.category === cat.id).length
          if (count === 0) return null
          return (
            <Link
              key={cat.id}
              to={`/signs/${cat.id}`}
              className="sign-category-card"
              style={{ '--card-accent': cat.accent }}
            >
              <h2>{cat.name_ar}</h2>
              <p>{cat.name_fr}</p>
              <span className="sign-category-count">{count} إشارة</span>
            </Link>
          )
        })}
      </div>
    </PageShell>
  )
}
