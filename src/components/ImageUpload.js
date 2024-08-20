// components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onImagesUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onChange = e => {
    setSelectedFiles([...e.target.files]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const res = await axios.post('/api/portfolios/upload', formData);
      onImagesUploaded(res.data.fileLocations);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" multiple onChange={onChange} />
      <button type="submit">Subir Imágenes</button>
    </form>
  );
};

export default ImageUpload;
