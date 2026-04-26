'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EventDetailWidget, PageWidth } from '@armoyu/ui';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    
    // URL structure: /oyunlar/[gameSlug]/etkinlik/[eventId]
    const eventId = params?.eventId as string;

    return (
        <main className="py-10">
            <PageWidth width="max-w-[1440px]" />
            <EventDetailWidget 
                eventId={eventId} 
                onBack={() => router.back()} 
            />
        </main>
    );
}
