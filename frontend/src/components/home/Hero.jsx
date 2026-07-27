import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
    title: "Building AI Skills for the Next Generation",
    subtitle:
      "KAB AI is a student-led community advancing artificial intelligence education, research and innovation at Kabale University and beyond.",
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    title: "Learning Through Hands-On Projects",
    subtitle:
      "From machine learning to data science, our members build real solutions to real problems facing our community.",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    title: "A Community of Builders and Innovators",
    subtitle:
      "Workshops, hackathons and mentorship join a growing network of students shaping the future of AI in Africa.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative text-white px-6 py-28 md:py-36 text-center overflow-hidden min-h-[560px] flex items-center">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${
              i === index ? "animate-zoomfade" : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal z-10" />

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
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              {slide.title}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        ))}

        <div className="flex gap-4 justify-center flex-wrap mt-2">
          <Link to="/contact" className="bg-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition">
            Join Us
          </Link>
          <Link to="/projects" className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            See Our Work
          </Link>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "bg-accent w-8" : "bg-white/30 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
