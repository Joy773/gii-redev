"use client";

import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import {
  FiCloud,
  FiBookOpen,
  FiCode,
  FiCompass,
  FiCpu,
  FiDroplet,
  FiHeart,
  FiLayers,
  FiLock,
  FiMap,
  FiRefreshCw,
  FiRefreshCcw,
  FiSearch,
  FiSettings,
  FiShoppingCart,
  FiWifi,
  FiWind,
  FiZap,
} from "react-icons/fi";

import { StartProjectButton } from "./common/buttons";
import ScrollReveal from "./common/ScrollReveal";

export type ServiceCapabilityItem = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  className?: string;
  largeDescription?: boolean;
};

const SERVICE_CAPABILITIES_CONFIG = {
  digitalizationForEnterprises: {
    namespace: "digitalizationForEnterprisesPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "processModernization", icon: FiRefreshCcw },
      { id: "itStrategy", icon: FiMap },
      {
        id: "softwareArchitecture",
        icon: FiLayers,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiRefreshCw,
  },
  sme: {
    namespace: "smePage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "digitalMaturityCheck", icon: FiSearch },
      { id: "phasedRoadmaps", icon: FiMap },
      {
        id: "erpAndProcessDigitization",
        icon: FiLayers,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiCloud,
  },
  industry40: {
    namespace: "industry40Page.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "machineConnectivity", icon: FiWifi },
      { id: "operatorDashboards", icon: FiLayers },
      {
        id: "mesErpIntegration",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiRefreshCw,
  },
  iotEmbedded: {
    namespace: "iotEmbeddedPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "sensorIntegration", icon: FiSearch },
      { id: "embeddedFirmware", icon: FiCpu },
      {
        id: "wsnConnectivity",
        icon: FiWifi,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiRefreshCw,
  },
  medicalTechnology: {
    namespace: "medicalTechnologyPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "medicalSoftware", icon: FiLayers },
      { id: "deviceConnectivity", icon: FiWifi },
      {
        id: "complianceSecurity",
        icon: FiLock,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiHeart,
  },
  cloudCybersecurity: {
    namespace: "cloudCybersecurityPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "cloudMigration", icon: FiCloud },
      { id: "identityAccess", icon: FiLock },
      {
        id: "securityOperations",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiRefreshCw,
  },
  aiTransformation: {
    namespace: "aiTransformationPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "useCaseDiscovery", icon: FiSearch },
      { id: "workflowAutomation", icon: FiCpu },
      {
        id: "dataFoundations",
        icon: FiLayers,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiRefreshCw,
  },
  ai: {
    namespace: "aiPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "intelligentAssistants", icon: FiCpu },
      { id: "machineLearning", icon: FiLayers },
      {
        id: "automationIntegrations",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiRefreshCw,
  },
  water: {
    namespace: "waterPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "leakDetection", icon: FiSearch },
      { id: "qualityMonitoring", icon: FiLayers },
      {
        id: "utilityNetworks",
        icon: FiWifi,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiDroplet,
  },
  energy: {
    namespace: "energyPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "smartMetering", icon: FiSearch },
      { id: "buildingMonitoring", icon: FiLayers },
      {
        id: "energyManagement",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiZap,
  },
  ventilationHvac: {
    namespace: "ventilationHvacPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "indoorAirQuality", icon: FiSearch },
      { id: "hvacSystems", icon: FiLayers },
      {
        id: "climateControlOperations",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiWind,
  },
  environment: {
    namespace: "environmentPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "environmentalMonitoring", icon: FiSearch },
      { id: "resourceEfficiency", icon: FiLayers },
      {
        id: "smartInfrastructure",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiCompass,
  },
  softwareDevelopment: {
    namespace: "softwareDevelopmentPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "customApplications", icon: FiSearch },
      { id: "webApplications", icon: FiLayers },
      {
        id: "systemIntegrations",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiCode,
  },
  digitalPlatforms: {
    namespace: "digitalPlatformsPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "portalsAndMarketplaces", icon: FiSearch },
      { id: "multiUserAdministration", icon: FiLayers },
      {
        id: "platformArchitecture",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiLayers,
  },
  digitalEducation: {
    namespace: "digitalEducationPage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "learningPlatforms", icon: FiSearch },
      { id: "trainingSystems", icon: FiLayers },
      {
        id: "knowledgeTools",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiBookOpen,
  },
  ecommerce: {
    namespace: "ecommercePage.capabilities",
    backgroundClassName: "grid-surface-soft",
    lightCards: [
      { id: "b2bCommerce", icon: FiSearch },
      { id: "b2cStorefronts", icon: FiLayers },
      {
        id: "orderFulfillment",
        icon: FiSettings,
        className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
        largeDescription: true,
      },
    ],
    featuredIcon: FiShoppingCart,
  },
} as const;

type ServiceCapabilitiesProps = {
  namespace?: string;
  lightCards?: ServiceCapabilityItem[];
  featuredIcon?: ComponentType<{ className?: string }>;
  variant?: keyof typeof SERVICE_CAPABILITIES_CONFIG;
  sectionId?: string;
  backgroundClassName?: string;
};

function LightCapabilityCard({
  id,
  icon: Icon,
  namespace,
  className = "",
  largeDescription = false,
}: ServiceCapabilityItem & { namespace: string }) {
  const t = useTranslations(namespace);

  return (
    <article
      className={`group rounded-2xl border border-border/70 bg-surface p-4 shadow-[0_8px_24px_rgba(18,59,86,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_14px_36px_rgba(18,59,86,0.1)] dark:border-white/15 dark:bg-[#0B1F2C] dark:shadow-[0_8px_24px_rgba(0,0,0,0.28)] dark:hover:border-primary/35 dark:hover:shadow-[0_14px_36px_rgba(0,0,0,0.38)] sm:p-5 ${className}`}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-surface text-dark shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/25 group-hover:bg-primary/10 group-hover:text-primary dark:border-white/15 dark:bg-[#122A3B] dark:text-white dark:group-hover:bg-primary/15">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary dark:text-white sm:text-xl">
        {t(`items.${id}.title`)}
      </h3>
      <p
        className={`mt-2 text-text/72 transition-colors duration-300 group-hover:text-text/80 dark:text-white/70 dark:group-hover:text-white/80 ${
          largeDescription
            ? "text-sm leading-6 sm:text-base sm:leading-7"
            : "text-sm leading-6"
        }`}
      >
        {t(`items.${id}.description`)}
      </p>
    </article>
  );
}

function FeaturedCapabilityCard({
  namespace,
  icon: Icon,
}: {
  namespace: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const t = useTranslations(namespace);

  return (
    <article className="group flex flex-col rounded-2xl border border-transparent bg-navy p-4 text-white shadow-[0_8px_24px_rgba(18,59,86,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(18,59,86,0.24)] dark:border-white/15 sm:p-5 lg:col-start-3 lg:row-span-2 lg:row-start-1">
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/15">
        <Icon className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      </span>

      <h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-white sm:text-xl">
        {t("featured.title")}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/78 transition-colors duration-300 group-hover:text-white/88">
        {t("featured.description")}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/78 transition-colors duration-300 group-hover:text-white/88">
        {t("featured.descriptionSecondary")}
      </p>

      <div className="mt-5 transition-transform duration-300 group-hover:-translate-y-0.5 lg:mt-auto lg:pt-6">
        <StartProjectButton variant="onDark" />
      </div>
    </article>
  );
}

export default function ServiceCapabilities({
  namespace,
  lightCards,
  featuredIcon: FeaturedIcon = FiRefreshCw,
  variant,
  sectionId,
  backgroundClassName,
}: ServiceCapabilitiesProps) {
  const config = variant ? SERVICE_CAPABILITIES_CONFIG[variant] : null;
  const resolvedNamespace = namespace ?? config?.namespace ?? "";
  const resolvedLightCards = lightCards ?? config?.lightCards ?? [];
  const resolvedFeaturedIcon = config?.featuredIcon ?? FeaturedIcon;
  const resolvedBackgroundClassName =
    backgroundClassName ?? config?.backgroundClassName ?? "grid-surface-soft";

  const t = useTranslations(resolvedNamespace);
  const [firstCard, secondCard, wideCard] = resolvedLightCards;

  return (
    <section
      id={sectionId}
      className={`grid-surface ${resolvedBackgroundClassName} scroll-mt-24 py-20 sm:py-24`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary dark:bg-white/10 dark:text-white/90">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>

          <ScrollReveal
            baseOpacity={0.25}
            enableBlur
            baseRotation={4}
            blurStrength={18}
            containerClassName="mt-6 text-center lg:text-left"
            textClassName="text-center text-4xl font-semibold tracking-tight text-dark dark:text-white sm:text-5xl lg:text-left"
          >
            {t("title")}
          </ScrollReveal>
        </div>

        <div className="mt-10 grid gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {firstCard ? (
            <LightCapabilityCard {...firstCard} namespace={resolvedNamespace} />
          ) : null}
          {secondCard ? (
            <LightCapabilityCard {...secondCard} namespace={resolvedNamespace} />
          ) : null}

          <FeaturedCapabilityCard namespace={resolvedNamespace} icon={resolvedFeaturedIcon} />

          {wideCard ? (
            <LightCapabilityCard {...wideCard} namespace={resolvedNamespace} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
