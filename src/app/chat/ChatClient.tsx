'use client';

import { useRouter } from 'next/navigation';
import { ChatLayout } from '@armoyu/ui';

export default function ChatClient() {
  const router = useRouter();
  return (
    <ChatLayout
      // Sohbet başlığındaki avatar: bire bir sohbette kişinin profili, grup sohbetinde bir şey yapmaz
      onAvatarClick={(contact) => {
        if (contact.chatType !== 'grup' && contact.username) router.push(`/oyuncular/${contact.username}`);
      }}
    />
  );
}
