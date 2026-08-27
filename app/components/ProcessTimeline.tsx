"use client";

import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import {
  FiCheckCircle,
  FiLayers,
  FiRefreshCw,
  FiSearch,
  FiTool,
  FiUsers,
} from "react-icons/fi";

import ScrollReveal from "./common/ScrollReveal";
import { StartProjectButton } from "./common/buttons";

const PROCESS_STEPS = [
  { id: "diagnose", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "deliver", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "enable", icon: FiUsers },
  { id: "partner", icon: FiRefreshCw },
] as const;

function ProcessRow({
  id,
  icon: Icon,
  index,
}: {
  id: (typeof PROCESS_STEPS)[number]["id"];
  icon: ComponentType<{ className?: string }>;
  index: number;
}) {
  const t = useTranslations("processTimeline.items");

  return (
    <li className="group relative">
      <span
        className="pointer-events-none absolute inset-x-0 inset-y-1 rounded-2xl bg-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-1/2 left-0 h-0 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover:h-1/2"
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-4 py-6 transition-transform duration-300 group-hover:translate-x-2 sm:gap-6 sm:px-5">
        <span className="mt-0.5 font-mono text-sm tabular-nums text-primary/70 transition-colors duration-300 group-hover:text-primary sm:text-base">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary sm:text-xl">
            {t(`${id}.title`)}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-text/70 sm:text-[15px]">
            {t(`${id}.description`)}
          </p>
        </div>

        <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 text-text/45 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
    </li>
  );
}

export default function ProcessTimeline() {
  const t = useTranslations("processTimeline");

  return (
    <section className="grid-surface grid-surface-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
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
                containerClassName="text-center lg:text-left"
                textClassName="text-center text-3xl font-semibold tracking-tight text-dark sm:text-4xl lg:text-left lg:text-5xl"
              >
                {t("title")}
              </ScrollReveal>
            </div>
            <p className="mt-5 text-base leading-7 text-text/72 sm:text-lg sm:leading-8">
              {t("description")}
            </p>
            <div className="mt-7 flex justify-center lg:justify-start">
              <StartProjectButton />
            </div>
          </div>

          <ul className="divide-y divide-border/60 border-y border-border/60">
            {PROCESS_STEPS.map((item, index) => (
              <ProcessRow key={item.id} index={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
