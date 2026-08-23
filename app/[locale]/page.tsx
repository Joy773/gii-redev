import QualificationStrip from "../components/QualificationStrip";
import Hero from "../components/common/Hero";
import TrustStrip from "../components/common/TrustStrip";
import ServiceCards from "../components/ServiceCards";
import Projects from "../components/Projects";
import GIIGlance from "../components/GIIGlance";
import WhyChooseUs from "../components/WhyChooseUs";
import CTA from "../components/common/CTA";

export default function Home() {
  return (
    <>
      <QualificationStrip />
      <Hero />
      <TrustStrip />
      <ServiceCards />
      <Projects />
      <WhyChooseUs />
      <GIIGlance />
      <CTA />
    </>
  );
}

