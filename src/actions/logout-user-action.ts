"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logoutUserAction() {
  try {
    await signOut();
  } catch (err) {
    console.error(err);
  } finally {
    redirect("/login");
  }
}
