// src/components/TrustAndServices.jsx
import React from "react";
import theme from "../theme/Theme";

// Small inline icons (no external deps)
const Icon = {
  badge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M17 8a5 5 0 0 1-10 0V4h10v4Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 17l5-2 5 2v3H7v-3Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  team: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 20v-1a4 4 0 0 1 4-4h2" stroke="currentColor" strokeWidth="2"/>
      <path d="M21 20v-1a4 4 0 0 0-4-4h-2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5 12 3l9 7.5" stroke="currentColor" strokeWidth="2"/>
      <path d="M5 10v10h14V10" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  plots: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="3" y="13" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 17l2-2 2 2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.5 12.5l2 2 3.5-4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 12v2a2 2 0 0 0 2 2h1" stroke="currentColor" strokeWidth="2"/>
      <path d="M17 12v2a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
    </svg>
  ),
};

export default function About({
  // keep prop for compatibility, but it’s unused now to avoid per-section bg
  bgImage = null,
}) {
  const green = theme.colors.primary;
  const frosted = "rgba(255,255,255,0.92)";
  const frostedLite = "rgba(255,255,255,0.88)";
  const tintGreen = "hsl(142 35% 32% / 0.10)";

  return (
    <section className="trust" aria-labelledby="trust-heading">
      {/* overlay removed to avoid double tints */}

      <div className="trust__inner">
        <h2 id="trust-heading" className="trust__title">
          Your trusted partner in{" "}
          <span className="trust__title-green">
            real estate<br className="md-break" /> excellence
          </span>
        </h2>

        <p className="trust__subtitle">
          For over 15 years, Sitrus Projects has been shaping dream communities across Karnataka.
          We specialize in plotted developments, premium villas, and gated communities—offering buyers
          transparent titles, approved layouts, and on-time project delivery.
        </p>

        <div className="trust__highlights">
          <div className="trust__pill">
            <div className="trust__pill-icon">{Icon.badge}</div>
            <div className="trust__pill-body">
              <div className="trust__pill-title">On-time Delivery</div>
              <div className="trust__pill-text">
                Multiple phases delivered in Chikkaballapur &amp; Nandi Hills region on schedule.
              </div>
            </div>
          </div>

          <div className="trust__pill">
            <div className="trust__pill-icon">{Icon.team}</div>
            <div className="trust__pill-body">
              <div className="trust__pill-title">Expert Team</div>
              <div className="trust__pill-text">
                Civil, planning &amp; MEP specialists operating with global PMO practices.
              </div>
            </div>
          </div>
        </div>

        <hr className="trust__divider" />

        <h3 className="trust__services-title">Our Services</h3>

        <div className="trust__grid">
          <ServiceCard
            icon={Icon.home}
            title="Land Development"
            desc="End-to-end transformation of raw land into planned residential layouts with roads, utilities, and approvals."
          />
          <ServiceCard
            icon={Icon.plots}
            title="Plotted Communities"
            desc="RERA-approved plotted developments with roads, drainage, lighting, and landscaped parks."
          />
          <ServiceCard
            icon={Icon.shield}
            title="Approvals & Compliance"
            desc="Complete support for RERA, BDA, BMRDA, and CUDA approvals with transparent documentation."
          />
          <ServiceCard
            icon={Icon.support}
            title="Customer Support"
            desc="Guidance from site visits to registration and after-sales services for a smooth journey."
          />
        </div>
      </div>

      <style>{`
        .trust, .trust * { box-sizing: border-box; }
        .trust {
          position: relative;
          isolation: isolate;
          padding: clamp(36px, 7vw, 64px) 0 clamp(48px, 8vw, 84px);
          color: ${theme.colors.foreground};
          font-family: ${theme.fonts.body};
          overflow: hidden;

          /* ⬇️ transparent so it sits on the single page background */
          background: transparent;
        }

        .trust__inner {
          position: relative; z-index: 1;
          max-width: 1180px; margin: 0 auto; padding: 0 20px;
        }
        .trust__title {
          font-family: ${theme.fonts.heading};
          margin: 0 0 10px;
          text-align: center;
          font-weight: 800;
          letter-spacing: .2px;
          line-height: 1;
          font-size: 3rem;
          font-weight: 700;
        }
        .trust__title-green { color: ${green}; }
        .md-break { display: none; }
        @media (min-width: ${theme.breakpoints.tablet}) {
          .md-break { display: inline; }
        }

        .trust__subtitle {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
          line-height: 1.625;
          color: ${theme.colors.accentForeground};
          // font-size: clamp(14px, 1.6vw, 18px);
          font-size: 1.25rem;
          line-height: 1.625rem;
        }

        .trust__highlights {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          margin: clamp(20px, 4vw, 28px) auto 18px;
          max-width: 980px;
        }
        @media (min-width: ${theme.breakpoints.tablet}) {
          .trust__highlights { grid-template-columns: 1fr 1fr; }
        }
        .trust__pill {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 14px;
          align-items: center;
          background: ${frosted};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.radii.lg};
          padding: 16px 18px;
          box-shadow: ${theme.shadows.card};
          backdrop-filter: blur(4px) saturate(1.05);
        }
        .trust__pill-icon {
          width: 56px; height: 56px; border-radius: ${theme.radii.md};
          display: grid; place-items: center;
          background: ${tintGreen};
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.border};
        }
        .trust__pill-title {
          font-weight: 800;
          color: ${theme.colors.cardForeground};
          margin-bottom: 4px;
        }
        .trust__pill-text {
          color: ${theme.colors.mutedForeground};
          font-size: 14px;
          line-height: 1.5;
        }

        .trust__divider {
          margin: clamp(16px, 5vw, 28px) auto;
          height: 1px; border: 0;
          width: min(980px, 92%);
          background: ${theme.colors.border};
          opacity: .8;
        }

        .trust__services-title {
          text-align: center;
          font-family: ${theme.fonts.heading};
          font-weight: 700;
          margin: 0 0 18px;
          font-size: 1.5rem;
          line-height: 2rem;
          // font-size: clamp(18px, 3.2vw, 26px);
          color: ${theme.colors.cardForeground};
        }

        .trust__grid {
          display: grid;
          gap: 18px;
          grid-template-columns: 1fr;
          max-width: 1180px;
          margin: 0 auto;
        }
        @media (min-width: 860px) {
          .trust__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1180px) {
          .trust__grid { grid-template-columns: repeat(4, 1fr); }
        }

        .service {
          background: ${frostedLite};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.radii.xl};
          box-shadow: ${theme.shadows.card};
          padding: 22px;
          display: grid;
          gap: 12px;
          min-height: 170px;
          backdrop-filter: blur(3px) saturate(1.05);
        }
        .service__icon {
          width: 44px; height: 44px; border-radius: ${theme.radii.md};
          display: grid; place-items: center;
          background: ${theme.colors.muted};
          color: ${theme.colors.secondary};
          border: 1px solid ${theme.colors.border};
        }
        .service__title {
          margin: 0;
          font-weight: 800;
          color: ${theme.colors.cardForeground};
        }
        .service__desc {
          margin: 0;
          color: ${theme.colors.mutedForeground};
          line-height: 1.6;
          font-size: 14px;
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <article className="service">
      <div className="service__icon">{icon}</div>
      <h4 className="service__title">{title}</h4>
      <p className="service__desc">{desc}</p>
    </article>
  );
}
