import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import { SignIcon } from '../components/signs/registry.jsx'
import '../components/signs/signs.css'
import { buildQuiz } from '../engine/signsQuiz.js'
import signs from '../data/signs.json'
import categories from '../data/signCategories.json'
import './SignsQuiz.css'

function useNewQuiz(categoryId) {
  const [seed, setSeed] = useState(0)
  const quiz = useMemo(() => {
    const pool = signs.filter((s) => s.category === categoryId)
    return buildQuiz(pool, { count: Math.min(10, pool.length) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, seed])
  const restart = () => setSeed((s) => s + 1)
  return [quiz, restart]
}

export default function SignsQuiz() {
  const { category } = useParams()
  const cat = categories.find((c) => c.id === category)
  const [quiz, restart] = useNewQuiz(category)

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState([])
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)

  if (quiz.length === 0) {
    return (
      <PageShell title="الاختبار">
        <p>لا توجد إشارات كافية لبدء اختبار في هذه الفئة بعد.</p>
      </PageShell>
    )
  }

  const question = quiz[index]
  const isLast = index === quiz.length - 1

  function handleAnswer(choiceId) {
    if (selected) return
    setSelected(choiceId)
    if (choiceId === question.correctId) {
      setScore((s) => s + 1)
    } else {
      setWrong((w) => [...w, question.subject])
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  function handleRestart() {
    restart()
    setIndex(0)
    setScore(0)
    setWrong([])
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <PageShell title="نتيجة الاختبار">
        <div className="quiz-result">
          <p className="quiz-score">
            {score} من {quiz.length}
          </p>
          <p>{cat ? cat.name_ar : category}</p>
          {wrong.length > 0 && (
            <div className="quiz-review">
              <h3>راجع أخطاءك</h3>
              <div className="sign-grid">
                {wrong.map((s, i) => (
                  <div key={s.id + i} className="sign-grid-item">
                    <SignIcon svg={s.svg} className="sign-icon" />
                    <span>{s.name_ar}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="quiz-restart-btn" onClick={handleRestart}>
            إعادة المحاولة
          </button>
          <Link to={`/signs/${category}`} className="quiz-back-link">
            رجوع إلى الإشارات
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title={`سؤال ${index + 1} من ${quiz.length}`}>
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${((index + 1) / quiz.length) * 100}%` }} />
      </div>

      {question.type === 'signToName' ? (
        <>
          <div className="quiz-prompt-sign">
            <SignIcon svg={question.subject.svg} className="sign-icon" />
          </div>
          <div className="quiz-choices">
            {question.choices.map((c) => (
              <button
                key={c.id}
                className={
                  'quiz-choice-text' +
                  (selected
                    ? c.id === question.correctId
                      ? ' correct'
                      : c.id === selected
                      ? ' incorrect'
                      : ''
                    : '')
                }
                onClick={() => handleAnswer(c.id)}
                disabled={!!selected}
              >
                {c.name_ar}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="quiz-prompt-text">{question.subject.name_ar}</p>
          <div className="quiz-choices quiz-choices-signs">
            {question.choices.map((c) => (
              <button
                key={c.id}
                className={
                  'quiz-choice-sign' +
                  (selected
                    ? c.id === question.correctId
                      ? ' correct'
                      : c.id === selected
                      ? ' incorrect'
                      : ''
                    : '')
                }
                onClick={() => handleAnswer(c.id)}
                disabled={!!selected}
              >
                <SignIcon svg={c.svg} className="sign-icon" />
              </button>
            ))}
          </div>
        </>
      )}

      {selected && (
        <button className="quiz-next-btn" onClick={handleNext}>
          {isLast ? 'إنهاء' : 'التالي'}
        </button>
      )}
    </PageShell>
  )
}
