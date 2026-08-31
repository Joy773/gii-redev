"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiCompass,
  FiCpu,
  FiDroplet,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiLock,
  FiPackage,
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

const CONSULTANCY_AUDIENCES: ServiceItem[] = [
  { id: "enterprisesMittelstand", icon: FiBriefcase },
  { id: "publicInstitutions", icon: FiLayers },
  { id: "internationalMena", icon: FiGlobe },
  { id: "utilitiesSustainability", icon: FiDroplet },
];

const RESEARCH_THEMES: ServiceItem[] = [
  { id: "appliedRd", icon: FiCpu },
  { id: "technologyTransfer", icon: FiGlobe },
  { id: "programmeDesign", icon: FiLayers },
  { id: "sustainabilityInnovation", icon: FiCompass },
];

const INDUSTRIES_SECTORS: (ServiceItem & { className: string })[] = [
  { id: "manufacturing", icon: FiPackage, className: "lg:col-span-2" },
  { id: "ecsFacilitates", icon: FiBarChart2, className: "" },
  { id: "researchDevelopment", icon: FiCpu, className: "" },
];

const SERVICE_CARDS_CONFIG = {
  default: {
    namespace: "serviceCards",
    backgroundClassName: "grid-surface-white",
    cardsClassName: "grid gap-4 sm:grid-cols-2",
    onDark: false,
  },
  consultancy: {
    namespace: "consultancyPage.audiences",
    backgroundClassName: "grid-surface-white",
    cardsClassName: "grid gap-4 sm:grid-cols-2",
    onDark: false,
  },
  research: {
    namespace: "researchPage.themes",
    backgroundClassName: "grid-surface-soft",
    cardsClassName: "grid gap-4 sm:grid-cols-2",
    onDark: false,
  },
  industries: {
    namespace: "industriesPage.sectors",
    backgroundClassName: "bg-[#122A3B]",
    cardsClassName: "grid gap-4 sm:grid-cols-2",
    onDark: true,
  },
} as const;

const lightCarouselCardClassName =
  "group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-soft-background p-5 shadow-[0_12px_32px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-surface hover:shadow-[0_18px_44px_rgba(18,59,86,0.12)]";

const darkCarouselCardClassName =
  "group flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0B1F2C] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_44px_rgba(0,0,0,0.38)]";

