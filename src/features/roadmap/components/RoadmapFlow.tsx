"use client";

import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { RoadmapDetail } from "../types/roadmap.types";

interface Props {
  roadmap: RoadmapDetail;
}

export function RoadmapFlow({ roadmap }: Props) {
  return (
    <div className="h-[80vh]">
      <ReactFlow
        nodes={roadmap.data.nodes}
        edges={roadmap.data.edges}
        fitView
      />
    </div>
  );
}
