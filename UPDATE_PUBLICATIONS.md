# 📚 How to Update Your Publications

This guide makes it super easy to update your publications from Google Scholar!

## Quick Steps (< 2 minutes)

### 1️⃣ Export from Google Scholar

1. Go to your [Google Scholar Profile](https://scholar.google.com/citations?user=VURUgFMAAAAJ)
2. Click on any paper title
3. Click the **quotation mark (")** icon
4. Select **BibTeX** at the bottom
5. Copy the entire BibTeX entry

### 2️⃣ Save the Export

Create a file `scripts/scholar_export.bib` and paste the BibTeX entry:

```bash
# Navigate to scripts folder
cd scripts

# Create the file and paste your BibTeX
cat > scholar_export.bib
# Paste your BibTeX here, then press Ctrl+D
```

Or simply create the file with your text editor.

### 3️⃣ Process the Export

Run the processing script:

```bash
cd scripts
python process_scholar_export.py
```

The script will:
- ✅ Clean up the BibTeX entry
- ✅ Add website-specific fields
- ✅ Append to `_bibliography/papers.bib`
- ✅ Clean up the temporary file

### 4️⃣ Customize (Optional)

Edit `_bibliography/papers.bib` to:

- Set `selected={true}` for featured papers
- Add `pdf={URL}` for paper PDFs
- Add `code={URL}` for GitHub repositories  
- Add `slides={URL}` for presentation slides
- Add `poster={URL}` for poster PDFs
- Add `abstract={...}` if missing

### 5️⃣ Deploy

```bash
git add -A
git commit -m "Update publications"
git push
```

## Bulk Export (Multiple Papers)

You can export multiple papers at once:

1. Export each paper's BibTeX from Google Scholar
2. Paste them all into `scripts/scholar_export.bib`
3. Run the script - it will process all entries

## Example BibTeX Entry

After processing, your entries will look like this:

```bibtex
@article{wang2024example,
  title={Your Awesome Research Paper},
  author={Wang, Linji and Coauthor, Name},
  journal={Conference on Cool Stuff},
  year={2024},
  publisher={IEEE},
  bibtex_show={true},
  selected={false},  # Change to true for featured papers
  preview={},        # Add preview image if desired
  pdf={},           # Add PDF link
  code={},          # Add GitHub link
  slides={}         # Add slides link
}
```

## Tips

- 🌟 Mark your best papers with `selected={true}`
- 📄 Host PDFs on GitHub or your university server
- 💻 Link to your code repositories
- 🎯 The script automatically cleans up Google Scholar's messy BibTeX
- 🔄 You can run this process anytime to add new papers

## Troubleshooting

If the script fails:
1. Make sure you're in the `scripts` folder
2. Check that Python 3 is installed: `python3 --version`
3. Ensure the BibTeX is valid (has matching braces)

## Manual Alternative

If you prefer, you can directly edit `_bibliography/papers.bib` and add entries manually using the template above.

---

**Need help?** The script provides helpful error messages and instructions!