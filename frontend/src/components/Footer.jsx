// src/components/Footer.jsx
import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaSignInAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="custom-footer">
      <div className="custom-footer-container">
        {/* Copyright */}
        <p className="custom-footer-copy">
          © {new Date().getFullYear()} User. All rights reserved.
        </p>

        {/* Social & Login Icons */}
        <div className="custom-footer-icons">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

          {/* Login button */}
          <button
            className="custom-footer-login"
            onClick={() => navigate("/admin/login")}
            aria-label="Admin Login"
          >
            <FaSignInAlt />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-footer {
          background: #fff;
          border-top: 1px solid #a99cddff;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
          padding: 1.2rem 0;
          margin-top: 3rem;
        }

        .custom-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .custom-footer-copy {
          margin: 0;
          font-size: 0.95rem;
          color: #6c757d;
          font-weight: 500;
        }

        .custom-footer-icons {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .custom-footer-icons a,
        .custom-footer-login {
          color: #695aa6;
          background: #f1f3f9;
          padding: 0.6rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          border: none;
          cursor: pointer;
        }

        .custom-footer-icons a:hover,
        .custom-footer-login:hover {
          background: #695aa6;
          color: #fff;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 4px 12px rgba(105, 90, 166, 0.25);
        }

        @media (max-width: 768px) {
          .custom-footer-container {
            flex-direction: column;
            text-align: center;
          }

          .custom-footer-icons {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
