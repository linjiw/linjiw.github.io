#!/usr/bin/env python3
"""
Context-Aware Resume Builder
Generates role-specific resumes based on context (AI, SDE, Robotics, RL)
"""

import yaml
import json
import os
import sys
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any
from jinja2 import Template, Environment, FileSystemLoader

class ContextualResumeBuilder:
    def __init__(self, context='general'):
        self.context = context
        self.base_dir = Path(__file__).parent.parent
        self.data_dir = self.base_dir / 'content' / 'resume'
        self.config_dir = self.base_dir / 'data' / 'resume'
        self.output_dir = self.base_dir / 'static' / 'files'
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Load base resume data
        self.base_data = self.load_yaml(self.data_dir / 'data.yaml')
        
        # Load context-specific configuration
        self.context_config = self.load_context_config(context)
        
        # Apply context filters
        self.filtered_data = self.apply_context_filters()
        
    def load_yaml(self, file_path):
        """Load YAML file"""
        if not file_path.exists():
            print(f"Warning: {file_path} not found")
            return {}
        with open(file_path, 'r') as f:
            return yaml.safe_load(f)
    
    def load_context_config(self, context):
        """Load context-specific configuration"""
        config_file = self.config_dir / f'{context}-focus.yaml'
        if config_file.exists():
            return self.load_yaml(config_file)
        else:
            print(f"No specific config for {context}, using general")
            return {}
    
    def apply_context_filters(self):
        """Apply context-specific filters to resume data"""
        data = self.base_data.copy()
        config = self.context_config
        
        if not config:
            return data
        
        # Update title and objective
        if 'title' in config:
            data['personal']['title'] = config['title']
        if 'objective' in config:
            data['objective'] = config['objective']
        
        # Filter experience based on keywords
        if 'experience_filter' in config:
            data['experience'] = self.filter_experience(
                data.get('experience', []),
                config['experience_filter']
            )
        
        # Reorder and filter projects
        if 'project_emphasis' in config:
            data['projects'] = self.prioritize_projects(
                data.get('research_projects', []),
                config['project_emphasis']
            )
        
        # Adjust skills emphasis
        if 'highlight_skills' in config:
            data['skills'] = self.reorganize_skills(
                data.get('skills', {}),
                config['highlight_skills']
            )
        
        # Add context metadata
        data['context'] = self.context
        data['generated_date'] = datetime.now().strftime('%B %d, %Y')
        data['version'] = f"{self.context}_{datetime.now().strftime('%Y%m%d')}"
        
        return data
    
    def filter_experience(self, experiences, filter_config):
        """Filter experiences based on keywords"""
        if not filter_config:
            return experiences
        
        keywords = filter_config.get('keywords', [])
        exclude = filter_config.get('exclude', [])
        
        filtered = []
        for exp in experiences:
            # Check if experience matches keywords
            exp_text = json.dumps(exp).lower()
            
            # Check for excluded terms
            if any(term.lower() in exp_text for term in exclude):
                continue
                
            # Check for included keywords
            if any(keyword.lower() in exp_text for keyword in keywords):
                filtered.append(exp)
        
        return filtered
    
    def prioritize_projects(self, projects, emphasis_config):
        """Reorder projects based on relevance scores"""
        if not emphasis_config:
            return projects
        
        # Create a mapping of project titles to relevance
        relevance_map = {
            item['title']: item['relevance'] 
            for item in emphasis_config
        }
        
        # Sort projects by relevance
        sorted_projects = sorted(
            projects,
            key=lambda p: relevance_map.get(p.get('title', ''), 0),
            reverse=True
        )
        
        return sorted_projects[:5]  # Return top 5 projects
    
    def reorganize_skills(self, skills, highlight_config):
        """Reorganize skills based on context emphasis"""
        if not highlight_config:
            return skills
        
        reorganized = {}
        
        # Add highlighted skills first
        for category, items in highlight_config.items():
            category_name = category.replace('_', ' ').title()
            reorganized[category_name] = items
        
        # Add remaining skills
        for category, items in skills.items():
            if category not in reorganized:
                reorganized[category] = items
        
        return reorganized
    
    def generate_latex(self):
        """Generate LaTeX version of resume"""
        template = Template(self.get_context_latex_template())
        latex_content = template.render(**self.filtered_data)
        
        # Save LaTeX file
        latex_file = f'resume_{self.context}.tex'
        with open(latex_file, 'w') as f:
            f.write(latex_content)
        
        return latex_file
    
    def get_context_latex_template(self):
        """Get context-specific LaTeX template"""
        # Base template with context-aware sections
        return r'''
\documentclass[11pt,letterpaper]{article}
\usepackage[margin=0.6in]{geometry}
\usepackage{hyperref}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage{fontawesome5}
\usepackage{xcolor}
\usepackage{multicol}

% Context-specific colors
{% if context == 'ai' %}
\definecolor{accent}{RGB}{107,70,193}  % Purple for AI
{% elif context == 'robotics' %}
\definecolor{accent}{RGB}{255,107,53}  % Orange for Robotics
{% elif context == 'sde' %}
\definecolor{accent}{RGB}{16,185,129}  % Green for SDE
{% elif context == 'rl' %}
\definecolor{accent}{RGB}{220,38,38}   % Red for RL
{% else %}
\definecolor{accent}{RGB}{0,102,204}   % Blue default
{% endif %}

\definecolor{gray}{RGB}{128,128,128}

% Section formatting
\titleformat{\section}{\Large\bfseries\color{accent}}{}{0em}{}[\titlerule]
\titleformat{\subsection}{\large\bfseries}{}{0em}{}
\titlespacing*{\section}{0pt}{2ex}{1ex}
\titlespacing*{\subsection}{0pt}{1ex}{0.5ex}

\setlength{\parindent}{0pt}
\pagestyle{empty}

\begin{document}

% Header
\begin{center}
    {\LARGE \textbf{ {{ personal.name }} }}\\[0.2em]
    {\large\color{accent} {{ personal.title }} }\\[0.4em]
    \small
    \faEnvelope\ \href{mailto:{{ personal.email }}}{ {{ personal.email }} } \quad
    \faPhone\ {{ personal.phone }}\\
    \faGlobe\ \href{https://{{ personal.website }}}{ {{ personal.website }} } \quad
    \faLinkedin\ \href{https://{{ personal.linkedin }}}{LinkedIn} \quad
    \faGithub\ \href{https://{{ personal.github }}}{GitHub}
\end{center}

{% if objective %}
\section{Objective}
{{ objective }}
{% endif %}

\section{Education}
{% for edu in education %}
\subsection{ {{ edu.degree }} }
\textbf{ {{ edu.institution }} }, {{ edu.location }} \hfill {{ edu.date }}\\
{% if edu.gpa %}GPA: {{ edu.gpa }}\\{% endif %}
{% if edu.details %}
\begin{itemize}[leftmargin=*,topsep=0pt,itemsep=1pt]
{% for detail in edu.details %}
    \item {{ detail }}
{% endfor %}
\end{itemize}
{% endif %}
{% endfor %}

{% if context in ['ai', 'robotics', 'rl'] and publications %}
\section{Selected Publications}
\begin{enumerate}[leftmargin=*,topsep=0pt,itemsep=2pt]
{% for pub in publications[:3] %}
    \item {{ pub.authors }} ({{ pub.year }}). \textit{ {{ pub.title }} }. {{ pub.venue }}.
{% endfor %}
\end{enumerate}
{% endif %}

\section{Experience}
{% for exp in experience[:4] %}
\subsection{ {{ exp.title }} }
\textbf{ {{ exp.company }} }, {{ exp.location }} \hfill {{ exp.date }}
\begin{itemize}[leftmargin=*,topsep=0pt,itemsep=1pt]
{% for bullet in exp.bullets[:3] %}
    \item {{ bullet }}
{% endfor %}
\end{itemize}
{% endfor %}

{% if projects %}
\section{Key Projects}
{% for project in projects[:3] %}
\textbf{ {{ project.title }} } ({{ project.date }})\\
{{ project.description }}\\
\textit{Technologies: {{ project.technologies|join(', ') }} }\\[0.3em]
{% endfor %}
{% endif %}

\section{Technical Skills}
{% for category, items in skills.items() %}
\textbf{ {{ category }} }: {{ items|join(', ') }}\\[0.1em]
{% endfor %}

{% if awards %}
\section{Awards \& Honors}
\begin{itemize}[leftmargin=*,topsep=0pt,itemsep=1pt]
{% for award in awards[:3] %}
    \item \textbf{ {{ award.title }} }, {{ award.organization }} ({{ award.date }})
{% endfor %}
\end{itemize}
{% endif %}

\vfill
\begin{center}
    \small\textcolor{gray}{
    \textit{Version: {{ context|upper }} | Generated: {{ generated_date }} | 
    \href{https://{{ personal.website }}/resume/{{ context }}}{Online Version}}
    }
\end{center}

\end{document}
        '''
    
    def compile_pdf(self, latex_file):
        """Compile LaTeX to PDF"""
        import subprocess
        
        try:
            # Run pdflatex twice for references
            for _ in range(2):
                result = subprocess.run(
                    ['pdflatex', '-interaction=nonstopmode', latex_file],
                    capture_output=True,
                    text=True
                )
            
            # Move PDF to appropriate locations
            pdf_file = latex_file.replace('.tex', '.pdf')
            if os.path.exists(pdf_file):
                # Context-specific file
                context_pdf = self.output_dir / f'resume_{self.context}.pdf'
                os.system(f'cp {pdf_file} {context_pdf}')
                
                # Versioned copy
                timestamp = datetime.now().strftime('%Y%m%d')
                version_dir = self.output_dir / 'resume-versions'
                version_dir.mkdir(exist_ok=True)
                version_pdf = version_dir / f'resume_{self.context}_{timestamp}.pdf'
                os.system(f'cp {pdf_file} {version_pdf}')
                
                print(f"✓ PDF generated: {context_pdf}")
                return True
        except FileNotFoundError:
            print("✗ pdflatex not found. Skipping PDF generation.")
            return False
        
        return False
    
    def generate_markdown(self):
        """Generate Markdown version for web display"""
        template = Template('''---
title: "Resume - {{ personal.title }}"
description: "{{ objective|truncate(160) }}"
context: "{{ context }}"
date: {{ generated_date }}
draft: false
layout: "resume"
---

# {{ personal.name }}

**{{ personal.title }}**

{{personal.email}} | {{personal.phone}} | [{{personal.website}}](https://{{personal.website}})  
[LinkedIn](https://{{personal.linkedin}}) | [GitHub](https://{{personal.github}})

[📄 Download {{ context|upper }}-Focused Resume](/files/resume_{{ context }}.pdf)

---

## Objective

{{ objective }}

## Education

{% for edu in education %}
### {{ edu.degree }}
**{{ edu.institution }}** - {{ edu.location }}  
*{{ edu.date }}* {% if edu.gpa %}| GPA: {{ edu.gpa }}{% endif %}
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

## Skills

{% for category, items in skills.items() %}
**{{ category }}:** {{ items|join(', ') }}  
{% endfor %}

---

*Specialized for {{ context|upper }} roles | Last updated: {{ generated_date }}*
''')
        
        md_content = template.render(**self.filtered_data)
        
        # Save context-specific markdown
        md_file = Path(f'content/resume/{self.context}.md')
        md_file.parent.mkdir(parents=True, exist_ok=True)
        with open(md_file, 'w') as f:
            f.write(md_content)
        
        print(f"✓ Markdown generated: {md_file}")
        return md_file
    
    def build(self):
        """Build resume for specific context"""
        print(f"🚀 Building {self.context.upper()}-focused resume...")
        
        # Generate LaTeX and compile to PDF
        latex_file = self.generate_latex()
        self.compile_pdf(latex_file)
        
        # Generate Markdown for web
        self.generate_markdown()
        
        # Clean up temp files
        for ext in ['.tex', '.aux', '.log', '.out']:
            temp_file = f"resume_{self.context}{ext}"
            if os.path.exists(temp_file):
                os.remove(temp_file)
        
        print(f"✅ {self.context.upper()} resume complete!")


def main():
    parser = argparse.ArgumentParser(
        description='Build context-specific resumes'
    )
    parser.add_argument(
        '--context',
        choices=['general', 'ai', 'sde', 'robotics', 'rl', 'all'],
        default='general',
        help='Resume context/focus'
    )
    
    args = parser.parse_args()
    
    if args.context == 'all':
        # Build all contexts
        contexts = ['general', 'ai', 'sde', 'robotics', 'rl']
        for context in contexts:
            builder = ContextualResumeBuilder(context)
            builder.build()
            print()
    else:
        # Build specific context
        builder = ContextualResumeBuilder(args.context)
        builder.build()


if __name__ == '__main__':
    main()