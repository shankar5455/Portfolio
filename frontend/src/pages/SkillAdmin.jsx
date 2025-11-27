// src/admin/SkillAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: "" });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch skills ❌");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "vvz5zgoz");
    data.append("cloud_name", "dgmk3fhuz");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dgmk3fhuz/image/upload",
      data
    );
    return res.data.secure_url;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setImageFile(file);
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const payload = { ...form, imageUrl };

      if (editingId) {
        await axios.put(`http://localhost:8082/api/skills/${editingId}`, payload);
        setMessage("✅ Skill updated successfully!");
      } else {
        await axios.post("http://localhost:8082/api/skills", payload);
        setMessage("✅ Skill added successfully!");
      }

      setForm({ name: "", level: "" });
      setImageFile(null);
      setPreviewUrl(null);
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      console.error(err);
      setError("Something went wrong ❌");
    }
  };

  // Edit skill
  const handleEdit = (skill) => {
    setForm({ name: skill.name, level: skill.level });
    setEditingId(skill.id);
    setPreviewUrl(skill.imageUrl || null);
    setImageFile(null);
  };

  // Delete skill
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`http://localhost:8082/api/skills/${id}`);
        setMessage("🗑️ Skill deleted successfully!");
        fetchSkills();
      } catch (err) {
        console.error(err);
        setError("Error deleting skill ❌");
      }
    }
  };

  return (
    <div className="admin-container" style={{ marginTop: "120px", padding: "20px" }}>
      <h2 className="text-center my-font mb-4 admin-title">⚙️ Manage Skills</h2>

      {/* Alerts */}
      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-danger">{error}</div>}

      {/* Add/Edit Skill Card */}
      <div className="admin-card admin-form-card">
        <div className="admin-card-header">
          {editingId ? "✏️ Update Skill" : "➕ Add New Skill"}
        </div>
        <div className="admin-card-body">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-row">
              <div className="admin-form-group">
                <input
                  type="text"
                  name="name"
                  className="admin-form-control"
                  placeholder="Skill Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="admin-form-group">
                {/* Skill Level Dropdown */}
                <select
                  name="level"
                  className="admin-form-control"
                  value={form.level}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-file-label">
                  <span>Choose Image</span>
                  <input
                    type="file"
                    name="imageFile"
                    className="admin-file-input"
                    accept="image/*"
                    onChange={handleChange}
                    required={!editingId}
                  />
                </label>
              </div>
              <div className="admin-preview-container">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="admin-image-preview"
                  />
                )}
              </div>
            </div>
            
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn admin-btn-primary">
                {editingId ? "Update Skill" : "Add Skill"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setForm({ name: "", level: "" });
                    setEditingId(null);
                    setPreviewUrl(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Skills Table */}
      <div className="admin-card admin-table-card">
        <div className="admin-card-header">📋 Skills List</div>
        <div className="admin-card-body">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <tr key={skill.id}>
                      <td>{skill.name}</td>
                      <td>
                        <span className={`admin-level-badge admin-level-${skill.level.toLowerCase()}`}>
                          {skill.level}
                        </span>
                      </td>
                      <td>
                        {skill.imageUrl && (
                          <img
                            src={skill.imageUrl}
                            alt={skill.name}
                            className="admin-table-image"
                          />
                        )}
                      </td>
                      <td>
                        <div className="admin-action-buttons">
                          <button
                            className="admin-btn admin-btn-sm admin-btn-edit"
                            onClick={() => handleEdit(skill)}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-btn admin-btn-sm admin-btn-delete"
                            onClick={() => handleDelete(skill.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="admin-table-empty">
                      No skills added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        .admin-container {
          max-width: 1200px;
          margin: 120px auto 40px;
          padding: 0 20px;
        }
        
        .admin-title {
          color: #695aa6;
          font-size: 2.2rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        /* Card Styles */
        .admin-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .admin-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .admin-card-header {
          background: #695aa6;
          color: white;
          padding: 1.2rem 1.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          font-family: 'Baloo Paaji', cursive;
        }
        
        .admin-card-body {
          padding: 1.5rem;
        }
        
        /* Form Styles */
        .admin-form-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .admin-form-group {
          flex: 1;
        }
        
        .admin-form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          font-family: "Open Sans", sans-serif;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .admin-form-control:focus {
          outline: none;
          border-color: #695aa6;
          box-shadow: 0 0 0 0.2rem rgba(105, 90, 166, 0.25);
        }
        
        .admin-file-label {
          display: block;
          padding: 0.75rem 1rem;
          border: 1px dashed #695aa6;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: background 0.3s;
          color: #695aa6;
          font-weight: 500;
        }
        
        .admin-file-label:hover {
          background: rgba(105, 90, 166, 0.05);
        }
        
        .admin-file-input {
          display: none;
        }
        
        .admin-preview-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .admin-image-preview {
          max-width: 80px;
          max-height: 80px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .admin-form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        /* Button Styles */
        .admin-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          font-family: "Open Sans", sans-serif;
        }
        
        .admin-btn-primary {
          background: #695aa6;
          color: white;
        }
        
        .admin-btn-primary:hover {
          background: #594c8d;
          transform: translateY(-2px);
        }
        
        .admin-btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .admin-btn-secondary:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }
        
        .admin-btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
        
        .admin-btn-edit {
          background: #17a2b8;
          color: white;
        }
        
        .admin-btn-edit:hover {
          background: #138496;
        }
        
        .admin-btn-delete {
          background: #dc3545;
          color: white;
        }
        
        .admin-btn-delete:hover {
          background: #c82333;
        }
        
        .admin-action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        /* Table Styles */
        .admin-table-container {
          overflow-x: auto;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .admin-table th {
          background: #f8f9fa;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #695aa6;
        }
        
        .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid #e9ecef;
          vertical-align: middle;
        }
        
        .admin-table tr:hover {
          background: #f8f9fa;
        }
        
        .admin-table-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #ddd;
        }
        
        .admin-level-badge {
          padding: 0.35rem 0.65rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .admin-level-beginner {
          background: #d4edda;
          color: #155724;
        }
        
        .admin-level-intermediate {
          background: #fff3cd;
          color: #856404;
        }
        
        .admin-level-expert {
          background: #f8d7da;
          color: #721c24;
        }
        
        .admin-table-empty {
          text-align: center;
          color: #6c757d;
          font-style: italic;
          padding: 2rem;
        }
        
        /* Alert Styles */
        .admin-alert {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        
        .admin-alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .admin-alert-danger {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .admin-form-row {
            flex-direction: column;
            gap: 1rem;
          }
          
          .admin-form-actions {
            flex-direction: column;
          }
          
          .admin-action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillAdmin;
