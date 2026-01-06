# Website Cleanup Plan

Goal: Make the site consistent and clear for a Ph.D. researcher profile, align education timeline, and prepare a clean CV/resume data source.

## Steps
- [x] 1) Normalize base URL usage and social links.
- [x] 2) Align education timeline across site content, CV data, and resumes.
- [x] 3) Clean CV/resume sources (JSON + LaTeX + generator) and keep publications consistent.
- [x] 4) Update news timeline to match the confirmed education path.
- [x] 5) Final sweep for remaining inconsistencies and summarize changes.

## Progress Log
- Plan created.
- Updated social links and normalized base URL references.
- Aligned education timeline across about/CV/resume/generator data.
- Cleaned CV/resume data and publication listings for consistency.
- Updated news timeline entries to reflect the confirmed education path.
- Final consistency sweep complete.
- Refined page metadata and marked Ph.D. as ongoing across CV/resume sources.
- Installed dependencies with Homebrew Ruby and ran Jekyll build; ImageMagick missing and Sass deprecation warnings reported.
- Built resume PDF; LaTeX warnings about font shapes and footskip remain.
- Removed repositories page from the site and refreshed resume content/PDF for robotics and AI focus.
- Installed ImageMagick and re-ran Jekyll build; convert errors resolved (only upstream Sass deprecation warnings remain).
- Cleaned site output and rebuilt; repositories page is no longer generated in _site.
- Added a repositories redirect page to force the live URL to redirect while caches propagate.
