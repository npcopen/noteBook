import '../../styles/layout/header.css'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Notebook</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/notes">Notes</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header 