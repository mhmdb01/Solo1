import PageShell from '../components/PageShell.jsx'
import scenarios from '../data/scenarios.json'

export default function Priority() {
  return (
    <PageShell title="لعبة الأولويات">
      <p>عدد المشاهد المتوفرة حالياً: {scenarios.length}</p>
      {scenarios.map((s) => (
        <p key={s.id}>{s.question_ar}</p>
      ))}
    </PageShell>
  )
}
