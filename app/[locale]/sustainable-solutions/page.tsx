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
  const t = await getTranslations("sustainableTechnologyPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function SustainableTechnologyPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="sustainableTechnology" />
      <ServiceCapabilities
        variant="sustainableTechnology"
        namespace="sustainableTechnologyPage.capabilities"
      />
      <ServiceCards variant="sustainableTechnology" />
      <ProcessTimeline variant="sustainableTechnology" />
      <Projects
        filterByProjectIds={["mewf", "clivent", "enerbe"]}
        sectionNamespace="sustainableTechnologyPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="sustainableTechnologyPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
