"use client";

import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import {
  FiCheckCircle,
  FiLayers,
  FiRefreshCw,
  FiSearch,
  FiTool,
  FiUsers,
} from "react-icons/fi";

import ScrollReveal from "./common/ScrollReveal";
import { ContactUsButton, StartProjectButton } from "./common/buttons";

type ProcessStep = {
  id: string;
  icon: ComponentType<{ className?: string }>;
};

const ABOUT_PROCESS_STEPS: ProcessStep[] = [
  { id: "diagnose", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "deliver", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "enable", icon: FiUsers },
  { id: "partner", icon: FiRefreshCw },
];

const CONSULTANCY_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "plan", icon: FiLayers },
  { id: "select", icon: FiCheckCircle },
  { id: "integrate", icon: FiTool },
  { id: "implement", icon: FiUsers },
  { id: "optimize", icon: FiRefreshCw },
];

const RESEARCH_PROCESS_STEPS: ProcessStep[] = [
  { id: "explore", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "prototype", icon: FiTool },
  { id: "validate", icon: FiCheckCircle },
  { id: "transfer", icon: FiUsers },
  { id: "scale", icon: FiRefreshCw },
];

const DIGITALIZATION_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "plan", icon: FiLayers },
  { id: "design", icon: FiTool },
  { id: "build", icon: FiCheckCircle },
  { id: "integrate", icon: FiUsers },
  { id: "optimize", icon: FiRefreshCw },
];

const SME_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "plan", icon: FiLayers },
  { id: "pilot", icon: FiTool },
  { id: "build", icon: FiCheckCircle },
  { id: "train", icon: FiUsers },
  { id: "scale", icon: FiRefreshCw },
];

const INDUSTRY40_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "plan", icon: FiLayers },
  { id: "pilot", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "train", icon: FiUsers },
  { id: "scale", icon: FiRefreshCw },
];

const IOT_EMBEDDED_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "prototype", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "commission", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const MEDICAL_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "prototype", icon: FiTool },
  { id: "validate", icon: FiCheckCircle },
  { id: "integrate", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const CLOUD_CYBERSECURITY_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "plan", icon: FiLayers },
  { id: "design", icon: FiTool },
  { id: "migrate", icon: FiCheckCircle },
  { id: "secure", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const AI_TRANSFORMATION_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "prioritize", icon: FiLayers },
  { id: "prototype", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "enable", icon: FiUsers },
  { id: "scale", icon: FiRefreshCw },
];

const AI_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "build", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "validate", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const WATER_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "deploy", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "commission", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const ENERGY_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "baseline", icon: FiLayers },
  { id: "design", icon: FiTool },
  { id: "deploy", icon: FiCheckCircle },
  { id: "integrate", icon: FiUsers },
  { id: "optimize", icon: FiRefreshCw },
];

const VENTILATION_HVAC_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "specify", icon: FiTool },
  { id: "install", icon: FiCheckCircle },
  { id: "commission", icon: FiUsers },
  { id: "optimize", icon: FiRefreshCw },
];

const ENVIRONMENT_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "deploy", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "commission", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const SOFTWARE_DEVELOPMENT_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "build", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "validate", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const DIGITAL_PLATFORMS_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "build", icon: FiTool },
  { id: "launch", icon: FiCheckCircle },
  { id: "integrate", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const DIGITAL_EDUCATION_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "build", icon: FiTool },
  { id: "pilot", icon: FiCheckCircle },
  { id: "launch", icon: FiUsers },
  { id: "scale", icon: FiRefreshCw },
];

const ECOMMERCE_PROCESS_STEPS: ProcessStep[] = [
  { id: "assess", icon: FiSearch },
  { id: "design", icon: FiLayers },
  { id: "build", icon: FiTool },
  { id: "integrate", icon: FiCheckCircle },
  { id: "launch", icon: FiUsers },
  { id: "operate", icon: FiRefreshCw },
];

