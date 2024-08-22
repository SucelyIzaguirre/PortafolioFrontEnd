// components/ManageTestimonials.js
import React, { useState, useEffect, useRef } from "react";
import axios from "../axiosConfig";
import { FaEllipsisV } from "react-icons/fa";
import Modal from "./modal";
import TestimonialForm from "./TestimonialForm";
import { FaCirclePlus } from "react-icons/fa6";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");
  const [editId, setEditId] = useState(null);
  const [editableName, setEditableName] = useState("");
  const [editableMessage, setEditableMessage] = useState("");
  const [dropdownId, setDropdownId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/getAllTestimonial");
        setTestimonials(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    setToken(localStorage.getItem("token"));

    const timerError =
      error &&
      setTimeout(() => {
        setError("");
      }, 5000);

    const timerSuccess =
      success &&
      setTimeout(() => {
        setSuccess("");
        fetchTestimonials();
      }, 3000);

    fetchTestimonials();

    // Handle clicks outside of the table to cancel editing
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setEditId(null);
        setDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timerError);
      clearTimeout(timerSuccess);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [error, success]);

  const handleEditClick = (id, clientName, message) => {
    setEditId(id);
    setEditableName(clientName);
    setEditableMessage(message);
  };

  const handleSaveClick = async () => {
    try {
      const res = await axios.put(
        `/updateTestimonio/${editId}`,
        {
          clientName: editableName,
          message: editableMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTestimonials(
        testimonials.map((t) => (t._id === editId ? res.data : t))
      );
      setEditId(null);
      setSuccess("Testimonio actualizado con éxito.");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Error al actualizar el testimonio"
        );
      } else {
        setError("Error en la conexión con el servidor");
      }
    }
  };

  const handleCancelClick = () => {
    setEditId(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`/deleteTestimonio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setSuccess(res.data.message);
        setTestimonials(testimonials.filter((t) => t._id !== id));
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Error al eliminar el testimonio"
        );
      } else {
        setError("Error en la conexión con el servidor");
      }
    }
  };

  const handleDropdownToggle = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contGestionarTesti">
      <div className="titleCreateTesti">
        <h1>Gestionar Testimonios</h1>
        <button onClick={handleOpenModal} className="btnCrearTesti">
        <FaCirclePlus className="iconCrearTesti" />
          Crear Testimonio
        </button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TestimonialForm onClose={handleCloseModal} />
        </Modal>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th className="th1">Nombre</th>
            <th>Mensaje</th>
            <th className="th2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t._id} className="th1">
              <td>
                {editId === t._id ? (
                  <input
                    type="text"
                    className="inputEditTestimonio"
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                  />
                ) : (
                  t.clientName
                )}
              </td>
              <td>
                {editId === t._id ? (
                  <textarea
                    value={editableMessage}
                    className="inputEditTestimonio"
                    onChange={(e) => setEditableMessage(e.target.value)}
                    rows="4" // Ajusta el tamaño fijo
                    cols="30"
                  />
                ) : (
                  t.message
                )}
              </td>
              <td>
                <div className="dropdown">
                  <button onClick={() => handleDropdownToggle(t._id)}>
                    <FaEllipsisV className="iconDropdown"/>
                  </button>
                  {dropdownId === t._id && (
                    <div className="dropdown-menu">
                      {editId === t._id ? (
                        <>
                          <button onClick={handleSaveClick}>Guardar</button>
                          <button onClick={handleCancelClick}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleEditClick(t._id, t.clientName, t.message)
                            }
                          >
                            Editar
                          </button>
                          <button onClick={() => handleDeleteClick(t._id)}>
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="modalError">{error}</p>}
      {success && <p className="modalSuccess">{success}</p>}
    </div>
  );
};

export default ManageTestimonials;
