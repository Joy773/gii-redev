"use client";

import { useMemo, useState, type ComponentType, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import {
  FiArrowRight,
  FiCloud,
  FiCpu,
  FiDroplet,
  FiGlobe,
  FiLayers,
  FiLock,
  FiMap,
  FiRefreshCcw,
  FiShield,
  FiSun,
  FiWifi,
  FiWind,
  FiZap,
} from "react-icons/fi";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { ContactUsButton } from "./common/buttons";
import ScrollReveal from "./common/ScrollReveal";

type ConsultancyColumnId = "ict" | "sustainable";

type ConsultancyItem = {
  id: string;
  icon: ComponentType<{ className?: string }>;
};

const ICT_ITEMS: ConsultancyItem[] = [
  { id: "digitalTransformation", icon: FiRefreshCcw },
  { id: "itStrategy", icon: FiMap },
  { id: "softwareArchitecture", icon: FiLayers },
  { id: "aiStrategy", icon: FiCpu },
  { id: "iotStrategy", icon: FiWifi },
  { id: "cloudStrategy", icon: FiCloud },
  { id: "cybersecurity", icon: FiLock },
  { id: "digitalPlatforms", icon: FiGlobe },
  { id: "technologyRoadmaps", icon: FiShield },
];

const SUSTAINABLE_ITEMS: ConsultancyItem[] = [
  { id: "water", icon: FiDroplet },
  { id: "wastewater", icon: FiDroplet },
  { id: "energy", icon: FiZap },
  { id: "renewableEnergy", icon: FiSun },
  { id: "ventilation", icon: FiWind },
  { id: "hvac", icon: FiWind },
  { id: "environmentalTechnology", icon: FiGlobe },
  { id: "smartInfrastructure", icon: FiWifi },
];

const PAGE_SIZE = 4;
const PAGE_TRANSITION_MS = 450;

function chunkItems<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages;
}

function ConsultancyCard({
  id,
  icon: Icon,
  fillHeight = false,
  className = "",
  style,
}: ConsultancyItem & {
  fillHeight?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const t = useTranslations("consultancyPage.consultancies");

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-border/70 bg-surface p-4 shadow-[0_8px_24px_rgba(18,59,86,0.06)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_14px_36px_rgba(18,59,86,0.1)] sm:p-5 ${fillHeight ? "h-full" : ""} ${className}`}
      style={style}
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-soft-background text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/25 group-hover:bg-primary/10 sm:size-10">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h3 className="mt-3 text-base font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:mt-4 sm:text-lg">
        {t(`items.${id}.title`)}
      </h3>
      <p className={`mt-2 text-sm leading-6 text-text/70 ${fillHeight ? "flex-1" : ""}`}>
        {t(`items.${id}.description`)}
      </p>
    </article>
  );
}

function ConsultancyBlock({
  columnId,
  items,
  reverse = false,
  onDark = false,
}: {
  columnId: ConsultancyColumnId;
  items: ConsultancyItem[];
  reverse?: boolean;
  onDark?: boolean;
}) {
  const t = useTranslations("consultancyPage.consultancies");
  const pages = useMemo(() => chunkItems(items, PAGE_SIZE), [items]);
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const visibleItems = pages[page] ?? [];
  const totalPages = pages.length;
  const isSingleCardPage = visibleItems.length === 1;

  const showNextPage = () => {
    if (isAnimating || totalPages <= 1) return;

    setIsAnimating(true);
    setPage((current) => (current + 1) % totalPages);

    window.setTimeout(() => {
      setIsAnimating(false);
    }, PAGE_TRANSITION_MS);
  };

  const textColumn = (
    <div
      className={`text-center lg:sticky lg:top-28 lg:text-left ${
        reverse ? "order-1 lg:order-2" : "order-1"
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
          onDark
            ? "border border-white/15 bg-white/10 text-white/90"
            : "bg-primary/8 text-primary"
        }`}
      >
        <span className="size-2 rounded-full bg-primary" />
        {t(`${columnId}.label`)}
      </span>

      <ScrollReveal
        baseOpacity={0.25}
        enableBlur
        baseRotation={4}
        blurStrength={18}
        containerClassName="mt-6 text-center lg:text-left"
        textClassName={`text-center text-3xl font-semibold tracking-tight sm:text-4xl lg:text-left lg:text-5xl ${
          onDark ? "text-white" : "text-dark"
        }`}
      >
        {t(`${columnId}.title`)}
      </ScrollReveal>

      <p
        className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${
          onDark ? "text-white/78" : "text-text/72"
        }`}
      >
        {t(`${columnId}.description`)}
      </p>

      <div className="mt-7 flex justify-center lg:justify-start">
        <ContactUsButton />
      </div>
    </div>
  );

  const cardsColumn = (
    <div className={reverse ? "order-2 lg:order-1" : "order-2"}>
      <div className="min-h-[28rem] sm:min-h-[30rem]">
        <div
          key={page}
          className={`consultancy-page-enter grid grid-cols-2 gap-3 sm:gap-4 ${
            isSingleCardPage ? "content-start items-start" : "items-stretch"
          }`}
        >
          {visibleItems.map((item, index) => (
            <ConsultancyCard
              key={item.id}
              {...item}
              fillHeight={!isSingleCardPage}
              className="consultancy-card-enter"
              style={{ animationDelay: `${index * 70}ms` }}
            />
          ))}
        </div>
      </div>

      {totalPages > 1 ? (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p
            className={`text-sm font-medium transition-opacity duration-300 ${
              onDark ? "text-white/50" : "text-text/50"
            }`}
          >
            {t("pageIndicator", { current: page + 1, total: totalPages })}
          </p>
          <button
            type="button"
            disabled={isAnimating}
            onClick={showNextPage}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-navy px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(49,121,171,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(18,59,86,0.22)] disabled:pointer-events-none disabled:opacity-70"
          >
            {t("showMore")}
            <FiArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
      {textColumn}
      {cardsColumn}
    </div>
  );
}

export default function Consultancies() {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>();

  return (
    <>
      <section
        ref={sectionRef}
        id="consultancies"
        className="grid-surface grid-surface-soft scroll-mt-24 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ConsultancyBlock columnId="ict" items={ICT_ITEMS} />
        </div>
      </section>

      <section className="grid-surface bg-[#122A3B] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ConsultancyBlock
            columnId="sustainable"
            items={SUSTAINABLE_ITEMS}
            reverse
            onDark
          />
        </div>
      </section>
    </>
  );
}
