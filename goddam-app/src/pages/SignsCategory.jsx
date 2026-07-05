import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import { SignIcon } from '../components/signs/registry.jsx'
import '../components/signs/signs.css'
import signs from '../data/signs.json'
import categories from '../data/signCategories.json'
import './Signs.css'

export default function SignsCategory() {
  const { category } = useParams()
  const cat = categories.find((c) => c.id === category)
  const list = signs.filter((s) => s.category === category)

  return (
    <PageShell title={cat ? cat.name_ar : category}>
      <Link to={`/signs/${category}/quiz`} className="sign-quiz-cta">
        ابدأ الاختبار ({Math.min(10, list.length)} أسئلة)
      </Link>
      <div className="sign-grid">
        {list.map((s) => (
          <Link key={s.id} to={`/signs/${category}/${s.id}`} className="sign-grid-item">
            <SignIcon svg={s.svg} className="sign-icon" />
            <span>{s.name_ar}</span>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}
