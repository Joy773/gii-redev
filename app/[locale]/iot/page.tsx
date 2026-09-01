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
  const t = await getTranslations("iotEmbeddedPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function IotEmbeddedPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="iotEmbedded" />
      <ServiceCapabilities variant="iotEmbedded" />
      <ServiceCards variant="iotEmbedded" />
      <ProcessTimeline variant="iotEmbedded" />
      <Projects
        filterByProjectIds={[
          "urbanFeeding",
          "iotUtilityMonitoring",
          "iotIndustrialEdgeGateway",
        ]}
        sectionNamespace="iotEmbeddedPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="iotEmbeddedPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
