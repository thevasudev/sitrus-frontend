import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../config/axiosConfig";
import theme from "../theme/Theme";
import Logo from "../assets/logonone.png";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_WIDTH_COLLAPSED = 72;

const sidebarStyle = (collapsed) => ({
  width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
  minWidth: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
  transition: "var(--transition-smooth)",
  background: "var(--card)",
  color: "var(--card-fg)",
  borderRight: "1px solid var(--border)",
  boxShadow: "var(--shadow-card)",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  height: "100vh",
  overflow: "hidden",
});

const brandStyle = (collapsed) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "14px 12px",
  borderBottom: "1px solid var(--border)",
  background: "var(--card)",
  position: "relative",
  zIndex: 1,
});

const brandBadgeStyle = {
  width: 36,
  height: 36,
  borderRadius: "var(--radius-lg)",
  background: "var(--gradient-primary)",
  boxShadow: "var(--shadow-accent)",
  border: "1px solid var(--ring)",
};

const brandTextStyle = (collapsed) => ({
  fontFamily: "var(--font-heading)",
  fontWeight: 700,
  fontSize: 18,
  whiteSpace: "nowrap",
  opacity: collapsed ? 0 : 1,
  transform: `translateX(${collapsed ? -8 : 0}px)`,
  transition: "var(--transition-smooth)",
});

const collapseButtonStyle = {
  position: "absolute",
  right: 8,
  top: 8,
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-full)",
  padding: 6,
  background: "var(--muted)",
  cursor: "pointer",
};

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: 8,
  overflowY: "auto",
}; 

const itemStyle = (active) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: "var(--radius-md)",
  textDecoration: "none",
  color: active ? "var(--primary)" : "var(--card-fg)",
  background: active ? "var(--accent-muted)" : "transparent",
  border: active ? `1px solid var(--accent)` : "1px solid transparent",
  transition: "var(--transition-smooth)",
});

const iconStyle = {
  width: 18,
  height: 18,
  flex: "0 0 18px",
  display: "grid",
  placeItems: "center",
};

const footerStyle = {
  marginTop: "auto",
  padding: 8,
  borderTop: "1px solid var(--border)",
  background: "var(--card)",
};

const logoutBtnStyle = (collapsed) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 12,
  justifyContent: collapsed ? "center" : "flex-start",
  padding: "10px 12px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border)",
  background: "var(--danger)",
  color: "var(--danger-fg)",
  cursor: "pointer",
  transition: "var(--transition-smooth)",
});

function Icon({ name }) {
  // Minimal inline icons (no external deps)
  const common = {
    width: 18,
    height: 18,
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "grid":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "users":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "book":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V6a2 2 0 0 0-2-2H6" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M6 2l.01 4M18 2l-.01 4" />
          <path d="M3 7h18l-1 13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 7Z" />
          <path d="M16 11a4 4 0 0 1-8 0" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 3v18h18" />
          <path d="M7 13h3v5H7zM12 8h3v10h-3zM17 11h3v7h-3z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          <path d="M2 12h3M19 12h3M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ collapsed, onToggle, navItems }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens/details
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("adminInfo");
    sessionStorage.removeItem("adminInfo");
    // Remove axios auth header
    if (api?.defaults?.headers?.common?.Authorization) {
      delete api.defaults.headers.common["Authorization"];
    }
    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <aside style={sidebarStyle(collapsed)} aria-label="Sidebar" aria-expanded={!collapsed}>
      <div style={brandStyle(collapsed)}>
        <div style={brandBadgeStyle} />
        <div style={brandTextStyle(collapsed)}>Sitrus projects</div>

        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={collapseButtonStyle}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "var(--transition-smooth)" }}
          >
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav style={navStyle}>
        {navItems.map((item) => {
          const active = pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
          return (
            <NavLink key={item.to} to={item.to} style={itemStyle(active)}>
              <span style={iconStyle}>
                <Icon name={item.icon} />
              </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  opacity: collapsed ? 0 : 1,
                  transform: `translateX(${collapsed ? -8 : 0}px)`,
                  transition: "var(--transition-smooth)",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer with Logout */}
      <div style={footerStyle}>
        <button
          type="button"
          title="Logout"
          onClick={handleLogout}
          style={logoutBtnStyle(collapsed)}
        >
          <span style={iconStyle}>
            <Icon name="logout" />
          </span>
          {!collapsed && <span style={{ fontWeight: 700 }}>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
