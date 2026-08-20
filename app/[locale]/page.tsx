import Hero from "../components/common/Hero";
import TrustStrip from "../components/common/TrustStrip";
import ServiceCards from "../components/ServiceCards";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import CTA from "../components/common/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceCards />
      <Projects />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}

