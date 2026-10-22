"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const CATEGORY_IDS = [
  "heatPumps",
  "heatingSystems",
  "ventilationHeatRecovery",
  "airConditioningCooling",
  "airPurificationFiltration",
  "humidifiersDehumidifiers",
  "industrialHeatingVentilation",
] as const;

export default function Categories() {
  const t = useTranslations("productsPage.categories");
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setCategory(value);
    window.dispatchEvent(
      new CustomEvent("product-category-change", { detail: value }),
    );
    setIsOpen(false);
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <section className="grid-surface grid-surface-soft py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              id="product-category"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls="product-category-options"
              onClick={() => setIsOpen((open) => !open)}
              className={`panel-surface w-full cursor-pointer rounded-2xl border border-border/80 py-4 pr-20 pl-5 text-left text-sm font-medium shadow-[0_12px_36px_rgba(18,59,86,0.08)] outline-none transition-all focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(49,121,171,0.16)] ${category ? "text-dark" : "text-text/45"}`}
            >
              {category ? t(`items.${category}`) : t("placeholder")}
            </button>
            {category && (
              <button
                type="button"
                aria-label={t("clear")}
                onClick={() => handleChange("")}
                className="absolute top-1/2 right-10 z-10 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-text/45 transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none"
              >
                <FiX className="size-4" aria-hidden="true" />
              </button>
            )}
            <FiChevronDown
              className={`pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text/45 transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />

            {isOpen && (
              <ul
                id="product-category-options"
                role="listbox"
                aria-labelledby="product-category"
                className="panel-surface absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-border/80 p-1.5 shadow-[0_20px_48px_rgba(18,59,86,0.2)]"
              >
                <li role="option" aria-selected={category === ""}>
                  <button
                    type="button"
                    onClick={() => handleChange("")}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm text-text/55 transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none"
                  >
                    {t("placeholder")}
                  </button>
                </li>
                {CATEGORY_IDS.map((id) => (
                  <li key={id} role="option" aria-selected={category === id}>
                    <button
                      type="button"
                      onClick={() => handleChange(id)}
                      className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none ${category === id ? "bg-primary/10 font-semibold text-primary" : "text-dark"}`}
                    >
                      {t(`items.${id}`)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
