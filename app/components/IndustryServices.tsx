"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { StartProjectButton } from "./common/buttons";
import ScrollReveal from "./common/ScrollReveal";

const MANUFACTURING_SERVICE_ITEMS = [
  "contentManagement",
  "afterSalesServices",
  "multilingualDealer",
  "consultancyServiceSolutions",
  "eProcurementErp",
  "supplyChainOptimization",
] as const;

const ECS_SERVICE_ITEMS = [
  "educationalOpportunities",
  "technicalAssistance",
  "leadershipDevelopment",
  "professionalDevelopment",
  "policyEvaluation",
  "changeProcess",
] as const;

const RESEARCH_DEVELOPMENT_ITEMS = [
  "convertVision",
  "transformingVision",
  "acceleratorsFrameworks",
  "engineeringInvestment",
  "wirelessSensorRfid",
  "iotEmbeddedElectronics",
  "iotApplications",
  "innovativeSolutions",
] as const;

type ManufacturingServiceId = (typeof MANUFACTURING_SERVICE_ITEMS)[number];
type EcsServiceId = (typeof ECS_SERVICE_ITEMS)[number];
type ResearchDevelopmentId = (typeof RESEARCH_DEVELOPMENT_ITEMS)[number];

function ServiceCarousel({
  itemIds,
  previousLabel,
  nextLabel,
  formatPageIndicator,
  renderContent,
  minHeightClassName = "min-h-[12rem] sm:min-h-[13rem]",
  onDark = false,
}: {
  itemIds: readonly string[];
  previousLabel: string;
  nextLabel: string;
  formatPageIndicator: (current: number, total: number) => string;
  renderContent: (itemId: string) => ReactNode;
  minHeightClassName?: string;
  onDark?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const count = itemIds.length;
  const itemId = itemIds[index];

  const showPrevious = () => {
    setDirection(-1);
    setIndex((current) => (current === 0 ? count - 1 : current - 1));
  };

  const showNext = () => {
    setDirection(1);
    setIndex((current) => (current === count - 1 ? 0 : current + 1));
  };

  return (
    <div>
      <article
        className={`${minHeightClassName} rounded-3xl border p-6 shadow-[0_12px_32px_rgba(18,59,86,0.07)] sm:p-8 ${
          onDark
            ? "border-white/15 bg-[#122A3B] shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
            : "border-border/70 bg-soft-background"
        }`}
      >
        <div
          key={index}
          className={direction === 1 ? "service-card-slide-next" : "service-card-slide-prev"}
        >
          {renderContent(itemId)}
        </div>
      </article>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p
          className={`text-sm font-medium ${
            onDark ? "text-white/45" : "text-text/50"
          }`}
        >
          {formatPageIndicator(index + 1, count)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={previousLabel}
            onClick={showPrevious}
            className={`inline-flex size-9 items-center justify-center rounded-full border transition-all duration-300 ${
              onDark
                ? "border-white/20 bg-white/5 text-white/75 hover:border-primary/35 hover:text-primary"
                : "border-border/80 bg-surface text-dark/70 hover:border-primary/25 hover:text-primary"
            }`}
          >
            <FiArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={showNext}
            className={`inline-flex size-9 items-center justify-center rounded-full border transition-all duration-300 ${
              onDark
                ? "border-white/20 bg-white/5 text-white/75 hover:border-primary/35 hover:text-primary"
                : "border-border/80 bg-surface text-dark/70 hover:border-primary/25 hover:text-primary"
            }`}
          >
            <FiArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function IndustryIntro({
  title,
  description,
  onDark = false,
}: {
  title: string;
  description: string;
  onDark?: boolean;
}) {
  return (
    <div>
      <ScrollReveal
        baseOpacity={0.25}
        enableBlur
        baseRotation={4}
        blurStrength={18}
        containerClassName="text-left"
        textClassName={`text-left text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
          onDark ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </ScrollReveal>
      <p
        className={`mt-5 text-base leading-7 sm:text-lg sm:leading-8 ${
          onDark ? "text-white/78" : "text-text/72"
        }`}
      >
        {description}
      </p>
      <div className="mt-8">
        <StartProjectButton variant={onDark ? "onDark" : "default"} />
      </div>
    </div>
  );
}

export default function IndustryServices() {
  const tManufacturing = useTranslations("industriesPage.industryServices.manufacturing");
  const tEcs = useTranslations("industriesPage.industryServices.ecsFacilitates");
  const tResearch = useTranslations("industriesPage.industryServices.researchDevelopment");
  const tServices = useTranslations("industriesPage.industryServices");

  return (
    <>
      <section className="grid-surface grid-surface-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <IndustryIntro
              title={tManufacturing("title")}
              description={tManufacturing("description")}
            />

            <ServiceCarousel
              itemIds={MANUFACTURING_SERVICE_ITEMS}
              previousLabel={tServices("previous")}
              nextLabel={tServices("next")}
              formatPageIndicator={(current, total) =>
                tServices("pageIndicator", { current, total })
              }
              renderContent={(itemId) => {
                const id = itemId as ManufacturingServiceId;

                return (
                  <>
                    <h3 className="text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
                      {tServices(`${id}.title`)}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-text/72 sm:text-lg sm:leading-8">
                      {tServices(`${id}.description`)}
                    </p>
                  </>
                );
              }}
            />
          </div>
        </div>
      </section>

      <section className="grid-surface bg-[#0B1F2C] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <ServiceCarousel
                itemIds={ECS_SERVICE_ITEMS}
                previousLabel={tServices("previous")}
                nextLabel={tServices("next")}
                minHeightClassName="min-h-[14rem] sm:min-h-[16rem]"
                onDark
                formatPageIndicator={(current, total) =>
                  tServices("pageIndicator", { current, total })
                }
                renderContent={(itemId) => {
                  const id = itemId as EcsServiceId;

                  return (
                    <>
                      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {tEcs(`items.${id}.title`)}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                        {tEcs(`items.${id}.description`)}
                      </p>
                    </>
                  );
                }}
              />
            </div>

            <div className="order-1 lg:order-2">
              <IndustryIntro
                title={tEcs("title")}
                description={tEcs("description")}
                onDark
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid-surface bg-[#0B1F2C] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <IndustryIntro
              title={tResearch("title")}
              description={tResearch("description")}
              onDark
            />

            <ServiceCarousel
              itemIds={RESEARCH_DEVELOPMENT_ITEMS}
              previousLabel={tServices("previous")}
              nextLabel={tServices("next")}
              minHeightClassName="min-h-[14rem] sm:min-h-[16rem]"
              onDark
              formatPageIndicator={(current, total) =>
                tServices("pageIndicator", { current, total })
              }
              renderContent={(itemId) => {
                const id = itemId as ResearchDevelopmentId;

                return (
                  <>
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {tResearch(`items.${id}.title`)}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                      {tResearch(`items.${id}.description`)}
                    </p>
                  </>
                );
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
