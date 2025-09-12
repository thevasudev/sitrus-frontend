import React from "react";
// import theme from "../../theme";

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 64,
  padding: "0 12px",
  background: "var(--card)",
  color: "var(--card-fg)",
  borderBottom: "1px solid var(--border)",
  boxShadow: "var(--shadow-sm)",
};

const buttonStyle = {
  display: "inline-grid",
  placeItems: "center",
  width: 40,
  height: 40,
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--border)",
  background: "var(--input)",
  cursor: "pointer",
  transition: "var(--transition-smooth)",
};

const searchStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "var(--input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-full)",
  padding: "8px 12px",
};

const inputStyle = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  color: "var(--card-fg)",
};

const rightGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const avatarStyle = {
  width: 36,
  height: 36,
  borderRadius: "var(--radius-full)",
  background: "var(--gradient-accent)",
  border: "1px solid var(--accent)",
  boxShadow: "var(--shadow-accent)",
};

export default function Header({ collapsed, onToggleSidebar }) {
  return (
    <header style={headerStyle}>
      {/* <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={onToggleSidebar}
        style={buttonStyle}
        title={collapsed ? "Expand" : "Collapse"}
      >
        
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button> */}

      {/* <div style={searchStyle}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input style={inputStyle} placeholder="Search…" />
      </div> */}

      {/* <div style={rightGroupStyle}>
        <button type="button" style={buttonStyle} title="Notifications" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M13.73 21a2 2 0 01-3.46 0" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <div style={avatarStyle} aria-label="Account" title="Account" />
      </div> */}
    </header>
  );
}
