"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { StartProjectButton } from "./buttons";
import { FiMoon } from "react-icons/fi";

type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

type NavItem = NavLink;

type Language = {
  code: "en" | "de";
  label: string;
  dir: "ltr";
};

const SERVICE_GROUPS: NavLink[] = [
  {
    label: "Digital Transformation",
    href: "/digital-transformation",
    children: [
      {
        label: "Digitalisierung für Unternehmen",
        href: "/digital-transformation",
      },
      { label: "Mittelstand", href: "/mittelstand" },
      { label: "Industry 4.0", href: "/industry-4-0" },
      { label: "AI Transformation", href: "/ai" },
      {
        label: "Cloud & Cybersecurity",
        href: "/digital-transformation#cloud-cybersecurity",
      },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    children: [
      { label: "Software Development", href: "/software" },
      { label: "AI", href: "/ai" },
      { label: "IoT & Embedded", href: "/iot" },
      { label: "Digital Platforms", href: "/platforms" },
      { label: "Medical Technology", href: "/medical" },
      { label: "Digital Education", href: "/education" },
      { label: "E-Commerce", href: "/ecommerce" },
    ],
  },
  {
    label: "Sustainable Solutions",
    href: "/sustainable-solutions",
    children: [
      { label: "Water", href: "/sustainable-solutions#water" },
      { label: "Energy", href: "/sustainable-solutions#energy" },
      {
        label: "Ventilation & HVAC",
        href: "/sustainable-solutions#ventilation",
      },
      { label: "Environment", href: "/sustainable-solutions#environment" },
    ],
  },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/digital-transformation",
    children: SERVICE_GROUPS,
  },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LANGUAGES: Language[] = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "de", label: "DE", dir: "ltr" },
];

const SERVICE_ACCENTS = [
  "from-primary/15 to-primary/5",
  "from-dark/12 to-dark/4",
  "from-primary/10 to-soft-background",
] as const;

