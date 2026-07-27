export default function IndabaXAboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-accent font-semibold tracking-widest text-sm mb-3">ABOUT INDABAX</p>
      <h1 className="font-display text-4xl font-bold mb-6">About IndabaX Kabale</h1>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-3">Our History</h2>
        <p className="text-[--color-text-body] leading-relaxed">
          IndabaX Kabale began as a local extension of the Deep Learning Indaba
          movement, bringing global AI conversations to students right here at
          Kabale University.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-3">Vision</h2>
        <p className="text-[--color-text-body] leading-relaxed">
          A thriving AI community in Kabale, connected to the broader African AI movement.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-3">Mission</h2>
        <p className="text-[--color-text-body] leading-relaxed">
          Hosting workshops, talks, and hackathons that make AI knowledge accessible locally.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mb-4">Core Values</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {["Innovation", "Inclusiveness", "Integrity", "Mentorship"].map((v) => (
            <div key={v} className="bg-gradient-to-br from-cream to-cream-dark rounded-xl p-6">
              <h3 className="font-bold mb-2">{v}</h3>
              <p className="text-sm text-[--color-text-body]">
                A core principle guiding how IndabaX Kabale operates and grows.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
