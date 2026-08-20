"use client";

import { useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { ViewAllProjectsButton } from "./common/buttons";

const FEATURED_PROJECTS = [
  {
    id: "industry40",
    category: "industry40",
  },
  {
    id: "water",
    category: "water",
  },
  {
    id: "digitalHealth",
    category: "medical",
  },
] as const;

function revealClass(visible: boolean) {
  return visible ? "scroll-reveal scroll-reveal-visible" : "scroll-reveal";
}

export default function Projects() {
  const t = useTranslations("projects");
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-soft-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary ${revealClass(isVisible)}`}
              style={{ transitionDelay: "0ms" }}
            >
              <span className="eyebrow-dot-pulse size-2 rounded-full bg-primary" />
              {t("eyebrow")}
            </span>
            <h2
              className={`mt-6 text-4xl font-semibold tracking-tight text-dark sm:text-5xl ${revealClass(isVisible)}`}
              style={{ transitionDelay: "80ms" }}
            >
              {t("title")}
            </h2>
            <p
              className={`mt-4 max-w-xl text-lg leading-8 text-text/72 ${revealClass(isVisible)}`}
              style={{ transitionDelay: "160ms" }}
            >
              {t("description")}
            </p>
          </div>

          <div
            className={`shrink-0 ${revealClass(isVisible)}`}
            style={{ transitionDelay: "240ms" }}
          >
            <ViewAllProjectsButton />
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FEATURED_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className={`group overflow-hidden rounded-3xl border border-border/70 bg-white p-5 shadow-[0_12px_32px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_44px_rgba(18,59,86,0.12)] ${revealClass(isVisible)}`}
              style={{ transitionDelay: `${320 + index * 100}ms` }}
            >
              <div className="project-card-media flex h-40 items-end rounded-2xl p-4">
                <span className="relative z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {t(`items.${project.id}.category`)}
                </span>
              </div>

              <div className="mt-5 transition-transform duration-300 group-hover:-translate-y-0.5">
                <div className="inline-flex items-center gap-1.5 text-sm text-text/55 transition-colors duration-300 group-hover:text-primary/80">
                  <FiMapPin className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                  {t(`items.${project.id}.country`)}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary">
                  {t(`items.${project.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  {t(`items.${project.id}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
