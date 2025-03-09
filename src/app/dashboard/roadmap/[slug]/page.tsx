// "use client";

// import { useCallback, useState } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesChange,
//   useEdgesChange,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
//   Position,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { FiCheckCircle, FiCircle, FiChevronRight } from "react-icons/fi";

// // ─── Custom Node ────────────────────────────────────────────────────────────
// function RoadmapNode({ data }) {
//   const [done, setDone] = useState(false);

//   const tagColors = {
//     required: "bg-white/10 text-white/50",
//     optional: "bg-yellow-500/10 text-yellow-400/60",
//     advanced: "bg-blue-500/10 text-blue-400/60",
//     start: "bg-emerald-500/10 text-emerald-400/70",
//   };

//   return (
//     <div
//       onClick={() => setDone((p) => !p)}
//       className={`
//         group relative cursor-pointer select-none
//         bg-[#1B1913] border rounded-sm
//         transition-all duration-200 min-w-[180px] max-w-[220px]
//         ${done ? "border-white/25 opacity-70" : "border-white/8 hover:border-white/20"}
//       `}
//       style={{
//         boxShadow: done ? "0 0 0 1px rgba(255,255,255,0.08)" : "none",
//       }}
//     >
//       <Handle
//         type="target"
//         position={Position.Top}
//         style={{
//           background: "rgba(255,255,255,0.1)",
//           border: "none",
//           width: 6,
//           height: 6,
//         }}
//       />

//       <div className="px-3.5 py-3">
//         <div className="flex items-start justify-between gap-2">
//           <p
//             className={`text-[13px] leading-snug transition-colors ${
//               done
//                 ? "text-white/30 line-through"
//                 : "text-white/70 group-hover:text-white/90"
//             }`}
//           >
//             {data.label}
//           </p>
//           <span className="shrink-0 mt-0.5">
//             {done ? (
//               <FiCheckCircle size={12} className="text-emerald-400/60" />
//             ) : (
//               <FiCircle size={12} className="text-white/15" />
//             )}
//           </span>
//         </div>

//         {data.desc && (
//           <p className="text-[10px] text-white/25 mt-1.5 leading-relaxed">
//             {data.desc}
//           </p>
//         )}

//         {data.tag && (
//           <span
//             className={`inline-block text-[9px] uppercase tracking-widest mt-2 px-1.5 py-0.5 rounded-[2px] ${
//               tagColors[data.tag] || tagColors.required
//             }`}
//           >
//             {data.tag}
//           </span>
//         )}
//       </div>

//       <Handle
//         type="source"
//         position={Position.Bottom}
//         style={{
//           background: "rgba(255,255,255,0.1)",
//           border: "none",
//           width: 6,
//           height: 6,
//         }}
//       />
//     </div>
//   );
// }

// // ─── Section Label Node ──────────────────────────────────────────────────────
// function SectionNode({ data }) {
//   return (
//     <div className="flex items-center gap-2 pointer-events-none">
//       <FiChevronRight size={10} className="text-white/20" />
//       <p className="text-[10px] text-white/20 uppercase tracking-widest">
//         {data.label}
//       </p>
//     </div>
//   );
// }

// // ─── nodeTypes ───────────────────────────────────────────────────────────────
// const nodeTypes = { roadmap: RoadmapNode, section: SectionNode };

