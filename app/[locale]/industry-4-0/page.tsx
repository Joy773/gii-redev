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
  const t = await getTranslations("industry40Page");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function Industry40Page() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="industry40" />
      <ServiceCapabilities variant="industry40" />
      <ServiceCards variant="industry40" />
      <ProcessTimeline variant="industry40" />
      <Projects
        filterByProjectIds={[
          "industry40OeeDashboard",
          "industry40PredictiveMaintenance",
          "industry40QualityTraceability",
        ]}
        sectionNamespace="industry40Page.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="industry40Page.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
