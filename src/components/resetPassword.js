// components/Register.js
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import PhotoRegister from "../assets/images/phot3.png";
import PhotoLogo from "../assets/images/behan.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
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

    // Validar si las contraseñas coinciden en el frontend
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return; // Salir de la función si no coinciden
    }

    try {
      const res = await axios.post("/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      console.log(res.data);

      if (res.data) {
        setSuccess(res.data.message);
        localStorage.removeItem("email");
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
        <IoMdArrowRoundBack className="iconBack" /> Inicio de Sesion
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
          <h1>Recuperacion de Contrasenia</h1>
          <div className="contInputRegister">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              disabled
              required
            />
          </div>
          <div className="contInputRegister">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              required
            />
          </div>
          <div className="contInputRegister">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              required
            />
          </div>
          <div className="btnRegisterPrimary">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
      {error && <p className="modalError">{error}</p>}
      {success && <p className="modalSuccess">{success}</p>}
    </div>
  );
};

export default ResetPassword;
