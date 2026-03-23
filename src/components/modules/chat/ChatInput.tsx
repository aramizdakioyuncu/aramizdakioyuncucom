import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-white/5 flex items-center gap-3 bg-white dark:bg-[#0a0a0e]">
      
      {/* Ekstra Butonlar (Emoji, Dosya Ekle vb.) */}
      <button type="button" className="text-gray-400 hover:text-blue-500 p-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
      </button>
      <button type="button" className="text-gray-400 hover:text-blue-500 p-2 transition-colors hidden sm:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
      </button>

      {/* Mesaj Girdisi */}
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Bir mesaj yazın..."
        className="flex-1 bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-full px-5 py-3 text-sm text-slate-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
      />

      {/* Gönder Butonu */}
      <Button variant="primary" className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </Button>
    </form>
  );
}
