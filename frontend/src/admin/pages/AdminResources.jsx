import { useEffect, useState } from "react";
import api from "../../lib/api";

const CATEGORIES = [
  { value: "logo", label: "Logo (image upload)" },
  { value: "image", label: "Image (upload)" },
  { value: "document_link", label: "Document (external link)" },
];

const emptyForm = {
  title: "",
  description: "",
  category: "logo",
  external_url: "",
  file: null,
};

function fmtDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date) ? "" : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function categoryLabel(c) {
  if (c === "logo") return "Logo";
  if (c === "image") return "Image";
  if (c === "document_link") return "Document";
  if (c === "document") return "Document";
  return c;
}

export default function AdminResources() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/resources/");
      // Hide the built-in constitution from admin CRUD list (managed via git static file)
      setItems((res.data.items || []).filter((i) => !i.is_builtin));
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load resources.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function onFileChange(e) {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("description", form.description.trim());
      fd.append("category", form.category);
      if (form.category === "document_link") {
        fd.append("external_url", form.external_url.trim());
      } else if (form.file) {
        fd.append("file", form.file);
      }
      await api.post("/resources/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm(emptyForm);
      // reset file input by remounting via key on form — handled by clearing state
      await load();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setFormError(
        typeof detail === "string"
          ? detail
          : "Could not save the resource. Check the file type and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    setEditing(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description || "");
  }

  async function saveEdit(item) {
    setEditSaving(true);
    try {
      await api.put(`/resources/${item.id}`, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });
      setEditing(null);
      await load();
    } catch (err) {
      alert(err.response?.data?.detail || "Could not update the resource.");
    } finally {
      setEditSaving(false);
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    try {
      await api.delete(`/resources/${item.id}`);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      alert(err.response?.data?.detail || "Delete failed.");
    }
  }

  const inputClass =
    "w-full text-sm px-3 py-2 border border-border-soft rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-white";
  const needsFile = form.category === "logo" || form.category === "image";

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">Campaign Resources</h2>
        <p className="text-sm text-text-body/70 mt-1">
          Logos and images (png, jpg, jpeg, svg, webp — max 5 MB). Documents are external links only.
          The constitution PDF is stored in the repo under <code className="text-xs">backend/app/static/resources/</code>, not uploaded here.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-white border border-border-soft rounded-xl p-4 sm:p-5 mb-8 space-y-3"
      >
        <h3 className="font-semibold text-charcoal text-sm">Add resource</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">Title *</label>
            <input
              className={inputClass}
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Official club logo"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">Category *</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                  file: null,
                  external_url: "",
                })
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-charcoal block mb-1">Description</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short note for applicants"
          />
        </div>
        {needsFile ? (
          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">Image file *</label>
            <input
              key={form.category + String(saving)}
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.webp,image/png,image/jpeg,image/svg+xml,image/webp"
              required
              onChange={onFileChange}
              className="text-sm"
            />
            <p className="text-xs text-text-body/60 mt-1">
              Only images. For documents, choose “Document (external link)” and paste a URL.
            </p>
          </div>
        ) : (
          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">Document URL *</label>
            <input
              className={inputClass}
              type="url"
              required
              value={form.external_url}
              onChange={(e) => setForm({ ...form, external_url: e.target.value })}
              placeholder="https://drive.google.com/..."
            />
          </div>
        )}
        {formError && <p className="text-sm text-red-600">{formError}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-4 py-2 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Add resource"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-text-body/60">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-text-body/60">No resources yet.</p>
      ) : (
        <div className="overflow-x-auto border border-border-soft rounded-xl bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-cream/60 text-charcoal/80 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Title</th>
                <th className="px-3 py-2.5 font-semibold">Type</th>
                <th className="px-3 py-2.5 font-semibold hidden sm:table-cell">Added</th>
                <th className="px-3 py-2.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border-soft align-top">
                  <td className="px-3 py-3">
                    {editing === item.id ? (
                      <div className="space-y-2 max-w-md">
                        <input
                          className={inputClass}
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={2}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={editSaving}
                            onClick={() => saveEdit(item)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded bg-accent text-charcoal"
                          >
                            {editSaving ? "Saving…" : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditing(null)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded border border-border-soft"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-charcoal">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-text-body/70 mt-0.5 line-clamp-2">{item.description}</p>
                        )}
                        {item.external_url && (
                          <a
                            href={item.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-charcoal underline break-all"
                          >
                            {item.external_url}
                          </a>
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{categoryLabel(item.category)}</td>
                  <td className="px-3 py-3 whitespace-nowrap hidden sm:table-cell text-text-body/70">
                    {fmtDate(item.created_at)}
                  </td>
                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    {editing !== item.id && (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="text-xs font-semibold text-charcoal hover:underline mr-3"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(item)}
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
