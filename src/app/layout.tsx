import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OAuthContextDefaultType, OAuthProvider } from "@/providers/OAuthProvider";
import { OAUTH_DEFAULT_VALUES } from "@/contants";

export const spiegel = localFont({
  src: [
    {
      path: "../../public/fonts/Spiegel/Spiegel_TT_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Spiegel/Spiegel_TT_Regular_Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Spiegel/Spiegel_TT_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Spiegel/Spiegel_TT_Bold_Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Spiegel/Spiegel_TT_SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Spiegel/Spiegel_TT_SemiBold_Italic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-spiegel",
});

export const beaufort = localFont({
  src: [
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-HeavyItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/BeaufortforLOL/BeaufortforLOL-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-beaufort",
});

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

async function getData(): Promise<OAuthContextDefaultType> {
  const jwt = cookies().get("jwt")?.value;

  if (!jwt) {
    return OAUTH_DEFAULT_VALUES;
  }

  const accountInfo = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    },
  );

  const summonerInfo = await fetch(
    `https://br1.api.riotgames.com/lol/summoner/v4/summoners/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    },
  );

  const account = await accountInfo.json();
  const summoner = await summonerInfo.json();

  if (summoner.status_code || account.status_code) {
    return OAUTH_DEFAULT_VALUES;
  }

  return {
    id: account.puuid,
    name: account.gameName,
    tag: account.tagLine,
    profileIconId: summoner.profileIconId,
    level: summoner.summonerLevel,
    isConnected: true,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: {
    userId: string;
  };
}>) {
  const language = cookies().get("language")?.value ?? "en_US";
  const oauthValues = await getData();
  params.userId = oauthValues.id;

  return (
    <html lang="en" className={`${beaufort.variable} ${spiegel.variable} dark`}>
      <link rel="icon" href="/icon.png" sizes="any" />
      <Analytics />
      <SpeedInsights />
      <body className="flex min-h-screen flex-col gap-2 px-8 py-6 dark">
        <OAuthProvider {...oauthValues}>
          <Flowbite theme={{ theme: customTheme }}>
            <Header language={language} />
            {children}
          </Flowbite>
          <Footer />
        </OAuthProvider>
      </body>
    </html>
  );
}
