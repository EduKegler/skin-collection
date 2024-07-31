import { ReactNode } from "react";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="p-10">{children}</div>;
}
