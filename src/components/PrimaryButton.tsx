"use client";

import clsx from "clsx";
import { Button, ButtonProps } from "flowbite-react";
import { memo } from "react";

export const PrimaryButton = memo(function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className={clsx(
        "bg-gradient-to-br from-[#785a28] to-[#c89b3c] focus:ring-1 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800 font-bold uppercase",
        props.className,
      )}
      size={props.size ?? "xs"}
    >
      {props.children}
    </Button>
  );
});
