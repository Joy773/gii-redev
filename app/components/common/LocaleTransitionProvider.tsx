"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type LocaleTransitionContextValue = {
  isLangTransitioning: boolean;
  setIsLangTransitioning: (value: boolean) => void;
};

const LocaleTransitionContext = createContext<LocaleTransitionContextValue | null>(null);

export function LocaleTransitionProvider({ children }: { children: ReactNode }) {
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);

  return (
    <LocaleTransitionContext.Provider value={{ isLangTransitioning, setIsLangTransitioning }}>
      {children}
    </LocaleTransitionContext.Provider>
  );
}

export function useLocaleTransition() {
  const context = useContext(LocaleTransitionContext);
  if (!context) {
    throw new Error("useLocaleTransition must be used within LocaleTransitionProvider");
  }
  return context;
}

export function LocaleTransitionBody({ children }: { children: ReactNode }) {
  const { isLangTransitioning } = useLocaleTransition();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;

      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", link.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isLangTransitioning ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
