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
      fontSize: "2.5rem",
      fontWeight: 700,
      color: theme.colors.cardForeground,
      marginBottom: 16,
      textAlign: "center",
    },
    subheading: {
      fontSize: "1.1rem",
      color: theme.colors.primaryForeground,
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 1.6,
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
    // Modal
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: isModalOpen ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 20,
    },
    modalContent: {
      background: "white",
      borderRadius: theme.radii.lg,
      padding: 30,
      maxWidth: 500,
      width: "100%",
      boxShadow: theme.shadows.lg,
      position: "relative",
    },
    modalHeading: {
      fontFamily: theme.fonts.heading,
      fontSize: "1.8rem",
      fontWeight: 600,
      marginBottom: 20,
      color: theme.colors.primary,
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
    },
    contactIcon: {
      width: 20,
      height: 20,
      color: theme.colors.primary,
    },
    contactAction: {
      color: theme.colors.secondary,
      cursor: "pointer",
      fontWeight: 600,
      marginTop: 8,
      display: "inline-block",
    },
    modalButton: {
      background: theme.colors.primary,
      color: "white",
      border: "none",
      borderRadius: theme.radii.md,
      padding: "12px 20px",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      width: "30%",
      marginTop: 20,
      margin: "auto",
      display: "block",
    },
    closeButton: {
      position: "absolute",
      top: 15,
      right: 15,
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: theme.colors.mutedForeground,
    },
  };

  return (
    <section className="faq-wrap" aria-label="Frequently Asked Questions">
      {/* overlay removed to avoid double tints and seams */}

      <div style={styles.container}>
        <h1 style={styles.heading}>Frequently Asked Questions</h1>
        <p style={styles.subheading}>
          Get answers to the most common questions about buying, selling, and investing in real estate.
        </p>

        <div style={styles.divider} />

        <div>
          {faqItems.map((item, index) => (
            <div key={index} style={styles.faqItem}>
              <div style={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                <span>{item.question}</span>
                <svg
                  style={{
                    ...styles.icon,
                    transform: activeIndex === index ? "rotate(45deg)" : "rotate(0)",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              {activeIndex === index && (
                <div style={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.helpSection}>
          <h3 style={styles.helpHeading}>Still have questions?</h3>
          <p style={styles.helpText}>
            We're here to help! Contact our team directly for personalized assistance.
          </p>
          <button className="faq-btn" style={styles.button} onClick={openModal}>
            Call Us Now
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <div style={styles.modalOverlay} onClick={closeModal}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button style={styles.closeButton} onClick={closeModal}>×</button>

          <h2 style={styles.modalHeading}>Contact Us</h2>
          <p>Have questions about our properties or services? Contact us directly!</p>

          <div style={{ margin: "20px 0" }}>
            <div style={styles.contactItem}>
              <svg style={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
              <span>Call us at +91 9666102055</span>
            </div>

            <div style={styles.contactItem}>
              <svg style={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
              <span>Email us at info@sitrusgroups.com</span>
            </div>

            <p style={{ marginTop: 16, fontStyle: "italic" }}>
              Our team is available Monday to Saturday, 9 AM to 6 PM.
            </p>
          </div>

          <button style={styles.modalButton} onClick={handleCallClick}>
            Call us now
          </button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={styles.contactAction} onClick={handleEmailClick}>
              Or send us an email
            </span>
          </div>
        </div>
      </div>

      {/* Section chrome */}
      <style>{`
        .faq-wrap {
          position: relative;
          padding: clamp(24px, 4vw, 48px) 12px clamp(56px, 7vw, 84px);
          /* ⬇️ no per-section background so the page-wide bg shows through */
          background: transparent;
          isolation: isolate;
        }
        .faq-btn:hover {
          filter: brightness(0.96);
          transform: translateY(-1px);
          transition: transform 120ms ease, filter 120ms ease;
        }
      `}</style>
    </section>
  );
}
