// components/ContentForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ContentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    type: initialData.type || 'blog',
    title: initialData.title || '',
    body: initialData.body || '',
    images: initialData.images || [],
  });
  const navigate = useNavigate();

  const { type, title, body } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <select name="type" value={type} onChange={onChange}>
        <option value="blog">Blog</option>
        <option value="gallery">Galería</option>
      </select>
      <input type="text" name="title" value={title} onChange={onChange} placeholder="Título" />
      {type === 'blog' && <textarea name="body" value={body} onChange={onChange} placeholder="Contenido" />}
      <button type="submit">Guardar Contenido</button>
    </form>
    </div>
  );
};

export default ContentForm;
