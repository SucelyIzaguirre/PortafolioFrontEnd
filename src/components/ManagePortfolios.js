import React, { useState, useEffect } from "react";
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

  // Crear o actualizar un portafolio
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projects", JSON.stringify(projects));

    projects.forEach((project, index) => {
      project.images.forEach((image) => {
        formData.append("file", image);
      });
    });

    try {
      if (editingPortfolio) {
        await axios.put(
          `/updatePortafolios/${editingPortfolio._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
    const files = [...e.target.files];
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

  // Eliminar un portafolio
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
      <div className="titleCreatePorta">
        <h1>Gestionar Portafolios</h1>
        <div>
          <button onClick={addProject} className="btnCrearTesti">
            <FaCirclePlus className="iconCrearTesti" />
            Añadir Proyecto
          </button>

          <button onClick={addProject} className="btnCrearTesti">
            {editingPortfolio ? "Actualizar Portafolio" : "Crear Portafolio"}
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
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
              <input
                type="file"
                multiple
                onChange={(e) => handleImageChange(e, index)}
                accept="image/*"
              />
              <div>
                {project.images.map((imgFile, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={URL.createObjectURL(imgFile)}
                    alt={`preview-${imgIndex}`}
                    style={{ width: "100px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addProject}>
          Añadir Proyecto
        </button>

        <button type="submit">
          {editingPortfolio ? "Actualizar Portafolio" : "Crear Portafolio"}
        </button>
      </form>

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
  );
};

export default ManagePortfolios;
