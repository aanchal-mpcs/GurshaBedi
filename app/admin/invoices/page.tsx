import Link from "next/link";
import { logoutAction } from "@/lib/auth";
import { InvoiceBuilder } from "@/components/invoice-builder";

export default function InvoicesPage() {
  return (
    <main className="admin-shell">
      <section className="admin-topbar shell">
        <div>
          <span className="eyebrow">Private Admin</span>
          <h1>Invoice generator</h1>
          <p>
            Generate PDFs quickly, then keep the exported files manually until a future storage
            layer is worth adding.
          </p>
        </div>
        <div className="admin-topbar__actions">
          <Link href="/" className="pill-link pill-link--secondary">
            Back to site
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="pill-link pill-link--primary admin-topbar__logout">
              Log out
            </button>
          </form>
        </div>
      </section>

      <section className="shell admin-panel">
        <div className="admin-panel__note">
          Replace the placeholder business details in <code>lib/site-data.ts</code> after Gursha
          sends her final billing information and sample invoice.
        </div>
        <InvoiceBuilder />
      </section>
    </main>
  );
}
