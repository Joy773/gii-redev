"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { type ComponentType, type FormEvent, useState } from "react";
import {
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

import { NAV_LINKS, SERVICE_COLUMNS, type NavLink } from "./navConfig";

type SocialLink = {
  id: string;
  labelKey: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", labelKey: "linkedin", href: "https://linkedin.com", Icon: FiLinkedin },
  { id: "twitter", labelKey: "twitter", href: "https://twitter.com", Icon: FiTwitter },
  { id: "facebook", labelKey: "facebook", href: "https://facebook.com", Icon: FiFacebook },
  { id: "instagram", labelKey: "instagram", href: "https://instagram.com", Icon: FiInstagram },
];

const LEGAL_LINKS: NavLink[] = [
  { id: "support", labelKey: "support", href: "/contact" },
  { id: "privacy", labelKey: "privacy", href: "/privacy" },
  { id: "terms", labelKey: "terms", href: "/terms" },
  { id: "imprint", labelKey: "imprint", href: "/imprint" },
];

const COMPANY_LINKS = NAV_LINKS.filter((link) => link.id !== "services");

function localizeHref(locale: string, href: string) {
  if (href.startsWith("http")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

function FooterColumn({
  title,
  titleHref,
  links,
}: {
  title: string;
  titleHref?: string;
  links: NavLink[];
}) {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div>
      {titleHref ? (
        <Link
          href={localizeHref(locale, titleHref)}
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-primary"
        >
          {title}
        </Link>
      ) : (
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
          {title}
        </h3>
      )}

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={localizeHref(locale, link.href)}
              className="inline-block text-sm text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    window.location.href = `${localizeHref(locale, "/contact")}${query}`;
  };

  return (
    <footer className="relative overflow-hidden bg-[#0e2433] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(49,121,171,0.16),transparent_34%),radial-gradient(circle_at_92%_100%,rgba(49,121,171,0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="lg:col-span-5">
            <Link
              href={localizeHref(locale, "/")}
              className="inline-block"
              aria-label={t("homeAria")}
            >
              <Image
                src="/GII-Logo.webp"
                alt="German Innovation Institution"
                width={220}
                height={48}
                className="h-9 w-auto brightness-0 invert sm:h-10"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              {t("tagline")}
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ id, labelKey, href, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(labelKey)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {t("contactEyebrow")}
            </span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t("contactTitle")}
            </h3>

            <form onSubmit={handleSubmit} className="relative mt-5 max-w-md">
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

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4 lg:gap-8">
          <FooterColumn title={t("navTitle")} links={COMPANY_LINKS} />
          {SERVICE_COLUMNS.map((column) => (
            <FooterColumn
              key={column.id}
              title={tNav(column.labelKey)}
              titleHref={column.href}
              links={column.items}
            />
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-white/45">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={localizeHref(locale, link.href)}
                  className="text-sm text-white/45 transition-colors hover:text-white/80"
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
