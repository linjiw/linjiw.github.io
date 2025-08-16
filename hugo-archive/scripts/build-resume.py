#!/usr/bin/env python3
"""
Resume Builder Script
Generates multiple formats (PDF, HTML, Markdown) from single YAML source
"""

import yaml
import json
import os
import sys
from datetime import datetime
from pathlib import Path
import subprocess
import argparse
from jinja2 import Template, Environment, FileSystemLoader

class ResumeBuilder:
    def __init__(self, data_file='content/resume/data.yaml'):
        self.data_file = data_file
        self.output_dir = Path('static/files')
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.data = self.load_data()
        
    def load_data(self):
        """Load resume data from YAML file"""
        with open(self.data_file, 'r') as f:
            data = yaml.safe_load(f)
        # Add metadata
        data['generated_date'] = datetime.now().strftime('%B %d, %Y')
        data['version'] = datetime.now().strftime('%Y.%m.%d')
        return data
    
    def generate_latex(self, template_file=None):
        """Generate LaTeX version of resume"""
        if template_file and os.path.exists(template_file):
            with open(template_file, 'r') as f:
                template = Template(f.read())
        else:
            template = Template(self.get_default_latex_template())
        
        latex_content = template.render(**self.data)
        
        # Save LaTeX file
        latex_file = 'resume.tex'
        with open(latex_file, 'w') as f:
            f.write(latex_content)
        
        return latex_file
    
    def get_default_latex_template(self):
        """Default LaTeX template"""
        return r'''
\documentclass[11pt,letterpaper]{article}
\usepackage[margin=0.75in]{geometry}
\usepackage{hyperref}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage{fontawesome5}
\usepackage{xcolor}

% Define colors
\definecolor{darkblue}{RGB}{26,13,171}
\definecolor{gray}{RGB}{128,128,128}

% Section formatting
\titleformat{\section}{\Large\bfseries\color{darkblue}}{}{0em}{}[\titlerule]
\titleformat{\subsection}{\large\bfseries}{}{0em}{}
\titlespacing*{\section}{0pt}{2ex}{1ex}
\titlespacing*{\subsection}{0pt}{1ex}{0.5ex}

% Remove paragraph indentation
\setlength{\parindent}{0pt}
\pagestyle{empty}

\begin{document}

% Header
\begin{center}
    {\LARGE \textbf{ {{ personal.name }} }}\\[0.3em]
    {{ personal.title }}\\[0.5em]
    \faEnvelope\ \href{mailto:{{ personal.email }}}{ {{ personal.email }} } \quad
    \faPhone\ {{ personal.phone }}\\
    \faGlobe\ \href{https://{{ personal.website }}}{ {{ personal.website }} } \quad
    \faLinkedin\ \href{https://{{ personal.linkedin }}}{ {{ personal.linkedin }} } \quad
    \faGithub\ \href{https://{{ personal.github }}}{ {{ personal.github }} }
\end{center}

\section{Summary}
{{ summary }}

\section{Education}
{% for edu in education %}
\subsection{ {{ edu.degree }} }
\textbf{ {{ edu.institution }} }, {{ edu.location }} \hfill {{ edu.date }}\\
{% if edu.gpa %}GPA: {{ edu.gpa }}\\{% endif %}
{% if edu.details %}
\begin{itemize}[leftmargin=*,topsep=0pt,itemsep=2pt]
{% for detail in edu.details %}
    \item {{ detail }}
{% endfor %}
\end{itemize}
{% endif %}
{% endfor %}

\section{Experience}
{% for exp in experience %}
\subsection{ {{ exp.title }} }
\textbf{ {{ exp.company }} }, {{ exp.location }} \hfill {{ exp.date }}
\begin{itemize}[leftmargin=*,topsep=0pt,itemsep=2pt]
{% for bullet in exp.bullets %}
    \item {{ bullet }}
{% endfor %}
\end{itemize}
{% endfor %}

\section{Publications}
\begin{enumerate}[leftmargin=*,topsep=0pt,itemsep=2pt]
{% for pub in publications %}
    \item {{ pub.authors }} ({{ pub.year }}). \textit{ {{ pub.title }} }. {{ pub.venue }}. \textbf{ {{ pub.status }} }
{% endfor %}
\end{enumerate}

\section{Skills}
{% for category, items in skills.items() %}
\textbf{ {{ category }} }: {{ items|join(', ') }}\\[0.2em]
{% endfor %}

\section{Awards \& Honors}
\begin{itemize}[leftmargin=*,topsep=0pt,itemsep=2pt]
{% for award in awards %}
    \item \textbf{ {{ award.title }} }, {{ award.organization }} ({{ award.date }}) {% if award.description %}- {{ award.description }}{% endif %}
{% endfor %}
\end{itemize}

\vfill
\begin{center}
    \small\textcolor{gray}{\textit{Updated: {{ generated_date }} | Version: {{ version }} }}
\end{center}

\end{document}
        '''
    
    def compile_pdf(self, latex_file):
        """Compile LaTeX to PDF"""
        try:
            # Run pdflatex twice for references
            for _ in range(2):
                result = subprocess.run(
                    ['pdflatex', '-interaction=nonstopmode', latex_file],
                    capture_output=True,
                    text=True
                )
                if result.returncode != 0:
                    print(f"Warning: pdflatex compilation had issues")
                    print(result.stderr)
            
            # Move PDF to output directory
            pdf_file = latex_file.replace('.tex', '.pdf')
            if os.path.exists(pdf_file):
                # Create versioned copies
                timestamp = datetime.now().strftime('%Y%m%d')
                
                # Main CV file
                os.system(f'cp {pdf_file} {self.output_dir}/cv.pdf')
                
                # Named version
                os.system(f'cp {pdf_file} "{self.output_dir}/Linji Wang CV site-linji.pdf"')
                
                # Timestamped version
                version_dir = self.output_dir / 'resume-versions'
                version_dir.mkdir(exist_ok=True)
                os.system(f'cp {pdf_file} {version_dir}/cv_{timestamp}.pdf')
                
                print(f"✓ PDF generated successfully: {self.output_dir}/cv.pdf")
                return True
            else:
                print("✗ PDF generation failed")
                return False
                
        except FileNotFoundError:
            print("✗ pdflatex not found. Please install texlive-full")
            return False
    
    def generate_markdown(self):
        """Generate Markdown version for web display"""
        template = Template('''---
title: "Resume"
date: {{ generated_date }}
draft: false
share: false
---

# {{ personal.name }}

**{{ personal.title }}**

{{personal.email}} | {{personal.phone}} | [{{personal.website}}](https://{{personal.website}})  
[LinkedIn](https://{{personal.linkedin}}) | [GitHub](https://{{personal.github}})

[📄 Download PDF Version](/files/cv.pdf)

---

## Summary

{{ summary }}

## Education

{% for edu in education %}
### {{ edu.degree }}
**{{ edu.institution }}** - {{ edu.location }}  
*{{ edu.date }}* {% if edu.gpa %}| GPA: {{ edu.gpa }}{% endif %}

{% for detail in edu.details %}
- {{ detail }}
{% endfor %}

{% endfor %}

## Experience

{% for exp in experience %}
### {{ exp.title }}
**{{ exp.company }}** - {{ exp.location }}  
*{{ exp.date }}*

{% for bullet in exp.bullets %}
- {{ bullet }}
{% endfor %}

{% endfor %}

## Research Projects

{% for project in research_projects %}
### {{ project.title }}
*{{ project.date }}*  
{{ project.description }}  
**Technologies:** {{ project.technologies|join(', ') }}

{% endfor %}

## Publications

{% for pub in publications %}
1. {{ pub.authors }} ({{ pub.year }}). **{{ pub.title }}**. *{{ pub.venue }}*. {{ pub.status }}
{% endfor %}

## Skills

{% for category, items in skills.items() %}
**{{ category }}:** {{ items|join(', ') }}  
{% endfor %}

## Awards & Honors

{% for award in awards %}
- **{{ award.title }}** - {{ award.organization }} ({{ award.date }}){% if award.description %}: {{ award.description }}{% endif %}
{% endfor %}

## Leadership & Service

{% for item in leadership %}
- **{{ item.role }}** - {{ item.organization }} ({{ item.date }}): {{ item.description }}
{% endfor %}

---

*Last updated: {{ generated_date }}*
''')
        
        md_content = template.render(**self.data)
        
        # Save Markdown file
        md_file = Path('content/resume/index.md')
        md_file.parent.mkdir(parents=True, exist_ok=True)
        with open(md_file, 'w') as f:
            f.write(md_content)
        
        print(f"✓ Markdown generated: {md_file}")
        return md_file
    
    def generate_json(self):
        """Generate JSON version for API/programmatic access"""
        json_file = self.output_dir / 'resume.json'
        with open(json_file, 'w') as f:
            json.dump(self.data, f, indent=2, default=str)
        print(f"✓ JSON generated: {json_file}")
        return json_file
    
    def build_all(self):
        """Build all resume formats"""
        print("🚀 Starting resume build process...")
        
        # Generate LaTeX and compile to PDF
        latex_file = self.generate_latex()
        self.compile_pdf(latex_file)
        
        # Generate Markdown for web
        self.generate_markdown()
        
        # Generate JSON for API
        self.generate_json()
        
        # Clean up temporary files
        for ext in ['.tex', '.aux', '.log', '.out', '.pdf']:
            temp_file = f"resume{ext}"
            if os.path.exists(temp_file) and ext != '.pdf':
                os.remove(temp_file)
        
        print("✅ Resume build complete!")


def main():
    parser = argparse.ArgumentParser(description='Build resume from YAML data')
    parser.add_argument('--data', default='content/resume/data.yaml',
                       help='Path to resume data YAML file')
    parser.add_argument('--format', choices=['all', 'pdf', 'markdown', 'json'],
                       default='all', help='Output format')
    
    args = parser.parse_args()
    
    builder = ResumeBuilder(args.data)
    
    if args.format == 'all':
        builder.build_all()
    elif args.format == 'pdf':
        latex_file = builder.generate_latex()
        builder.compile_pdf(latex_file)
    elif args.format == 'markdown':
        builder.generate_markdown()
    elif args.format == 'json':
        builder.generate_json()


if __name__ == '__main__':
    main()