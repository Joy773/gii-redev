"use client";

import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import {
  FiRefreshCcw,
  FiWifi,
  FiCpu,
  FiUploadCloud,
  FiCode,
  FiLayers,
  FiSettings,
  FiHeart,
  FiShoppingCart,
  FiBookOpen,
  FiDroplet,
  FiZap,
  FiCompass,
  FiFlag,
} from "react-icons/fi";

type TrustItem = {
  id: string;
  labelKey: string;
  Icon: ComponentType<{ className?: string }>;
};

const TRUST_ITEMS: TrustItem[] = [
  { id: "digitalTransformation", labelKey: "digitalTransformation", Icon: FiRefreshCcw },
  { id: "ict", labelKey: "ict", Icon: FiWifi },
  { id: "ai", labelKey: "ai", Icon: FiCpu },
  { id: "iot", labelKey: "iot", Icon: FiUploadCloud },
  { id: "software", labelKey: "software", Icon: FiCode },
  { id: "digitalPlatforms", labelKey: "digitalPlatforms", Icon: FiLayers },
  { id: "industry40", labelKey: "industry40", Icon: FiSettings },
  { id: "medicalTechnology", labelKey: "medicalTechnology", Icon: FiHeart },
  { id: "ecommerce", labelKey: "ecommerce", Icon: FiShoppingCart },
  { id: "digitalEducation", labelKey: "digitalEducation", Icon: FiBookOpen },
  { id: "water", labelKey: "water", Icon: FiDroplet },
  { id: "energy", labelKey: "energy", Icon: FiZap },
  { id: "environment", labelKey: "environment", Icon: FiCompass },
  { id: "madeInGermany", labelKey: "madeInGermany", Icon: FiFlag },
];

function TrustPill({
  Icon,
  label,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="trust-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-base font-semibold text-white/82 transition-all duration-300">
      <Icon className="trust-pill-icon size-5 text-primary/90 transition-all duration-300" />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function TrustStrip() {
  const t = useTranslations("hero");

  const content = (
    <>
      {TRUST_ITEMS.map(({ id, labelKey, Icon }) => (
        <TrustPill key={id} Icon={Icon} label={t(`capabilities.${labelKey}`)} />
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden bg-[#123b56] py-1">
      <style jsx>{`
        .trust-strip-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: trust-strip-marquee 22s linear infinite;
        }

        .trust-strip-track:hover {
          animation-play-state: paused;
        }

        .trust-pill:hover {
          transform: translateY(-3px) scale(1.03);
          color: rgba(255, 255, 255, 0.98);
        }

        .trust-pill:hover .trust-pill-icon {
          transform: scale(1.08);
          color: #ffffff;
        }

        @keyframes trust-strip-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-strip-track {
            animation: none;
          }
        }
      `}</style>

      {/* Duplicate the sequence so we can translate by 50% seamlessly */}
      <div className="trust-strip-track" aria-hidden="true">
        {content}
        {content}
      </div>
    </div>
  );
}

