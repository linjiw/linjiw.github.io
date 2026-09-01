# Linji Wang — AI robotics and robot learning portfolio

Personal research website for [Linji (Joey) Wang](https://linjiw.github.io/), a
Computer Science Ph.D. researcher at George Mason University's RobotiXX Lab.
The site focuses on curriculum learning, reinforcement learning, navigation,
locomotion, and embodied AI.

## Site views

- `/` — interactive **linji OS** front door
- `/canvas/` — spatial research map
- `/classic/` — conventional academic portfolio
- `/publications/` — complete robotics publication list
- `/projects/` — research and engineering project pages
- `/cv/` — full web CV plus the one-page résumé PDF

## Sources of truth

- Publications: `_bibliography/papers.bib`
- Web CV: `assets/json/resume.json`
- Résumé PDF source: `resume.tex`
- Classic biography: `_pages/about.md`
- Interactive homepage: `_pages/os.html`

Quantitative research claims must be traceable to a paper or official result.
See `CLAUDE.md` for the content and authorship rules.

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000`. Before publishing, run:

```bash
JEKYLL_ENV=production bundle exec jekyll build
pdflatex -output-directory=assets/pdf resume.tex
pdflatex -output-directory=assets/pdf resume.tex
```

GitHub Actions deploys the site and rebuilds `assets/pdf/resume.pdf` from
`resume.tex` on pushes to `main`.

## Theme

Built with [Jekyll](https://jekyllrb.com/) and adapted from
[al-folio](https://github.com/alshedivat/al-folio).
