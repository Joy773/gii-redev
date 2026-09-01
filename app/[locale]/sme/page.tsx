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
  const t = await getTranslations("smePage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function SmePage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="sme" />
      <ServiceCapabilities variant="sme" />
      <ServiceCards variant="sme" />
      <ProcessTimeline variant="sme" />
      <Projects
        filterByProjectIds={[
          "smeProcurementHub",
          "smeProductionPilot",
          "smeFieldServiceApp",
        ]}
        sectionNamespace="smePage.projects"
        backgroundClassName="bg-[#FFFFFF]"
      />
      <CTA
        namespace="smePage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
