// src/components/ContactForm.jsx
import React, { useState } from "react";
import axios from "axios";

const ContactForm = ({ id = "contact" }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // success or error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      await axios.post("http://localhost:30025/api/contact", form);
      setStatus({ type: "success", message: "✅ Message sent successfully!" });
      setForm({ name: "", email: "", message: "" }); // clear form
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "❌ Failed to send message. Try again!" });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title text-center">Contact Me</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          {status && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
