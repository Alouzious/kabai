export default function AboutPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16 border-b border-black/5">
        <p className="text-accent font-semibold tracking-widest text-sm mb-3">
          ABOUT US
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-3xl leading-tight">
          About KAB AI
        </h1>
        <p className="text-[--color-text-body] text-lg md:text-xl leading-relaxed max-w-3xl">
          KAB AI is Kabale University&apos;s student-led artificial intelligence
          community a space where curiosity about AI turns into real skills,
          real projects, and real impact for South Western Uganda.
        </p>
      </section>

      {/* HISTORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-[280px_1fr] gap-10 border-b border-black/5">
        <h2 className="font-display text-2xl md:text-3xl font-bold">
          Our History
        </h2>
        <div className="space-y-5 text-[--color-text-body] leading-relaxed text-base md:text-lg max-w-3xl">
          <p>
            KAB AI was founded by a small group of students at Kabale
            University who kept running into the same problem: there was
            real appetite for artificial intelligence on campus, but almost
            nowhere to learn it hands-on. What started as informal
            weekend meet-ups in the Faculty of Computing sharing notebooks
            and YouTube tutorials has grown into a structured community
            with regular workshops, mentorship, and student-built projects.
          </p>
          <p>
            Today, KAB AI sits within the wider Kabale University tech
            ecosystem alongside initiatives like the Indabax AI Club and
            the MTN Spark Hub, giving members access to a network of
            mentors, hackathons, and real infrastructure rather than just
            theory. Members have gone on to build data science projects,
            contribute to open-source tooling, and represent Kabale
            University at regional AI and developer events.
          </p>
          <p>
            The club remains entirely student-run a deliberate choice
            that keeps it close to what students actually need: practical
            skills, a supportive community, and a reason to keep building
            after the workshop ends.
          </p>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-cream to-cream-dark">
            <h2 className="font-display text-2xl font-bold mb-4">Vision</h2>
            <p className="text-[--color-text-body] leading-relaxed text-lg">
              A generation of Kabale students empowered by AI to solve
              local and global challenges from agriculture and health to
              language and commerce.
            </p>
          </div>
          <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-cream to-cream-dark">
            <h2 className="font-display text-2xl font-bold mb-4">Mission</h2>
            <p className="text-[--color-text-body] leading-relaxed text-lg">
              Equipping students with practical AI skills through
              workshops, hands-on projects, and mentorship taught by
              students, for students.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Workshops",
              body: "Hands-on sessions covering Python, data analysis, machine learning, and applied AI tools built for beginners and sharpened for advanced members.",
            },
            {
              title: "Projects",
              body: "Members team up to build real applications, from data science tools to AI-powered platforms, learning by shipping rather than just studying.",
            },
            {
              title: "Mentorship",
              body: "Experienced members and industry contacts guide newer students through their first models, first repos, and first contributions.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-black/10 rounded-2xl p-7 hover:border-accent/40 transition-colors"
            >
              <h3 className="font-display font-bold text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-[--color-text-body] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">
          Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              name: "Innovation",
              body: "We chase new ideas and aren't afraid to prototype something that hasn't been tried on campus before.",
            },
            {
              name: "Inclusiveness",
              body: "No prior AI experience required every member starts somewhere, and every question is a fair one.",
            },
            {
              name: "Integrity",
              body: "We build and share honestly, giving credit, respecting data, and using AI responsibly.",
            },
            {
              name: "Mentorship",
              body: "Growth compounds when it's shared. Members who learn today teach the next cohort tomorrow.",
            },
          ].map((v) => (
            <div
              key={v.name}
              className="bg-gradient-to-br from-cream to-cream-dark rounded-xl p-6"
            >
              <h3 className="font-bold mb-2">{v.name}</h3>
              <p className="text-sm text-[--color-text-body] leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY / MILESTONES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">
          Our Journey
        </h2>
        <div className="space-y-8">
          {[
            {
              step: "01",
              title: "Informal beginnings",
              body: "A handful of students start meeting weekly to teach each other AI and data science basics.",
            },
            {
              step: "02",
              title: "Structured workshops",
              body: "KAB AI formalizes into a club with regular sessions, a curriculum, and its first cohort of mentors.",
            },
            {
              step: "03",
              title: "Community partnerships",
              body: "Collaboration begins with the Indabax AI Club and MTN Spark Hub, widening access to mentors and events.",
            },
            {
              step: "04",
              title: "Student-built projects",
              body: "Members start shipping real projects and representing Kabale University at regional tech events.",
            },
          ].map((m) => (
            <div key={m.step} className="flex gap-6 md:gap-10">
              <span className="font-display text-2xl md:text-3xl font-bold text-accent w-12 shrink-0">
                {m.step}
              </span>
              <div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {m.title}
                </h3>
                <p className="text-[--color-text-body] leading-relaxed max-w-2xl">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="rounded-2xl bg-gradient-to-br from-cream to-cream-dark p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Want to build with us?
          </h2>
          <p className="text-[--color-text-body] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re writing your first line of Python or shipping
            your fifth model, there&apos;s a place for you at KAB AI.
          </p>
          <button className="bg-accent text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Join KAB AI
          </button>
        </div>
      </section>
    </div>
  );
}