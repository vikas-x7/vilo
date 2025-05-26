'use client';

import { useState, useRef } from 'react';
import { FiEdit2 } from 'react-icons/fi';

export function Editable({
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit',
  multiline = false,
  tag: Tag = 'p',
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  tag?: React.ElementType;
}) {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  if (editing) {
    return multiline ? (
      <textarea
        autoFocus
        className={`${className} bg-white/5 border border-white/15 rounded-sm outline-none resize-none w-full px-1`}
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
      />
    ) : (
      <input
        autoFocus
        ref={ref}
        className={`${className} bg-white/5 border border-white/15 rounded-sm outline-none px-1 w-full`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
      />
    );
  }
  return (
    <Tag onClick={() => setEditing(true)} className={`${className} cursor-text hover:bg-white/5 rounded-sm px-1 -mx-1 transition-colors group relative`}>
      {value || <span className="text-white/20 italic">{placeholder}</span>}
      <FiEdit2 size={9} className="inline ml-1.5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Tag>
  );
}
