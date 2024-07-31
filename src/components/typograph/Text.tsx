import React from "react";
import { memo, ReactNode } from "react";

type TextProps = {
  children: ReactNode;
};

export const Text = memo(function Text({ children }: TextProps) {
  return <p className="text-md">{children}</p>;
});
