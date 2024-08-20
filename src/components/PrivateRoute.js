import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente recibe un elemento y cualquier otra propiedad que se pueda pasar a un <Route />
const PrivateRoute = ({ element: Element }) => {
  // Verifica si el token de autenticación está en localStorage
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