// // ─── Nodes ───────────────────────────────────────────────────────────────────
// const initialNodes = [
//   // ── Sections ──
//   {
//     id: "s0",
//     type: "section",
//     position: { x: 290, y: 0 },
//     data: { label: "Starting Point" },
//     draggable: false,
//   },
//   {
//     id: "s1",
//     type: "section",
//     position: { x: 40, y: 120 },
//     data: { label: "Internet Basics" },
//     draggable: false,
//   },
//   {
//     id: "s2",
//     type: "section",
//     position: { x: 40, y: 280 },
//     data: { label: "HTML" },
//     draggable: false,
//   },
//   {
//     id: "s3",
//     type: "section",
//     position: { x: 40, y: 450 },
//     data: { label: "CSS" },
//     draggable: false,
//   },
//   {
//     id: "s4",
//     type: "section",
//     position: { x: 40, y: 680 },
//     data: { label: "JavaScript" },
//     draggable: false,
//   },
//   {
//     id: "s5",
//     type: "section",
//     position: { x: 40, y: 960 },
//     data: { label: "Version Control" },
//     draggable: false,
//   },
//   {
//     id: "s6",
//     type: "section",
//     position: { x: 40, y: 1080 },
//     data: { label: "Package Managers" },
//     draggable: false,
//   },
//   {
//     id: "s7",
//     type: "section",
//     position: { x: 40, y: 1200 },
//     data: { label: "CSS Frameworks" },
//     draggable: false,
//   },
//   {
//     id: "s8",
//     type: "section",
//     position: { x: 40, y: 1360 },
//     data: { label: "Build Tools" },
//     draggable: false,
//   },
//   {
//     id: "s9",
//     type: "section",
//     position: { x: 40, y: 1490 },
//     data: { label: "Frameworks" },
//     draggable: false,
//   },
//   {
//     id: "s10",
//     type: "section",
//     position: { x: 40, y: 1700 },
//     data: { label: "Testing" },
//     draggable: false,
//   },
//   {
//     id: "s11",
//     type: "section",
//     position: { x: 40, y: 1840 },
//     data: { label: "TypeScript" },
//     draggable: false,
//   },
//   {
//     id: "s12",
//     type: "section",
//     position: { x: 40, y: 1960 },
//     data: { label: "Web Performance" },
//     draggable: false,
//   },
//   {
//     id: "s13",
//     type: "section",
//     position: { x: 40, y: 2080 },
//     data: { label: "Auth & Security" },
//     draggable: false,
//   },

//   // ── Start ──
//   {
//     id: "start",
//     type: "roadmap",
//     position: { x: 280, y: 28 },
//     data: {
//       label: "Frontend Development",
//       desc: "Your journey starts here",
//       tag: "start",
//     },
//   },

//   // ── Internet ──
//   {
//     id: "n1",
//     type: "roadmap",
//     position: { x: 130, y: 148 },
//     data: { label: "How does the Internet work?", tag: "required" },
//   },
//   {
//     id: "n2",
//     type: "roadmap",
//     position: { x: 370, y: 148 },
//     data: { label: "HTTP / HTTPS", tag: "required" },
//   },
//   {
//     id: "n3",
//     type: "roadmap",
//     position: { x: 610, y: 148 },
//     data: { label: "Browsers & DNS", tag: "required" },
//   },

//   // ── HTML ──
//   {
//     id: "n4",
//     type: "roadmap",
//     position: { x: 130, y: 308 },
//     data: { label: "Semantic HTML", tag: "required" },
//   },
//   {
//     id: "n5",
//     type: "roadmap",
//     position: { x: 370, y: 308 },
//     data: { label: "Forms & Validation", tag: "required" },
//   },
//   {
//     id: "n6",
//     type: "roadmap",
//     position: { x: 610, y: 308 },
//     data: { label: "Accessibility (a11y)", tag: "required" },
//   },
//   {
//     id: "n7",
//     type: "roadmap",
//     position: { x: 850, y: 308 },
//     data: { label: "SEO Basics", tag: "optional" },
//   },

//   // ── CSS ──
//   {
//     id: "n8",
//     type: "roadmap",
//     position: { x: 130, y: 478 },
//     data: { label: "Box Model & Specificity", tag: "required" },
//   },
//   {
//     id: "n9",
//     type: "roadmap",
//     position: { x: 370, y: 478 },
//     data: { label: "Flexbox & Grid", tag: "required" },
//   },
//   {
//     id: "n10",
//     type: "roadmap",
//     position: { x: 610, y: 478 },
//     data: { label: "Responsive Design", tag: "required" },
//   },
//   {
//     id: "n11",
//     type: "roadmap",
//     position: { x: 850, y: 478 },
//     data: { label: "CSS Animations", tag: "optional" },
//   },
//   {
//     id: "n12",
//     type: "roadmap",
//     position: { x: 130, y: 580 },
//     data: { label: "CSS Variables", tag: "required" },
//   },
//   {
//     id: "n13",
//     type: "roadmap",
//     position: { x: 370, y: 580 },
//     data: { label: "Sass / SCSS", tag: "optional" },
//   },
//   {
//     id: "n14",
//     type: "roadmap",
//     position: { x: 610, y: 580 },
//     data: { label: "BEM Methodology", tag: "optional" },
//   },

