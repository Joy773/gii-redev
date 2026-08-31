import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Consultancies from "../../components/Consultancies";
import CTA from "../../components/common/CTA";
import Hero from "../../components/common/Hero";
import ProcessTimeline from "../../components/ProcessTimeline";
import QualificationStrip from "../../components/QualificationStrip";
import ServiceCards from "../../components/ServiceCards";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("consultancyPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function ConsultancyPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="consultancy" />
      <Consultancies />
      <ServiceCards variant="consultancy" />
      <ProcessTimeline variant="consultancy" />
      <CTA
        namespace="consultancyPage.cta"
        backgroundClassName="bg-[#0B1F2C]"
        primaryButtonKey="bookConsultancySession"
        secondaryButtonKey="viewProjects"
        secondaryHref="/projects"
      />
    </>
  );
}
