import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Contact from "../../components/Contact";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function ContactPage() {
  return <Contact />;
}
