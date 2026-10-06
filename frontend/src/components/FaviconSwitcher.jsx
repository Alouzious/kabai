import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const INDABAX_ICON = "/indabax.png";

export default function FaviconSwitcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    if (link.dataset.origHref === undefined) {
      link.dataset.origHref = link.getAttribute("href") || "";
      link.dataset.origType = link.getAttribute("type") || "";
    }

    if (pathname.startsWith("/indabax")) {
      link.setAttribute("type", "image/png");
      link.setAttribute("href", INDABAX_ICON);
    } else {
      if (link.dataset.origType) link.setAttribute("type", link.dataset.origType);
      else link.removeAttribute("type");
      link.setAttribute("href", link.dataset.origHref);
    }
  }, [pathname]);

  return null;
}
