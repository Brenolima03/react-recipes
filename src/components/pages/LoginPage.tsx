import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../hooks/Login';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles login form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="login" style={{ display: 'block', marginBottom: '5px' }}>Nome de usuário</label>
          <input
            type="text"
            id="login"
            name="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#0077cc', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
