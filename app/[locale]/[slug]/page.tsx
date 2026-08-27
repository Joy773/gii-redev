import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ProjectDetail from "../../components/ProjectDetail";
import { PROJECTS, getProjectBySlug } from "../../data/projects";

export const dynamicParams = true;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "GII" };
  }

  const t = await getTranslations("projects");

  return {
    title: `${t(`items.${project.id}.title`)} | GII`,
    description: t(`items.${project.id}.description`),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} locale={locale} />;
}
