#!/usr/bin/env python3
"""
Sync publications from Google Scholar to BibTeX
Author: Linji Wang
"""

import requests
from bs4 import BeautifulSoup
import re
import sys
from datetime import datetime

# Your Google Scholar ID
SCHOLAR_ID = "VURUgFMAAAAJ"

def fetch_scholar_publications(scholar_id):
    """
    Fetch publications from Google Scholar profile
    Note: This is a simplified version. For production, use scholarly library
    """
    url = f"https://scholar.google.com/citations?user={scholar_id}&hl=en"
    
    try:
        # Note: Google Scholar may require headers to avoid blocking
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        publications = []
        
        # Find all publication entries
        for article in soup.find_all('tr', class_='gsc_a_tr'):
            pub = {}
            
            # Get title and link
            title_elem = article.find('a', class_='gsc_a_at')
            if title_elem:
                pub['title'] = title_elem.text
                pub['link'] = 'https://scholar.google.com' + title_elem.get('href', '')
            
            # Get authors and venue
            details = article.find_all('div', class_='gs_gray')
            if len(details) >= 2:
                pub['authors'] = details[0].text
                pub['venue'] = details[1].text
            
            # Get year
            year_elem = article.find('span', class_='gsc_a_h')
            if year_elem:
                pub['year'] = year_elem.text
            
            # Get citations
            cite_elem = article.find('a', class_='gsc_a_ac')
            if cite_elem:
                pub['citations'] = cite_elem.text or '0'
            
            if pub.get('title'):
                publications.append(pub)
        
        return publications
    
    except Exception as e:
        print(f"Error fetching publications: {e}")
        return []

def generate_bibtex_entry(pub, index):
    """
    Generate BibTeX entry from publication data
    """
    # Create citation key
    first_author = pub.get('authors', '').split(',')[0].split()[-1] if pub.get('authors') else 'Unknown'
    year = pub.get('year', '2024')
    title_words = pub.get('title', '').split()[:2]
    key = f"{first_author.lower()}{year}{''.join(title_words).lower()[:10]}"
    
    # Determine entry type based on venue
    venue = pub.get('venue', '').lower()
    if 'conference' in venue or 'workshop' in venue or 'symposium' in venue:
        entry_type = 'inproceedings'
    elif 'journal' in venue or 'letters' in venue or 'transactions' in venue:
        entry_type = 'article'
    elif 'arxiv' in venue:
        entry_type = 'article'
    elif 'thesis' in venue:
        entry_type = 'phdthesis'
    else:
        entry_type = 'misc'
    
    # Build BibTeX entry
    entry = f"@{entry_type}{{{key},\n"
    entry += f"  title={{{pub.get('title', 'Unknown Title')}}},\n"
    entry += f"  author={{{pub.get('authors', 'Wang, Linji')}}},\n"
    entry += f"  year={{{year}}},\n"
    
    if entry_type == 'article':
        entry += f"  journal={{{pub.get('venue', 'Unknown Venue')}}},\n"
    elif entry_type == 'inproceedings':
        entry += f"  booktitle={{{pub.get('venue', 'Unknown Conference')}}},\n"
    
    # Add metadata
    if int(pub.get('citations', '0')) > 10:
        entry += f"  selected={{true}},\n"
    
    entry += f"  google_scholar_id={{{SCHOLAR_ID}}},\n"
    entry += f"  citations={{{pub.get('citations', '0')}}},\n"
    entry += f"  bibtex_show={{true}}\n"
    entry += "}\n"
    
    return entry

def update_bibliography(publications):
    """
    Update the papers.bib file with fetched publications
    """
    if not publications:
        print("No publications found to update")
        return
    
    # Generate BibTeX entries
    bibtex_content = "---\n---\n\n"
    bibtex_content += f"% Auto-generated from Google Scholar\n"
    bibtex_content += f"% Profile: https://scholar.google.com/citations?user={SCHOLAR_ID}\n"
    bibtex_content += f"% Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    
    for i, pub in enumerate(publications):
        bibtex_content += generate_bibtex_entry(pub, i)
        bibtex_content += "\n"
    
    # Write to file
    output_file = "../_bibliography/papers.bib"
    try:
        with open(output_file, 'w') as f:
            f.write(bibtex_content)
        print(f"Successfully updated {output_file} with {len(publications)} publications")
    except Exception as e:
        print(f"Error writing bibliography: {e}")

def main():
    """
    Main function to sync Google Scholar publications
    """
    print(f"Fetching publications from Google Scholar (ID: {SCHOLAR_ID})...")
    
    # Fetch publications
    publications = fetch_scholar_publications(SCHOLAR_ID)
    
    if publications:
        print(f"Found {len(publications)} publications")
        for pub in publications[:5]:  # Show first 5
            print(f"- {pub.get('title', 'Unknown')} ({pub.get('year', 'Unknown')})")
        
        # Update bibliography
        update_bibliography(publications)
    else:
        print("No publications found or error occurred")
        print("\nNote: Google Scholar may block automated requests.")
        print("For reliable syncing, consider using the 'scholarly' Python library:")
        print("  pip install scholarly")
        print("\nAlternatively, manually update _bibliography/papers.bib")

if __name__ == "__main__":
    main()