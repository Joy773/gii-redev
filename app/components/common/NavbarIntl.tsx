"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useLocaleTransition } from "./LocaleTransitionProvider";
import { NAV_LINKS, SERVICE_COLUMNS } from "./navConfig";
import { StartProjectButton } from "./buttons";
import { FiMoon } from "react-icons/fi";

import type { ReactNode } from "react";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  de: "DE",
};

const SERVICE_ACCENTS = [
  "from-primary/15 to-primary/5",
  "from-dark/12 to-dark/4",
  "from-primary/10 to-soft-background",
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-3.5 shrink-0 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <FiMoon aria-hidden="true" className="size-[18px]" />
  );
}

export default function NavbarIntl(): ReactNode {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tAria = useTranslations("aria");
  const pathname = usePathname();
  const router = useRouter();

  const menuId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { isLangTransitioning, setIsLangTransitioning } = useLocaleTransition();

  const setLangTimeoutRef = useRef<number | null>(null);
  const clearLangTimeoutRef = useRef<number | null>(null);
  const dropdownCloseTimeoutRef = useRef<number | null>(null);
  const scrollRestoreRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrollRestoreRef.current !== null) {
      const scrollY = scrollRestoreRef.current;
      scrollRestoreRef.current = null;

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      });
    }

    setMobileOpen(false);
    setOpenServices(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
    };
  }, []);

  const switchLocale = (nextLocale: string) => {
    if (locale === nextLocale) return;

    if (setLangTimeoutRef.current) window.clearTimeout(setLangTimeoutRef.current);
    if (clearLangTimeoutRef.current) window.clearTimeout(clearLangTimeoutRef.current);

    setIsLangTransitioning(true);
    scrollRestoreRef.current = window.scrollY;
    setLangTimeoutRef.current = window.setTimeout(() => {
      const parts = pathname.split("/");
      parts[1] = nextLocale;
      const newPath = parts.join("/") || `/${nextLocale}`;
      router.replace(newPath, { scroll: false });
    }, 120);
    clearLangTimeoutRef.current = window.setTimeout(() => {
      setIsLangTransitioning(false);
    }, 420);
  };

  const localizeHref = (href: string) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    const current = (pathname || "").split("?")[0].split("#")[0];
    const stripped = current.replace(/^\/(en|de)/, "") || "/";
    return stripped === path || stripped.startsWith(`${path}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-white/85 shadow-[0_8px_32px_rgba(18,59,86,0.06)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/70 backdrop-blur-lg"
      }`}
    >
      <div
        className={`mx-auto flex h-[4.25rem] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
          isLangTransitioning ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
        }`}
      >
        <Link href={localizeHref("/")} className="group shrink-0 transition-transform duration-300 hover:scale-[1.02]" aria-label={tAria("home")}>
          <Image
            src="/GII-Logo.webp"
            alt="German Innovation Institution"
            width={220}
            height={48}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-1 rounded-full border border-border/60 bg-soft-background/60 p-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const isServices = item.id === "services";

              if (isServices) {
                const open = openServices;
                return (
                  <li key={item.id} className="relative">
                    <button
                      type="button"
                      className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${
                        active || open ? "bg-primary/10 text-primary" : "text-text/80 hover:bg-white hover:text-dark"
                      }`}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onMouseEnter={() => {
                        if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
                        setOpenServices(true);
                      }}
                      onMouseLeave={() => {
                        dropdownCloseTimeoutRef.current = window.setTimeout(() => {
                          setOpenServices(false);
                        }, 120);
                      }}
                      onClick={() => setOpenServices((v) => !v)}
                    >
                      {tNav(item.labelKey)}
                      <Chevron open={open} />
                    </button>

                    <div
                      className={`absolute top-[calc(100%+0.5rem)] left-1/2 z-50 w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-300 ease-out ${
                        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                      }`}
                      onMouseEnter={() => {
                        if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
                      }}
                      onMouseLeave={() => setOpenServices(false)}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_rgba(18,59,86,0.12)]">
                        <div className="grid grid-cols-3 divide-x divide-border/60">
                          {SERVICE_COLUMNS.map((col, index) => (
                            <div key={col.id} className={`bg-gradient-to-b ${SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]} p-5`}>
                    <Link href={localizeHref(col.href)} className="group/link flex items-start justify-between gap-2">
                                <span>
                                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                                    0{index + 1}
                                  </span>
                                  <span className="mt-1 block text-sm font-semibold leading-snug text-dark transition-colors group-hover/link:text-primary">
                                    {tNav(col.labelKey)}
                                  </span>
                                </span>
                                <span className="mt-1 shrink-0 text-primary/40">→</span>
                              </Link>
                              <ul className="mt-4 space-y-0.5">
                                {col.items.map((it) => (
                                  <li key={it.id}>
                                    <Link
                                      href={localizeHref(it.href)}
                                      className="block rounded-lg px-2 py-1.5 text-[13px] text-text/75 transition-colors hover:bg-white/80 hover:text-primary"
                                    >
                                      {tNav(it.labelKey)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    href={localizeHref(item.href)}
                    className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${
                      active ? "bg-primary/10 text-primary" : "text-text/80 hover:bg-soft-background hover:text-dark"
                    }`}
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 sm:gap-2.5">
          <div className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-soft-background/80 p-1 md:flex" role="group" aria-label={tAria("language")}>
            {routing.locales.map((code) => (
              <button
                key={code}
                type="button"
                className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                  locale === code ? "bg-white text-primary shadow-sm" : "text-text/50 hover:text-dark"
                }`}
                aria-pressed={locale === code}
                onClick={() => switchLocale(code)}
              >
                {LOCALE_LABELS[code]}
              </button>
            ))}
          </div>

          <Link
            href={localizeHref("/insights")}
            className="hidden size-9 items-center justify-center rounded-full border border-border/70 bg-white text-dark/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary lg:inline-flex"
            aria-label={tAria("search")}
          >
            <SearchIcon />
          </Link>

          <div className="hidden md:block">
            <StartProjectButton
              className="group items-center gap-2"
              arrowClassName="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </div>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-white text-dark transition-colors hover:border-primary/30 hover:bg-primary/5 lg:hidden"
            aria-controls={menuId}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? tAria("closeMenu") : tAria("openMenu")}
            onClick={() => setMobileOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id={menuId}
          className="fixed inset-x-4 top-[calc(4.25rem+0.5rem)] z-50 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_rgba(18,59,86,0.15)] lg:hidden"
        >
          <nav aria-label="Mobile" className="p-4">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.href);
                if (item.id === "services") {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                          active ? "bg-primary/10 text-primary" : "text-text hover:bg-soft-background"
                        }`}
                        aria-expanded={openServices}
                        onClick={() => setOpenServices((v) => !v)}
                      >
                        {tNav(item.labelKey)}
                        <Chevron open={openServices} />
                      </button>

                      {openServices ? (
                        <ul className="mt-1 space-y-1 ps-2">
                          {SERVICE_COLUMNS.map((col) => {
                            const groupOpen = openGroup === col.id;
                            return (
                              <li key={col.id}>
                                <button
                                  type="button"
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-dark"
                                  aria-expanded={groupOpen}
                                  onClick={() => setOpenGroup(groupOpen ? null : col.id)}
                                >
                                  {tNav(col.labelKey)}
                                  <Chevron open={groupOpen} />
                                </button>
                                {groupOpen ? (
                                  <ul className="mb-1 space-y-0.5 ps-3">
                                    <li>
                                      <Link href={localizeHref(col.href)} className="block rounded-lg px-3 py-1.5 text-sm text-text/70 hover:bg-soft-background hover:text-primary">
                                        {tNav("overview")}
                                      </Link>
                                    </li>
                                    {col.items.map((it) => (
                                      <li key={it.id}>
                                        <Link href={localizeHref(it.href)} className="block rounded-lg px-3 py-1.5 text-sm text-text/70 hover:bg-soft-background hover:text-primary">
                                          {tNav(it.labelKey)}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <Link
                      href={localizeHref(item.href)}
                      className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active ? "bg-primary/10 text-primary" : "text-text hover:bg-soft-background"
                      }`}
                    >
                      {tNav(item.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
              <div className="flex items-center gap-0.5 rounded-full border border-border/70 bg-soft-background p-1" role="group" aria-label={tAria("language")}>
                {routing.locales.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                      locale === code ? "bg-white text-primary shadow-sm" : "text-text/50"
                    }`}
                    aria-pressed={locale === code}
                    onClick={() => switchLocale(code)}
                  >
                    {LOCALE_LABELS[code]}
                  </button>
                ))}
              </div>

              <Link href={localizeHref("/insights")} className="flex size-9 items-center justify-center rounded-full border border-border/70 text-dark/70 hover:bg-soft-background" aria-label={tAria("search")}>
                <SearchIcon />
              </Link>
            </div>

            <StartProjectButton className="mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}

