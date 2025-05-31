'use client';

import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-white/90  mb-3">{children}</p>;
}

export function SkillTag({ value, onChange, onRemove }: { value: string; onChange: (v: string) => void; onRemove: () => void }) {
  const [editing, setEditing] = useState(false);
  return editing ? (
    <input
      autoFocus
      className="px-2 py-0.5 text-[14px] border border-white/20 text-white/70 rounded-sm bg-white/5 outline-none w-22 cursor-pointer "
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setEditing(false)}
      onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
    />
  ) : (
    <span className="group flex items-center gap-1 px-2 py-0.5 text-[10px] border border-white/10 text-white/50 rounded-sm bg-white/[0.03] cursor-text hover:border-white/20 transition-all">
      <span onClick={() => setEditing(true)}>{value}</span>
      <button onClick={onRemove} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
        <FiTrash2 size={14} />
      </button>
    </span>
  );
}

export function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/5 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <p className="text-[14px] text-white/25 uppercase tracking-widest mb-3">{label}</p>
      {children}
    </div>
  );
}
