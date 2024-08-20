// components/ManageTestimonials.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestimonialForm from './TestimonialForm';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('/api/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchTestimonials();
  }, []);

  const createTestimonial = async (testimonialData) => {
    try {
      const res = await axios.post('/api/testimonials', testimonialData);
      setTestimonials([...testimonials, res.data]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const updateTestimonial = async (id, testimonialData) => {
    try {
      const res = await axios.put(`/api/testimonials/${id}`, testimonialData);
      setTestimonials(testimonials.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`/api/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Gestionar Testimonios</h1>
      <TestimonialForm onSubmit={createTestimonial} />
      <ul>
        {testimonials.map(t => (
          <li key={t._id}>
            <p>{t.clientName}: {t.message}</p>
            <button onClick={() => updateTestimonial(t._id, t)}>Editar</button>
            <button onClick={() => deleteTestimonial(t._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTestimonials;
