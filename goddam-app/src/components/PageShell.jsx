import { Link } from 'react-router-dom'
import './PageShell.css'

export default function PageShell({ title, children }) {
  return (
    <div className="page-shell">
      <header className="page-shell-header">
        <Link to="/" className="page-shell-back">
          الرئيسية ‹
        </Link>
        <h1>{title}</h1>
      </header>
      <main className="page-shell-body">{children}</main>
    </div>
  )
}
