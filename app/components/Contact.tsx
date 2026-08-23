"use client";

import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  FiArrowRight,
  FiCheck,
  FiMail,
  FiMapPin,
  FiPaperclip,
  FiPhone,
} from "react-icons/fi";

import ScrollReveal from "./common/ScrollReveal";
import { SERVICE_COLUMNS } from "./common/navConfig";

const BUDGETS = ["undecided", "s", "m", "l", "xl"] as const;
const TIMELINES = ["asap", "threeMonths", "sixMonths", "exploring"] as const;

export default function Contact() {
  const t = useTranslations("contactPage");
  const tNav = useTranslations("nav");
  const [email, setEmail] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presetEmail = params.get("email");
    if (presetEmail) setEmail(presetEmail);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="grid-surface grid-surface-white py-20 sm:py-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiCheck className="size-7" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
            {t("successTitle")}
          </h1>
          <p className="mt-4 text-base leading-7 text-text/70 sm:text-lg">
            {t("successBody")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="grid-surface grid-surface-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>
          <ScrollReveal
            playOnMount
            baseOpacity={0.25}
            enableBlur
            baseRotation={4}
            blurStrength={18}
            containerClassName="mt-6 text-center lg:text-left"
            textClassName="text-center text-4xl font-semibold tracking-tight text-dark sm:text-5xl lg:text-left"
          >
            {t("title")}
          </ScrollReveal>
          <p className="mt-5 text-base leading-7 text-text/70 sm:text-lg sm:leading-8">
            {t("description")}
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 text-left">
            <li className={contactCardClass}>
              <span className={contactIconClass}>
                <FiMail className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text/45">
                  {t("emailLabel")}
                </div>
                <a
                  href={`mailto:${t("emailValue")}`}
                  className="mt-1 block truncate text-sm font-medium text-dark transition-colors group-hover:text-primary"
                >
                  {t("emailValue")}
                </a>
              </div>
            </li>
            <li className={contactCardClass}>
              <span className={contactIconClass}>
                <FiPhone className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text/45">
                  {t("phoneLabel")}
                </div>
                <a
                  href="tel:+493053152061"
                  className="mt-1 block text-sm font-medium text-dark transition-colors group-hover:text-primary"
                >
                  {t("phoneValue")}
                </a>
              </div>
            </li>
            <li className={`col-span-2 ${contactCardClass}`}>
              <span className={contactIconClass}>
                <FiMapPin className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text/45">
                  {t("locationLabel")}
                </div>
                <p className="mt-1 text-sm font-medium leading-6 text-dark transition-colors group-hover:text-primary">
                  {t("locationCompany")}, {t("locationStreet")} {t("locationCity")} {t("locationCountry")}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="panel-surface rounded-[1.75rem] border border-border/70 p-5 shadow-[0_16px_48px_rgba(18,59,86,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight text-dark sm:text-2xl">
            {t("formHeading")}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label={t("fields.name")} htmlFor="contact-name">
              <input id="contact-name" name="name" required autoComplete="name" className={fieldClass} />
            </Field>
            <Field label={t("fields.company")} htmlFor="contact-company">
              <input id="contact-company" name="company" required autoComplete="organization" className={fieldClass} />
            </Field>
            <Field label={t("fields.country")} htmlFor="contact-country">
              <input id="contact-country" name="country" required autoComplete="country-name" className={fieldClass} />
            </Field>
            <Field label={t("fields.email")} htmlFor="contact-email">
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label={t("fields.phone")} htmlFor="contact-phone">
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
            </Field>
            <Field label={t("fields.sector")} htmlFor="contact-sector">
              <select id="contact-sector" name="sector" defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  {t("sector.placeholder")}
                </option>
                <option value="undecided">{t("sector.undecided")}</option>
                {SERVICE_COLUMNS.map((column) => (
                  <optgroup key={column.id} label={tNav(column.labelKey)}>
                    {column.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {tNav(item.labelKey)}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <optgroup label={tNav("consultancy")}>
                  <option value="consultancy">{tNav("consultancy")}</option>
                </optgroup>
              </select>
            </Field>
            <Field label={t("fields.budget")} htmlFor="contact-budget">
              <select id="contact-budget" name="budget" defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  {t("budget.placeholder")}
                </option>
                {BUDGETS.map((id) => (
                  <option key={id} value={id}>
                    {t(`budget.options.${id}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("fields.timeline")} htmlFor="contact-timeline">
              <select id="contact-timeline" name="timeline" defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  {t("timeline.placeholder")}
                </option>
                {TIMELINES.map((id) => (
                  <option key={id} value={id}>
                    {t(`timeline.options.${id}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={t("fields.description")} htmlFor="contact-description" className="mt-4">
            <textarea
              id="contact-description"
              name="description"
              required
              rows={5}
              className={`${fieldClass} resize-y`}
            />
          </Field>

          <label className="field-fill mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-text/70 transition-colors hover:border-primary/35 hover:text-primary">
            <FiPaperclip className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate">
              {fileName || t("fields.file")}
            </span>
            <input
              type="file"
              name="brief"
              className="sr-only"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
          </label>

          <button
            type="submit"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-navy px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(49,121,171,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(18,59,86,0.28)] dark:from-primary dark:to-primary dark:shadow-[0_8px_24px_rgba(49,121,171,0.4)] dark:hover:shadow-[0_12px_32px_rgba(49,121,171,0.5)] sm:w-auto"
          >
            {t("submit")}
            <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

const contactCardClass =
  "group flex items-start gap-3 rounded-2xl border border-border/70 bg-[var(--soft-background)] p-4 shadow-[0_8px_24px_rgba(18,59,86,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-[var(--elevated)] hover:shadow-[0_14px_36px_rgba(18,59,86,0.1)]";

const contactIconClass =
  "panel-surface inline-flex size-10 shrink-0 items-center justify-center rounded-full text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/25 group-hover:bg-primary/10";

const fieldClass =
  "field-fill mt-1.5 w-full rounded-xl border border-border/80 px-3.5 py-2.5 text-sm outline-none transition-shadow placeholder:text-text/40 focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(49,121,171,0.16)]";

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-dark">
        {label}
      </label>
      {children}
    </div>
  );
}
