import PageShell from '../components/PageShell.jsx'
import signs from '../data/signs.json'

export default function Signs() {
  return (
    <PageShell title="الإشارات">
      <p>عدد الإشارات المتوفرة حالياً: {signs.length}</p>
      <ul>
        {signs.map((s) => (
          <li key={s.id}>
            {s.name_ar} — {s.name_fr}
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
