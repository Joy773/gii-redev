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
  const t = await getTranslations("waterPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function WaterPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="water" />
      <ServiceCapabilities variant="water" />
      <ServiceCards variant="water" />
      <ProcessTimeline variant="water" />
      <Projects
        filterByProjectIds={["mewf", "urbanFeeding", "waterNetworkMonitoring"]}
        sectionNamespace="waterPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="waterPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
