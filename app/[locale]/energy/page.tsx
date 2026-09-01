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
  const t = await getTranslations("energyPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function EnergyPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="energy" />
      <ServiceCapabilities variant="energy" />
      <ServiceCards variant="energy" />
      <ProcessTimeline variant="energy" />
      <Projects
        filterByProjectIds={["enerbe", "clivent", "buildingEnergyMonitoring"]}
        sectionNamespace="energyPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="energyPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
