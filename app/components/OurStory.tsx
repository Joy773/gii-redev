"use client";

import { useTranslations } from "next-intl";

import ScrollReveal from "./common/ScrollReveal";

const FAST_FACTS = [
  { id: "years", className: "" },
  { id: "projects", className: "" },
  { id: "regions", className: "col-span-2" },
] as const;

export default function OurStory() {
  const t = useTranslations("aboutPage.ourStory");

  return (
    <section className="grid-surface grid-surface-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
              <span className="size-2 rounded-full bg-primary" />
              {t("eyebrow")}
            </span>
            <div className="mt-6 sm:mt-5">
              <ScrollReveal
                baseOpacity={0.25}
                enableBlur
                baseRotation={4}
                blurStrength={18}
                containerClassName="text-left"
                textClassName="text-left text-3xl font-semibold tracking-tight text-dark sm:text-4xl lg:text-5xl"
              >
                {t("title")}
              </ScrollReveal>
            </div>
            <p className="mt-5 text-base leading-7 text-text/72 sm:text-lg sm:leading-8">
              {t("description")}
            </p>
            <p className="mt-4 text-base leading-7 text-text/72 sm:text-lg sm:leading-8">
              {t("body")}
            </p>
          </div>

          <div>
            <ul className="grid grid-cols-2 gap-4 sm:gap-3">
              {FAST_FACTS.map(({ id, className }) => (
                <li
                  key={id}
                  className={`group rounded-2xl border border-border/70 bg-soft-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-surface hover:shadow-[0_12px_32px_rgba(18,59,86,0.08)] sm:p-5 ${className}`}
                >
                  <p className="font-mono text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                    {t(`facts.${id}.value`)}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:mt-3 sm:text-lg">
                    {t(`facts.${id}.title`)}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-text/65 sm:text-sm sm:leading-6">
                    {t(`facts.${id}.body`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
