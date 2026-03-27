import { useChat } from '@/context/ChatContext';
import { ChatNotes } from './ChatNotes';
import { useState } from 'react';
import { Chat } from '@/models/social/Chat';

export function ChatList({ contacts, activeId, onSelect }: { contacts: Chat[], activeId: string, onSelect: (id: string) => void }) {
  const { closeChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-armoyu-bg border-r border-gray-200 dark:border-white/5">
      {/* Arama ve Başlık */}
      <div className="p-4 md:p-5 border-b border-gray-200 dark:border-white/5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-armoyu-text tracking-tight flex items-center gap-2">
            Sohbetler
            <span className="bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-md">{filteredContacts.length} Kişi</span>
          </h2>
          <button onClick={closeChat} className="p-2 -mr-2 text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-full" title="Sohbeti Kapat">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="relative mt-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           <input 
             type="text" 
             placeholder="Kişi ara..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-gray-500 hover:border-black/20 dark:hover:border-white/20 focus:outline-none focus:border-blue-500 transition-all"
           />
        </div>
      </div>

      {/* Instagram Stil Notlar Kısmı */}
      <ChatNotes />

      {/* Kullanıcı Listesi */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">
        {filteredContacts.map(c => (
          <button 
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer text-left ${
              activeId === c.id 
                ? 'bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 shadow-inner' 
                : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
            }`}
          >
            {/* Avatar Durumu */}
            <div className="relative shrink-0">
              <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm" />
              {c.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0a0e] shadow-sm" />
              )}
            </div>

            {/* Kişi Bilgisi */}
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-slate-900 dark:text-gray-200 text-sm truncate max-w-[130px]">{c.name}</span>
                <span className="text-xs text-gray-500 font-black">{c.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs truncate max-w-[120px] font-bold ${c.unreadCount ? 'text-slate-950 dark:text-white' : 'text-slate-500'}`}>
                  {c.lastMessage?.content || 'Mesaj yok'}
                </span>
                {c.unreadCount && (
                  <span className="bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-md">
                    {c.unreadCount > 9 ? '9+' : c.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
