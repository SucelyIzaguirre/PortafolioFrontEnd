// components/ManageContent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentForm from './ContentForm';

const ManageContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await axios.get('/api/contents');
        setContents(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchContents();
  }, []);

  const createContent = async (contentData) => {
    try {
      const res = await axios.post('/api/contents', contentData);
      setContents([...contents, res.data]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const updateContent = async (id, contentData) => {
    try {
      const res = await axios.put(`/api/contents/${id}`, contentData);
      setContents(contents.map(c => c._id === id ? res.data : c));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteContent = async (id) => {
    try {
      await axios.delete(`/api/contents/${id}`);
      setContents(contents.filter(c => c._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Gestionar Contenido Dinámico</h1>
      <ContentForm onSubmit={createContent} />
      <ul>
        {contents.map(c => (
          <li key={c._id}>
            <p>{c.title} ({c.type})</p>
            <button onClick={() => updateContent(c._id, c)}>Editar</button>
            <button onClick={() => deleteContent(c._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageContent;
