import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhotoLogin from "../assets/images/phot2.jpg";
import PhotoLogo from "../assets/images/behan.png";
import axios from "../axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    if (error) {
      // Configura un temporizador para borrar el error después de 10 segundos
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 5 segundos

      // Limpia el temporizador si el componente se desmonta antes de que se acabe el tiempo
      return () => clearTimeout(timer);
    }

    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
        navigate("/contentForm"); // Redirige después de mostrar el mensaje de éxito
      }, 3000); // 3 segundos antes de redirigir

      return () => clearTimeout(timer);
    }
    
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/contentForm");
    }

  }, [navigate, error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });

      if (response.data && response.data.token) {
        setSuccess(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error al iniciar sesión");
      } else {
        setError("Error en la conexión con el servidor");
      }
    }
  };

  return (
    <div className="contLogin">
      <img
        src={PhotoLogin}
        className="imgLogin"
        alt="No se encontro la imagen"
      />
      <div className="contFormLogin">
        <div className="titleLogin">
          <img
            src={PhotoLogo}
            className="imgLogo"
            alt="No se encontro la imagen"
          />
          <h2>Photographer Portfolio</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Acceso exclusivo para fotografos</h1>
          <div className="contInputLogin">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="contInputLogin">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="contInputLogin">
            <Link to="/forgotPassword" className="btnResetPass">
              Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="btnLoginRegister">
            <button type="submit">INICIAR SESION</button>
            <Link to="/register" className="bntRegister">
              REGISTRO
            </Link>
          </div>
        </form>
      </div>
      {error && <p className="modalError">{error}</p>}
      {success && <p className="modalSuccess">{success}</p>}
    </div>
  );
};

export default Login;
