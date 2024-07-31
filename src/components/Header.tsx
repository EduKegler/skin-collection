import { memo } from "react";
import Image from "next/image";
import { LanguageSelect } from "./LanguageSelect";
import { cookies } from "next/headers";

export const Header = memo(function Header() {
  const language = cookies().get("language")?.value ?? "en_US";

  return (
    <header className="flex justify-between px-8 pt-8 items-center">
      <Image src={"/logo.svg"} alt="logo" width={350} height={100} />
      <LanguageSelect language={language} />
    </header>
  );
});
