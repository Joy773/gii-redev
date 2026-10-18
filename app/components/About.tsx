import CTA from "./common/CTA";
import Hero from "./common/Hero";
import OurStory from "./OurStory";
import ProcessTimeline from "./ProcessTimeline";
import QualificationStrip from "./QualificationStrip";
import BusinessArea from "./BusinessArea";

export default function About() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="about" />
      <OurStory />
      <BusinessArea />
      <ProcessTimeline />
      <CTA namespace="aboutPage.cta" backgroundClassName="grid-surface-soft" />
    </>
  );
}
