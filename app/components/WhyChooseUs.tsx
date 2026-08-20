"use client";

import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import {
  FiAward,
  FiRefreshCw,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import { StartProjectButton } from "./common/buttons";

type LightCardId = "expertConsultants" | "provenInnovation" | "endToEndSolutions";

type LightCardConfig = {
  id: LightCardId;
  icon: ComponentType<{ className?: string }>;
  className?: string;
  largeDescription?: boolean;
};

const LIGHT_CARDS: LightCardConfig[] = [
  {
    id: "expertConsultants",
    icon: FiAward,
  },
  {
    id: "provenInnovation",
    icon: FiTrendingUp,
  },
  {
    id: "endToEndSolutions",
    icon: FiTarget,
    className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
    largeDescription: true,
  },
];

function LightCard({
  id,
  icon: Icon,
  className = "",
  largeDescription = false,
}: LightCardConfig) {
  const t = useTranslations("whyChooseUs.cards");

  return (
    <article
      className={`group rounded-2xl border border-border/70 bg-soft-background p-4 shadow-[0_8px_24px_rgba(18,59,86,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white hover:shadow-[0_14px_36px_rgba(18,59,86,0.1)] sm:p-5 ${className}`}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-white text-dark shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/25 group-hover:bg-primary/10 group-hover:text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:text-xl">
        {t(`${id}.title`)}
      </h3>
      <p
        className={`mt-2 text-text/72 transition-colors duration-300 group-hover:text-text/80 ${
          largeDescription
            ? "text-sm leading-6 sm:text-base sm:leading-7"
            : "text-sm leading-6"
        }`}
      >
        {t(`${id}.description`)}
      </p>
    </article>
  );
}

function FeaturedCard() {
  const t = useTranslations("whyChooseUs.cards.flexibleEngagement");

  return (
    <article className="group flex flex-col rounded-2xl border border-transparent bg-dark p-4 text-white shadow-[0_8px_24px_rgba(18,59,86,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(18,59,86,0.24)] sm:p-5 lg:col-start-3 lg:row-span-2 lg:row-start-1">
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/15">
        <FiRefreshCw className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      </span>

      <h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-white sm:text-xl">
        {t("title")}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/78 transition-colors duration-300 group-hover:text-white/88">
        {t("description")}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/78 transition-colors duration-300 group-hover:text-white/88">
        {t("descriptionSecondary")}
      </p>

      <div className="mt-5 transition-transform duration-300 group-hover:-translate-y-0.5 lg:mt-auto lg:pt-6">
        <StartProjectButton variant="onDark" />
      </div>
    </article>
  );
}

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {t("titleBefore")}{" "}
            <span className="text-primary">{t("brand")}</span>{" "}
            {t("titleAfter")}
          </h2>
        </div>

        <div className="mt-10 grid gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {LIGHT_CARDS.slice(0, 2).map((card) => (
            <LightCard key={card.id} {...card} />
          ))}

          <FeaturedCard />

          <LightCard {...LIGHT_CARDS[2]} />
        </div>
      </div>
    </section>
  );
}
