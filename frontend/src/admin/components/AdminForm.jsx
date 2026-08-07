import { useState, useEffect } from "react";
import api from "../../lib/api";

export default function AdminForm({ fields, initialValues, onSubmit, onCancel, submitLabel = "Save" }) {
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [asyncOptions, setAsyncOptions] = useState({});

  useEffect(() => {
    const defaults = {};
    fields.forEach((f) => {
      if (initialValues && initialValues[f.name] !== undefined) {
        defaults[f.name] =
          f.type === "tags"
            ? Array.isArray(initialValues[f.name])
              ? initialValues[f.name].join(", ")
              : ""
            : initialValues[f.name];
      } else {
        defaults[f.name] = f.type === "tags" ? "" : f.default ?? (f.type === "boolean" ? false : "");
      }
    });
    setValues(defaults);
  }, [fields, initialValues]);

  useEffect(() => {
    fields
      .filter((f) => f.type === "async-select")
      .forEach((f) => {
        api
          .get(f.endpoint, { params: f.endpointParams || {} })
          .then((res) => {
            setAsyncOptions((prev) => ({ ...prev, [f.name]: res.data }));
          })
          .catch(() => {
            setAsyncOptions((prev) => ({ ...prev, [f.name]: [] }));
          });
      });
  }, [fields]);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {};
      fields.forEach((f) => {
        let val = values[f.name];
        if (f.type === "number") val = val === "" ? null : Number(val);
        if (f.type === "tags") {
          val = val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
        }
        payload[f.name] = val;
      });
      await onSubmit(payload);
    } catch (err) {
      setError(
        err.response?.data?.detail
          ? JSON.stringify(err.response.data.detail)
          : "Save failed."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border-soft bg-cream-dark/30 rounded-lg p-6 mt-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div
            key={f.name}
            className={f.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              {f.label}
              {f.required && <span className="text-accent"> *</span>}
            </label>
            {renderInput(f, values, handleChange, asyncOptions)}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-4 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-5 py-2 transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-text-body hover:text-charcoal font-medium px-5 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full px-3 py-2 border border-border-soft rounded-md text-sm text-text-body bg-cream focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";

function renderInput(field, values, handleChange, asyncOptions = {}) {
  const value = values[field.name] ?? "";

  if (field.type === "textarea") {
    return (
      <textarea
        rows={4}
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={inputClass}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 mt-1">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => handleChange(field.name, e.target.checked)}
          className="w-4 h-4 accent-[--color-accent]"
        />
        <span className="text-sm text-text-body">{value ? "Yes" : "No"}</span>
      </label>
    );
  }


  if (field.type === "async-select") {
    const options = asyncOptions[field.name] || [];
    return (
      <select
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={inputClass}
      >
        <option value="">Select {field.label}...</option>
        {options.map((opt) => (
          <option key={opt[field.optionValue || "id"]} value={opt[field.optionValue || "id"]}>
            {opt[field.optionLabel || "title"]}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={inputClass}
      >
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={inputClass}
      />
    );
  }

  if (field.type === "tags") {
    return (
      <input
        type="text"
        placeholder="comma, separated, values"
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={inputClass}
      />
    );
  }

  if (field.type === "datetime") {
    return (
      <input
        type="datetime-local"
        value={value ? String(value).slice(0, 16) : ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={inputClass}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handleChange(field.name, e.target.value)}
      className={inputClass}
    />
  );
}
