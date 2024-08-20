// components/CustomizePortfolio.js
import React, { useState } from 'react';

const CustomizePortfolio = ({ onCustomization }) => {
  const [customization, setCustomization] = useState({
    themeColor: '#000000',
    layoutStyle: 'grid'
  });

  const onChange = e => setCustomization({ ...customization, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Personalizar Portafolio</h2>
      <input type="color" name="themeColor" value={customization.themeColor} onChange={onChange} />
      <select name="layoutStyle" value={customization.layoutStyle} onChange={onChange}>
        <option value="grid">Grid</option>
        <option value="list">Lista</option>
      </select>
      <button onClick={() => onCustomization(customization)}>Guardar Personalización</button>
    </div>
  );
};

export default CustomizePortfolio;
