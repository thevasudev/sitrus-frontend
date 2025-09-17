import React, { useEffect, useMemo, useState } from "react";
import theme from "../../theme/Theme"; // ⬅️ adjust if needed
import {
  cerateProeprty,            // ⬅️ using your exact function names
  getAllproperties,
  getPropertiesById,
  updatePropertyById,
  deletePropertyById,
} from "../../api/propertyApi"; // ⬅️ adjust path to your API file
import { storage } from "../../utils/firebase"; // ⬅️ adjust to your firebase config path
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ---------- constants (match your backend enums) ----------
const TYPES = [
  "villa",  "land", "commercial",
];
const STATUSES = ["completed", "ongoing"];

// ---------- helpers ----------
const unwrapList = (resp) =>
  Array.isArray(resp)
    ? resp
    : Array.isArray(resp?.data)
    ? resp.data
    : Array.isArray(resp?.properties)
    ? resp.properties
    : Array.isArray(resp?.data?.properties)
    ? resp.data.properties
    : [];

const unwrapItem = (resp) => resp?.data || resp?.property || resp || null;

const fmtDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const truncate = (str, n = 80) =>
  typeof str === "string" && str.length > n ? str.slice(0, n - 1) + "…" : str;

async function uploadFilesToFirebase(files) {
  const urls = [];
  for (const file of files) {
    const safeName = file.name.replace(/\s+/g, "_");
    const path = `properties/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 10)}_${safeName}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
}

// ---------- styles (inline, using theme directly) ----------
const pageStyle = {
  padding: "24px",
//   backgroundColor: theme.colors.background,
  minHeight: "100vh",
  color: theme.colors.foreground,
  fontFamily: theme.fonts.body,
};

const cardStyle = {
//   maxWidth: 1400,
  margin: "0 auto",
  backgroundColor: theme.colors.card,
  borderRadius: theme.radii.lg,
  padding: "20px",
  boxShadow: theme.shadows.card,
  border: `1px solid ${theme.colors.border}`,
};

const headerBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  paddingBottom: 12,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const btn = {
  base: {
    border: "none",
    borderRadius: theme.radii.md,
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: theme.transitions.smooth,
  },
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryForeground,
  },
  accent: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.accentForeground,
  },
  danger: {
    backgroundColor: theme.colors.destructive,
    color: theme.colors.destructiveForeground,
  },
  neutral: {
    backgroundColor: theme.colors.input,
    color: theme.colors.cardForeground,
    border: `1px solid ${theme.colors.border}`,
  },
};

const tableWrapStyle = {
  overflow: "auto",
  maxHeight: "70vh",
  borderRadius: theme.radii.md,
  border: `1px solid ${theme.colors.border}`,
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  background: theme.colors.card,
};

const thStyle = {
  position: "sticky",
  top: 0,
  background: theme.colors.cardHover,
  color: theme.colors.cardForeground,
  textAlign: "left",
  padding: 12,
  fontWeight: 700,
  borderBottom: `1px solid ${theme.colors.border}`,
  zIndex: 1,
};

const tdStyle = {
  padding: 12,
  borderBottom: `1px solid ${theme.colors.border}`,
  verticalAlign: "top",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 1000,
};

const modalCard = {
  width: "min(900px, 96vw)",
  background: theme.colors.popover,
  color: theme.colors.popoverForeground,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.xl,
  boxShadow: theme.shadows.lg,
  overflow: "hidden",
};

const modalHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 16px",
  borderBottom: `1px solid ${theme.colors.border}`,
  background: theme.colors.cardHover,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.input,
  borderRadius: theme.radii.sm,
  fontFamily: "inherit",
  color: theme.colors.foreground,
  boxSizing: "border-box",
};

const selectStyle = { ...inputStyle };

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const chip = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    background: theme.colors.muted,
    color: theme.colors.mutedForeground,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.full,
    padding: "6px 10px",
  },
  removeBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 700,
    color: theme.colors.mutedForeground,
  },
};

const thumbWrap = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: 10,
};

const thumbCard = {
  position: "relative",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.md,
  overflow: "hidden",
  background: theme.colors.muted,
};

const thumbImg = {
  width: "100%",
  height: 100,
  objectFit: "cover",
};

const closePill = {
  position: "absolute",
  top: 6,
  right: 6,
  border: "none",
  cursor: "pointer",
  background: theme.colors.destructive,
  color: theme.colors.destructiveForeground,
  borderRadius: theme.radii.full,
  padding: "4px 8px",
  fontSize: 12,
};

// ---------- component ----------
export default function PropertiesAdmin() {
  // list
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  // view modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewData, setViewData] = useState(null);

  // create/edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // property object when editing
  const [form, setForm] = useState({
    title: "",
    type: TYPES[0],
    location: "",
    price: "",
    features: "",
    amenitiesText: "", // comma/newline separated (server will normalize)
    status: STATUSES[0],
    // images handled separately
  });
  const [existingImages, setExistingImages] = useState([]); // URLs already on server
  const [newFiles, setNewFiles] = useState([]); // File[]
  const [formErr, setFormErr] = useState("");

  // delete modal
  const [delOpen, setDelOpen] = useState(false);
  const [delTarget, setDelTarget] = useState(null);
  const [delLoading, setDelLoading] = useState(false);
  const [delErr, setDelErr] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    setErr("");
    try {
      const resp = await getAllproperties();
      const list = unwrapList(resp);
      setItems(list);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }

  // ---------- search ----------
  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase().trim();
    if (!q) return items;
    return items.filter((p) =>
      [
        p.title,
        p.type,
        p.location,
        p.status,
        p.price,
        p.features,
        ...(Array.isArray(p.amenities) ? p.amenities : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, search]);

  // ---------- view ----------
  async function openView(id) {
    setViewOpen(true);
    setViewLoading(true);
    setViewData(null);
    try {
      const resp = await getPropertiesById(id);
      setViewData(unwrapItem(resp));
    } catch (e) {
      setViewData({ __error: e?.response?.data?.message || e?.message || "Failed to load property" });
    } finally {
      setViewLoading(false);
    }
  }

  // ---------- edit / create ----------
  function startCreate() {
    setEditing(null);
    setForm({
      title: "",
      type: TYPES[0],
      location: "",
      price: "",
      features: "",
      amenitiesText: "",
      status: STATUSES[0],
    });
    setExistingImages([]);
    setNewFiles([]);
    setFormErr("");
    setEditOpen(true);
  }

  async function startEdit(id) {
    setFormErr("");
    setNewFiles([]);
    try {
      const resp = await getPropertiesById(id);
      const item = unwrapItem(resp);
      setEditing(item);
      setForm({
        title: item?.title || "",
        type: item?.type || TYPES[0],
        location: item?.location || "",
        price: item?.price || "",
        features: item?.features || "",
        amenitiesText: Array.isArray(item?.amenities) ? item.amenities.join(", ") : item?.amenities || "",
        status: item?.status || STATUSES[0],
      });
      setExistingImages(Array.isArray(item?.images) ? item.images : []);
      setEditOpen(true);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Failed to fetch property");
    }
  }

  function onFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onPickFiles(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    // filter images only
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    setNewFiles((prev) => [...prev, ...imgs]);
    e.target.value = ""; // reset to allow re-pick same files
  }

  function removeExistingImage(url) {
    setExistingImages((prev) => prev.filter((u) => u !== url));
  }

  function removeNewFile(index) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function submitForm(e) {
    e?.preventDefault?.();
    setFormErr("");
    setSaving(true);
    try {
      // upload any new files
      const uploadedUrls = newFiles.length > 0 ? await uploadFilesToFirebase(newFiles) : [];
      const images = [...existingImages, ...uploadedUrls];

      const payload = {
        title: form.title.trim(),
        type: form.type,
        location: form.location.trim(),
        price: String(form.price).trim(),
        features: form.features, // server normalizes string
        amenities: form.amenitiesText, // server accepts CSV/newline; normalizes array
        status: form.status,
        images,
      };

      if (editing?._id) {
        await updatePropertyById(editing._id, payload);
      } else {
        await cerateProeprty(payload);
      }
      setEditOpen(false);
      setEditing(null);
      setNewFiles([]);
      await loadItems();
    } catch (e) {
      setFormErr(e?.response?.data?.message || e?.message || "Failed to save property");
    } finally {
      setSaving(false);
    }
  }

  // ---------- delete ----------
  function askDelete(item) {
    setDelErr("");
    setDelTarget(item);
    setDelOpen(true);
  }

  async function confirmDelete() {
    if (!delTarget?._id) return;
    setDelLoading(true);
    setDelErr("");
    try {
      await deletePropertyById(delTarget._id);
      setDelOpen(false);
      setDelTarget(null);
      await loadItems();
    } catch (e) {
      setDelErr(e?.response?.data?.message || e?.message || "Delete failed");
    } finally {
      setDelLoading(false);
    }
  }

  function cancelDelete() {
    if (delLoading) return;
    setDelOpen(false);
    setDelTarget(null);
  }

  // ---------- render ----------
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* header */}
        <div style={headerBarStyle}>
          <h2 style={{ margin: 0, fontFamily: theme.fonts.heading, color: theme.colors.primary }}>
            Properties
          </h2>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              placeholder="Search title, location, status…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, width: 320, background: theme.colors.cardHover }}
            />
            <button
              style={{ ...btn.base, ...btn.neutral }}
              onClick={loadItems}
              onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
              onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Refresh
            </button>
            <button
              style={{ ...btn.base, ...btn.primary }}
              onClick={startCreate}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primaryLight)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primary)}
            >
              + Add Property
            </button>
          </div>
        </div>

        {/* error */}
        {err && (
          <div
            style={{
              background: theme.colors.destructive,
              color: theme.colors.destructiveForeground,
              padding: 12,
              borderRadius: theme.radii.sm,
              marginBottom: 12,
            }}
          >
            {err}
          </div>
        )}

        {/* table */}
        <div style={tableWrapStyle}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 24 }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 24, color: theme.colors.mutedForeground }}>
              No properties found.
            </div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Images</th>
                  <th style={thStyle}>Created</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600 }}>{truncate(p.title, 60)}</div>
                    </td>
                    <td style={tdStyle}>{p.type}</td>
                    <td style={tdStyle}>{truncate(p.location, 50)}</td>
                    <td style={tdStyle}>{p.price}</td>
                    <td style={tdStyle}>{p.status}</td>
                    <td style={tdStyle}>{Array.isArray(p.images) ? p.images.length : 0}</td>
                    <td style={tdStyle}>{fmtDate(p.createdAt)}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 8 }}>
                        <button
                          style={{ ...btn.base, ...btn.accent }}
                          onClick={() => openView(p._id)}
                        >
                          View
                        </button>
                        <button
                          style={{ ...btn.base, ...btn.neutral }}
                          onClick={() => startEdit(p._id)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...btn.base, ...btn.danger }}
                          onClick={() => askDelete(p)}
                        >
                          Delete
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

      {/* View Modal */}
      {viewOpen && (
        <div style={modalOverlay} onClick={() => setViewOpen(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <div style={{ fontWeight: 700 }}>Property Details</div>
              <button
                onClick={() => setViewOpen(false)}
                style={{ ...btn.base, ...btn.neutral, padding: "6px 10px" }}
              >
                Close
              </button>
            </div>
            {viewLoading ? (
              <div style={{ padding: 16 }}>Loading…</div>
            ) : viewData?.__error ? (
              <div style={{ padding: 16, color: theme.colors.destructive }}>{viewData.__error}</div>
            ) : (
              <div style={{ padding: 16, display: "grid", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Title" value={viewData?.title} />
                  <Field label="Type" value={viewData?.type} />
                  <Field label="Location" value={viewData?.location} />
                  <Field label="Price" value={viewData?.price} />
                  <Field label="Status" value={viewData?.status} />
                  <Field label="Created" value={fmtDate(viewData?.createdAt)} />
                  <Field label="Updated" value={fmtDate(viewData?.updatedAt)} />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Label>Features</Label>
                    <div>{viewData?.features || "-"}</div>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Label>Amenities</Label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {(viewData?.amenities || []).length === 0
                        ? "-"
                        : viewData.amenities.map((a, i) => (
                            <span key={i} style={chip.base}>{a}</span>
                          ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Images</Label>
                  <div style={thumbWrap}>
                    {(viewData?.images || []).map((u, i) => (
                      <div key={i} style={thumbCard}>
                        <img src={u} alt={`property-${i}`} style={thumbImg} />
                      </div>
                    ))}
                    {(viewData?.images || []).length === 0 && <div>No images</div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {editOpen && (
        <div style={modalOverlay} onClick={() => !saving && setEditOpen(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <div style={{ fontWeight: 700 }}>
                {editing ? "Edit Property" : "Add Property"}
              </div>
              <button
                onClick={() => !saving && setEditOpen(false)}
                style={{ ...btn.base, ...btn.neutral, padding: "6px 10px" }}
                disabled={saving}
              >
                Close
              </button>
            </div>

            <form onSubmit={submitForm} style={{ padding: 16, display: "grid", gap: 12 }}>
              {formErr && (
                <div
                  style={{
                    background: theme.colors.destructive,
                    color: theme.colors.destructiveForeground,
                    padding: 10,
                    borderRadius: theme.radii.sm,
                  }}
                >
                  {formErr}
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <Label>Title</Label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onFormChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={onFormChange}
                    style={selectStyle}
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Location</Label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={onFormChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={onFormChange}
                    required
                    style={inputStyle}
                    placeholder="e.g. ₹75,00,000"
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Features</Label>
                  <textarea
                    name="features"
                    value={form.features}
                    onChange={onFormChange}
                    rows={3}
                    style={textareaStyle}
                    placeholder="e.g. 3BHK East-facing 1800 sqft vastu-compliant"
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Amenities (comma / newline separated)</Label>
                  <textarea
                    name="amenitiesText"
                    value={form.amenitiesText}
                    onChange={onFormChange}
                    rows={3}
                    style={textareaStyle}
                    placeholder="Clubhouse, Swimming Pool, Gym, Kids Play Area"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={onFormChange}
                    style={selectStyle}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Upload Images</Label>
                  <input type="file" accept="image/*" multiple onChange={onPickFiles} />
                </div>
              </div>

              {/* existing images */}
              <div>
                <Label>Existing Images</Label>
                <div style={thumbWrap}>
                  {existingImages.length === 0 && <div>None</div>}
                  {existingImages.map((u) => (
                    <div key={u} style={thumbCard}>
                      <img src={u} alt="existing" style={thumbImg} />
                      <button
                        type="button"
                        style={closePill}
                        onClick={() => removeExistingImage(u)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* new files previews */}
              <div>
                <Label>New Images (to upload)</Label>
                <div style={thumbWrap}>
                  {newFiles.length === 0 && <div>None</div>}
                  {newFiles.map((f, i) => (
                    <div key={i} style={thumbCard}>
                      <img src={URL.createObjectURL(f)} alt={f.name} style={thumbImg} />
                      <button
                        type="button"
                        style={closePill}
                        onClick={() => removeNewFile(i)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => !saving && setEditOpen(false)}
                  style={{ ...btn.base, ...btn.neutral }}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ ...btn.base, ...btn.primary }}
                  disabled={saving}
                >
                  {saving ? "Saving…" : editing ? "Update Property" : "Create Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {delOpen && (
        <div style={modalOverlay} onClick={cancelDelete}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <div style={{ fontWeight: 700 }}>Delete this property?</div>
              <button
                onClick={cancelDelete}
                style={{ ...btn.base, ...btn.neutral, padding: "6px 10px" }}
                disabled={delLoading}
              >
                Close
              </button>
            </div>
            <div style={{ padding: 16 }}>
              {delErr && (
                <div
                  style={{
                    background: theme.colors.destructive,
                    color: theme.colors.destructiveForeground,
                    padding: 10,
                    borderRadius: theme.radii.sm,
                    marginBottom: 10,
                  }}
                >
                  {delErr}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Title" value={delTarget?.title} />
                <Field label="Location" value={delTarget?.location} />
                <Field label="Type" value={delTarget?.type} />
                <Field label="Status" value={delTarget?.status} />
              </div>
              <div style={{ marginTop: 10, color: theme.colors.mutedForeground }}>
                This action cannot be undone.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                padding: "12px 16px",
                borderTop: `1px solid ${theme.colors.border}`,
              }}
            >
              <button
                onClick={cancelDelete}
                disabled={delLoading}
                style={{ ...btn.base, ...btn.neutral }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={delLoading}
                style={{ ...btn.base, ...btn.danger }}
              >
                {delLoading ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- small presentational bits ----------
function Label({ children }) {
  return (
    <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6, fontWeight: 600 }}>
      {children}
    </div>
  );
}
function Field({ label, value }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ fontWeight: 600 }}>{value || "-"}</div>
    </div>
  );
}
