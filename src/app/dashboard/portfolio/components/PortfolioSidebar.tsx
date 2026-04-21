'use client';

import { FiGlobe, FiCopy, FiCheck, FiZap, FiLock, FiEye, FiLink, FiUser, FiMail, FiGithub, FiLinkedin, FiExternalLink, FiChevronRight, FiSidebar } from 'react-icons/fi';
import type { PortfolioData } from '@/features/portfolio';
import { SidebarSection } from './SidebarWidgets';

interface PortfolioSidebarProps {
  data: PortfolioData;
  portfolioUrl: string;
  copied: boolean;
  rightSidebarOpen: boolean;
  totalSections: number;
  savePending: boolean;
  deployPending: boolean;
  statusMessage: string;
  statusTone: 'success' | 'error' | null;
  onCopy: () => void;
  onSave: () => void;
  onDeploy: () => void;
  onToggleSidebar: (open: boolean) => void;
  setField: <K extends keyof PortfolioData>(key: K, val: PortfolioData[K]) => void;
}

export function PortfolioSidebar({
  data,
  portfolioUrl,
  copied,
  rightSidebarOpen,
  totalSections,
  savePending,
  deployPending,
  statusMessage,
  statusTone,
  onCopy,
  onSave,
  onDeploy,
  onToggleSidebar,
  setField,
}: PortfolioSidebarProps) {
  return (
    <>
      {/* ── Collapsed peek tab (when sidebar hidden) ── */}
      {!rightSidebarOpen && (
        <button
          onClick={() => onToggleSidebar(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 bg-[#1E1C14] border border-white/10 border-r-0 rounded-l-md px-2 py-4 text-white/30 hover:text-white/60 hover:bg-[#252318] transition-all shadow-lg"
          title="Open panel"
        >
          <FiSidebar size={13} />
        </button>
      )}

      {/* ── Right Sidebar ── */}
      <div className={`shrink-0 border-l border-white/5 bg-black overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${rightSidebarOpen ? 'w-110' : 'w-0 border-l-0'}`}>
        <div className="w-110 flex flex-col h-full">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
            <span className="text-[10px] text-white/25 uppercase tracking-widest">Panel</span>
            <button
              onClick={() => onToggleSidebar(false)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] text-white/25 hover:text-white/60 hover:bg-white/5 border border-transparent hover:border-white/8 transition-all"
              title="Hide panel"
            >
              <FiChevronRight size={12} />
              <span>Hide</span>
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto">
            {/* Site Info */}
            <SidebarSection label="Site">
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-sm px-3 py-2">
                  <FiGlobe size={11} className="text-white/20 shrink-0" />
                  <span className="text-[11px] text-white/40 truncate flex-1">{portfolioUrl || 'Save your username to generate a link'}</span>
                  <button onClick={onCopy} disabled={!portfolioUrl} className="text-white/15 hover:text-white/50 transition-colors shrink-0">
                    {copied ? <FiCheck size={10} className="text-green-400" /> : <FiLink size={10} />}
                  </button>
                </div>
                <div className="flex items-center gap-2 px-1">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${data.isDeployed ? 'bg-green-400 animate-pulse' : 'bg-white/15'}`} />
                  <span className={`text-[10px] ${data.isDeployed ? 'text-green-400/70' : 'text-white/25'}`}>{!data.isDeployed ? 'Not deployed' : data.isPublic ? 'Live' : 'Private deployment'}</span>
                  {data.isDeployed && data.isPublic && portfolioUrl && (
                    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 text-[10px] text-white/25 hover:text-white/50 transition-colors">
                      <FiExternalLink size={9} /> Open
                    </a>
                  )}
                </div>
              </div>
            </SidebarSection>

            {/* Publish */}
            <SidebarSection label="Publish">
              <button
                onClick={onSave}
                disabled={savePending || deployPending}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12px] font-semibold text-white/75 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] rounded-sm transition-all mb-2 disabled:opacity-50"
              >
                <FiCheck size={12} />
                {savePending && !deployPending ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={onDeploy}
                disabled={savePending || deployPending}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12px] font-semibold text-black/80 bg-[#F0EDE7] hover:bg-white rounded-sm transition-all mb-3 disabled:opacity-50"
              >
                <FiZap size={12} />
                {savePending || deployPending ? 'Deploying...' : data.isDeployed ? 'Re-deploy' : 'Deploy'}
              </button>
              {statusMessage && (
                <div
                  className={`rounded-sm px-3 py-2.5 mb-3 border text-[11px] leading-relaxed ${
                    statusTone === 'error' ? 'bg-red-950/20 border-red-500/10 text-red-300/80' : 'bg-white/[0.03] border-white/5 text-white/45'
                  }`}
                >
                  {statusMessage}
                </div>
              )}
              {data.isDeployed && (
                <div className="bg-green-950/30 border border-green-500/10 rounded-sm px-3 py-2.5 space-y-2">
                  <p className="text-[11px] text-green-400 break-all leading-relaxed">{portfolioUrl}</p>
                  <button onClick={onCopy} className="flex items-center gap-1 text-[11px] text-green-400/50 hover:text-green-400 transition-colors">
                    {copied ? <FiCheck size={10} /> : <FiCopy size={10} />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              )}
            </SidebarSection>

            {/* Visibility */}
            <SidebarSection label="Visibility">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setField('isPublic', true)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[12px] transition-all border ${data.isPublic ? 'text-green-400 border-green-500/20 bg-green-950/20' : 'text-white/35 border-white/5 hover:border-white/10 hover:text-white/50'}`}
                >
                  <FiEye size={13} />
                  <div className="text-left flex-1">
                    <p className="font-medium leading-none">Public</p>
                    <p className="text-[10px] text-white/25 mt-0.5">Anyone with link</p>
                  </div>
                  {data.isPublic && <FiCheck size={10} className="text-green-400" />}
                </button>
                <button
                  onClick={() => setField('isPublic', false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[12px] transition-all border ${!data.isPublic ? 'text-amber-400 border-amber-500/20 bg-amber-950/20' : 'text-white/35 border-white/5 hover:border-white/10 hover:text-white/50'}`}
                >
                  <FiLock size={13} />
                  <div className="text-left flex-1">
                    <p className="font-medium leading-none">Private</p>
                    <p className="text-[10px] text-white/25 mt-0.5">Only you can see</p>
                  </div>
                  {!data.isPublic && <FiCheck size={10} className="text-amber-400" />}
                </button>
              </div>
            </SidebarSection>

            {/* Profile Details */}
            <SidebarSection label="Profile Details">
              <div className="space-y-2.5">
                {[
                  { Icon: FiUser, val: data.name },
                  { Icon: FiMail, val: data.email },
                  { Icon: FiGithub, val: data.github },
                  { Icon: FiLinkedin, val: data.linkedin },
                ].map(({ Icon, val }, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Icon size={11} className="text-white/20 shrink-0" />
                    <span className="text-[11px] text-white/40 truncate">{val || '—'}</span>
                  </div>
                ))}
              </div>
            </SidebarSection>

            {/* Content Stats */}
            <SidebarSection label="Content">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Skills', count: data.skills.length },
                  { label: 'Experience', count: data.experience.length },
                  { label: 'Projects', count: data.projects.length },
                  { label: 'Education', count: data.education.length },
                  { label: 'Activities', count: data.activities.length },
                  { label: 'Sections', count: totalSections },
                ].map(({ label, count }) => (
                  <div key={label} className="bg-white/[0.02] border border-white/5 rounded-sm px-2 py-2 text-center">
                    <p className="text-base text-white/60 font-medium leading-none">{count}</p>
                    <p className="text-[8px] text-white/20 mt-1 uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </SidebarSection>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/5 shrink-0">
            <p className="text-[9px] text-white/15 text-center">Helix AI · portfolio builder</p>
          </div>
        </div>
      </div>
    </>
  );
}
