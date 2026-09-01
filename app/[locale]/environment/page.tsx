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
  const t = await getTranslations("environmentPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function EnvironmentPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="environment" />
      <ServiceCapabilities variant="environment" />
      <ServiceCards variant="environment" />
      <ProcessTimeline variant="environment" />
      <Projects
        filterByProjectIds={["urbanFeeding", "clivent", "environmentalMonitoringNetwork"]}
        sectionNamespace="environmentPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="environmentPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
