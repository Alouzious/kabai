export default function IndabaXAboutPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16 border-b border-black/5">
        <p className="text-accent font-semibold tracking-widest text-sm mb-3">
          ABOUT INDABAX
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-3xl leading-tight">
          About IndabaX Kabale
        </h1>
        <p className="text-[--color-text-body] text-lg md:text-xl leading-relaxed max-w-3xl">
          IndabaX Uganda Artificial Intelligence Club — Kabale chapter — is a
          community for students, researchers, staff, and faculty to learn,
          discuss, and build in machine learning and AI, as part of the wider
          Deep Learning IndabaX Uganda network.
        </p>
      </section>

      {/* HISTORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-[280px_1fr] gap-10 border-b border-black/5">
        <h2 className="font-display text-2xl md:text-3xl font-bold">
          Our History
        </h2>
        <div className="space-y-5 text-[--color-text-body] leading-relaxed text-base md:text-lg max-w-3xl">
          <p>
            IndabaX Kabale exists as a local chapter of Deep Learning IndabaX
            Uganda — itself part of the continent-wide Deep Learning Indaba
            movement. The club was formed to bring that same spirit of
            community-driven AI learning directly onto Kabale University's
            campus, where machine learning has no dedicated curriculum of
            its own despite growing student interest.
          </p>
          <p>
            Since its founding, the club has run as a fully constituted,
            member-led organization, with an elected Executive Board,
            regular meet-ups, and a formal relationship with the national
            IndabaX body. Every academic year, members elect new leadership,
            hold weekly sessions, and rally the whole club around the
            annual IndabaX Uganda Hackathon.
          </p>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-cream to-cream-dark">
            <h2 className="font-display text-2xl font-bold mb-4">Vision</h2>
            <p className="text-[--color-text-body] leading-relaxed text-lg">
              A thriving AI community in Kabale, connected to the broader
              African AI movement — where machine learning is a natural part
              of campus life, not a niche interest.
            </p>
          </div>
          <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-cream to-cream-dark">
            <h2 className="font-display text-2xl font-bold mb-4">Mission</h2>
            <p className="text-[--color-text-body] leading-relaxed text-lg">
              To serve as a place of community for discussing, learning, and
              working on machine learning and AI across disciplines —
              strengthening ML/AI knowledge throughout Kabale University and
              its wider community.
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
              body: "With no formal ML curriculum at the University, the club fills the gap — pointing members toward courses, research, and career paths in AI.",
            },
            {
              title: "Capacity Building",
              body: "Through partners, the club works to secure free access to compute resources, research grants, certifications, and conference passes for members.",
            },
            {
              title: "Research & Mentorship",
              body: "Technical workshops and mentorship programs support scientific research and writing among both students and staff members.",
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
              body: "We bring global AI conversations into local, practical projects — always building, not just discussing.",
            },
            {
              name: "Inclusiveness",
              body: "Open to every student, researcher, staff, and faculty member — no background in AI required to join.",
            },
            {
              name: "Integrity",
              body: "Governed by an open constitution, elected leadership, and transparent decision-making at every meeting.",
            },
            {
              name: "Mentorship",
              body: "Experienced members and advisors guide newer ones through their first projects, papers, and competitions.",
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

      {/* LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Leadership
        </h2>
        <p className="text-[--color-text-body] leading-relaxed max-w-2xl mb-10">
          The club is run by an Executive Board elected annually every
          December, supported by a faculty advisor who guides project
          selection and connects members with Deep Learning IndabaX Uganda.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              role: "President",
              body: "Leads all club meetings and serves as the main point of contact between the club, the University, and Deep Learning IndabaX Uganda.",
            },
            {
              role: "Vice President",
              body: "Stands in for the President whenever they're unavailable, keeping the club running without interruption.",
            },
            {
              role: "Secretary",
              body: "Keeps minutes of every meeting and makes them accessible to all members — filled only when a member stands for election.",
            },
            {
              role: "Treasurer",
              body: "Manages any club funds according to members' wishes, and steps in as secretary if that role is vacant.",
            },
            {
              role: "Advisor",
              body: "A full-time faculty or staff member appointed each academic year to guide projects and attend meetings where possible.",
            },
          ].map((l) => (
            <div key={l.role} className="rounded-2xl p-7 border border-black/10">
              <h3 className="font-display font-bold text-lg mb-2">
                {l.role}
              </h3>
              <p className="text-sm text-[--color-text-body] leading-relaxed">
                {l.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP + MEETINGS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-black/5">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              Membership
            </h2>
            <p className="text-[--color-text-body] leading-relaxed">
              Any student, researcher, staff, or faculty member at Kabale
              University is welcome to join — regardless of race, religion,
              sex, ability, national origin, color, age, or veteran status.
              Committee and Executive Board positions are open to any
              student member who wants to step up.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              Meetings
            </h2>
            <p className="text-[--color-text-body] leading-relaxed">
              All-member meet-ups happen at least weekly, with extra
              sessions scheduled for project work as needed. Notice of
              official business goes out by email at least four days ahead,
              so every member has a chance to weigh in.
            </p>
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="rounded-2xl bg-gradient-to-br from-cream to-cream-dark p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Join the movement
          </h2>
          <p className="text-[--color-text-body] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            IndabaX Kabale is part of the wider Deep Learning Indaba
            community across the continent. Come learn, build, and compete
            with us.
          </p>
          <a
            href="mailto:indabaxug@gmail.com"
            className="bg-accent text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}