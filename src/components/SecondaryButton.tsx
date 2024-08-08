"use client";

import clsx from "clsx";
import { Button, ButtonProps } from "flowbite-react";
import { memo } from "react";

export const SecondaryButton = memo(function SecondaryButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className={clsx("font-bold uppercase", props.className)}
      size={props.size ?? "xs"}
      color={"gray"}
    >
      {props.children}
    </Button>
  );
});
