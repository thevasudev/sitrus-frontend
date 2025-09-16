// src/components/FAQSection.jsx
import React, { useState } from "react";
import theme from "../theme/Theme";

export default function FAQSection({
  // kept for compatibility (unused now to avoid per-section bg)
  bgImage = null,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const faqItems = [
    {
      question: "What types of projects does Sitrus Projects offer?",
      answer:
        "Sitrus Projects specializes in plotted developments, premium layouts, and gated communities across Karnataka. We offer a variety of residential and commercial properties designed to meet different lifestyle needs and investment goals.",
    },
    {
      question: "Where are Sitrus Projects located?",
      answer:
        "Our projects are strategically located across Karnataka, with a focus on developing areas with good connectivity and growth potential. We have developments in and around Bengaluru, as well as other emerging cities in the state.",
    },
    {
      question: "What amenities are included in your communities?",
      answer:
        "Our communities feature a range of amenities including 24/7 security, landscaped gardens, children's play areas, water supply systems, paved roads, drainage systems, and sometimes clubhouses and sports facilities depending on the project.",
    },
    {
      question: "Are your projects approved and legally compliant?",
      answer:
        "Yes, all our projects come with transparent titles, approved layouts, and necessary legal clearances from the appropriate authorities. We ensure complete compliance with all regulatory requirements.",
    },
    {
      question: "Do you offer financing or home loan assistance?",
      answer:
        "Yes, we have tie-ups with leading banks and financial institutions to help our customers secure home loans with competitive interest rates. Our team provides complete assistance throughout the loan application process.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCallClick = () => {
    window.location.href = "tel:+919666102055";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@sitrusgroup.com";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919666102055", "_blank");
  };

  const styles = {
    container: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: theme.fonts.body,
      color: theme.colors.foreground,
      position: "relative",
      zIndex: 1,
    },
    heading: {
      fontFamily: theme.fonts.heading,
      fontSize: "3rem",
      lineHeight: 1,
      fontWeight: 700,
      color: theme.colors.cardForeground,
      marginBottom: 16,
      textAlign: "center",
    },
    subheading: {
      fontSize: "1.35rem",
      color: theme.colors.primaryForeground,
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 1.75,
    },
    divider: {
      height: 1,
      background: theme.colors.border,
      margin: "40px 0",
    },
    faqItem: {
      borderBottom: `1px solid ${theme.colors.border}`,
      padding: "20px 0",
      
    },
    faqQuestion: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "1.1rem",
      color: "#000",
      
    },
    faqAnswer: {
      paddingTop: 16,
      color: theme.colors.cardHover,
      lineHeight: 1.6,
    },
    icon: {
      width: 20,
      height: 20,
      transition: "transform 0.3s ease",
    },
    helpSection: {
      background: "rgba(255,255,255,0.92)",
      borderRadius: theme.radii.lg,
      padding: 30,
      marginTop: 40,
      textAlign: "center",
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.shadows.card,
      backdropFilter: "blur(4px)",
    },
    helpHeading: {
      fontFamily: theme.fonts.heading,
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: 20,
    },
    helpText: {
      marginBottom: 25,
      lineHeight: 1.6,
    },
    button: {
      background: theme.colors.primary,
      color: "white",
      border: "none",
      borderRadius: theme.radii.full,
      padding: "12px 24px",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  return (
    <section className="faq-wrap" aria-label="Frequently Asked Questions">
      <div style={styles.container}>
        <h1 style={styles.heading}>Frequently Asked Questions</h1>
        <p style={styles.subheading}>
          Get answers to the most common questions about buying, selling, and
          investing in real estate.
        </p>

        <div style={styles.divider} />

        {/* Accordion list (only this block changed) */}
<div className="acc-list">
  {faqItems.map((item, i) => {
    const open = activeIndex === i;
    return (
      <div key={i} className={`acc-item ${open ? "open" : ""}`}>
        <button
          className="acc-q"
          onClick={() => toggleFAQ(i)}
          aria-expanded={open}
          aria-controls={`acc-panel-${i}`}
          id={`acc-btn-${i}`}
        >
          <span className="acc-q__text">{item.question}</span>
          <svg
            className="acc-q__chev"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div
          id={`acc-panel-${i}`}
          role="region"
          aria-labelledby={`acc-btn-${i}`}
          className="acc-a"
          style={{ maxHeight: open ? "320px" : "0px" }}
        >
          <div className="acc-a__inner">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    );
  })}
</div>

        <div style={styles.helpSection}>
          <h3 style={styles.helpHeading}>Still have questions?</h3>
          <p style={styles.helpText}>
            We're here to help! Contact our team directly for personalized
            assistance.
          </p>
          <button className="faq-btn" style={styles.button} onClick={openModal}>
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close contact modal"
            >
              ×
            </button>

            <div className="contact-header">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2>Contact Us</h2>
              <p className="contact-subtitle">
                Get answers to all your questions
              </p>
            </div>

            <div className="contact-methods">
              <a href="tel:+919666102055" className="contact-method">
                <div className="method-icon phone">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="method-content">
                  <span className="method-label">Call us at</span>
                  <span className="method-value">+91 9666102055</span>
                </div>
                <div className="method-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a href="mailto:info@sitrusgroup.com" className="contact-method">
                <div className="method-icon email">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="method-content">
                  <span className="method-label">Email us at</span>
                  <span className="method-value">info@sitrusgroup.com</span>
                </div>
                <div className="method-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <div className="contact-method">
                <div className="method-icon whatsapp">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="method-content">
                  <span className="method-label">Message on WhatsApp</span>
                  <span className="method-value">+91 9666102055</span>
                </div>
                <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
                  Message
                </button>
              </div>
            </div>

            <div className="contact-footer">
              <p>Our team is available Monday to Saturday, 9 AM to 6 PM</p>
            </div>
          </div>
        </div>
      )}

      {/* Section chrome */}
      <style>{`
        .faq-wrap {
          position: relative;
          padding: clamp(24px, 4vw, 48px) 12px clamp(56px, 7vw, 84px);
          // background: #f9f9f9;
          isolation: isolate;
        }
        .faq-btn:hover {
          filter: brightness(0.96);
          transform: translateY(-1px);
          transition: transform 120ms ease, filter 120ms ease;
        }
        
        /* Contact Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .contact-modal {
          max-width: 480px;
          padding: 0;
          overflow: hidden;
        }

        .contact-header {
          background: ${theme.colors.primary};
          color: white;
          padding: 24px;
          text-align: center;
        }
          .modal-content {
  background: white;
  border-radius: 16px;
  // padding: 24px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  max-height: 90vh;
  overflow-y: auto;
}

        .contact-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-header h2 {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: 700;
        }

        .contact-subtitle {
          margin: 0;
          opacity: 0.9;
          font-size: 14px;
        }

        .contact-methods {
          padding: 20px;
        }

        .contact-method {
          display: flex;
          align-items: center;
          padding: 16px;
          margin-bottom: 12px;
          border: 1px solid ${theme.colors.border};
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .contact-method:hover {
          border-color: ${theme.colors.primary};
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .method-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .method-icon.phone {
          background: #e6f4ff;
          color: #0077cc;
        }

        .method-icon.email {
          background: #fce8e6;
          color: #d93025;
        }
          /* ===== Accordion (new) ===== */
.acc-list {
  display: grid;
  gap: 14px;
  margin-bottom: 28px;
}

.acc-item {
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.78));
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.08);
  overflow: hidden;
  transition: box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease;
  backdrop-filter: blur(6px);
}
.acc-item:hover {
  box-shadow: 0 14px 28px rgba(16,24,40,0.12);
  transform: translateY(-1px);
}
.acc-item.open { border-color: ${theme.colors.primary}; }

/* question row */
.acc-q {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 22px 22px;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
}
.acc-q:focus-visible {
  outline: 3px solid ${theme.colors.primary};
  outline-offset: 2px;
  border-radius: 12px;
}
.acc-q__text {
  font-weight: 600;
  font-size: 17px;
  color: #000;
}
.acc-q__chev {
  transition: transform 220ms ease, color 220ms ease;
  color: ${theme.colors.mutedForeground};
}
.acc-item.open .acc-q__chev {
  transform: rotate(180deg);
  color: ${theme.colors.primary};
}

/* answer area */
.acc-a {
  overflow: hidden;
  transition: max-height 260ms ease;
  will-change: max-height;
}
.acc-a__inner {
  padding: 0 22px 20px 22px;
  color: ${theme.colors.mutedForeground};
  line-height: 1.5rem;
  font-size: 1rem;
}


        .method-icon.whatsapp {
          background: #e6f7ee;
          color: #25d366;
        }

        .method-content {
          flex: 1;
        }

        .method-label {
          display: block;
          font-size: 12px;
          color: ${theme.colors.mutedForeground};
          margin-bottom: 4px;
        }

        .method-value {
          display: block;
          font-weight: 600;
          color: ${theme.colors.cardForeground};
        }

        .method-arrow {
          color: ${theme.colors.mutedForeground};
        }

        .whatsapp-btn {
          background: #25d366;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .whatsapp-btn:hover {
          background: #128c7e;
        }

        .contact-footer {
          padding: 16px 24px;
          text-align: center;
          border-top: 1px solid ${theme.colors.border};
          background: ${theme.colors.muted};
        }

        .contact-footer p {
          margin: 0;
          font-size: 14px;
          color: ${theme.colors.mutedForeground};
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
          color: #888;
          z-index: 10;
        }
      `}</style>
    </section>
  );
}
