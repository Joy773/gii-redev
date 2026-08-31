"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

type CTAProps = {
  namespace?:
    | "ctaSection"
    | "aboutPage.cta"
    | "projectPage.cta"
    | "consultancyPage.cta"
    | "researchPage.cta"
    | "industriesPage.cta";
  backgroundClassName?: string;
  singlePrimaryButton?: boolean;
  primaryButtonKey?: string;
  primaryHref?: string;
  secondaryButtonKey?: string;
  secondaryHref?: string;
};

export default function CTA({
  namespace = "ctaSection",
  backgroundClassName = "grid-surface-white",
  singlePrimaryButton = false,
  primaryButtonKey = "startProject",
  primaryHref = "/contact",
  secondaryButtonKey = "exploreSolutions",
  secondaryHref = "/digital-transformation",
}: CTAProps) {
  const locale = useLocale();
  const t = useTranslations(namespace);
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
        className="group inline-flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full bg-[#0b0b0b] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.4)] dark:bg-white dark:text-navy dark:shadow-[0_12px_30px_rgba(0,0,0,0.28)] dark:hover:bg-white dark:hover:text-navy dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
      >
        <span className="whitespace-nowrap">{label}</span>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-white/25 dark:bg-navy/10 dark:group-hover:bg-navy/15">
          <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    );
  };

  return (
    <section className={`grid-surface py-16 sm:py-20 ${backgroundClassName}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-primary to-navy px-6 py-10 sm:px-10 sm:py-14">
          {/* Decorative arcs (right side) */}
          <div
            className="pointer-events-none absolute right-[-120px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.12)_30%,transparent_65%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-[-120px] top-[30px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_28%,transparent_62%)]"
            aria-hidden="true"
          />

          <div className="relative grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-center">
            <div className="mx-auto max-w-xl text-center sm:mx-0 sm:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
                <span className="size-2 rounded-full bg-white" />
                {t("eyebrow")}
              </span>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("title")}
              </h2>

              <p className="mt-4 text-base leading-7 text-white/78 sm:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-4">
              <PillButton href={primaryHref} label={tCta(primaryButtonKey)} />
              {!singlePrimaryButton ? (
                <PillButton href={secondaryHref} label={tCta(secondaryButtonKey)} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
