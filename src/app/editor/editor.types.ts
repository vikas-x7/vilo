export type Compiler = 'pdflatex' | 'xelatex' | 'lualatex' | 'platex' | 'uplatex' | 'context';

export interface LatexVersion {
  id: number;
  content: string;
  createdAt: string;
}

export interface LatexDocument {
  id: number;
  title: string;
  updatedAt: string;
  versions: LatexVersion[];
}

export type LatexAssistantAction = 'generate' | 'fix';

export interface LatexAssistantResponse {
  action: LatexAssistantAction;
  title: string;
  latexCode: string;
  summary: string;
  nextSteps: string[];
  model: string;
}

export const DEFAULT_LATEX = `\\documentclass{article}
\\usepackage{graphicx}

\\title{My LaTeX Document}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
Start writing your document here...

\\end{document}`;

export const compilerOptions: Compiler[] = ['pdflatex', 'xelatex', 'lualatex', 'platex', 'uplatex', 'context'];
