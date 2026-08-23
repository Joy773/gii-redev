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
  { id: "industries", labelKey: "industries", href: "/industries" },
  { id: "projects", labelKey: "projects", href: "/projects" },
  { id: "researchInnovation", labelKey: "researchInnovation", href: "/research-innovation" },
  { id: "consultancy", labelKey: "consultancy", href: "/consultancy" },
  { id: "about", labelKey: "about", href: "/about" },
  { id: "insights", labelKey: "insights", href: "/insights" },
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
    ],
  },
  {
    id: "softwareDigitalPlatforms",
    labelKey: "softwareDigitalPlatforms",
    href: "/software",
    items: [
      { id: "softwareDevelopment", labelKey: "softwareDevelopment", href: "/software" },
      { id: "digitalPlatforms", labelKey: "digitalPlatforms", href: "/platforms" },
      { id: "digitalEducation", labelKey: "digitalEducation", href: "/education" },
      { id: "ecommerce", labelKey: "ecommerce", href: "/ecommerce" },
    ],
  },
  {
    id: "aiData",
    labelKey: "aiData",
    href: "/ai",
    items: [
      { id: "ai", labelKey: "ai", href: "/ai" },
      { id: "aiTransformation", labelKey: "aiTransformation", href: "/ai" },
    ],
  },
  {
    id: "iotWsnSmartSystems",
    labelKey: "iotWsnSmartSystems",
    href: "/iot",
    items: [
      { id: "iotEmbedded", labelKey: "iotEmbedded", href: "/iot" },
      { id: "medicalTechnology", labelKey: "medicalTechnology", href: "/medical" },
    ],
  },
  {
    id: "sustainableTechnology",
    labelKey: "sustainableTechnology",
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
  {
    id: "ictSystemsIntegration",
    labelKey: "ictSystemsIntegration",
    href: "/ict",
    items: [
      {
        id: "cloudCybersecurity",
        labelKey: "cloudCybersecurity",
        href: "/digital-transformation#cloud-cybersecurity",
      },
    ],
  },
];
