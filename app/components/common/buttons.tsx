"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

function ArrowIcon({ className = "" }: { className?: string }) {
  return <FiArrowRight aria-hidden="true" className={`size-4 ${className}`} />;
}

type ButtonProps = {
  className?: string;
  arrowClassName?: string;
  variant?: "default" | "onDark";
};

const startProjectVariants = {
  default:
    "bg-gradient-to-r from-primary to-navy text-white shadow-[0_4px_16px_rgba(49,121,171,0.3)] hover:shadow-[0_10px_30px_rgba(49,121,171,0.35)] dark:from-primary dark:to-primary dark:shadow-[0_8px_24px_rgba(49,121,171,0.4)] dark:hover:shadow-[0_12px_32px_rgba(49,121,171,0.5)]",
  onDark:
    "bg-white text-navy shadow-[0_4px_18px_rgba(0,0,0,0.14)] hover:bg-surface hover:text-primary hover:shadow-[0_10px_26px_rgba(0,0,0,0.2)] dark:bg-primary dark:text-white dark:shadow-[0_8px_24px_rgba(49,121,171,0.35)] dark:hover:bg-primary/90 dark:hover:text-white dark:hover:shadow-[0_12px_28px_rgba(49,121,171,0.45)]",
};

export function StartProjectButton({
  className = "",
  arrowClassName = "",
  variant = "default",
}: ButtonProps) {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/contact`}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${startProjectVariants[variant]} ${className}`}
    >
      {t("startProject")}
      <ArrowIcon className={`transition-transform duration-300 group-hover:translate-x-1 ${arrowClassName}`} />
    </Link>
  );
}

export function ExploreSolutionsButton({
  className = "",
  arrowClassName = "",
}: ButtonProps) {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/digital-transformation`}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-navy shadow-[0_4px_18px_rgba(18,59,86,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/35 hover:bg-white hover:text-primary hover:shadow-[0_10px_26px_rgba(18,59,86,0.12)] dark:border-white/30 dark:bg-white/10 dark:text-white dark:shadow-[0_4px_18px_rgba(0,0,0,0.25)] dark:hover:border-white/50 dark:hover:bg-white/16 dark:hover:text-white ${className}`}
    >
      {t("exploreSolutions")}
      <ArrowIcon className={`transition-transform duration-300 group-hover:translate-x-1 ${arrowClassName}`} />
    </Link>
  );
}

export function ViewAllProjectsButton({
  className = "",
  arrowClassName = "",
}: ButtonProps) {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/projects`}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-navy px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(49,121,171,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_26px_rgba(18,59,86,0.22)] dark:from-primary dark:to-primary dark:shadow-[0_8px_24px_rgba(49,121,171,0.4)] ${className}`}
    >
      {t("viewAllProjects")}
      <ArrowIcon className={`transition-transform duration-300 group-hover:translate-x-1 ${arrowClassName}`} />
    </Link>
  );
}

