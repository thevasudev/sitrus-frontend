import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Header";
import theme from "../theme/Theme"; // your theme.ts default export

// Map theme => CSS variables for consistent styling everywhere
function applyThemeVars(t) {
  const root = document.documentElement;
  const set = (k, v) => root.style.setProperty(k, v);

  // colors (top level)
  set("--bg", t.colors.background);
  set("--fg", t.colors.foreground);
  set("--primary", t.colors.primary);
  set("--primary-fg", t.colors.primaryForeground);
  set("--primary-light", t.colors.primaryLight);
  set("--primary-dark", t.colors.primaryDark);

  set("--accent", t.colors.accent);
  set("--accent-fg", t.colors.accentForeground);
  set("--accent-light", t.colors.accentLight);
  set("--accent-muted", t.colors.accentMuted);

  set("--secondary", t.colors.secondary);
  set("--secondary-fg", t.colors.secondaryForeground);

  set("--muted", t.colors.muted);
  set("--muted-fg", t.colors.mutedForeground);

  set("--card", t.colors.card);
  set("--card-fg", t.colors.cardForeground);
  set("--card-hover", t.colors.cardHover);

  set("--border", t.colors.border);
  set("--input", t.colors.input);
  set("--ring", t.colors.ring);

  set("--success", t.colors.success);
  set("--warning", t.colors.warning);
  set("--danger", t.colors.destructive);
  set("--danger-fg", t.colors.destructiveForeground);

  set("--popover", t.colors.popover);
  set("--popover-fg", t.colors.popoverForeground);

  // gradients
  set("--gradient-primary", t.gradients.primary);
  set("--gradient-accent", t.gradients.accent);
  set("--gradient-hero", t.gradients.hero);
  set("--gradient-card", t.gradients.card);

  // shadows
  set("--shadow-sm", t.shadows.sm);
  set("--shadow-md", t.shadows.md);
  set("--shadow-lg", t.shadows.lg);
  set("--shadow-card", t.shadows.card);
  set("--shadow-accent", t.shadows.accent);

  // radii
  set("--radius-sm", t.radii.sm);
  set("--radius-md", t.radii.md);
  set("--radius-lg", t.radii.lg);
  set("--radius-xl", t.radii.xl);
  set("--radius-full", t.radii.full);

  // fonts
  set("--font-body", t.fonts.body);
  set("--font-heading", t.fonts.heading);
  set("--font-mono", t.fonts.mono);

  // transitions
  set("--transition-smooth", t.transitions.smooth);
  set("--transition-bounce", t.transitions.bounce);
}

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  background: "var(--bg)",
  color: "var(--fg)",
  fontFamily: "var(--font-body)",
};

const contentColumnStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
};

const mainStyle = {
  padding: "16px",
  width: "95%",
  height: "95%",
};

const cardStyle = {
  background: "var(--card)",
  color: "var(--card-fg)",
  // border: "1px solid var(--border)",
  // borderRadius: "var(--radius-lg)",
  // boxShadow: "var(--shadow-card)",
};

export default function AdminLayout() {
  const location = useLocation();

  // Sidebar collapsed state with persistence
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("adminSidebarCollapsed") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Apply theme vars once on mount (or if theme changes)
    applyThemeVars(theme);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("adminSidebarCollapsed", String(collapsed));
    } catch {
      /* no-op */
    }
  }, [collapsed]);

  // (Optional) Close any temporary UI on route change, etc.
  useEffect(() => {
    // You might add analytics or page title updates here
  }, [location.pathname]);

  const navItems = useMemo(
    () => [
      { label: "Dashboard", to: "/admin", icon: "grid" },
      { label: "Enquiries", to: "/admin/enquiries", icon: "users" },
      { label: "Properties", to: "/admin/properties", icon: "book" },
      { label: "Team", to: "/admin/team", icon: "bag" },
      { label: "Faq", to: "/admin/faq", icon: "chart" },
    ],
    []
  );

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        navItems={navItems}
      />

      {/* Right Column: Header + Content */}
      <div style={contentColumnStyle}>
        <Header
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
        />

        <main style={mainStyle}>
          {/* Example shell card */}
          <div style={{ ...cardStyle, padding: 16 }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
