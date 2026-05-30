import Link from "next/link";
import { loginAction } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams.error;
  const nextPath = resolvedSearchParams.next ?? "/admin/invoices";

  return (
    <main className="admin-shell">
      <section className="login-card">
        <Link href="/" className="login-card__back">
          Back to site
        </Link>
        <span className="eyebrow">Private Admin</span>
        <h1>Invoice access</h1>
        <p>
          This phase-1 admin is protected with a single environment-based password. Set
          <code> ADMIN_PASSWORD </code>
          before deploying.
        </p>
        <form action={loginAction} className="login-card__form">
          <input type="hidden" name="next" value={nextPath} />
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          {error ? <p className="login-card__error">{error}</p> : null}
          <button type="submit">Enter invoice tool</button>
        </form>
      </section>
    </main>
  );
}
