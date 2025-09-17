// src/components/SiteHeader.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../theme/Theme";
import Logo from "../assets/logonone.png";

export default function SiteHeader({ brand = "Sitrus projects" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") navigate(`/#${id}`);
    else scrollToId(id);
  };

  const linkStyle = {
    position: "relative",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 16,
    color: theme.colors.mutedForeground,
    padding: "8px 2px",
    transition: theme.transitions.smooth,
  };

  const ScrollLink = ({ id, children }) => (
    <a href={`/#${id}`} onClick={go(id)} className="sh__link" style={linkStyle}>
      <span className="sh__linkWrap">
        {children}
        <span className="sh__underline" />
      </span>
    </a>
  );

  return (
    <header className="sh__wrap">
      <div className="sh__bar">
        <div className="sh__brandWrap">
          <div className="sh__logoBox">
            <img src={Logo} alt="Sitrus Projects logo" className="sh__logo" />
          </div>
          <div className="sh__brandText">{brand}</div>
        </div>

        {/* Desktop nav */}
        {/* <nav className="sh__nav">
          <ScrollLink id="home">Home</ScrollLink>
          <ScrollLink id="properties">Properties</ScrollLink>
          <ScrollLink id="about">About us</ScrollLink>
          <ScrollLink id="contact">Contact</ScrollLink>
        </nav> */}

        {/* Mobile hamburger (plain 3 lines) */}
        {/* <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="sh__menuBtn"
          onClick={() => setOpen((s) => !s)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button> */}
      </div>

      {/* Mobile drawer */}
      {/* <div className="sh__drawer" style={{ display: open ? "block" : "none" }}>
        <div className="sh__drawerInner">
          <ScrollLink id="home">Home</ScrollLink>
          <ScrollLink id="properties">Properties</ScrollLink>
          <ScrollLink id="about">About us</ScrollLink>
          <ScrollLink id="contact">Contact</ScrollLink>
        </div>
      </div> */}

      <style>{`
        .sh__wrap {
          position: sticky; top: 0; z-index: 50;
          background: ${theme.colors.card};
          color: ${theme.colors.cardForeground};
          border-bottom: 1px solid ${theme.colors.border};
          box-shadow: ${theme.shadows.card};
        }
        .sh__bar {
          max-width: 1280px; margin: 0 auto;
           padding: 10px 18px;
          display: flex; align-items: center; gap: 16px;
          height: 80px;
        }
        .sh__brandWrap { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1 1 auto; }
        .sh__logoBox {
          width: 170px; height: 100px; border-radius: ${theme.radii.md};
          overflow: hidden; background: ${theme.colors.muted};
          display: grid; place-items: center; box-shadow: ${theme.shadows.sm};
        }
        .sh__logo { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sh__brandText {
          font-family: ${theme.fonts.heading}; font-weight: 700; font-size: 26px;
          color: ${theme.colors.foreground}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .sh__nav { display: flex; 
        align-items: center; 
        
        gap: 28px; }
        
        /* PLAIN HAMBURGER: no border, no background, no rounding */
        .sh__menuBtn {
          margin-left: auto;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 6px;            /* keeps a decent touch target */
          width: auto;
          height: auto;
          display: none;            /* hidden on desktop */
          color: ${theme.colors.cardForeground};
          cursor: pointer;
        }
        .sh__menuBtn:hover { opacity: .8; }
        .sh__menuBtn:active { opacity: .6; }
        .sh__menuBtn:focus-visible { outline: 2px solid ${theme.colors.accent}; outline-offset: 2px; }

        .sh__drawer {
          display: none;
          border-top: 1px solid ${theme.colors.border};
          background: ${theme.colors.card};
        }
        .sh__drawerInner {
          max-width: 1280px; margin: 0 auto; padding: 8px 18px 14px; display: grid; gap: 8px;
        }

        /* Link underline hover */
        .sh__linkWrap { position: relative; }
        .sh__underline {
          position: absolute; left: 0; bottom: 0; height: 2px; width: 100%;
          background: ${theme.colors.accent}; border-radius: 2px;
          transform: scaleX(0); transform-origin: left; transition: transform .2s ease;
        }
        .sh__link:hover .sh__underline { transform: scaleX(1); }

        /* Mobile */
        @media (max-width: 900px) {
          .sh__nav { display: none; }
          .sh__menuBtn { display: flex; }
          
          /* Increased logo size for mobile */
          .sh__logoBox { 
            width: 80px; 
            height: 40px; 
            background: transparent;
            box-shadow: none;
          }
          
          .sh__logo {
            object-fit: contain;
            padding: 6px;
          }
          
          .sh__brandText { 
            font-size: 1.675rem; /* 30px */
            line-height: 2.25rem; /* 36px */
            font-weight: 700;
          }
        }
      `}</style>
    </header>
  );
}