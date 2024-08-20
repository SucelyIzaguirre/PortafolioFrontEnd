// components/TestimonialForm.js
import React, { useState } from 'react';

const TestimonialForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    clientName: initialData.clientName || '',
    message: initialData.message || '',
  });

  const { clientName, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <input type="text" name="clientName" value={clientName} onChange={onChange} placeholder="Nombre del cliente" />
      <textarea name="message" value={message} onChange={onChange} placeholder="Mensaje" />
      <button type="submit">Guardar Testimonio</button>
    </form>
  );
};

export default TestimonialForm;
