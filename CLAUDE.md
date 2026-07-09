# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

Personal academic website for Linji Wang (robotics Ph.D. student, RobotiXX Lab,
George Mason University), built with Jekyll using the al-folio theme.

**Website URL**: https://linjiw.github.io/
**Repository**: https://github.com/linjiw/linjiw.github.io

## Quick Commands

```bash
bundle install               # install dependencies
bundle exec jekyll serve     # local server
bundle exec jekyll build     # production build
```

Deployment is automatic via GitHub Actions on push to `main`
(`.github/workflows/deploy.yml`). The resume PDF is rebuilt automatically from
`resume.tex` by `.github/workflows/build-resume.yml`.

## Content architecture — one source of truth per artifact

**Three "worlds", one site.** The front door (`/`) is the interactive **linji
OS** page (`_pages/os.html`); the conventional al-folio academic site lives at
`/classic/` (`_pages/about.md`); the infinite research map is `/canvas/`. A
persistent bottom-center pill (`_includes/world_nav.liquid`) switches between
them in order **01 os · 02 canvas · 03 classic**. Old `/os/` links redirect to
`/` (`_pages/os_redirect.md`). The al-folio navbar (brand + About link) points
at `/classic/`, not `/`.

| Artifact | Source of truth | Renders as |
|---|---|---|
| Front door (OS) | `_pages/os.html` | / (layout: none; has its own SEO/OG/JSON-LD) |
| Publications | `_bibliography/papers.bib` | /publications/, classic selected papers |
| Site CV | `assets/json/resume.json` | /cv/ (via `_layouts/cv.liquid`) |
| PDF resume | `resume.tex` | `assets/pdf/resume.pdf` (built by CI) |
| Classic bio | `_pages/about.md` | /classic/ |
| News | `_news/*.md` | classic announcements |
| Projects | `_projects/*.md` | /projects/ |

There is intentionally **no** `_data/cv.yml` (removed — it was dead code) and
**no** publication-sync script. When publications change, update `papers.bib`,
`resume.json`, and `resume.tex` by hand — all three are small.

Note: on /cv/, the `volunteer` key of resume.json renders under the heading
"Teaching" and `work` renders as "Experience" (mapped in `_layouts/cv.liquid`).

## Content rules (important)

- **Every quantitative claim must come from a published paper's abstract or a
  verifiable source.** Current canonical numbers: GACL +6.8%/+6.1% success;
  RTW +2.35% navigation, +122.62% off-road mobility, 3× faster training, 5/5 vs
  2/5 physical trials; DDP: 1st place, simulation phase, 2025 BARN Challenge.
- Wang's published research is **navigation and locomotion** (wheeled UGV,
  quadruped, off-road). Manipulation/humanoids only as clearly-labeled ongoing work.
- First-authorship matters: GACL and RTW are first-author; DDP (3rd author) and
  II-NVM (5th author) are collaborations and described as such.
- **Private material never enters this repo** (it is public and served verbatim):
  no tailored resumes, no employer-internal notes, no job-search artifacts.
  See `.gitignore` for the private paths.
- Google Scholar ID is `VURUgFMAAAAJ` (in `_data/socials.yml`).

## Publications (papers.bib)

Four entries, each with `abbr` (IROS/RA-L badge), `arxiv`, `pdf`, `abstract`,
`preview` image; DDP carries the BARN Challenge `award`/`award_name`; II-NVM has
`doi`, `html` (IEEE Xplore) and the real `code` repo. Do not add `code=`/`slides=`
fields pointing at PDFs, and do not put submission numbers in `note=`.

## Key config facts

- `title: blank` in `_config.yml` is the al-folio sentinel meaning "use the full
  name" — do NOT change it to an empty string (that breaks every `<title>`).
- `max_author_limit` is intentionally blank so "Wang, Linji" is always visible.
- Working files (CLAUDE.md, AGENTS.md, PLAN.md, resume.tex) are in the Jekyll
  `exclude:` list so they are not served on the live site.

## Overhaul plan

`PLAN.md` tracks the phased website/resume overhaul (content accuracy → resume
consolidation → publications presentation → visual identity → SEO). Check items
off as they are completed.
