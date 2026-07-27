import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import WorkPreview from "../components/home/WorkPreview";
import EventsPreview from "../components/home/EventsPreview";
import TeamPreview from "../components/home/TeamPreview";
import Partners from "../components/home/Partners";
import Newsletter from "../components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WorkPreview />
      <EventsPreview />
      <TeamPreview />
      <Partners />
      <Newsletter />
    </>
  );
}
