"use client";

import { useTranslations } from "next-intl";

import type { Project } from "../data/projects";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ViewAllProjectsButton } from "./common/buttons";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./common/ScrollReveal";

function revealClass(visible: boolean) {
  return visible ? "section-fade section-fade-visible" : "section-fade";
}

export default function RelatedProjects({ projects }: { projects: Project[] }) {
  const tPage = useTranslations("projectPage");
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="grid-surface bg-[#122A3B] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div className="max-w-2xl">
            <ScrollReveal
              baseOpacity={0.25}
              enableBlur
              baseRotation={4}
              blurStrength={18}
              containerClassName="text-center sm:text-left"
              textClassName="text-center text-4xl font-semibold tracking-tight text-white sm:text-left sm:text-5xl"
            >
              {tPage("related")}
            </ScrollReveal>
            <p
              className={`mt-4 max-w-xl text-lg leading-8 text-white/70 ${revealClass(isVisible)}`}
              style={{ transitionDelay: "160ms" }}
            >
              {tPage("relatedDescription")}
            </p>
          </div>

          <div
            className={`shrink-0 ${revealClass(isVisible)}`}
            style={{ transitionDelay: "240ms" }}
          >
            <ViewAllProjectsButton />
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={revealClass(isVisible)}
              style={{ transitionDelay: `${320 + index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
