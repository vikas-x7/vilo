"use client";

import dynamic from "next/dynamic";

const EditorPage = dynamic(() => import("@/app/editor/EditorPage"), {
  ssr: false,
});

export default function Page() {
  return <EditorPage />;
}
