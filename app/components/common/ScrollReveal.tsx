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
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current != null ? scrollContainerRef.current : window;

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    if (playOnMount) {
      tweens.push(
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          { ease: "power2.out", rotate: 0, duration: 1.15 },
        ),
      );

      const wordElements = el.querySelectorAll(".word");
      const wordFrom: gsap.TweenVars = {
        opacity: baseOpacity,
        willChange: "opacity, filter",
      };
      const wordTo: gsap.TweenVars = {
        ease: "power2.out",
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
      };

      if (enableBlur) {
        wordFrom.filter = `blur(${blurStrength}px)`;
        wordTo.filter = "blur(0px)";
      }

      tweens.push(gsap.fromTo(wordElements, wordFrom, wordTo));
    } else {
      const rotationTween = gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom",
            end: rotationEnd,
            scrub: 0.6,
          },
        },
      );
      tweens.push(rotationTween);
      if (rotationTween.scrollTrigger) triggers.push(rotationTween.scrollTrigger);

      const wordElements = el.querySelectorAll(".word");

      const wordFrom: gsap.TweenVars = {
        opacity: baseOpacity,
        willChange: "opacity, filter",
      };
      const wordTo: gsap.TweenVars = {
        ease: "none",
        opacity: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 90%",
          end: wordAnimationEnd,
          scrub: 0.6,
        },
      };

      if (enableBlur) {
        wordFrom.filter = `blur(${blurStrength}px)`;
        wordTo.filter = "blur(0px)";
      }

      const wordTween = gsap.fromTo(wordElements, wordFrom, wordTo);
      tweens.push(wordTween);
      if (wordTween.scrollTrigger) triggers.push(wordTween.scrollTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      tweens.forEach((tween) => tween.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    playOnMount,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
}
