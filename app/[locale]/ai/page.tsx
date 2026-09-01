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
  const t = await getTranslations("aiPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function AiPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="ai" />
      <ServiceCapabilities variant="ai" />
      <ServiceCards variant="ai" />
      <ProcessTimeline variant="ai" />
      <Projects
        filterByProjectIds={[
          "aiOperationsAssistant",
          "aiKnowledgeAssistant",
          "aiDocumentProcessing",
        ]}
        sectionNamespace="aiPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="aiPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
