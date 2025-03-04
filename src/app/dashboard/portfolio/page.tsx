"use client";

import { useState, useRef } from "react";
import {
  FiGlobe,
  FiCopy,
  FiCheck,
  FiPlus,
  FiTrash2,
  FiZap,
  FiEdit2,
} from "react-icons/fi";

// ── Types ──────────────────────────────────────────────
type Experience = {
  id: number;
  role: string;
  company: string;
  duration: string;
  desc: string;
};
type Project = { id: number; name: string; desc: string; link: string };
type Education = { id: number; degree: string; school: string; year: string };
type Activity = { id: number; name: string; result: string; year: string };

const defaultData = {
  name: "Vikas Pal",
  username: "vikaspal",
  avatar: "https://avatars.githubusercontent.com/u/113900393?v=4",
  description: "Full Stack Developer passionate about building great products.",
  skills: ["React", "TypeScript", "Node.js", "TailwindCSS"],
  experience: [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Acme Corp",
      duration: "2022 – Present",
      desc: "Built scalable UI components.",
    },
  ] as Experience[],
  projects: [
    {
      id: 1,
      name: "Portfolio Builder",
      desc: "A drag-and-drop portfolio tool.",
      link: "https://github.com",
    },
  ] as Project[],
  education: [
    {
      id: 1,
      degree: "B.Tech Computer Science",
      school: "ABC University",
      year: "2018 – 2022",
    },
  ] as Education[],
  activities: [
    {
      id: 1,
      name: "HackTheNorth 2023",
      result: "Top 10 Finalist",
      year: "2023",
    },
  ] as Activity[],
  email: "vikas@example.com",
  github: "github.com/vikaspal",
  linkedin: "linkedin.com/in/vikaspal",
};

// ── Editable Text ──────────────────────────────────────
function Editable({
  value,
  onChange,
  className = "",
  placeholder = "Click to edit",
  multiline = false,
  tag: Tag = "p",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  tag?: any;
}) {
  const [editing, setEditing] = useState(false);
  const ref = useRef<any>(null);

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
        onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
      />
    );
  }

  return (
    <Tag
      onClick={() => setEditing(true)}
      className={`${className} cursor-text hover:bg-white/5 rounded-sm px-1 -mx-1 transition-colors group relative`}
    >
      {value || <span className="text-white/20 italic">{placeholder}</span>}
      <FiEdit2
        size={9}
        className="inline ml-1.5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </Tag>
  );
}

// ── Section Label ──────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] text-white/20 uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

// ── Tag (skill) ────────────────────────────────────────
function SkillTag({
  value,
  onChange,
  onRemove,
}: {
  value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);
  return editing ? (
    <input
      autoFocus
      className="px-2 py-0.5 text-[10px] border border-white/20 text-white/70 rounded-sm bg-white/5 outline-none w-24"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setEditing(false)}
      onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
    />
  ) : (
    <span className="group flex items-center gap-1 px-2 py-0.5 text-[10px] border border-white/10 text-white/50 rounded-sm bg-white/[0.03] cursor-text hover:border-white/20 transition-all">
      <span onClick={() => setEditing(true)}>{value}</span>
      <button
        onClick={onRemove}
        className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <FiTrash2 size={8} />
      </button>
    </span>
  );
}

