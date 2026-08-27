import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Hero from "../../components/common/Hero";
import Projects from "../../components/Projects";
import QualificationStrip from "../../components/QualificationStrip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function ProjectsPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="projects" />
      <Projects hideViewAll showFilters />
    </>
  );
}
