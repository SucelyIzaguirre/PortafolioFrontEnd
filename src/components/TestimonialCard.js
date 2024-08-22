import React from 'react';
import PhotoAvatar from "../assets/images/avatar.png";

const TestimonialCard = ({ message, clientName}) => {
    const MAX_CHARACTERS = 100; // Número máximo de caracteres permitidos

    const truncatedText = message.length > MAX_CHARACTERS 
      ? message.substring(0, MAX_CHARACTERS) + '...' 
      : message;

  return (
    <div className="testimonial-container">
      <div className="quote-icon top-quote">“</div>
      <p className="testimonial-text">{truncatedText}</p>
      <div className="author-info">
        <img 
          src={PhotoAvatar}
          alt="Profile" 
          className="author-image" 
        />
        <div className="author-details">
          <h3 className="author-name">{clientName}</h3>
          <p className="author-title">Comentario</p>
        </div>
      </div>
      <div className="quote-icon bottom-quote">”</div>
    </div>
  );
};

export default TestimonialCard;
