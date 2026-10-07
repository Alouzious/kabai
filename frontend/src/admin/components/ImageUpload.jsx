import { useRef, useState } from "react";
import api from "../../lib/api";

const MAX_SIDE = 2000; // longest side (px) after shrinking
const SKIP_BELOW = 1.5 * 1024 * 1024; // smaller files are sent untouched
const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";
const ALLOWED = ACCEPT.split(",");

function isHeic(file) {
  return /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
}

function looksLikeImage(file) {
  return file.type.startsWith("image/") || isHeic(file) || /\.(jpe?g|png|webp|gif)$/i.test(file.name);
}

function byName(a, b) {
  return a.name.localeCompare(b.name, undefined, { numeric: true });
}

function readAllEntries(reader) {
  return new Promise((resolve, reject) => {
    const all = [];
    const next = () =>
      reader.readEntries((batch) => {
        if (!batch.length) return resolve(all);
        all.push(...batch);
        next();
      }, reject);
    next();
  });
}

async function filesFromEntry(entry) {
  if (entry.isFile) {
    return new Promise((resolve) => entry.file((f) => resolve([f]), () => resolve([])));
  }
  if (entry.isDirectory) {
    const entries = await readAllEntries(entry.createReader());
    const nested = await Promise.all(entries.map(filesFromEntry));
    return nested.flat();
  }
  return [];
}

// Must be called straight from the drop handler (before any await).
async function collectDropped(dt) {
  const items = Array.from(dt.items || []);
  if (items.length && items[0].webkitGetAsEntry) {
    const entries = items.map((i) => i.webkitGetAsEntry()).filter(Boolean);
    const nested = await Promise.all(entries.map(filesFromEntry));
    return nested.flat().filter(looksLikeImage).sort(byName);
  }
  return Array.from(dt.files || []).filter(looksLikeImage).sort(byName);
}

async function shrink(file) {
  if (file.type === "image/gif" || file.size < SKIP_BELOW) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
    if (bitmap.close) bitmap.close();

    const type = file.type === "image/jpeg" ? "image/jpeg" : "image/webp";
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, 0.85));
    if (!blob || blob.type !== type || blob.size >= file.size) return file;

    const ext = type === "image/jpeg" ? "jpg" : "webp";
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + "." + ext, { type });
  } catch {
    return file; // browser couldn't read it: send the original
  }
}

function errorText(err) {
  const detail = err.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (err.response?.status === 413) return "File is too large";
  if (err.response?.status === 401) return "Session expired, please log in again";
  return "Upload failed";
}

export default function ImageUpload({
  folder = "kabai",
  onUploaded,
  multiple = false,
  label = "Upload image",
  className = "",
  dropzone = false,
  folderButton = false,
}) {
  const inputRef = useRef(null);
  const folderRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [problems, setProblems] = useState([]);
  const [okCount, setOkCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  async function processFiles(list) {
    let files = Array.from(list || []);
    if (!files.length) return;
    if (!multiple) files = files.slice(0, 1);

    setBusy(true);
    setProblems([]);
    setOkCount(0);
    setProgress({ done: 0, total: files.length });

    const issues = [];
    let ok = 0;

    for (let i = 0; i < files.length; i++) {
      const original = files[i];
      setProgress({ done: i, total: files.length });

      if (isHeic(original)) {
        issues.push(`${original.name}: HEIC photos aren't supported. Convert to JPG first.`);
        continue;
      }
      if (!ALLOWED.includes(original.type)) {
        issues.push(`${original.name}: only JPG, PNG, WEBP or GIF images are allowed.`);
        continue;
      }

      try {
        const file = await shrink(original);
        const form = new FormData();
        form.append("file", file);
        const { data } = await api.post("/uploads/image", form, { params: { folder } });
        onUploaded(data.url, data);
        ok++;
      } catch (err) {
        issues.push(`${original.name}: ${errorText(err)}`);
      }
    }

    setProgress({ done: files.length, total: files.length });
    setProblems(issues);
    setOkCount(ok);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    if (folderRef.current) folderRef.current.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (busy) return;
    collectDropped(e.dataTransfer).then((files) => {
      if (files.length === 0) {
        setProblems(["No photos found in what you dropped."]);
        setOkCount(0);
        return;
      }
      processFiles(files);
    });
  }

  function handleFolderPick(e) {
    const files = Array.from(e.target.files || []).filter(looksLikeImage).sort(byName);
    if (files.length === 0) {
      setProblems(["No photos found in that folder."]);
      setOkCount(0);
      return;
    }
    processFiles(files);
  }

  const busyLabel =
    progress.total > 1
      ? `Uploading ${Math.min(progress.done + 1, progress.total)} of ${progress.total}…`
      : "Uploading…";

  const openPicker = () => inputRef.current && inputRef.current.click();
  const openFolder = () => folderRef.current && folderRef.current.click();

  const dragProps = {
    onDragOver: (e) => {
      e.preventDefault();
      setDragOver(true);
    },
    onDragLeave: () => setDragOver(false),
    onDrop: handleDrop,
  };

  return (
    <div {...dragProps} style={dragOver && !dropzone ? { outline: "2px dashed #999", outlineOffset: 4 } : undefined}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple={multiple}
        onChange={(e) => processFiles(Array.from(e.target.files || []).sort(byName))}
        style={{ display: "none" }}
      />
      {folderButton && (
        <input
          ref={folderRef}
          type="file"
          multiple
          // lets the user pick a whole folder
          {...{ webkitdirectory: "" }}
          onChange={handleFolderPick}
          style={{ display: "none" }}
        />
      )}

      {dropzone ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !busy && openPicker()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !busy && openPicker()}
          className={`border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm cursor-pointer transition-colors ${
            dragOver ? "border-accent bg-accent/10" : "border-border-soft hover:border-accent"
          } ${busy ? "opacity-60 cursor-wait" : ""}`}
        >
          {busy
            ? busyLabel
            : `${label}: click to choose, or drop ${multiple ? "photos or a whole folder" : "a photo"} here`}
        </div>
      ) : (
        <button type="button" className={className} disabled={busy} onClick={openPicker}>
          {busy ? busyLabel : label}
        </button>
      )}

      {folderButton && !busy && (
        <button
          type="button"
          onClick={openFolder}
          className="text-sm underline text-text-body hover:text-charcoal mt-2"
        >
          or choose a folder
        </button>
      )}

      {!busy && okCount > 0 && problems.length === 0 && (
        <p style={{ color: "seagreen", fontSize: 13, marginTop: 6 }}>
          ✓ {okCount} {okCount === 1 ? "photo" : "photos"} uploaded
        </p>
      )}

      {!busy && problems.length > 0 && (
        <div style={{ color: "crimson", fontSize: 13, marginTop: 6 }}>
          {okCount > 0 && (
            <p>
              ✓ {okCount} uploaded, but {problems.length} failed:
            </p>
          )}
          {problems.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
