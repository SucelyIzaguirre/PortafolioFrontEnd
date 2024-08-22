import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import TestimonialCard from "./TestimonialCard"; // Importa tu componente TestimonialCard
import { MdError } from "react-icons/md";

const Carousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/getAllTestimonial");
        setTestimonials(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener testimonios:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="TitleNoTestimonio">
        <MdError className="iconError" />
        Cargando testimonios...
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="TitleNoTestimonio">
        <MdError className="iconError" />
        No hay testimonios disponibles.
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div
        className="carousel-content"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div className="carousel-item" key={index}>
            <TestimonialCard
              message={testimonial.message}
              clientName={testimonial.clientName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
