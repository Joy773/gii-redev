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
  const t = await getTranslations("ecommercePage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function EcommercePage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="ecommerce" />
      <ServiceCapabilities variant="ecommerce" />
      <ServiceCards variant="ecommerce" />
      <ProcessTimeline variant="ecommerce" />
      <Projects
        filterByProjectIds={["germanCare", "smeProcurementHub", "digitalCommerceMarketplace"]}
        sectionNamespace="ecommercePage.projects"
        backgroundClassName="grid-surface-white"
      />
      <CTA
        namespace="ecommercePage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
