// src/pages/Contact.jsx
import React, { useState } from "react";
import theme from "../theme/Theme";
import { createConatctUs } from "../api/contactUsApi";
import aboutus from "../assets/aboutus.png";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState({ type: "", msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    const phoneOk = /^[0-9]{10}$/.test(form.phone);
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!emailOk) return "Please enter a valid email.";
    if (!phoneOk) return "Phone number must be 10 digits.";
    if (!form.subject.trim()) return "Please select a subject.";
    if (!form.message.trim()) return "Message cannot be empty.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBanner({ type: "", msg: "" });

    const err = validate();
    if (err) {
      setBanner({ type: "error", msg: err });
      return;
    }

    setLoading(true);
    try {
      await createConatctUs({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      setBanner({
        type: "success",
        msg: "Thanks! Your message has been sent. We’ll get back to you shortly.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (e2) {
      const msg =
        e2?.response?.data?.message ||
        e2?.message ||
        "Failed to send message. Please try again.";
      setBanner({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-wrap" aria-label="Contact Sitrus">
      <div className="overlay" aria-hidden="true" />
      <div className="container">
        {/* Heading */}
        <header className="hero">
          <h2 className="title" aria-label="Ready to Find Your Dream Property?">
            <span className="line1">Ready to Find Your</span>
            <span className="line2">Dream Property?</span>
          </h2>
          <p className="subtitle">
            Get in touch with our expert team.<span> We're here to guide you through
            every step of your real estate journey</span>.
          </p>
        </header>

        {/* Grid */}
        <div className="grid">
          {/* Left info cards */}
          <div className="info">
            <div className="card">
              <div className="icon">
                {/* phone */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.64-3.07A19.5 19.5 0 0 1 3.15 9.82 19.86 19.86 0 0 1 .08 1.18 2 2 0 0 1 2.06-.99h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.64 2.63a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.44-1.17a2 2 0 0 1 2.11-.45c.85.31 1.73.52 2.63.64a2 2 0 0 1 1.72 2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <div>
                <div className="card-title">Call Us</div>
                <div className="card-desc">Speak with our expert agents</div>
                <a className="card-link" href="tel:+9196866102055">
                  +91 96866102055
                </a>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                {/* mail */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path
                    d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <div>
                <div className="card-title">Email Us</div>
                <div className="card-desc">Get detailed information via email</div>
                <a className="card-link" href="mailto:info@sitrusgroup.com">
                  info@sitrusgroups.com
                </a>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                {/* location */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path
                    d="M12 22s8-6.5 8-12a8 8 0 1 0-16 0c0 5.5 8 12 8 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <div>
                <div className="card-title">Visit Us</div>
                <div className="card-desc">Visit our modern office space</div>
                <div className="addr">
                  Vasavi Complex, 147, Seshadripuram Main Rd, Sripuram, Kumara
                  Park West, Seshadripuram, Bengaluru, Karnataka 560020, India
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="form-card">
            <h3 className="form-title">Send Us a Message</h3>

            {banner.msg && (
              <p
                className={`banner ${banner.type === "error" ? "error" : "success"}`}
                role="status"
              >
                {banner.msg}
              </p>
            )}

            <form onSubmit={onSubmit} noValidate>
              <div className="row">
                <div className="field">
                  <label htmlFor="firstName">
                    First Name <span>*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={onChange}
                    autoComplete="given-name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="lastName">
                    Last Name <span>*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={onChange}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label htmlFor="email">
                    Email Address <span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={(e) =>
                      onChange({
                        target: {
                          name: "phone",
                          value: e.target.value.replace(/[^\d]/g, "").slice(0, 10),
                        },
                      })
                    }
                    inputMode="numeric"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="row">
                <div className="field full">
                  <label htmlFor="subject">
                    Subject <span>*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                  >
                    <option value="">Select a subject</option>
                    <option>Enquiry about properties</option>
                    <option>Site visit request</option>
                    <option>Pricing & availability</option>
                    <option>Partnership/Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="field full">
                  <label htmlFor="message">
                    Message <span>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us about your real estate needs..."
                    value={form.message}
                    onChange={onChange}
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  />
                </div>
              </div>

              <div className="actions">
                <button type="submit" disabled={loading}>
                  <span className="btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <path d="M22 2 11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path
                        d="M22 2 15 22l-4-9-9-4 20-7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
      
        .contact-wrap, .contact-wrap * { box-sizing: border-box; }
        .contact-wrap {
          position: relative;
          padding: clamp(16px, 3vw, 28px) 12px 72px;
          /* Plain image background — NO blending */
          background: url(${aboutus}) center / cover no-repeat fixed;
        }
        /* soft neutral overlay for readability (no blend mode) */
        .overlay{
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(1000px 520px at 50% -6%, rgba(255,255,255,.40), rgba(255,255,255,0) 60%),
            linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.10));
        }

        .container {
          max-width: 1180px;
          margin: 0 auto;
          font-family: ${theme.fonts.body};
          color: ${theme.colors.foreground};
          position: relative;
          z-index: 1;
        }

        .hero { text-align: center; margin: 8px 0 22px; }
        .title{
          margin: 0 0 8px;
          font-family: ${theme.fonts.heading};
          line-height: 1;
          letter-spacing: .2px;
        }
        .title .line1{
          display:block;
          font-weight: 700;
          font-size: 3rem;
          color: #0a0a0aff; /* dark greenish (legible on light wash) */
          text-shadow: none;
        }
        .title .line2{
          display:block;
          font-weight: 700;
       font-size: 3rem;
          color: ${theme.colors.primary};
        }
        .subtitle{
          margin: 0 auto;
          max-width: 820px;
          color: ${theme.colors.card};
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .grid{
          display: grid;
          grid-template-columns: 420px 1fr; /* left stack + large form */
          gap: 28px;
          align-items: start;
        }
      @media (max-width: ${theme.breakpoints.tablet}) {
  .grid{ grid-template-columns: 1fr; }
}
@media (max-width: 1024px) and (min-width: 769px) {
  .grid{ grid-template-columns: 280px 1fr; }
  .card{ grid-template-columns: 40px 1fr; gap: 12px; padding: 16px; }
  .icon{ width: 40px; height: 40px; }
}
@media (max-width: ${theme.breakpoints.mobile}) {
  .row{ grid-template-columns: 1fr; }
  .title .line1, .title .line2{ font-size: 2.5rem; }
  .subtitle{ font-size: 1.125rem; }
}

        /* left info stack */
        .info{ display: grid; gap: 16px; }
        .card{
          display: grid;
          grid-template-columns: 48px 1fr;
          align-items: start;
          gap: 14px;
          padding: 18px;
          border-radius: 14px;
          color: #fff;
          background: rgba(16, 33, 26, .35); /* subtle green-tinted glass */
          border: 1px solid rgba(255,255,255,.25);
          backdrop-filter: blur(5px);
          box-shadow: 0 8px 24px rgba(0,0,0,.18);
        }
        .icon{
          width: 48px; height: 48px;
          border-radius: 999px;
          display: grid; place-items: center;
          color: ${theme.colors.primaryForeground};
          background-color: rgb(255 255 255 / 0.1);
          box-shadow: ${theme.shadows.accent};
        }
        .card-title{ font-weight: 700;
        font-size:1.2rem; }
        .card-desc{ color: rgba(255,255,255,.9); 
        margin: 4px 0 6px;
        font-size:1.1rem;
        line-height:1.25rem;
        texrt-opacity:1;
        }
        .card-link{
          color: #fff; text-decoration: none; font-weight: 700;
          border-bottom: 1px dashed rgba(255,255,255,.6);
        }
        .addr{ color: rgba(255,255,255,.95); }

        /* form card */
        .form-card{
         --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
     background-color: hsl(var(--card) / 0.5);     
    
      --tw-backdrop-blur: blur(4px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
     background: linear-gradient(180deg, rgba(241, 241, 241, 0.88), rgba(204, 201, 201, 0.88));
          border: 1px solid ${theme.colors.border};
          border-radius: 18px;
          box-shadow: 0 22px 44px rgba(0,0,0,.12);
          padding: clamp(16px, 2.6vw, 24px);
        }
        .form-title{
          margin: 0 0 12px;
          font-family: ${theme.fonts.heading};
          font-size: clamp(18px, 2.3vw, 24px);
          color: ${theme.colors.foreground};
        }

        /* inline status text only */
        .banner{ margin: 6px 0 10px; font-weight: 600; }
        .banner.success{ color: ${theme.colors.success}; }
        .banner.error{ color: ${theme.colors.destructive}; }

        form{ display: grid; gap: 12px; }
        .row{
          display: grid;
          grid-template-columns: repeat(2, minmax(220px, 1fr));
          gap: 12px;
          width: 100%;
          font-family: ${theme.fonts.body};

        }
        .row .full{ grid-column: 1 / -1; }

        @media (max-width: ${theme.breakpoints.mobile}) {
          .row{ grid-template-columns: 1fr; }
        }

        .field{ display: grid; gap: 6px; min-width: 0; }
        label{ font-weight: 700; color: ${theme.colors.secondary}; }
        label span{ color: ${theme.colors.primary}; }
        input, select, textarea{
          width: 100%;
          display: block;
          min-height: 44px;
          padding: 12px 12px;
          border-radius: 10px;
          border: 1px solid ${theme.colors.border};
          background: #fff;
          color: ${theme.colors.foreground};
          outline: none;
          transition: ${theme.transitions.smooth};
        }
        textarea{ min-height: 140px; }

        input::placeholder, textarea::placeholder{ color: ${theme.colors.mutedForeground}; }
        input:focus, select:focus, textarea:focus{
          border-color: ${theme.colors.ring};
          box-shadow: 0 0 0 3px color-mix(in oklab, ${theme.colors.ring} 30%, transparent);
        }

        .actions{ display: flex; justify-content: flex-start; margin-top: 4px; }
        button{
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 800;
          border: 1px solid ${theme.colors.primary};
          background: #f6fff9;
          color: ${theme.colors.primary};
          transition: ${theme.transitions.bounce};
        }
        button:hover{ transform: translateY(-1px); }
        button:disabled{ opacity: .7; cursor: not-allowed; }
        .btn-icon{
          width: 22px; height: 22px;
          display: grid; place-items: center;
          border-radius: 999px;
          background: ${theme.colors.primary};
          color: ${theme.colors.primaryForeground};
        }
      `}</style>
    </section>
  );
}
