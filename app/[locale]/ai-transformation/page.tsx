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
  const t = await getTranslations("aiTransformationPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function AiTransformationPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="aiTransformation" />
      <ServiceCapabilities variant="aiTransformation" />
      <ServiceCards variant="aiTransformation" />
      <ProcessTimeline variant="aiTransformation" />
      <Projects
        filterByProjectIds={[
          "nexaOps",
          "aiOperationsAssistant",
          "aiQualityAnalytics",
        ]}
        sectionNamespace="aiTransformationPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="aiTransformationPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
