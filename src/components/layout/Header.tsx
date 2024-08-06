"use client";
import { memo, useCallback } from "react";
import Image from "next/image";
import { LanguageSelect } from "../filters/LanguageSelect";
import {
  CustomFlowbiteTheme,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  MegaMenu,
  Navbar,
} from "flowbite-react";
import { SignInWithRiotButton } from "../SignInWithRiot";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { routes } from "@/contants";

type HeaderProps = {
  language: string;
  clientId: string;
};

export const Header = memo(function Header({ language, clientId }: HeaderProps) {
  const path = usePathname();
  const customTheme: CustomFlowbiteTheme["megaMenu"] = {
    root: {
      base: "bg-transparent",
    },
  };

  const activeNavbar = useCallback(
    (route: string[]) =>
      clsx(
        route.includes(path) ? "dark:text-[#f0e6d2]" : "dark:text-gray-400",
        "text-2xl dark:hover:text-[#785A28] cursor-pointer",
      ),
    [path],
  );

  return (
    <MegaMenu className="" theme={customTheme}>
      <div className="flex mx-auto w-full flex-wrap items-center justify-between">
        <Navbar.Brand href="/">
          <Image
            src={"/logo.svg"}
            alt="logo"
            priority
            width="0"
            height="0"
            sizes="100vw"
            className="w-[280px] h-auto"
            unoptimized
          />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href={routes.HOME}>
            <h2 className={activeNavbar([routes.HOME])}>Home</h2>
          </Navbar.Link>
          <Navbar.Link href={routes.COLLECTION}>
            <h2 className={activeNavbar([routes.COLLECTION])}>Collection</h2>
          </Navbar.Link>
          <Navbar.Link href={routes.DONATE}>
            <h2 className={activeNavbar([routes.DONATE])}>Donate</h2>
          </Navbar.Link>
          <div>
            <Dropdown
              label=""
              renderTrigger={() => (
                <h2 className={activeNavbar([routes.TOS, routes.PRIVACY])}>Legal</h2>
              )}
            >
              <DropdownItem href="/tos">Terms of Service</DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/privacy">Privacy Policy</DropdownItem>
            </Dropdown>
          </div>
        </Navbar.Collapse>
        <div className="flex gap-2">
          <LanguageSelect language={language} />
          <SignInWithRiotButton clientId={clientId} />
        </div>
      </div>
    </MegaMenu>
  );
});
