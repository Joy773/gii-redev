"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import { NAV_LINKS, SERVICE_COLUMNS, type NavLink, type ServiceColumn } from "./navConfig";

type FooterLink = NavLink & {
  external?: boolean;
};

const SOCIAL_LINKS: FooterLink[] = [
  { id: "linkedin", labelKey: "linkedin", href: "https://linkedin.com", external: true },
  { id: "twitter", labelKey: "twitter", href: "https://twitter.com", external: true },
  { id: "facebook", labelKey: "facebook", href: "https://facebook.com", external: true },
  { id: "instagram", labelKey: "instagram", href: "https://instagram.com", external: true },
];

const LEGAL_LINKS: FooterLink[] = [
  { id: "support", labelKey: "support", href: "/contact" },
  { id: "privacy", labelKey: "privacy", href: "/privacy" },
  { id: "terms", labelKey: "terms", href: "/terms" },
  { id: "imprint", labelKey: "imprint", href: "/imprint" },
];

function localizeHref(locale: string, href: string) {
  if (href.startsWith("http")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

function FooterLinkList({
  title,
  links,
  labelNamespace,
}: {
  title: string;
  links: FooterLink[];
  labelNamespace: "nav" | "footer";
}) {
  const t = useTranslations(labelNamespace);
  const locale = useLocale();

  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={localizeHref(locale, link.href)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm text-white/65 transition-colors hover:text-primary"
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterServiceColumn({ column }: { column: ServiceColumn }) {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div>
      <Link
        href={localizeHref(locale, column.href)}
        className="text-sm font-semibold tracking-wide text-white transition-colors hover:text-primary"
      >
        {t(column.labelKey)}
      </Link>
      <ul className="mt-4 space-y-2.5">
        {column.items.map((item) => (
          <li key={item.id}>
            <Link
              href={localizeHref(locale, item.href)}
              className="text-sm text-white/65 transition-colors hover:text-primary"
            >
              {t(item.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    window.location.href = `${localizeHref(locale, "/contact")}${query}`;
  };

  return (
    <footer className="relative overflow-hidden bg-[#0e2433] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(49,121,171,0.14),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(49,121,171,0.1),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href={localizeHref(locale, "/")} className="inline-block" aria-label={t("homeAria")}>
              <Image
                src="/GII-Logo.webp"
                alt="German Innovation Institution"
                width={220}
                height={48}
                className="h-9 w-auto brightness-0 invert sm:h-10"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              {t("tagline")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-6 lg:grid-cols-3 xl:grid-cols-5">
            <FooterLinkList
              title={t("navTitle")}
              links={NAV_LINKS}
              labelNamespace="nav"
            />
            {SERVICE_COLUMNS.map((column) => (
              <FooterServiceColumn key={column.id} column={column} />
            ))}
            <FooterLinkList
              title={t("socialTitle")}
              links={SOCIAL_LINKS}
              labelNamespace="footer"
            />
          </div>

          <div className="lg:col-span-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {t("contactEyebrow")}
            </span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t("contactTitle")}
            </h3>
            <form onSubmit={handleSubmit} className="relative mt-5">
              <label htmlFor="footer-email" className="sr-only">
                {t("emailPlaceholder")}
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full rounded-full border border-white/10 bg-white py-3.5 pr-14 pl-5 text-sm text-dark outline-none transition-shadow placeholder:text-text/45 focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(49,121,171,0.2)]"
              />
              <button
                type="submit"
                aria-label={t("submitAria")}
                className="absolute top-1/2 right-1.5 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                <FiArrowRight className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-white/50">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={localizeHref(locale, link.href)}
                  className="text-sm text-white/50 transition-colors hover:text-white/80"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
