import '../../styles/layout/header.css'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Notebook</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">首页</a></li>
          <li><a href="/notes">笔记</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header 