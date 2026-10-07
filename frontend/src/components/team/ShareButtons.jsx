import { useState } from "react";
import { FaLink, FaShareNodes } from "react-icons/fa6";

export default function ShareButtons({ url, title, btnClass }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (e) {
        if (e.name === "AbortError") return;
      }
    }
    copy();
  }

  const base = `inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${btnClass}`;

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={copy} className={base}>
        <FaLink size={14} /> {copied ? "Link copied!" : "Copy link"}
      </button>
      <button type="button" onClick={share} className={base}>
        <FaShareNodes size={14} /> Share
      </button>
    </div>
  );
}
