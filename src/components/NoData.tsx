"use client";
import { memo } from "react";

export const NoData = memo(function NoData() {
  return (
    <div className="flex flex-auto justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-7xl text-lol-gold">Not Data</h2>
        <p className="text-lg">Could not find requested resource</p>
      </div>
    </div>
  );
});
