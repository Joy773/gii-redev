import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import About from "../../components/About";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function AboutPage() {
  return <About />;
}
