/* eslint-disable @next/next/no-img-element */
"use client";

import { PortfolioData } from "../types/portfolio.types";
import { FiGithub, FiLinkedin, FiExternalLink, FiMail } from "react-icons/fi";

interface Props {
  data: PortfolioData;
}

export default function PortfolioRenderer({ data }: Props) {
  const avatarFallback = (
    data.name.trim()[0] ??
    data.username.trim()[0] ??
    "U"
  ).toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-black  font-gothic text-white">
      <div className="w-3xl mx-auto px-8 py-10 space-y-10">
        {/* Hero */}
        <div className="flex items-start gap-5 pb-8 border-b border-white/5">
          {data.avatar ? (
            <img
              src={data.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full border border-white/10 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-lg text-white/45">
              {avatarFallback}
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl text-white/90 tracking-tight font-medium">
              {data.name}
            </h1>
            <p className=" text-white/30">@{data.username}</p>
            <p className="text-sm text-white/50 leading-relaxed mt-1">
              {data.description}
            </p>
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] border border-white/10 text-white/50 rounded-sm bg-white/[0.03]"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <Section title="Work Experience">
            <div className="space-y-5">
              {data.experience.map((e) => (
                <div key={e.id} className="border-l border-white/10 pl-4">
                  <div className="flex items-baseline gap-2 flex-wrap justify-between">
                    <p className="text-sm text-white/80 font-medium">
                      {e.role}
                    </p>
                    <p className="text-[11px] text-white/25 mt-0.5">
                      {e.duration}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-white/50">{e.company}</p>
                  </div>

                  <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <Section title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#1B1913] border border-white/5 rounded-sm p-4"
                >
                  <p className="text-sm text-white/80 font-medium">{p.name}</p>
                  <p className="text-[11px] text-white/35 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 mt-2 text-[10px] text-white/30 hover:text-white/60"
                    >
                      <FiExternalLink size={10} />
                      Visit
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-4">
              {data.education.map((e) => (
                <div key={e.id} className="border-l border-white/10 pl-4">
                  <p className="text-sm text-white/70">{e.degree}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    {e.school} · {e.year}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Activities */}
        {data.activities.length > 0 && (
          <Section title="Activities">
            <div className="space-y-3">
              {data.activities.map((a) => (
                <div key={a.id}>
                  <p className="text-sm text-white/70">{a.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    {a.result} · {a.year}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Contact */}
        <Section title="Contact">
          <div className="flex flex-wrap gap-4 text-xs text-white/40">
            {data.email && (
              <span className="flex items-center gap-1">
                <FiMail size={12} />
                {data.email}
              </span>
            )}
            {data.github && (
              <span className="flex items-center gap-1">
                <FiGithub size={12} />
                {data.github}
              </span>
            )}
            {data.linkedin && (
              <span className="flex items-center gap-1">
                <FiLinkedin size={12} />
                {data.linkedin}
              </span>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[9px] text-white/20 uppercase tracking-widest mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
