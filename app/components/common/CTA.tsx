"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

import LiquidChrome from "./LiquidChrome";

export default function CTA() {
  const locale = useLocale();
  const t = useTranslations("ctaSection");
  const tCta = useTranslations("cta");

  const PillButton = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => {
    return (
      <Link
        href={`/${locale}${href}`}
        className="pointer-events-auto group inline-flex items-center justify-between gap-4 rounded-full bg-[#0b0b0b] px-7 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
      >
        <span>{label}</span>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-white/25">
          <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    );
  };

  return (
    <section className="grid-surface grid-surface-soft py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0">
            <LiquidChrome
              // GII navy #123b56 as RGB (0–1)
              baseColor={[0.071, 0.231, 0.337]}
              speed={0.35}
              amplitude={0.45}
              frequencyX={2.5}
              frequencyY={1.8}
              interactive
            />
          </div>

          {/* Soft primary tint so chrome stays on-brand */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(49,121,171,0.28)_0%,rgba(18,59,86,0.12)_45%,transparent_100%)]"
            aria-hidden="true"
          />

          <div className="pointer-events-none relative grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-primary" />
                {t("eyebrow")}
              </span>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("title")}
              </h2>

              <p className="mt-4 text-base leading-7 text-white/85 sm:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
              <PillButton href="/contact" label={tCta("startProject")} />
              <PillButton href="/digital-transformation" label={tCta("exploreSolutions")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
