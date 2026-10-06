import { useRef, useState } from "react";
import api from "../../lib/api";

export default function ImageUpload({
  folder = "kabai",
  onUploaded,
  multiple = false,
  label = "Upload image",
  className = "",
}) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        const { data } = await api.post("/uploads/image", form, { params: { folder } });
        onUploaded(data.url, data);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <button type="button" className={className} disabled={busy} onClick={() => inputRef.current.click()}>
        {busy ? "Uploading..." : label}
      </button>
      {error && <p style={{ color: "crimson", fontSize: 14 }}>{error}</p>}
    </div>
  );
}
