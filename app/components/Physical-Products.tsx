"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type Category =
  | "heatPumps"
  | "heatingSystems"
  | "ventilationHeatRecovery"
  | "airConditioningCooling"
  | "airPurificationFiltration"
  | "humidifiersDehumidifiers"
  | "industrialHeatingVentilation";

type Product = {
  title: string;
  category: Category;
  image: string;
  description: string;
  dimensions: string;
  specs: Array<[string, string]>;
};

type LocalizedProduct = {
  title: string;
  description: string;
  dimensions: string;
  specs: Array<{ label: string; value: string }>;
};

const productTranslationId = (image: string) =>
  image.split("/").at(-1)?.replace(".webp", "") ?? "";

const PRODUCTS: Product[] = [
  {
    title: "CWP-M Monoblock Heat Pump",
    category: "heatPumps",
    image: "/products/cwp-m-monoblock.webp",
    description: "Air-to-water inverter heat pump for heating and cooling, suitable for underfloor heating, radiators and fan coils.",
    dimensions: "1150–1200 × 758–878 × 345–460 mm (W × H × D)",
    specs: [["Heating", "6–15.5 kW"], ["Cooling", "5.8–14.5 kW"], ["COP", "4.30–5.0"], ["Refrigerant", "R32"]],
  },
  {
    title: "CWP-SH Split Heat Pump",
    category: "heatPumps",
    image: "/products/cwp-sh-split.webp",
    description: "Split air-to-water system with outdoor unit and hydro indoor module, including staged electric auxiliary heating.",
    dimensions: "Indoor: 460 × 860 × 318 mm; outdoor sizes vary by output",
    specs: [["Heating", "6–15.5 kW"], ["Cooling", "4.09–11.6 kW"], ["Sound pressure", "34–40 dB(A) at 10 m"], ["Operating range", "−25 to +35 °C"]],
  },
  {
    title: "CWP-SB Split Heat Pump",
    category: "heatPumps",
    image: "/products/cwp-sb-split.webp",
    description: "Heating and cooling system combining an outdoor unit with an indoor hydro module and integrated domestic hot-water storage.",
    dimensions: "Indoor: 460 × 860 × 318 mm; outdoor sizes vary by output",
    specs: [["Heating", "6–15.5 kW"], ["Cooling", "4.09–11.6 kW"], ["Hot-water tank", "200 L"], ["Refrigerant", "R32"]],
  },
  {
    title: "BWS 300 Hot-Water Tank",
    category: "heatPumps",
    image: "/products/bws300-hot-water-tank.webp",
    description: "Double-enamelled domestic hot-water tank with two smooth-tube heat exchangers, designed for direct heat-pump connection.",
    dimensions: "Ø 620 × 1725 mm",
    specs: [["Capacity", "300 L"], ["Electric element", "3 kW"], ["Insulation", "50 mm PU foam"], ["Weight", "150 kg"]],
  },
  {
    title: "SRH Sound-Reduction Hood",
    category: "heatPumps",
    image: "/products/srh-sound-reduction-hood.webp",
    description: "Weather-resistant enclosure for heat pumps and air-conditioning units in noise-sensitive installation areas.",
    dimensions: "1385 × 1155 × 1100 mm (W × H × D)",
    specs: [["Noise reduction", "Up to 15 dB(A)"], ["Material", "EPP polypropylene"], ["Fire class", "B2"], ["Weight", "40 kg"]],
  },
  {
    title: "CWP 16 SH High-Performance Heat Pump",
    category: "heatPumps",
    image: "/products/cwp-16sh.webp",
    description: "High-performance split heat pump for space heating and cooling, available with domestic hot-water storage options.",
    dimensions: "Outdoor and indoor modules; dimensions depend on configuration",
    specs: [["Output range", "6–16 kW"], ["Functions", "Heating and cooling"], ["Configuration", "Split system"]],
  },
  {
    title: "CE 200 Heat-Recovery Ventilation",
    category: "ventilationHeatRecovery",
    image: "/products/ce200-heat-recovery.webp",
    description: "Decentralized supply and extract-air ventilation unit with heat recovery for balanced room ventilation.",
    dimensions: "270 × 270 × 330–550 mm (W × H × D)",
    specs: [["Maximum airflow", "300 m³/h"], ["Minimum airflow", "75 m³/h"], ["Efficiency", "Up to 75%"]],
  },
  {
    title: "CE 100 SN Heat-Recovery Ventilation",
    category: "ventilationHeatRecovery",
    image: "/products/ce100-sn-heat-recovery.webp",
    description: "Space-saving decentralized ventilation unit for horizontal or vertical installation using only two wall penetrations.",
    dimensions: "610 × 386 × 140 mm (W × H × D)",
    specs: [["Airflow", "110 m³/h"], ["Heat recovery", "Up to 90%"], ["Wall penetrations", "2 × 100 mm"]],
  },
  {
    title: "R12 HP Compact Heat Pump",
    category: "airConditioningCooling",
    image: "/products/r12-hp.webp",
    description: "Compact wall-mounted heating and cooling unit that operates without a visible outdoor unit.",
    dimensions: "980 × 610 × 350 mm (W × H × D)",
    specs: [["Cooling", "3.0 kW"], ["Heating", "3.0 kW"], ["Airflow", "490 m³/h"], ["Supply", "230 V"]],
  },
  {
    title: "DT 2000 Wall-Mounted Heater",
    category: "heatingSystems",
    image: "/products/dt2000-wall-heater.webp",
    description: "Special wall heater with regulated surface and outlet-air temperature, intended for sensitive occupied spaces.",
    dimensions: "Wall-mounted format; model-specific dimensions",
    specs: [["Heating capacities", "1 / 1.5 / 2 kW"], ["Temperature limit", "Up to +60 °C"], ["Applications", "Schools, care facilities, living spaces"]],
  },
  {
    title: "EH 2000 Electric Heater",
    category: "heatingSystems",
    image: "/products/eh2000-electric-heater.webp",
    description: "Plug-in electric heater with oscillating heat distribution for flexible room heating.",
    dimensions: "240 × 604 × 190 mm (W × H × D)",
    specs: [["Heating output", "2 kW"], ["Connection", "Plug-in"], ["Distribution", "Oscillating"]],
  },
  {
    title: "VF 15 Heavy-Duty Fan Heater",
    category: "industrialHeatingVentilation",
    image: "/products/vf15-fan-heater.webp",
    description: "Portable heavy-duty electric fan heater for industrial, commercial, construction and agricultural use.",
    dimensions: "Portable industrial enclosure; model-specific dimensions",
    specs: [["Heating output", "15 kW"], ["Supply", "400 V CEE"], ["Series range", "2–15 kW"]],
  },
  {
    title: "CLS 20 Outdoor Air Heater",
    category: "industrialHeatingVentilation",
    image: "/products/cls20-air-heater.webp",
    description: "Weather-protected outdoor air heater designed for industrial environments and frost protection of external pipework.",
    dimensions: "Custom installation dimensions",
    specs: [["Heating capacities", "15 / 18 / 20 / 25 kW+"], ["Installation", "Outdoor"], ["Use", "Industrial heating and frost protection"]],
  },
  {
    title: "CB 40 Dehumidifier",
    category: "humidifiersDehumidifiers",
    image: "/products/cb40-dehumidifier.webp",
    description: "Mobile high-capacity dehumidifier for rooms up to 200 m³, designed for commercial and restoration work.",
    dimensions: "312 × 635 × 453 mm (W × H × D)",
    specs: [["Extraction", "40 L/day"], ["Airflow", "240 m³/h"], ["Room volume", "Up to 200 m³"]],
  },
  {
    title: "CB 30 S Heavy-Duty Dehumidifier",
    category: "humidifiersDehumidifiers",
    image: "/products/cb30s-dehumidifier.webp",
    description: "Rugged dehumidifier for building drying and swimming-pool applications, designed for operation up to 30 °C and 80% RH.",
    dimensions: "380 × 630 × 400 mm (W × H × D)",
    specs: [["Extraction", "30 L/day"], ["Application", "Building and pool drying"], ["Maximum condition", "30 °C / 80% RH"]],
  },
  {
    title: "AQC 450 Air Quality Center",
    category: "humidifiersDehumidifiers",
    image: "/products/aqc450-air-quality-center.webp",
    description: "Combined humidification, air-purification and fragrance-diffusion unit with hot- and cold-mist operation.",
    dimensions: "284 × 318 × 165 mm (W × H × D)",
    specs: [["Room size", "Up to 27 m²"], ["Output", "450 / 250 ml/h"], ["Tank", "5 L"], ["Connectivity", "Integrated Wi-Fi"]],
  },
  {
    title: "ACS 300 Air Purifier",
    category: "airPurificationFiltration",
    image: "/products/acs300-air-purifier.webp",
    description: "Universal plug-in air purifier with a medical-grade filter for pollen, exhaust fumes, barbecue odours and tobacco smoke.",
    dimensions: "Compact mobile format; dimensions not specified in catalog",
    specs: [["Airflow", "Up to 300 m³/h"], ["Filter", "Medical-grade"], ["Connection", "Plug-in"]],
  },
];

