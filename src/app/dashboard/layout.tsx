'use client';

import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GiRoundShield } from 'react-icons/gi';
import { BsLayoutSidebarReverse } from 'react-icons/bs';
import { FiBriefcase, FiFileText, FiMap, FiUser } from 'react-icons/fi';
import { CiGlobe } from 'react-icons/ci';
import type { SafeUser } from '@/modules/auth/auth.types';
import { authService } from '@/services/auth.service';
import { DashboardSettingsControls, SettingsButtonFallback } from './components/DashboardSettingsControls';

const navItems = [
  { href: '/dashboard/latex', label: 'LaTeX', icon: FiFileText },
  { href: '/dashboard/jobs', label: 'Jobs', icon: FiBriefcase },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: CiGlobe },
  { href: '/dashboard/roadmap', label: 'Roadmap', icon: FiMap },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        router.replace('/login');
        return;
      }

      try {
        setIsUserLoading(true);
        const response = await authService.me();
        if (!isMounted) return;
        setCurrentUser(response.data);
      } catch {
        localStorage.removeItem('user_id');
        if (isMounted) {
          setCurrentUser(null);
          router.replace('/login');
        }
      } finally {
        if (isMounted) setIsUserLoading(false);
      }
    };

    void loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const displayName = currentUser?.username || currentUser?.email?.split('@')[0] || (isUserLoading ? 'Loading profile...' : 'Unknown user');
  const displayEmail = currentUser?.email || (isUserLoading ? 'Fetching account...' : 'No email found');

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-gothic">
      <aside className={`${collapsed ? 'w-14' : 'w-56'} bg-black border-r border-[#303030] hidden md:flex flex-col shrink-0 transition-all duration-300 ease-in-out relative`}>
        {/* Logo */}
        <div className={`px-4 py-2 border-b border-[#303030] flex items-center justify-between ${collapsed ? 'justify-center' : 'gap-2'}`}>
          <div className="flex gap-1">
            {!collapsed && (
              <div className="flex items-center gap-2 text-[#FAFAFA] text-[17px]">
                <img src="https://i.pinimg.com/736x/f6/77/82/f6778272ae65ab1c8a7c42520899250f.jpg" alt="" className="w-4 h-4 rounded-[1px]" />
                Helix AI
              </div>
            )}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className=" rounded-sm flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/25 transition-all duration-200">
            <BsLayoutSidebarReverse size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col text-sm mt-2 px-1 gap-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 ${collapsed ? 'justify-center' : ''} ${
                  isActive ? 'bg-white/8 text-white/90' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon size={15} className={`shrink-0 ${isActive ? 'text-white/70' : 'text-white/30'}`} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
          <Suspense fallback={<SettingsButtonFallback collapsed={collapsed} />}>
            <DashboardSettingsControls collapsed={collapsed} displayEmail={displayEmail} displayName={displayName} />
          </Suspense>
        </nav>

        <div className="mt-auto">
          <div className="border-t border-[#303030]">
            <div className={`w-full flex items-center gap-3 px-4 py-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-7 h-7 rounded-sm bg-white/10 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                <FiUser size={13} className="text-white/40" />
              </div>
              {!collapsed && (
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-xs text-white/70 font-medium truncate w-full">{displayName}</span>
                  <span className="text-[10px] text-white/30 truncate w-full">{displayEmail}</span>
                </div>
              )}
            </div>
          </div>
          {!collapsed && (
            <div className="px-4 pb-3">
              <div className="border-t border-[#303030] pt-3">
                <p className="text-[10px] text-neutral-600 leading-relaxed">By accessing this dashboard, you agree to our terms of service.</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
