#!/bin/bash

# Script to compile resume.tex to PDF
# This will be run during Jekyll build process

echo "Building resume PDF..."

# Add TeX binaries to PATH if not already there
export PATH="/Library/TeX/texbin:$PATH"

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "pdflatex not found. Please install TeX distribution (e.g., MacTeX, TeX Live)"
    exit 1
fi

# Create assets/pdf directory if it doesn't exist
mkdir -p assets/pdf

# Compile the LaTeX file
pdflatex -output-directory=assets/pdf resume.tex

# Run twice to resolve references
pdflatex -output-directory=assets/pdf resume.tex

# Clean up auxiliary files
rm -f assets/pdf/*.aux assets/pdf/*.log assets/pdf/*.out

# Check if PDF was created successfully
if [ -f "assets/pdf/resume.pdf" ]; then
    echo "Resume PDF built successfully at assets/pdf/resume.pdf"
else
    echo "Error: Failed to build resume PDF"
    exit 1
fi