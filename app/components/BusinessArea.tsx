"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import ScrollReveal from "./common/ScrollReveal";

const BUSINESS_AREAS = [
  {
    id: "businessDevelopment",
    number: "01",
    image: "/Business-Area-One.png",
    alt: "Modern business meeting room",
  },
  {
    id: "strategyConsulting",
    number: "02",
    image: "/Business-Area-Two.png",
    alt: "Financial planning workspace",
  },
  {
    id: "technologyInnovation",
    number: "03",
    image: "/Business-Area-Three.png",
    alt: "Global digital connectivity technology",
  },
  {
    id: "energySustainability",
    number: "04",
    image: "/Business-Area-Four.png",
    alt: "Sustainable business and renewable energy facility",
  },
] as const;

export default function BusinessArea() {
  const t = useTranslations("aboutPage.team");

  return (
    <section className="grid-surface grid-surface-soft py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>
          <div className="mt-6 sm:mt-5">
            <ScrollReveal
              baseOpacity={0.25}
              enableBlur
              baseRotation={3}
              blurStrength={18}
              containerClassName="text-center"
              textClassName="text-center text-3xl font-semibold tracking-tight text-dark sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </ScrollReveal>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text/60 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-16 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-16">
          {BUSINESS_AREAS.map((area) => (
            <li
              key={area.id}
              className="group transition-transform duration-300 motion-safe:hover:-translate-y-1"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-white shadow-[0_10px_28px_rgba(18,59,86,0.08)] transition-shadow duration-300 group-hover:shadow-[0_18px_42px_rgba(18,59,86,0.16)] sm:rounded-2xl lg:rounded-3xl">
                <Image
                  src={area.image}
                  alt={area.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                  sizes="(min-width: 1280px) 608px, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/[0.04]" />
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-tight tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:mt-5 sm:text-xl lg:text-2xl">
                <span className="mr-2 text-primary">{area.number}</span>
                {t(`areas.${area.id}.title`)}
              </h3>
              <p className="mt-2 text-xs leading-5 text-text/70 transition-colors duration-300 group-hover:text-text/85 sm:text-base sm:leading-7 lg:text-lg">
                {t(`areas.${area.id}.description`)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-border/70 bg-surface/80 px-5 py-8 text-center shadow-[0_12px_32px_rgba(18,59,86,0.07)] sm:mt-20 sm:rounded-3xl sm:px-10 sm:py-10 lg:px-16">
          <h2 className="text-xl font-semibold tracking-tight text-dark sm:text-2xl">
            {t("workWithUs.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            {t("workWithUs.description")}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 text-sm font-medium sm:flex-row sm:gap-3 sm:text-base">
            <span>
              {t("workWithUs.contactLabel")}{" "}
              <a
                href="mailto:info@g-ii.eu"
                className="text-primary transition-colors hover:text-dark"
              >
                info@g-ii.eu
              </a>
            </span>
            <span className="hidden text-text/35 sm:inline" aria-hidden="true">
              |
            </span>
            <span>
              {t("workWithUs.websiteLabel")}{" "}
              <a
                href="https://www.g-ii.eu"
                target="_blank"
                rel="noreferrer"
                className="text-primary transition-colors hover:text-dark"
              >
                www.g-ii.eu
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
