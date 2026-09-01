import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Hero from "../../components/common/Hero";
import CTA from "../../components/common/CTA";
import ProcessTimeline from "../../components/ProcessTimeline";
import Projects from "../../components/Projects";
import QualificationStrip from "../../components/QualificationStrip";
import ServiceCapabilities from "../../components/ServiceCapabilities";
import ServiceCards from "../../components/ServiceCards";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("digitalizationForEnterprisesPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function DigitalTransformationPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="digitalizationForEnterprises" />
      <ServiceCapabilities variant="digitalizationForEnterprises" />
      <ServiceCards variant="digitalizationForEnterprises" />
      <ProcessTimeline variant="digitalizationForEnterprises" />
      <Projects
        filterByProjectIds={["nexaOps", "mittelstandCloud", "publicServiceHub"]}
        sectionNamespace="digitalizationForEnterprisesPage.projects"
        backgroundClassName="bg-[#FFFFFF]"
      />
      <CTA
        namespace="digitalizationForEnterprisesPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
