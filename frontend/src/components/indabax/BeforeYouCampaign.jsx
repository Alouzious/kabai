import { useEffect, useState } from "react";
import { Download, ExternalLink, Loader2, AlertCircle, Package } from "lucide-react";
import api from "../../lib/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const RULES = [
  "Do not put up flyers or social media posts before screening and official approval.",
  "Do not use funny or non-club logos. Use only the official materials provided below.",
  "Download the official campaign materials from Resources before you start.",
];

function typeBadgeClass(label) {
  if (label === "Logo") return "bg-[#17375E]/text-white";
  if (label === "Image") return "bg-[#E8803F] text-white";
  return "bg-[#17375E]/80 text-white";
}

function absoluteApiUrl(path) {
  if (!path) return "#";
  if (path.startsWith("http")) return path;
  // path may be /api/v1/resources/... while API_BASE already ends with /api/v1
  if (path.startsWith("/api/v1/")) {
    const root = API_BASE.replace(/\/api\/v1\/?$/, "");
    return `${root}${path}`;
  }
  return `${API_BASE.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function BeforeYouCampaign() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get("/resources/")
      .then((res) => {
        if (!cancelled) setItems(res.data.items || []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load campaign resources. Please refresh and try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="rounded-xl border border-[#17375E]/20 p-4 md:p-5"
      style={{ backgroundColor: "#F2EFEC" }}
    >
      <h2 className="font-semibold text-[#17375E] text-base md:text-lg">Before you campaign</h2>
      <p className="text-sm text-[#17375E]/75 mt-1 leading-relaxed">
        Follow these rules. Campaigns that break them will not be considered.
      </p>

      <ol className="mt-4 space-y-2.5">
        {RULES.map((rule, i) => (
          <li key={rule} className="flex gap-3 text-sm text-[#17375E]/90 leading-relaxed">
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "#E8803F" }}
            >
              {i + 1}
            </span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 pt-4 border-t border-[#17375E]/15">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-[#17375E] text-sm md:text-base">Resources</h3>
            <p className="text-xs text-[#17375E]/65 mt-0.5">
              Official logos, images, and documents for your campaign.
            </p>
          </div>
          {!loading && !error && items.length > 0 && (
            <a
              href={absoluteApiUrl("/api/v1/resources/download-all")}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-3.5 py-2 rounded-lg text-white transition hover:opacity-90"
              style={{ backgroundColor: "#17375E" }}
            >
              <Package size={15} />
              Download all (ZIP)
            </a>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-[#17375E]/70 py-6 justify-center">
            <Loader2 size={16} className="animate-spin" />
            Loading resources…
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-[#17375E]/60 text-center py-6">No resources yet.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="space-y-2.5">
            {items.map((item) => {
              const isLink = item.category === "document_link";
              const href = isLink
                ? item.external_url
                : absoluteApiUrl(item.download_url);
              return (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg bg-white/80 border border-[#17375E]/10 p-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <p className="font-semibold text-[#17375E] text-sm truncate">{item.title}</p>
                      <span
                        className={`text-[10px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded ${typeBadgeClass(item.type_label)}`}
                      >
                        {item.type_label}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-[#17375E]/65 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={isLink ? "_blank" : undefined}
                      rel={isLink ? "noopener noreferrer" : undefined}
                      download={!isLink ? true : undefined}
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg shrink-0 transition hover:opacity-90"
                      style={{ backgroundColor: "#E8803F", color: "#fff" }}
                    >
                      {isLink ? <ExternalLink size={14} /> : <Download size={14} />}
                      {isLink ? "Open link" : "Download"}
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
