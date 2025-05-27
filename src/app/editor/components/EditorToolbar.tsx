'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { BiArrowBack, BiDownload, BiLoaderAlt, BiMinus, BiPlay, BiPlus, BiSave } from 'react-icons/bi';
import type { Compiler } from '../editor.types';

interface EditorToolbarProps {
  docTitle: string;
  zoom: number;
  compiler: Compiler;
  compilerOptions: Compiler[];
  previewUrl: string | null;
  isLoadingDoc: boolean;
  isSaving: boolean;
  isDirty: boolean;
  isCompiling: boolean;
  isAiPanelOpen: boolean;
  onTitleChange: (title: string) => void;
  onZoomChange: (zoom: number | ((prev: number) => number)) => void;
  onCompilerChange: (compiler: Compiler) => void;
  onDownload: () => void;
  onToggleAiPanel: () => void;
  onSave: () => void;
  onCompile: () => void;
}

export function EditorToolbar({
  docTitle,
  zoom,
  compiler,
  compilerOptions,
  previewUrl,
  isLoadingDoc,
  isSaving,
  isDirty,
  isCompiling,
  isAiPanelOpen,
  onTitleChange,
  onZoomChange,
  onCompilerChange,
  onDownload,
  onToggleAiPanel,
  onSave,
  onCompile,
}: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 border-b border-white/5 shrink-0 h-11 gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Link href="/dashboard/latex" className="p-1.5 hover:bg-white/5 rounded-sm text-white/30 hover:text-white/70 transition-colors">
          <BiArrowBack size={15} />
        </Link>
        <div className="h-3.5 w-px bg-white/8" />
        <input
          value={docTitle}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Untitled Document"
          className="bg-transparent text-[13px] text-white/60 min-w-0 flex-1 outline-none border-b border-transparent focus:border-white/20 pb-0.5"
        />
        <span className="text-[10px] text-white/20 border border-white/8 px-1.5 py-0.5 rounded-sm shrink-0">{isLoadingDoc ? 'loading' : isSaving ? 'saving' : isDirty ? 'unsaved' : 'saved'}</span>
      </div>

      <div className="flex items-center gap-1 flex-1 justify-center">
        <button onClick={() => onZoomChange((value) => Math.max(40, value - 10))} className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors">
          <BiMinus size={12} />
        </button>
        <span className="text-[11px] text-white/30 w-10 text-center tabular-nums">{zoom}%</span>
        <button onClick={() => onZoomChange((value) => Math.min(200, value + 10))} className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors">
          <BiPlus size={12} />
        </button>
        <div className="h-3 w-px bg-white/10 mx-2" />
        <select
          value={compiler}
          onChange={(event) => onCompilerChange(event.target.value as Compiler)}
          className="bg-white/5 border border-white/10 rounded-sm px-2 py-1 text-[11px] text-white/55 outline-none focus:border-white/20"
        >
          {compilerOptions.map((option) => (
            <option key={option} value={option} className="bg-[#1B1913]">
              {option}
            </option>
          ))}
        </select>
        <div className="h-3 w-px bg-white/10 mx-2" />
        <button onClick={onDownload} disabled={!previewUrl} className="p-1.5 hover:bg-white/5 rounded-sm text-white/25 hover:text-white/60 transition-colors disabled:opacity-40" title="Download PDF">
          <BiDownload size={13} />
        </button>
      </div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <button
          onClick={onToggleAiPanel}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white/45 bg-white/5 border border-white/8 hover:border-white/20 hover:text-white/80 rounded-sm transition-all outline-none"
        >
          <Sparkles size={13} />
          {isAiPanelOpen ? 'Hide AI' : 'AI Assist'}
        </button>
        <button
          onClick={onSave}
          disabled={isSaving || isLoadingDoc}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white/45 bg-white/5 border border-white/8 hover:border-white/20 hover:text-white/80 rounded-sm transition-all outline-none disabled:opacity-50"
        >
          {isSaving ? <BiLoaderAlt size={13} className="animate-spin" /> : <BiSave size={13} />}
          Save
        </button>
        <button
          onClick={onCompile}
          disabled={isCompiling || isLoadingDoc}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-black/80 bg-[#F0EDE7] hover:bg-white rounded-sm transition-all outline-none disabled:opacity-60"
        >
          {isCompiling ? <BiLoaderAlt size={13} className="animate-spin" /> : <BiPlay size={13} />}
          {isCompiling ? 'Compiling...' : 'Compile'}
        </button>
      </div>
    </div>
  );
}
