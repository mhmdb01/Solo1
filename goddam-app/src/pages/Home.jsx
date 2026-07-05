import ModuleCard from '../components/ModuleCard.jsx'
import '../components/ModuleCard.css'
import './Home.css'

const modules = [
  {
    to: '/signs',
    title: 'الإشارات',
    subtitle: 'تعرّف على إشارات المرور واختبر نفسك',
    accent: 'var(--color-stop)',
  },
  {
    to: '/priority',
    title: 'لعبة الأولويات',
    subtitle: 'من يمر أولاً؟ درّب حسك في تقاطعات حقيقية',
    accent: 'var(--color-go)',
  },
  {
    to: '/lessons',
    title: 'الدروس',
    subtitle: 'التجاوز، الدوران، المسافات الآمنة',
    accent: 'var(--color-player-blue)',
  },
  {
    to: '/exam',
    title: 'وضع الامتحان',
    subtitle: 'محاكاة كاملة لامتحان رخصة السياقة',
    accent: 'var(--color-accent)',
  },
]

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>قدّام</h1>
        <p>تعلّم قانون المرور الجزائري بالطريقة التي يختبرك بها الامتحان</p>
      </header>
      <main className="home-modules">
        {modules.map((m) => (
          <ModuleCard key={m.to} {...m} />
        ))}
      </main>
    </div>
  )
}
