#!/usr/bin/env python3
"""
Advanced Google Scholar sync using scholarly library
Install: pip install scholarly
"""

import sys
import json
from datetime import datetime

try:
    from scholarly import scholarly
except ImportError:
    print("Please install scholarly: pip install scholarly")
    sys.exit(1)

# Your Google Scholar ID
SCHOLAR_ID = "VURUgFMAAAAJ"

def fetch_publications_with_scholarly():
    """
    Fetch publications using scholarly library (more reliable)
    """
    try:
        # Search for author by ID
        author = scholarly.search_author_id(SCHOLAR_ID)
        author = scholarly.fill(author, sections=['publications'])
        
        publications = []
        for pub in author['publications']:
            # Fill publication details
            pub_filled = scholarly.fill(pub)
            
            pub_data = {
                'title': pub_filled.get('bib', {}).get('title', ''),
                'authors': ', '.join(pub_filled.get('bib', {}).get('author', [])),
                'year': pub_filled.get('bib', {}).get('pub_year', ''),
                'venue': pub_filled.get('bib', {}).get('venue', ''),
                'citations': pub_filled.get('num_citations', 0),
                'abstract': pub_filled.get('bib', {}).get('abstract', ''),
                'url': pub_filled.get('pub_url', ''),
            }
            publications.append(pub_data)
        
        return publications
    
    except Exception as e:
        print(f"Error with scholarly: {e}")
        return []

def generate_bibtex(publications):
    """
    Generate proper BibTeX entries
    """
    bibtex = "---\n---\n\n"
    bibtex += f"% Publications from Google Scholar\n"
    bibtex += f"% Profile: https://scholar.google.com/citations?user={SCHOLAR_ID}\n"
    bibtex += f"% Last updated: {datetime.now().strftime('%Y-%m-%d')}\n\n"
    
    for i, pub in enumerate(publications):
        # Generate citation key
        first_author = pub['authors'].split(',')[0].split()[-1].lower() if pub['authors'] else 'wang'
        year = pub.get('year', '2024')
        title_word = ''.join(pub['title'].split()[:2]).lower()[:10]
        key = f"{first_author}{year}{title_word}"
        
        # Determine publication type
        venue = pub.get('venue', '').lower()
        if any(x in venue for x in ['conference', 'workshop', 'proceedings']):
            pub_type = 'inproceedings'
        elif any(x in venue for x in ['journal', 'transactions', 'letters']):
            pub_type = 'article'
        elif 'arxiv' in venue:
            pub_type = 'article'
        elif 'thesis' in venue:
            pub_type = 'phdthesis'
        else:
            pub_type = 'misc'
        
        # Build entry
        bibtex += f"@{pub_type}{{{key},\n"
        bibtex += f"  title={{{pub['title']}}},\n"
        bibtex += f"  author={{{pub['authors'] or 'Wang, Linji'}}},\n"
        bibtex += f"  year={{{year}}},\n"
        
        if venue:
            if pub_type == 'article':
                bibtex += f"  journal={{{venue}}},\n"
            elif pub_type == 'inproceedings':
                bibtex += f"  booktitle={{{venue}}},\n"
        
        if pub.get('abstract'):
            # Truncate abstract if too long
            abstract = pub['abstract'][:500] + '...' if len(pub['abstract']) > 500 else pub['abstract']
            bibtex += f"  abstract={{{abstract}}},\n"
        
        if pub.get('url'):
            bibtex += f"  url={{{pub['url']}}},\n"
        
        # Mark as selected if highly cited
        if pub.get('citations', 0) > 10:
            bibtex += f"  selected={{true}},\n"
        
        bibtex += f"  google_scholar_id={{{SCHOLAR_ID}}},\n"
        bibtex += f"  citations={{{pub.get('citations', 0)}}},\n"
        bibtex += f"  bibtex_show={{true}}\n"
        bibtex += "}\n\n"
    
    return bibtex

def main():
    print("Fetching publications from Google Scholar...")
    publications = fetch_publications_with_scholarly()
    
    if publications:
        print(f"Found {len(publications)} publications:")
        for pub in publications:
            print(f"  - {pub['title']} ({pub.get('year', 'N/A')}) - {pub.get('citations', 0)} citations")
        
        # Generate BibTeX
        bibtex = generate_bibtex(publications)
        
        # Save to file
        with open('../_bibliography/papers.bib', 'w') as f:
            f.write(bibtex)
        
        print(f"\nSuccessfully updated _bibliography/papers.bib")
    else:
        print("No publications found")

if __name__ == "__main__":
    main()