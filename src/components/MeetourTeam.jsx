// src/components/Team.jsx
import React, { useEffect, useState } from "react";
import theme from "../theme/Theme";
import { getTeams } from "../api/teamApi";
import aboutus from "../assets/aboutus.png";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getTeams();
        const list = Array.isArray(res) ? res : res?.data || [];
        setMembers(list);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Failed to load team.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // show ONLY TWO cards
  const visible = (members || []).slice(0, 2);

  return (
    <section className="team-wrap" aria-label="Meet Our Team">
      <div className="overlay" aria-hidden="true" />

      <div className="container">
        <header className="hero">
          <h2 className="title">Meet Our Team</h2>
          <p className="subtitletwo">The passionate professionals behind our exceptional properties</p>
        </header>

        {err && <p className="error">{err}</p>}

        {loading ? (
          <div className="gridtwo">
            {[0, 1].map((i) => (
              <article className="card skeleton" key={i}>
                <div className="avatar sk" />
                <div className="name sk" />
                <div className="role sk" />
                <div className="line sk" />
                <div className="line sk short" />
              </article>
            ))}
          </div>
        ) : (
          <div className="gridtwo">
            {visible.map((m) => (
              <article className="cardtwo" key={m._id || m.name}>
                {/* 1) CENTER AVATAR */}
                <div className="avatar">
                  <img
                    src={m.image || ""}
                    alt={m.name ? `${m.name} portrait` : "Team member"}
                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  />
                </div>

                {/* 2) NAME (center) */}
                <h3 className="name">{m.name}</h3>

                {/* 3) ROLE (center) */}
                {m.role && <div className="role">{m.role}</div>}

                {/* 4) DESCRIPTION (left) */}
                {m.description && <p className="desc">{m.description}</p>}
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .team-wrap, .team-wrap * { box-sizing: border-box; }
        .team-wrap{
          position: relative; isolation: isolate;
          padding: clamp(28px, 4vw, 56px) 14px 90px;
          background: url(${aboutus}) center / cover no-repeat fixed;
        }
        .overlay{
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(1000px 520px at 50% -6%, rgba(255,255,255,.40), rgba(255,255,255,0) 60%),
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.06) 30%, rgba(0,0,0,.10) 100%);
        }

        .container{
          max-width: 1180px; margin: 0 auto;
          font-family: ${theme.fonts.body}; color: ${theme.colors.foreground};
          position: relative; z-index: 1;
        }

        .hero{ text-align:center; margin-bottom: clamp(24px, 3.2vw, 36px); }
        .title{
          margin:0 0 6px; font-family:${theme.fonts.heading};
          font-weight:800; letter-spacing:.2px; line-height:1.15;
          font-size: clamp(32px, 3.6vw, 44px); 
        //   color:${theme.colors.blueishblack}
          ;
        }
        .subtitletwo{ margin:0; color:${theme.colors.secondaryForeground}; }

        .error{ color:${theme.colors.destructive}; text-align:center; margin: 10px 0 16px; }

        /* EXACTLY TWO COLUMNS on desktop, ONE on mobile */
        .gridtwo{
          display: grid;
          grid-template-columns: repeat(2, minmax(340px, 1fr));
          gap: clamp(20px, 3vw, 36px);
          align-items: stretch;               /* equal row height */
        }
        @media (max-width: 980px){
          .gridtwo{ grid-template-columns: 1fr; }
        }

        /* EQUAL HEIGHT CARDS */
        .cardtwo{
          height: 100%;                        /* fill stretched track */
          min-height: clamp(440px, 42vw, 440px);
          display: flex; flex-direction: column;
          align-items: center; 
          text-align: center;
          background: ${theme.colors.card};
          border: 1px solid ${theme.colors.border};
          border-radius: 18px;
          box-shadow: ${theme.shadows.card};
          padding: clamp(22px, 2.8vw, 34px);
        }

        .avatar{
          width: 110px; height: 110px; border-radius: 999px;
          margin: 4px auto 14px; overflow: hidden; border: 3px solid #fff;
          background: ${theme.colors.muted};
          box-shadow: 0 10px 24px rgba(0,0,0,.12); flex: 0 0 auto;
        }
        .avatar img{ width:100%; height:100%; object-fit: cover; display:block; }

        .name{
          margin: 8px 0 4px; font-family:${theme.fonts.heading};
          font-size: clamp(18px, 2.2vw, 22px); color:${theme.colors.foreground};
          font-weight: 700;
        }
        .role{
          color: ${theme.hex?.goldenyellow || "hsl(34 80% 48%)"};
          font-weight: 700; font-style: italic; margin-bottom: 14px;
          font-size: clamp(15px, 1.8vw, 18px);
        }

        /* Description LEFT aligned; clamp to keep both cards equal height */
        .desc{
          margin: 0; width: 100%; max-width: 760px;
          color:${theme.colors.mutedForeground}; line-height: 1.7; text-align: left;
          display: -webkit-box; -webkit-line-clamp: 7; -webkit-box-orient: vertical; overflow: hidden;
          flex: 1 1 auto;
        }

        /* Skeleton */
        .skeleton { position:relative; overflow:hidden; }
        .sk{
          background: linear-gradient(90deg, #eceff3 25%, #f7f8fb 37%, #eceff3 63%);
          background-size: 400% 100%; animation: shimmer 1.25s ease-in-out infinite; border-radius: 12px;
        }
        .card.skeleton{ min-height: clamp(380px, 42vw, 440px); }
        .card.skeleton .avatar{ width:110px; height:110px; margin: 4px auto 14px; }
        .card.skeleton .avatar.sk{ border-radius:999px; }
        .card.skeleton .name{ height:20px; width: 55%; margin: 10px auto 6px; }
        .card.skeleton .role{ height:14px; width: 40%; margin: 0 auto 14px; }
        .card.skeleton .line{ height:12px; width: 86%; margin: 8px auto; }
        .card.skeleton .line.short{ width: 64%; }

        @keyframes shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }
      `}</style>
    </section>
  );
}
