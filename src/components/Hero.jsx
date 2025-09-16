// src/components/Hero.jsx
import React from "react";
import theme from "../theme/Theme";
import Heroimage from "../assets/logo3.jpeg";

export default function Hero({
  headline = "Find your perfect space\nwith Sitrus.",
  imageAlt = "Modern row of villas",
  headerHeight = 72, // ⬅ adjust to your sticky header height (px)
}) {
  const gold = theme.hex?.goldenyellow || "hsl(34 85% 55%)";
  const objectPosition = theme.pageBg?.position || "50% 35%";

  return (
    <section
      className="hero"
      role="banner"
      aria-label="Sitrus hero section"
      style={{ ["--header-h"]: `${headerHeight}px` }}
    >
      <div className="hero__media">
        <img
          className="hero__img"
          src={Heroimage}
          alt={imageAlt}
          loading="eager"
          decoding="async"
          style={{ objectPosition }}
        />
        <div className="hero__shade" />
      </div>

      <div className="hero__text">
        <h1 className="hero__headline">
          {headline.split("\n").map((line, i) => (
            <span key={i} className="hero__line">
              {line}
              {i === 0 && <wbr />}
            </span>
          ))}
        </h1>
      </div>

      <style>{`
        .hero {
          --header-h: 72px; /* default; overridden by prop */
          position: relative;
          isolation: isolate;
          // background: ${theme.colors.background};
        }

        /* Make the media fill the viewport height minus header.
           Multiple lines = graceful fallback across browsers. */
        .hero__media {
          position: relative;
        height: calc(100vh - var(--header-h));
  height: calc(100dvh - var(--header-h));
  height: calc(100svh - var(--header-h));
          min-height: 520px;                        /* don't get too small */
          overflow: hidden;
           margin-top: -7px;
        }

        .hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero__shade {
          position: absolute; inset: 0; pointer-events: none;
          /* uncomment if you want a readability overlay */
          /* background: rgba(0,0,0,0.28); */
        }

        .hero__text {
          position: absolute; inset: 0;
          display: grid;
          justify-items: end;
          align-content: start;
          margin-right: 20px;
          // padding: clamp(12px, 4vw, 40px);
         

        }

        .hero__headline {
          margin: 0;
          font-family: ${theme.fonts.heading};
          line-height: 1.08;
          font-weight: 700;
          color: ${theme.colors.primaryForeground};
          text-shadow: 0 2px 18px rgba(0,0,0,0.45);
          font-size: clamp(28px, 5vw, 64px);
          letter-spacing: 0.2px;
          text-align: right;
        }
        .hero__line { display: block; }

        @media (max-width: ${theme.breakpoints.tablet}) {
          .hero__text { padding: clamp(12px, 5vw, 28px); }
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
          .hero__text {
          font-size: clamp(22px, 7.2vw, 36px);
            justify-items: center;
            // align-content: end;
            padding: 18px 16px 26px;
          }
          .hero__headline {
            text-align: center;
            font-size: clamp(22px, 7.2vw, 36px);
          }
        }
      `}</style>
    </section>
  );
}
