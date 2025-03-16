export interface LatexTemplateDefinition {
  id: string;
  name: string;
  description: string;
  title: string;
  content: string;
  image?: string;
}

export const latexTemplateCatalog: LatexTemplateDefinition[] = [
  {
    id: "resume-standard",
    name: "Professional Resume",
    description:
      "A clean, modern two-column resume template suitable for all professions.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop",
    title: "Professional Resume",
    content: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.7in]{geometry}
\\begin{document}
\\section*{John Doe}
Email: john@example.com

\\section*{Experience}
Start writing here...
\\end{document}`,
  },
  {
    id: "research-ieee",
    name: "Research Paper (IEEE)",
    description:
      "Standard IEEE two-column format for academic research papers and conferences.",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop",
    title: "Research Paper",
    content: `\\documentclass[conference]{IEEEtran}
\\title{My Research Paper}
\\author{Author Name}
\\begin{document}
\\maketitle
\\section{Introduction}
Start writing here...
\\end{document}`,
  },
  {
    id: "report-tech",
    name: "Technical Report",
    description:
      "Comprehensive layout with title page, table of contents, and chapters.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
    title: "Technical Report",
    content: `\\documentclass{report}
\\title{Technical Report}
\\author{Author Name}
\\begin{document}
\\maketitle
\\chapter{Overview}
Start writing here...
\\end{document}`,
  },
  {
    id: "presentation-beamer",
    name: "Slide Presentation",
    description:
      "Minimalist Beamer template for academic or professional slide decks.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop",
    title: "Presentation",
    content: `\\documentclass{beamer}
\\title{Slide Deck}
\\author{Author Name}
\\begin{document}
\\frame{\\titlepage}
\\begin{frame}{Agenda}
Start writing here...
\\end{frame}
\\end{document}`,
  },
  {
    id: "cover-letter",
    name: "Cover Letter",
    description:
      "Formal business letter template matching the Professional Resume style.",
    image:
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=400&auto=format&fit=crop",
    title: "Cover Letter",
    content: `\\documentclass{letter}
\\signature{John Doe}
\\begin{document}
\\begin{letter}{Hiring Manager}
\\opening{Dear Hiring Manager,}
I am excited to apply...
\\closing{Sincerely,}
\\end{letter}
\\end{document}`,
  },
  {
    id: "assignment",
    name: "Homework Assignment",
    description:
      "Simple single-column format with question/answer block environments.",
    image:
      "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=400&auto=format&fit=crop",
    title: "Homework Assignment",
    content: `\\documentclass{article}
\\title{Homework Assignment}
\\author{Student Name}
\\begin{document}
\\maketitle
\\section*{Question 1}
Write your answer here...
\\end{document}`,
  },
  {
    id: "article-notes",
    name: "Lecture Notes",
    description:
      "Structured class or self-study notes with definitions, theorems, and examples.",
    title: "Lecture Notes",
    content: `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{amsmath,amssymb,amsthm}

\\title{Lecture Notes}
\\author{Student Name}
\\date{\\today}

\\newtheorem{theorem}{Theorem}
\\newtheorem{definition}{Definition}

\\begin{document}
\\maketitle

\\section{Topic Overview}
Summarize the key idea here.

\\begin{definition}
Write a core definition here.
\\end{definition}

\\begin{theorem}
State an important theorem here.
\\end{theorem}

\\section{Worked Example}
Add examples, derivations, and notes here.

\\end{document}`,
  },
  {
    id: "lab-report",
    name: "Lab Report",
    description:
      "A clean science lab report starter with aim, setup, observations, and conclusion.",
    title: "Lab Report",
    content: `\\documentclass[12pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphicx}

\\title{Lab Report}
\\author{Student Name}
\\date{\\today}

\\begin{document}
\\maketitle

\\section{Aim}
Describe the objective of the experiment.

\\section{Apparatus}
List the tools and setup used.

\\section{Procedure}
Explain the steps followed during the experiment.

\\section{Observations}
Write the measured data and findings here.

\\section{Conclusion}
Summarize the final outcome and learning.

\\end{document}`,
  },
  {
    id: "thesis-minimal",
    name: "Thesis / Dissertation",
    description:
      "A chapter-based thesis starter with abstract, chapters, and bibliography placeholders.",
    title: "Thesis Draft",
    content: `\\documentclass[12pt]{report}
\\usepackage[margin=1in]{geometry}

\\title{Thesis Title}
\\author{Author Name}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
Write your thesis abstract here.
\\end{abstract}

\\tableofcontents

\\chapter{Introduction}
Introduce the research problem and motivation.

\\chapter{Literature Review}
Summarize related work here.

\\chapter{Methodology}
Explain your approach and process here.

\\chapter{Results}
Present findings, analysis, and discussion here.

\\chapter{Conclusion}
Wrap up the thesis and future work here.

\\end{document}`,
  },
  {
    id: "invoice-basic",
    name: "Invoice",
    description:
      "A simple invoice layout with billing details, line items, and total amount.",
    title: "Invoice",
    content: `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{array}

\\begin{document}

\\begin{flushright}
{\\LARGE \\textbf{Invoice}}\\\\
Invoice No: INV-001\\\\
Date: \\today
\\end{flushright}

\\section*{Bill To}
Client Name\\\\
Client Company\\\\
client@example.com

\\section*{From}
Your Name\\\\
Your Company\\\\
you@example.com

\\section*{Items}
\\begin{tabular}{|p{7cm}|c|c|}
\\hline
Description & Qty & Amount \\\\
\\hline
Design Services & 1 & \\$500 \\\\
\\hline
Development Support & 2 & \\$300 \\\\
\\hline
\\end{tabular}

\\vspace{1cm}
\\begin{flushright}
\\textbf{Total: \\$800}
\\end{flushright}

\\end{document}`,
  },
];

export const latexTemplatePresets = latexTemplateCatalog.reduce<
  Record<string, { title: string; content: string }>
>((accumulator, template) => {
  accumulator[template.id] = {
    title: template.title,
    content: template.content,
  };

  return accumulator;
}, {});
