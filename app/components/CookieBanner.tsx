"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookieConsent";
const BANNER_DELAY_MS = 5_000;

export default function CookieBanner() {
  const locale = useLocale();
  const t = useTranslations("cookieBanner");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;

    try {
      consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      // Continue with the banner when storage is unavailable.
    }

    if (consent === "true") return;

    const timer = window.setTimeout(() => setIsVisible(true), BANNER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const saveConsent = (accepted: boolean) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, String(accepted));
    } catch {
      // The choice still dismisses the banner for the current page view.
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-md"
      />
      <aside
        aria-label={t("ariaLabel")}
        aria-live="polite"
        aria-modal="true"
        role="dialog"
        className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-6xl rounded-3xl border border-border/80 bg-surface p-5 shadow-[0_24px_70px_rgba(18,59,86,0.2)] sm:p-6"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-dark sm:text-2xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-text/75 sm:text-base">
              {t("description")} {" "}
              <Link
                href={`/${locale}/privacy-policy`}
                className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {t("privacyLink")}
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <button
              type="button"
              onClick={() => saveConsent(false)}
              className="rounded-full border border-border bg-transparent px-5 py-3 text-sm font-semibold text-dark transition-colors hover:border-primary/40 hover:text-primary"
            >
              {t("decline")}
            </button>
            <button
              type="button"
              onClick={() => saveConsent(true)}
              className="rounded-full bg-gradient-to-r from-primary to-navy px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(49,121,171,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(49,121,171,0.32)]"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
