'use client';

import { ForumTopicPage } from '@armoyu/ui';
import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: Promise<{ boardId: string, topicId: string }> }) {
  const { boardId, topicId } = use(params);
  const router = useRouter();

  return (
    <ForumTopicPage 
      topicId={topicId} 
      onBackToForum={() => router.push('/forum')}
      onBackToBoard={(bId) => router.push(`/forum/${bId}`)}
    />
  );
}
