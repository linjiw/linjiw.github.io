# Repository Guidelines

## Project Structure & Module Organization
Content for the site lives in collections under `_pages`, `_posts`, `_projects`, and `_news`; shared data YAML sits in `_data`, while `_includes` and `_layouts` provide Liquid templates. Static assets belong in `assets/` (images, CSS, JS) and `_scripts/` holds browser-side setup helpers. The `_site/` directory is a build artifact—never edit it directly.

## Build, Test, and Development Commands
`bundle install` installs Ruby gems defined in `Gemfile` for Jekyll and plugins. `bundle exec jekyll serve --livereload` runs the local preview at `http://localhost:4000`, rebuilding on changes. Use `JEKYLL_ENV=production bundle exec jekyll build` for a production build that mirrors GitHub Pages. The resume PDF at `assets/pdf/resume.pdf` is rebuilt automatically from `resume.tex` by `.github/workflows/build-resume.yml` on push to main; keep tailored/job-specific resumes outside this repo.

## Coding Style & Naming Conventions
Follow two-space indentation for YAML front matter, Liquid blocks, and SCSS in `_sass/`. Keep Markdown titles sentence case, and name posts as `YYYY-MM-DD-title.md` under `_posts/`. For data files, reuse keys already defined in `_config.yml` and `_data/`.

## Testing Guidelines
Before committing, run `bundle exec jekyll build` to catch Liquid, Markdown, or data errors; the command should complete without warnings. When editing YAML or JSON data, validate syntax with `ruby -e "require 'yaml'; YAML.load_file('file.yml')"` or `python -m json.tool < file.json`. For large content edits, spot-check the generated `_site/` output via the local server to verify navigation, images, and publication listings.

## Git Hygiene & Local Artifacts
Keep this repo focused on publishable site content. Add `.gitignore` rules for generated artifacts (Jekyll caches, Bundler vendor output, LaTeX aux/log/out) and machine files as soon as they appear. Treat job-search materials (tailored resumes, application notes, candidate profiles) as private by default—store them outside this repo or explicitly confirm they should be tracked here. Run `git status -s` before and after changes to ensure only intended files are staged.

## Commit & Pull Request Guidelines
Use concise, descriptive commit messages in imperative mood (e.g., `Update resume for Amazon FAR Applied Scientist position`). Group related content updates into a single commit to keep history readable. Pull requests should summarize the change scope, note impacted sections (e.g., "updates `_pages/about.md`"), and link tracking issues when relevant. Include screenshots for visual tweaks and mention manual verification steps (local serve/build) so reviewers can rely on your checks.

## Content Rules
See `CLAUDE.md` for the content architecture (one source of truth per artifact) and the accuracy rules: every quantitative claim must be traceable to a published paper. When updating `_config.yml`, audit dependent data files to ensure navigation links and profile metadata stay consistent.
