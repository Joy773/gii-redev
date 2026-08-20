"use client";

import { useTranslations } from "next-intl";

import { ExploreSolutionsButton, StartProjectButton } from "./buttons";
import MoltenMetal from "./MoltenMetal";

export default function Hero() {
  const t = useTranslations("hero");
  const titleWords = t("title").split(" ");

  return (
    <section className="relative overflow-hidden bg-soft-background">
      <div className="absolute inset-0">
        <MoltenMetal
          color1="#123b56"
          color2="#3179ab"
          color3="#F4F7F9"
          colorMode="frost"
          speed={0.28}
          scale={3.6}
          detail={3}
          glow={1.4}
          coreSize={0.12}
          swirl={0.85}
          fold={-0.18}
          blackPoint={0.08}
          brightness={1.15}
          grain
          grainIntensity={0.04}
          mouseInteraction
          mouseStrength={0.25}
          opacity={0.9}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,247,249,0.96)_0%,rgba(244,247,249,0.88)_36%,rgba(244,247,249,0.55)_62%,rgba(244,247,249,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,121,171,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(18,59,86,0.12),transparent_32%)]" />

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

          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
            <ExploreSolutionsButton className="inline-flex whitespace-nowrap px-3.5 sm:px-4" />
            <StartProjectButton className="inline-flex whitespace-nowrap px-3.5 sm:px-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
