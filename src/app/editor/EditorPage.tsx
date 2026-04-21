'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Editor, { loader } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import { api } from '@/lib/axios';
import { FiAlertCircle } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';

import type { Compiler, LatexDocument, LatexAssistantAction, LatexAssistantResponse } from './editor.types';
import { compilerOptions, DEFAULT_LATEX } from './editor.types';
import { getInitialDocument, getDisplayError, extractSuggestedTitle, buildPreviewSource, getApiErrorMessage, configureLatexEditor } from './editor.utils';

import { EditorToolbar } from './components/EditorToolbar';
import { AiAssistPanel } from './components/AiAssistPanel';
import { PreviewPane } from './components/PreviewPane';

loader.config({ monaco: monacoEditor });

export default function LatexEditorPage({ docId, templateId }: { docId: string | null; templateId: string | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const initialDocument = getInitialDocument(templateId);
  const initialDocumentId = docId && /^\d+$/.test(docId) ? Number(docId) : null;

  const [zoom, setZoom] = useState(80);
  const [compiler, setCompiler] = useState<Compiler>('pdflatex');
  const [documentId, setDocumentId] = useState<number | null>(initialDocumentId);
  const [docTitle, setDocTitle] = useState(initialDocument.title);
  const [latexCode, setLatexCode] = useState(initialDocument.content);
  const [isDirty, setIsDirty] = useState(!initialDocumentId);
  const [isLoadingDoc, setIsLoadingDoc] = useState(Boolean(initialDocumentId));
  const [isSaving, setIsSaving] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState<'success' | 'error' | null>(null);
  const [compileLogs, setCompileLogs] = useState('');

  // AI Panel State
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<LatexAssistantResponse | null>(null);

  const previousPreviewUrlRef = useRef<string | null>(null);
  const isBootstrappingRef = useRef(true);

  const clearPreview = () => {
    if (previousPreviewUrlRef.current) {
      URL.revokeObjectURL(previousPreviewUrlRef.current);
      previousPreviewUrlRef.current = null;
    }
    setPreviewUrl(null);
  };

  useEffect(() => {
    return () => {
      if (previousPreviewUrlRef.current) {
        URL.revokeObjectURL(previousPreviewUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!documentId) {
      isBootstrappingRef.current = false;
      return;
    }

    let cancelled = false;

    const loadDocument = async () => {
      try {
        setIsLoadingDoc(true);
        const response = await api.get<LatexDocument>(`/latex/${documentId}`);

        if (cancelled) return;

        const latestContent = response.data.versions[0]?.content || DEFAULT_LATEX;

        setDocTitle(response.data.title || 'Untitled Document');
        setLatexCode(latestContent);
        setIsDirty(false);
        setStatusTone(null);
        setStatusMessage('');
        setCompileLogs('');
        setAiError(null);
        setAiResult(null);
      } catch (error) {
        console.error('Failed to load latex document:', error);
        if (!cancelled) {
          setStatusTone('error');
          setStatusMessage('The document could not be loaded. Please reopen it from the dashboard.');
        }
      } finally {
        if (!cancelled) {
          setIsLoadingDoc(false);
          isBootstrappingRef.current = false;
        }
      }
    };

    void loadDocument();
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  const handleTitleChange = (value: string) => {
    setDocTitle(value);
    if (!isBootstrappingRef.current) setIsDirty(true);
  };

  const handleCodeChange = (value: string) => {
    setLatexCode(value);
    if (!isBootstrappingRef.current) setIsDirty(true);
  };

  const handleSave = async () => {
    const resolvedTitle = docTitle.trim() || extractSuggestedTitle(latexCode, initialDocument.title);

    try {
      setIsSaving(true);
      if (documentId) {
        await api.patch(`/latex/${documentId}`, { title: resolvedTitle });
        await api.put(`/latex/${documentId}`, { content: latexCode });
      } else {
        const response = await api.post<LatexDocument>('/latex', {
          title: resolvedTitle,
          content: latexCode,
        });
        setDocumentId(response.data.id);
        router.replace(`${pathname}?doc=${response.data.id}`);
      }

      setDocTitle(resolvedTitle);
      setIsDirty(false);
      setStatusTone('success');
      setStatusMessage('Document saved successfully.');
    } catch (error) {
      console.error('Failed to save latex document:', error);
      setStatusTone('error');
      setStatusMessage('The document could not be saved. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const applyAssistantResult = (result: LatexAssistantResponse) => {
    const nextTitle = result.action === 'fix' ? docTitle.trim() || result.title : result.title.trim() || docTitle.trim() || 'Untitled Document';

    setDocTitle(nextTitle);
    setLatexCode(result.latexCode);
    setIsDirty(true);
    setAiError(null);
    setAiResult(result);
    clearPreview();
    setCompileLogs('');
    setStatusTone('success');
    setStatusMessage(result.action === 'fix' ? 'The AI updated the code. Compile it again to verify the fix.' : 'The AI generated a new LaTeX document and inserted it into the editor.');
  };

  const runAssistant = async (action: LatexAssistantAction) => {
    if (action === 'generate' && !assistantPrompt.trim()) {
      setAiError('Describe the kind of LaTeX document you want first.');
      setIsAiPanelOpen(true);
      return;
    }

    if (action === 'fix' && !compileLogs.trim()) {
      setAiError('The AI fix action is available after a compile error appears.');
      setIsAiPanelOpen(true);
      return;
    }

    try {
      setIsAiWorking(true);
      setAiError(null);
      setIsAiPanelOpen(true);

      const response = await api.post<LatexAssistantResponse>(
        '/latex/assistant',
        action === 'fix'
          ? {
              action,
              prompt: assistantPrompt.trim() || undefined,
              compiler,
              currentTitle: docTitle,
              currentContent: latexCode,
              compileLogs,
            }
          : {
              action,
              prompt: assistantPrompt.trim(),
              compiler,
              currentTitle: docTitle,
              currentContent: latexCode,
            },
      );

      applyAssistantResult(response.data);
    } catch (error) {
      const message = getApiErrorMessage(error);
      setAiError(message);
      setStatusTone('error');
      setStatusMessage(message);
    } finally {
      setIsAiWorking(false);
    }
  };

  const handleCompile = async () => {
    try {
      setIsCompiling(true);
      setStatusTone(null);
      setStatusMessage('');
      setCompileLogs('');

      const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

      const response = await fetch('/api/latex/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userId ? { 'x-user-id': userId } : {}),
        },
        body: JSON.stringify({
          content: latexCode,
          compiler,
        }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/pdf')) {
        const pdfBlob = await response.blob();
        const nextPreviewUrl = URL.createObjectURL(pdfBlob);

        if (previousPreviewUrlRef.current) {
          URL.revokeObjectURL(previousPreviewUrlRef.current);
        }

        previousPreviewUrlRef.current = nextPreviewUrl;
        setPreviewUrl(nextPreviewUrl);
        setStatusTone('success');
        setStatusMessage('Compilation complete. PDF preview ready.');
        return;
      }

      const rawPayload = await response.text();
      let parsedPayload: unknown = rawPayload;

      try {
        parsedPayload = JSON.parse(rawPayload);
      } catch {
        // keep raw text if response is not json
      }

      const errorState = getDisplayError(parsedPayload);
      clearPreview();
      setStatusTone('error');
      setStatusMessage(errorState.message);
      setCompileLogs(errorState.logs);
      setIsAiPanelOpen(true);
    } catch (error) {
      console.error('Failed to compile latex document:', error);
      clearPreview();
      setStatusTone('error');
      setStatusMessage('The compilation request could not reach the service. Please check your network or configuration.');
      setCompileLogs(error instanceof Error ? error.message : '');
      setIsAiPanelOpen(true);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const anchor = document.createElement('a');
    anchor.href = previewUrl;
    anchor.download = `${(docTitle || 'document').replace(/\s+/g, '-').toLowerCase()}.pdf`;
    anchor.click();
  };

  const previewSrc = previewUrl ? buildPreviewSource(previewUrl, zoom) : null;
  const canFixWithAi = Boolean(compileLogs.trim());

  return (
    <div className="relative flex flex-col h-screen font-gothic overflow-hidden text-white">
      <EditorToolbar
        docTitle={docTitle}
        zoom={zoom}
        compiler={compiler}
        compilerOptions={compilerOptions}
        previewUrl={previewUrl}
        isLoadingDoc={isLoadingDoc}
        isSaving={isSaving}
        isDirty={isDirty}
        isCompiling={isCompiling}
        isAiPanelOpen={isAiPanelOpen}
        onTitleChange={handleTitleChange}
        onZoomChange={setZoom}
        onCompilerChange={setCompiler}
        onDownload={handleDownload}
        onToggleAiPanel={() => setIsAiPanelOpen((prev) => !prev)}
        onSave={handleSave}
        onCompile={handleCompile}
      />

      {(statusMessage || compileLogs) && (
        <div className={`px-4 py-2 border-b text-[11px] ${statusTone === 'error' ? 'bg-red-950/20 border-red-500/10 text-red-200/80' : 'bg-white/[0.02] border-white/5 text-white/45'}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {statusTone === 'error' && <FiAlertCircle size={12} />}
              <span>{statusMessage}</span>
            </div>

            {statusTone === 'error' && canFixWithAi ? (
              <button
                type="button"
                onClick={() => void runAssistant('fix')}
                disabled={isAiWorking}
                className="shrink-0 rounded-sm border border-red-300/20 bg-red-300/10 px-2.5 py-1 text-[11px] text-red-100 transition hover:bg-red-300/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAiWorking ? 'AI fixing...' : 'Fix with AI'}
              </button>
            ) : null}
          </div>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex min-w-0 overflow-hidden border-r border-white/5" style={{ maxWidth: '50%' }}>
          <div className="relative h-full w-full overflow-hidden bg-[#0C0B08]">
            <Editor
              beforeMount={configureLatexEditor}
              height="100%"
              language="latex"
              loading={
                <div className="flex h-full items-center justify-center text-sm text-white/30">
                  <BiLoaderAlt size={18} className="mr-2 animate-spin" />
                  Loading editor...
                </div>
              }
              onChange={(value) => handleCodeChange(value ?? '')}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 13.5,
                lineHeight: 26,
                fontLigatures: true,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                lineNumbers: 'on',
                lineNumbersMinChars: 3,
                glyphMargin: false,
                folding: true,
                renderLineHighlight: 'line',
                contextmenu: true,
                overviewRulerBorder: false,
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                padding: { top: 18, bottom: 18 },
                scrollbar: {
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
                tabSize: 2,
                insertSpaces: true,
                wordWrap: 'off',
              }}
              theme="helix-ai-monaco"
              value={latexCode}
              width="100%"
            />
          </div>
        </div>

        <div className="w-px bg-white/5 shrink-0" />

        <div className="flex-1 flex flex-col min-w-0" style={{ maxWidth: '50%' }}>
          <div className="flex-1 bg-[#1a1a1a] overflow-auto px-4 py-6">
            <PreviewPane isLoadingDoc={isLoadingDoc} previewSrc={previewSrc} compileLogs={compileLogs} />
          </div>
        </div>
      </div>

      <AiAssistPanel
        isOpen={isAiPanelOpen}
        prompt={assistantPrompt}
        isWorking={isAiWorking}
        error={aiError}
        result={aiResult}
        canFix={canFixWithAi}
        onClose={() => setIsAiPanelOpen(false)}
        onPromptChange={setAssistantPrompt}
        onRunAssistant={runAssistant}
      />
    </div>
  );
}
