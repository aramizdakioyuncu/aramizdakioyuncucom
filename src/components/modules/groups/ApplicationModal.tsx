'use client';

import React, { useEffect } from 'react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: string;
}

const ACTIVE_ROLES = [
  "Genel Başvuru",
  "Yazılım Geliştirici",
  "Grafik Tasarımcı",
  "Sosyal Medya Sorumlusu",
  "Oyun Yetkilisi",
  "Yayıncı",
  "E-Spor Oyuncusu",
  "Moderatör"
];

export function ApplicationModal({ isOpen, onClose, selectedRole }: ApplicationModalProps) {
  // ESC tuşu ile kapatma
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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">EKİP BAŞVURUSU</h2>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">
                 ARMOYU AİLESİNE KATILIN
              </p>
           </div>
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-900 dark:text-white"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Başvurunuz başarıyla alındı!'); onClose(); }}>
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">BAŞVURULACAK POZİSYON (AKTİF İLANLAR)</label>
                 <div className="relative">
                    <select 
                       defaultValue={selectedRole || "Genel Başvuru"}
                       className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm appearance-none cursor-pointer"
                    >
                       {ACTIVE_ROLES.map(role => (
                          <option key={role} value={role} className="bg-white dark:bg-[#12121a] text-gray-900 dark:text-white">{role}</option>
                       ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">ADINIZ VE SOYADINIZ</label>
                    <input required type="text" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm" placeholder="Örn: Berkay Tikenoğlu" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">E-POSTA ADRESİNİZ</label>
                    <input required type="email" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm" placeholder="user@gmail.com" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">YAŞINIZ</label>
                 <input required type="number" min="13" max="99" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm" placeholder="Örn: 24" />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">KENDİNİZDEN KISACA BAHSEDİN</label>
                 <textarea required rows={4} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm no-scrollbar" placeholder="Neden sizi seçmeliyiz? Tecrübeleriniz neler?" />
              </div>
           </div>

           <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95">
              BAŞVURUYU TAMAMLA
           </button>
           
           <p className="text-[9px] text-center text-gray-500 dark:text-gray-400 opacity-60 uppercase tracking-widest">
              BAŞVURUNUZ İNCELENDİKTEN SONRA E-POSTA VE SMS YOLUYLA BİLGİLENDİRİLME YAPILACAKTIR.
           </p>
        </form>
      </div>
    </div>
  );
}
