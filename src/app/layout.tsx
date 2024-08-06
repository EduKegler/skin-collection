import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OAuthProvider } from "@/providers/OAuthProvider";

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

async function getData() {
  const jwt = cookies().get("jwt")?.value ?? "";

  const res = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Baerer " + jwt,
      },
    },
  );

  const data = await res.json();
  console.log("data", data);

  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const language = cookies().get("language")?.value ?? "en_US";
  await getData();

  return (
    <html lang="en" className={`${beaufort.variable} ${spiegel.variable} dark`}>
      <link rel="icon" href="/icon.png" sizes="any" />
      <Analytics />
      <SpeedInsights />
      <body className="flex min-h-screen flex-col gap-2 px-8 py-6 dark">
        <OAuthProvider>
          <Flowbite theme={{ theme: customTheme }}>
            <Header
              language={language}
              clientId={process.env.RIOT_APPLICATION_CLIENT_ID ?? ""}
              callback={process.env.RIOT_APPLICATION_CALLBACK ?? ""}
            />
            {children}
          </Flowbite>
          <Footer />
        </OAuthProvider>
      </body>
    </html>
  );
}