function ServiceGroupCard({
  group,
  onDark = false,
}: {
  group: ServiceGroup;
  onDark?: boolean;
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
      className={`${onDark ? darkCarouselCardClassName : lightCarouselCardClassName} ${group.className}`}
    >
      <div
        key={index}
        className={direction === 1 ? "service-card-slide-next" : "service-card-slide-prev"}
      >
        <div
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
            onDark
              ? "text-white/72 group-hover:text-white"
              : "text-text/72 group-hover:text-dark"
          }`}
        >
          <span
            className={`inline-flex size-7 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${
              onDark
                ? "bg-primary/20 text-primary group-hover:bg-primary/28"
                : "bg-primary/10 text-primary group-hover:bg-primary/15"
            }`}
          >
            <Icon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
          </span>
          {groupLabel}
        </div>

        <div className="mt-8 flex-1">
          <div
            className={`whitespace-nowrap text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl ${
              onDark
                ? "text-white group-hover:text-primary"
                : "text-dark group-hover:text-primary"
            }`}
          >
            {t(`groups.${group.id}.services.${service.id}.title`)}
          </div>
          <p
            className={`mt-2 max-w-sm text-sm leading-6 ${
              onDark ? "text-white/70" : "text-text/70"
            }`}
          >
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
            className={`inline-flex size-8 items-center justify-center rounded-full border transition-all duration-300 ${
              onDark
                ? "border-white/20 bg-white/5 text-white/75 hover:border-primary/35 hover:text-primary group-hover:border-primary/35 group-hover:text-primary"
                : "border-border/80 bg-surface text-dark/70 hover:border-primary/25 hover:text-primary group-hover:border-primary/25 group-hover:text-primary"
            }`}
          >
            <FiArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("next", { group: groupLabel })}
            onClick={showNext}
            className={`inline-flex size-8 items-center justify-center rounded-full border transition-all duration-300 ${
              onDark
                ? "border-white/20 bg-white/5 text-white/75 hover:border-primary/35 hover:text-primary group-hover:border-primary/35 group-hover:text-primary"
                : "border-border/80 bg-surface text-dark/70 hover:border-primary/25 hover:text-primary group-hover:border-primary/25 group-hover:text-primary"
            }`}
          >
            <FiArrowRight className="size-4" />
          </button>
        </div>
        <span
          className={`text-xs font-medium tracking-wide ${
            onDark ? "text-white/45" : "text-text/45"
          }`}
        >
          {index + 1} / {count}
        </span>
      </div>
    </article>
  );
}

function IndustrySectorCard({
  id,
  icon: Icon,
  className = "",
  namespace,
}: ServiceItem & { className?: string; namespace: string }) {
  const t = useTranslations(namespace);
  const label = t(`items.${id}.title`);

  return (
    <article className={`${darkCarouselCardClassName} ${className}`}>
      <div className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors duration-300 group-hover:text-white">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/28">
          <Icon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
        </span>
        {label}
      </div>

      <div className="mt-8 flex-1">
        <div className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-primary sm:text-2xl">
          {label}
        </div>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
          {t(`items.${id}.description`)}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t("previous", { group: label })}
            disabled
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/35"
          >
            <FiArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("next", { group: label })}
            disabled
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/35"
          >
            <FiArrowRight className="size-4" />
          </button>
        </div>
        <span className="text-xs font-medium tracking-wide text-white/45">1 / 1</span>
      </div>
    </article>
  );
}

function ThemeCard({
  id,
  icon: Icon,
  namespace,
}: ServiceItem & { namespace: string }) {
  const t = useTranslations(namespace);

  return (
    <article className={lightCarouselCardClassName}>
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
        <Icon className="size-3.5" aria-hidden="true" />
      </span>

      <div className="mt-6 flex-1">
        <h3 className="text-xl font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:text-2xl">
          {t(`items.${id}.title`)}
        </h3>
        <p className="mt-2 text-sm leading-6 text-text/70">
          {t(`items.${id}.description`)}
        </p>
      </div>
    </article>
  );
}

export default function ServiceCards({
  variant = "default",
}: {
  variant?: keyof typeof SERVICE_CARDS_CONFIG;
}) {
  const locale = useLocale();
  const config = SERVICE_CARDS_CONFIG[variant];
  const t = useTranslations(config.namespace);

  const themeCards =
    variant === "consultancy"
      ? CONSULTANCY_AUDIENCES
      : variant === "research"
        ? RESEARCH_THEMES
        : null;

  const onDark = config.onDark;

  return (
    <section className={`grid-surface ${config.backgroundClassName} py-20 sm:py-24`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
              onDark
                ? "bg-white/10 text-white/90"
                : "bg-primary/8 text-primary"
            }`}
          >
            <span
              className={`size-2 rounded-full ${onDark ? "bg-primary" : "bg-primary"}`}
            />
            {t("eyebrow")}
          </span>

          <ScrollReveal
            baseOpacity={0.25}
            enableBlur
            baseRotation={4}
            blurStrength={18}
            containerClassName="mt-6 text-center lg:text-left"
            textClassName={`text-center text-4xl font-semibold tracking-tight sm:text-5xl lg:text-left ${
              onDark ? "text-white" : "text-dark"
            }`}
          >
            {t("title")}
          </ScrollReveal>

          <p
            className={`mt-6 text-lg leading-8 ${
              onDark ? "text-white/78" : "text-text/72"
            }`}
          >
            {t("description")}
          </p>

          <Link
            href={`/${locale}/contact`}
            className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              onDark
                ? "text-primary hover:text-white"
                : "text-primary hover:text-dark"
            }`}
          >
            {t("cta")}
            <FiArrowRight className="size-4" />
          </Link>
        </div>

        <div className={config.cardsClassName}>
          {variant === "industries"
            ? INDUSTRIES_SECTORS.map((sector) => (
                <IndustrySectorCard
                  key={sector.id}
                  {...sector}
                  namespace={config.namespace}
                />
              ))
            : themeCards
              ? themeCards.map((item) => (
                  <ThemeCard
                    key={item.id}
                    {...item}
                    namespace={config.namespace}
                  />
                ))
              : SERVICE_GROUPS.map((group) => (
                  <ServiceGroupCard key={group.id} group={group} onDark={onDark} />
                ))}
        </div>
      </div>
    </section>
  );
}
