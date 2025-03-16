export interface RoadmapListItem {
  id: number;
  title: string;
  slug: string;
  description: string;
}

export interface RoadmapBookmarkItem {
  id: number;
  userId: number;
  roadmapId: number;
  roadmap: RoadmapListItem;
}

export interface ReactFlowNode {
  id: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
  type?: string;
}

export interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface RoadmapDetail extends RoadmapListItem {
  data: {
    nodes: ReactFlowNode[];
    edges: ReactFlowEdge[];
  };
}

export interface RoadmapExplainRequest {
  roadmapTitle: string;
  roadmapDescription?: string;
  nodeId: string;
  nodeTitle: string;
  nodeSummary?: string;
  relatedTopics?: string[];
}

export interface RoadmapExplainResponse {
  explanation: string;
  model: string;
}