const PROCESS_CONFIG = {
  about: {
    namespace: "processTimeline",
    steps: ABOUT_PROCESS_STEPS,
    backgroundClassName: "grid-surface-white",
    cta: "startProject" as const,
    onDark: false,
  },
  consultancy: {
    namespace: "consultancyPage.processTimeline",
    steps: CONSULTANCY_PROCESS_STEPS,
    backgroundClassName: "bg-[#122A3B]",
    cta: "contactUs" as const,
    onDark: true,
  },
  research: {
    namespace: "researchPage.processTimeline",
    steps: RESEARCH_PROCESS_STEPS,
    backgroundClassName: "grid-surface-white",
    cta: "contactUs" as const,
    onDark: false,
  },
  digitalizationForEnterprises: {
    namespace: "digitalizationForEnterprisesPage.processTimeline",
    steps: DIGITALIZATION_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  sme: {
    namespace: "smePage.processTimeline",
    steps: SME_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  industry40: {
    namespace: "industry40Page.processTimeline",
    steps: INDUSTRY40_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  iotEmbedded: {
    namespace: "iotEmbeddedPage.processTimeline",
    steps: IOT_EMBEDDED_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  medicalTechnology: {
    namespace: "medicalTechnologyPage.processTimeline",
    steps: MEDICAL_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  cloudCybersecurity: {
    namespace: "cloudCybersecurityPage.processTimeline",
    steps: CLOUD_CYBERSECURITY_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  aiTransformation: {
    namespace: "aiTransformationPage.processTimeline",
    steps: AI_TRANSFORMATION_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  ai: {
    namespace: "aiPage.processTimeline",
    steps: AI_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  water: {
    namespace: "waterPage.processTimeline",
    steps: WATER_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  energy: {
    namespace: "energyPage.processTimeline",
    steps: ENERGY_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  ventilationHvac: {
    namespace: "ventilationHvacPage.processTimeline",
    steps: VENTILATION_HVAC_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  environment: {
    namespace: "environmentPage.processTimeline",
    steps: ENVIRONMENT_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  softwareDevelopment: {
    namespace: "softwareDevelopmentPage.processTimeline",
    steps: SOFTWARE_DEVELOPMENT_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  digitalPlatforms: {
    namespace: "digitalPlatformsPage.processTimeline",
    steps: DIGITAL_PLATFORMS_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  digitalEducation: {
    namespace: "digitalEducationPage.processTimeline",
    steps: DIGITAL_EDUCATION_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
  ecommerce: {
    namespace: "ecommercePage.processTimeline",
    steps: ECOMMERCE_PROCESS_STEPS,
    backgroundClassName: "grid-surface-soft",
    cta: "startProject" as const,
    onDark: false,
  },
};

function ProcessRow({
  id,
  icon: Icon,
  index,
  namespace,
  onDark = false,
}: {
  id: string;
  icon: ComponentType<{ className?: string }>;
  index: number;
  namespace: string;
  onDark?: boolean;
}) {
  const t = useTranslations(`${namespace}.items`);

  return (
    <li className="group relative">
      <span
        className={`pointer-events-none absolute inset-x-0 inset-y-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          onDark ? "bg-white/5" : "bg-surface dark:bg-white/5"
        }`}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-1/2 left-0 h-0 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover:h-1/2"
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-4 py-6 transition-transform duration-300 group-hover:translate-x-2 sm:gap-6 sm:px-5">
        <span className="mt-0.5 font-mono text-sm tabular-nums text-primary/70 transition-colors duration-300 group-hover:text-primary sm:text-base">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-xl ${
              onDark ? "text-white" : "text-dark dark:text-white"
            }`}
          >
            {t(`${id}.title`)}
          </h3>
          <p
            className={`mt-1.5 text-sm leading-6 sm:text-[15px] ${
              onDark ? "text-white/70" : "text-text/70 dark:text-white/70"
            }`}
          >
            {t(`${id}.description`)}
          </p>
        </div>

        <span
          className={`mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary ${
            onDark
              ? "border-white/20 text-white/45"
              : "border-border/70 text-text/45 dark:border-white/20 dark:text-white/45"
          }`}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
    </li>
  );
}

export default function ProcessTimeline({
  variant = "about",
}: {
  variant?: keyof typeof PROCESS_CONFIG;
}) {
  const config = PROCESS_CONFIG[variant];
  const onDark = config.onDark;
  const t = useTranslations(config.namespace);

  return (
    <section className={`grid-surface ${config.backgroundClassName} py-20 sm:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                onDark
                  ? "border border-white/15 bg-white/10 text-white/90"
                  : "bg-primary/8 text-primary dark:bg-white/10 dark:text-white/90"
              }`}
            >
              <span className="size-2 rounded-full bg-primary" />
              {t("eyebrow")}
            </span>

            <ScrollReveal
              baseOpacity={0.25}
              enableBlur
              baseRotation={4}
              blurStrength={18}
              containerClassName="mt-6 text-center lg:text-left"
              textClassName={`text-center text-3xl font-semibold tracking-tight sm:text-4xl lg:text-left lg:text-5xl ${
                onDark ? "text-white" : "text-dark dark:text-white"
              }`}
              wordAnimationEnd="top 60%"
              rotationEnd="top 60%"
              triggerScope="section"
            >
              {t("title")}
            </ScrollReveal>

            <p
              className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${
                onDark ? "text-white/78" : "text-text/72 dark:text-white/78"
              }`}
            >
              {t("description")}
            </p>
            <div className="mt-7 flex justify-center lg:justify-start">
              {config.cta === "contactUs" ? <ContactUsButton /> : <StartProjectButton />}
            </div>
          </div>

          <ul
            className={`divide-y border-y ${
              onDark
                ? "divide-white/15 border-white/15"
                : "divide-border/60 border-border/60 dark:divide-white/15 dark:border-white/15"
            }`}
          >
            {config.steps.map((item, index) => (
              <ProcessRow
                key={item.id}
                index={index}
                namespace={config.namespace}
                onDark={onDark}
                {...item}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
