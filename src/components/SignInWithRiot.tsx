"use client";
import { memo } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { useSignIn } from "@/hooks/useSignIn";

export const SignInWithRiot = memo(function SignInWithRiot() {
  const { signIn } = useSignIn();
  return <PrimaryButton onClick={signIn}>SIGN IN</PrimaryButton>;
});
