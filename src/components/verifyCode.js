import React, { useEffect, useRef, useState } from "react";
import axios from "../axiosConfig";
import PhotoRecuperar from "../assets/images/recuperar.png";
import PhotoLogo from "../assets/images/behan.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const VerifyCode = ({ length = 4 }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));

    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }

    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        navigate("/resetPassword"); // Redirige después de mostrar el mensaje de éxito
      }, 3000); // 3 segundos antes de redirigir

      return () => clearTimeout(timer);
    }
  }, [error, success, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Acepta solo un dígito
    if (/^\d$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Mover el foco al siguiente input si es necesario
      if (index < length - 1 && value) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Mover el foco al input anterior si se presiona "Backspace"
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.split("").slice(0, length);

    // Llenar los campos con los dígitos pegados
    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Mover el foco al siguiente input después de pegar
    const nextIndex = digits.length < length ? digits.length : length - 1;
    inputsRef.current[nextIndex].focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const verification = parseInt(code.join(""), 10); // Combina el código en una sola cadena
    try {
      const res = await axios.post("/verify-code", {
        email: email,
        verificationCode: verification, // Usar el código combinado directamente
      });

      if (res.data) {
        setSuccess(res.data.message);
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (err) {
      console.error("Error completo:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message ||
            "Error al enviar el código de verificación"
        );
      } else {
        setError("Error en la conexión con el servidor");
      }
    }
  };

  return (
    <div className="contVerifyCode">
      <Link to="/login" className="btnBackLogin">
        <IoMdArrowRoundBack className="iconBack" /> Inicio de Sesión
      </Link>
      <img
        src={PhotoRecuperar}
        className="imgRegister"
        alt="No se encontró la imagen"
      />
      <div className="contFormVerifyCode">
        <div className="titleVerifyCode">
          <img
            src={PhotoLogo}
            className="imgLogo"
            alt="No se encontró la imagen"
          />
          <h2>Restablecer Contrasenia</h2>
        </div>
        <form onSubmit={onSubmit}>
          <h2>
            Se ha enviado un código de 4 dígitos a {email}, ingrésalo en los
            siguientes campos
          </h2>
          <div className="contInputPrimary">
            {code.map((value, index) => (
              <div className="contInputVerifyCode" key={index}>
                <input
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste} // Manejar el evento de pegado
                />
              </div>
            ))}
          </div>
          <div className="btnVerificar">
            <button type="submit">Verificar</button>
          </div>
        </form>
      </div>
      {error && <p className="modalError">{error}</p>}
      {success && <p className="modalSuccess">{success}</p>}
    </div>
  );
};

export default VerifyCode;
