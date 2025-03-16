"use client";

import { useState } from "react";
import { BrainCircuit, LoaderCircle } from "lucide-react";
import ReactFlow, { type Node } from "reactflow";
import "reactflow/dist/style.css";
import { useExplainRoadmapNode } from "../hooks/useExplainRoadmapNode";
import type { RoadmapDetail, ReactFlowNode } from "../types/roadmap.types";

interface Props {
  roadmap: RoadmapDetail;
}

interface SelectedRoadmapNode {
  id: string;
  title: string;
  summary?: string;
  relatedTopics: string[];
}

interface GeneratedExplanation {
  nodeId: string;
  text: string;
  model: string;
}

const PRIMARY_NODE_KEYS = ["label", "title", "name", "topic"];
const SECONDARY_NODE_KEYS = [
  "description",
  "summary",
  "content",
  "details",
  "subtitle",
];

function readNodeText(value: unknown): string | null {
  if (typeof value === "string") {
    const text = value.trim();
    return text ? text : null;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => readNodeText(item))
      .filter((item): item is string => Boolean(item));

    return items.length ? items.join(", ") : null;
  }

  return null;
}

function getNodeTitle(node: Pick<ReactFlowNode, "id" | "data">) {
  for (const key of PRIMARY_NODE_KEYS) {
    const value = readNodeText(node.data[key]);
    if (value) {
      return value;
    }
  }

  return `Topic ${node.id}`;
}

function getNodeSummary(node: Pick<ReactFlowNode, "data">, title: string) {
  for (const key of SECONDARY_NODE_KEYS) {
    const value = readNodeText(node.data[key]);
    if (value && value !== title) {
      return value;
    }
  }

  return undefined;
}

function getSelectedNodeDetails(
  roadmap: RoadmapDetail,
  nodeId: string,
): SelectedRoadmapNode | null {
  const node = roadmap.data.nodes.find((item) => item.id === nodeId);

  if (!node) {
    return null;
  }

  const title = getNodeTitle(node);
  const summary = getNodeSummary(node, title);
  const connectedNodeIds = new Set<string>();

  for (const edge of roadmap.data.edges) {
    if (edge.source === nodeId) {
      connectedNodeIds.add(edge.target);
    }

    if (edge.target === nodeId) {
      connectedNodeIds.add(edge.source);
    }
  }

  const relatedTopics = Array.from(connectedNodeIds)
    .map((relatedId) => roadmap.data.nodes.find((item) => item.id === relatedId))
    .filter((item): item is ReactFlowNode => Boolean(item))
    .map((item) => getNodeTitle(item))
    .filter((item) => item !== title)
    .slice(0, 5);

  return {
    id: node.id,
    title,
    summary,
    relatedTopics,
  };
}

export function RoadmapFlow({ roadmap }: Props) {
  const explainNodeMutation = useExplainRoadmapNode();
  const [selectedNode, setSelectedNode] = useState<SelectedRoadmapNode | null>(
    null,
  );
  const [explanation, setExplanation] = useState<GeneratedExplanation | null>(
    null,
  );

  const activeExplanation =
    explanation && explanation.nodeId === selectedNode?.id ? explanation : null;

  const handleNodeClick = (_event: unknown, node: Node) => {
    setSelectedNode(getSelectedNodeDetails(roadmap, node.id));
    setExplanation(null);
    explainNodeMutation.reset();
  };

  const handleExplain = async () => {
    if (!selectedNode) {
      return;
    }

    try {
      const response = await explainNodeMutation.mutateAsync({
        roadmapTitle: roadmap.title,
        roadmapDescription: roadmap.description,
        nodeId: selectedNode.id,
        nodeTitle: selectedNode.title,
        nodeSummary: selectedNode.summary,
        relatedTopics: selectedNode.relatedTopics,
      });

      setExplanation({
        nodeId: selectedNode.id,
        text: response.explanation,
        model: response.model,
      });
    } catch {
      setExplanation(null);
    }
  };

  return (
    <div className="relative h-screen">
      <ReactFlow
        nodes={roadmap.data.nodes}
        edges={roadmap.data.edges}
        fitView
        onNodeClick={handleNodeClick}
      />

      <div className="absolute inset-x-4 top-4 z-10 md:left-auto md:w-[360px]">
        <div className="rounded-3xl border border-white/10 bg-[#16120F]/95 p-5 text-white shadow-2xl backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-orange-200/60">
                AI Guide
              </p>
              <h2 className="mt-2 text-lg font-semibold">{roadmap.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {selectedNode
                  ? "The selected topic can now be explained with Gemini."
                  : "Click any roadmap node, then ask AI to break it down."}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-300/20 bg-orange-300/10 p-3 text-orange-100">
              <BrainCircuit className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              Topic
            </p>
            <p className="mt-2 text-base font-medium text-white">
              {selectedNode?.title ?? "No node selected yet"}
            </p>

            {selectedNode?.summary ? (
              <p className="mt-2 text-sm leading-6 text-white/55">
                {selectedNode.summary}
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-white/45">
                Pick a node in the roadmap to generate a focused explanation.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleExplain}
            disabled={!selectedNode || explainNodeMutation.isPending}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-200 px-4 py-3 text-sm font-semibold text-[#1A130D] transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
          >
            {explainNodeMutation.isPending ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Explaining...
              </>
            ) : (
              "Explain with AI"
            )}
          </button>

          {explainNodeMutation.error ? (
            <p className="mt-3 text-sm text-red-300">
              {explainNodeMutation.error.message}
            </p>
          ) : null}

          <div className="mt-4 rounded-2xl border border-white/8 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                Explanation
              </p>
              {activeExplanation ? (
                <span className="text-[11px] text-white/35">
                  {activeExplanation.model}
                </span>
              ) : null}
            </div>

            <div className="mt-3 max-h-[46vh] overflow-y-auto whitespace-pre-wrap text-sm leading-6 text-white/75">
              {activeExplanation?.text ??
                "The AI response will appear here after you select a node and click the explain button."}
            </div>
          </div>

          {selectedNode?.relatedTopics.length ? (
            <p className="mt-3 text-xs leading-5 text-white/40">
              Nearby topics: {selectedNode.relatedTopics.join(", ")}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
