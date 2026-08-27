"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

import { formatArticleDate, type Article } from "../data/articles";

export default function ArticleCard({
  article,
  className = "",
  style,
}: {
  article: Article;
  className?: string;
  style?: CSSProperties;
}) {
  const t = useTranslations("insightsPage");
  const locale = useLocale();

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-[0_12px_32px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_44px_rgba(18,59,86,0.12)] ${className}`}
      style={style}
    >
      <Link
        href={`/${locale}/insights/${article.slug}`}
        className="flex h-full flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
      >
        <div className="project-card-media project-card-media-photo relative flex h-40 shrink-0 items-end rounded-2xl p-4">
          <Image
            src={article.image}
            alt={t(`items.${article.id}.title`)}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <span className="relative z-10 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {t(`types.${article.type}`)}
          </span>
        </div>

        <div className="mt-5 flex min-h-0 flex-1 flex-col transition-transform duration-300 group-hover:-translate-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-sm text-text/55">
            <FiCalendar className="size-3.5" aria-hidden="true" />
            <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time>
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary">
            {t(`items.${article.id}.title`)}
          </h3>
          <p className="mt-2 text-sm leading-6 text-text/70">
            {t(`items.${article.id}.excerpt`)}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
            {t("readArticle")}
            <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
