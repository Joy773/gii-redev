"use client";

import { useTranslations } from "next-intl";

import ScrollReveal from "./common/ScrollReveal";

export default function OurApproach() {
  const t = useTranslations("aboutPage.ourApproach");

  return (
    <section className="grid-surface grid-surface-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal
            baseOpacity={0.25}
            enableBlur
            baseRotation={4}
            blurStrength={18}
            containerClassName="text-center"
            textClassName="text-center text-3xl font-semibold tracking-tight text-dark sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </ScrollReveal>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-text/72 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
