export interface RoadmapListItem {
  title: string;
  slug: string;
  description: string;
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
