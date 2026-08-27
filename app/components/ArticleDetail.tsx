import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

import {
  formatArticleDate,
  getRelatedArticles,
  type Article,
} from "../data/articles";
import ArticleCard from "./ArticleCard";
import ScrollReveal from "./common/ScrollReveal";

function asStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export default async function ArticleDetail({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) {
  const t = await getTranslations("insightsPage");
  const related = getRelatedArticles(article);
  const itemKey = `items.${article.id}` as const;
  const paragraphs = asStringList(t.raw(`${itemKey}.body`));

  return (
    <>
      <section className="grid-surface grid-surface-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/insights`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-text/65 transition-colors hover:text-primary"
          >
            <FiArrowLeft className="size-4" aria-hidden="true" />
            {t("back")}
          </Link>

          <div className="relative mt-8 h-[22rem] overflow-hidden rounded-3xl border border-border/70 bg-navy shadow-[0_18px_44px_rgba(18,59,86,0.12)] sm:h-[24rem] lg:h-[26rem]">
            <Image
              src={article.image}
              alt={t(`${itemKey}.title`)}
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/88 via-navy/45 to-navy/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                <span className="size-2 rounded-full bg-primary" />
                {t(`types.${article.type}`)}
              </span>
              <ScrollReveal
                playOnMount
                baseOpacity={0.25}
                enableBlur
                baseRotation={4}
                blurStrength={18}
                containerClassName="mt-4 text-left"
                textClassName="max-w-3xl text-left text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {t(`${itemKey}.title`)}
              </ScrollReveal>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/75">
                <FiCalendar className="size-3.5" aria-hidden="true" />
                <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time>
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            <nav
              aria-label={t("onThisPage")}
              className="shrink-0 lg:sticky lg:top-28 lg:w-64"
            >
              <ol className="space-y-1">
                {[
                  { id: "overview", label: t("overview") },
                  { id: "article", label: t("article") },
                ].map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-lg font-medium text-text/70 transition-colors hover:bg-soft-background hover:text-primary"
                    >
                      <span className="font-mono text-sm tabular-nums text-primary/55 transition-colors group-hover:text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 flex-1 space-y-10">
              <article id="overview" className="scroll-mt-28">
                <p className="font-mono text-base font-semibold uppercase tracking-[0.16em] text-primary">
                  01 / {t("overview")}
                </p>
                <p className="mt-4 text-xl leading-9 text-text/80 sm:text-[1.35rem] sm:leading-10">
                  {t(`${itemKey}.excerpt`)}
                </p>
              </article>

              <article
                id="article"
                className="scroll-mt-28 border-t border-border/70 pt-8"
              >
                <p className="font-mono text-base font-semibold uppercase tracking-[0.16em] text-primary">
                  02 / {t("article")}
                </p>
                <div className="mt-4 space-y-6">
                  {paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-xl leading-9 text-text/80 sm:text-[1.35rem] sm:leading-10"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="grid-surface grid-surface-soft py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal
              baseOpacity={0.25}
              enableBlur
              baseRotation={4}
              blurStrength={18}
              containerClassName="text-center sm:text-left"
              textClassName="text-center text-4xl font-semibold tracking-tight text-dark sm:text-left sm:text-5xl"
            >
              {t("related")}
            </ScrollReveal>
            <p className="mt-4 max-w-xl text-lg leading-8 text-text/72">
              {t("relatedDescription")}
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
