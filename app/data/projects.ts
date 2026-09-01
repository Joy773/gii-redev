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
  {
    id: "nexaOps",
    slug: "nexa-ops-platform",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "mittelstandCloud",
    slug: "mittelstand-cloud-migration",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "publicServiceHub",
    slug: "public-service-digital-hub",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e8?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "smeProcurementHub",
    slug: "sme-procurement-hub",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c773d0?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "smeProductionPilot",
    slug: "sme-production-line-pilot",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "smeFieldServiceApp",
    slug: "sme-field-service-app",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "industry40OeeDashboard",
    slug: "industry-4-0-oee-dashboard",
    image:
      "https://images.unsplash.com/photo-1574717024650-61fd2cf4d44d?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "industry40PredictiveMaintenance",
    slug: "industry-4-0-predictive-maintenance",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "industry40QualityTraceability",
    slug: "industry-4-0-quality-traceability",
    image:
      "https://images.unsplash.com/photo-1535984889724-2dabf760b237?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "digitalTransformation",
    showOnHome: false,
  },
  {
    id: "iotUtilityMonitoring",
    slug: "iot-utility-monitoring-network",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "iotWsnSmartSystems",
    showOnHome: false,
  },
  {
    id: "iotIndustrialEdgeGateway",
    slug: "iot-industrial-edge-gateway",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "iotWsnSmartSystems",
    showOnHome: false,
  },
  {
    id: "medicalDeviceMonitoring",
    slug: "medical-device-monitoring-platform",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "iotWsnSmartSystems",
    showOnHome: false,
  },
  {
    id: "hospitalPlanningPlatform",
    slug: "hospital-planning-digital-platform",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "softwareDigitalPlatforms",
    showOnHome: false,
  },
  {
    id: "cloudSecurityOperations",
    slug: "cloud-security-operations-platform",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "ictSystemsIntegration",
    showOnHome: false,
  },
  {
    id: "aiOperationsAssistant",
    slug: "ai-operations-assistant",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "aiData",
    showOnHome: false,
  },
  {
    id: "aiQualityAnalytics",
    slug: "ai-quality-analytics-pilot",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "aiData",
    showOnHome: false,
  },
  {
    id: "aiKnowledgeAssistant",
    slug: "ai-knowledge-assistant",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "aiData",
    showOnHome: false,
  },
  {
    id: "aiDocumentProcessing",
    slug: "ai-document-processing",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "aiData",
    showOnHome: false,
  },
  {
    id: "waterNetworkMonitoring",
    slug: "water-network-monitoring",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "sustainableTechnology",
    showOnHome: false,
  },
  {
    id: "buildingEnergyMonitoring",
    slug: "building-energy-monitoring",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "sustainableTechnology",
    showOnHome: false,
  },
  {
    id: "hvacOperationsMonitoring",
    slug: "hvac-operations-monitoring",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "sustainableTechnology",
    showOnHome: false,
  },
  {
    id: "environmentalMonitoringNetwork",
    slug: "environmental-monitoring-network",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "sustainableTechnology",
    showOnHome: false,
  },
  {
    id: "digitalLearningPlatform",
    slug: "digital-learning-platform",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "softwareDigitalPlatforms",
    showOnHome: false,
  },
  {
    id: "digitalCommerceMarketplace",
    slug: "digital-commerce-marketplace",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&h=900&q=80",
    sector: "softwareDigitalPlatforms",
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
