import { Fragment, useEffect, useMemo, useState } from "react";
import api from "../../lib/api";

const STATUSES = ["new", "shortlisted", "rejected"];

function csvCell(v) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

function fmtDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date) ? "" : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminApplications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [openId, setOpenId] = useState(null);
  const [callOpen, setCallOpen] = useState(null);
  const [toggling, setToggling] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/applications/", { params: { limit: 500 } });
      setItems(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    api
      .get("/settings/")
      .then((r) => setCallOpen(r.data.indabax_applications_open === "true"))
      .catch(() => setCallOpen(false));
  }, []);

  async function toggleCall() {
    setToggling(true);
    try {
      const next = !callOpen;
      await api.put("/settings/indabax_applications_open", { value: next ? "true" : "false" });
      setCallOpen(next);
    } catch (err) {
      alert(err.response?.data?.detail || "Could not change the setting.");
    } finally {
      setToggling(false);
    }
  }

  const positions = useMemo(() => [...new Set(items.map((i) => i.position))].sort(), [items]);
  const shown = items.filter(
    (i) => (!statusFilter || i.status === statusFilter) && (!positionFilter || i.position === positionFilter)
  );
  const newCount = items.filter((i) => i.status === "new").length;

  async function changeStatus(item, status) {
    try {
      await api.put(`/applications/${item.id}`, { status });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status } : i)));
    } catch (err) {
      alert(err.response?.data?.detail || "Could not change the status.");
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete the application from ${item.name}? This cannot be undone.`)) return;
    try {
      await api.delete(`/applications/${item.id}`);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      alert(err.response?.data?.detail || "Delete failed.");
    }
  }

  function exportCsv() {
    const head = ["Date", "Name", "Position", "Faculty", "Year", "Phone", "Email", "Status", "Reason"];
    const rows = shown.map((i) => [
      fmtDate(i.created_at), i.name, i.position, i.faculty, i.year_of_study, i.phone, i.email, i.status, i.reason,
    ]);
    const csv = [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leadership-applications.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const selectClass =
    "text-sm px-2.5 py-1.5 border border-border-soft rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">Leadership Applications</h2>
          <p className="text-sm text-text-body/70 mt-1">
            {items.length} total, {newCount} new
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={shown.length === 0}
          className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-4 py-2 transition-colors self-start sm:self-auto disabled:opacity-50"
        >
          Download spreadsheet (CSV)
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-soft bg-cream-dark/30 px-4 py-3">
        <div>
          <p className="font-semibold text-charcoal text-sm">
            Applications are {callOpen === null ? "..." : callOpen ? "OPEN" : "CLOSED"}
          </p>
          <p className="text-xs text-text-body/70">
            Open: the Apply button shows on the IndabaX site and the form accepts applications. Closed: the button is hidden and the form refuses applications.
          </p>
        </div>
        <button
          onClick={toggleCall}
          disabled={callOpen === null || toggling}
          className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-4 py-2 transition-colors disabled:opacity-60"
        >
          {toggling ? "Saving..." : callOpen ? "Close applications" : "Open applications"}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 pb-4 border-b border-border-soft">
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-body/70">Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-body/70">Position</label>
          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)} className={selectClass}>
            <option value="">All</option>
            {positions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-4 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-text-body/60 mt-6">Loading...</p>
      ) : shown.length === 0 ? (
        <div className="border border-dashed border-border-soft rounded-lg py-12 text-center mt-4">
          <p className="text-sm text-text-body/60">No applications yet.</p>
        </div>
      ) : (
        <div className="mt-4 border border-border-soft rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="bg-cream-dark text-left">
                {["Name", "Position", "Faculty", "Year", "Status", "Date", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-display font-semibold text-charcoal text-xs uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((i) => (
                <Fragment key={i.id}>
                  <tr className="border-t border-border-soft hover:bg-cream-dark/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-charcoal">{i.name}</td>
                    <td className="px-4 py-3 text-text-body">{i.position}</td>
                    <td className="px-4 py-3 text-text-body max-w-[220px] truncate" title={i.faculty}>{i.faculty}</td>
                    <td className="px-4 py-3 text-text-body whitespace-nowrap">{i.year_of_study || "-"}</td>
                    <td className="px-4 py-3">
                      <select value={i.status} onChange={(e) => changeStatus(i, e.target.value)} className={selectClass}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-text-body whitespace-nowrap">{fmtDate(i.created_at)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => setOpenId(openId === i.id ? null : i.id)} className="text-charcoal-light hover:text-accent font-medium mr-4">
                        {openId === i.id ? "Hide" : "Details"}
                      </button>
                      <button onClick={() => remove(i)} className="text-red-500 hover:text-red-700 font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                  {openId === i.id && (
                    <tr className="bg-cream-dark/30">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mb-3 text-text-body">
                          <p><span className="font-semibold text-charcoal">Phone: </span><a href={`tel:${i.phone}`} className="hover:underline">{i.phone}</a></p>
                          <p>
                            <span className="font-semibold text-charcoal">Email: </span>
                            {i.email ? <a href={`mailto:${i.email}`} className="hover:underline">{i.email}</a> : "-"}
                          </p>
                          <p className="sm:col-span-2"><span className="font-semibold text-charcoal">Faculty: </span>{i.faculty}</p>
                        </div>
                        <p className="font-semibold text-charcoal mb-1">Why they want to lead</p>
                        <p className="text-text-body whitespace-pre-line leading-relaxed">{i.reason}</p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
