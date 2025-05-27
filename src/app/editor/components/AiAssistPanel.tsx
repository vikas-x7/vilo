'use client';

import { X, Sparkles, WandSparkles } from 'lucide-react';
import type { LatexAssistantAction, LatexAssistantResponse } from '../editor.types';

interface AiAssistPanelProps {
  isOpen: boolean;
  prompt: string;
  isWorking: boolean;
  error: string | null;
  result: LatexAssistantResponse | null;
  canFix: boolean;
  onClose: () => void;
  onPromptChange: (prompt: string) => void;
  onRunAssistant: (action: LatexAssistantAction) => void;
}

export function AiAssistPanel({ isOpen, prompt, isWorking, error, result, canFix, onClose, onPromptChange, onRunAssistant }: AiAssistPanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute right-4 top-16 z-20 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#171510]/95 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-orange-200/60">Latex AI</p>
          <h3 className="mt-1 text-sm font-semibold text-white/85">Generate or fix code</h3>
        </div>

        <button type="button" onClick={onClose} className="rounded-full p-1 text-white/35 transition hover:bg-white/5 hover:text-white/70">
          <X size={16} />
        </button>
      </div>

      <p className="mt-3 text-xs leading-5 text-white/45">Describe the template or equations you need, or get help fixing compilation errors based on the context in the editor.</p>

      <div className="mt-4">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g., A research paper template with two columns, abstract, and sections for introduction and methods..."
          className="h-28 w-full resize-none rounded-xl border border-white/8 bg-black/25 p-3 text-[13px] text-white/80 placeholder:text-white/20 focus:border-white/20 focus:outline-none"
          disabled={isWorking}
        />

        <div className="mt-3 flex items-center justify-end gap-2">
          {canFix && (
            <button
              onClick={() => onRunAssistant('fix')}
              disabled={isWorking}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-medium text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <WandSparkles size={14} />
              Fix Errors
            </button>
          )}
          <button
            onClick={() => onRunAssistant('generate')}
            disabled={isWorking || !prompt.trim()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-orange-300/20 bg-orange-300/10 px-3 py-2 text-[12px] font-medium text-orange-200 transition hover:bg-orange-300/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={14} />
            {isWorking ? 'Working...' : 'Generate LaTeX'}
          </button>
        </div>
      </div>

      {error ? <div className="mt-3 rounded-xl border border-red-500/20 bg-red-950/30 p-3 text-xs text-red-300/90">{error}</div> : null}

      {result ? (
        <div className="mt-4 rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-white/90">{result.action === 'fix' ? 'Fix Details' : 'Generation Details'}</h4>
            <span className="text-[10px] text-white/35">{result.model}</span>
          </div>

          <p className="mt-2 text-[13px] leading-relaxed text-white/70">{result.summary}</p>

          {result.nextSteps.length > 0 ? (
            <div className="mt-3 space-y-1">
              <p className="text-[10px] uppercase text-white/40">Next Steps</p>
              <ul className="list-inside list-disc text-xs text-white/60">
                {result.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
