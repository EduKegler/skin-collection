import { memo } from "react";
import Image from "next/image";
import { LanguageSelect } from "./LanguageSelect";
import { cookies } from "next/headers";
import Link from "next/link";

export const Header = memo(function Header() {
  const language = cookies().get("language")?.value ?? "en_US";

  return (
    <header className="flex justify-between items-center">
      <Link href={"./"} className="cursor-pointer">
        <Image src={"/logo.svg"} alt="logo" width={350} height={100} />
      </Link>
      <LanguageSelect language={language} />
    </header>
  );
});
