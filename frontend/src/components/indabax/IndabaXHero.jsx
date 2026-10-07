import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../lib/api";

const FALLBACK_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
    title: "Powered by Community",
    subtitle: "Proudly affiliated with Deep Learning IndabaX Uganda, part of the pan-African Deep Learning Indaba movement.",
  },
  {
    image: "https://res.cloudinary.com/a2li9op5/image/upload/w_1600,q_auto,f_auto/v1785921057/gallery/indabax/r84i7fnnmgrrp8jaktw8.jpg",
    title: "Unveiling Data Insights",
    subtitle: "Data insights session with Mr. Simon Alex, 29th April 2026.",
  },
  {
    image: "https://res.cloudinary.com/a2li9op5/image/upload/w_1600,q_auto,f_auto/v1785921110/gallery/indabax/g7okm8drptjgwbjrobhv.jpg",
    title: "Unveiling Data Insights",
    subtitle: "Hands-on learning and knowledge sharing at the session.",
  },
  {
    image: "https://res.cloudinary.com/a2li9op5/image/upload/w_1600,q_auto,f_auto/v1785921122/gallery/indabax/tn85cql2mt0ybxch35wl.jpg",
    title: "Unveiling Data Insights",
    subtitle: "A packed room of curious minds ready to explore data.",
  },
  {
    image: "https://res.cloudinary.com/a2li9op5/image/upload/w_1600,q_auto,f_auto/v1785921133/gallery/indabax/ml7fzcrbdnnqdw8hruia.jpg",
    title: "Unveiling Data Insights",
    subtitle: "Connecting theory with real-world data practice.",
  },
];

function toSlide(s) {
  const [title, ...rest] = (s.caption || "").split("|").map((t) => t.trim());
  return { image: s.image_url, title: title || "IndabaX Kabale", subtitle: rest.join(" | ") };
}

export default function IndabaXHero() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    api
      .get("/slides/", { params: { site: "indabax" } })
      .then((res) => {
        const data = (res.data || [])
          .filter((x) => x.is_active !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        if (!alive || data.length === 0) return;
        setSlides(data.map(toSlide));
        setIndex(0);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative text-white px-6 pt-32 md:pt-40 pb-6 md:pb-10 text-center overflow-hidden min-h-[600px] flex items-end">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${i === index ? "animate-zoomfade" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/25 z-10" />

      <button
        onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-indabax-green text-white hover:text-black transition-colors"
      >
        <ChevronLeft size={30} />
      </button>

      <div className="w-full max-w-3xl mx-auto relative z-20">

        {slides.map((slide, i) => (
          <div
            key={`${slide.title}-${i === index ? "active" : "idle"}`}
            className={`transition-all duration-700 ${
              i === index
                ? "opacity-100 translate-y-0 relative"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <div
              style={i === index ? { animationDelay: "1000ms" } : undefined}
              className={`bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 px-5 py-4 md:px-8 md:py-6 shadow-2xl inline-block max-w-full text-left md:text-center ${
                i === index ? "animate-popup" : ""
              }`}
            >
              <h1 className="font-display text-base md:text-2xl font-black leading-tight mb-1 uppercase">
                {slide.title}
              </h1>
              <p className="text-white/80 max-w-xl mx-auto mb-3 text-[11px] md:text-xs leading-relaxed">
                {slide.subtitle}
              </p>
              <Link
                to="/indabax/join"
                className="bg-indabax-green text-indabax-black px-4 py-2 rounded-full font-bold text-[10px] md:text-xs hover:bg-white transition inline-block"
              >
                Join the Community
              </Link>
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "bg-indabax-green w-10" : "bg-white/30 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-indabax-green text-white hover:text-black transition-colors"
      >
        <ChevronRight size={30} />
      </button>
    </section>
  );
}