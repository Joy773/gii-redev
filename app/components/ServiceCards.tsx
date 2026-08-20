"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiCompass,
  FiCpu,
  FiDroplet,
  FiHeart,
  FiLayers,
  FiLock,
  FiRefreshCcw,
  FiSettings,
  FiShoppingCart,
  FiWifi,
  FiWind,
  FiZap,
} from "react-icons/fi";

import ScrollReveal from "./common/ScrollReveal";

type ServiceItem = {
  id: string;
  icon: ComponentType<{ className?: string }>;
};

type ServiceGroup = {
  id: "digitalTransformation" | "technology" | "sustainableGrowth";
  className: string;
  services: ServiceItem[];
};

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "digitalTransformation",
    className: "lg:col-span-2",
    services: [
      { id: "digitalization", icon: FiRefreshCcw },
      { id: "smes", icon: FiBriefcase },
      { id: "industry40", icon: FiSettings },
      { id: "aiTransformation", icon: FiCpu },
      { id: "cloudCybersecurity", icon: FiLock },
    ],
  },
  {
    id: "technology",
    className: "",
    services: [
      { id: "softwareDevelopment", icon: FiCode },
      { id: "ai", icon: FiCpu },
      { id: "iotEmbedded", icon: FiWifi },
      { id: "digitalPlatforms", icon: FiLayers },
      { id: "medicalTechnology", icon: FiHeart },
    ],
  },
  {
    id: "sustainableGrowth",
    className: "",
    services: [
      { id: "digitalEducation", icon: FiBookOpen },
      { id: "ecommerce", icon: FiShoppingCart },
      { id: "water", icon: FiDroplet },
      { id: "energy", icon: FiZap },
      { id: "ventilationHvac", icon: FiWind },
      { id: "environment", icon: FiCompass },
    ],
  },
];

function ServiceGroupCard({
  group,
}: {
  group: ServiceGroup;
}) {
  const t = useTranslations("serviceCards");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const service = group.services[index];
  const Icon = service.icon;
  const count = group.services.length;
  const groupLabel = t(`groups.${group.id}.label`);

  const showPrevious = () => {
    setDirection(-1);
    setIndex((current) => (current === 0 ? count - 1 : current - 1));
  };

  const showNext = () => {
    setDirection(1);
    setIndex((current) => (current === count - 1 ? 0 : current + 1));
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-soft-background p-5 shadow-[0_12px_32px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white hover:shadow-[0_18px_44px_rgba(18,59,86,0.12)] ${group.className}`}
    >
      <div
        key={index}
        className={direction === 1 ? "service-card-slide-next" : "service-card-slide-prev"}
      >
        <div className="inline-flex items-center gap-2 text-sm font-medium text-text/72 transition-colors duration-300 group-hover:text-dark">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
            <Icon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
          </span>
          {groupLabel}
        </div>

        <div className="mt-8 flex-1">
          <div className="whitespace-nowrap text-xl font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:text-2xl">
            {t(`groups.${group.id}.services.${service.id}.title`)}
          </div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-text/70">
            {t(`groups.${group.id}.services.${service.id}.description`)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t("previous", { group: groupLabel })}
            onClick={showPrevious}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-white text-dark/70 transition-all duration-300 hover:border-primary/25 hover:text-primary group-hover:border-primary/25 group-hover:text-primary"
          >
            <FiArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("next", { group: groupLabel })}
            onClick={showNext}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-white text-dark/70 transition-all duration-300 hover:border-primary/25 hover:text-primary group-hover:border-primary/25 group-hover:text-primary"
          >
            <FiArrowRight className="size-4" />
          </button>
        </div>
        <span className="text-xs font-medium tracking-wide text-text/45">
          {index + 1} / {count}
        </span>
      </div>
    </article>
  );
}

export default function ServiceCards() {
  const locale = useLocale();
  const t = useTranslations("serviceCards");

  return (
    <section className="grid-surface grid-surface-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>

          <ScrollReveal
            baseOpacity={0.25}
            enableBlur
            baseRotation={4}
            blurStrength={18}
            containerClassName="mt-6"
            textClassName="text-4xl font-semibold tracking-tight text-dark sm:text-5xl"
          >
            {t("title")}
          </ScrollReveal>

          <p className="mt-6 text-lg leading-8 text-text/72">
            {t("description")}
          </p>

          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-dark"
          >
            {t("cta")}
            <FiArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICE_GROUPS.map((group) => (
            <ServiceGroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
