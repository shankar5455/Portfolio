// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .custom-navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          z-index: 1000;
        }

        .custom-navbar.scrolled {
          background: rgba(255, 255, 255, 0.20);
          box-shadow: 0 2px 5px rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(6px);
        }
      `}</style>

      <nav className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a className="logo" href="/">Portfolio</a>

          <span
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
          >
            &#9776;
          </span>

          <ul className={`nav ${menuOpen ? "show" : ""}`}>
            <li className="item"><span className="link" onClick={() => scrollToSection("home")}>Home</span></li>
            <li className="item"><span className="link" onClick={() => scrollToSection("skills")}>Skills</span></li>
            <li className="item"><span className="link" onClick={() => scrollToSection("projects")}>Projects</span></li>
            {/* <li className="item"><span className="link" onClick={() => scrollToSection("experience")}>Experience</span></li> */}
            <li className="item"><span className="link" onClick={() => scrollToSection("certificates")}>Certificate</span></li>
            <li className="item"><span className="link" onClick={() => scrollToSection("blogs")}>Blogs</span></li>
            <li className="item"><span className="link" onClick={() => scrollToSection("contact")}>Contact</span></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
