import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";
import DataTable from "../components/DataTable";
import AdminForm from "../components/AdminForm";
import { resourceConfigs } from "../config/resources";

export default function AdminResourcePage({ resourceKey }) {
  const config = resourceConfigs[resourceKey];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState(() => {
    const initial = {};
    (config.listParams || []).forEach((p) => {
      initial[p.name] = p.default ?? "";
    });
    return initial;
  });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v !== undefined && v !== null) params[k] = v;
      });
      const res = await api.get(config.endpoint + "/", { params });
      setItems(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, filters]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openCreate() {
    setEditingItem(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingItem(null);
  }

  async function handleSubmit(payload) {
    if (editingItem) {
      const updateFields = config.fields.filter((f) => !f.createOnly);
      const body = {};
      updateFields.forEach((f) => (body[f.name] = payload[f.name]));
      await api.put(`${config.endpoint}/${editingItem[config.idField]}`, body);
    } else {
      await api.post(`${config.endpoint}/`, payload);
    }
    closeForm();
    fetchItems();
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    try {
      await api.delete(`${config.endpoint}/${item[config.idField]}`);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.detail || "Delete failed.");
    }
  }

  const formFields = editingItem
    ? config.fields.filter((f) => !f.createOnly)
    : config.fields;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
          {config.title}
        </h2>
        {config.canCreate !== false && !showForm && (
          <button
            onClick={openCreate}
            className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-4 py-2 transition-colors self-start sm:self-auto"
          >
            + New {config.title.replace(/s$/, "")}
          </button>
        )}
      </div>

      {config.listParams && config.listParams.length > 0 && (
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 pb-4 border-b border-border-soft">
          {config.listParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm text-text-body/70">{p.label}</label>
              <input
                type="text"
                value={filters[p.name] ?? ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [p.name]: e.target.value }))
                }
                className="text-sm px-2.5 py-1.5 border border-border-soft rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent w-28 sm:w-auto"
              />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AdminForm
          fields={formFields}
          initialValues={editingItem}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitLabel={editingItem ? "Update" : "Create"}
        />
      )}

      {error && (
        <p className="text-sm text-red-600 mt-4 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-text-body/60 mt-6">Loading...</p>
      ) : (
        <DataTable
          columns={config.columns.map((key) => ({
            key,
            label: config.fields.find((f) => f.name === key)?.label || key,
          }))}
          data={items}
          idField={config.idField}
          onEdit={config.canUpdate ? openEdit : undefined}
          onDelete={config.canDelete ? handleDelete : undefined}
        />
      )}
    </div>
  );
}
