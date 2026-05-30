"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "gursha_admin_session";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin/invoices");
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    redirect(`/admin/login?error=${encodeURIComponent("Missing ADMIN_PASSWORD in environment.")}`);
  }

  if (password !== configuredPassword) {
    redirect(`/admin/login?error=${encodeURIComponent("Incorrect password.")}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 8
  });

  redirect(nextPath || "/admin/invoices");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  redirect("/admin/login");
}
