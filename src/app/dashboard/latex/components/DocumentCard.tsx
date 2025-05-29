'use client';

import Link from 'next/link';
import { FiFileText, FiTrash2 } from 'react-icons/fi';
import type { LatexDocument } from '../latex.utils';
import { formatUpdatedAt } from '../latex.utils';

interface DocumentCardProps {
  doc: LatexDocument;
  onRequestDelete: (id: number, name: string) => void;
}

export function DocumentCard({ doc, onRequestDelete }: DocumentCardProps) {
  return (
    <div className="group relative flex flex-col bg-[#1B1913] border border-white/5 rounded-sm overflow-hidden hover:border-white/15 transition-all duration-300 aspect-[3/4]">
      {/* Mock paper preview */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0F0E09] p-4 gap-1.5 ">
        <FiFileText size={28} className="text-white/15" />
        <div className="w-full space-y-1.5 mt-2">
          {[80, 60, 70, 50, 65].map((w, i) => (
            <div key={i} className="h-px bg-white/8 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="px-3 py-2.5 border-t border-white/5">
        <p className="text-xs text-white/70 font-medium truncate">{doc.title}</p>
        <p className="text-[10px] text-white/25 mt-0.5">{formatUpdatedAt(doc.updatedAt)}</p>
      </div>

      {/* Hover actions */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
        <Link href={`/dashboard/latex/editor?doc=${doc.id}`} className="px-3 py-1.5 bg-[#F0EDE7] text-black/80 text-[10px] font-semibold rounded-sm hover:bg-[#F0EDE7]/90 transition-all">
          Open
        </Link>
        <button
          onClick={() => onRequestDelete(doc.id, doc.title)}
          className="p-1.5 bg-white/10 border border-white/10 rounded-sm text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all"
        >
          <FiTrash2 size={12} />
        </button>
      </div>
    </div>
  );
}
