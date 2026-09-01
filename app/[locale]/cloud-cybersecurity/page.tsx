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
  const t = await getTranslations("cloudCybersecurityPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function CloudCybersecurityPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="cloudCybersecurity" />
      <ServiceCapabilities variant="cloudCybersecurity" />
      <ServiceCards variant="cloudCybersecurity" />
      <ProcessTimeline variant="cloudCybersecurity" />
      <Projects
        filterByProjectIds={[
          "mittelstandCloud",
          "svAkafa",
          "cloudSecurityOperations",
        ]}
        sectionNamespace="cloudCybersecurityPage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="cloudCybersecurityPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
