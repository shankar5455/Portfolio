// src/components/ProjectSection.jsx
import React, { useEffect, useState } from "react";

const ProjectSection = ({ id = "projects" }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // For modal

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8082/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const closeModal = () => setSelectedProject(null);

  return (
    <section id={id} className="projects-section">
      <div className="container text-center">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((proj) => (
              <div
                key={proj.id}
                className="project-card"
                onClick={() => setSelectedProject(proj)}
              >
                {proj.imageUrl && (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="project-image"
                  />
                )}
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-tech">{proj.techStack}</p>
              </div>
            ))
          ) : (
            <p>No projects to display yet.</p>
          )}
        </div>

        {/* Modal / Popup */}
        {selectedProject && (
          <div className="project-modal" onClick={closeModal}>
            <div
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="project-modal-close" onClick={closeModal}>
                &times;
              </span>
              {selectedProject.imageUrl && (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="project-modal-image"
                />
              )}
              <h3>{selectedProject.title}</h3>
              <p><strong>Tech Stack:</strong> {selectedProject.techStack}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {selectedProject.demoLink && (
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: "1rem" }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
