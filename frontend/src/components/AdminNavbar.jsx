// src/components/AdminNavbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Detect scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
      <nav className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Logo */}
          <Link className="logo" to="/admin/dashboard">
            Admin
          </Link>

          {/* Hamburger toggle */}
          <span
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
          >
            &#9776;
          </span>

          {/* Navigation links */}
          <ul className={`nav ${menuOpen ? "show" : ""}`}>
            <li className="item">
              <Link className="link" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/admin/skill">
                Skills
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/admin/project">
                Projects
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/admin/experience">
                Experience
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/admin/certificate">
                Certificates
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/admin/blog">
                Blogs
              </Link>
            </li>
            <li className="item">
              <span className="link" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
