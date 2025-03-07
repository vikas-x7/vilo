"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiRoundShield } from "react-icons/gi";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import {
  FiFileText,
  FiMap,
  FiUser,
  FiMail,
  FiBell,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navItems = [
  { href: "/dashboard/latex", label: "LaTeX", icon: FiFileText },
  {
    href: "/dashboard/portfolio",
    label: "Portfolio",
    icon: CiGlobe,
  },

  { href: "/dashboard/roadmap", label: "Roadmap", icon: FiMap },
  { href: "/dashboard/profile", label: "Profile", icon: FiUser },
];

const profileItems = [
  { label: "Help", icon: FiMail },
  { label: "Dark Mode", icon: FiBell },
  { label: "Settings", icon: FiSettings },
  { label: "Log out", icon: FiLogOut },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-[#14120B] text-white overflow-hidden font-gothic">
      <aside
        className={`${collapsed ? "w-14" : "w-56"
          } bg-[#1B1913] border-r border-white/5 hidden md:flex flex-col shrink-0 transition-all duration-300 ease-in-out relative`}
      >
        {/* Logo */}
        <div
          className={`px-4 py-4 border-b border-white/5 flex items-center justify-between ${collapsed ? "justify-center" : "gap-2"}`}
        >
          <div className="flex gap-1">
            {!collapsed && (
              <span className="text-sm tracking-tight text-white/70 flex gap-2">
                <GiRoundShield size={20} className="text-white/70 shrink-0" />
                Vilo
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className=" rounded-sm flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/25 transition-all duration-200"
          >
            {collapsed ? (
              <BsLayoutSidebarReverse size={15} />
            ) : (
              <BsLayoutSidebarReverse size={15} />
            )}
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
                className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 ${collapsed ? "justify-center" : ""
                  } ${isActive
                    ? "bg-white/8 text-white/90"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
              >
                <Icon
                  size={15}
                  className={`shrink-0 ${isActive ? "text-white/70" : "text-white/30"}`}
                />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/* Profile Items — always visible */}
          {!collapsed && (
            <div className="">
              <div className="border-t border-white/5 pt-3 pb-1 px-1">
                <p className="text-[10px] text-white/20 px-3 mb-1.5 uppercase tracking-widest">
                  Profile
                </p>
                {profileItems.map(({ label, icon: Icon, badge }: any) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/50 hover:text-white/90 hover:bg-white/5 rounded-sm transition-all duration-200"
                  >
                    <Icon size={15} className="text-white/30 shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    {badge && (
                      <span className="text-[10px] border border-white/15 text-white/40 px-1.5 py-0.5 rounded-sm">
                        {badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Collapsed — sirf icons */}
          {collapsed && (
            <div className="flex flex-col px-2 pb-2 gap-0.5 border-t border-white/5 pt-2">
              {profileItems.map(({ label, icon: Icon }: any) => (
                <button
                  key={label}
                  title={label}
                  className="flex justify-center py-2 text-white/30 hover:text-white/70 hover:bg-white/5 rounded-sm transition-all duration-200"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          )}

          {/* Terms */}

          {/* User Card */}
          <div className="border-t border-white/5">
            <div
              className={`w-full flex items-center gap-3 px-4 py-3 ${collapsed ? "justify-center" : ""}`}
            >
              <div className="w-7 h-7 rounded-sm bg-white/10 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                <FiUser size={13} className="text-white/40" />
              </div>
              {!collapsed && (
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-xs text-white/70 font-medium truncate w-full">
                    Hecham GAZHI
                  </span>
                  <span className="text-[10px] text-white/30 truncate w-full">
                    hechamgazhi@gmail.com
                  </span>
                </div>
              )}
            </div>
          </div>
          {!collapsed && (
            <div className="px-4 pb-3">
              <div className="border-t border-white/5 pt-3">
                <p className="text-[10px] text-neutral-600 leading-relaxed">
                  By accessing this dashboard, you agree to our terms of
                  service.
                </p>
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
