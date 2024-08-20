// components/CreatePortfolio.js
import React from 'react';
import axios from 'axios';
import PortfolioForm from './PortfolioForm';
import ImageUpload from './ImageUpload';

const CreatePortfolio = () => {
  const createPortfolio = async (portfolioData) => {
    try {
      const res = await axios.post('/api/portfolios', portfolioData);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleImagesUploaded = (images) => {
    console.log(images); // Puedes manejar las imágenes subidas aquí
  };

  return (
    <div>
      <h1>Crear Portafolio</h1>
      <PortfolioForm onSubmit={createPortfolio} />
      <ImageUpload onImagesUploaded={handleImagesUploaded} />
    </div>
  );
};

export default CreatePortfolio;
