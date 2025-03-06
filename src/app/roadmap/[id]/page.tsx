"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiBookmark, FiShare2 } from "react-icons/fi";

const roadmaps = [
  {
    id: "frontend",
    name: "Frontend",
    desc: "HTML, CSS, JavaScript, React and modern UI frameworks.",
    image:
      "https://i.pinimg.com/736x/22/66/35/22663574174366c551d7753f72e1db64.jpg",
  },
  {
    id: "backend",
    name: "Backend",
    desc: "Servers, databases, APIs and backend architecture.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
  },
  {
    id: "full-stack",
    name: "Full Stack",
    desc: "End-to-end development from UI to server and database.",
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=200&fit=crop",
  },
  {
    id: "devops",
    name: "DevOps",
    desc: "CI/CD pipelines, Docker, Kubernetes and cloud infrastructure.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop",
  },
  {
    id: "devsecops",
    name: "DevSecOps",
    desc: "Security practices integrated into the DevOps lifecycle.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=200&fit=crop",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    desc: "Data cleaning, visualization and business intelligence.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    desc: "Building and deploying AI models and intelligent systems.",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop",
  },
  {
    id: "ai-data-scientist",
    name: "AI and Data Scientist",
    desc: "ML algorithms, statistical modeling and deep learning.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop",
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    desc: "Data pipelines, warehousing and large-scale data systems.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop",
  },
  {
    id: "android",
    name: "Android",
    desc: "Native Android development with Kotlin and Jetpack.",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=200&fit=crop",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    desc: "Supervised, unsupervised learning and neural networks.",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    desc: "Relational database design, queries and optimization.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop",
  },
  {
    id: "ios",
    name: "iOS",
    desc: "Native iOS development with Swift and SwiftUI.",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=200&fit=crop",
  },
  {
    id: "blockchain",
    name: "Blockchain",
    desc: "Smart contracts, Web3 and decentralized applications.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
  },
  {
    id: "qa",
    name: "QA",
    desc: "Testing strategies, automation and quality assurance practices.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
  },
  {
    id: "software-architect",
    name: "Software Architect",
    desc: "System design, patterns and scalable architecture.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    desc: "Threat analysis, ethical hacking and security protocols.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
  },
  {
    id: "ux-design",
    name: "UX Design",
    desc: "User research, wireframing, prototyping and design systems.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
  },
  {
    id: "technical-writer",
    name: "Technical Writer",
    desc: "Docs, API references and developer communication.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=200&fit=crop",
  },
  {
    id: "game-developer",
    name: "Game Developer",
    desc: "Game engines, physics, rendering and game design.",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
  },
  {
    id: "server-side-game-developer",
    name: "Server Side Game Developer",
    desc: "Multiplayer backends, game servers and networking.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
  },
  {
    id: "mlops",
    name: "MLOps",
    desc: "ML model deployment, monitoring and lifecycle management.",
    image:
      "https://images.unsplash.com/photo-1586953208270-680716ae0afe?w=400&h=200&fit=crop",
  },
  {
    id: "product-manager",
    name: "Product Manager",
    desc: "Roadmaps, stakeholder management and product strategy.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=200&fit=crop",
  },
  {
    id: "engineering-manager",
    name: "Engineering Manager",
    desc: "Team leadership, hiring and engineering culture.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
  },
  {
    id: "developer-relations",
    name: "Developer Relations",
    desc: "Community building, advocacy and developer experience.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop",
  },
  {
    id: "bi-analyst",
    name: "BI Analyst",
    desc: "Business intelligence, dashboards and data-driven decisions.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
  },
];

export default function RoadmapDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const roadmap = roadmaps.find((r) => r.id === id);

  if (!roadmap) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white/40">
        <p>Roadmap not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-xs hover:text-white transition-colors"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14120B] text-white font-gothic pb-20">
      {/* Top Navigation */}
      <div className="border-b border-white/5 bg-[#1B1913]/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs"
          >
            <FiArrowLeft size={14} />
            <span>Back to Roadmaps</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="text-white/40 hover:text-white/80 transition-colors">
              <FiShare2 size={16} />
            </button>
            <button className="text-white/40 hover:text-white/80 transition-colors">
              <FiBookmark size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <div className="rounded-sm overflow-hidden border border-white/10 aspect-video md:aspect-square relative group">
              <img
                src="https://i.pinimg.com/1200x/97/4d/ef/974def37a889f0b0707d65bf6d0fd62a.jpg"
                alt={roadmap.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120B] to-transparent opacity-60" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4">
              {roadmap.name} Roadmap
            </h1>
            <p className="text-white/40 leading-relaxed max-w-2xl mb-8">
              {roadmap.desc} This comprehensive guide will take you through everything you need to know to master {roadmap.name} development in 2024 and beyond.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[11px] text-white/50 uppercase tracking-wider font-medium">
                Comprehensive
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[11px] text-white/50 uppercase tracking-wider font-medium">
                Step-by-step
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[11px] text-white/50 uppercase tracking-wider font-medium">
                Interactive
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="border-t border-white/5 mt-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content Sidebar/TOC */}
            <div className="hidden lg:block lg:col-span-1 border-r border-white/5 pr-8 h-fit sticky top-28">
              <h3 className="text-[10px] text-white/20 uppercase tracking-[0.2em] mb-6">Contents</h3>
              <div className="space-y-4">
                {["Overview", "Prerequisites", "Core Concepts", "Advanced Skills", "Projects", "Resources"].map((item) => (
                  <div key={item} className="text-sm text-white/30 hover:text-white/70 cursor-pointer transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Roadmap Content Placeholder */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                <section>
                  <h2 className="text-xl text-white/80 mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-[10px] border border-white/10">01</span>
                    Getting Started
                  </h2>
                  <div className="pl-9 space-y-4">
                    <p className="text-sm text-white/40 leading-relaxed">
                      Begin your journey by understanding the fundamental principles and setting up your environment.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Environment Setup", "Basic Concepts", "Tools and IDEs"].map((node) => (
                        <div key={node} className="p-4 bg-[#1B1913] border border-white/5 rounded-sm hover:border-white/15 transition-all group cursor-pointer">
                          <p className="text-xs text-white/60 group-hover:text-white/90">{node}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl text-white/80 mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-[10px] border border-white/10">02</span>
                    The Fundamentals
                  </h2>
                  <div className="pl-9 space-y-4">
                    <p className="text-sm text-white/40 leading-relaxed">
                      Deep dive into the core technologies that form the backbone of {roadmap.name}.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Syntax and Structure", "Best Practices", "Workflows"].map((node) => (
                        <div key={node} className="p-4 bg-[#1B1913] border border-white/5 rounded-sm hover:border-white/15 transition-all group cursor-pointer">
                          <p className="text-xs text-white/60 group-hover:text-white/90">{node}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="p-8 bg-white/[0.02] border border-dashed border-white/10 rounded-sm text-center">
                  <p className="text-xs text-white/20">More sections coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

