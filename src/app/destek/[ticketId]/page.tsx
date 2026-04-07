'use client';

import React, { useState } from 'react';
import { PageWidth } from '@armoyu/ui';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
      time: '22.03.2024 14:20'
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

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1200px]" />
      
      {/* Breadcrumb & Title Area */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-armoyu-card-border pb-8">
        <div>
           <Link href="/destek" className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:underline mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              TÜM TALEPLERE DÖN
           </Link>
           <h1 className="text-3xl md:text-4xl font-black text-armoyu-text uppercase tracking-tighter italic flex items-center gap-3">
              #{TICKET_DETAIL.id} <span className="text-armoyu-text opacity-40">|</span> {TICKET_DETAIL.subject}
           </h1>
        </div>
        <div className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 shadow-lg ${TICKET_DETAIL.status === 'Cevaplandı' ? 'bg-emerald-500 border-emerald-500/20 text-white shadow-emerald-500/20' : 'bg-amber-500 border-amber-500/20 text-white shadow-amber-500/20'}`}>
           {TICKET_DETAIL.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         
         {/* Sidebar - Ticket Details */}
         <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-sm">
               <h3 className="text-xs font-black text-armoyu-text-muted mb-6 uppercase tracking-widest border-b border-armoyu-card-border pb-4">BİLDİRİM BİLGİLERİ</h3>
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">KATEGORİ</p>
                    <p className="text-sm font-bold text-armoyu-text uppercase">{TICKET_DETAIL.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">ÖNCELİK</p>
                    <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md ${TICKET_DETAIL.priority === 'Yüksek' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>{TICKET_DETAIL.priority}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">OLUŞTURULMA</p>
                    <p className="text-sm font-bold text-armoyu-text">{TICKET_DETAIL.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">SON GÜNCELLEME</p>
                    <p className="text-sm font-bold text-armoyu-text">{TICKET_DETAIL.updatedAt}</p>
                  </div>
               </div>
               
               <button className="w-full mt-10 py-4 bg-red-600/10 border border-red-600/20 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
                  TALEBİ KAPAT
               </button>
            </div>

            <div className="glass-panel p-6 rounded-[32px] border border-blue-500/20 bg-blue-600/5 text-center">
               <p className="text-xs font-bold text-armoyu-text opacity-70 mb-2 italic">Daha hızlı yanıt almak için Discord'u da kullanabilirsin.</p>
               <Link href="#" className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">DİSCORD SUNUCUMUZ</Link>
            </div>
         </div>

         {/* Message History Area */}
         <div className="lg:col-span-3 space-y-10">
            <div className="space-y-8">
               {TICKET_DETAIL.messages.map((msg, i) => (
                 <div key={msg.id} className={`flex gap-6 ${msg.isStaff ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-500`} style={{ animationDelay: `${i * 150}ms` }}>
                    <img 
                      src={msg.avatar} 
                      className={`w-14 h-14 rounded-[22px] border-2 shadow-lg object-cover bg-white/5 ${msg.isStaff ? 'border-emerald-500/30 shadow-emerald-500/10' : 'border-blue-500/30 shadow-blue-500/10'}`} 
                      alt="Avatar" 
                    />
                    <div className={`flex-1 space-y-2 ${msg.isStaff ? 'text-right' : ''}`}>
                       <div className={`flex items-center gap-3 mb-1 ${msg.isStaff ? 'justify-end' : ''}`}>
                          <span className={`text-sm font-black uppercase italic ${msg.isStaff ? 'text-emerald-500 order-2' : 'text-blue-500'}`}>{msg.sender}</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${msg.isStaff ? 'bg-emerald-500/10 text-emerald-500 order-1' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted'}`}>{msg.role}</span>
                       </div>
                       <div className={`glass-panel p-6 md:p-8 rounded-[40px] border shadow-sm inline-block max-w-[90%] text-left ${msg.isStaff ? 'bg-emerald-500/5 border-emerald-500/20 rounded-tr-sm' : 'bg-armoyu-card-bg border-armoyu-card-border rounded-tl-sm'}`}>
                          <p className="text-armoyu-text font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-[10px] font-bold text-armoyu-text-muted mt-6 opacity-40 uppercase tracking-widest">{msg.time}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Response Input */}
            <div className="glass-panel p-8 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-lg mt-12">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tight">YANITINI GÖNDER</h3>
               </div>
               
               <textarea 
                 value={newMessage}
                 onChange={(e) => setNewMessage(e.target.value)}
                 rows={5}
                 className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-[32px] p-6 text-armoyu-text placeholder-armoyu-text-muted focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium mb-6 resize-none"
                 placeholder="Sorununuz devam ediyor mu? Lütfen mesajınızı detaylandırın..."
               />
               
               <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <p className="text-xs font-bold text-armoyu-text-muted italic opacity-60">Dosya eklemek için lütfen Cloud medyanızı kullanın.</p>
                  <button className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-center">
                     MESAJI GÖNDER
                  </button>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
