import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import TestimonialForm from "./components/TestimonialForm";
import ManageTestimonials from "./components/ManageTestimonials";
import ManagePortfolios from "./components/ManagePortfolios";

const AppContent = () => {
  const location = useLocation();

  // Definir las rutas donde NO se quiere mostrar el Navbar
  const noNavbarRoutes = [
    "/login",
    "/resetPassword",
    "/verifyCode",
    "/forgotPassword",
    "/register",
  ];

  return (
    <div>
      {/* Renderizar el Navbar solo si la ruta actual no está en noNavbarRoutes */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

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
        <Route
          path="/manageTestimonio"
          element={<PrivateRoute element={ManageTestimonials} />}
        />
        <Route
          path="/managePortfolio"
          element={<PrivateRoute element={ManagePortfolios} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/testimonioForm" element={<TestimonialForm />} />
        <Route path="/verifyCode" element={<VerifyCode length={4} />} />
        {/* <Route path="*" element={<NotFound />} /> Ruta para manejar 404 */}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />{" "}
      {/* Ahora AppContent está correctamente envuelto por el Router */}
    </Router>
  );
}

export default App;
