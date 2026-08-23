"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  className = "",
  style,
}: {
  project: Project;
  className?: string;
  style?: CSSProperties;
}) {
  const t = useTranslations("projects");
  const tPage = useTranslations("projectPage");
  const locale = useLocale();

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-[0_12px_32px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_44px_rgba(18,59,86,0.12)] ${className}`}
      style={style}
    >
      <Link
        href={`/${locale}/${project.slug}`}
        className="block p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
      >
        <div className="project-card-media project-card-media-photo relative flex h-40 items-end rounded-2xl p-4">
          <Image
            src={project.image}
            alt={t(`items.${project.id}.title`)}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <span className="relative z-10 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {t(`items.${project.id}.category`)}
          </span>
        </div>

        <div className="mt-5 transition-transform duration-300 group-hover:-translate-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-sm text-text/55 transition-colors duration-300 group-hover:text-primary/80">
            <FiMapPin className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
            {t(`items.${project.id}.country`)}
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary">
            {t(`items.${project.id}.title`)}
          </h3>
          <p className="mt-2 text-sm leading-6 text-text/70">
            {t(`items.${project.id}.description`)}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            {tPage("viewProject")}
            <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
