# Website & Resume Overhaul Plan

Goal: make linjiw.github.io and the resume as strong as possible for job hunting in
AI / robotics / research / teaching roles. Based on a full audit (July 2026) of the
repo, the live site, and all resume/CV data sources, verified against the published
papers.

Guiding principles:

- **Every number traceable to a paper.** Claims on the site must match the published
  abstracts (GACL: +6.8%/+6.1% success; RTW: +2.35% navigation, +122.6% off-road
  mobility, 3× faster training, 5/5 vs 2/5 physical trials; DDP: 1st place,
  Simulation Phase, 2025 BARN Challenge).
- **One source of truth per artifact.** `papers.bib` for publications,
  `resume.json` for the site CV, `resume.tex` for the PDF. No parallel copies.
- **Private material never enters this repo.** Job-search artifacts, tailored
  resumes, and any employer-internal notes stay outside (already gitignored).
- **Show robots.** A robotics portfolio should lead with robots in motion, not
  paper diagrams.

## Phase 0 — Content safety & accuracy (do first)

- [ ] Remove `assets/amazon_intern/` from the repo and purge it from git history
      (`git filter-repo`); these are personal internship notes that should never
      have been published. Purge deleted `FAR-resume-*` blobs in the same pass.
- [ ] Delete `assets/pdf/Linji_Wang_Resume.pdf` (outdated tailored resume with
      inconsistent dates) and `assets/pdf/example_pdf.pdf` (theme demo). Serve
      exactly one resume: `assets/pdf/resume.pdf`, built from `resume.tex`.
- [ ] Fix `title: ""` → `title: blank` in `_config.yml` (al-folio sentinel), so the
      site name renders in the homepage H1 and every `<title>` tag.
- [ ] Remove the demo `inspirehep_id` from `_data/socials.yml`.
- [ ] Replace the unattributed "24.58% / 50%" metrics everywhere they appear
      (`_pages/about.md`, `resume.tex`, `assets/json/resume.json`, `_data/cv.yml`,
      `_projects/1_project.md`) with the published, citable numbers above.
- [ ] Correct "robotic manipulation" → "robot navigation and locomotion" in
      `resume.json` / `cv.yml` (manipulation and humanoids are labeled as ongoing
      work only).
- [ ] Rewrite all three `_projects/*.md` pages strictly from the papers: remove
      placeholder hardware/results that don't match the publications, fix or remove
      the two dead GitHub links, link the real II-NVM repo
      (github.com/chengwei0427/II-NVM), add DDP's BARN Challenge result.
- [ ] Fix news timeline: Amazon internship item redated to May 2025 and reworded;
      IROS acceptance item redated to June 2025; Hangzhou line changed to past
      tense; rename `_news/ucsb-graduation.md` → `cincinnati-graduation.md`;
      resolve or remove the unanswered ICRA 2024 submission item.
- [ ] Remove the phone number from `assets/json/resume.json` (keep it in the PDF
      resume only).
- [ ] Standardize the Google Scholar ID across `_data/socials.yml`, scripts, and
      docs (confirm correct ID first).

## Phase 1 — Resume & CV consolidation

- [ ] Add **Teaching Experience** (TA at GMU Fall 2023, CMU Fall 2022, U. Cincinnati
      Fall 2020) to `resume.json` and `resume.tex` — it currently lives only in the
      never-rendered `_data/cv.yml`.
- [ ] Add **Awards** (1st Place, Simulation Phase, 2025 BARN Challenge) and a
      **Professional Service** section (reviewing, mentoring) to both.
- [ ] Reorder `resume.json` so publications render right after education on `/cv/`;
      list first-author papers first; drop or refresh the 2023 mortality-prediction
      side project.
- [ ] Rewrite research bullets to state first-authorship explicitly and pair every
      contribution with its published result and venue.
- [ ] Prune skills to what is interview-defensible; add a "Robot Platforms" line
      (wheeled UGV, quadruped, off-road vehicle).
- [ ] Add the Google Scholar link to the `resume.tex` header.
- [ ] Delete dead `_data/cv.yml` once its unique content is migrated.
- [ ] Fix `.github/workflows/build-resume.yml`: add `permissions: contents: write`,
      bump to `actions/checkout@v4`, remove the `|| echo` failure masking, restrict
      to the main branch.
