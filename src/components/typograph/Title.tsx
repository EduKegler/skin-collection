import React from "react";
import { memo, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title = memo(function Title({ children }: TitleProps) {
  return <h2 className="font-bold pb-2 text-lg">{children}</h2>;
});