function matchesPath(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function isActive(pathname: string, item: NavLink): boolean {
  if (matchesPath(pathname, item.href)) return true;
  return Boolean(item.children?.some((child) => isActive(pathname, child)));
}

function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-3.5 shrink-0 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""} ${className}`}
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

function navLinkClass(active: boolean) {
  return active
    ? "bg-primary/10 text-primary"
    : "text-text/80 hover:bg-soft-background hover:text-dark";
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-4 ${className}`}
    >
      <path
        d="M4.5 10h11M11.5 5.5 16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      {open ? (
        <path
          d="M6 6 18 18M18 6 6 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [scrolled, setScrolled] = useState(false);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const setLangTimeoutRef = useRef<number | null>(null);
  const clearLangTimeoutRef = useRef<number | null>(null);
  const dropdownCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;
  }, [language]);

  useEffect(() => {
    return () => {
      if (setLangTimeoutRef.current) window.clearTimeout(setLangTimeoutRef.current);
      if (clearLangTimeoutRef.current) window.clearTimeout(clearLangTimeoutRef.current);
      if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setOpenGroup(null);
  }, [pathname]);

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
        <Link
          href="/"
          className="group shrink-0 transition-transform duration-300 hover:scale-[1.02]"
          aria-label="GII home"
        >
          <Image
            src="/GII-Logo.webp"
            alt="German Innovation Institution"
            width={220}
            height={48}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-1 rounded-full border border-border/60 bg-soft-background/60 p-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item);
              const open = openDropdown === item.label;

              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${navLinkClass(active)}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
                    setOpenDropdown(item.label);
                  }}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${
                      active || open
                        ? "bg-primary/10 text-primary"
                        : "text-text/80 hover:bg-white hover:text-dark"
                    }`}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(open ? null : item.label)}
                    onMouseEnter={() => {
                      if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
                      setOpenDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      // Delay close slightly so moving from the button into the absolute dropdown
                      // doesn't immediately collapse it.
                      dropdownCloseTimeoutRef.current = window.setTimeout(() => {
                        setOpenDropdown(null);
                      }, 120);
                    }}
                  >
                    {item.label}
                    <Chevron open={open} />
                  </button>

                  <div
                    className={`absolute top-[calc(100%+0.5rem)] left-1/2 z-50 w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-300 ease-out ${
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                    onMouseEnter={() => {
                      if (dropdownCloseTimeoutRef.current) window.clearTimeout(dropdownCloseTimeoutRef.current);
                    }}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_rgba(18,59,86,0.12)]">
                      <div className="grid grid-cols-3 divide-x divide-border/60">
                        {item.children.map((group, index) => (
                          <div
                            key={group.label}
                            className={`bg-gradient-to-b ${SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]} p-5`}
                          >
                            <Link
                              href={group.href}
                              className="group/link flex items-start justify-between gap-2"
                            >
                              <span>
                                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                                  0{index + 1}
                                </span>
                                <span className="mt-1 block text-sm font-semibold leading-snug text-dark transition-colors group-hover/link:text-primary">
                                  {group.label}
                                </span>
                              </span>
                              <ArrowIcon className="mt-1 shrink-0 text-primary/40 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-primary" />
                            </Link>
                            <ul className="mt-4 space-y-0.5">
                              {group.children?.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    className="block rounded-lg px-2 py-1.5 text-[13px] text-text/75 transition-colors hover:bg-white/80 hover:text-primary"
                                  >
                                    {child.label}
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
            })}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 sm:gap-2.5">
          <div
            className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-soft-background/80 p-1 md:flex"
            role="group"
            aria-label="Language"
          >
            {LANGUAGES.map((option) => {
              const selected = language.code === option.code;
              return (
                <button
                  key={option.code}
                  type="button"
                  className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                    selected
                      ? "bg-white text-primary shadow-sm"
                      : "text-text/50 hover:text-dark"
                  }`}
                  aria-pressed={selected}
                      onClick={() => {
                        if (selected) return;
                        if (setLangTimeoutRef.current) {
                          window.clearTimeout(setLangTimeoutRef.current);
                        }
                        if (clearLangTimeoutRef.current) {
                          window.clearTimeout(clearLangTimeoutRef.current);
                        }
                        setIsLangTransitioning(true);
                        setLangTimeoutRef.current = window.setTimeout(() => {
                          setLanguage(option);
                        }, 120);
                        clearLangTimeoutRef.current = window.setTimeout(() => {
                          setIsLangTransitioning(false);
                        }, 420);
                      }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <Link
            href="/insights"
            className="hidden size-9 items-center justify-center rounded-full border border-border/70 bg-white text-dark/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary lg:inline-flex"
            aria-label="Search insights, partners and projects"
          >
            <SearchIcon />
          </Link>

          <StartProjectButton
            className="group hidden items-center gap-2 md:inline-flex"
            arrowClassName="transition-transform duration-300 group-hover:translate-x-0.5"
          />

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-white text-dark transition-colors hover:border-primary/30 hover:bg-primary/5 lg:hidden"
            aria-controls={menuId}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-dark/20 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={menuId}
            className="fixed inset-x-4 top-[calc(4.25rem+0.5rem)] z-50 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_rgba(18,59,86,0.15)] lg:hidden"
          >
            <nav aria-label="Mobile" className="p-4">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item);
                  const open = openDropdown === item.label;

                  if (!item.children) {
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-text hover:bg-soft-background"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-text hover:bg-soft-background"
                        }`}
                        aria-expanded={open}
                        onClick={() => {
                          setOpenDropdown(open ? null : item.label);
                          setOpenGroup(null);
                        }}
                      >
                        {item.label}
                        <Chevron open={open} />
                      </button>
                      {open ? (
                        <ul className="mt-1 space-y-1 ps-2">
                          {item.children.map((group) => {
                            const groupOpen = openGroup === group.label;
                            return (
                              <li key={group.label}>
                                <button
                                  type="button"
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-dark"
                                  aria-expanded={groupOpen}
                                  onClick={() =>
                                    setOpenGroup(groupOpen ? null : group.label)
                                  }
                                >
                                  {group.label}
                                  <Chevron open={groupOpen} />
                                </button>
                                {groupOpen ? (
                                  <ul className="mb-1 space-y-0.5 ps-3">
                                    <li>
                                      <Link
                                        href={group.href}
                                        className="block rounded-lg px-3 py-1.5 text-sm text-text/70 hover:bg-soft-background hover:text-primary"
                                      >
                                        Overview
                                      </Link>
                                    </li>
                                    {group.children?.map((child) => (
                                      <li key={child.label}>
                                        <Link
                                          href={child.href}
                                          className="block rounded-lg px-3 py-1.5 text-sm text-text/70 hover:bg-soft-background hover:text-primary"
                                        >
                                          {child.label}
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
                })}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                <div
                  className="flex items-center gap-0.5 rounded-full border border-border/70 bg-soft-background p-1"
                  role="group"
                  aria-label="Language"
                >
                  {LANGUAGES.map((option) => {
                    const selected = language.code === option.code;
                    return (
                      <button
                        key={option.code}
                        type="button"
                        className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                          selected
                            ? "bg-white text-primary shadow-sm"
                            : "text-text/50"
                        }`}
                        aria-pressed={selected}
                        onClick={() => {
                          if (selected) return;
                          if (setLangTimeoutRef.current) {
                            window.clearTimeout(setLangTimeoutRef.current);
                          }
                          if (clearLangTimeoutRef.current) {
                            window.clearTimeout(clearLangTimeoutRef.current);
                          }
                          setIsLangTransitioning(true);
                          setLangTimeoutRef.current = window.setTimeout(() => {
                            setLanguage(option);
                          }, 120);
                          clearLangTimeoutRef.current = window.setTimeout(() => {
                            setIsLangTransitioning(false);
                          }, 420);
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <Link
                  href="/insights"
                  className="flex size-9 items-center justify-center rounded-full border border-border/70 text-dark/70 hover:bg-soft-background"
                  aria-label="Search insights, partners and projects"
                >
                  <SearchIcon />
                </Link>
              </div>

              <StartProjectButton
                className="mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm"
              />
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
