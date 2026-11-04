import { useEffect, useState } from "react";
import api from "./api";

// Returns null while loading, then the setting's value as a string ("" if missing).
export function useSetting(name) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    let alive = true;
    api
      .get("/settings/")
      .then((res) => alive && setValue(res.data[name] ?? ""))
      .catch(() => alive && setValue(""));
    return () => {
      alive = false;
    };
  }, [name]);

  return value;
}
