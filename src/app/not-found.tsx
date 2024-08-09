"use client";
import { useCallback } from "react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { collection } from "@/actions/redirect";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const handleRedirect = useCallback(() => {
    collection();
  }, []);

  const translate = useTranslations("NotFound");

  return (
    <main className="flex flex-auto h-full justify-center px-8 py-6">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-7xl text-lol-gold">{translate("title")}</h2>
        <p className="text-lg">{translate("description")}</p>
        <PrimaryButton onClick={handleRedirect} size={"lg"}>
          {translate("button")}
        </PrimaryButton>
      </div>
    </main>
  );
}
