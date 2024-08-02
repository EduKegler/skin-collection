"use client";
import { memo } from "react";
import { Footer as BaseFooter } from "flowbite-react";

export const Footer = memo(function Footer() {
  return (
    <BaseFooter
      container
      className="dark:bg-transparent shadow-none px-0 pb-0 opacity-50"
    >
      <span className="text-xs">
        <BaseFooter.Copyright
          className="inline text-xs"
          by="Skin Collection."
          year={2024}
        />{" "}
        All rights reserved. Skin Collection {"isn't "}
        endorsed by Riot Games and {"doesn't "} reflect the views or opinions of Riot
        Games or anyone officially involved in producing or managing League of Legends.
        <br />
        League of Legends and Riot Games are trademarks or registered trademarks of Riot
        Games, Inc. League of Legends{" "}
        <BaseFooter.Copyright className="inline text-xs" by="Riot Games, Inc." />
      </span>
    </BaseFooter>
  );
});
