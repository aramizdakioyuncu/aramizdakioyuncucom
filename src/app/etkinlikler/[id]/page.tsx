'use client';

import React from 'react';
import { DetailPage, EventsLayout } from '@armoyu/ui';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();

  return (
    <EventsLayout>
      <DetailPage 
        eventId={resolvedParams.id} 
        onBack={() => router.push('/etkinlikler')} 
      />
    </EventsLayout>
  );
}
