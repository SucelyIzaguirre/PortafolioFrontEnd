// components/Register.js
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import PhotoRecuperar from "../assets/images/recuperar.png";
import PhotoLogo from "../assets/images/behan.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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
          navigate("/verifyCode"); // Redirige después de mostrar el mensaje de éxito
        }, 3000); // 3 segundos antes de redirigir
  
        return () => clearTimeout(timer);
      }
  }, [error, success, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/forgot-password", {
        email,
      });
      console.log(res.data);

      if (res.data) {
        localStorage.setItem("email", email);
        setSuccess(res.data.message);
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (err) {
      if (err.res && err.res.data) {
        setError(err.res.data.message || "Error al enviar el codigo de verificiacion");
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
        src={PhotoRecuperar}
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
          <h2>Restablecer Contrasenia</h2>
        </div>
        <form onSubmit={onSubmit}>
          <h2>Te enviaremos un correo con un codigo para que puedas restablecer tu contrasenia.</h2>
          <div className="contInputRegister">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="btnRestablecer">
            <button type="submit">Restablecer</button>
          </div>
        </form>
      </div>
      {error && <p className="modalError">{error}</p>}
      {success && <p className="modalSuccess">{success}</p>}
    </div>
  );
};

export default ForgotPassword;
