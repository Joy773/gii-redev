"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { ExploreSolutionsButton, StartProjectButton } from "./buttons";

export default function Hero() {
  const t = useTranslations("hero");
  const titleWords = t("title").split(" ");

  return (
    <section className="relative overflow-hidden bg-soft-background">
      <Image
        src="/hero-one.webp"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,247,249,0.96)_0%,rgba(244,247,249,0.9)_38%,rgba(244,247,249,0.58)_62%,rgba(244,247,249,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,121,171,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(18,59,86,0.18),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-dark sm:text-5xl lg:text-6xl">
            {titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="hero-title-word"
                style={{ animationDelay: `${index * 400}ms` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <p className="mt-4 text-lg leading-8 text-text/75">
            {t("subtitle")}
          </p>

          <p className="mt-5 text-base leading-7 text-text/70 sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ExploreSolutionsButton className="inline-flex" />
            <StartProjectButton className="inline-flex" />
          </div>
        </div>
      </div>
    </section>
  );
}
