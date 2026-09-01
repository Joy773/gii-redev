"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FiCheck, FiChevronDown, FiSearch, FiX } from "react-icons/fi";

import { PROJECT_SECTORS, PROJECTS, type Project, type ProjectSector } from "../data/projects";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ViewAllProjectsButton } from "./common/buttons";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./common/ScrollReveal";

function revealClass(visible: boolean) {
  return visible ? "section-fade section-fade-visible" : "section-fade";
}

type FilterSector = "all" | ProjectSector;

type ProjectsProps = {
  hideViewAll?: boolean;
  showFilters?: boolean;
  filterBySector?: ProjectSector;
  filterByProjectIds?: Project["id"][];
  sectionNamespace?: string;
  backgroundClassName?: string;
};

export default function Projects({
  hideViewAll = false,
  showFilters = false,
  filterBySector,
  filterByProjectIds,
  sectionNamespace = "projects",
  backgroundClassName = "grid-surface-soft",
}: ProjectsProps) {
  const t = useTranslations("projects");
  const tSection = useTranslations(sectionNamespace);
  const tNav = useTranslations("nav");
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const [query, setQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<FilterSector>("all");
  const [sectorOpen, setSectorOpen] = useState(false);
  const sectorRef = useRef<HTMLDivElement>(null);

  const sectorLabel = (id: FilterSector) =>
    id === "all" ? t("filters.all") : tNav(id);

  const filteredProjects = useMemo(() => {
    const source = filterByProjectIds?.length
      ? PROJECTS.filter((project) => filterByProjectIds.includes(project.id))
      : filterBySector
        ? PROJECTS.filter((project) => project.sector === filterBySector)
        : showFilters
          ? PROJECTS
          : PROJECTS.filter((project) => project.showOnHome);

    if (!showFilters) return [...source];

    const normalizedQuery = query.trim().toLowerCase();

    return source.filter((project) => {
      if (selectedSector !== "all" && project.sector !== selectedSector) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        t(`items.${project.id}.title`),
        t(`items.${project.id}.description`),
        t(`items.${project.id}.category`),
        t(`items.${project.id}.country`),
        tNav(project.sector),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [filterByProjectIds, filterBySector, showFilters, query, selectedSector, t, tNav]);

  useEffect(() => {
    if (!sectorOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!sectorRef.current?.contains(event.target as Node)) {
        setSectorOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [sectorOpen]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`grid-surface ${backgroundClassName} scroll-mt-24 py-20 sm:py-24`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideViewAll ? (
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="max-w-2xl">
              <span
                className={`inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary dark:bg-white/10 dark:text-white/90 ${revealClass(isVisible)}`}
                style={{ transitionDelay: "0ms" }}
              >
                <span className="eyebrow-dot-pulse size-2 rounded-full bg-primary" />
                {tSection("eyebrow")}
              </span>
              <ScrollReveal
                baseOpacity={0.25}
                enableBlur
                baseRotation={4}
                blurStrength={18}
                containerClassName="mt-6 text-center sm:text-left"
                textClassName="text-center text-4xl font-semibold tracking-tight text-dark dark:text-white sm:text-left sm:text-5xl"
              >
                {tSection("title")}
              </ScrollReveal>
              <p
                className={`mt-4 max-w-xl text-lg leading-8 text-text/72 dark:text-white/78 ${revealClass(isVisible)}`}
                style={{ transitionDelay: "160ms" }}
              >
                {tSection("description")}
              </p>
            </div>

            <div
              className={`shrink-0 ${revealClass(isVisible)}`}
              style={{ transitionDelay: "240ms" }}
            >
              <ViewAllProjectsButton />
            </div>
          </div>
        ) : null}

        {showFilters ? (
          <div className={`relative z-30 rounded-[1.75rem] border border-border/70 bg-surface/80 p-3 shadow-[0_12px_40px_rgba(18,59,86,0.06)] backdrop-blur-xl sm:p-4 ${hideViewAll ? "" : "mt-10"}`}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">{t("filters.searchAria")}</span>
                <FiSearch
                  className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-text/40"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("filters.searchPlaceholder")}
                  className="w-full rounded-2xl border border-transparent bg-soft-background py-3.5 pr-12 pl-11 text-sm text-dark outline-none transition-[border,box-shadow,background] placeholder:text-text/40 focus:border-primary/25 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(49,121,171,0.12)]"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-text/45 transition-colors hover:bg-border/40 hover:text-dark"
                    aria-label={t("filters.clearSearch")}
                  >
                    <FiX className="size-4" aria-hidden="true" />
                  </button>
                ) : null}
              </label>

              <div ref={sectorRef} className="relative w-full lg:w-[22rem] lg:shrink-0">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={sectorOpen}
                  aria-label={t("filters.aria")}
                  onClick={() => setSectorOpen((open) => !open)}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent bg-soft-background py-3.5 pr-4 pl-4 text-left text-sm font-medium text-dark outline-none transition-[border,box-shadow,background] hover:bg-surface focus:border-primary/25 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(49,121,171,0.12)]"
                >
                  <span className="min-w-0 truncate">{sectorLabel(selectedSector)}</span>
                  <FiChevronDown
                    className={`size-4 shrink-0 text-text/45 transition-transform duration-200 ${
                      sectorOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {sectorOpen ? (
                  <ul
                    role="listbox"
                    aria-label={t("filters.aria")}
                    className="absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-border/70 bg-surface p-1.5 shadow-[0_18px_50px_rgba(18,59,86,0.14)]"
                  >
                    {(["all", ...PROJECT_SECTORS] as const).map((id) => {
                      const selected = selectedSector === id;
                      return (
                        <li key={id} role="option" aria-selected={selected}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSector(id);
                              setSectorOpen(false);
                            }}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                              selected
                                ? "bg-primary/10 font-semibold text-primary"
                                : "font-medium text-text/75 hover:bg-soft-background hover:text-dark"
                            }`}
                          >
                            <span>{sectorLabel(id)}</span>
                            {selected ? <FiCheck className="size-4 shrink-0" aria-hidden="true" /> : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {showFilters ? (
          <p className="mt-5 text-sm font-medium text-text/50">
            {t("filters.resultCount", { count: filteredProjects.length })}
          </p>
        ) : null}

        {filteredProjects.length > 0 ? (
          <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${showFilters ? "mt-5" : "mt-12"}`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                className={revealClass(isVisible)}
                style={{ transitionDelay: `${320 + index * 100}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.75rem] border border-dashed border-border/80 bg-surface/50 px-6 py-16 text-center">
            <p className="text-base font-medium text-dark">{t("filters.empty")}</p>
            <p className="mt-2 text-sm text-text/55">{t("filters.emptyHint")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
