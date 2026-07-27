export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-accent font-semibold tracking-widest text-sm mb-3">ABOUT US</p>
      <h1 className="font-display text-4xl font-bold mb-6">About KAB AI</h1>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-3">Our History</h2>
        <p className="text-[--color-text-body] leading-relaxed">
          KAB AI was founded by students at Kabale University passionate about
          artificial intelligence and its potential to transform our community.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-3">Vision</h2>
        <p className="text-[--color-text-body] leading-relaxed">
          A generation of Kabale students empowered by AI to solve local and global challenges.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-3">Mission</h2>
        <p className="text-[--color-text-body] leading-relaxed">
          Equipping students with practical AI skills through workshops, projects, and mentorship.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mb-4">Core Values</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {["Innovation", "Inclusiveness", "Integrity", "Mentorship"].map((v) => (
            <div key={v} className="bg-gradient-to-br from-cream to-cream-dark rounded-xl p-6">
              <h3 className="font-bold mb-2">{v}</h3>
              <p className="text-sm text-[--color-text-body]">
                A core principle guiding how KAB AI operates and grows.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
