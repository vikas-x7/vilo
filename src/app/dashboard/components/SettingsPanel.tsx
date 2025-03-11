/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiMoon,
  FiLogOut,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";

interface SettingsPanelProps {
  initialName?: string;
  initialEmail?: string;
  onClose?: () => void;
  variant?: "page" | "modal";
}

export default function SettingsPanel({
  initialName = "Unknown user",
  initialEmail = "No email found",
  onClose,
  variant = "page",
}: SettingsPanelProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [tempName, setTempName] = useState(initialName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const name = savedName ?? initialName;

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    setSavedName(tempName.trim());
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName(name);
    setIsEditingName(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_id");
    }

    setShowLogoutModal(false);
    onClose?.();
    router.replace("/login");
  };

  const avatarInitial = (name.trim()[0] ?? initialEmail[0] ?? "U").toUpperCase();
  const panelClasses =
    variant === "modal"
      ? "w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#14120B] font-gothic text-white shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
      : "h-full w-full overflow-y-auto bg-[#14120B] font-gothic text-white";
  const headerClasses =
    variant === "modal"
      ? "sticky top-0 z-10 border-b border-white/5 bg-[#14120B]/95 px-8 py-6 backdrop-blur"
      : "px-8 py-6 border-b border-white/5";

  return (
    <div className={panelClasses}>
      <div className={headerClasses}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl tracking-tight text-white/90">Settings</h1>
            <p className="text-[11px] text-white/30 mt-1">
              Manage your account preferences and workspace settings.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-sm border border-white/10 bg-white/5 p-2 text-white/40 transition-all hover:border-white/20 hover:text-white/80"
              aria-label="Close settings"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl px-8 py-6 space-y-6">
        <section>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Account Details
          </p>

          <div className="bg-[#1B1913] border border-white/5 rounded-sm p-5 flex items-start gap-5">
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt="profile"
                  className="h-14 w-14 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/70 flex items-center justify-center">
                  {avatarInitial}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F0EDE7] rounded-full flex items-center justify-center text-black/70 hover:bg-white transition-all"
              >
                <FiEdit2 size={10} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex-1 min-w-0 space-y-4">
              <div>
                <p className="text-[10px] text-white/25 mb-1">Name</p>
                {!isEditingName ? (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-white/80 truncate">{name}</p>
                    <button
                      onClick={() => {
                        setTempName(name);
                        setIsEditingName(true);
                      }}
                      className="text-white/30 hover:text-white/70 transition-colors shrink-0"
                    >
                      <FiEdit2 size={13} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white/80 outline-none focus:border-white/20 transition-all"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 bg-[#F0EDE7] rounded-sm text-black/70 hover:bg-white transition-all"
                    >
                      <FiCheck size={12} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-1.5 bg-white/5 border border-white/10 rounded-sm text-white/40 hover:text-white/70 transition-all"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] text-white/25 mb-1">Email</p>
                <p className="text-sm text-white/65 break-all">{initialEmail}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Preferences
          </p>

          <div className="bg-[#1B1913] border border-white/5 rounded-sm divide-y divide-white/5">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <FiMail size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-sm text-white/70">Email notifications</p>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    Receive updates about tasks and mentions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotif((current) => !current)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
                  emailNotif ? "bg-[#F0EDE7]/80" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    emailNotif ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <FiMoon size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-sm text-white/70">Dark mode</p>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    Reduce eye strain in low light
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode((current) => !current)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
                  darkMode ? "bg-[#F0EDE7]/80" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Account
          </p>

          <div className="bg-[#1B1913] border border-white/5 rounded-sm divide-y divide-white/5">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <FiLogOut size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-sm text-white/70">Log out</p>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    End your current session on this device
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-3 py-1.5 text-xs text-white/50 bg-white/5 border border-white/10 hover:border-white/20 hover:text-white/80 rounded-sm transition-all"
              >
                Log out
              </button>
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10px] text-red-500/50 uppercase tracking-widest mb-3">
            Danger Zone
          </p>
          <div className="bg-red-950/20 border border-red-500/10 rounded-sm px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FiTrash2 size={14} className="text-red-400/50 shrink-0" />
              <div>
                <p className="text-sm text-white/60">Delete account</p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  Permanently delete your account and all associated data.
                </p>
              </div>
            </div>
            <button className="px-3 py-1.5 text-xs text-red-400/70 bg-red-500/10 border border-red-500/15 hover:border-red-500/30 hover:text-red-400 rounded-sm transition-all shrink-0">
              Delete
            </button>
          </div>
        </section>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1B1913] border border-white/10 rounded-sm w-full max-w-sm p-6">
            <h3 className="text-sm text-white/80 font-medium mb-1">
              Confirm logout
            </h3>
            <p className="text-[11px] text-white/30 mb-5">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-3 py-1.5 text-xs text-white/40 bg-white/5 border border-white/10 hover:text-white/70 rounded-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs text-red-400/80 bg-red-500/10 border border-red-500/15 hover:border-red-500/30 hover:text-red-400 rounded-sm transition-all"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
