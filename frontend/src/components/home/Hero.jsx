import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../lib/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop";

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    preloadImage(FALLBACK_IMAGE);

    api
      .get("/slides/", { params: { site: "main" } })
      .then(async (res) => {
        const data = res.data || [];
        if (data.length === 0) {
          if (mounted.current) setReady(true);
          return;
        }
        await Promise.all(data.map((s) => preloadImage(s.image_url)));
        if (mounted.current) {
          setSlides(data);
          setReady(true);
        }
      })
      .catch(() => {
        if (mounted.current) setReady(true);
      });

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const showFallback = !ready || slides.length === 0;

  return (
    <section className="w-full">
      <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[85vh] overflow-hidden bg-charcoal">
        {showFallback && (
          <img
            src={FALLBACK_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {!showFallback &&
          slides.map((slide, i) => (
            <img
              key={slide.id}
              src={slide.image_url}
              alt={slide.caption || ""}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

        {!showFallback && slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-charcoal/60 hover:bg-accent text-white p-1.5 sm:p-2 rounded-full transition"
            >
              <ChevronLeft size={18} className="sm:hidden" />
              <ChevronLeft size={22} className="hidden sm:block" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-charcoal/60 hover:bg-accent text-white p-1.5 sm:p-2 rounded-full transition"
            >
              <ChevronRight size={18} className="sm:hidden" />
              <ChevronRight size={22} className="hidden sm:block" />
            </button>

            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    i === index ? "bg-accent w-6 sm:w-8" : "bg-white/60 w-1.5 sm:w-2"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {!showFallback && slides[index]?.caption && (
        <div className="bg-charcoal text-white px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/80 text-xs sm:text-sm md:text-base italic leading-relaxed">
              {slides[index].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}