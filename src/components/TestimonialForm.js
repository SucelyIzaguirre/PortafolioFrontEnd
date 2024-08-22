// components/TestimonialForm.js
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import PhotoLogo from "../assets/images/behan.png";

const TestimonialForm = ({ onClose }) => {
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    if (error) {
      // Configura un temporizador para borrar el error después de 5 segundos
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }

    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        onClose(); // Cierra el modal después de mostrar el mensaje de éxito
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [error, success, onClose]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/createTestimonio",
        { clientName, message },
        {
          headers: {
            Authorization: `Bearer ${token}` // Enviar el token en el encabezado
          }
        }
      );

      if (res.data) {
        setSuccess(res.data.message);
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error al enviar el testimonio");
      } else {
        setError("Error en la conexión con el servidor");
      }
    }
  };

  return (
    <div className="contTestimonioView">
      <div className="contFormTestimonio">
        <div className="titleTestimonio">
          <img
            src={PhotoLogo}
            className="imgLogoTestimonio"
            alt="No se encontro la imagen"
          />
          <h2>Photographer Portfolio</h2>
        </div>
        <form onSubmit={onSubmit}>
          <h1>Comparte tu testimonio</h1>
          <div className="contInputTestimonioForm">
            <label>Tu Nombre:</label>
            <input
              type="text"
              name="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Tu Nombre"
              required
            />
          </div>
          <div className="contInputTestimonioForm">
            <label>Testimonio:</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mensaje"
              required
            />
          </div>
          <button type="submit" className="btnTestimonioSend">Compartir</button>
          {error && <p className="modalError">{error}</p>}
          {success && <p className="modalSuccess">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
