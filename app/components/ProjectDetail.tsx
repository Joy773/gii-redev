import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";

import { PROJECTS, type Project } from "../data/projects";
import CTA from "./common/CTA";
import ScrollReveal from "./common/ScrollReveal";
import RelatedProjects from "./RelatedProjects";

const CONTENT_SECTIONS = [
  { id: "overview", kind: "text" },
  { id: "challenge", kind: "text" },
  { id: "solution", kind: "text" },
  { id: "technologies", kind: "list" },
  { id: "keyAreas", kind: "lines" },
  { id: "expertise", kind: "list" },
  { id: "sectorRegion", kind: "facts" },
] as const;

function asStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export default async function ProjectDetail({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = await getTranslations("projects");
  const tPage = await getTranslations("projectPage");
  const related = PROJECTS.filter((item) => item.id !== project.id);
  const itemKey = `items.${project.id}` as const;

  return (
    <>
      <section className="grid-surface grid-surface-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#projects`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-text/65 transition-colors hover:text-primary"
        >
          <FiArrowLeft className="size-4" aria-hidden="true" />
          {tPage("back")}
        </Link>

        <div className="relative mt-8 h-[22rem] overflow-hidden rounded-3xl border border-border/70 bg-navy shadow-[0_18px_44px_rgba(18,59,86,0.12)] sm:h-[24rem] lg:h-[26rem]">
          <Image
            src={project.image}
            alt={t(`${itemKey}.title`)}
            fill
            priority
            className="object-cover object-top"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/88 via-navy/45 to-navy/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <span className="size-2 rounded-full bg-primary" />
              {t(`${itemKey}.category`)}
            </span>
            <ScrollReveal
              playOnMount
              baseOpacity={0.25}
              enableBlur
              baseRotation={4}
              blurStrength={18}
              containerClassName="mt-4 text-left"
              textClassName="max-w-2xl text-left text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {t(`${itemKey}.title`)}
            </ScrollReveal>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/75">
              <FiMapPin className="size-3.5" aria-hidden="true" />
              {t(`${itemKey}.country`)}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <nav
            aria-label={tPage("onThisPage")}
            className="shrink-0 lg:sticky lg:top-28 lg:w-64"
          >
            <ol className="space-y-1">
              {CONTENT_SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-lg font-medium text-text/70 transition-colors hover:bg-soft-background hover:text-primary"
                  >
                    <span className="font-mono text-sm tabular-nums text-primary/55 transition-colors group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {tPage(section.id)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 flex-1 space-y-10">
            {CONTENT_SECTIONS.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-border/70 pt-8 first:border-t-0 first:pt-0"
              >
                <p className="font-mono text-base font-semibold uppercase tracking-[0.16em] text-primary">
                  {String(index + 1).padStart(2, "0")} / {tPage(section.id)}
                </p>

                {section.kind === "text" ? (
                  <p className="mt-4 text-xl leading-9 text-text/80 sm:text-[1.35rem] sm:leading-10">
                    {t(`${itemKey}.${section.id}`)}
                  </p>
                ) : null}

                {section.kind === "list" ? (
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {asStringList(t.raw(`${itemKey}.${section.id}`)).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border/70 bg-soft-background px-4 py-2 text-base font-medium text-dark"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.kind === "lines" ? (
                  <ul className="mt-5 space-y-3">
                    {asStringList(t.raw(`${itemKey}.${section.id}`)).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-xl leading-9 text-text/80 sm:text-[1.35rem] sm:leading-10"
                      >
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.kind === "facts" ? (
                  <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-soft-background p-5">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-text/45">
                        {tPage("sector")}
                      </dt>
                      <dd className="mt-2 text-lg font-semibold text-dark">
                        {t(`${itemKey}.category`)}
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-soft-background p-5">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-text/45">
                        {tPage("region")}
                      </dt>
                      <dd className="mt-2 text-lg font-semibold text-dark">
                        {t(`${itemKey}.country`)}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <RelatedProjects projects={related} />
    <CTA />
    </>
  );
}
