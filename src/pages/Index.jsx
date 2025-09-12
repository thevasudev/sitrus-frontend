// src/pages/Index.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../components/About";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import SiteHeader from "../components/Header";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import FAQSection from "../components/Faq";
import Team from "../components/MeetourTeam";
import aboutus from "../assets/aboutus.png";

const SECTION_OFFSET = 90; // adjust if your header changes height
const sectionWrapStyle = { scrollMarginTop: SECTION_OFFSET };

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  }, [hash]);

  return (
    <div className="page-with-bg">
      {/* one global background for the whole page */}
      <div className="page-bg" aria-hidden="true" />
      <div className="page-bg-overlay" aria-hidden="true" />

      <SiteHeader />

      <main className="page-content">
        <section id="home" style={sectionWrapStyle}>
          <Hero />
        </section>

        {/* pass null to silence inline bg in FeaturedProperties */}
        <section id="properties" style={sectionWrapStyle}>
          <FeaturedProperties bgImage={null} />
        </section>

        {/* pass null; we also hard-override any section bg in CSS below */}
        <section id="about" style={sectionWrapStyle}>
          <About bgImage={null} />
        </section>

        <section id="faq" style={sectionWrapStyle}>
          <FAQSection />
        </section>

        <section id="team" style={sectionWrapStyle}>
          <Team />
        </section>

        <section id="contact" style={sectionWrapStyle}>
          <Contact />
        </section>
      </main>

      <Footer />

      {/* Hard guarantee: one background only; sections stay transparent */}
      <style>{`
        html, body { margin: 0; }
        .page-with-bg {
          position: relative;
          min-height: 100vh;
          isolation: isolate; /* ensures bg stays behind everything */
        }
        .page-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: url(${aboutus}) ${/* position that matched your other pages */""}
                      ${/* tweak if you want */""} center / cover no-repeat fixed;
          will-change: transform;
        }
        .page-bg-overlay {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(1000px 520px at 50% -6%, rgba(255,255,255,.40), rgba(255,255,255,0) 60%),
            linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.10));
        }
        /* everything else sits above the single background */
        header, main, footer, section { position: relative; z-index: 1; }

        /* FORCE sections to be transparent (kill their own bgs/overlays) */
        .page-with-bg section,
        .page-with-bg .trust,
        .page-with-bg .team-wrap,
        .page-with-bg .contact-wrap {
          background: transparent !important;
        }
        .page-with-bg .trust .overlay,
        .page-with-bg .team-wrap .overlay,
        .page-with-bg .contact-wrap .overlay {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Index;
