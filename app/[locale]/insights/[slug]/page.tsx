import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ArticleDetail from "../../../components/ArticleDetail";
import { ARTICLES, getArticleBySlug } from "../../../data/articles";

export const dynamicParams = true;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

type ArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "GII" };
  }

  const t = await getTranslations("insightsPage");

  return {
    title: `${t(`items.${article.id}.title`)} | GII`,
    description: t(`items.${article.id}.excerpt`),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} locale={locale} />;
}
