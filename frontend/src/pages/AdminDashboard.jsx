// src/pages/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      {/* Hero / Header */}
      <header id="home" className="header">
        <div className="overlay"></div>
        <div className="header-content container">
          <h1 className="header-title">
            <span className="up">HI!</span>
            <span className="down">I am Admin</span>
          </h1>
          <p className="header-subtitle">FRONTEND WEB DESIGNER</p>
        </div>
      </header>

      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px; /* navbar offset */
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
