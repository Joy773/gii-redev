import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import CTA from "../../components/common/CTA";
import Hero from "../../components/common/Hero";
import ProcessTimeline from "../../components/ProcessTimeline";
import Projects from "../../components/Projects";
import QualificationStrip from "../../components/QualificationStrip";
import ServiceCapabilities from "../../components/ServiceCapabilities";
import ServiceCards from "../../components/ServiceCards";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("digitalEducationPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function DigitalEducationPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="digitalEducation" />
      <ServiceCapabilities variant="digitalEducation" />
      <ServiceCards variant="digitalEducation" />
      <ProcessTimeline variant="digitalEducation" />
      <Projects
        filterByProjectIds={["mewf", "digitalLearningPlatform", "publicServiceHub"]}
        sectionNamespace="digitalEducationPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="digitalEducationPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
