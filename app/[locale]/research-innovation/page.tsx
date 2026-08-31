import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Hero from "../../components/common/Hero";
import CTA from "../../components/common/CTA";
import ProcessTimeline from "../../components/ProcessTimeline";
import QualificationStrip from "../../components/QualificationStrip";
import ServiceCards from "../../components/ServiceCards";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("researchPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function ResearchInnovationPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="research" />
      <ServiceCards variant="research" />
      <ProcessTimeline variant="research" />
      <CTA
        namespace="researchPage.cta"
        backgroundClassName="bg-[#122A3B]"
        primaryButtonKey="startCollaboration"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
