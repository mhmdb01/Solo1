import { useParams } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import { SignIcon } from '../components/signs/registry.jsx'
import '../components/signs/signs.css'
import signs from '../data/signs.json'
import './Signs.css'

export default function SignDetail() {
  const { signId } = useParams()
  const sign = signs.find((s) => s.id === signId)

  if (!sign) {
    return (
      <PageShell title="الإشارة غير موجودة">
        <p>لم يتم العثور على هذه الإشارة.</p>
      </PageShell>
    )
  }

  return (
    <PageShell title="تفاصيل الإشارة">
      <div className="sign-detail">
        <SignIcon svg={sign.svg} className="sign-icon" />
        <h2>{sign.name_ar}</h2>
        <p className="sign-detail-fr">{sign.name_fr}</p>
        <div className="sign-detail-tags">
          {sign.tags.map((t) => (
            <span key={t} className="sign-detail-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
