"use client";
import { memo, useCallback } from "react";
import Image from "next/image";
import { LanguageSelect } from "./LanguageSelect";
import {
  CustomFlowbiteTheme,
  DropdownDivider,
  DropdownItem,
  MegaMenu,
  Navbar,
} from "flowbite-react";
import { SignInWithRiotButton } from "./SignInWithRiot";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { routes } from "@/contants";
type HeaderProps = {
  language: string;
};

export const Header = memo(function Header({ language }: HeaderProps) {
  const path = usePathname();
  const customTheme: CustomFlowbiteTheme["megaMenu"] = {
    root: {
      base: "bg-transparent",
    },
  };

  console.log(path);
  const activeNavbar = useCallback(
    (route: string[]) =>
      clsx(route.includes(path) ? "dark:text-[#f0e6d2]" : "dark:text-gray-400"),
    [path],
  );

  return (
    <MegaMenu className="" theme={customTheme}>
      <div className="mx-auto flex w-full flex-wrap items-center justify-between">
        <Navbar.Brand href="/">
          <Image src={"/logo.svg"} alt="logo" width={350} height={100} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href={routes.HOME} className={activeNavbar([routes.HOME])}>
            Home
          </Navbar.Link>
          <Navbar.Link
            href={routes.COLLECTION}
            className={activeNavbar([routes.COLLECTION])}
          >
            Collection
          </Navbar.Link>
          <Navbar.Link href={routes.DONATE} className={activeNavbar([routes.DONATE])}>
            Donate
          </Navbar.Link>
          <MegaMenu.Dropdown
            toggle={
              <span className={activeNavbar([routes.TOS, routes.PRIVACY])}>Legal</span>
            }
          >
            <DropdownItem href="/tos">Terms of Service</DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/privacy">Privacy Policy</DropdownItem>
          </MegaMenu.Dropdown>
        </Navbar.Collapse>
        <div className="flex flex-col gap-2">
          <LanguageSelect language={language} />
          <SignInWithRiotButton />
        </div>
      </div>
    </MegaMenu>
  );
});
