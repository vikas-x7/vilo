"use client";

import { useParams } from "next/navigation";
import { useRoadmap } from "@/features/roadmap/hooks/useRoadmap";
import { RoadmapFlow } from "@/features/roadmap/components/RoadmapFlow";

export default function RoadmapDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading } = useRoadmap(slug);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (!data) return <div>Not found</div>;

  return <RoadmapFlow roadmap={data} />;
}
