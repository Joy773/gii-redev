"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import DotField from "@/components/DotField";

export default function DotFieldBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden bg-[var(--background)]"
    >
      <DotField
        className="absolute inset-0 h-full w-full"
        dotRadius={2.4}
        dotSpacing={18}
        cursorRadius={200}
        bulgeStrength={130}
        glowRadius={200}
        sparkle={false}
        waveAmplitude={1.6}
        gradientFrom={
          isDark ? "rgba(90, 163, 212, 0.85)" : "rgba(49, 121, 171, 0.55)"
        }
        gradientTo={
          isDark ? "rgba(90, 163, 212, 0.55)" : "rgba(18, 59, 86, 0.38)"
        }
        highlightColor={isDark ? "#7CC3F0" : "#1F6FA8"}
        glowColor={isDark ? "rgba(90, 163, 212, 0.22)" : "rgba(49, 121, 171, 0.18)"}
      />
    </div>
  );
}
