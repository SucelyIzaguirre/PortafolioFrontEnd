import React, { useEffect, useState } from "react";
import PrincipalIMG from "../assets/images/principal.png";
import Carousel from "./Carousel";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./modal";
import TestimonialForm from "./TestimonialForm";

const Principal = () => {
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleNavigatePorta = () => {
    navigate('/managePortfolio')
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contPrincipal">
      <div className="contPresentation">
        <h1>👋, Mi nombre es {name.split(" ")[0]} y soy fotografo</h1>
        <div className="titlePhotographer">
          <h2 className="webdesignertitle">Webdesigner</h2>
          <h2 className="phototitle">Photographer</h2>
        </div>
        <img
          src={PrincipalIMG}
          className="imgPrincipal"
          alt="No se encontro la imagen"
        />
        <div className="btnPrincipal">
          <button onClick={handleNavigatePorta} className="btnCreatePort">Crear Portafolio</button>
          <button onClick={handleOpenModal} className="btnCrearTesti">
            Crear Testimonio
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <TestimonialForm onClose={handleCloseModal} />
          </Modal>
        </div>
      </div>
      <div className="contTestimonios">
        <h2 className="titleTestimonio">Testimonios</h2>
        <Carousel />
      </div>
    </div>
  );
};

export default Principal;
