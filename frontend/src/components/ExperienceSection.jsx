// src/components/ExperienceSection.jsx
import React, { useEffect, useState } from "react";

const ExperienceSection = ({ id = "experience" }) => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExp, setSelectedExp] = useState(null); // For modal

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("http://localhost:30025/api/experiences");
        const data = await res.json();
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };
    fetchExperiences();
  }, []);

  const closeModal = () => setSelectedExp(null);

  return (
    <section id={id} className="experience-section">
      <div className="container text-center">
        <h2 className="section-title">My Experience</h2>

        <div className="experience-grid">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="experience-card"
                onClick={() => setSelectedExp(exp)}
              >
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.companyName}</p>
                <p className="experience-dates">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
              </div>
            ))
          ) : (
            <p>No experiences to display yet.</p>
          )}
        </div>

        {/* Modal / Popup */}
        {selectedExp && (
          <div className="experience-modal" onClick={closeModal}>
            <div
              className="experience-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="experience-modal-close"
                onClick={closeModal}
              >
                &times;
              </span>
              <h3>{selectedExp.role}</h3>
              <p>
                <strong>Company:</strong> {selectedExp.companyName}
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                {selectedExp.startDate} - {selectedExp.endDate || "Present"}
              </p>
              <p>
                <strong>Description:</strong> {selectedExp.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
