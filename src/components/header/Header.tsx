import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { logout } from '../../hooks/Login';
import './Header.css';

export function Header() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  const checkUserIsLoggedIn = () => {
    return localStorage.getItem("authToken");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1>Receitas</h1>
      </Link>
      
      <div className="header-controls">
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '🌙' : '☀️'}
        </button>

        {checkUserIsLoggedIn() ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div className="auth-buttons">
            <Link to="/register">
              <button>Cadastro</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
