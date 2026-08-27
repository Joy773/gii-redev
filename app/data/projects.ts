export const PROJECT_SECTORS = [
  "digitalTransformation",
  "softwareDigitalPlatforms",
  "aiData",
  "iotWsnSmartSystems",
  "sustainableTechnology",
  "ictSystemsIntegration",
] as const;

export type ProjectSector = (typeof PROJECT_SECTORS)[number];

export const PROJECTS = [
  {
    id: "mewf",
    slug: "mewf",
    image: "/projects/mewf.png",
    sector: "sustainableTechnology",
    showOnHome: true,
  },
  {
    id: "clivent",
    slug: "clivent",
    image: "/projects/clivent.jpg",
    sector: "sustainableTechnology",
    showOnHome: true,
  },
  {
    id: "germanCare",
    slug: "german-care",
    image: "/projects/german-care.jpg",
    sector: "softwareDigitalPlatforms",
    showOnHome: true,
  },
  {
    id: "urbanFeeding",
    slug: "smart-urban-feeding-water-station",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "iotWsnSmartSystems",
    showOnHome: false,
  },
  {
    id: "enerbe",
    slug: "enerbe",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "sustainableTechnology",
    showOnHome: false,
  },
  {
    id: "svAkafa",
    slug: "sv-akafa",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "ictSystemsIntegration",
    showOnHome: false,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  slug: string;
  image: string;
  sector: ProjectSector;
  showOnHome: boolean;
}>;

export type Project = (typeof PROJECTS)[number];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
