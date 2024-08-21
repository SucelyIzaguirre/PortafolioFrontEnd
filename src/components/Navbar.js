import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // Eliminar el email guardado
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/principal">Inicio</Link></li>
        <li><Link to="/contentForm">Gestionar Contenido</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
