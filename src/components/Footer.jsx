// src/components/Footer.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../theme/Theme";

export default function Footer() {
  const phone = "+9196866102055";
  const email = "info@sitrusgroups.com";
  const address =
    "Vasavi Complex, 147, Seshadripuram Main Rd, Sripuram, Kumara Park West, Seshadripuram,\nBengaluru, Karnataka 560020, India";

  const year = new Date().getFullYear();

  // ---- make footer links work like header ----
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const go = (id) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // jump to home with hash; Index.jsx should scroll on mount
      navigate(`/#${id}`);
    } else {
      scrollToId(id);
    }
  };
  // ------------------------------------------------

  return (
    <footer className="sp-footer" role="contentinfo">
      <div className="sp-footer__inner">
        {/* Left: Brand + copy + contacts */}
        <div className="sp-footer__brand">
          <div className="brand">
            <div className="brand__badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 10.5 12 3l9 7.5" stroke="currentColor" strokeWidth="2" />
                <path d="M5 10v10h14V10" stroke="currentColor" strokeWidth="2" />
                <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="brand__name">Sitrus Projects</h3>
          </div>

          <p className="brand__copy">
            For over 15 years, Sitrus Projects has been shaping dream communities
            across Karnataka. We specialize in plotted developments, premium villas,
            and gated communities—offering buyers transparent titles, approved
            layouts, and on-time project delivery.
          </p>

          <ul className="contact">
            <li>
              <span className="contact__icon" aria-hidden="true">
                {/* phone */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.64-3.07A19.5 19.5 0 0 1 3.15 9.82 19.86 19.86 0 0 1 .08 1.18 2 2 0 0 1 2.06-.99h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.64 2.63a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.44-1.17a2 2 0 0 1 2.11-.45c.85.31 1.73.52 2.63.64a2 2 0 0 1 1.72 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <a href={`tel:${phone}`} className="contact__text">
                {phone}
              </a>
            </li>

            <li>
              <span className="contact__icon" aria-hidden="true">
                {/* mail */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <a href={`mailto:${email}`} className="contact__text">
                {email}
              </a>
            </li>

            <li className="contact__address">
              <span className="contact__icon" aria-hidden="true">
                {/* location */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-6.5 8-12a8 8 0 0 0-16 0c0 5.5 8 12 8 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <span className="contact__text">{address}</span>
            </li>
          </ul>
        </div>

        {/* Right: Quick links (behave like header) */}
        <div className="sp-footer__links">
          <h4 className="links__title">Quick Links</h4>
          <nav className="links__nav" aria-label="Quick links">
            <a href="/#properties" className="links__item" onClick={go("properties")}>
              Properties
            </a>
            <a href="/#about" className="links__item" onClick={go("about")}>
              About Us
            </a>
            <a href="/#contact" className="links__item" onClick={go("contact")}>
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sp-footer__bar" role="navigation" aria-label="Footer bar">
        <div className="bar__left">© {year} Sitrus Projects. All rights reserved.</div>

        <div className="bar__right">
          <span className="bar__follow">Follow us:</span>

          <a className="social" aria-label="Facebook" href="https://www.facebook.com/sitrusgroup/" target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.4.62-1.4 1.3V12h2.4l-.4 3h-2v7A10 10 0 0 0 22 12Z" />
            </svg>
          </a>

          <a className="social" aria-label="Instagram" href="https://www.instagram.com/sitrus_projects/" target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" />
            </svg>
          </a>

          <a className="social" aria-label="LinkedIn" href="https://www.linkedin.com/company/sitrus-projects/" target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8ZM8 8h3.8v2.05h.05c.53-1 1.83-2.05 3.76-2.05C19.6 8 22 10 22 13.9V23h-4v-7.2c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.86-2.77 3.8V23H8V8Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .sp-footer {
          background: ${theme.colors.primaryDark};
          color: ${theme.colors.primaryForeground};
          font-family: ${theme.fonts.body};
          padding: 44px 0 0;
        }
        .sp-footer__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 22px 28px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 28px;
        }
        @media (max-width: ${theme.breakpoints.tablet}) {
          .sp-footer__inner { grid-template-columns: 1fr; }
        }

        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .brand__badge {
          width: 36px; height: 36px; border-radius: ${theme.radii.md};
          background: ${theme.colors.accent}; color: ${theme.colors.accentForeground};
          display: grid; place-items: center; box-shadow: ${theme.shadows.accent};
        }
        .brand__name { margin: 0; font-family: ${theme.fonts.heading}; font-size: 1.4rem; font-weight: 700; letter-spacing: .2px; }
        .brand__copy { color: ${theme.colors.accentMuted}; max-width: 780px; line-height: 1.8; margin: 10px 0 18px; }

        .contact { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; color: ${theme.colors.card}; }
        .contact li { display: grid; grid-template-columns: 22px 1fr; align-items: start; gap: 10px; }
        .contact__icon { width: 22px; height: 22px; color: ${theme.colors.accent}; }
        .contact__text { white-space: pre-line; color: ${theme.colors.card}; text-decoration: none; }
        .contact a.contact__text:hover { text-decoration: underline; }

        .sp-footer__links { padding-top: 8px; }
        .links__title { font-family: ${theme.fonts.heading}; font-weight: 700; margin: 0 0 12px; }
        .links__nav { display: grid; gap: 12px; }
        .links__item {
          color: ${theme.colors.muted};
          text-decoration: none;
          padding: 6px 0;
          border-bottom: 1px solid transparent;
          transition: ${theme.transitions.smooth};
          cursor: pointer;
        }
        .links__item:hover {
          color: ${theme.colors.accent};
          border-bottom-color: ${theme.colors.accent};
        }

        .sp-footer__bar { border-top: 1px solid ${theme.colors.border}; padding: 14px 22px; margin-top: 8px; }
        .bar__left, .bar__right {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          color: ${theme.colors.muted};
        }
        @media (max-width: ${theme.breakpoints.tablet}) {
          .bar__left, .bar__right { flex-direction: column; gap: 14px; }
        }
        .bar__right { justify-content: flex-end; }
        .bar__follow { margin-right: 6px; }

        .social {
          width: 32px; height: 32px; display: grid; place-items: center;
          border-radius: ${theme.radii.full};
          background: ${theme.colors.secondary};
          color: ${theme.colors.secondaryForeground};
          border: 1px solid ${theme.colors.border};
          margin-left: 8px;
          transition: ${theme.transitions.smooth};
          text-decoration: none;
        }
        .social:hover { transform: translateY(-1px); }
      `}</style>
    </footer>
  );
}
