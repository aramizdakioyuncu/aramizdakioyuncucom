'use client';

import { ForumBoardPage } from '@armoyu/ui';
import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = use(params);
  const router = useRouter();

  return (
    <ForumBoardPage 
      boardId={boardId} 
      onTopicClick={(topicId) => router.push(`/forum/${boardId}/${topicId}`)}
      onBackClick={() => router.push('/forum')}
    />
  );
}
