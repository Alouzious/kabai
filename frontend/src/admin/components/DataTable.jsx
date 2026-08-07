export default function DataTable({ columns, data, onEdit, onDelete, idField = "id" }) {
  if (!data || data.length === 0) {
    return (
      <div className="border border-dashed border-border-soft rounded-lg py-12 text-center mt-4">
        <p className="text-sm text-text-body/60">No records yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 border border-border-soft rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="bg-cream-dark text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-display font-semibold text-charcoal text-xs uppercase tracking-wide whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 font-display font-semibold text-charcoal text-xs uppercase tracking-wide text-right whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[idField]}
              className="border-t border-border-soft hover:bg-cream-dark/50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 max-w-[220px] truncate text-text-body"
                >
                  {col.render ? col.render(row) : formatValue(row[col.key])}
                </td>
              ))}
              <td className="px-4 py-3 text-right whitespace-nowrap">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="text-charcoal-light hover:text-accent font-medium mr-4"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatValue(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
