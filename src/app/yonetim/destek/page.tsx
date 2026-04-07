'use client';

import React, { useState } from 'react';
import { useAuth } from '@armoyu/ui';
import { 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Search,
  Send,
  X,
  User as UserIcon
} from 'lucide-react';

interface SupportTicket {
  id: string;
  user: { name: string; avatar: string; username: string };
  subject: string;
  type: 'şikayet' | 'öneri' | 'destek';
  status: 'bekliyor' | 'cevaplandı' | 'çözüldü';
  priority: 'düşük' | 'orta' | 'yüksek';
  createdAt: string;
  lastMessage: string;
  messages: { sender: 'user' | 'admin'; text: string; time: string }[];
}

const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'T-1245',
    user: { name: 'Ahmet Yılmaz', username: 'ahmtylmz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet' },
    subject: 'Discord\'da Rol Alamıyorum',
    type: 'destek',
    status: 'bekliyor',
    priority: 'yüksek',
    createdAt: '10 dk önce',
    lastMessage: 'Discord hesabımı eşleştirdim ama rollerim hala gelmedi.',
    messages: [
      { sender: 'user', text: 'Discord hesabımı eşleştirdim ama rollerim hala gelmedi.', time: '10 dk önce' }
    ]
  },
  {
    id: 'T-1244',
    user: { name: 'Mine Crafter', username: 'mcrafter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mine' },
    subject: 'Klan Sistemi Hakkında Öneri',
    type: 'öneri',
    status: 'cevaplandı',
    priority: 'orta',
    createdAt: '2 saat önce',
    lastMessage: 'Her şey harika, teşekkürler!',
    messages: [
      { sender: 'user', text: 'Klan binalarının seviye atlaması topluluğu daha aktif tutabilir.', time: '2 saat önce' },
      { sender: 'admin', text: 'Öneriniz için teşekkürler, ekibimizle değerlendireceğiz.', time: '1 saat önce' },
      { sender: 'user', text: 'Her şey harika, teşekkürler!', time: '30 dk önce' }
    ]
  }
];

