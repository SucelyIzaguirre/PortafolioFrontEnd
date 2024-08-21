import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import ContentForm from "./components/ContentForm";
import Home from "./components/Home";
import Register from "./components/Register";
import ForgotPassword from "./components/forgotPassword";
import VerifyCode from "./components/verifyCode";
import ResetPassword from "./components/resetPassword";
import Principal from "./components/Principal";
import Navbar from "./components/Navbar";
// import NotFound from './components/NotFound'; // Componente para manejar 404

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/principal"
          element={<PrivateRoute element={Principal} />}
        />
        <Route
          path="/contentForm"
          element={<PrivateRoute element={ContentForm} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/verifyCode" element={<VerifyCode length={4} />} />
        {/* <Route path="*" element={<NotFound />} /> Ruta para manejar 404 */}
      </Routes>
    </Router>
  );
}

export default App;
