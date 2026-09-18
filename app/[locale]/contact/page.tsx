import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Contact from "../../components/Contact";
import Hero from "../../components/common/Hero";
import QualificationStrip from "../../components/QualificationStrip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function ContactPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="contact" />
      <Contact />
    </>
  );
}
