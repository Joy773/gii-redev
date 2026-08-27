"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowRight, FiCalendar, FiCheck, FiChevronDown, FiSearch, FiX } from "react-icons/fi";

import {
  ARTICLES,
  ARTICLE_TYPES,
  formatArticleDate,
  type ArticleType,
} from "../data/articles";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ArticleCard from "./ArticleCard";

function revealClass(visible: boolean) {
  return visible ? "section-fade section-fade-visible" : "section-fade";
}

type FilterType = "all" | ArticleType;

export default function Articles() {
  const t = useTranslations("insightsPage");
  const locale = useLocale();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<FilterType>("all");
  const [typeOpen, setTypeOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  const typeLabel = (id: FilterType) => (id === "all" ? t("filters.all") : t(`types.${id}`));

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...ARTICLES]
      .filter((article) => {
        if (type !== "all" && article.type !== type) return false;
        if (!normalizedQuery) return true;

        const haystack = [
          t(`items.${article.id}.title`),
          t(`items.${article.id}.excerpt`),
          t(`types.${article.type}`),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [query, type, t]);

  const featured = ARTICLES.find((article) => article.featured);
  const showFeatured =
    Boolean(featured) &&
    type === "all" &&
    query.trim() === "" &&
    filteredArticles.some((article) => article.id === featured?.id);
  const gridArticles = showFeatured
    ? filteredArticles.filter((article) => article.id !== featured?.id)
    : filteredArticles;

  useEffect(() => {
    if (!typeOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!typeRef.current?.contains(event.target as Node)) {
        setTypeOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [typeOpen]);

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="grid-surface grid-surface-soft scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-30 rounded-[1.75rem] border border-border/70 bg-surface/80 p-3 shadow-[0_12px_40px_rgba(18,59,86,0.06)] backdrop-blur-xl sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{t("filters.searchAria")}</span>
              <FiSearch
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-text/40"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("filters.searchPlaceholder")}
                className="w-full rounded-2xl border border-transparent bg-soft-background py-3.5 pr-12 pl-11 text-sm text-dark outline-none transition-[border,box-shadow,background] placeholder:text-text/40 focus:border-primary/25 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(49,121,171,0.12)]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-text/45 transition-colors hover:bg-border/40 hover:text-dark"
                  aria-label={t("filters.clearSearch")}
                >
                  <FiX className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </label>

            <div ref={typeRef} className="relative w-full lg:w-[22rem] lg:shrink-0">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={typeOpen}
                aria-label={t("filters.aria")}
                onClick={() => setTypeOpen((open) => !open)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent bg-soft-background py-3.5 pr-4 pl-4 text-left text-sm font-medium text-dark outline-none transition-[border,box-shadow,background] hover:bg-surface focus:border-primary/25 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(49,121,171,0.12)]"
              >
                <span className="min-w-0 truncate">{typeLabel(type)}</span>
                <FiChevronDown
                  className={`size-4 shrink-0 text-text/45 transition-transform duration-200 ${
                    typeOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {typeOpen ? (
                <ul
                  role="listbox"
                  aria-label={t("filters.aria")}
                  className="absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-border/70 bg-surface p-1.5 shadow-[0_18px_50px_rgba(18,59,86,0.14)]"
                >
                  {(["all", ...ARTICLE_TYPES] as const).map((id) => {
                    const selected = type === id;
                    return (
                      <li key={id} role="option" aria-selected={selected}>
                        <button
                          type="button"
                          onClick={() => {
                            setType(id);
                            setTypeOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                            selected
                              ? "bg-primary/10 font-semibold text-primary"
                              : "font-medium text-text/75 hover:bg-soft-background hover:text-dark"
                          }`}
                        >
                          <span>{typeLabel(id)}</span>
                          {selected ? <FiCheck className="size-4 shrink-0" aria-hidden="true" /> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-text/50">
          {t("filters.resultCount", { count: filteredArticles.length })}
        </p>

        {showFeatured && featured ? (
          <Link
            href={`/${locale}/insights/${featured.slug}`}
            className={`group mt-5 grid overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-[0_12px_32px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_44px_rgba(18,59,86,0.12)] lg:grid-cols-[1.15fr_1fr] ${revealClass(isVisible)}`}
          >
            <div className="project-card-media project-card-media-photo relative min-h-[16rem] lg:min-h-[22rem]">
              <Image
                src={featured.image}
                alt={t(`items.${featured.id}.title`)}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/20" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {t(`types.${featured.type}`)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-text/55">
                  <FiCalendar className="size-3.5" aria-hidden="true" />
                  <time dateTime={featured.date}>{formatArticleDate(featured.date, locale)}</time>
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                {t(`items.${featured.id}.title`)}
              </h2>
              <p className="mt-3 text-base leading-7 text-text/70">
                {t(`items.${featured.id}.excerpt`)}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {t("readArticle")}
                <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ) : null}

        {gridArticles.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gridArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                className={revealClass(isVisible)}
                style={{ transitionDelay: `${320 + index * 100}ms` }}
              />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="mt-5 rounded-[1.75rem] border border-dashed border-border/80 bg-surface/50 px-6 py-16 text-center">
            <p className="text-base font-medium text-dark">{t("filters.empty")}</p>
            <p className="mt-2 text-sm text-text/55">{t("filters.emptyHint")}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
