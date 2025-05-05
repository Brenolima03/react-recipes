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
    <div className="max-w-[500px] mx-auto p-5 relative bg-white rounded shadow-md">
      <button
        onClick={() => navigate('/')}
        className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center z-10"
      >
        ×
      </button>
      <h2 className="text-2xl font-semibold mb-4">Cadastro</h2>

      {error && (
        <div className="text-red-500 mb-3">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="login" className="block mb-1 font-medium">Login</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button 
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full py-2 mt-3 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
