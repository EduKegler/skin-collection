"use client";
import { updateLanguage } from "@/app/actions";
import { Button, Dropdown } from "flowbite-react";
import Image from "next/image";
import { memo, useCallback, useMemo, useState } from "react";

type LanguageProps = {
  language: string;
};

export const LanguageSelect = memo(function LanguageSelect({ language }: LanguageProps) {
  const [loading, setLoading] = useState(false);

  const handleChangeLanguage = useCallback(async (value: string) => {
    setLoading(true);
    await updateLanguage(value);
    setLoading(false);
  }, []);

  const labels = useMemo(() => {
    return {
      pt_BR: (
        <span className="flex gap-2">
          <Image
            className="self-center h-auto inline w-[20px]"
            src={"br.svg"}
            alt={"pt_BR"}
            width={0}
            height={0}
            unoptimized
            priority
            sizes="100vw"
          />
          PT-BR
        </span>
      ),

      en_US: (
        <span className="flex gap-2">
          <Image
            className="self-center h-auto inline  w-[20px]"
            src={"us.svg"}
            alt={"en_US"}
            width={0}
            height={0}
            unoptimized
            priority
            sizes="100vw"
          />
          EN-US
        </span>
      ),
    };
  }, []);

  return (
    <Dropdown
      label={labels[language as keyof typeof labels]}
      renderTrigger={() => (
        <div className="relative">
          <Button color="gray">{labels[language as keyof typeof labels]}</Button>
        </div>
      )}
    >
      {loading ? null : (
        <>
          <Dropdown.Item onClick={() => handleChangeLanguage("pt_BR")}>
            {labels["pt_BR"]}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => handleChangeLanguage("en_US")}>
            {labels["en_US"]}
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
});
