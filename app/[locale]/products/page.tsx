import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PhysicalProducts from "../../components/Physical-Products";
import Hero from "../../components/common/Hero";
import Categories from "../../components/common/categories";
import QualificationStrip from "../../components/QualificationStrip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("productsPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default function ProductsPage() {
  return (
    <>
      <QualificationStrip />
      <Hero variant="products" />
      <Categories />
      <PhysicalProducts />
    </>
  );
}
