// components/Register.js
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import PhotoRegister from "../assets/images/phot3.png";
import PhotoLogo from "../assets/images/behan.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
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
        navigate("/login"); // Redirige después de mostrar el mensaje de éxito
      }, 3000); // 3 segundos antes de redirigir

      return () => clearTimeout(timer);
    }
  }, [error, success, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", {
        name,
        username,
        email,
        password,
      });
      console.log(res.data);

      if (res.data) {
        setSuccess(res.data.message);
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (err) {
      if (err.res && err.res.data) {
        setError(err.res.data.message || "Error al iniciar sesión");
      } else {
        setError("Error en la conexión con el servidor");
      }
    }
  };

  return (
    <div className="contRegister">
      <Link to="/login" className="btnBackLogin">
        <IoMdArrowRoundBack className="iconBack"/> Inicio de Sesion
      </Link>
      <img
        src={PhotoRegister}
        className="imgRegister"
        alt="No se encontro la imagen"
      />
      <div className="contFormRegister">
        <div className="titleRegister">
          <img
            src={PhotoLogo}
            className="imgLogo"
            alt="No se encontro la imagen"
          />
          <h2>Photographer Portfolio</h2>
        </div>
        <form onSubmit={onSubmit}>
          <h1>Registrate</h1>
          <div className="contInputRegister">
            <label>Nombre y Apellido</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="contInputRegister">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="contInputRegister">
            <label>Correo Electronico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="contInputRegister">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="btnRegisterPrimary">
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div>
      {error && <p className="modalError">{error}</p>}
      {success && <p className="modalSuccess">{success}</p>}
    </div>
  );
};

export default Register;
