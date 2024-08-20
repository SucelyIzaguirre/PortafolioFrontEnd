// components/PortfolioForm.js
import React, { useState } from 'react';

const PortfolioForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projects: [{ title: '', description: '', images: [] }]
  });

  const { title, description, projects } = formData;

  const handleProjectChange = (index, e) => {
    const updatedProjects = projects.map((project, i) =>
      index === i ? { ...project, [e.target.name]: e.target.value } : project
    );
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...projects, { title: '', description: '', images: [] }]
    });
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <input type="text" name="title" value={title} onChange={onChange} placeholder="Título del portafolio" />
      <textarea name="description" value={description} onChange={onChange} placeholder="Descripción del portafolio" />
      
      {projects.map((project, index) => (
        <div key={index}>
          <input type="text" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} placeholder="Título del proyecto" />
          <textarea name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} placeholder="Descripción del proyecto" />
        </div>
      ))}

      <button type="button" onClick={addProject}>Agregar Proyecto</button>
      <button type="submit">Guardar Portafolio</button>
    </form>
  );
};

export default PortfolioForm;
