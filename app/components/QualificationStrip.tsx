"use client";

import { useTranslations } from "next-intl";

const ITEM_KEYS = [
  "since2014",
  "germanyBased",
  "internationalProjects",
  "arabicEnglish",
] as const;

export default function QualificationStrip() {
  const t = useTranslations("qualificationStrip");

  return (
    <div className="border-b border-navy/80 bg-navy">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 sm:px-6 lg:px-8">
        {ITEM_KEYS.map((key, index) => (
          <span key={key} className="inline-flex items-center gap-3">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="select-none text-[11px] font-medium text-white/35"
              >
                |
              </span>
            ) : null}
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/88 sm:text-xs">
              {t(key)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
