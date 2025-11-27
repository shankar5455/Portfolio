// src/pages/Homepage.jsx
import React from "react";
import SkillsSection from "../components/SkillsSection";
import CertificatesSection from "../components/CertificatesSection";
import ExperienceSection from "../components/ExperienceSection";
import BlogsSection from "../components/BlogsSection";
import ContactForm from "../components/ContactForm";
import ProjectSection from "../components/ProjectSection";

const Homepage = () => {
  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      {/* Hero / Header */}
      <header id="home" className="header">
        <div className="overlay"></div>
        <div className="header-content container">
          <h1 className="header-title">
            <span className="up">HI!</span>
            <span className="down">I am User</span>
          </h1>
          <p className="header-subtitle">FRONTEND WEB DESIGNER</p>
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <SkillsSection />
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <ProjectSection />
      </section>

      {/* Experience Section */}
      {/* <section id="experience" className="experience-section">
        <ExperienceSection />
      </section> */}

      {/* Certificates Section */}
      <section id="certificates" className="certificates-section">
        <CertificatesSection />
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="blogs-section">
        <BlogsSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <ContactForm />
      </section>

      {/* Inline CSS for sections */}
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px; /* navbar offset */
        }

        section {
          padding: 80px 20px;
        }

        /* Alternate background colors */
        .skills-section,
        .certificates-section,
        .contact-section {
          background: #ffffff;
        }

        .projects-section,
        .experience-section,
        .blogs-section {
          background: #f9f9f9;
        }

        .section-title {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 50px;
          color: #695aa6;
          font-weight: 600;
        }

        /* Grid containers centered */
        .skills-grid,
        .projects-grid,
        .experience-grid,
        .certificates-grid,
        .blogs-grid {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Homepage;
