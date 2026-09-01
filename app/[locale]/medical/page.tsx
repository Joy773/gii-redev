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
  const t = await getTranslations("medicalTechnologyPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function MedicalTechnologyPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="medicalTechnology" />
      <ServiceCapabilities variant="medicalTechnology" />
      <ServiceCards variant="medicalTechnology" />
      <ProcessTimeline variant="medicalTechnology" />
      <Projects
        filterByProjectIds={[
          "germanCare",
          "medicalDeviceMonitoring",
          "hospitalPlanningPlatform",
        ]}
        sectionNamespace="medicalTechnologyPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="medicalTechnologyPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
