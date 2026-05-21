'use client';

import { SchoolDetailPage } from '@armoyu/ui';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <SchoolDetailPage slug={slug} />;
}
