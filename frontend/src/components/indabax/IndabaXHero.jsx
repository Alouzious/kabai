import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    title: "IndabaX Kabale",
    subtitle: "The Kabale chapter of the IndabaX Uganda Artificial Intelligence Club a community for discussing, learning and building in ML/AI.",
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    title: "Learn. Build. Share.",
    subtitle: "Weekly meetings, professor talks, workshops and hands-on project work across disciplines.",
  },
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

export default function IndabaXHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative text-white px-6 py-32 md:py-40 text-center overflow-hidden min-h-[600px] flex items-center">
      {SLIDES.map((slide, i) => (
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

      <div className="absolute inset-0 bg-black/35 z-10" />

      <button
        onClick={() => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-indabax-green text-white hover:text-black transition-colors"
      >
        <ChevronLeft size={30} />
      </button>

      <div className="max-w-4xl mx-auto relative z-20 w-full">

        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`transition-all duration-700 ${
              i === index
                ? "opacity-100 translate-y-0 relative"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <h1 className="font-display text-5xl md:text-8xl font-black leading-none mb-8 uppercase">
              {slide.title}
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        ))}

        <Link
          to="/indabax/join"
          className="bg-indabax-green text-indabax-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition inline-block"
        >
          Join the Community
        </Link>

        <div className="flex justify-center gap-2 mt-12">
          {SLIDES.map((_, i) => (
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
        onClick={() => setIndex((prev) => (prev + 1) % SLIDES.length)}
        aria-label="Next slide"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-indabax-green text-white hover:text-black transition-colors"
      >
        <ChevronRight size={30} />
      </button>
    </section>
  );
}