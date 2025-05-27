import type { BeforeMount } from '@monaco-editor/react';
import { latexTemplatePresets } from '@/modules/latex/latex.templates';
import { DEFAULT_LATEX } from './editor.types';

export function getInitialDocument(templateId: string | null) {
  const preset = templateId ? latexTemplatePresets[templateId] : undefined;

  if (preset) {
    return preset;
  }

  return {
    title: 'Untitled Document',
    content: DEFAULT_LATEX,
  };
}

export function getDisplayError(payload: unknown) {
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const message =
      (typeof record.message === 'string' && record.message) || (typeof record.error === 'string' && record.error) || (typeof record.detail === 'string' && record.detail) || 'Compilation failed';

    return {
      message,
      logs: JSON.stringify(payload, null, 2),
    };
  }

  if (typeof payload === 'string' && payload.trim()) {
    return {
      message: 'Compilation failed',
      logs: payload,
    };
  }

  return {
    message: 'Compilation failed',
    logs: '',
  };
}

export function extractSuggestedTitle(content: string, fallback: string) {
  const titleMatch = content.match(/\\title\{([^}]*)\}/);

  if (titleMatch?.[1]?.trim()) {
    return titleMatch[1].trim();
  }

  const firstSectionMatch = content.match(/\\section\*?\{([^}]*)\}/);

  if (firstSectionMatch?.[1]?.trim()) {
    return firstSectionMatch[1].trim();
  }

  return fallback.trim() || 'Untitled Document';
}

export function buildPreviewSource(previewUrl: string, zoom: number) {
  return `${previewUrl}#toolbar=0&navpanes=0&zoom=${zoom}`;
}

export function getApiErrorMessage(error: unknown) {
  if (error && typeof error === 'object') {
    const responseData = (error as { response?: { data?: unknown } }).response?.data;

    if (responseData && typeof responseData === 'object') {
      const record = responseData as Record<string, unknown>;
      if (typeof record.message === 'string' && record.message.trim()) {
        return record.message;
      }

      if (typeof record.error === 'string' && record.error.trim()) {
        return record.error;
      }
    }

    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
  }

  return 'The AI request could not be completed. Please try again.';
}

export const configureLatexEditor: BeforeMount = (monaco) => {
  if (!monaco.languages.getLanguages().some((language: { id: string }) => language.id === 'latex')) {
    monaco.languages.register({ id: 'latex' });

    monaco.languages.setMonarchTokensProvider('latex', {
      tokenizer: {
        root: [
          [/%.*$/, 'comment'],
          [/\\[a-zA-Z@]+/, 'keyword'],
          [/\$(?:\\.|[^$\\])+\$/, 'string'],
          [/[{}[\]()]/, '@brackets'],
          [/\b\d+(\.\d+)?\b/, 'number'],
          [/[&_^~]/, 'operator'],
          [/[^\\%{}[\]$&_^~]+/, 'identifier'],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration('latex', {
      comments: { lineComment: '%' },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '$', close: '$' },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '$', close: '$' },
      ],
    });
  }

  monaco.editor.defineTheme('vilo-monaco', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955' },
      { token: 'keyword', foreground: 'C586C0' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'operator', foreground: 'D4D4D4' },
      { token: 'identifier', foreground: 'D4D4D4' },
    ],
    colors: {
      'editor.background': '#0C0B08',
      'editor.foreground': '#D4D4D4',
      'editorLineNumber.foreground': '#5B554B',
      'editorLineNumber.activeForeground': '#C8C1B7',
      'editor.lineHighlightBackground': '#17130F',
      'editor.selectionBackground': '#264F78',
      'editor.inactiveSelectionBackground': '#3A3D41',
      'editorCursor.foreground': '#F4EFE7',
      'editorIndentGuide.background1': '#201C16',
      'editorIndentGuide.activeBackground1': '#413A2E',
      'editorGutter.background': '#0C0B08',
    },
  });
};
