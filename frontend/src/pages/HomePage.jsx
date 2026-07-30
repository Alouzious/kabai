import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import CoreValues from "../components/home/CoreValues";
import Partners from "../components/home/Partners";
import BlogPreview from "../components/home/BlogPreview";
import Newsletter from "../components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <CoreValues />
      <Partners />
      <BlogPreview />
      <Newsletter />
    </>
  );
}