//   // ── JavaScript ──
//   {
//     id: "n15",
//     type: "roadmap",
//     position: { x: 130, y: 708 },
//     data: { label: "DOM Manipulation", tag: "required" },
//   },
//   {
//     id: "n16",
//     type: "roadmap",
//     position: { x: 370, y: 708 },
//     data: { label: "ES6+ Features", tag: "required" },
//   },
//   {
//     id: "n17",
//     type: "roadmap",
//     position: { x: 610, y: 708 },
//     data: { label: "Fetch API / Async", tag: "required" },
//   },
//   {
//     id: "n18",
//     type: "roadmap",
//     position: { x: 850, y: 708 },
//     data: { label: "Event Loop", tag: "required" },
//   },
//   {
//     id: "n19",
//     type: "roadmap",
//     position: { x: 130, y: 810 },
//     data: { label: "Modules (ESM)", tag: "required" },
//   },
//   {
//     id: "n20",
//     type: "roadmap",
//     position: { x: 370, y: 810 },
//     data: { label: "Error Handling", tag: "required" },
//   },
//   {
//     id: "n21",
//     type: "roadmap",
//     position: { x: 610, y: 810 },
//     data: { label: "LocalStorage / Cookies", tag: "optional" },
//   },
//   {
//     id: "n22",
//     type: "roadmap",
//     position: { x: 850, y: 810 },
//     data: { label: "Regular Expressions", tag: "optional" },
//   },

//   // ── Version Control ──
//   {
//     id: "n23",
//     type: "roadmap",
//     position: { x: 130, y: 988 },
//     data: { label: "Git Basics", tag: "required" },
//   },
//   {
//     id: "n24",
//     type: "roadmap",
//     position: { x: 370, y: 988 },
//     data: { label: "GitHub / GitLab", tag: "required" },
//   },
//   {
//     id: "n25",
//     type: "roadmap",
//     position: { x: 610, y: 988 },
//     data: { label: "Branching Strategies", tag: "optional" },
//   },

//   // ── Package Managers ──
//   {
//     id: "n26",
//     type: "roadmap",
//     position: { x: 130, y: 1108 },
//     data: { label: "npm", tag: "required" },
//   },
//   {
//     id: "n27",
//     type: "roadmap",
//     position: { x: 370, y: 1108 },
//     data: { label: "pnpm / yarn", tag: "optional" },
//   },

//   // ── CSS Frameworks ──
//   {
//     id: "n28",
//     type: "roadmap",
//     position: { x: 130, y: 1228 },
//     data: { label: "Tailwind CSS", tag: "required" },
//   },
//   {
//     id: "n29",
//     type: "roadmap",
//     position: { x: 370, y: 1228 },
//     data: { label: "Bootstrap", tag: "optional" },
//   },
//   {
//     id: "n30",
//     type: "roadmap",
//     position: { x: 610, y: 1228 },
//     data: { label: "CSS Modules", tag: "optional" },
//   },
//   {
//     id: "n31",
//     type: "roadmap",
//     position: { x: 850, y: 1228 },
//     data: { label: "Styled Components", tag: "optional" },
//   },

