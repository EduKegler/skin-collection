import localFont from "next/font/local";

export const spiegel = localFont({
  src: [
    {
      path: "../public/fonts/Spiegel/Spiegel_TT_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Spiegel/Spiegel_TT_Regular_Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Spiegel/Spiegel_TT_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Spiegel/Spiegel_TT_Bold_Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Spiegel/Spiegel_TT_SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Spiegel/Spiegel_TT_SemiBold_Italic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-spiegel",
});

export const beaufort = localFont({
  src: [
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-HeavyItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BeaufortforLOL/BeaufortforLOL-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-beaufort",
});
