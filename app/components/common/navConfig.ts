export type NavLink = {
  id: string;
  labelKey: string;
  href: string;
};

export type ServiceColumn = {
  id: string;
  labelKey: string;
  href: string;
  items: NavLink[];
};

export const NAV_LINKS: NavLink[] = [
  { id: "home", labelKey: "home", href: "/" },
  { id: "services", labelKey: "services", href: "/digital-transformation" },
  { id: "consultancy", labelKey: "consultancy", href: "/consultancy" },
  { id: "projects", labelKey: "projects", href: "/projects" },
  { id: "insights", labelKey: "insights", href: "/insights" },
  { id: "about", labelKey: "about", href: "/about" },
  { id: "contact", labelKey: "contact", href: "/contact" },
];

export const SERVICE_COLUMNS: ServiceColumn[] = [
  {
    id: "digitalTransformation",
    labelKey: "digitalTransformation",
    href: "/digital-transformation",
    items: [
      { id: "digitalisierung", labelKey: "digitalisierung", href: "/digital-transformation" },
      { id: "mittelstand", labelKey: "mittelstand", href: "/mittelstand" },
      { id: "industry40", labelKey: "industry40", href: "/industry-4-0" },
      { id: "aiTransformation", labelKey: "aiTransformation", href: "/ai" },
      {
        id: "cloudCybersecurity",
        labelKey: "cloudCybersecurity",
        href: "/digital-transformation#cloud-cybersecurity",
      },
    ],
  },
  {
    id: "technology",
    labelKey: "technology",
    href: "/technology",
    items: [
      { id: "softwareDevelopment", labelKey: "softwareDevelopment", href: "/software" },
      { id: "ai", labelKey: "ai", href: "/ai" },
      { id: "iotEmbedded", labelKey: "iotEmbedded", href: "/iot" },
      { id: "digitalPlatforms", labelKey: "digitalPlatforms", href: "/platforms" },
      { id: "medicalTechnology", labelKey: "medicalTechnology", href: "/medical" },
      { id: "digitalEducation", labelKey: "digitalEducation", href: "/education" },
      { id: "ecommerce", labelKey: "ecommerce", href: "/ecommerce" },
    ],
  },
  {
    id: "sustainableSolutions",
    labelKey: "sustainableSolutions",
    href: "/sustainable-solutions",
    items: [
      { id: "water", labelKey: "water", href: "/sustainable-solutions#water" },
      { id: "energy", labelKey: "energy", href: "/sustainable-solutions#energy" },
      {
        id: "ventilationHvac",
        labelKey: "ventilationHvac",
        href: "/sustainable-solutions#ventilation",
      },
      { id: "environment", labelKey: "environment", href: "/sustainable-solutions#environment" },
    ],
  },
];
