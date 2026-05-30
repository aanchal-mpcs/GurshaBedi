# Project Proposal: Gursha Bedi Portfolio

## One-Line Description

A mobile-first portfolio website for Gursha Bedi that showcases her styling, creative direction, modeling, and content creation work for brands, collaborators, agencies, and recruiters, with a lightweight private invoice tool for her own use.

## The Problem

Gursha needs a professional online presence that quickly communicates her aesthetic and services, makes it easy for potential clients and collaborators to review her work, and gives her a simple way to generate invoices without adding unnecessary technical complexity or recurring cost. Right now, the biggest risk is that her work is spread across existing platforms and not yet organized into a focused portfolio experience.

## Target User

Primary users are brands hiring freelance stylists or creative directors, potential freelance clients, creative collaborators, and agencies or recruiters evaluating Gursha for opportunities. A secondary user is Gursha herself, who needs a simple private tool to generate invoice PDFs.

## Core Features (v1)

1. A public portfolio website with a strong homepage, selected work gallery with category filters, About section, Contact section, and direct links to Instagram, Behance, and Gursha's CV PDF.
2. A curated Selected Work experience featuring 8 launch projects total, organized across Modeling, Creative Direction, Content Creation, and Styling, with external-first linking for deeper portfolio exploration.
3. A lightweight contact path for phase 1 using `mailto:gurshabedi@gmail.com`, since the custom domain and branded email are deferred to phase 2.
4. A password-protected private invoice page at `/admin/invoices` with pre-filled Gursha business details later, line items, calculations, invoice preview, and PDF download.
5. A low-cost rollout plan split into phase 1 temporary launch on Vercel and phase 2 custom domain and branded email setup.

## Tech Stack

* Frontend: Next.js
* Styling: Tailwind CSS
* Database: None in v1
* Auth: Simple password gate via environment variable for the invoice route
* APIs: PDF generation library for invoice export
* Deployment: Vercel Hobby

## Domain & Email Setup

Phase 1 will not use a custom domain. The site will launch temporarily on a free `vercel.app` URL, and inquiries will route to `gurshabedi@gmail.com` through a `mailto` contact flow.

Phase 2 will add `gurshabedi.com`, point DNS through Cloudflare, and create the public-facing address `gursha@gurshabedi.com` using Cloudflare Email Routing. That branded address will forward to Gursha's existing inbox. This keeps recurring cost low at launch while preserving a clean future migration path to Google Workspace later without changing the public email address or rebuilding the site.

## Invoice Generator Scope

Version 1 includes a private invoice page for Gursha only. It will be password-protected, use Indian rupees, support invoice number, due date, client details, line items, quantity, rate, tax or discount, auto-calculated totals, invoice preview, and PDF download.

Version 1 will not include saved invoice history, editable past invoices inside the app, paid or unpaid tracking, or direct invoice emailing. Gursha will manually keep downloaded invoice PDFs. Final invoice styling and business identity fields will be based on the sample invoice and billing details she sends later.

## Inquiry Management

Inquiries in phase 1 will be intentionally simple. The site will include a Contact section, but not a backend-powered contact form or inquiry dashboard. Instead, users will contact Gursha through `mailto:gurshabedi@gmail.com`.

In phase 2, once the domain is purchased, the public contact path can move to `gursha@gurshabedi.com`, which will forward through Cloudflare Email Routing to Gursha's existing inbox. A real contact form is a should-have item, but it is intentionally deferred to avoid unnecessary backend complexity during the first launch.

## Biggest Risk

The biggest risk is missing or disorganized assets. The quality of the launch depends heavily on curating 8 strong projects across four categories and selecting a homepage image that immediately communicates Gursha's maximalist, kitschy, editorial, quirky, playful, glamorous, camp, and colorful aesthetic. If the assets are weak, inconsistent, or not organized in time, the site may feel unfinished or fail to communicate premium commercial credibility.
