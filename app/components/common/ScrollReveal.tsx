"use client";

import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  playOnMount?: boolean;
  /** Use the nearest section as the ScrollTrigger target (fixes sticky sidebar titles). */
  triggerScope?: "self" | "section";
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 3,
  blurStrength = 18,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "top 55%",
  wordAnimationEnd = "top 55%",
  playOnMount = false,
  triggerScope = "self",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const text = typeof children === "string" ? children : "";

  const splitText = useMemo(() => {
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !text.trim()) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(".word"), { opacity: 1, filter: "blur(0px)", rotate: 0 });
      gsap.set(el, { rotate: 0 });
      return;
    }

    const scroller =
      scrollContainerRef?.current != null ? scrollContainerRef.current : window;

    const triggerEl =
      triggerScope === "section" ? (el.closest("section") ?? el) : el;

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    const wordElements = el.querySelectorAll(".word");
    if (wordElements.length === 0) return;

    const wordFrom: gsap.TweenVars = {
      opacity: baseOpacity,
      willChange: "opacity, filter",
    };
    const wordTo: gsap.TweenVars = {
      opacity: 1,
    };

    if (enableBlur) {
      wordFrom.filter = `blur(${blurStrength}px)`;
      wordTo.filter = "blur(0px)";
    }

    gsap.set(wordElements, wordFrom);

    if (playOnMount) {
      tweens.push(
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          { ease: "power2.out", rotate: 0, duration: 1.15 },
        ),
      );

      tweens.push(
        gsap.fromTo(wordElements, wordFrom, {
          ...wordTo,
          ease: "power2.out",
          duration: 0.9,
          stagger: 0.08,
        }),
      );
    } else {
      const rotationTween = gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: triggerEl,
            scroller,
            start: "top bottom",
            end: rotationEnd,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
      tweens.push(rotationTween);
      if (rotationTween.scrollTrigger) triggers.push(rotationTween.scrollTrigger);

      const wordTween = gsap.fromTo(wordElements, wordFrom, {
        ...wordTo,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: triggerEl,
          scroller,
          start: "top 90%",
          end: wordAnimationEnd,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tweens.push(wordTween);
      if (wordTween.scrollTrigger) triggers.push(wordTween.scrollTrigger);
    }

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimeout = window.setTimeout(refresh, 0);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", refresh);
      triggers.forEach((trigger) => trigger.kill());
      tweens.forEach((tween) => tween.kill());
    };
  }, [
    text,
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    playOnMount,
    triggerScope,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
}
