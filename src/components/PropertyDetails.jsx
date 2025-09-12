// src/pages/PropertyDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import theme from "../theme/Theme";
import { getPropertiesById } from "../api/propertyApi";
import Contact from "./Contact";
import Footer2 from "./Footer2";
import aboutus from "../assets/aboutus.png";
import Header2 from "./Header2";

// --- helpers ---------------------------------------------------------------
const BG_IMAGE =
  (theme?.pageBg?.image && (theme.pageBg.image.src || theme.pageBg.image)) ||
  aboutus;

function formatINR(val) {
  if (val == null) return "-";
  const cleaned = String(val).replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  if (Number.isFinite(n)) return `₹${new Intl.NumberFormat("en-IN").format(n)}`;
  const s = String(val).trim();
  return s.startsWith("₹") ? s : `₹${s}`;
}
function parseNumberish(val) {
  if (val == null) return 0;
  const n = Number(String(val).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function chipColor(status) {
  const s = (status || "").toLowerCase();
  if (s === "ongoing") return { bg: "hsl(142 35% 94%)", fg: theme.colors.primary };
  if (s === "completed") return { bg: "hsl(210 40% 95%)", fg: "hsl(210 35% 35%)" };
  if (s === "upcoming") return { bg: "hsl(34 100% 95%)", fg: "hsl(34 80% 38%)" };
  return { bg: theme.colors.muted, fg: theme.colors.mutedForeground };
}

export default function PropertyDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // modals
  const [contactOpen, setContactOpen] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);

  // NEW: lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // EMI (interest fixed @ 9%)
  const rate = 9;
  const priceNum = parseNumberish(data?.price);
  const [months, setMonths] = useState(120);
  const [down, setDown] = useState(0);
  const loanAmt = Math.max(priceNum - (Number(down) || 0), 0);
  const emi = useMemo(() => {
    const r = rate / (12 * 100);
    const n = Number(months) || 0;
    if (r <= 0 || n <= 0 || loanAmt <= 0) return 0;
    const pwr = Math.pow(1 + r, n);
    return Math.round((loanAmt * r * pwr) / (pwr - 1));
  }, [loanAmt, months]);

  // images / amenities
  const images = useMemo(
    () => (Array.isArray(data?.images) ? data.images.filter(Boolean) : []),
    [data]
  );
  const amenities = useMemo(() => {
    if (Array.isArray(data?.amenities)) return data.amenities.filter(Boolean);
    if (typeof data?.amenities === "string")
      return data.amenities.split(",").map((s) => s.trim()).filter(Boolean);
    return [];
  }, [data]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const res = await getPropertiesById(id);
        const obj = res?.data && !res._id ? res.data : res;
        if (alive) setData(obj || null);
      } catch (e) {
        if (alive)
          setErr(e?.response?.data?.message || e?.message || "Failed to load property.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  // --- Lightbox helpers ----------------------------------------------------
  const openLightbox = (idx = 0) => {
    if (!images.length) return;
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImg = () => setLightboxIdx((i) => (i + 1) % images.length);
  const prevImg = () => setLightboxIdx((i) => (i - 1 + images.length) % images.length);

  // keyboard + scroll lock while lightbox open
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, images.length]);

  return (
    <>
      <Header2 />

      {/* Whole page shares the same palm background */}
      <section className="pd-wrap">
        <div className="pd-overlay" aria-hidden="true" />

        {/* Back link sits above the card */}
        <div className="pd-inner">
          <div className="pd-back">
            <Link to="/" className="pd-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Main card */}
        <div className="pd-inner">
          <div className="pd-card">
            {loading ? (
              <div className="pd-loading">Loading…</div>
            ) : err ? (
              <div className="pd-error">{err}</div>
            ) : !data ? (
              <div className="pd-error">Property not found.</div>
            ) : (
              <>
                {/* 2 + 1 gallery */}
                <div className="pd-gallery">
                  <button
                    className="pd-main"
                    onClick={() => openLightbox(0)}
                    aria-label="Open image"
                  >
                    {images[0] ? (
                      <>
                        <img src={images[0]} alt={data.title || "Property"} className="pd-main-img" />
                        {images.length > 3 && (
                          <span className="pd-more-badge">+{images.length - 3} more</span>
                        )}
                      </>
                    ) : (
                      <div className="pd-main-img pd-main-placeholder" />
                    )}
                  </button>

                  <div className="pd-side">
                    <button
                      className="pd-side-img"
                      onClick={() => openLightbox(1)}
                      aria-label="Open image"
                      disabled={!images[1]}
                    >
                      {images[1] && <img src={images[1]} alt="" />}
                    </button>
                    <button
                      className="pd-side-img"
                      onClick={() => openLightbox(2)}
                      aria-label="Open image"
                      disabled={!images[2]}
                    >
                      {images[2] && <img src={images[2]} alt="" />}
                    </button>
                  </div>
                </div>

                {/* Title row */}
                <div className="pd-head">
                  <div className="pd-title-col">
                    <h1 className="pd-title">{data.title || "-"}</h1>
                    {data.location && (
                      <div className="pd-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 21s-7-6.58-7-11a7 7 0 1 1 14 0c0 4.42-7 11-7 11z" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        {data.location}
                      </div>
                    )}
                  </div>

                  <div className="pd-chip-col">
                    {!!data.type && (
                      <span className="pd-chip" style={{ background: "hsl(210 16% 96%)", color: theme.colors.secondary }}>
                        {data.type}
                      </span>
                    )}
                    {!!data.status && (
                      <span className="pd-chip" style={{ background: chipColor(data.status).bg, color: chipColor(data.status).fg }}>
                        {String(data.status).charAt(0).toUpperCase() + String(data.status).slice(1)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pd-price">{formatINR(data.price)}</div>

                {/* Features */}
                <div className="pd-sect">
                  <h3 className="pd-sect-title">Features</h3>
                  <p className="pd-sect-text">{data.features || "—"}</p>
                </div>

                {/* Amenities as pills */}
                <div className="pd-sect">
                  <h3 className="pd-sect-title">Amenities</h3>
                  {amenities.length ? (
                    <ul className="amen-list">
                      {amenities.map((am, i) => (
                        <li key={i} className="amen-pill">{am}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="pd-sect-text">—</p>
                  )}
                </div>

                {/* CTAs */}
                <div className="pd-ctas">
                  <button className="pd-btn ghost" onClick={() => setContactOpen(true)}>Contact Agent</button>
                  <button className="pd-btn" onClick={() => setEmiOpen(true)}>EMI Calculator</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* LIGHTBOX */}
       {/* LIGHTBOX (click outside to close) */}
{lightboxOpen && images.length > 0 && (
  <div
    className="lb"
    role="dialog"
    aria-modal="true"
    onClick={(e) => {
      // only close when the actual backdrop is clicked
      if (e.target === e.currentTarget) closeLightbox();
    }}
  >
    {/* close button */}
    <button
      className="lb-close"
      aria-label="Close"
      onClick={(e) => {
        e.stopPropagation();
        closeLightbox();
      }}
    >
      ×
    </button>

    {/* prev/next arrows */}
    <button
      className="lb-nav lb-left"
      onClick={(e) => {
        e.stopPropagation();
        prevImg();
      }}
      aria-label="Previous image"
    >
      ‹
    </button>

    {/* centered content (does NOT fill the whole overlay) */}
    <div className="lb-content" onClick={(e) => e.stopPropagation()}>
      <div className="lb-count">
        {lightboxIdx + 1} / {images.length}
      </div>
      <div className="lb-imgwrap">
        <img className="lb-img" src={images[lightboxIdx]} alt="Property large view" />
      </div>
    </div>

    <button
      className="lb-nav lb-right"
      onClick={(e) => {
        e.stopPropagation();
        nextImg();
      }}
      aria-label="Next image"
    >
      ›
    </button>
  </div>
)}


        {/* Keep Contact + Footer in same background section */}
        <Contact />
        <Footer2 />

        {/* Styles */}
        <style>{`
          html, body { margin: 0; }

          .pd-wrap, .pd-wrap * { box-sizing: border-box; }
          .pd-wrap {
            position: relative; isolation: isolate; min-height: 100vh;
            padding: 16px 0 40px;
            background: url(${aboutus}) center / cover no-repeat fixed;
          }
          .pd-overlay {
            position:absolute; inset:0; pointer-events:none; z-index:0;
            background:
              radial-gradient(1000px 520px at 50% -6%, rgba(255,255,255,.40), rgba(255,255,255,0) 60%),
              linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.10));
          }
          .pd-inner {
            position:relative; z-index:1; max-width:1180px; margin:0 auto; padding:0 20px;
            font-family:${theme.fonts.body}; color:${theme.colors.foreground};
          }

          .pd-back { margin: 8px 0 12px; }
          .pd-back-link { display:inline-flex; align-items:center; gap:8px; color:${theme.colors.accentForeground}; text-decoration:none; font-weight:700; }

          .pd-card {
            background: rgba(255,255,255,0.82);
            border: 1px solid ${theme.colors.border};
            border-radius: 18px;
            box-shadow: ${theme.shadows.card};
            backdrop-filter: blur(3px) saturate(1.05);
            padding: 14px 14px 18px;
          }

          .pd-loading, .pd-error { text-align:center; margin:40px 0; color:${theme.colors.mutedForeground}; }

          .pd-gallery { display:grid; grid-template-columns: 2fr 1fr; gap:12px; }
          @media (max-width: 900px){ .pd-gallery { grid-template-columns: 1fr; } }

          .pd-main,
          .pd-side-img {
            border:1px solid ${theme.colors.border};
            border-radius:14px;
            overflow:hidden;
            background:${theme.colors.muted};
            padding:0;
            margin:0;
            cursor: zoom-in;                 /* indicate it opens */
          }

          .pd-main { position:relative; display:block; }
          .pd-main-img { width:100%; height:420px; object-fit:cover; display:block; }
          .pd-main-placeholder { height:420px; }

          .pd-more-badge {
            position:absolute; bottom:8px; right:8px; padding:6px 10px; font-weight:800; font-size:12px;
            background:${theme.colors.card}; border:1px solid ${theme.colors.border}; border-radius:999px;
            box-shadow:${theme.shadows.sm};
          }

          .pd-side { display:grid; gap:12px; grid-auto-rows: 1fr; }
          .pd-side-img { height:204px; display:block; }
          .pd-side-img[disabled] { opacity:.6; cursor:default; }
          .pd-side-img img { width:100%; height:100%; object-fit:cover; display:block; }

          .pd-head { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-top:16px; }
          @media (max-width: 640px){ .pd-head{ flex-direction:column; } }
          .pd-title { margin:0; font-family:${theme.fonts.heading}; font-size: clamp(20px, 3vw, 28px); }
          .pd-location { display:flex; align-items:center; gap:8px; color:${theme.colors.mutedForeground}; margin-top:6px; }
          .pd-chip-col { display:flex; gap:8px; flex-wrap:wrap; }
          .pd-chip { display:inline-flex; align-items:center; height:28px; padding:0 10px; border-radius:999px; font-weight:700; font-size:13px; border:1px solid ${theme.colors.border}; }

          .pd-price { margin: 8px 0; font-size: clamp(22px, 3.2vw, 28px); font-weight:900; color:${theme.colors.success}; }

          .pd-sect { margin-top: 14px; }
          .pd-sect-title { margin:0 0 6px; font-weight:800; font-family:${theme.fonts.heading}; color:${theme.colors.cardForeground}; }
          .pd-sect-text { margin:0; color:${theme.colors.mutedForeground}; }

          .amen-list { list-style:none; padding:0; margin:0; display:flex; gap:8px; flex-wrap:wrap; }
          .amen-pill {
            display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px;
            background:${theme.colors.input}; border:1px solid ${theme.colors.border}; color:${theme.colors.secondary}; font-weight:600; font-size:12px;
          }

          .pd-ctas { display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; }
          .pd-btn { display:inline-flex; align-items:center; justify-content:center; padding:10px 16px; border-radius:999px; font-weight:800; border:1px solid ${theme.colors.primary}; background:#f6fff9; color:${theme.colors.primary}; transition:${theme.transitions.bounce}; }
          .pd-btn:hover { transform: translateY(-1px); }
          .pd-btn.ghost { background:${theme.colors.card}; color:${theme.colors.cardForeground}; border-color:${theme.colors.border}; }
          .pd-btn.full { width:100%; border-color:${theme.colors.primary}; background:${theme.colors.primary}; color:${theme.colors.primaryForeground}; }

          /* --- Lightbox --- */
          .lb {
            position: fixed; inset: 0; background: rgba(0,0,0,.8);
            display: grid; place-items: center; z-index: 1000; padding: 16px;
          }
          .lb-inner { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
          .lb-imgwrap { max-width: 96vw; max-height: 90vh; }
          .lb-img { width: 100%; height: 100%; object-fit: contain; display: block; border-radius: 8px; }
          .lb-close {
            position: absolute; top: 14px; right: 18px; width: 38px; height: 38px;
            border-radius: 999px; border: 1px solid rgba(255,255,255,.3); background: rgba(0,0,0,.4);
            color: #fff; font-size: 24px; line-height: 34px; text-align: center; cursor: pointer;
          }
          .lb-count {
            position: absolute; top: 18px; left: 18px; color: #fff; font-weight: 700;
            background: rgba(0,0,0,.4); border: 1px solid rgba(255,255,255,.25); border-radius: 999px; padding: 6px 10px; font-size: 12px;
          }
          .lb-nav {
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(255,255,255,.3);
            background: rgba(0,0,0,.4); color: #fff; font-size: 30px; line-height: 38px; cursor: pointer;
          }
          .lb-left { left: 18px; }
          .lb-right { right: 18px; }
        `}</style>
      </section>
    </>
  );
}
