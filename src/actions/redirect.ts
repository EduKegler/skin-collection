import { ROUTE } from "@/contants";
import { redirect } from "next/navigation";

export async function homepage() {
  redirect(ROUTE.HOME);
}

export async function collection() {
  redirect(ROUTE.COLLECTION);
}

export async function logout() {
  redirect(ROUTE.LOGOUT);
}
