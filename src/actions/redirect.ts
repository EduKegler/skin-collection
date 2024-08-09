import { ROUTE } from "@/contants";
import { redirect } from "next/navigation";

export async function collection() {
  redirect(ROUTE.COLLECTION);
}
