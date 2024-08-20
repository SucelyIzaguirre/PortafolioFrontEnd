import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al usuario autenticado a la página de gestión de portafolios
      navigate('/contentForm');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        navigate('/contentForm');
      } else {
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al iniciar sesión');
      } else {
        setError('Error en la conexión con el servidor');
      }
    }
  };
  

  return (
    <div>
      <h2>Sig In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
     <Link to="/register">Registro de Usuarios</Link>
    </div>
  );
};

export default Login;
