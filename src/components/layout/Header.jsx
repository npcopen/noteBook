import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/layout/header.css'

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Notebook</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/notes">笔记</a></li>
          {user && (
            <>
              <li className="user-info">
                <span>{user.username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  退出
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header 