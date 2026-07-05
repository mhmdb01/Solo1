// Generic quiz engine driven entirely by whatever sign objects are passed in —
// no sign content is known or hardcoded here.

function shuffle(list) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickDistractors(pool, exclude, n) {
  const candidates = shuffle(pool.filter((s) => s.id !== exclude.id))
  return candidates.slice(0, n)
}

export function buildQuiz(signs, { count = 10 } = {}) {
  if (signs.length < 4) return []
  const shuffledSubjects = shuffle(signs)
  const subjects = []
  while (subjects.length < count) {
    subjects.push(...shuffledSubjects)
  }
  return subjects.slice(0, count).map((subject) => {
    const type = Math.random() < 0.5 ? 'signToName' : 'nameToSign'
    const distractors = pickDistractors(signs, subject, 3)
    const choices = shuffle([subject, ...distractors])
    return { type, subject, choices, correctId: subject.id }
  })
}
