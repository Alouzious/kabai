import { useState } from "react";
import AdminResourcePage from "./AdminResourcePage";
import BulkAddGalleryImages from "../components/BulkAddGalleryImages";

export default function AdminGallery() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <BulkAddGalleryImages onAdded={() => setRefreshKey((k) => k + 1)} />
      <AdminResourcePage resourceKey="gallery" key={refreshKey} />
    </div>
  );
}
