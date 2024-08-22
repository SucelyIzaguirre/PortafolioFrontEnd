// components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <span className="modalClose" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
