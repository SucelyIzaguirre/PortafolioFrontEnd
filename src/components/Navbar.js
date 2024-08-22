import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PhotoLogo from "../assets/images/behan.png";
import { BiLogOutCircle } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  // name.split(" ")[0]

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="contNav">
      <div className="contLogoName">
        <Link to="/principal">
          <img
            src={PhotoLogo}
            className="imgLogoNavBar"
            alt="No se encontro la imagen"
          />
        </Link>
        <h3>{name.split(" ")[0]}</h3>
      </div>
      <ul>
        <li>
          <Link to="/managePortfolio" className="link">
            Portafolio
          </Link>
        </li>
        <li>
          <Link to="/manageTestimonio" className="link">
            Testimonios
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="btnLogout">
          <BiLogOutCircle className="iconLogout" />
          Salir
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
