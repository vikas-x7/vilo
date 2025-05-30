'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiSettings } from 'react-icons/fi';
import SettingsPanel from './SettingsPanel';

interface DashboardSettingsControlsProps {
  collapsed: boolean;
  displayEmail: string;
  displayName: string;
}

export function DashboardSettingsControls({ collapsed, displayEmail, displayName }: DashboardSettingsControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSettingsOpen = searchParams.get('modal') === 'settings';

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.delete('modal');
      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSettingsOpen, pathname, router, searchParams]);

  const openSettings = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('modal', 'settings');
    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const closeSettings = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('modal');
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <>
      <button
        type="button"
        title={collapsed ? 'Settings' : undefined}
        onClick={openSettings}
        className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 ${collapsed ? 'justify-center' : ''} ${
          isSettingsOpen ? 'bg-white/8 text-white/90' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
        }`}
      >
        <FiSettings size={15} className={`shrink-0 ${isSettingsOpen ? 'text-white/70' : 'text-white/30'}`} />
        {!collapsed && <span>Settings</span>}
      </button>

      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4" onClick={closeSettings}>
          <div className="w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <SettingsPanel variant="modal" initialName={displayName} initialEmail={displayEmail} onClose={closeSettings} />
          </div>
        </div>
      )}
    </>
  );
}

export function SettingsButtonFallback({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-sm text-white/20 ${collapsed ? 'justify-center' : ''}`}>
      <FiSettings size={15} className="shrink-0 text-white/20" />
      {!collapsed && <span>Settings</span>}
    </div>
  );
}
