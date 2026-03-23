'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChatList } from './ChatList';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '@/context/ChatContext';

// Mock Data
const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Alperen (Mod)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen',
    lastMessage: 'Sunucuya reset atıyorum...',
    time: '10:42',
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Zeynep Kaya',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep',
    lastMessage: 'Akşam CS2 giriyor muyuz?',
    time: 'Dün',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '2 saat önce'
  },
  {
    id: '3',
    name: 'ARMOYU Destek',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Destek',
    lastMessage: 'Bildiriminiz çözüme ulaştı.',
    time: 'Pzt',
    unreadCount: 1,
    isOnline: true,
  }
];

const MOCK_MESSAGES = [
  {
    id: 'm1',
    sender: { name: 'Alperen', isSelf: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen' },
    content: 'Dostum selam, discord botunda ufak bir arıza var sanırım. Rolleri vermiyor.',
    timestamp: '10:30'
  },
  {
    id: 'm2',
    sender: { name: 'Berkay', isSelf: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' },
    content: 'Selam. Evet fark ettim, V3 güncellemesi sırasında API token süresi dolmuş.',
    timestamp: '10:35'
  },
  {
    id: 'm3',
    sender: { name: 'Berkay', isSelf: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' },
    content: 'Tokeni yeniledim, şimdi tekrar test eder misin? Sunucuya da reset atıyorum emin olmak için.',
    timestamp: '10:36'
  },
  {
    id: 'm4',
    sender: { name: 'Alperen', isSelf: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen' },
    content: 'Tamamdır deniyorum.',
    timestamp: '10:40'
  },
  {
    id: 'm5',
    sender: { name: 'Alperen', isSelf: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen' },
    content: 'Sunucuya reset atıyorum...',
    timestamp: '10:42'
  }
];

export function ChatContainer() {
  const { user } = useAuth();
  const { closeChat } = useChat();
  
  // Eğer null ise liste görünümü açık, ID var ise mesajlaşma açık.
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full text-armoyu-text-muted bg-armoyu-bg rounded-3xl border border-gray-200 dark:border-white/10">
        Sohbetleri görmek için giriş yapmalısınız.
      </div>
    );
  }

  const activeContact = activeContactId ? MOCK_CONTACTS.find(c => c.id === activeContactId) : null;

  return (
    <div className="flex h-full w-full bg-armoyu-bg overflow-hidden relative z-10">
      
      {/* Görünüm 1: Sohbet Listesi (Biri seçili değilse tam ekran gösterilir) */}
      {!activeContactId && (
        <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
           <ChatList contacts={MOCK_CONTACTS} activeId={''} onSelect={setActiveContactId} />
        </div>
      )}

      {/* Görünüm 2: Seçilen Sohbet Paneli (İçerik) */}
      {activeContactId && activeContact && (
        <div className="w-full h-full flex flex-col bg-armoyu-bg relative animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* İçerik Header */}
          <div className="h-[76px] border-b border-gray-200 dark:border-white/5 bg-armoyu-card-bg flex items-center px-4 gap-3 z-10 shrink-0">
             
             {/* Listeye Geri Dönüş butonu! */}
             <button 
               onClick={() => setActiveContactId(null)}
               className="p-2 -ml-2 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-full focus:outline-none"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
             </button>

             <img src={activeContact.avatar} className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 shadow-sm" alt="" />
             <div className="flex-1 min-w-0">
               <h3 className="font-bold text-armoyu-text truncate text-base">{activeContact.name}</h3>
               <div className="flex items-center gap-1.5 mt-0.5">
                 {activeContact.isOnline ? (
                   <>
                     <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)] animate-pulse"></span>
                     <span className="text-xs font-bold text-emerald-500 shadow-sm">Çevrimiçi</span>
                   </>
                 ) : (
                   <>
                     <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                     <span className="text-xs font-bold text-armoyu-text-muted">Son görülme {activeContact.lastSeen}</span>
                   </>
                 )}
               </div>
             </div>

             <div className="flex gap-1">
               <button className="p-2 text-armoyu-text-muted hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition-colors" title="Ara">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
               </button>
               <button onClick={closeChat} className="p-2 text-armoyu-text-muted hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors" title="Sohbeti Kapat">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative hide-scrollbar">
            <div className="text-center mb-8">
               <span className="inline-block bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-xs font-bold px-3 py-1 rounded-full border border-black/5 dark:border-white/5">
                 Bugün
               </span>
            </div>
            
            {MOCK_MESSAGES.map(msg => (
               <ChatMessage key={msg.id} {...msg} />
            ))}
            
            <div className="h-2" />
          </div>

          {/* Input Area */}
          <ChatInput onSend={(text) => console.log('Gönderilen mesaj:', text)} />
          
        </div>
      )}

    </div>
  );
}
