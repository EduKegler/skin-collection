"use client";
import { useCallback } from "react";
import { homepage } from "./actions";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function NotFound() {
  const handleRedirect = useCallback(() => {
    homepage();
  }, []);

  return (
    <main className="flex flex-auto h-full justify-center px-8 py-6">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-7xl text-lol-gold">Not Found</h2>
        <p className="text-lg">Could not find requested resource</p>
        <PrimaryButton onClick={handleRedirect}>RETURN HOME</PrimaryButton>
      </div>
    </main>
  );
}
