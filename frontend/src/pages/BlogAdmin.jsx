// src/admin/BlogAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    category: "",
    slug: "",
    status: "PUBLISHED",
    publishedDate: "", // optional override
    lastUpdated: "",
    featuredImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:30025/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs ❌");
    }
  };

  useEffect(() => {
    fetchBlogs();
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
      if (file) setPreviewUrl(URL.createObjectURL(file));
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
      let featuredImage = form.featuredImage;
      if (imageFile) {
        featuredImage = await uploadImageToCloudinary(imageFile);
      }

      // Auto-generate slug if empty
      let slug = form.slug;
      if (!slug && form.title) {
        slug = form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      const payload = {
        ...form,
        featuredImage,
        slug,
        lastUpdated: new Date().toISOString(),
        publishedDate: editingId ? form.publishedDate : new Date().toISOString(),
      };

      if (editingId) {
        await axios.put(`http://localhost:30025/api/blogs/${editingId}`, payload);
        setMessage("✅ Blog updated successfully!");
      } else {
        await axios.post("http://localhost:30025/api/blogs", payload);
        setMessage("✅ Blog added successfully!");
      }

      setForm({
        title: "",
        content: "",
        author: "",
        tags: "",
        category: "",
        slug: "",
        status: "PUBLISHED",
        publishedDate: "",
        lastUpdated: "",
        featuredImage: "",
      });
      setImageFile(null);
      setPreviewUrl(null);
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setError("Something went wrong ❌");
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      tags: blog.tags,
      category: blog.category,
      slug: blog.slug,
      status: blog.status,
      publishedDate: blog.publishedDate,
      lastUpdated: blog.lastUpdated,
      featuredImage: blog.featuredImage,
    });
    setPreviewUrl(blog.featuredImage || null);
    setEditingId(blog.id);
    setImageFile(null);
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:30025/api/blogs/${id}`);
        setMessage("🗑️ Blog deleted successfully!");
        fetchBlogs();
      } catch (err) {
        console.error(err);
        setError("Error deleting blog ❌");
      }
    }
  };

  return (
    <div className="admin-container" style={{ marginTop: "120px", padding: "20px" }}>
      <h2 className="text-center my-font mb-4 admin-title">📝 Manage Blogs</h2>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-danger">{error}</div>}

      <div className="admin-card admin-form-card">
        <div className="admin-card-header">
          {editingId ? "✏️ Update Blog" : "➕ Add New Blog"}
        </div>
        <div className="admin-card-body">
          <form onSubmit={handleSubmit} className="admin-form">
            {/* Title & Author */}
            <div className="admin-form-row">
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category & Tags */}
            <div className="admin-form-row">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={handleChange}
              />
            </div>

            {/* Content */}
            <div className="admin-form-row">
              <textarea
                name="content"
                placeholder="Blog Content"
                rows={6}
                value={form.content}
                onChange={handleChange}
                required
              />
            </div>

            {/* Slug */}
            <div className="admin-form-row">
              <input
                type="text"
                name="slug"
                placeholder="Slug (optional, auto-generated)"
                value={form.slug}
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div className="admin-form-row">
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            {/* Featured Image */}
            <div className="admin-form-row">
              <label>
                <span>Choose Featured Image</span>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleChange}
                  required={!editingId}
                />
              </label>
              {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: 80, height: 80 }} />}
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button type="submit">{editingId ? "Update Blog" : "Add Blog"}</button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      title: "",
                      content: "",
                      author: "",
                      tags: "",
                      category: "",
                      slug: "",
                      status: "PUBLISHED",
                      publishedDate: "",
                      lastUpdated: "",
                      featuredImage: "",
                    });
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

      {/* Blogs Table */}
      <div className="admin-card admin-table-card">
        <div className="admin-card-header">📋 Blogs List</div>
        <div className="admin-card-body">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Image</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>{blog.category}</td>
                    <td>{blog.tags}</td>
                    <td>
                      {blog.featuredImage && (
                        <img src={blog.featuredImage} alt={blog.title} style={{ width: 50, height: 50 }} />
                      )}
                    </td>
                    <td>{blog.status}</td>
                    <td>
                      <button onClick={() => handleEdit(blog)}>Edit</button>
                      <button onClick={() => handleDelete(blog.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No blogs added yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .admin-container {
  max-width: 1200px;
  margin: 120px auto 40px;
  padding: 0 20px;
  font-family: "Open Sans", sans-serif;
  color: #333;
}

/* Title */
.admin-title {
  color: #695aa6;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}

/* Card */
.admin-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 2.2rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.admin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.admin-card-header {
  background: linear-gradient(135deg, #695aa6, #8a7fd6);
  color: white;
  padding: 1.3rem 1.6rem;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.admin-card-body {
  padding: 1.5rem;
}

/* Form */
.admin-form-row {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.admin-form-row input,
.admin-form-row textarea,
.admin-form-row select {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.admin-form-row input:focus,
.admin-form-row textarea:focus,
.admin-form-row select:focus {
  border-color: #695aa6;
  box-shadow: 0 0 0 0.18rem rgba(105, 90, 166, 0.25);
  outline: none;
}

/* File upload */
.admin-form-row label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  font-weight: 500;
  color: #695aa6;
  cursor: pointer;
}

.admin-form-row input[type="file"] {
  border: none;
  padding: 0;
}

.admin-form-row img {
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

/* Actions */
.admin-form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-form-actions button {
  padding: 0.75rem 1.6rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.admin-form-actions button:first-child {
  background: #695aa6;
  color: #fff;
}

.admin-form-actions button:first-child:hover {
  background: #594c8d;
  transform: translateY(-2px);
}

.admin-form-actions button:last-child {
  background: #e9ecef;
  color: #495057;
}

.admin-form-actions button:last-child:hover {
  background: #d6d8db;
  transform: translateY(-2px);
}

/* Table */
.admin-card-body table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.admin-card-body th,
.admin-card-body td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.admin-card-body th {
  background: #f8f9fa;
  font-weight: 600;
  color: #444;
}

.admin-card-body tr:nth-child(even) {
  background: #fafafa;
}

.admin-card-body tr:hover {
  background: #f1f3f9;
}

/* Buttons inside table */
.admin-card-body button {
  padding: 0.45rem 0.9rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 6px;
}

.admin-card-body button:first-child {
  background: #17a2b8;
  color: #fff;
}

.admin-card-body button:first-child:hover {
  background: #138496;
}

.admin-card-body button:last-child {
  background: #dc3545;
  color: #fff;
}

.admin-card-body button:last-child:hover {
  background: #c82333;
}

/* Alerts */
.admin-alert {
  padding: 1rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
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

/* Responsive */
@media (max-width: 768px) {
  .admin-form-row {
    flex-direction: column;
  }

  .admin-form-actions {
    flex-direction: column;
  }

  .admin-card-body table,
  .admin-card-body thead,
  .admin-card-body tbody,
  .admin-card-body th,
  .admin-card-body td,
  .admin-card-body tr {
    display: block;
    width: 100%;
  }

  .admin-card-body tr {
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
    padding-bottom: 0.8rem;
  }

  .admin-card-body td {
    padding: 0.5rem;
    text-align: right;
    position: relative;
  }

  .admin-card-body td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    font-weight: 600;
    color: #555;
  }
}

      `}</style>
    </div>
  );
};

export default BlogAdmin;