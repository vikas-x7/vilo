/* eslint-disable @next/next/no-img-element */
'use client';

import { FiPlus, FiTrash2, FiCopy, FiEdit2 } from 'react-icons/fi';
import type { PortfolioData } from '@/features/portfolio';
import { Editable } from './Editable';
import { SectionLabel, SkillTag } from './SidebarWidgets';

interface PortfolioCanvasProps {
  data: PortfolioData;
  avatarFallback: string;
  uploadingAvatar: boolean;
  avatarRef: React.RefObject<HTMLInputElement | null>;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setField: <K extends keyof PortfolioData>(key: K, val: PortfolioData[K]) => void;
  updateItem: <K extends 'experience' | 'projects' | 'education' | 'activities'>(key: K, id: number, patch: Partial<PortfolioData[K][number]>) => void;
  removeItem: <K extends 'experience' | 'projects' | 'education' | 'activities'>(key: K, id: number) => void;
}

export function PortfolioCanvas({ data, avatarFallback, uploadingAvatar, avatarRef, onAvatarChange, setField, updateItem, removeItem }: PortfolioCanvasProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 py-10 space-y-10">
        {/* Hero */}
        <div className="flex items-start gap-5 pb-8 border-b border-white/5">
          <div className="relative group shrink-0">
            {data.avatar ? (
              <img src={data.avatar} alt="avatar" className={`w-20 h-20 rounded-full border border-white/10 object-cover ${uploadingAvatar ? 'opacity-50' : ''}`} />
            ) : (
              <div className={`w-20 h-20 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-lg text-white/45 ${uploadingAvatar ? 'opacity-50' : ''}`}>
                {avatarFallback}
              </div>
            )}
            {uploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
              </div>
            )}
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={uploadingAvatar}
            >
              <FiEdit2 size={14} className="text-white/70" />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" hidden onChange={onAvatarChange} />
          </div>
          <div className="flex-1 space-y-1">
            <Editable tag="h1" value={data.name} onChange={(v) => setField('name', v)} className="text-2xl text-white/90 tracking-tight font-medium" placeholder="Your Name" />
            <Editable value={data.username} onChange={(v) => setField('username', v)} className="text-xs text-white/30" placeholder="username" />
            <Editable value={data.description} onChange={(v) => setField('description', v)} className="text-sm text-white/50 leading-relaxed mt-1" placeholder="A short bio..." multiline />
          </div>
        </div>

        {/* Skills */}
        <div>
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <SkillTag
                key={i}
                value={s}
                onChange={(v) =>
                  setField(
                    'skills',
                    data.skills.map((x, j) => (j === i ? v : x)),
                  )
                }
                onRemove={() =>
                  setField(
                    'skills',
                    data.skills.filter((_, j) => j !== i),
                  )
                }
              />
            ))}
            <button
              onClick={() => setField('skills', [...data.skills, 'New Skill'])}
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] border border-dashed border-white/10 text-white/25 rounded-sm hover:border-white/20 hover:text-white/50 transition-all"
            >
              <FiPlus size={9} /> Add
            </button>
          </div>
        </div>

        {/* Experience */}
        <div>
          <SectionLabel>Work Experience</SectionLabel>
          <div className="space-y-5">
            {data.experience.map((e) => (
              <div key={e.id} className="group border-l border-white/10 pl-4 relative">
                <button
                  onClick={() => removeItem('experience', e.id)}
                  className="absolute -left-3 top-0 w-5 h-5 bg-black border border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-400/30 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <FiTrash2 size={9} />
                </button>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <Editable value={e.role} onChange={(v) => updateItem('experience', e.id, { role: v })} className="text-sm text-white/80 font-medium" placeholder="Role" />
                  <span className="text-white/20 text-xs">@</span>
                  <Editable value={e.company} onChange={(v) => updateItem('experience', e.id, { company: v })} className="text-sm text-white/50" placeholder="Company" />
                </div>
                <Editable value={e.duration} onChange={(v) => updateItem('experience', e.id, { duration: v })} className="text-[11px] text-white/25 mt-0.5" placeholder="2022 – Present" />
                <Editable
                  value={e.desc}
                  onChange={(v) => updateItem('experience', e.id, { desc: v })}
                  className="text-xs text-white/40 mt-1.5 leading-relaxed"
                  placeholder="What did you do?"
                  multiline
                />
              </div>
            ))}
            <button
              onClick={() =>
                setField('experience', [
                  ...data.experience,
                  {
                    id: Date.now(),
                    role: 'Role',
                    company: 'Company',
                    duration: 'Year – Year',
                    desc: 'Description',
                  },
                ])
              }
              className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              <FiPlus size={11} /> Add Experience
            </button>
          </div>
        </div>

        {/* Projects */}
        <div>
          <SectionLabel>Projects</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.projects.map((p) => (
              <div key={p.id} className="group relative bg-[#0A0A0A] border border-white/5 rounded-sm p-4 hover:border-white/10 transition-all">
                <button
                  onClick={() => removeItem('projects', p.id)}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <FiTrash2 size={10} />
                </button>
                <Editable value={p.name} onChange={(v) => updateItem('projects', p.id, { name: v })} className="text-sm text-white/80 font-medium" placeholder="Project Name" />
                <Editable
                  value={p.desc}
                  onChange={(v) => updateItem('projects', p.id, { desc: v })}
                  className="text-[11px] text-white/35 mt-1 leading-relaxed"
                  placeholder="Short description"
                  multiline
                />
                <div className="flex items-center gap-1.5 mt-2 group/link">
                  <Editable value={p.link} onChange={(v) => updateItem('projects', p.id, { link: v })} className="text-[10px] text-white/20 flex-1" placeholder="https://github.com/..." />
                  {p.link && (
                    <button onClick={() => navigator.clipboard.writeText(p.link)} className="text-white/15 hover:text-white/50 transition-colors opacity-0 group-hover/link:opacity-100">
                      <FiCopy size={9} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setField('projects', [
                  ...data.projects,
                  {
                    id: Date.now(),
                    name: 'Project Name',
                    desc: 'Description',
                    link: '',
                  },
                ])
              }
              className="border border-dashed border-white/10 rounded-sm p-4 flex items-center justify-center gap-1.5 text-[11px] text-white/25 hover:border-white/20 hover:text-white/50 transition-all"
            >
              <FiPlus size={11} /> Add Project
            </button>
          </div>
        </div>

        {/* Activities */}
        <div>
          <SectionLabel>Activities & Hackathons</SectionLabel>
          <div className="space-y-3">
            {data.activities.map((a) => (
              <div key={a.id} className="group flex items-start justify-between">
                <div className="flex-1">
                  <Editable value={a.name} onChange={(v) => updateItem('activities', a.id, { name: v })} className="text-sm text-white/70" placeholder="Event name" />
                  <Editable value={a.result} onChange={(v) => updateItem('activities', a.id, { result: v })} className="text-[11px] text-white/30 mt-0.5" placeholder="Result / Achievement" />
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Editable value={a.year} onChange={(v) => updateItem('activities', a.id, { year: v })} className="text-[11px] text-white/20" placeholder="Year" />
                  <button onClick={() => removeItem('activities', a.id)} className="text-white/15 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                    <FiTrash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setField('activities', [
                  ...data.activities,
                  {
                    id: Date.now(),
                    name: 'Event Name',
                    result: 'Achievement',
                    year: '2024',
                  },
                ])
              }
              className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              <FiPlus size={11} /> Add Activity
            </button>
          </div>
        </div>

        {/* Education */}
        <div>
          <SectionLabel>Education</SectionLabel>
          <div className="space-y-4">
            {data.education.map((e) => (
              <div key={e.id} className="group border-l border-white/10 pl-4 relative">
                <button
                  onClick={() => removeItem('education', e.id)}
                  className="absolute -left-3 top-0 w-5 h-5 bg-black border border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-400/30 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <FiTrash2 size={9} />
                </button>
                <Editable value={e.degree} onChange={(v) => updateItem('education', e.id, { degree: v })} className="text-sm text-white/70" placeholder="Degree / Course" />
                <div className="flex items-center gap-2 mt-0.5">
                  <Editable value={e.school} onChange={(v) => updateItem('education', e.id, { school: v })} className="text-[11px] text-white/30" placeholder="Institution" />
                  <span className="text-white/15 text-[10px]">·</span>
                  <Editable value={e.year} onChange={(v) => updateItem('education', e.id, { year: v })} className="text-[11px] text-white/25" placeholder="Year" />
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setField('education', [
                  ...data.education,
                  {
                    id: Date.now(),
                    degree: 'Degree',
                    school: 'Institution',
                    year: 'Year',
                  },
                ])
              }
              className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              <FiPlus size={11} /> Add Education
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="pb-10">
          <SectionLabel>Contact</SectionLabel>
          <div className="flex flex-wrap gap-4">
            <Editable value={data.email} onChange={(v) => setField('email', v)} className="text-xs text-white/35" placeholder="Email" />
            <Editable value={data.github} onChange={(v) => setField('github', v)} className="text-xs text-white/35" placeholder="GitHub" />
            <Editable value={data.linkedin} onChange={(v) => setField('linkedin', v)} className="text-xs text-white/35" placeholder="LinkedIn" />
          </div>
        </div>
      </div>
    </div>
  );
}
