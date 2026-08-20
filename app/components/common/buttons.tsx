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
    "bg-gradient-to-r from-primary to-dark text-white shadow-[0_4px_16px_rgba(49,121,171,0.3)] hover:shadow-[0_10px_30px_rgba(49,121,171,0.35)]",
  onDark:
    "bg-white text-dark shadow-[0_4px_18px_rgba(0,0,0,0.14)] hover:bg-soft-background hover:text-primary hover:shadow-[0_10px_26px_rgba(0,0,0,0.2)]",
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
      className={`group items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-dark shadow-[0_4px_18px_rgba(18,59,86,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/35 hover:bg-white hover:text-primary hover:shadow-[0_10px_26px_rgba(18,59,86,0.12)] ${className}`}
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
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-dark px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(49,121,171,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_26px_rgba(18,59,86,0.22)] ${className}`}
    >
      {t("viewAllProjects")}
      <ArrowIcon className={`transition-transform duration-300 group-hover:translate-x-1 ${arrowClassName}`} />
    </Link>
  );
}

