import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BASE } from '../../config';
import { login } from '../../hooks/Login';

function RegisterPage() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    role: 'USER'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles input changes
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${URL_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Registration failed');        
      }

      // Try to log in automatically after successful registration
      const success = await login(formData.login, formData.password);
      if (success) {
        navigate('/'); // Redirect after successful login
      } else {
        setError('Registered, but automatic login failed');
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Cadastro</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="login" style={{ display: 'block', marginBottom: '5px' }}>Nome de usuário</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
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
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Cadastrar
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ddd',
            color: '#333',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            marginTop: '10px'
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
