// src/components/SkillsSection.jsx
import React, { useEffect, useState, useRef } from "react";

const SkillsSection = ({ id = "skills" }) => {
  const [skills, setSkills] = useState([]);

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("http://localhost:8082/api/skills");
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  // TiltCard component
  const TiltCard = ({ children }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (card) card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };

    return (
      <div
        ref={cardRef}
        className="tilt-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    );
  };

  return (
    <section id={id} className="skills-section">
      <div className="container text-center">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <TiltCard key={skill.id}>
                {skill.imageUrl && (
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-icon"
                  />
                )}
                <h3 className="skill-name">{skill.name}</h3>
                <p className={`skill-level ${skill.level.toLowerCase()}`}>
                  {skill.level}
                </p>
              </TiltCard>
            ))
          ) : (
            <p>No skills to display yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
