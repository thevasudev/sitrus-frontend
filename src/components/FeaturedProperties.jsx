// src/components/FeaturedProperties.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../theme/Theme";
import { getAllproperties } from "../api/propertyApi";

// ---------- helpers ----------
function unwrapList(resp) {
  if (Array.isArray(resp)) return resp;
  if (Array.isArray(resp?.data)) return resp.data;
  if (Array.isArray(resp?.data?.data)) return resp.data.data;
  if (Array.isArray(resp?.properties)) return resp.properties;
  return [];
}

function formatINR(value) {
  if (value == null) return "-";
  const n = Number(value);
  if (Number.isFinite(n)) return `₹${new Intl.NumberFormat("en-IN").format(n)}`;
  const s = String(value);
  return s.trim().startsWith("₹") ? s : `₹${s}`;
}

function statusColors(status) {
  const s = (status || "").toLowerCase();
  switch (s) {
    case "ongoing":
      return { bg: theme.colors.accent, fg: theme.colors.accentForeground };
    case "completed":
      return {
        bg: theme.colors.secondary,
        fg: theme.colors.secondaryForeground,
      };
    case "upcoming":
      return { bg: theme.colors.primary, fg: theme.colors.primaryForeground };
    default:
      return { bg: theme.colors.muted, fg: theme.colors.mutedForeground };
  }
}

const chipBase = {
  borderRadius: theme.radii.full,
  padding: "8px 14px",
  fontWeight: 700,
  border: `1px solid ${theme.colors.border}`,
  cursor: "pointer",
  background: theme.colors.card,
  color: theme.colors.mutedForeground,
  transition: theme.transitions.smooth,
};
const chipActive = {
  background: theme.hex?.goldenyellow || theme.colors.accent,
  color: theme.colors.accentForeground,
  borderColor: "transparent",
  boxShadow: theme.shadows.accent,
};