// ── Main ───────────────────────────────────────────────
export default function PortfolioPage() {
  const [data, setData] = useState(defaultData);
  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const deployedUrl = `https://vilo.app/${data.username}`;

  const set = (key: keyof typeof defaultData, val: any) =>
    setData((p) => ({ ...p, [key]: val }));

  const updateItem = <T extends { id: number }>(
    key: keyof typeof defaultData,
    id: number,
    patch: Partial<T>,
  ) =>
    set(
      key,
      (data[key] as T[]).map((x) => (x.id === id ? { ...x, ...patch } : x)),
    );

  const removeItem = <T extends { id: number }>(
    key: keyof typeof defaultData,
    id: number,
  ) =>
    set(
      key,
      (data[key] as T[]).filter((x) => x.id !== id),
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(deployedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) set("avatar", URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col h-screen bg-[#14120B] font-gothic text-white overflow-hidden">
      {/* ── Topbar ── */}
      <div className="px-6 py-3.5 border-b border-white/5 bg-[#1B1913] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <FiGlobe size={13} className="text-white/30" />
          <span className="text-[11px] text-white/30">{deployedUrl}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/20 mr-1">
            Click any text to edit
          </span>
          {deployed && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-white/50 bg-white/5 border border-white/10 hover:border-white/20 hover:text-white/80 rounded-sm transition-all"
            >
              {copied ? (
                <FiCheck size={11} className="text-green-400" />
              ) : (
                <FiCopy size={11} />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          )}
          <button
            onClick={() => setDeployed(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-black/80 bg-[#F0EDE7] hover:bg-[#F0EDE7]/90 rounded-sm transition-all"
          >
            <FiZap size={11} />
            {deployed ? "Re-deploy" : "Deploy"}
          </button>
        </div>
      </div>

      {/* Deployed badge */}
      {deployed && (
        <div className="px-6 py-2 bg-green-950/30 border-b border-green-500/10 flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-[10px] text-green-400/70">
            Live at <span className="text-green-400">{deployedUrl}</span>
          </p>
        </div>
      )}

      {/* ── Portfolio Canvas ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
          {/* Hero */}
          <div className="flex items-start gap-5 pb-8 border-b border-white/5">
            <div className="relative group shrink-0">
              <img
                src={data.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-full border border-white/10 object-cover"
              />
              <button
                onClick={() => avatarRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiEdit2 size={14} className="text-white/70" />
              </button>
              <input
                ref={avatarRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1 space-y-1">
              <Editable
                tag="h1"
                value={data.name}
                onChange={(v) => set("name", v)}
                className="text-2xl text-white/90 tracking-tight font-medium"
                placeholder="Your Name"
              />
              <Editable
                value={data.username}
                onChange={(v) => set("username", v)}
                className="text-xs text-white/30"
                placeholder="username"
              />
              <Editable
                value={data.description}
                onChange={(v) => set("description", v)}
                className="text-sm text-white/50 leading-relaxed mt-1"
                placeholder="A short bio..."
                multiline
              />
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
                    set(
                      "skills",
                      data.skills.map((x, j) => (j === i ? v : x)),
                    )
                  }
                  onRemove={() =>
                    set(
                      "skills",
                      data.skills.filter((_, j) => j !== i),
                    )
                  }
                />
              ))}
              <button
                onClick={() => set("skills", [...data.skills, "New Skill"])}
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
                <div
                  key={e.id}
                  className="group border-l border-white/10 pl-4 relative"
                >
                  <button
                    onClick={() => removeItem("experience", e.id)}
                    className="absolute -left-3 top-0 w-5 h-5 bg-[#14120B] border border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-400/30 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <FiTrash2 size={9} />
                  </button>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <Editable
                      value={e.role}
                      onChange={(v) =>
                        updateItem("experience", e.id, { role: v })
                      }
                      className="text-sm text-white/80 font-medium"
                      placeholder="Role"
                    />
                    <span className="text-white/20 text-xs">@</span>
                    <Editable
                      value={e.company}
                      onChange={(v) =>
                        updateItem("experience", e.id, { company: v })
                      }
                      className="text-sm text-white/50"
                      placeholder="Company"
                    />
                  </div>
                  <Editable
                    value={e.duration}
                    onChange={(v) =>
                      updateItem("experience", e.id, { duration: v })
                    }
                    className="text-[11px] text-white/25 mt-0.5"
                    placeholder="2022 – Present"
                  />
                  <Editable
                    value={e.desc}
                    onChange={(v) =>
                      updateItem("experience", e.id, { desc: v })
                    }
                    className="text-xs text-white/40 mt-1.5 leading-relaxed"
                    placeholder="What did you do?"
                    multiline
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  set("experience", [
                    ...data.experience,
                    {
                      id: Date.now(),
                      role: "Role",
                      company: "Company",
                      duration: "Year – Year",
                      desc: "Description",
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
                <div
                  key={p.id}
                  className="group relative bg-[#1B1913] border border-white/5 rounded-sm p-4 hover:border-white/10 transition-all"
                >
                  <button
                    onClick={() => removeItem("projects", p.id)}
                    className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <FiTrash2 size={10} />
                  </button>
                  <Editable
                    value={p.name}
                    onChange={(v) => updateItem("projects", p.id, { name: v })}
                    className="text-sm text-white/80 font-medium"
                    placeholder="Project Name"
                  />
                  <Editable
                    value={p.desc}
                    onChange={(v) => updateItem("projects", p.id, { desc: v })}
                    className="text-[11px] text-white/35 mt-1 leading-relaxed"
                    placeholder="Short description"
                    multiline
                  />
                  <Editable
                    value={p.link}
                    onChange={(v) => updateItem("projects", p.id, { link: v })}
                    className="text-[10px] text-white/20 mt-2"
                    placeholder="https://github.com/..."
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  set("projects", [
                    ...data.projects,
                    {
                      id: Date.now(),
                      name: "Project Name",
                      desc: "Description",
                      link: "",
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
                <div
                  key={a.id}
                  className="group flex items-start justify-between"
                >
                  <div className="flex-1">
                    <Editable
                      value={a.name}
                      onChange={(v) =>
                        updateItem("activities", a.id, { name: v })
                      }
                      className="text-sm text-white/70"
                      placeholder="Event name"
                    />
                    <Editable
                      value={a.result}
                      onChange={(v) =>
                        updateItem("activities", a.id, { result: v })
                      }
                      className="text-[11px] text-white/30 mt-0.5"
                      placeholder="Result / Achievement"
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Editable
                      value={a.year}
                      onChange={(v) =>
                        updateItem("activities", a.id, { year: v })
                      }
                      className="text-[11px] text-white/20"
                      placeholder="Year"
                    />
                    <button
                      onClick={() => removeItem("activities", a.id)}
                      className="text-white/15 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <FiTrash2 size={10} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  set("activities", [
                    ...data.activities,
                    {
                      id: Date.now(),
                      name: "Event Name",
                      result: "Achievement",
                      year: "2024",
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
                <div
                  key={e.id}
                  className="group border-l border-white/10 pl-4 relative"
                >
                  <button
                    onClick={() => removeItem("education", e.id)}
                    className="absolute -left-3 top-0 w-5 h-5 bg-[#14120B] border border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-400/30 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <FiTrash2 size={9} />
                  </button>
                  <Editable
                    value={e.degree}
                    onChange={(v) =>
                      updateItem("education", e.id, { degree: v })
                    }
                    className="text-sm text-white/70"
                    placeholder="Degree / Course"
                  />
                  <div className="flex items-center gap-2 mt-0.5">
                    <Editable
                      value={e.school}
                      onChange={(v) =>
                        updateItem("education", e.id, { school: v })
                      }
                      className="text-[11px] text-white/30"
                      placeholder="Institution"
                    />
                    <span className="text-white/15 text-[10px]">·</span>
                    <Editable
                      value={e.year}
                      onChange={(v) =>
                        updateItem("education", e.id, { year: v })
                      }
                      className="text-[11px] text-white/25"
                      placeholder="Year"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  set("education", [
                    ...data.education,
                    {
                      id: Date.now(),
                      degree: "Degree",
                      school: "Institution",
                      year: "Year",
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
              <Editable
                value={data.email}
                onChange={(v) => set("email", v)}
                className="text-xs text-white/35"
                placeholder="Email"
              />
              <Editable
                value={data.github}
                onChange={(v) => set("github", v)}
                className="text-xs text-white/35"
                placeholder="GitHub"
              />
              <Editable
                value={data.linkedin}
                onChange={(v) => set("linkedin", v)}
                className="text-xs text-white/35"
                placeholder="LinkedIn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
