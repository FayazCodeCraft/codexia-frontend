"use server";

import { signIn } from "@/auth";

export async function handleSignIn(data: { email: string; password: string }) {
  try {
    console.log(data);
    await signIn("credentials", {
      redirectTo: "/",
      ...data,
    });
  } catch (error) {
    throw error;
  }
}