export default function PhysicalProducts() {
  const t = useTranslations("productsPage.physicalProducts");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const handleCategoryChange = (event: Event) => {
      setCategory((event as CustomEvent<string>).detail);
    };
    window.addEventListener("product-category-change", handleCategoryChange);
    return () => window.removeEventListener("product-category-change", handleCategoryChange);
  }, []);

  const products = useMemo(
    () => category ? PRODUCTS.filter((product) => product.category === category) : PRODUCTS,
    [category],
  );

  return (
    <section className="grid-surface grid-surface-soft pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t("eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-dark sm:text-4xl">{t("title")}</h2>
          </div>
          <p className="text-sm text-text/60">{products.length} products</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const content = t.raw(`items.${productTranslationId(product.image)}`) as LocalizedProduct;

            return <article key={product.image} className="group panel-surface overflow-hidden rounded-3xl border border-border/70 shadow-[0_12px_36px_rgba(18,59,86,0.07)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/35 hover:shadow-[0_24px_56px_rgba(18,59,86,0.16)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image src={product.image} alt={content.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight text-dark">{content.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text/70">{content.description}</p>
                <dl className="mt-5 border-t border-border/70 pt-4">
                  <div className="flex gap-4 py-1.5 text-sm">
                    <dt className="w-24 shrink-0 font-medium text-text/55">{t("dimensions")}</dt>
                    <dd className="text-dark">{content.dimensions}</dd>
                  </div>
                  {content.specs.map((spec) => (
                    <div key={spec.label} className="flex gap-4 py-1.5 text-sm">
                      <dt className="w-24 shrink-0 font-medium text-text/55">{spec.label}</dt>
                      <dd className="text-dark">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
