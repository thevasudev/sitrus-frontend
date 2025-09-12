// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import theme from "../theme/Theme";
import { login } from "../api/authApi";
import api from "../config/axiosConfig";
import Logo from "../assets/logonone.png";

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: theme.gradients.hero,
    padding: 16,
    fontFamily: theme.fonts.body,
  },
  card: {
    width: "min(960px, 96vw)",
    background: theme.colors.card,
    color: theme.colors.cardForeground,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.xl,
    boxShadow: theme.shadows.lg,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
  },
  left: {
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: theme.gradients.card,
  },
  /** NEW: brand row + logo **/
  brandRow: { display: "flex", alignItems: "center", gap: 12 },
  brandLogoBox: {
    width: 48,
    height: 48,
    borderRadius: theme.radii.lg,
    overflow: "hidden",
    background: theme.colors.muted,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.accent,
    display: "grid",
    placeItems: "center",
    flex: "0 0 auto",
  },
  brandLogoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  title: {
    margin: 0,
    fontFamily: theme.fonts.heading,
    fontSize: 28,
    color: theme.colors.primaryDark,
  },
  subtitle: { margin: 0, color: theme.colors.secondary },
  leftFooter: {
    marginTop: "auto",
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },

  right: {
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: theme.colors.card,
  },
  field: { display: "grid", gap: 8 },
  label: { fontWeight: 600 },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: theme.colors.input,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.md,
    padding: "10px 12px",
    transition: theme.transitions.smooth,
  },
  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    color: theme.colors.cardForeground,
    fontFamily: "inherit",
  },
  toggleBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: theme.colors.mutedForeground,
  },
  error: {
    background: theme.colors.destructive,
    color: theme.colors.destructiveForeground,
    borderRadius: theme.radii.md,
    padding: "10px 12px",
  },
  submit: {
    border: "none",
    borderRadius: theme.radii.full,
    padding: "12px 16px",
    fontWeight: 700,
    cursor: "pointer",
    background: theme.colors.primary,
    color: theme.colors.primaryForeground,
    transition: theme.transitions.smooth,
    boxShadow: theme.shadows.accent,
  },
  divider: { height: 1, background: theme.colors.border, margin: "6px 0 2px" },
  smallLink: { color: theme.colors.secondary, textDecoration: "none" },

  // simple “mobile” toggle
  cardMobile: { gridTemplateColumns: "1fr" },
};

function EyeIcon({ on, size = 18 }) {
  return on ? (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-5.94" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M1 1l22 22" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const existingToken =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (existingToken) return <Navigate to="/admin" replace />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const resp = await login({ email, password });
      const token = resp?.token;
      const admin = resp?.admin;
      if (!token) throw new Error("No token returned");

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("authToken", token);
      storage.setItem("adminInfo", JSON.stringify(admin || {}));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/admin", { replace: true });
    } catch (e2) {
      const msg =
        e2?.response?.data?.error ||
        e2?.response?.data?.message ||
        e2?.message ||
        "Login failed";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          ...(window.innerWidth < 860 ? styles.cardMobile : {}),
        }}
      >
        {/* LEFT: brand + notes */}
        <div style={styles.left}>
          <div style={styles.brandRow}>
            <div style={styles.brandLogoBox}>
              <img src={Logo} alt="Sitrus Projects logo" style={styles.brandLogoImg} />
            </div>
            <div>
              <h2 style={styles.title}>Sitrus projects</h2>
              <p style={styles.subtitle}>Sign in to manage content & data</p>
            </div>
          </div>

          <div style={styles.divider} />
          <ul style={{ margin: 0, paddingLeft: 18, color: theme.colors.mutedForeground }}>
            <li>Manage enquiries, FAQs, properties & team</li>
            <li>Secure JWT auth with role-aware access</li>
          </ul>

          <div style={styles.leftFooter}>
            © {new Date().getFullYear()} Sitrus Projects. All rights reserved
          </div>
        </div>

        {/* RIGHT: form */}
        <div style={styles.right}>
          <h3 style={{ ...styles.title, fontSize: 22, color: theme.colors.primary }}>Welcome back</h3>
          <p style={{ marginTop: -8, color: theme.colors.mutedForeground }}>
            Enter your credentials to continue.
          </p>

          {err && <div style={styles.error}>⚠ {err}</div>}

          <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <input
                  style={styles.input}
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  style={styles.toggleBtn}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <EyeIcon on={showPw} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={styles.submit}
              disabled={loading}
              onMouseOver={(e) => (e.currentTarget.style.background = theme.colors.primaryLight)}
              onMouseOut={(e) => (e.currentTarget.style.background = theme.colors.primary)}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