export default function SupportPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [activeTab, setActiveTab] = useState<'tümü' | 'bekleyen' | 'çözülen'>('tümü');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  // Access check
  const isAuthorized = user && ['admin', 'discipline'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Düzen ve Disiplin rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;

    const newMessage = { sender: 'admin' as const, text: replyText, time: 'Şimdi' };
    
    setTickets(prev => prev.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, status: 'cevaplandı', messages: [...t.messages, newMessage], lastMessage: replyText } 
        : t
    ));
    
    setSelectedTicket(prev => prev ? { ...prev, messages: [...prev.messages, newMessage], status: 'cevaplandı' } : null);
    setReplyText('');
  };

  const filteredTickets = tickets.filter(t => {
    if (activeTab === 'bekleyen') return t.status === 'bekliyor';
    if (activeTab === 'çözülen') return t.status === 'çözüldü';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left relative">
      
      {/* Reply Modal / Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
           <div className="bg-armoyu-card-bg border-l border-armoyu-card-border w-full max-w-xl h-full relative z-10 shadow-2xl animate-in slide-in-from-right-full duration-500 flex flex-col">
              
              <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
                 <div className="flex items-center gap-4">
                    <img src={selectedTicket.user.avatar} className="w-12 h-12 rounded-2xl object-cover" alt="" />
                    <div>
                       <h3 className="text-lg font-black text-armoyu-text uppercase italic">{selectedTicket.subject}</h3>
                       <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1">Talep ID: {selectedTicket.id}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedTicket(null)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              {/* Chat View */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-black/[0.02]">
                 {selectedTicket.messages.map((m, i) => (
                   <div key={i} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-5 rounded-[28px] ${
                        m.sender === 'admin' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-armoyu-card-border text-armoyu-text rounded-tl-none'
                      }`}>
                         <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                         <div className={`text-[9px] font-bold mt-2 opacity-50 uppercase tracking-widest ${m.sender === 'admin' ? 'text-blue-100' : 'text-armoyu-text-muted'}`}>
                            {m.sender === 'admin' ? 'YÖNETİCİ' : selectedTicket.user.name} • {m.time}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Reply Input */}
              <div className="p-8 border-t border-armoyu-card-border bg-armoyu-card-bg">
                 <div className="relative">
                    <textarea 
                      rows={3}
                      placeholder="Cevabınızı buraya yazın..."
                      className="w-full bg-black/5 border border-armoyu-card-border rounded-[32px] p-6 pr-20 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button 
                      onClick={handleSendReply}
                      className="absolute right-4 bottom-4 p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                       <Send size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">DESTEK <span className="text-blue-500">& BİLDİRİM</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">Topluluktan gelen şikayet, öneri ve destek taleplerini yönetin.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Talep ara..." 
                className="bg-black/5 dark:bg-white/5 border border-armoyu-header-border rounded-2xl pl-11 pr-4 py-3 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all w-64"
              />
           </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 leading-none">
         {[
           { label: 'Açık Talepler', value: tickets.filter(t=>t.status==='bekliyor').length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
           { label: 'Cevaplananlar', value: tickets.filter(t=>t.status==='cevaplandı').length, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Yeni Öneriler', value: '8', color: 'text-purple-500', bg: 'bg-purple-500/10' },
           { label: 'Ort. Cevap Süresi', value: '24dk', color: 'text-amber-500', bg: 'bg-amber-500/10' },
         ].map((stat, i) => (
           <div key={i} className={`p-6 rounded-[32px] ${stat.bg} border border-white/5`}>
              <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 leading-none">{stat.label}</div>
              <div className={`text-2xl font-black ${stat.color} leading-none mt-1`}>{stat.value}</div>
           </div>
         ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {['tümü', 'bekleyen', 'çözülen'].map((tab) => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab as any)}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
               activeTab === tab 
                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* Tickets List */}
      <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">GÖNDEREN</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">KONU</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">TÜR</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">DURUM</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">EYLEM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-blue-600/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={ticket.user.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-armoyu-bg ${
                          ticket.priority === 'yüksek' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-armoyu-text leading-tight">{ticket.user.name}</div>
                        <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-0.5">@{ticket.user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="max-w-xs">
                       <div className="text-sm font-black text-armoyu-text mb-1 truncate uppercase italic">{ticket.subject}</div>
                       <div className="text-[11px] font-medium text-armoyu-text-muted truncate opacity-60">"{ticket.lastMessage}"</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      ticket.type === 'şikayet' ? 'text-red-500 bg-red-500/10' :
                      ticket.type === 'öneri' ? 'text-emerald-500 bg-emerald-500/10' :
                      'text-blue-500 bg-blue-500/10'
                    }`}>
                      {ticket.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-bold uppercase tracking-tight flex items-center gap-1.5 ${
                        ticket.status === 'bekliyor' ? 'text-amber-500' :
                        ticket.status === 'cevaplandı' ? 'text-blue-500' : 'text-emerald-500'
                      }`}>
                         {ticket.status === 'bekliyor' && <Clock size={12} />}
                         {ticket.status === 'cevaplandı' && <Send size={12} />}
                         {ticket.status === 'çözüldü' && <CheckCircle2 size={12} />}
                         {ticket.status}
                      </span>
                      <span className="text-[9px] font-medium text-armoyu-text-muted opacity-50 uppercase tracking-tighter leading-none mt-1">{ticket.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedTicket(ticket)}
                          className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all flex items-center gap-2"
                        >
                           <MessageSquare size={16} /> <span className="text-[9px] font-black uppercase tracking-widest hidden lg:inline">YANITLA</span>
                        </button>
                        <button className="p-2.5 bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text rounded-xl transition-all">
                           <MoreHorizontal size={16} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
