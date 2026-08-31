import { motion } from "framer-motion";
import { Database, Download, FileSpreadsheet } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function DatasetsPage() {
  return (
    <div className="bg-white">
      <div className="bg-charcoal text-white px-4 sm:px-6 py-16 sm:py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-3 uppercase">Open Data</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Datasets</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Curated, open datasets from KAB AI research and community projects — ready to download, explore and build upon.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border border-border-soft rounded-2xl p-10 sm:p-14 text-center bg-cream/30">
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Database size={32} className="text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">Coming Soon</h2>
          <p className="text-text-body max-w-xl mx-auto mb-8">
            Our first datasets are being prepared for release. Check back soon for downloadable CSV, JSON and image datasets from our projects and publications.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 border border-border-soft">
              <FileSpreadsheet size={20} className="text-accent mb-2" />
              <p className="font-semibold text-sm">Tabular Data</p>
              <p className="text-xs text-text-body">CSV & Excel</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-border-soft">
              <Database size={20} className="text-accent mb-2" />
              <p className="font-semibold text-sm">Research Data</p>
              <p className="text-xs text-text-body">JSON & Parquet</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-border-soft">
              <Download size={20} className="text-accent mb-2" />
              <p className="font-semibold text-sm">Open Access</p>
              <p className="text-xs text-text-body">Free download</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
