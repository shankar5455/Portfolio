// src/components/BlogsSection.jsx
import React, { useEffect, useState } from "react";

const BlogsSection = ({ id = "blogs" }) => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:30025/api/blogs");
        const data = await res.json();
        setBlogs(data.filter(blog => blog.status === "PUBLISHED")); // only published
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id={id} className="blogs-section">
      <div className="container text-center">
        <h2 className="section-title">My Blogs</h2>
        <div className="blogs-grid">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                {blog.featuredImage && (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="blog-image"
                  />
                )}
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-summary">
                  {blog.content.length > 120
                    ? blog.content.substring(0, 120) + "..."
                    : blog.content}
                </p>
                <p className="blog-meta">
                  By {blog.author} | {new Date(blog.publishedDate).toLocaleDateString()}
                </p>
                <a href={`/blogs/${blog.slug}`} className="read-more-btn">
                  Read More
                </a>
              </div>
            ))
          ) : (
            <p>No blogs to display yet.</p>
          )}
        </div>
      </div>

      {/* CSS styling */}
      <style jsx>{`
        
      `}</style>
    </section>
  );
};

export default BlogsSection;
