'use client';

import React, { useState } from 'react';
import { SupportDetailPage } from '@armoyu/ui';
import { useParams } from 'next/navigation';

// Mock ticket detail data
const TICKET_DETAIL = {
  id: 'T-1024',
  subject: 'Minecraft Sunucu Bağlantı Hatası',
  category: 'Teknik Destek',
  status: 'Cevaplandı',
  priority: 'Yüksek',
  createdAt: '22.03.2024 14:20',
  updatedAt: '2 saat önce',
  messages: [
    {
      id: 'm1',
      sender: 'Berkay Tikenoğlu',
      role: 'Kullanıcı',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
      content: 'Merhaba, Minecraft sunucusuna bağlanmaya çalıştığımda "Connection Refused" hatası alıyorum. Diğer sunuculara girebiliyorum ama bizim sunucuda bu sorun var. Yardımcı olabilir misiniz?',
      time: '22.03.2024 14:20',
      isStaff: false
    },
    {
      id: 'm2',
      sender: 'ARMOYU Destek',
      role: 'Yetkili',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Support',
      content: 'Merhaba Berkay Bey, yaşadığınız sorun için üzgünüz. Sunucu tarafında kısa süreli bir bakım çalışması vardı. Şu an kontrolleri sağladık, tekrar giriş yapmayı deneyebilir misiniz? Eğer sorun devam ederse lütfen belirtin.',
      time: '22.03.2024 16:45',
      isStaff: true
    }
  ]
};

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params?.ticketId as string;
  const [newMessage, setNewMessage] = useState('');
  const [ticket, setTicket] = useState({
    ...TICKET_DETAIL,
    id: ticketId || TICKET_DETAIL.id
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = () => {
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    // Simulate sending message
    setTimeout(() => {
      const newMsg = {
        id: `m_${Date.now()}`,
        sender: 'Berkay Tikenoğlu',
        role: 'Kullanıcı',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
        content: newMessage,
        time: 'Şimdi',
        isStaff: false
      };

      setTicket((prev) => ({
        ...prev,
        status: 'Açık', // change status to open/active when user sends a message
        messages: [...prev.messages, newMsg]
      }));

      setNewMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCloseTicket = () => {
    setTicket((prev) => ({
      ...prev,
      status: 'Kapalı'
    }));
  };

  return (
    <SupportDetailPage
      ticket={ticket}
      newMessage={newMessage}
      onChangeNewMessage={setNewMessage}
      onSubmitReply={handleSubmitReply}
      onCloseTicket={handleCloseTicket}
      isSubmitting={isSubmitting}
    />
  );
}
