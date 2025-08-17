#!/usr/bin/env python3
"""
Process Google Scholar BibTeX exports and enhance them for the website.
This script makes it easy to add publications from Google Scholar.

Usage:
1. Export BibTeX from Google Scholar
2. Save it as 'scholar_export.bib' in the scripts folder
3. Run: python process_scholar_export.py
"""

import re
import sys
from pathlib import Path

def clean_bibtex_entry(entry):
    """Clean and enhance a BibTeX entry from Google Scholar"""
    
    # Extract the entry type and key
    match = re.match(r'@(\w+)\{([^,]+),', entry)
    if not match:
        return entry
    
    entry_type = match.group(1)
    entry_key = match.group(2)
    
    # Clean up the key (remove special characters)
    clean_key = re.sub(r'[^\w]', '', entry_key)
    
    # Replace the key in the entry
    entry = re.sub(r'@(\w+)\{[^,]+,', f'@{entry_type}{{{clean_key},', entry)
    
    # Add useful fields if not present
    enhancements = []
    
    # Add bibtex_show field if not present
    if 'bibtex_show' not in entry:
        enhancements.append('  bibtex_show={true}')
    
    # Add selected field for papers with many citations (you can manually set this)
    if 'selected' not in entry:
        enhancements.append('  selected={false}')
    
    # Add preview field placeholder
    if 'preview' not in entry:
        enhancements.append('  preview={}')
    
    # Add pdf/code/slides placeholders
    if 'pdf' not in entry:
        enhancements.append('  pdf={}')
    if 'code' not in entry:
        enhancements.append('  code={}')
    if 'slides' not in entry:
        enhancements.append('  slides={}')
    
    # Insert enhancements before the closing brace
    if enhancements:
        enhancement_str = ',\n'.join(enhancements)
        # Remove the last closing brace and add enhancements
        entry = entry.rstrip()
        if entry.endswith('}'):
            entry = entry[:-1].rstrip()
            if entry.endswith(','):
                entry = entry[:-1]
            entry = entry + ',\n' + enhancement_str + '\n}'
    
    return entry

def process_scholar_export(input_file='scholar_export.bib', append_to='../_bibliography/papers.bib'):
    """Process Google Scholar export and append to papers.bib"""
    
    input_path = Path(input_file)
    output_path = Path(append_to)
    
    if not input_path.exists():
        print(f"❌ File '{input_file}' not found!")
        print("\nInstructions:")
        print("1. Go to your Google Scholar profile")
        print("2. Click on a paper title")
        print("3. Click the quotation mark (') icon")
        print("4. Select 'BibTeX' at the bottom")
        print("5. Copy the BibTeX entry")
        print("6. Save it to 'scripts/scholar_export.bib'")
        print("7. Run this script again")
        return False
    
    # Read the export
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into individual entries
    entries = re.split(r'(?=@\w+\{)', content)
    entries = [e.strip() for e in entries if e.strip()]
    
    print(f"📚 Found {len(entries)} publication(s) to process")
    
    # Process each entry
    processed_entries = []
    for i, entry in enumerate(entries, 1):
        processed = clean_bibtex_entry(entry)
        processed_entries.append(processed)
        
        # Extract title for display
        title_match = re.search(r'title\s*=\s*\{([^}]+)\}', entry)
        title = title_match.group(1) if title_match else f"Entry {i}"
        print(f"  ✓ Processed: {title[:60]}...")
    
    # Create or update papers.bib
    if output_path.exists():
        print(f"\n📝 Appending to existing {output_path}")
        with open(output_path, 'r', encoding='utf-8') as f:
            existing_content = f.read()
    else:
        print(f"\n📝 Creating new {output_path}")
        existing_content = ""
    
    # Add header if file is empty
    if not existing_content.strip():
        header = """---
---

% Publications from Google Scholar
% Manually exported and processed

"""
        existing_content = header
    
    # Append new entries
    new_content = existing_content.rstrip() + "\n\n" + "\n\n".join(processed_entries) + "\n"
    
    # Write back
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n✅ Successfully added {len(processed_entries)} publication(s) to {output_path}")
    
    # Clean up the export file
    input_path.unlink()
    print(f"🧹 Cleaned up {input_file}")
    
    print("\n💡 Next steps:")
    print("1. Review the entries in _bibliography/papers.bib")
    print("2. Set 'selected={true}' for featured papers")
    print("3. Add PDF links, code repositories, or slides as needed")
    print("4. Commit and push your changes")
    
    return True

def main():
    """Main function"""
    # Check if a custom file is provided
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        input_file = 'scholar_export.bib'
    
    success = process_scholar_export(input_file)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()