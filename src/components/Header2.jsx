// src/components/SiteHeader.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../theme/Theme";
import Logo from "../assets/logonone.png";

export default function Header2({ brand = "Sitrus projects" }) {
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
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      // scroll will be handled by Index.jsx useEffect below
    } else {
      scrollToId(id);
    }
  };

  const styles = {
    wrap: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: theme.colors.card,
      color: theme.colors.cardForeground,
      borderBottom: `1px solid ${theme.colors.border}`,
      boxShadow: theme.shadows.card,
    },
    bar: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "10px 18px",
      display: "flex",
      alignItems: "center",
      gap: 16,
    },
    brandWrap: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: "1 1 auto" },
    logoBox: {
      width: 56,
      height: 56,
      borderRadius: theme.radii.md,
      overflow: "hidden",
      background: theme.colors.muted,
      display: "grid",
      placeItems: "center",
      boxShadow: theme.shadows.sm,
    },
    logo: { width: "100%", height: "100%", objectFit: "cover" },
    brandText: {
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: 26,
      color: theme.colors.foreground,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    nav: { display: "flex", alignItems: "center", gap: 28 },
    link: {
      position: "relative",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: 16,
      color: theme.colors.mutedForeground,
      padding: "8px 2px",
      transition: theme.transitions.smooth,
    },
    linkActiveUnderline: {
      position: "absolute",
      left: 0,
      bottom: 0,
      height: 2,
      width: "100%",
      background: theme.colors.accent,
      borderRadius: 2,
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform .2s ease",
    },
    linkWrap: { position: "relative" },

    menuBtn: {
      marginLeft: "auto",
      border: `1px solid ${theme.colors.border}`,
      background: theme.colors.input,
      color: theme.colors.cardForeground,
      borderRadius: theme.radii.full,
      width: 38,
      height: 38,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    drawer: { display: "none", borderTop: `1px solid ${theme.colors.border}`, background: theme.colors.card },
    drawerInner: { maxWidth: "1280px", margin: "0 auto", padding: "8px 18px 14px", display: "grid", gap: 8 },

    mediaQueries: {
      "(max-width: 900px)": {
        nav: { display: "none" },
        menuBtn: { display: "flex" },
        brandText: { fontSize: 22 },
        logoBox: { width: 48, height: 48 },
        drawer: { display: open ? "block" : "none" },
      },
    },
  };

  const mq = (base, key) => ({ ...base, ...(styles.mediaQueries[key] || {}) });

  // simple helper to render scroll links with underline hover
  const ScrollLink = ({ id, children }) => (
    <a href={`/#${id}`} onClick={go(id)} style={styles.link}>
      <span style={styles.linkWrap}>
        {children}
        <span className="underline" style={styles.linkActiveUnderline} />
      </span>
    </a>
  );

  return (
    <header style={styles.wrap}>
      <div style={styles.bar}>
        <div style={styles.brandWrap}>
          <div style={mq(styles.logoBox, "(max-width: 900px)")}>
            <img src={Logo} alt="Sitrus Projects logo" style={styles.logo} />
          </div>
          <div style={mq(styles.brandText, "(max-width: 900px)")}>{brand}</div>
        </div>

        {/* Desktop nav */}
        {/* <nav style={mq(styles.nav, "(min-width: 901px)")}>
          <ScrollLink id="home">Home</ScrollLink>
          <ScrollLink id="properties">Properties</ScrollLink>
          <ScrollLink id="about">About us</ScrollLink>
          <ScrollLink id="contact">Contact</ScrollLink>
        </nav> */}

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          style={mq(styles.menuBtn, "(max-width: 900px)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {/* <div style={mq(styles.drawer, "(max-width: 900px)")}>
        <div style={styles.drawerInner}>
          <ScrollLink id="home">Home</ScrollLink>
          <ScrollLink id="properties">Properties</ScrollLink>
          <ScrollLink id="about">About us</ScrollLink>
          <ScrollLink id="contact">Contact</ScrollLink>
        </div>
      </div> */}
    </header>
  );
}
