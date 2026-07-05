import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signs from './pages/Signs.jsx'
import SignsCategory from './pages/SignsCategory.jsx'
import SignsQuiz from './pages/SignsQuiz.jsx'
import SignDetail from './pages/SignDetail.jsx'
import Priority from './pages/Priority.jsx'
import Lessons from './pages/Lessons.jsx'
import Exam from './pages/Exam.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signs" element={<Signs />} />
        <Route path="/signs/:category" element={<SignsCategory />} />
        <Route path="/signs/:category/quiz" element={<SignsQuiz />} />
        <Route path="/signs/:category/:signId" element={<SignDetail />} />
        <Route path="/priority" element={<Priority />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </HashRouter>
  )
}
