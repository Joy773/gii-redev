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
  const t = await getTranslations("softwareDevelopmentPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="softwareDevelopment" />
      <ServiceCapabilities variant="softwareDevelopment" />
      <ServiceCards variant="softwareDevelopment" />
      <ProcessTimeline variant="softwareDevelopment" />
      <Projects
        filterByProjectIds={["publicServiceHub", "smeFieldServiceApp", "hospitalPlanningPlatform"]}
        sectionNamespace="softwareDevelopmentPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="softwareDevelopmentPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
