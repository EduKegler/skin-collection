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
import { SignInWithRiot } from "../SignInWithRiot";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { routes } from "@/contants";
import { AccountAvatar } from "../AccountAvatar";
import { useOAuth } from "@/providers/OAuthProvider";
import { useTranslations } from "next-intl";

export const Header = memo(function Header() {
  const path = usePathname();
  const { isConnected } = useOAuth();
  const translate = useTranslations("Header");

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
            <h2 className={activeNavbar([routes.HOME])}>{translate("home")}</h2>
          </Navbar.Link>
          <Navbar.Link href={routes.COLLECTION}>
            <h2 className={activeNavbar([routes.COLLECTION])}>
              {translate("collection")}
            </h2>
          </Navbar.Link>
          <div>
            <Dropdown
              label=""
              renderTrigger={() => (
                <h2 className={activeNavbar([routes.TOS, routes.PRIVACY])}>
                  {translate("legal")}
                </h2>
              )}
            >
              <DropdownItem href="/tos">{translate("tos")}</DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/privacy">{translate("privacy")}</DropdownItem>
            </Dropdown>
          </div>
        </Navbar.Collapse>
        <div className="flex gap-4 items-center">
          <LanguageSelect />
          {isConnected ? <AccountAvatar /> : <SignInWithRiot />}
        </div>
      </div>
    </MegaMenu>
  );
});
