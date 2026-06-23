# PhishDesk — Phishing Awareness Simulator

A hands-on phishing awareness trainer. Realistic scam and legitimate emails land in a
simulated inbox; you investigate each one, then decide whether to report it as phishing
or mark it safe — with an immediate, detailed breakdown either way.

Built with **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion**.

> Everything here is self-contained and runs entirely in the browser. No real emails are
> ever sent, no real credentials are ever collected, and every organization/domain in the
> scenario bank is fictional. This is a training tool, not phishing infrastructure.

---

## Features

- **17 built-in scenarios** spanning credential harvesting, invoice fraud, CEO/executive
  fraud, prize scams, tech-support scams, shipping scams, HR/payroll phishing, and account
  suspension scares — several built as matched phishing/legitimate pairs from the same
  fictional company so the contrast is the lesson.
- **Inspect Mode** — toggle on a forensic annotation view that numbers and highlights the
  exact red flags (or trust signals) in the sender, subject, greeting, body, links, and
  attachments. Links can be "hovered" to reveal what they actually point to.
- **Immediate feedback** after every decision: correct/incorrect, full red-flag or
  trust-signal breakdown, and whether you used Inspect Mode.
- **Session scoring** — accuracy, streak, best streak — persisted across visits via
  `localStorage`.
- **Results summary** with a breakdown of accuracy by scam category, so you can see
  exactly which patterns still trip you up.
- **Red Flag Glossary** — an evergreen reference of the patterns behind almost every
  phishing email, independent of any specific scenario.
- **Scenario Admin** — add, edit, or delete your own training scenarios entirely from the
  browser. Export your custom scenario pack as JSON and import packs shared by other
  trainers. No backend required.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploying

This is a fully static single-page app — no backend, no environment variables, no API
keys. Any static host works:

- **GitHub Pages**: push the contents of `dist/` to a `gh-pages` branch (or use the
  `peaceiris/actions-gh-pages` GitHub Action), or use `npm run build` and serve `dist/`
  directly via Pages' "deploy from a folder" option. `vite.config.ts` already uses a
  relative `base: './'`, so it works from any subpath.
- **Vercel / Netlify**: import the repo, build command `npm run build`, output directory
  `dist`. Zero config needed.
- **Any static file host**: just upload the contents of `dist/` after building.

## Project structure

```
src/
  types.ts                 Core TypeScript types (scenarios, flags, attempts)
  data/
    scenarios.ts            The 17 built-in email scenarios
    glossary.ts              Evergreen red-flag glossary content
  context/
    SimulatorContext.tsx     Session state, scoring, custom scenario CRUD (localStorage)
  hooks/
    useLocalStorage.ts
  components/
    Landing/LandingScreen.tsx
    Inbox/                  InboxList, EmailDetail, Inspector badges/findings, feedback
    Results/ResultsSummary.tsx
    Reference/GlossaryScreen.tsx
    Admin/AdminPanel.tsx     Add/edit/delete/export/import custom scenarios
    Layout/TopNav.tsx
```

## Extending the scenario bank

Use **Scenario Admin** in the app to add new cases visually — no code required. Each
scenario can include:

- Sender name/email (with a "spoofed display name" pattern if relevant)
- Subject, preview text, greeting, body paragraphs
- One or more links, each with separate "displayed" and "actual" URLs
- Attachments (flagged suspicious or not)
- A list of annotated red flags (for phishing) or trust signals (for legitimate emails),
  each tagged to a part of the email (sender, subject, greeting, body, link, attachment,
  or urgency) so Inspect Mode highlights the right spot

Export your custom pack from Scenario Admin to share a `.json` file with co-trainers; they
can import it the same way.

## Notes on scope

By design, this simulator does **not** send real emails or capture real credentials — it's
a self-contained quiz/training environment, not a phishing campaign tool (like Gophish).
That keeps it safe to build, share, and deploy publicly while still teaching the exact
pattern-recognition skills a real campaign would test for.
