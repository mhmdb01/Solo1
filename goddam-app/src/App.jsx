import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signs from './pages/Signs.jsx'
import Priority from './pages/Priority.jsx'
import Lessons from './pages/Lessons.jsx'
import Exam from './pages/Exam.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signs" element={<Signs />} />
        <Route path="/priority" element={<Priority />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </HashRouter>
  )
}
