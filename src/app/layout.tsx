import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OAuthProvider } from "@/providers/OAuthProvider";
import { beaufort, spiegel } from "@/font";
import { accountInfo } from "@/actions/signIn";
import { getLanguage } from "@/actions/language";
import { ToastProvider } from "@/providers/ToastProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { UserPreferenceProvider } from "@/providers/UserPreferenceProvider";
import { getDefaultFilter } from "@/actions/filter";

export const metadata: Metadata = {
  title: "Skin Collection LOL",
  description: "Skin Collection website.",
};

const customTheme: CustomFlowbiteTheme = {
  button: {
    gradientDuoTone: {
      primary:
        "bg-gradient-to-br from-[#785a27] to-[#c89b3c] text-[#F0E6D2] focus:ring-1 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800",
    },
  },
  dropdown: {
    arrowIcon: "ml-2 mt-0.5 h-4 w-4",
  },
  floatingLabel: {
    helperText: {
      default: "text-xs text-gray-600 dark:text-gray-400",
      success: "text-xs text-green-600 dark:text-green-400",
      error: "text-xs text-red-600 dark:text-red-400",
    },
  },
  modal: {
    content: {
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-slate-800",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const language = await getLanguage();
  const { collectFilter, tierFilter, legacyFilter, orderBy } = await getDefaultFilter();
  const oauthValues = await accountInfo();

  return (
    <html lang="en" className={`${beaufort.variable} ${spiegel.variable} dark`}>
      <link rel="icon" href="/icon.png" sizes="any" />
      <Analytics />
      <SpeedInsights />
      <body className="min-h-screen flex dark">
        <LoadingProvider>
          <UserPreferenceProvider
            defaultLanguage={language}
            defaultCollectFilter={collectFilter}
            defaultTierFilter={tierFilter}
            deafultLegacyFilter={legacyFilter}
            defaultOrderBy={orderBy}
          >
            <ToastProvider>
              <OAuthProvider {...oauthValues}>
                <Flowbite theme={{ theme: customTheme }}>
                  <div className="flex flex-col w-full gap-2 px-8 py-6 ">
                    <Header />
                    {children}
                    <Footer />
                  </div>
                </Flowbite>
              </OAuthProvider>
            </ToastProvider>
          </UserPreferenceProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
