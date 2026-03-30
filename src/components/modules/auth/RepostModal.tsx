'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/models';
import { PostMedia } from './MediaLightbox';

interface RepostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    author: User;
    content: string;
    media?: PostMedia[];
    createdAt: string;
  };
}

export function RepostModal({ isOpen, onClose, post }: RepostModalProps) {
  const [quoteText, setQuoteText] = useState('');
  
  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-panel bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] shadow-[0_32px_120px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/5 blur-[80px] rounded-full -ml-24 -mb-24 pointer-events-none" />

        {/* Header */}
        <div className="p-8 pb-6 border-b border-armoyu-card-border flex items-center justify-between relative z-10">
           <div>
              <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic">YENİDEN PAYLAŞ</h2>
              <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mt-1">
                 GÖNDERİYİ TAKİPÇİLERİNE İLET
              </p>
           </div>
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-black/10 transition-all font-bold"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6 relative z-10">
           
           {/* Alıntı Alanı (Textarea) */}
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">FİKRİNİ EKLE (OPSİYONEL)</label>
              <textarea 
                autoFocus
                rows={3} 
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Bu gönderi hakkında ne düşünüyorsun?.." 
                className="w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-5 py-4 text-armoyu-text placeholder:text-armoyu-text-muted/40 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-medium text-sm no-scrollbar resize-none" 
              />
           </div>

           {/* Post Preview (Original Content) */}
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">PAYLAŞILAN GÖNDERİ</label>
              <div className="p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                 <div className="flex items-center gap-3 mb-3">
                    <img src={post.author.avatar} alt={post.author.displayName} className="w-8 h-8 rounded-full border border-armoyu-card-border" />
                    <div>
                       <h4 className="text-xs font-black text-armoyu-text leading-tight">{post.author.displayName}</h4>
                       <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60">@{post.author.username}</span>
                    </div>
                 </div>
                 <p className="text-xs text-armoyu-text-muted line-clamp-2 leading-relaxed">
                    {post.content}
                 </p>
                 {post.media && post.media.length > 0 && (
                   <div className="mt-3 flex items-center gap-2 p-2 bg-black/20 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center text-white/50">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                         {post.media.length} GÖRSEL / MEDYA EKLİ
                      </span>
                   </div>
                 )}
              </div>
           </div>

           {/* Actions */}
           <div className="pt-4 space-y-3">
              <button 
                onClick={() => { alert('Paylaşıldı!'); onClose(); }}
                className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-green-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                 YENİDEN PAYLAŞ
              </button>
              
              <button 
                onClick={onClose}
                className="w-full py-4 text-armoyu-text-muted hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors"
              >
                 İPTAL ET
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