- [ ] Fix or retire `scripts/sync_publications.py` (currently a silent no-op on
      cv.md; would inject raw markdown and internal note text if re-run).

## Phase 2 — Publications presentation

- [ ] `_bibliography/papers.bib`: add `abbr={IROS}` / `abbr={RA-L}` badges,
      `award=` on DDP (BARN Challenge), `abstract=` for all entries, `doi=` for
      II-NVM; delete the `code=`/`slides=` fields that point at PDFs; remove
      internal submission numbers from `note=`.
- [ ] Raise `max_author_limit` (or unset) so "Wang, Linji" is always visible on the
      II-NVM entry.
- [ ] Replace demo `_data/venues.yml` and `_data/coauthors.yml` with real venues
      (IROS, RA-L) and coauthors (Peter Stone, Xuesu Xiao, Nick Hawes) so names are
      linked automatically.
- [ ] Add fresh `_news/` items: presented at IROS 2025 in Hangzhou (with photo),
      BARN Challenge result, RA-L publication, current humanoid research.

## Phase 3 — Visual identity & media

- [ ] Accent color: one hue, two lightness steps (e.g. engineering blue `#0057b8`
      light / `#4d9fff` dark) at `_sass/_themes.scss` lines 13–14 and 85–86,
      replacing the default magenta/cyan pair.
- [ ] Headshot: export a well-lit ~800px image derived from the high-res photo;
      delete the 14 MB `prof_pic_color.png` original from the repo (current
      `prof_pic.jpg` is a 150×150 source upscaled to ~280px — blurry everywhere).
- [ ] Replace the four publication preview PNGs with short square GIF/webm clips of
      the real robots (al-folio supports GIF previews) or square-cropped,
      compressed (<300 KB) key figures; remove the baked-in figure caption from the
      II-NVM preview; delete the two unused demo GIFs.
- [ ] Homepage hierarchy: move selected papers above latest posts in
      `_layouts/about.liquid` (or disable `latest_posts`); cut the bio to ~180
      words with minimal bold; separate first-author work from collaborations.
- [ ] Nav order: publications(1), projects(2), cv(3), blog(4).
- [ ] Project pages as mini paper-sites: embedded experiment video, a "My
      contribution" paragraph on non-first-author papers, real code links, honest
      results.
- [ ] Footer: remove the "Photos from Unsplash" theme leftover; enable
      `last_updated: true`.

## Phase 4 — SEO, hygiene & discoverability

- [ ] `_config.yml`: `serve_og_meta: true`, `serve_schema_org: true`, set
      `og_image` to a purpose-made 1200×630 card; add Google Search Console
      verification; update `keywords` (drop "GANs", add curriculum learning /
      sim-to-real).
- [ ] Delete al-folio demo assets (~21 MB): book cover, demo mp3/mp4,
      `relativity.html`, `plotly/demo.html`, demo bibliography, `table_data.json`.
- [ ] Delete theme leftover docs (`CONTRIBUTING.md`, `CUSTOMIZE.md`, `FAQ.md`,
      `INSTALL.md`, `FOLDER_STRUCTURE.md`, `.trigger_rebuild`) and add working
      files (`CLAUDE.md`, `AGENTS.md`, `resume.tex`, `build_resume.sh`, `scripts/`,
      this file) to the Jekyll `exclude:` list so they stop being served.
- [ ] Fix `/blog/` demo tags (`display_tags` / `display_categories`) to the tags
      actually used; clear the demo `disqus_shortname`.
- [ ] Delete `_pages/repositories.md` stub and unused `_data/repositories.yml`.
- [ ] Remove the unused Python/Jupyter install steps from
      `.github/workflows/deploy.yml`; delete
      `sync-publications.yml.disabled` and the unused Scholar-scraping scripts.

## Verification

After each phase: `bundle exec jekyll build` clean, spot-check the live pages
(`/`, `/publications/`, `/cv/`, `/projects/`), confirm the resume PDF matches
`resume.tex`, and confirm no private artifact is reachable on the live site.
