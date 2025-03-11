"use client";

import SettingsPanel from "./components/SettingsPanel";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { SafeUser } from "@/modules/auth/auth.types";
import { authService } from "@/services/auth.service";
import { GiRoundShield } from "react-icons/gi";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import {
  FiFileText,
  FiMap,
  FiUser,
  FiMail,
  FiBell,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const navItems = [
  { href: "/dashboard/latex", label: "LaTeX", icon: FiFileText },
  {
    href: "/dashboard/portfolio",
    label: "Portfolio",
    icon: CiGlobe,
  },

  { href: "/dashboard/roadmap", label: "Roadmap", icon: FiMap },
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
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const isSettingsOpen = searchParams.get("modal") === "settings";

  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        router.replace("/login");
        return;
      }

      try {
        setIsUserLoading(true);
        const response = await authService.me();

        if (!isMounted) {
          return;
        }

        setCurrentUser(response.data);
      } catch {
        localStorage.removeItem("user_id");

        if (isMounted) {
          setCurrentUser(null);
          router.replace("/login");
        }
      } finally {
        if (isMounted) {
          setIsUserLoading(false);
        }
      }
    };

    void loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsOpen, pathname, router, searchParams]);

  const displayName =
    currentUser?.username ||
    currentUser?.email?.split("@")[0] ||
    (isUserLoading ? "Loading profile..." : "Unknown user");
  const displayEmail =
    currentUser?.email ||
    (isUserLoading ? "Fetching account..." : "No email found");
  const openSettings = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "settings");
    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };
  const closeSettings = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex h-screen bg-[#14120B] text-white overflow-hidden font-gothic">
      <aside
        className={`${
          collapsed ? "w-14" : "w-56"
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
                className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
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
          <button
            type="button"
            title={collapsed ? "Settings" : undefined}
            onClick={openSettings}
            className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 ${
              collapsed ? "justify-center" : ""
            } ${
              isSettingsOpen
                ? "bg-white/8 text-white/90"
                : "text-white/40 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            <FiSettings
              size={15}
              className={`shrink-0 ${
                isSettingsOpen ? "text-white/70" : "text-white/30"
              }`}
            />
            {!collapsed && <span>Settings</span>}
          </button>
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/* Collapsed — sirf icons */}
          {collapsed && (
            <div className="flex flex-col px-2 pb-2 gap-0.5 border-t border-white/5 pt-2">
              {profileItems.map(({ label, icon: Icon }) => (
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
                    {displayName}
                  </span>
                  <span className="text-[10px] text-white/30 truncate w-full">
                    {displayEmail}
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

      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
          onClick={closeSettings}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <SettingsPanel
              variant="modal"
              initialName={displayName}
              initialEmail={displayEmail}
              onClose={closeSettings}
            />
          </div>
        </div>
      )}
    </div>
  );
}
