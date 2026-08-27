import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Articles from "../../components/Articles";
import Hero from "../../components/common/Hero";
import QualificationStrip from "../../components/QualificationStrip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("insightsPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function InsightsPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="insights" />
      <Articles />
    </>
  );
}
