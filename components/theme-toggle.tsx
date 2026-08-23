"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const tAria = useTranslations("aria");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={`inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-white text-navy/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/16 dark:hover:text-white ${className}`}
      aria-label={isDark ? tAria("switchToLight") : tAria("switchToDark")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <FiSun aria-hidden="true" className="size-[18px]" />
      ) : (
        <FiMoon aria-hidden="true" className="size-[18px]" />
      )}
    </button>
  );
}
