import Link from "next/link";
import { externalLinks, featuredClients } from "@/lib/site-data";
import { SelectedWork } from "@/components/selected-work";

const serviceTags = ["Styling", "Creative Direction", "Modeling", "Content Creation"];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link className="site-header__brand" href="/">
            Gursha Bedi
          </Link>
          <nav className="site-header__nav" aria-label="Primary">
            <a href="#home">Home</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero shell" id="home">
        <div className="hero__copy">
          <span className="eyebrow">Stylist / Creative Director / Model / Content Creator</span>
          <h1 className="hero__title">
            Commercially sharp,
            <br />
            color-first image making.
          </h1>
          <p className="hero__text">
            Gursha Bedi builds playful, glamorous, editorial work across styling, creative
            direction, modeling, and content creation for brands, collaborators, and recruiters.
          </p>
          <div className="hero__tags" aria-label="Services">
            {serviceTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero__actions">
            <a className="pill-link pill-link--primary" href="#work">
              View Work
            </a>
            <a className="pill-link pill-link--secondary" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__frame">
            <div className="hero-visual__card hero-visual__card--main">
              <div className="hero-visual__label">Hero image placeholder</div>
              <div className="hero-visual__meta">Replace with Gursha&apos;s strongest launch image</div>
            </div>
            <div className="hero-visual__card hero-visual__card--accent" />
            <div className="hero-visual__card hero-visual__card--stamp">
              <span>maximalist</span>
              <span>editorial</span>
              <span>camp</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cred shell" aria-label="Commercial highlights">
        <div className="cred__panel">
          <span className="eyebrow">Selected Clients</span>
          <div className="cred__clients">
            {featuredClients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
          <p className="cred__note">
            Swap placeholder names with approved public client or brand credits before launch.
          </p>
        </div>
      </section>

      <SelectedWork />

      <section className="about shell" id="about">
        <div className="about__heading">
          <span className="eyebrow">About</span>
          <h2 className="section-title">A commercial portfolio with a strong point of view.</h2>
        </div>
        <div className="about__body">
          <p className="section-copy">
            Gursha&apos;s work sits between editorial impact and brand-facing clarity. The focus is
            on building a memorable visual identity quickly, then giving clients, collaborators,
            and recruiters an easy path to assess fit and reach out.
          </p>
          <div className="about__links">
            <a className="about__link" href={externalLinks.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="about__link" href={externalLinks.behance} target="_blank" rel="noreferrer">
              Behance
            </a>
            <Link className="about__link" href="/cv" target="_blank">
              CV PDF
            </Link>
          </div>
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="contact__panel">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">For bookings, collaborations, and brand work.</h2>
          </div>
          <p className="section-copy">
            Phase 1 uses a direct email contact path to keep the launch lean. A proper domain email
            and form workflow can be added in phase 2.
          </p>
          <div className="contact__actions">
            <a
              className="pill-link pill-link--primary"
              href={`mailto:${externalLinks.contactEmail}?subject=${encodeURIComponent("Portfolio inquiry for Gursha Bedi")}`}
            >
              Email Gursha
            </a>
            <Link className="pill-link pill-link--secondary" href="/admin/invoices">
              Invoice Admin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
