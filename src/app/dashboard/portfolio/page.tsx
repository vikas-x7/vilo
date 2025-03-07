/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { usePortfolioQuery, useSavePortfolio, useDeployPortfolio } from "@/features/portfolio/portfolio.hooks";
import {
  FiGlobe,
  FiCopy,
  FiCheck,
  FiPlus,
  FiTrash2,
  FiZap,
  FiEdit2,
  FiLock,
  FiEye,
  FiLink,
  FiUser,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiChevronRight,
  FiSidebar,
} from "react-icons/fi";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] text-white/20 uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

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

function SidebarSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/5 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const { data: qData, isLoading } = usePortfolioQuery();
  const saveMutation = useSavePortfolio();
  const deployMutation = useDeployPortfolio();

  const [data, setData] = useState(defaultData);

  useEffect(() => {
    if (qData) {
      setData(qData as any);
      if (qData.username) setDeployedUrl(`http://localhost:3000/${qData.username}`);
    }
  }, [qData]);

  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [deployedUrl, setDeployedUrl] = useState(`http://localhost:3000/${data.username}`);

  const handleSaveAndDeploy = async () => {
    try {
      await saveMutation.mutateAsync();
      const res = await deployMutation.mutateAsync();
      if (res && res.url) {
        setDeployedUrl(res.url);
      }
      setDeployed(true);
    } catch (e) {
      console.error("Failed to deploy:", e);
      alert("Deployment failed. Please try again.");
    }
  };

  const set = (key: keyof typeof defaultData, val: any) =>
    setData((p) => ({ ...p, [key]: val }));

  const updateItem = <K extends "experience" | "projects" | "education" | "activities">(
    key: K,
    id: number,
    patch: Partial<(typeof defaultData)[K][0]>,
  ) =>
    set(
      key,
      ((data[key] as any[])).map((x) => (x.id === id ? { ...x, ...patch } : x)),
    );

  const removeItem = <K extends "experience" | "projects" | "education" | "activities">(
    key: K,
    id: number,
  ) =>
    set(
      key,
      ((data[key] as any[])).filter((x) => x.id !== id),
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

  const totalSections =
    (data.experience.length > 0 ? 1 : 0) +
    (data.projects.length > 0 ? 1 : 0) +
    (data.education.length > 0 ? 1 : 0) +
    (data.activities.length > 0 ? 1 : 0) +
    (data.skills.length > 0 ? 1 : 0);

  return (
    <div className="flex flex-col h-screen bg-[#14120B] font-gothic text-white overflow-hidden">
      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ── Portfolio Canvas ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-10 space-y-10">
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
                      onChange={(v) =>
                        updateItem("projects", p.id, { name: v })
                      }
                      className="text-sm text-white/80 font-medium"
                      placeholder="Project Name"
                    />
                    <Editable
                      value={p.desc}
                      onChange={(v) =>
                        updateItem("projects", p.id, { desc: v })
                      }
                      className="text-[11px] text-white/35 mt-1 leading-relaxed"
                      placeholder="Short description"
                      multiline
                    />
                    <div className="flex items-center gap-1.5 mt-2 group/link">
                      <Editable
                        value={p.link}
                        onChange={(v) =>
                          updateItem("projects", p.id, { link: v })
                        }
                        className="text-[10px] text-white/20 flex-1"
                        placeholder="https://github.com/..."
                      />
                      {p.link && (
                        <button
                          onClick={() => navigator.clipboard.writeText(p.link)}
                          className="text-white/15 hover:text-white/50 transition-colors opacity-0 group-hover/link:opacity-100"
                        >
                          <FiCopy size={9} />
                        </button>
                      )}
                    </div>
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

        {/* ── Collapsed peek tab (when sidebar hidden) ── */}
        {!rightSidebarOpen && (
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 bg-[#1E1C14] border border-white/10 border-r-0 rounded-l-md px-2 py-4 text-white/30 hover:text-white/60 hover:bg-[#252318] transition-all shadow-lg"
            title="Open panel"
          >
            <FiSidebar size={13} />
          </button>
        )}

        {/* ── Right Sidebar ── */}
        <div
          className={`shrink-0 border-l border-white/5 bg-[#171510] overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${rightSidebarOpen ? "w-110" : "w-0 border-l-0"
            }`}
        >
          <div className="w-110 flex flex-col h-full">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
              <span className="text-[10px] text-white/25 uppercase tracking-widest">
                Panel
              </span>
              <button
                onClick={() => setRightSidebarOpen(false)}
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
                    <span className="text-[11px] text-white/40 truncate flex-1">
                      {deployedUrl}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-white/15 hover:text-white/50 transition-colors shrink-0"
                    >
                      {copied ? (
                        <FiCheck size={10} className="text-green-400" />
                      ) : (
                        <FiLink size={10} />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${deployed ? "bg-green-400 animate-pulse" : "bg-white/15"}`}
                    />
                    <span
                      className={`text-[10px] ${deployed ? "text-green-400/70" : "text-white/25"}`}
                    >
                      {deployed ? "Live" : "Not deployed"}
                    </span>
                    {deployed && (
                      <a
                        href={deployedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-[10px] text-white/25 hover:text-white/50 transition-colors"
                      >
                        <FiExternalLink size={9} /> Open
                      </a>
                    )}
                  </div>
                </div>
              </SidebarSection>

              {/* Publish */}
              <SidebarSection label="Publish">
                <button
                  onClick={handleSaveAndDeploy}
                  disabled={saveMutation.isPending || deployMutation.isPending}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-[12px] font-semibold text-black/80 bg-[#F0EDE7] hover:bg-white rounded-sm transition-all mb-3 disabled:opacity-50"
                >
                  <FiZap size={12} />
                  {saveMutation.isPending || deployMutation.isPending ? "Deploying..." : deployed ? "Re-deploy" : "Deploy"}
                </button>
                {deployed && (
                  <div className="bg-green-950/30 border border-green-500/10 rounded-sm px-3 py-2.5 space-y-2">
                    <p className="text-[11px] text-green-400 break-all leading-relaxed">
                      {deployedUrl}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[11px] text-green-400/50 hover:text-green-400 transition-colors"
                    >
                      {copied ? <FiCheck size={10} /> : <FiCopy size={10} />}
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                  </div>
                )}
              </SidebarSection>

              {/* Visibility */}
              <SidebarSection label="Visibility">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsPublic(true)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[12px] transition-all border ${isPublic ? "text-green-400 border-green-500/20 bg-green-950/20" : "text-white/35 border-white/5 hover:border-white/10 hover:text-white/50"}`}
                  >
                    <FiEye size={13} />
                    <div className="text-left flex-1">
                      <p className="font-medium leading-none">Public</p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        Anyone with link
                      </p>
                    </div>
                    {isPublic && (
                      <FiCheck size={10} className="text-green-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsPublic(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[12px] transition-all border ${!isPublic ? "text-amber-400 border-amber-500/20 bg-amber-950/20" : "text-white/35 border-white/5 hover:border-white/10 hover:text-white/50"}`}
                  >
                    <FiLock size={13} />
                    <div className="text-left flex-1">
                      <p className="font-medium leading-none">Private</p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        Only you can see
                      </p>
                    </div>
                    {!isPublic && (
                      <FiCheck size={10} className="text-amber-400" />
                    )}
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
                      <span className="text-[11px] text-white/40 truncate">
                        {val || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              {/* Content Stats */}
              <SidebarSection label="Content">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Skills", count: data.skills.length },
                    { label: "Experience", count: data.experience.length },
                    { label: "Projects", count: data.projects.length },
                    { label: "Education", count: data.education.length },
                    { label: "Activities", count: data.activities.length },
                    { label: "Sections", count: totalSections },
                  ].map(({ label, count }) => (
                    <div
                      key={label}
                      className="bg-white/[0.02] border border-white/5 rounded-sm px-2 py-2 text-center"
                    >
                      <p className="text-base text-white/60 font-medium leading-none">
                        {count}
                      </p>
                      <p className="text-[8px] text-white/20 mt-1 uppercase tracking-wide">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </SidebarSection>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 shrink-0">
              <p className="text-[9px] text-white/15 text-center">
                vilo.app · portfolio builder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