// ---------- component ----------
export default function FeaturedProperties({
  title = "Featured Properties",
  subtitle = "Discover our handpicked selection of premium properties in the most desirable locations.",
  items,
  // IMPORTANT: no per-section bg; global bg is applied in Index.jsx
  bgImage = null,
}) {
  const [data, setData] = useState(Array.isArray(items) ? items : []);
  const [loading, setLoading] = useState(!Array.isArray(items));
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("ongoing");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function run() {
      if (Array.isArray(items)) return;
      setLoading(true);
      setError("");
      try {
        const resp = await getAllproperties();
        const list = unwrapList(resp);
        if (mounted) setData(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted)
          setError(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load properties"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [items]);

  const filtered = useMemo(() => {
    if (!statusFilter || statusFilter === "all") return data;
    return (data || []).filter(
      (p) => (p.status || "").toLowerCase() === statusFilter
    );
  }, [data, statusFilter]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const p of filtered) {
      const key = (p.type || "Other").toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const styles = {
    section: {
      position: "relative",
      isolation: "isolate",
      padding: "56px 0 72px",
      background: "transparent",
      color: theme.colors.foreground,
      fontFamily: theme.fonts.body,
      overflow: "hidden",
    },
    inner: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1180px",
      margin: "0 auto",
      padding: "0 20px",
    },
    h2: {
      fontFamily: theme.fonts.heading,
      fontSize: "3rem",
      lineHeight: 1,
      textAlign: "center",
      margin: 0,
      color: theme.colors.cardForeground,
    },
    sub: {
      marginTop: 8,
      textAlign: "center",
      color: theme.colors.primaryForeground,
      maxWidth: 820,
      marginInline: "auto",
      lineHeight: "1.75rem",
      fontSize: "1.25rem",
    },
    chips: {
      marginTop: 22,
      display: "inline-flex",
      gap: 10,
      background: theme.colors.card,
      padding: 6,
      borderRadius: theme.radii.full,
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.shadows.card,
    },
    gridWrap: { marginTop: 28 },
    typeTitle: {
      margin: "18px 0 14px",
      fontFamily: theme.fonts.heading,
      fontWeight: 800,
      fontSize: "clamp(18px, 2.2vw, 28px)",
      color: theme.colors.cardForeground,
    },
    card: {
      background: "rgba(255,255,255,0.66)",
      borderRadius: theme.radii.xl,
      boxShadow: theme.shadows.card,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      backdropFilter: "saturate(1.1) blur(4px)",
    },
    img: { width: "100%", height: "100%", objectFit: "cover" },
    badgeRow: {
      position: "absolute",
      top: 10,
      left: 10,
      display: "flex",
      gap: 8,
      zIndex: 1,
    },
    badge: {
      fontSize: 12,
      fontWeight: 800,
      padding: "6px 10px",
      borderRadius: theme.radii.full,
      background: theme.colors.muted,
      color: theme.colors.mutedForeground,
      border: `1px solid ${theme.colors.border}`,
      textTransform: "capitalize",
      boxShadow: theme.shadows.sm,
    },
    body: { padding: 16, display: "grid", gap: 10 },
    title: {
      margin: 0,
      fontFamily: theme.fonts.heading,
      // fontSize: "clamp(16px, 2vw, 20px)",
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.75,
      color: theme.colors.cardForeground,
    },
    metaRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: theme.colors.mutedForeground,
    },
    price: {
      color: theme.colors.success,
      fontWeight: 800,
      fontSize: "clamp(18px, 2.6vw, 22px)",
      marginTop: 2,
    },
    descr: {
      color: theme.colors.mutedForeground,
      lineHeight: 1.55,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    ctaWrap: { marginTop: 8 },
    cta: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "12px 14px",
      borderRadius: theme.radii.md,
      border: `1px solid ${theme.colors.border}`,
      background: theme.colors.cardHover,
      color: theme.colors.cardForeground,
      fontWeight: 700,
      cursor: "pointer",
      transition: theme.transitions.smooth,
    },
  };

  return (
    <section style={styles.section} aria-labelledby="featured-heading">
      {/* ⬇️ Overlay removed to avoid tinting the global background */}

      <div style={styles.inner}>
        <h2 id="featured-heading" style={styles.h2}>
          {title}
        </h2>
        <p style={styles.sub}>{subtitle}</p>

        {/* filter chips */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 18 }}
        >
          <div style={styles.chips}>
            {["all", "ongoing", "completed"].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key)}
                style={{
                  ...chipBase,
                  ...(statusFilter === key ? chipActive : null),
                }}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* error / loading */}
        {error && (
          <div
            style={{
              marginTop: 18,
              textAlign: "center",
              color: theme.colors.destructive,
            }}
          >
            {error}
          </div>
        )}
        {loading && (
          <div
            style={{
              marginTop: 22,
              textAlign: "center",
              color: theme.colors.mutedForeground,
            }}
          >
            Loading properties…
          </div>
        )}

        {/* grouped grids */}
        {!loading &&
          !error &&
          grouped.map(([typeKey, items]) => (
            <div key={typeKey} style={styles.gridWrap}>
              <h3 style={styles.typeTitle}>
                {typeKey[0].toUpperCase() + typeKey.slice(1)}
              </h3>

              <div className="fp-grid">
                {items.map((p) => {
                  const firstImg =
                    Array.isArray(p.images) && p.images.length
                      ? p.images[0]
                      : "";
                  const sc = statusColors(p.status);
                  return (
                    <article key={p._id} style={styles.card}>
                      <div className="fp-media">
                        <div style={styles.badgeRow}>
                          <span style={styles.badge}>
                            {p.type || "Property"}
                          </span>
                          <span
                            style={{
                              ...styles.badge,
                              background: sc.bg,
                              color: sc.fg,
                              border: "none",
                            }}
                          >
                            {(p.status || "").charAt(0).toUpperCase() +
                              (p.status || "").slice(1)}
                          </span>
                        </div>
                        {firstImg ? (
                          <img
                            src={firstImg}
                            alt={p.title}
                            style={styles.img}
                          />
                        ) : (
                          <div
                            style={{
                              ...styles.img,
                              background: theme.colors.muted,
                            }}
                          />
                        )}
                      </div>

                      <div style={styles.body}>
                        <h4 style={styles.title}>{p.title || "Untitled"}</h4>

                        <div style={styles.metaRow}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 21s-7-6.58-7-11a7 7 0 1 1 14 0c0 4.42-7 11-7 11z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <circle
                              cx="12"
                              cy="10"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>{p.location || "-"}</span>
                        </div>

                        <div style={styles.price}>{formatINR(p.price)}</div>

                        <p style={styles.descr}>{p.features || "—"}</p>

                        <Link
                          to={`/properties/${p._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div style={styles.ctaWrap}>
                            <button
                              type="button"
                              style={styles.cta}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.background =
                                  theme.colors.card)
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.background =
                                  theme.colors.cardHover)
                              }
                              // REMOVE the onClick handler below - it's causing the conflict
                              onClick={() => navigate(`/properties/${p._id}`)}
                            >
                              View Details
                            </button>
                          </div>
                        </Link>

                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* REAL media queries */}
      <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }
        .fp-media {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        @media (max-width: 1100px) {
          .fp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .fp-media { height: 200px; }
        }

        @media (max-width: 640px) {
          .fp-grid { grid-template-columns: 1fr; }
          .fp-media { height: 200px; }
        }

        /* Mobile responsive font sizes */
        @media (max-width: 768px) {
          #featured-heading {
            font-size: 1.7rem !important;
          }
          .fp-grid + p {
            font-size: 1.1rem !important;
            line-height: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
