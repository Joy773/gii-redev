"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import ScrollReveal from "./common/ScrollReveal";

const TESTIMONIALS = [
  {
    id: "samantha",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: "john",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: "elena",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: "marcus",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: "priya",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: "thomas",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  },
] as const;

function TestimonialCard({
  id,
  image,
}: {
  id: (typeof TESTIMONIALS)[number]["id"];
  image: string;
}) {
  const t = useTranslations("testimonials.items");

  return (
    <article className="testimonial-card flex w-[min(20.5rem,calc(100vw-2.5rem))] shrink-0 flex-col rounded-2xl border border-border/60 bg-soft-background p-6 shadow-[0_8px_24px_rgba(18,59,86,0.06)] sm:w-[clamp(22rem,24vw,28rem)]">
      <span className="text-3xl font-serif leading-none text-primary" aria-hidden="true">
        &ldquo;
      </span>
      <p className="mt-3 flex-1 text-sm leading-7 text-dark/90 sm:text-[15px]">
        {t(`${id}.quote`)}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Image
          src={image}
          alt={t(`${id}.name`)}
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-semibold text-dark">{t(`${id}.name`)}</div>
          <div className="text-xs text-text/55">{t(`${id}.role`)}</div>
        </div>
      </div>
    </article>
  );
}

function TestimonialRow({
  reverse = false,
}: {
  reverse?: boolean;
}) {
  const cards = TESTIMONIALS.map((item) => (
    <TestimonialCard key={item.id} {...item} />
  ));

  return (
    <div
      className={`testimonials-track ${reverse ? "testimonials-track-reverse" : ""}`}
    >
      <div className="testimonials-group">{cards}</div>
      <div className="testimonials-group" aria-hidden="true">
        {TESTIMONIALS.map((item) => (
          <TestimonialCard key={`${item.id}-dup`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="grid-surface grid-surface-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t("eyebrow")}
          </span>
          <ScrollReveal
            baseOpacity={0.25}
            enableBlur
            baseRotation={4}
            blurStrength={18}
            containerClassName="mt-6 text-center"
            textClassName="text-center text-3xl font-semibold tracking-tight text-dark sm:text-4xl lg:text-5xl 2xl:text-6xl"
          >
            {t("title")}
          </ScrollReveal>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden sm:mt-14">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F4F7F9] via-[#F4F7F9]/80 to-transparent sm:w-24 lg:w-32"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F4F7F9] via-[#F4F7F9]/80 to-transparent sm:w-24 lg:w-32"
          aria-hidden="true"
        />

        <div className="space-y-4 sm:space-y-5">
          <div className="testimonials-row">
            <TestimonialRow />
          </div>
          <div className="testimonials-row">
            <TestimonialRow reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
