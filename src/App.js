import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
// import Navbar from './components/Navbar';
import Login from './components/Login';
import ContentForm from './components/ContentForm';
import Home from './components/Home';
import Register from './components/Register';
// import NotFound from './components/NotFound'; // Componente para manejar 404

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route 
          path="/contentForm" 
          element={<PrivateRoute element={ContentForm} />} 
        />
         <Route 
          path="/register" 
          element={<Register/>} 
        />
        {/* <Route path="*" element={<NotFound />} /> Ruta para manejar 404 */}
      </Routes>
    </Router>
  );
}

export default App;
