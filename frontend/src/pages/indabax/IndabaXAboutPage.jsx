export default function IndabaXAboutPage() {
  const sections = [
    { id: "history", label: "History" },
    { id: "mission", label: "Vision & Mission" },
    { id: "what-we-do", label: "What We Do" },
    { id: "values", label: "Core Values" },
    { id: "leadership", label: "Leadership" },
    { id: "membership", label: "Membership & Meetings" },
    { id: "connect", label: "Connect" },
  ];

  const objectives = [
    {
      title: "Meetings & Workshops",
      body: "Weekly sessions covering current events in AI, professor talks, tutorials, and hands-on workshops open to every member.",
    },
    {
      title: "Project Collaboration",
      body: "Members form teams to work on programming competitions and online courses between meetings, sharing progress along the way.",
    },
    {
      title: "Hackathon Prep",
      body: "During the semester of the annual IndabaX Uganda Hackathon, the whole club rallies together to build a winning solution.",
    },
    {
      title: "Career Guidance",
      body: "With no formal ML curriculum at the University, the club fills the gap pointing members toward courses, research, and career paths in AI.",
    },
    {
      title: "Capacity Building",
      body: "Through partners, the club works to secure free access to compute resources, research grants, certifications, and conference passes for members.",
    },
    {
      title: "Research & Mentorship",
      body: "Technical workshops and mentorship programs support scientific research and writing among both students and staff members.",
    },
  ];

  const values = [
    ["Innovation", "bringing global AI conversations into local, practical projects"],
    ["Inclusiveness", "open to every student, researcher, staff, and faculty member"],
    ["Integrity", "governed by an open constitution and transparent decision-making"],
    ["Mentorship", "experienced members guide newer ones through their first projects"],
  ];

  const leadership = [
    { role: "President", body: "Leads all club meetings and serves as the main point of contact between the club, the University, and Deep Learning IndabaX Uganda." },
    { role: "Vice President", body: "Stands in for the President whenever they're unavailable, keeping the club running without interruption." },
    { role: "Secretary", body: "Keeps minutes of every meeting and makes them accessible to all members filled only when a member stands for election." },
    { role: "Treasurer", body: "Manages any club funds according to members' wishes, and steps in as secretary if that role is vacant." },
    { role: "Advisor", body: "A full-time faculty or staff member appointed each academic year to guide projects and attend meetings where possible." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="grid lg:grid-cols-[240px_1fr] gap-16">
        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 self-start">
          <p className="text-accent font-semibold tracking-widest text-sm mb-3">
            ABOUT INDABAX
          </p>
          <h1 className="font-display text-3xl font-bold mb-4 leading-tight">
            IndabaX Kabale
          </h1>
          <p className="text-[--color-text-body] text-sm leading-relaxed mb-8">
            A local chapter of Deep Learning IndabaX Uganda, based at Kabale
            University.
          </p>
          <nav className="hidden lg:block">
            <ul className="space-y-1 border-l border-black/10">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block pl-4 py-1.5 text-sm text-[--color-text-body] hover:text-accent hover:border-accent border-l-2 border-transparent -ml-px transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="max-w-2xl">
          <section id="history" className="scroll-mt-24 pb-14">
            <span className="text-accent font-display font-bold text-sm">01</span>
            <h2 className="font-display text-3xl font-bold mt-2 mb-5">
              Our History
            </h2>
            <p className="text-[--color-text-body] leading-relaxed mb-4">
              IndabaX Kabale exists as a local chapter of Deep Learning
              IndabaX Uganda itself part of the continent-wide Deep
              Learning Indaba movement. The club was formed to bring that
              same spirit of community-driven AI learning directly onto
              Kabale University's campus, where machine learning has no
              dedicated curriculum of its own despite growing student
              interest.
            </p>
            <blockquote className="border-l-4 border-accent pl-5 italic text-[--color-text-body] my-6">
              A place of community for discussing, learning about, and
              working on machine learning and AI across disciplines.
            </blockquote>
            <p className="text-[--color-text-body] leading-relaxed">
              Since its founding, the club has run as a fully constituted,
              member-led organization, with an elected Executive Board,
              regular meet-ups, and a formal relationship with the national
              IndabaX body. Every academic year, members elect new
              leadership, hold weekly sessions, and rally the whole club
              around the annual IndabaX Uganda Hackathon.
            </p>
          </section>

          <section id="mission" className="scroll-mt-24 py-14 border-t border-black/10">
            <span className="text-accent font-display font-bold text-sm">02</span>
            <h2 className="font-display text-3xl font-bold mt-2 mb-5">
              Vision &amp; Mission
            </h2>
            <p className="text-[--color-text-body] leading-relaxed">
              <span className="font-display font-bold text-[--color-text-body]">Vision: </span>
              a thriving AI community in Kabale, connected to the broader
              African AI movement, where machine learning is a natural part
              of campus life rather than a niche interest.
            </p>
            <p className="text-[--color-text-body] leading-relaxed mt-4">
              <span className="font-display font-bold text-[--color-text-body]">Mission: </span>
              to serve as a place of community for discussing, learning, and
              working on machine learning and AI across disciplines,
              strengthening ML/AI knowledge throughout Kabale University and
              its wider community.
            </p>
          </section>

          <section id="what-we-do" className="scroll-mt-24 py-14 border-t border-black/10">
            <span className="text-accent font-display font-bold text-sm">03</span>
            <h2 className="font-display text-3xl font-bold mt-2 mb-8">
              What We Do
            </h2>
            <ol className="space-y-6">
              {objectives.map((o, i) => (
                <li key={o.title} className="flex gap-4">
                  <span className="text-accent font-display font-bold shrink-0 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[--color-text-body] leading-relaxed">
                    <span className="font-semibold text-black">{o.title}.</span>{" "}
                    {o.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section id="values" className="scroll-mt-24 py-14 border-t border-black/10">
            <span className="text-accent font-display font-bold text-sm">04</span>
            <h2 className="font-display text-3xl font-bold mt-2 mb-6">
              Core Values
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {values.map(([name, body]) => (
                <div key={name}>
                  <dt className="font-display font-bold mb-1">{name}</dt>
                  <dd className="text-sm text-[--color-text-body] leading-relaxed">
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="leadership" className="scroll-mt-24 py-14 border-t border-black/10">
            <span className="text-accent font-display font-bold text-sm">05</span>
            <h2 className="font-display text-3xl font-bold mt-2 mb-3">
              Leadership
            </h2>
            <p className="text-[--color-text-body] leading-relaxed mb-8">
              The club is run by an Executive Board elected annually every
              December, supported by a faculty advisor who guides project
              selection and connects members with Deep Learning IndabaX
              Uganda.
            </p>
            <div className="divide-y divide-black/10">
              {leadership.map((l) => (
                <div key={l.role} className="py-4 grid sm:grid-cols-[160px_1fr] gap-2">
                  <h3 className="font-display font-bold">{l.role}</h3>
                  <p className="text-sm text-[--color-text-body] leading-relaxed">
                    {l.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="membership" className="scroll-mt-24 py-14 border-t border-black/10">
            <span className="text-accent font-display font-bold text-sm">06</span>
            <h2 className="font-display text-3xl font-bold mt-2 mb-5">
              Membership &amp; Meetings
            </h2>
            <p className="text-[--color-text-body] leading-relaxed mb-4">
              Any student, researcher, staff, or faculty member at Kabale
              University is welcome to join regardless of race, religion,
              sex, ability, national origin, color, age, or veteran status.
              Committee and Executive Board positions are open to any
              student member who wants to step up.
            </p>
            <p className="text-[--color-text-body] leading-relaxed">
              All-member meet-ups happen at least weekly, with extra
              sessions scheduled for project work as needed. Notice of
              official business goes out by email at least four days ahead,
              so every member has a chance to weigh in.
            </p>
          </section>

          <section id="connect" className="scroll-mt-24 pt-14 border-t border-black/10">
            <div className="bg-gradient-to-br from-cream to-cream-dark rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-display text-xl font-bold mb-2">
                  Join the movement
                </h2>
                <p className="text-[--color-text-body] text-sm leading-relaxed max-w-sm">
                  Part of the wider Deep Learning Indaba community across the
                  continent. Come learn, build, and compete with us.
                </p>
              </div>
              <a
                href="mailto:indabaxug@gmail.com"
                className="bg-accent text-white font-semibold px-7 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap text-center"
              >
                Get in Touch
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}