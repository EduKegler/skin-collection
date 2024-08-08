"use client";
import { memo } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { useSignIn } from "@/hooks/useSignIn";
import { useTranslations } from "next-intl";

export const SignInWithRiot = memo(function SignInWithRiot() {
  const { signIn } = useSignIn();
  const translate = useTranslations("SignInWithRiot");
  return <PrimaryButton onClick={signIn}>{translate("signin")}</PrimaryButton>;
});
