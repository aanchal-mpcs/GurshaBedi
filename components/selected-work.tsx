"use client";

import { useState } from "react";
import { categories, workItems, type WorkCategory } from "@/lib/site-data";

export function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("All");

  const visibleWork =
    activeCategory === "All"
      ? workItems
      : workItems.filter((item) => item.category === activeCategory);

  return (
    <section className="work shell" id="work">
      <div className="work__intro">
        <div>
          <span className="eyebrow">Selected Work</span>
          <h2 className="section-title">Eight launch-ready projects, curated by discipline.</h2>
        </div>
        <p className="section-copy">
          This launch version keeps project browsing direct. Each card signals category, client
          context, and visual tone, then sends viewers outward for deeper exploration.
        </p>
      </div>

      <div className="work__filters" role="tablist" aria-label="Filter selected work">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "is-active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {visibleWork.map((item) => (
          <a
            key={`${item.title}-${item.category}`}
            className="work-card"
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            <div className="work-card__visual" style={{ background: item.accent }}>
              <span>{item.role}</span>
            </div>
            <div className="work-card__content">
              <div className="work-card__meta">
                <span>{item.category}</span>
                <span>{item.year}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="work-card__footer">
                <span>{item.client}</span>
                <span>Open external</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
