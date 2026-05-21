'use client';

import { ModDetailPage } from '@armoyu/ui';
import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <ModDetailPage 
      id={id} 
      onBackClick={() => router.push('/modlar')} 
    />
  );
}
