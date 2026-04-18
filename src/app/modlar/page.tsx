'use client';

import { ModsPage } from '@armoyu/ui';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <ModsPage onModClick={(id) => router.push(`/modlar/${id}`)} />
  );
}
