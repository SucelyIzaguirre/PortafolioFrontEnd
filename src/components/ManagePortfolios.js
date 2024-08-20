import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Obtener los portafolios del usuario
  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/portfolios/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPortfolios(response.data);
    } catch (err) {
      console.error('Error al obtener los portafolios', err);
    }
  };

  // Crear o actualizar un portafolio
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      if (editingPortfolio) {
        // Actualizar portafolio existente
        await axios.put(`/api/portfolios/${editingPortfolio._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Crear nuevo portafolio
        await axios.post('/api/portfolios', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchPortfolios();
      resetForm();
    } catch (err) {
      console.error('Error al guardar el portafolio', err);
    }
  };

  // Eliminar un portafolio
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/portfolios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPortfolios();
    } catch (err) {
      console.error('Error al eliminar el portafolio', err);
    }
  };

  // Cargar un portafolio para editarlo
  const handleEdit = (portfolio) => {
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    setSelectedImages([]); // Resetear las imágenes seleccionadas
    setEditingPortfolio(portfolio);
  };

  // Resetear el formulario
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedImages([]);
    setEditingPortfolio(null);
  };

  // Manejar la selección de imágenes
  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  return (
    <div>
      <h1>Gestionar Portafolios</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imágenes:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit">
          {editingPortfolio ? 'Actualizar Portafolio' : 'Crear Portafolio'}
        </button>
      </form>

      <h2>Mis Portafolios</h2>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio._id}>
            <h3>{portfolio.title}</h3>
            <p>{portfolio.description}</p>
            <button onClick={() => handleEdit(portfolio)}>Editar</button>
            <button onClick={() => handleDelete(portfolio._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePortfolios;
