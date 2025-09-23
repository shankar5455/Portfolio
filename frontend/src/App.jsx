// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./themify-icons/themify-icons.css";
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import "./style/main.css";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SkillAdmin from "./pages/SkillAdmin";
import CertificateAdmin from "./pages/CertificateAdmin";
import ExperienceAdmin from "./pages/ExperienceAdmin";
import BlogAdmin from "./pages/BlogAdmin";
import ProjectAdmin from "./pages/ProjectAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminNavbar from "./components/AdminNavbar";

// Wrapper to switch navbar based on route
function Layout({ children }) {
  const location = useLocation();

  // ✅ Show AdminNavbar only on /admin/* routes except login
  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skill"
            element={
              <ProtectedRoute>
                <SkillAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/certificate"
            element={
              <ProtectedRoute>
                <CertificateAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/experience"
            element={
              <ProtectedRoute>
                <ExperienceAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <BlogAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/project"
            element={
              <ProtectedRoute>
                <ProjectAdmin />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