//   // ── Build Tools ──
//   {
//     id: "n32",
//     type: "roadmap",
//     position: { x: 130, y: 1388 },
//     data: { label: "Vite", tag: "required" },
//   },
//   {
//     id: "n33",
//     type: "roadmap",
//     position: { x: 370, y: 1388 },
//     data: { label: "Webpack", tag: "optional" },
//   },
//   {
//     id: "n34",
//     type: "roadmap",
//     position: { x: 610, y: 1388 },
//     data: { label: "Linters (ESLint)", tag: "required" },
//   },
//   {
//     id: "n35",
//     type: "roadmap",
//     position: { x: 850, y: 1388 },
//     data: { label: "Prettier", tag: "required" },
//   },

//   // ── Frameworks ──
//   {
//     id: "n36",
//     type: "roadmap",
//     position: { x: 130, y: 1518 },
//     data: { label: "React.js", tag: "required" },
//   },
//   {
//     id: "n37",
//     type: "roadmap",
//     position: { x: 370, y: 1518 },
//     data: { label: "Vue.js", tag: "optional" },
//   },
//   {
//     id: "n38",
//     type: "roadmap",
//     position: { x: 610, y: 1518 },
//     data: { label: "Angular", tag: "optional" },
//   },
//   {
//     id: "n39",
//     type: "roadmap",
//     position: { x: 130, y: 1620 },
//     data: { label: "Next.js", tag: "advanced" },
//   },
//   {
//     id: "n40",
//     type: "roadmap",
//     position: { x: 370, y: 1620 },
//     data: {
//       label: "State Management",
//       desc: "Redux / Zustand / Pinia",
//       tag: "required",
//     },
//   },
//   {
//     id: "n41",
//     type: "roadmap",
//     position: { x: 610, y: 1620 },
//     data: { label: "React Query / SWR", tag: "advanced" },
//   },

//   // ── Testing ──
//   {
//     id: "n42",
//     type: "roadmap",
//     position: { x: 130, y: 1728 },
//     data: { label: "Jest / Vitest", tag: "required" },
//   },
//   {
//     id: "n43",
//     type: "roadmap",
//     position: { x: 370, y: 1728 },
//     data: { label: "React Testing Library", tag: "required" },
//   },
//   {
//     id: "n44",
//     type: "roadmap",
//     position: { x: 610, y: 1728 },
//     data: { label: "Cypress / Playwright", tag: "advanced" },
//   },

//   // ── TypeScript ──
//   {
//     id: "n45",
//     type: "roadmap",
//     position: { x: 130, y: 1868 },
//     data: { label: "TypeScript Basics", tag: "required" },
//   },
//   {
//     id: "n46",
//     type: "roadmap",
//     position: { x: 370, y: 1868 },
//     data: { label: "Advanced Types", tag: "advanced" },
//   },
//   {
//     id: "n47",
//     type: "roadmap",
//     position: { x: 610, y: 1868 },
//     data: { label: "Generics & Utility Types", tag: "advanced" },
//   },

//   // ── Performance ──
//   {
//     id: "n48",
//     type: "roadmap",
//     position: { x: 130, y: 1988 },
//     data: { label: "Core Web Vitals", tag: "required" },
//   },
//   {
//     id: "n49",
//     type: "roadmap",
//     position: { x: 370, y: 1988 },
//     data: { label: "Lazy Loading", tag: "required" },
//   },
//   {
//     id: "n50",
//     type: "roadmap",
//     position: { x: 610, y: 1988 },
//     data: { label: "Code Splitting", tag: "advanced" },
//   },

//   // ── Auth & Security ──
//   {
//     id: "n51",
//     type: "roadmap",
//     position: { x: 130, y: 2108 },
//     data: { label: "JWT / OAuth", tag: "required" },
//   },
//   {
//     id: "n52",
//     type: "roadmap",
//     position: { x: 370, y: 2108 },
//     data: { label: "CORS & CSP", tag: "required" },
//   },
//   {
//     id: "n53",
//     type: "roadmap",
//     position: { x: 610, y: 2108 },
//     data: { label: "OWASP Basics", tag: "advanced" },
//   },
// ];

// // ─── Edges ───────────────────────────────────────────────────────────────────
// const edgeStyle = { stroke: "rgba(255,255,255,0.08)", strokeWidth: 1.5 };
// const markerEnd = {
//   type: "arrowclosed",
//   color: "rgba(255,255,255,0.12)",
//   width: 14,
//   height: 14,
// };

