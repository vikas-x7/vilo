'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const EditorPage = dynamic(() => import('@/app/editor/EditorPage'), {
  ssr: false,
});

function EditorPageContent() {
  const searchParams = useSearchParams();
  const docId = searchParams.get('doc');
  const templateId = searchParams.get('template');

  return <EditorPage docId={docId} templateId={templateId} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <EditorPageContent />
    </Suspense>
  );
}
