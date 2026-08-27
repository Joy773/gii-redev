"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import ScrollReveal from "./common/ScrollReveal";

const TEAM_MEMBERS = [
  {
    id: "lukas",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    id: "amira",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    id: "jonas",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    id: "lena",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    id: "faris",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    id: "sophie",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    id: "tobias",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&h=1000&q=80",
  },
] as const;

export default function Team() {
  const t = useTranslations("aboutPage.team");

  return (
    <section className="grid-surface grid-surface-soft py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>
          <div className="mt-6 sm:mt-5">
            <ScrollReveal
              baseOpacity={0.25}
              enableBlur
              baseRotation={3}
              blurStrength={18}
              containerClassName="text-center"
              textClassName="text-center text-3xl font-semibold tracking-tight text-dark sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </ScrollReveal>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text/60 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.id} className="flex flex-col text-left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white sm:rounded-3xl">
                <Image
                  src={member.image}
                  alt={t(`members.${member.id}.name`)}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold tracking-tight text-dark sm:mt-5 sm:text-lg">
                {t(`members.${member.id}.name`)}
              </h3>
              <p className="mt-1 text-xs font-medium text-primary sm:text-[15px]">
                {t(`members.${member.id}.role`)}
              </p>
              <p className="mt-2 hidden line-clamp-2 text-sm leading-6 text-text/55 sm:block">
                {t(`members.${member.id}.bio`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
