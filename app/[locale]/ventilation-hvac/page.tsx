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
  const t = await getTranslations("ventilationHvacPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function VentilationHvacPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="ventilationHvac" />
      <ServiceCapabilities variant="ventilationHvac" />
      <ServiceCards variant="ventilationHvac" />
      <ProcessTimeline variant="ventilationHvac" />
      <Projects
        filterByProjectIds={["clivent", "buildingEnergyMonitoring", "hvacOperationsMonitoring"]}
        sectionNamespace="ventilationHvacPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="ventilationHvacPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
