import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("imprintPage.privacy");

  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("imprintPage.privacy");
  const imprint = await getTranslations("imprintPage");
  const dataCategories = t.raw("dataCategories") as string[];

  return (
    <>
      <section className="bg-[#F4F7F8]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
            {imprint("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-7 text-text/75 sm:text-lg">{t("intro")}</p>
          <p className="mt-4 text-sm text-text/60">{t("updated")}</p>
        </div>
      </section>

      <section className="grid-surface grid-surface-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              {t("generalTitle")}
            </h2>
            <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
              {t("controllerTitle")}
            </h3>
            <p className="mt-3 text-base leading-7 text-text/80">{t("controllerBody")}</p>

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
              {t("dataTitle")}
            </h3>
            <p className="mt-3 text-base leading-7 text-text/80">{t("dataIntro")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-text/80">
              {dataCategories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
              {t("retentionTitle")}
            </h3>
            <p className="mt-3 text-base leading-7 text-text/80">{t("retentionBody")}</p>
          </div>

          <div className="mt-16 border-t border-border/70 pt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              {t("purposesTitle")}
            </h2>
            <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
              {t("hostingTitle")}
            </h3>
            <p className="mt-3 text-base leading-7 text-text/80">{t("hostingBody")}</p>

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
              {t("communicationTitle")}
            </h3>
            <p className="mt-3 text-base leading-7 text-text/80">{t("communicationBody")}</p>

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
              {t("analyticsTitle")}
            </h3>
            <p className="mt-3 text-base leading-7 text-text/80">
              {t("analyticsBody")} {" "}
              <a
                className="text-primary underline-offset-2 hover:underline"
                href="https://policies.google.com/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                {t("analyticsLink")}
              </a>
              .
            </p>
          </div>

          <div className="mt-16 border-t border-border/70 pt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              {t("sharingTitle")}
            </h2>
            <p className="mt-5 text-base leading-7 text-text/80">{t("sharingBody")}</p>
          </div>

          <div className="mt-16 border-t border-border/70 pt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              {t("rightsTitle")}
            </h2>
            <p className="mt-5 text-base leading-7 text-text/80">{t("rightsBody")}</p>
          </div>

          <div className="mt-16 border-t border-border/70 pt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
              {t("complaintTitle")}
            </h2>
            <p className="mt-5 text-base leading-7 text-text/80">
              {t("complaintBody")} {" "}
              <a
                className="text-primary underline-offset-2 hover:underline"
                href="https://www.datenschutz-berlin.de"
                rel="noopener noreferrer"
                target="_blank"
              >
                www.datenschutz-berlin.de
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
