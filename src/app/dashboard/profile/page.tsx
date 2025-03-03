"use client";

import { useRef, useState } from "react";
import {
  FiUser,
  FiMail,
  FiMoon,
  FiLogOut,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";

const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("Vikas Pal");
  const [tempName, setTempName] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://avatars.githubusercontent.com/u/113900393?v=4",
  );
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    setName(tempName);
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
    console.log("User logged out");
    setShowLogoutModal(false);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#14120B] font-gothic text-white">
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/5">
        <h1 className="text-xl tracking-tight text-white/90">Settings</h1>
        <p className="text-[11px] text-white/30 mt-1">
          Manage your account preferences and workspace settings.
        </p>
      </div>

      <div className="max-w-2xl px-8 py-6 space-y-6">
        {/* ── Profile ── */}
        <section>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Profile
          </p>

          <div className="bg-[#1B1913] border border-white/5 rounded-sm p-5 flex items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={avatar}
                alt="profile"
                className="h-14 w-14 rounded-full object-cover border border-white/10"
              />
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

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/25 mb-1">Username</p>
              {!isEditingName ? (
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white/80 truncate">{name}</p>
                  <button
                    onClick={() => setIsEditingName(true)}
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
          </div>
        </section>

        {/* ── Preferences ── */}
        <section>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Preferences
          </p>

          <div className="bg-[#1B1913] border border-white/5 rounded-sm divide-y divide-white/5">
            {/* Email notifications */}
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
                onClick={() => setEmailNotif((p) => !p)}
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

            {/* Dark mode */}
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
                onClick={() => setDarkMode((p) => !p)}
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

        {/* ── Account ── */}
        <section>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3">
            Account
          </p>

          <div className="bg-[#1B1913] border border-white/5 rounded-sm divide-y divide-white/5">
            {/* Log out */}
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

        {/* ── Danger Zone ── */}
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

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1B1913] border border-white/10 rounded-sm w-[90%] max-w-sm p-6">
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
};

export default Settings;
