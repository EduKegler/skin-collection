"use client";
import { homepage, logout } from "../actions";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    logout();
    homepage();
  }, []);
  return (
    <main className="flex flex-auto h-full justify-center px-8 py-6">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-7xl text-lol-gold">Logging out...</h2>
      </div>
    </main>
  );
}
