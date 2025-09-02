#!/usr/bin/env python3
"""
Sync publications from BibTeX to resume.json and other formats
This script parses the BibTeX file and updates the resume.json with publications
"""

import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional

def parse_bibtex_entry(entry: str) -> Dict:
    """Parse a single BibTeX entry into a dictionary"""
    result = {}
    
    # Extract entry type and key
    type_match = re.match(r'@(\w+)\{([^,]+),', entry)
    if type_match:
        result['type'] = type_match.group(1)
        result['key'] = type_match.group(2)
    
    # Extract fields
    field_pattern = r'(\w+)\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}'
    for match in re.finditer(field_pattern, entry):
        field_name = match.group(1).lower()
        field_value = match.group(2).strip()
        result[field_name] = field_value
    
    return result

def parse_bibtex_file(filepath: Path) -> List[Dict]:
    """Parse BibTeX file and return list of publication dictionaries"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by @ to get individual entries
    entries = []
    entry_pattern = r'@\w+\{[^@]+\}'
    for match in re.finditer(entry_pattern, content, re.DOTALL):
        entry_text = match.group(0)
        entry_dict = parse_bibtex_entry(entry_text)
        if entry_dict and 'title' in entry_dict:
            entries.append(entry_dict)
    
    return entries

def format_authors(authors_str: str, highlight_name: str = "Wang, Linji") -> str:
    """Format authors string, highlighting specific author"""
    authors = [a.strip() for a in authors_str.split(' and ')]
    formatted = []
    
    for author in authors:
        if highlight_name in author:
            formatted.append(f"**{author}**")
        else:
            formatted.append(author)
    
    return ", ".join(formatted)

def bibtex_to_resume_publication(pub: Dict) -> Dict:
    """Convert BibTeX entry to resume.json publication format"""
    result = {
        "name": pub.get('title', ''),
        "publisher": "",
        "releaseDate": pub.get('year', ''),
        "url": "",
        "summary": ""
    }
    
    # Determine publisher/venue
    if 'journal' in pub:
        result['publisher'] = pub['journal']
    elif 'booktitle' in pub:
        result['publisher'] = pub['booktitle']
    
    # Add URL (prefer PDF, then arXiv, then code)
    if 'pdf' in pub:
        result['url'] = pub['pdf']
    elif 'arxiv' in pub:
        result['url'] = f"https://arxiv.org/abs/{pub['arxiv']}"
    elif 'code' in pub:
        result['url'] = pub['code']
    
    # Format authors and create summary
    if 'author' in pub:
        authors = format_authors(pub['author'])
        result['summary'] = f"{authors}. "
        
    # Add acceptance status if present
    if 'note' in pub and 'Accepted' in pub['note']:
        result['summary'] += f"[{pub['note']}]"
    
    return result

def update_resume_json(bibtex_path: Path, resume_path: Path):
    """Update resume.json with publications from BibTeX"""
    # Parse BibTeX
    publications = parse_bibtex_file(bibtex_path)
    
    # Load existing resume.json
    with open(resume_path, 'r', encoding='utf-8') as f:
        resume = json.load(f)
    
    # Convert publications to resume format
    resume_pubs = []
    for pub in publications:
        resume_pub = bibtex_to_resume_publication(pub)
        if resume_pub['name']:  # Only add if title exists
            resume_pubs.append(resume_pub)
    
    # Sort by year (newest first)
    resume_pubs.sort(key=lambda x: x.get('releaseDate', ''), reverse=True)
    
    # Update resume.json
    resume['publications'] = resume_pubs
    
    # Save updated resume.json
    with open(resume_path, 'w', encoding='utf-8') as f:
        json.dump(resume, f, indent=2, ensure_ascii=False)
    
    return len(resume_pubs)

def generate_cv_publications_section(bibtex_path: Path) -> str:
    """Generate a markdown section for CV publications"""
    publications = parse_bibtex_file(bibtex_path)
    
    # Group by type and year
    conferences = []
    journals = []
    
    for pub in publications:
        if pub.get('type') == 'article':
            journals.append(pub)
        else:
            conferences.append(pub)
    
    # Sort by year (newest first)
    conferences.sort(key=lambda x: x.get('year', ''), reverse=True)
    journals.sort(key=lambda x: x.get('year', ''), reverse=True)
    
    markdown = "## Publications\n\n"
    
    if journals:
        markdown += "### Journal Articles\n\n"
        for i, pub in enumerate(journals, 1):
            authors = format_authors(pub.get('author', ''))
            title = pub.get('title', '')
            journal = pub.get('journal', '')
            year = pub.get('year', '')
            
            markdown += f"{i}. {authors}. \"{title}\". *{journal}*, {year}.\n"
            
            # Add links
            links = []
            if 'pdf' in pub:
                links.append(f"[PDF]({pub['pdf']})")
            if 'arxiv' in pub:
                links.append(f"[arXiv](https://arxiv.org/abs/{pub['arxiv']})")
            if 'code' in pub:
                links.append(f"[Code]({pub['code']})")
            
            if links:
                markdown += f"   {' | '.join(links)}\n"
            markdown += "\n"
    
    if conferences:
        markdown += "### Conference Papers\n\n"
        for i, pub in enumerate(conferences, 1):
            authors = format_authors(pub.get('author', ''))
            title = pub.get('title', '')
            booktitle = pub.get('booktitle', '')
            year = pub.get('year', '')
            note = pub.get('note', '')
            
            markdown += f"{i}. {authors}. \"{title}\". *{booktitle}*, {year}."
            if 'Accepted' in note:
                markdown += f" [{note}]"
            markdown += "\n"
            
            # Add links
            links = []
            if 'pdf' in pub:
                links.append(f"[PDF]({pub['pdf']})")
            if 'arxiv' in pub:
                links.append(f"[arXiv](https://arxiv.org/abs/{pub['arxiv']})")
            if 'code' in pub:
                links.append(f"[Code]({pub['code']})")
            
            if links:
                markdown += f"   {' | '.join(links)}\n"
            markdown += "\n"
    
    return markdown

def update_cv_page(bibtex_path: Path, cv_path: Path):
    """Update CV page with publications from BibTeX"""
    publications = parse_bibtex_file(bibtex_path)
    
    # Read existing CV content
    with open(cv_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Group publications
    conferences = []
    journals = []
    
    for pub in publications:
        if pub.get('type') == 'article':
            journals.append(pub)
        else:
            conferences.append(pub)
    
    # Sort by year (newest first)
    conferences.sort(key=lambda x: x.get('year', ''), reverse=True)
    journals.sort(key=lambda x: x.get('year', ''), reverse=True)
    
    # Build new publications section
    pub_section = "## Publications\n\n"
    
    if journals:
        pub_section += "### Journal Articles\n\n"
        for pub in journals:
            authors = format_authors(pub.get('author', ''))
            title = pub.get('title', '')
            journal = pub.get('journal', '')
            year = pub.get('year', '')
            
            pub_section += f"- {authors}. \"{title}\". *{journal}*, {year}."
            
            # Add links
            links = []
            if 'pdf' in pub:
                links.append(f"[PDF]({pub['pdf']})")
            if 'arxiv' in pub:
                links.append(f"[arXiv](https://arxiv.org/abs/{pub['arxiv']})")
            
            if links:
                pub_section += f" {' | '.join(links)}"
            pub_section += "\n"
        pub_section += "\n"
    
    if conferences:
        pub_section += "### Conference Papers\n\n"
        for pub in conferences:
            authors = format_authors(pub.get('author', ''))
            title = pub.get('title', '')
            booktitle = pub.get('booktitle', '')
            year = pub.get('year', '')
            note = pub.get('note', '')
            
            pub_section += f"- {authors}. \"{title}\". *{booktitle}*, {year}."
            if 'Accepted' in note:
                pub_section += f" **[{note}]**"
            
            # Add links
            links = []
            if 'pdf' in pub:
                links.append(f"[PDF]({pub['pdf']})")
            if 'arxiv' in pub:
                links.append(f"[arXiv](https://arxiv.org/abs/{pub['arxiv']})")
            
            if links:
                pub_section += f" {' | '.join(links)}"
            pub_section += "\n"
        pub_section += "\n"
    
    pub_section += "For more details, see the [Publications](/linjiwang/publications/) page.\n"
    
    # Replace the publications section in CV
    import re
    pattern = r'## Publications\n\n.*?(?=\n## |\Z)'
    new_content = re.sub(pattern, pub_section, content, flags=re.DOTALL)
    
    # Write back
    with open(cv_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return len(conferences) + len(journals)

def main():
    """Main function to sync publications"""
    # Setup paths
    project_root = Path(__file__).parent.parent
    bibtex_path = project_root / "_bibliography" / "papers.bib"
    resume_path = project_root / "assets" / "json" / "resume.json"
    cv_path = project_root / "_pages" / "cv.md"
    
    # Check if files exist
    if not bibtex_path.exists():
        print(f"Error: BibTeX file not found at {bibtex_path}")
        sys.exit(1)
    
    if not resume_path.exists():
        print(f"Error: Resume JSON not found at {resume_path}")
        sys.exit(1)
    
    # Update resume.json
    print("Syncing publications from BibTeX...")
    print("-" * 40)
    
    print("1. Updating resume.json...")
    num_pubs = update_resume_json(bibtex_path, resume_path)
    print(f"   ✓ Added {num_pubs} publications to resume.json")
    
    # Update CV page if it exists
    if cv_path.exists():
        print("2. Updating CV page...")
        num_cv = update_cv_page(bibtex_path, cv_path)
        print(f"   ✓ Updated CV page with {num_cv} publications")
    
    # Generate reference markdown (for manual use)
    print("3. Generating reference markdown...")
    cv_section = generate_cv_publications_section(bibtex_path)
    cv_output_path = project_root / "scripts" / "cv_publications.md"
    with open(cv_output_path, 'w', encoding='utf-8') as f:
        f.write(cv_section)
    print(f"   ✓ Reference saved to scripts/cv_publications.md")
    
    print("-" * 40)
    print("✅ Sync completed successfully!")
    print("\nPublications are now synced across:")
    print("  • resume.json (for JSON Resume format)")
    print("  • _pages/cv.md (CV page)")
    print("  • _bibliography/papers.bib (source of truth)")
    print("\nTo run this sync again: python scripts/sync_publications.py")

if __name__ == "__main__":
    main()