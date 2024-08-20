// components/Register.js
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState("");

  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", { name, username, email, password });
      console.log(res.data);

      if (res.data) {
        navigate("/login");
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
    <div>
      <h2>Registrate</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
