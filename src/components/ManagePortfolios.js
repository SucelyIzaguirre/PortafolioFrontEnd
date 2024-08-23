import React, { useState, useEffect, useRef } from "react";
import axios from "../axiosConfig";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "./modal";

const ManagePortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([
    { title: "", description: "", images: [] },
  ]);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Obtener los portafolios del usuario
  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/portfolios/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPortfolios(response.data);
    } catch (err) {
      console.error("Error al obtener los portafolios", err);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Crear o actualizar un portafolio
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "projects",
      JSON.stringify(
        projects.map((p) => ({
          title: p.title,
          description: p.description,
        }))
      )
    ); // Evita enviar imágenes en esta parte

    // Agregar imágenes
    projects.forEach((project, index) => {
      project.images.forEach((image, i) => {
        formData.append(`images_${index}_${i}`, image); // Clave única para cada imagen
      });
    });

    try {
      if (editingPortfolio) {
        await axios.put(`/updatePortfolios/${editingPortfolio._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("/createPortfolio", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchPortfolios();
      resetForm();
    } catch (err) {
      console.error("Error al guardar el portafolio", err);
    }
  };

  const handleImageChange = (e, projectIndex) => {
    const files = Array.from(e.target.files);
    setProjects((prevProjects) =>
      prevProjects.map((project, index) =>
        index === projectIndex
          ? { ...project, images: [...project.images, ...files] }
          : project
      )
    );
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", images: [] }]);
  };

  const handleProjectChange = (index, field, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setProjects([{ title: "", description: "", images: [] }]);
    setEditingPortfolio(null);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/deletePortfolios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPortfolios();
    } catch (err) {
      console.error("Error al eliminar el portafolio", err);
    }
  };

  // Seleccionar un portafolio para editar
  const handleEdit = (portfolio) => {
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    setProjects(portfolio.projects);
    setEditingPortfolio(portfolio);
  };

  return (
    <div className="contGestionPortafolio">
      <h1>Gestionar Portafolios</h1>
      <div className="contDiviPortafolio">
        <form onSubmit={handleSubmit}>
          <div className="contCreatPortafolio">
            <div className="contInputPortafolio">
              <label>Título del Portafolio:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="contInputPortafolio">
              <label>Descripción del Portafolio:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="contProjectos">
            {projects.map((project, index) => (
              <div key={index} className="contGestionPortafolio">
                <h3>Proyecto {index + 1}</h3>
                <div className="contInputPortafolio">
                  <label>Título del Proyecto:</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      handleProjectChange(index, "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="contInputPortafolio">
                  <label>Descripción del Proyecto:</label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="contInputPortafolio">
                  <label>Imágenes del Proyecto:</label>
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="customFileButton"
                  >
                    Seleccionar Imágenes
                  </button>
                  <input
                    type="file"
                    multiple
                    className="hiddenInput"
                    ref={fileInputRef}
                    onChange={(e) => handleImageChange(e, index)}
                    accept="image/*"
                  />
                  <div className="imagePreviewContainer">
                    {project.images.map((imgFile, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={URL.createObjectURL(imgFile)}
                        alt={`preview-${imgIndex}`}
                        className="imagePreview"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="contButtonPortafolio">
              <button
                type="button"
                onClick={addProject}
                className="btnAddProject"
              >
                <FaCirclePlus className="iconAddProject" />
                Añadir Proyecto
              </button>

              <button type="submit" className="btnAddUpdatePorta">
                {editingPortfolio
                  ? "Actualizar Portafolio"
                  : "Crear Portafolio"}
              </button>
            </div>
          </div>
        </form>

        <div className="contDiviProject">
          <h2>Mis Portafolios</h2>
          <ul>
            {portfolios.map((portfolio) => (
              <li key={portfolio._id}>
                <h3>{portfolio.title}</h3>
                <p>{portfolio.description}</p>
                {portfolio.projects.map((project, projectIndex) => (
                  <div key={projectIndex}>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div>
                      {project.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`portfolio-img-${imgIndex}`}
                          style={{ width: "100px" }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  className="btnEditarPorta"
                  onClick={() => handleEdit(portfolio)}
                >
                  Editar
                </button>
                <button
                  className="btnDeletePorta"
                  onClick={() => handleDelete(portfolio._id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePortfolios;
