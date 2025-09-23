// src/components/CertificatesSection.jsx
import React, { useEffect, useState } from "react";

const CertificatesSection = ({ id = "certificates" }) => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null); // For modal

  // Fetch certificates from backend
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("http://localhost:8082/api/achievements");
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };
    fetchCertificates();
  }, []);

  // Close modal
  const closeModal = () => setSelectedCert(null);

  return (
    <section id={id} className="certificates-section">
      <div className="container text-center">
        <h2 className="section-title">My Certificates</h2>
        <div className="certificates-grid">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <div key={cert.id} className="certificate-card">
                {cert.certificatePhotoUrl && (
                  <img
                    src={cert.certificatePhotoUrl}
                    alt={cert.title}
                    className="certificate-icon"
                    onClick={() => setSelectedCert(cert)}
                  />
                )}
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-issuedBy">{cert.issuedBy}</p>
                <p className="certificate-date">{cert.issueDate}</p>
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-link"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No certificates to display yet.</p>
          )}
        </div>

        {/* Modal / Popup */}
        {selectedCert && (
          <div className="certificate-modal" onClick={closeModal}>
            <div className="certificate-modal-content" onClick={e => e.stopPropagation()}>
              <span className="certificate-modal-close" onClick={closeModal}>&times;</span>
              <img
                src={selectedCert.certificatePhotoUrl}
                alt={selectedCert.title}
                className="certificate-modal-image"
              />
              <h3>{selectedCert.title}</h3>
              <p>{selectedCert.issuedBy}</p>
              <p>{selectedCert.issueDate}</p>
              {selectedCert.certificateUrl && (
                <a
                  href={selectedCert.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Certificate
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`
        /* Modal background */
        .certificate-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }

        /* Modal content box */
        .certificate-modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          max-width: 90%;
          max-height: 90%;
          text-align: center;
          overflow-y: auto;
          position: relative;
        }

        /* Close button */
        .certificate-modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 2rem;
          cursor: pointer;
        }

        /* Fix image zoom (make it responsive) */
        .certificate-modal-image {
          max-width: 100%;
          max-height: 70vh; /* fit inside viewport */
          height: auto;
          border-radius: 8px;
          margin-bottom: 20px;
        }
      `}</style>
    </section>
  );
};

export default CertificatesSection;
