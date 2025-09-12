import React, { useEffect, useMemo, useState } from "react";

// ⬇️ Adjust these paths to where your files live
import theme from "../../theme/Theme"; // theme.js default export
import {
  getAllContacts,
  deleteContact,
  getConatctById, // note: using your exact function name
} from "../../api/contactUsApi"; // file where you exported those functions

// --- Helpers: map theme.js => CSS variables on :root for consistent styling ---
function applyThemeVars(t) {
  const r = document.documentElement;
  const set = (k, v) => r.style.setProperty(k, v);

  // colors
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

// --- Small UI helpers ---
const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso || "-";
  }
};

const truncate = (str, n = 80) =>
  typeof str === "string" && str.length > n ? str.slice(0, n - 1) + "…" : str;

// --- Styles (using CSS vars from theme) ---
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  background: "var(--bg)",
  color: "var(--fg)",
  fontFamily: "var(--font-body)",
};

const shellCardStyle = {
  background: "var(--card)",
  color: "var(--card-fg)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-card)",
  padding: 16,
};

const headerBarStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  justifyContent: "space-between",
  paddingBottom: 8,
  borderBottom: "1px solid var(--border)",
};

const leftHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const titleStyle = {
  fontFamily: "var(--font-heading)",
  fontWeight: 700,
  fontSize: 20,
};

const searchWrapStyle = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "var(--input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-full)",
  padding: "8px 12px",
};

const searchInputStyle = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: 260,
  color: "var(--card-fg)",
};

const refreshBtnStyle = {
  border: "1px solid var(--border)",
  background: "var(--accent)",
  color: "var(--accent-fg)",
  borderRadius: "var(--radius-full)",
  padding: "8px 14px",
  cursor: "pointer",
  boxShadow: "var(--shadow-accent)",
  transition: "var(--transition-smooth)",
};

const tableWrapStyle = {
  overflow: "auto",
  maxHeight: "70vh",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  background: "var(--card)",
};

const thStyle = {
  position: "sticky",
  top: 0,
  background: "var(--card-hover)",
  color: "var(--card-fg)",
  textAlign: "left",
  padding: "12px",
  fontWeight: 700,
  borderBottom: "1px solid var(--border)",
  zIndex: 1,
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid var(--border)",
  verticalAlign: "top",
};

const rowStyle = {
  transition: "var(--transition-smooth)",
};

const actionsCellStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const iconBtnStyle = (variant = "neutral") => ({
  display: "inline-grid",
  placeItems: "center",
  width: 36,
  height: 36,
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--border)",
  background:
    variant === "danger"
      ? "var(--danger)"
      : variant === "view"
      ? "var(--accent)"
      : "var(--input)",
  color:
    variant === "danger"
      ? "var(--danger-fg)"
      : variant === "view"
      ? "var(--accent-fg)"
      : "var(--card-fg)",
  cursor: "pointer",
  transition: "var(--transition-smooth)",
});

// Modal
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.32)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 1000,
};

const modalCardStyle = {
  width: "min(720px, 96vw)",
  background: "var(--popover)",
  color: "var(--popover-fg)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-xl)",
  boxShadow: "var(--shadow-lg)",
  overflow: "hidden",
};

const modalHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 16px",
  borderBottom: "1px solid var(--border)",
  background: "var(--card-hover)",
};