// const makeEdge = (id, source, target) => ({
//   id,
//   source,
//   target,
//   style: edgeStyle,
//   markerEnd,
//   animated: false,
// });

// const initialEdges = [
//   makeEdge("e0", "start", "n1"),
//   makeEdge("e0b", "start", "n2"),
//   makeEdge("e0c", "start", "n3"),

//   makeEdge("e1", "n1", "n4"),
//   makeEdge("e2", "n2", "n5"),
//   makeEdge("e3", "n3", "n6"),

//   makeEdge("e4", "n4", "n8"),
//   makeEdge("e5", "n5", "n9"),
//   makeEdge("e6", "n6", "n10"),

//   makeEdge("e7", "n8", "n15"),
//   makeEdge("e8", "n9", "n16"),
//   makeEdge("e9", "n10", "n17"),

//   makeEdge("e10", "n15", "n23"),
//   makeEdge("e11", "n16", "n24"),

//   makeEdge("e12", "n23", "n26"),
//   makeEdge("e13", "n24", "n27"),

//   makeEdge("e14", "n26", "n28"),
//   makeEdge("e15", "n27", "n29"),

//   makeEdge("e16", "n28", "n32"),
//   makeEdge("e17", "n29", "n33"),

//   makeEdge("e18", "n32", "n36"),
//   makeEdge("e19", "n33", "n37"),
//   makeEdge("e20", "n34", "n38"),

//   makeEdge("e21", "n36", "n39"),
//   makeEdge("e22", "n36", "n40"),

//   makeEdge("e23", "n39", "n42"),
//   makeEdge("e24", "n40", "n43"),

//   makeEdge("e25", "n42", "n45"),
//   makeEdge("e26", "n43", "n46"),

//   makeEdge("e27", "n45", "n48"),
//   makeEdge("e28", "n46", "n49"),

//   makeEdge("e29", "n48", "n51"),
//   makeEdge("e30", "n49", "n52"),
// ];

// // ─── Main ────────────────────────────────────────────────────────────────────
// export default function FrontendRoadmapPage() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
//     [],
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
//     [],
//   );
//   const onConnect = useCallback(
//     (conn) =>
//       setEdges((es) => addEdge({ ...conn, style: edgeStyle, markerEnd }, es)),
//     [],
//   );

//   const total = nodes.filter((n) => n.type === "roadmap").length;

//   return (
//     <div className="w-full h-screen bg-[#111009] font-gothic flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between px-8 py-4 border-b border-white/5">
//         <div>
//           <h1 className="text-lg text-white/85 tracking-tight">
//             Frontend Roadmap
//           </h1>
//           <p className="text-[11px] text-white/25 mt-0.5">
//             Click any node to mark as done. Drag to rearrange.
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-3 text-[10px] text-white/25 uppercase tracking-widest">
//             <span className="flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> Required
//             </span>
//             <span className="flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />{" "}
//               Optional
//             </span>
//             <span className="flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />{" "}
//               Advanced
//             </span>
//           </div>
//           <span className="text-[11px] text-white/20 border border-white/8 rounded-sm px-2.5 py-1">
//             {total} topics
//           </span>
//         </div>
//       </div>

//       {/* Flow */}
//       <div className="flex-1">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           nodeTypes={nodeTypes}
//           fitView
//           fitViewOptions={{ padding: 0.15 }}
//           minZoom={1}
//           maxZoom={1}
//           defaultEdgeOptions={{ style: edgeStyle, markerEnd }}
//           edgeTypes={Animation}
//         ></ReactFlow>
//       </div>
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { useRoadmap } from "@/features/roadmap/hooks/useRoadmap";
import { RoadmapFlow } from "@/features/roadmap/components/RoadmapFlow";

export default function RoadmapDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading } = useRoadmap(slug);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  return <RoadmapFlow roadmap={data} />;
}
