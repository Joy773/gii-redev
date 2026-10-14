import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("imprintPage");

  return {
    title: t("metaTitle"),
    description: t("description"),
  };
}

export default async function ImprintPage() {
  const t = await getTranslations("imprintPage");
  const dataCategories = t.raw("privacy.dataCategories") as string[];

  return (
    <>
      <section className="bg-[#F4F7F8]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-7 text-text/75 sm:text-lg">{t("legalBasis")}</p>
          <p className="mt-4 text-sm text-text/60">{t("privacy.updated")}</p>
        </div>
      </section>

      <section className="grid-surface grid-surface-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <dl className="space-y-6 text-base leading-7">
          <div>
            <dt className="text-xs font-semibold tracking-[0.14em] text-text/45 uppercase">
              {t("companyLabel")}
            </dt>
            <dd className="mt-2 text-dark">
              {t("company")}
              <br />
              {t("street")}
              <br />
              {t("city")}
              <br />
              {t("country")}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.14em] text-text/45 uppercase">
              {t("representedLabel")}
            </dt>
            <dd className="mt-2 text-dark">{t("representedValue")}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.14em] text-text/45 uppercase">
              {t("contactLabel")}
            </dt>
            <dd className="mt-2 text-dark">
              {t("phoneLabel")}:{" "}
              <a className="transition-colors hover:text-primary" href="tel:+493054909202">
                {t("phone")}
              </a>
              <br />
              {t("emailLabel")}:{" "}
              <a className="transition-colors hover:text-primary" href={`mailto:${t("email")}`}>
                {t("email")}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.14em] text-text/45 uppercase">
              {t("registerLabel")}
            </dt>
            <dd className="mt-2 text-dark">
              {t("registerCourt")}
              <br />
              {t("registerNumber")}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.14em] text-text/45 uppercase">
              {t("vatLabel")}
            </dt>
            <dd className="mt-2 text-dark">{t("vatValue")}</dd>
          </div>
        </dl>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-dark">{t("copyrightTitle")}</h2>
          <p className="mt-4 text-base leading-7 text-text/80">{t("copyrightBody")}</p>
        </div>

        <div className="mt-16 border-t border-border/70 pt-16">
          <h2 className="text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
            {t("privacy.title")}
          </h2>
          <p className="mt-5 text-base leading-7 text-text/80">{t("privacy.intro")}</p>

          <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
            {t("privacy.generalTitle")}
          </h3>
          <h4 className="mt-6 text-base font-semibold text-dark">{t("privacy.controllerTitle")}</h4>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.controllerBody")}</p>

          <h4 className="mt-6 text-base font-semibold text-dark">{t("privacy.dataTitle")}</h4>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.dataIntro")}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-text/80">
            {dataCategories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h4 className="mt-6 text-base font-semibold text-dark">{t("privacy.retentionTitle")}</h4>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.retentionBody")}</p>

          <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
            {t("privacy.purposesTitle")}
          </h3>
          <h4 className="mt-6 text-base font-semibold text-dark">{t("privacy.hostingTitle")}</h4>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.hostingBody")}</p>
          <h4 className="mt-6 text-base font-semibold text-dark">{t("privacy.communicationTitle")}</h4>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.communicationBody")}</p>
          <h4 className="mt-6 text-base font-semibold text-dark">{t("privacy.analyticsTitle")}</h4>
          <p className="mt-3 text-base leading-7 text-text/80">
            {t("privacy.analyticsBody")}{" "}
            <a
              className="text-primary underline-offset-2 hover:underline"
              href="https://policies.google.com/privacy"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("privacy.analyticsLink")}
            </a>
          </p>

          <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
            {t("privacy.sharingTitle")}
          </h3>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.sharingBody")}</p>

          <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
            {t("privacy.rightsTitle")}
          </h3>
          <p className="mt-3 text-base leading-7 text-text/80">{t("privacy.rightsBody")}</p>

          <h3 className="mt-10 text-xl font-semibold tracking-tight text-dark">
            {t("privacy.complaintTitle")}
          </h3>
          <p className="mt-3 text-base leading-7 text-text/80">
            {t("privacy.complaintBody")}{" "}
            <a
              className="text-primary underline-offset-2 hover:underline"
              href="https://www.datenschutz-berlin.de"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.datenschutz-berlin.de
            </a>
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
