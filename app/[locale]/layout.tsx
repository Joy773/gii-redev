import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import NavbarIntl from "../components/common/NavbarIntl";
import Footer from "../components/common/Footer";
import {
  LocaleTransitionBody,
  LocaleTransitionProvider,
} from "../components/common/LocaleTransitionProvider";
import DotFieldBackground from "@/components/DotFieldBackground";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleTransitionProvider>
        <div className="relative min-h-full">
          <DotFieldBackground />
          <div className="relative z-10 flex min-h-full flex-col">
            <NavbarIntl />
            <LocaleTransitionBody>{children}</LocaleTransitionBody>
            <Footer />
          </div>
        </div>
      </LocaleTransitionProvider>
    </NextIntlClientProvider>
  );
}

