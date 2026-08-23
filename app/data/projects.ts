export const PROJECTS = [
  {
    id: "mewf",
    slug: "mewf",
    image: "/projects/mewf.png",
  },
  {
    id: "clivent",
    slug: "clivent",
    image: "/projects/clivent.jpg",
  },
  {
    id: "germanCare",
    slug: "german-care",
    image: "/projects/german-care.jpg",
  },
] as const;

export type Project = (typeof PROJECTS)[number];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