const modalBodyStyle = {
  padding: 16,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const fieldLabel = { fontSize: 12, opacity: 0.8, marginBottom: 4 };
const fieldValue = { fontWeight: 600 };

const emptyStateStyle = {
  padding: 24,
  textAlign: "center",
  color: "var(--muted-fg)",
};

// --- Spinner ---
function Spinner() {
  return (
    <div style={{ display: "grid", placeItems: "center", padding: 24 }}>
      <div
        style={{
          width: 28,
          height: 28,
          border: "3px solid var(--border)",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// --- Main Component ---
export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteTarget, setDeleteTarget] = useState(null);
const [deleteLoading, setDeleteLoading] = useState(false);
const [deleteError, setDeleteError] = useState("");


  useEffect(() => {
    applyThemeVars(theme);
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// ✅ Drop-in replacement for fetchContacts
const fetchContacts = async () => {
  setLoading(true);
  setError("");
  try {
    const resp = await getAllContacts();
    console.log("all response", resp);

    // Unwrap common shapes: {data:[...]}, {contacts:[...]}, or an array directly
    const list = Array.isArray(resp)
      ? resp
      : Array.isArray(resp?.data)
      ? resp.data
      : Array.isArray(resp?.contacts)
      ? resp.contacts
      : Array.isArray(resp?.data?.contacts)
      ? resp.data.contacts
      : [];

    setContacts(list);
  } catch (e) {
    setError(e?.response?.data?.message || e?.message || "Failed to load contacts");
  } finally {
    setLoading(false);
  }
};

// ✅ Drop-in replacement for handleView (getConatctById also returns {success, data})
const handleView = async (id) => {
  setViewOpen(true);
  setViewLoading(true);
  setViewData(null);
  try {
    const resp = await getConatctById(id);
    // Unwrap {data:{...}} | {contact:{...}} | {...}
    const item = resp?.data || resp?.contact || resp || null;
    setViewData(item);
  } catch (e) {
    setViewData({
      __error: e?.response?.data?.message || e?.message || "Failed to load contact",
    });
  } finally {
    setViewLoading(false);
  }
};

// ask first (open modal)
const askDelete = (contact) => {
  setDeleteError("");
  setDeleteTarget(contact);
  setDeleteOpen(true);
};

// actually delete after confirmation
const confirmDelete = async () => {
  if (!deleteTarget?._id) return;
  setDeleteLoading(true);
  setDeleteError("");
  try {
    await deleteContact(deleteTarget._id);
    setContacts((prev) => prev.filter((c) => c._id !== deleteTarget._id));
    setDeleteOpen(false);
    setDeleteTarget(null);
  } catch (e) {
    setDeleteError(e?.response?.data?.message || e?.message || "Delete failed");
  } finally {
    setDeleteLoading(false);
  }
};

const cancelDelete = () => {
  if (deleteLoading) return;
  setDeleteOpen(false);
  setDeleteTarget(null);
};

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this contact? This cannot be undone.");
    if (!ok) return;
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Delete failed");
    }
  };

  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase().trim();
    if (!q) return contacts;
    return contacts.filter((c) => {
      return [
        c.firstName,
        c.lastName,
        c.email,
        c.phone,
        c.subject,
        c.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [contacts, search]);

  return (
    <div style={containerStyle}>
      <div style={shellCardStyle}>
        {/* Header Bar */}
        <div style={headerBarStyle}>
          <div style={leftHeaderStyle}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-lg)",
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-accent)",
                border: "1px solid var(--ring)",
              }}
            />
            <div style={titleStyle}>Contact Enquiries</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={searchWrapStyle}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                style={searchInputStyle}
                placeholder="Search name, email, phone, subject…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button style={refreshBtnStyle} onClick={fetchContacts}>
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ height: 12 }} />
        <div style={tableWrapStyle}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <div style={emptyStateStyle}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Couldn’t load contacts</div>
              <div style={{ marginBottom: 12 }}>{error}</div>
              <button style={refreshBtnStyle} onClick={fetchContacts}>
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={emptyStateStyle}>No contacts found.</div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Subject</th>
                  <th style={thStyle}>Message</th>
                  <th style={thStyle}>Created</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c._id}
                    style={rowStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600 }}>{(c.firstName || "-") + " " + (c.lastName || "")}</div>
                    </td>
                    <td style={tdStyle}>{c.phone || "-"}</td>
                    <td style={tdStyle}>{c.email || "-"}</td>
                    <td style={tdStyle}>{truncate(c.subject, 40) || "-"}</td>
                    <td style={tdStyle}>{truncate(c.message, 80) || "-"}</td>
                    <td style={tdStyle}>{fmtDate(c.createdAt)}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <div style={actionsCellStyle}>
                        {/* View */}
                        <button
                          title="View"
                          aria-label="View"
                          style={iconBtnStyle("view")}
                          onClick={() => handleView(c._id)}
                        >
                          {/* Eye icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24">
                            <path
                              d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          title="Delete"
                          aria-label="Delete"
                          style={iconBtnStyle("danger")}
                       onClick={() => askDelete(c)}

                        >
                          {/* Trash icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24">
                            <polyline
                              points="3 6 5 6 21 6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" />
                            <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {deleteOpen && (
  <div style={modalOverlayStyle} onClick={cancelDelete}>
    <div
      style={modalCardStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-contact-title"
      onClick={(e) => e.stopPropagation()}
    >
      <div style={modalHeaderStyle}>
        <div id="delete-contact-title" style={{ fontWeight: 700 }}>
          Delete this contact?
        </div>
        <button
          aria-label="Close"
          onClick={cancelDelete}
          style={{ ...iconBtnStyle(), width: 32, height: 32 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div style={{ padding: 16 }}>
        {deleteError && (
          <div style={{ color: "var(--danger)", marginBottom: 10 }}>
            {deleteError}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={fieldLabel}>Name</div>
            <div style={fieldValue}>
              {(deleteTarget?.firstName || "-") + " " + (deleteTarget?.lastName || "")}
            </div>
          </div>
          <div>
            <div style={fieldLabel}>Email</div>
            <div style={fieldValue}>{deleteTarget?.email || "-"}</div>
          </div>
          <div>
            <div style={fieldLabel}>Phone</div>
            <div style={fieldValue}>{deleteTarget?.phone || "-"}</div>
          </div>
          <div>
            <div style={fieldLabel}>Created</div>
            <div style={fieldValue}>{fmtDate(deleteTarget?.createdAt)}</div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Subject</div>
            <div style={fieldValue}>{truncate(deleteTarget?.subject, 80) || "-"}</div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Message</div>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {truncate(deleteTarget?.message, 220) || "-"}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 13, color: "var(--muted-fg)" }}>
          This action cannot be undone.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <button
          onClick={cancelDelete}
          disabled={deleteLoading}
          style={{
            ...iconBtnStyle(),
            width: "auto",
            height: "auto",
            padding: "8px 14px",
            background: "var(--input)",
          }}
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          disabled={deleteLoading}
          style={{
            ...iconBtnStyle("danger"),
            width: "auto",
            height: "auto",
            padding: "8px 14px",
          }}
        >
          {deleteLoading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
)}


      {/* View Modal */}
      {viewOpen && (
        <div style={modalOverlayStyle} onClick={() => setViewOpen(false)}>
          <div style={modalCardStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <div style={{ fontWeight: 700 }}>Enquiry Details</div>
              <button
                aria-label="Close"
                onClick={() => setViewOpen(false)}
                style={{
                  ...iconBtnStyle(),
                  width: 32,
                  height: 32,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {viewLoading ? (
              <Spinner />
            ) : viewData?.__error ? (
              <div style={emptyStateStyle}>{viewData.__error}</div>
            ) : (
              <div style={modalBodyStyle}>
                <div>
                  <div style={fieldLabel}>First Name</div>
                  <div style={fieldValue}>{viewData?.firstName || "-"}</div>
                </div>
                <div>
                  <div style={fieldLabel}>Last Name</div>
                  <div style={fieldValue}>{viewData?.lastName || "-"}</div>
                </div>
                <div>
                  <div style={fieldLabel}>Phone</div>
                  <div style={fieldValue}>{viewData?.phone || "-"}</div>
                </div>
                <div>
                  <div style={fieldLabel}>Email</div>
                  <div style={fieldValue}>{viewData?.email || "-"}</div>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={fieldLabel}>Subject</div>
                  <div style={fieldValue}>{viewData?.subject || "-"}</div>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={fieldLabel}>Message</div>
                  <div style={{ whiteSpace: "pre-wrap" }}>{viewData?.message || "-"}</div>
                </div>
                <div>
                  <div style={fieldLabel}>Created At</div>
                  <div style={fieldValue}>{fmtDate(viewData?.createdAt)}</div>
                </div>
                <div>
                  <div style={fieldLabel}>Updated At</div>
                  <div style={fieldValue}>{fmtDate(viewData?.updatedAt)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
