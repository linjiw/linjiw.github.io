# Publications Management

## Managing Your Publications

Since automated Google Scholar syncing is unreliable due to anti-bot measures, publications should be managed manually in `papers.bib`.

## Adding Publications

1. **Manual Entry**: Add BibTeX entries directly to `papers.bib`
2. **Google Scholar Export**: 
   - Visit your [Google Scholar profile](https://scholar.google.com/citations?user=VURUgFMAAAAJ)
   - Click on a publication
   - Click "Export" → "BibTeX"
   - Copy and paste into `papers.bib`

## BibTeX Entry Template

```bibtex
@article{wang2024example,
  title={Your Paper Title},
  author={Wang, Linji and Coauthor, Name},
  year={2024},
  journal={Journal Name},
  volume={1},
  pages={1--10},
  publisher={Publisher},
  url={https://link-to-paper},
  abstract={Paper abstract here...},
  selected={true},  # Set to true for featured papers
  bibtex_show={true}
}
```

## Special Fields

- `selected={true}`: Highlights the paper as a selected/featured publication
- `bibtex_show={true}`: Shows the BibTeX button on the website
- `pdf={link}`: Direct link to PDF
- `code={link}`: Link to code repository
- `poster={link}`: Link to poster
- `slides={link}`: Link to presentation slides

## Alternative APIs for Future Integration

If you want to set up automated syncing in the future, consider these alternatives:

1. **Semantic Scholar API**: Free, reliable, no rate limits
   - API: https://api.semanticscholar.org/
   - Documentation: https://www.semanticscholar.org/product/api

2. **OpenAlex API**: Free, comprehensive coverage
   - API: https://api.openalex.org/
   - Documentation: https://docs.openalex.org/

3. **CORE API**: For open access papers
   - API: https://core.ac.uk/services/api
   - Documentation: https://core.ac.uk/documentation/api

These APIs are more reliable than scraping Google Scholar and won't get blocked.