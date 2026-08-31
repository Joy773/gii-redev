import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Hero from "../../components/common/Hero";
import CTA from "../../components/common/CTA";
import IndustryServices from "../../components/IndustryServices";
import QualificationStrip from "../../components/QualificationStrip";
import ServiceCards from "../../components/ServiceCards";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("industriesPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function IndustriesPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="industries" />
      <ServiceCards variant="industries" />
      <IndustryServices />
      <CTA
        namespace="industriesPage.cta"
        backgroundClassName="grid-surface-soft"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
