'use client';

import React, { useState } from 'react';
import { useAuth } from '@armoyu/ui';
import { 
  BarChart3, 
  Video, 
  Users, 
  Zap, 
  Search, 
  Filter, 
  ExternalLink, 
  Award,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Plus,
  Play,
  Settings,
  X,
  AlertCircle
} from 'lucide-react';

interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  platform: 'Twitch' | 'YouTube' | 'Kick';
  followers: number;
  status: 'live' | 'offline';
  rank: 'Partner' | 'Standart' | 'Aday';
  liveTitle?: string;
}

const MOCK_STREAMERS: Streamer[] = [
  { id: 'STR-01', username: 'berkay34', displayName: 'Berkay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', platform: 'Twitch', followers: 12400, status: 'live', rank: 'Partner', liveTitle: 'ARMOYU V3 Gece Yayını! 🚀' },
  { id: 'STR-02', username: 'myth_x', displayName: 'Alperen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen', platform: 'Kick', followers: 5200, status: 'offline', rank: 'Standart' },
  { id: 'STR-03', username: 'emir_pro', displayName: 'Emir', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emir', platform: 'YouTube', followers: 89000, status: 'live', rank: 'Partner', liveTitle: 'CS2 Rank Atlama! #ARMOYU' },
  { id: 'STR-PEND-1', username: 'new_gamer', displayName: 'Cihan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cihan', platform: 'Twitch', followers: 450, status: 'offline', rank: 'Aday' },
];

export default function StreamerManagementPage() {
  const { user } = useAuth();
  const [streamers, setStreamers] = useState(MOCK_STREAMERS);
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  // Access check
  const isAuthorized = user && ['admin', 'streamer', 'responsible'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border leading-none font-bold">
         <h1 className="text-2xl font-black text-armoyu-text uppercase italic">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Yayıncı Sorumlusu rütbesine sahip olmalısınız.</p>
      </div>
    );
  }

  const handleStatusChange = (id: string, rank: Streamer['rank']) => {
    setStreamers(prev => prev.map(s => s.id === id ? { ...s, rank } : s));
  };

  const filteredStreamers = streamers.filter(s => {
    if (activeTab === 'pending') return s.rank === 'Aday';
    return s.rank !== 'Aday';
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left leading-none relative font-bold">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">YAYINCI <span className="text-purple-500">YÖNETİMİ</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1 italic">Platform yayıncılarını takip edin, partnerlik başvurularını onaylayın.</p>
        </div>
        
        <button className="px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-purple-500/20 active:scale-95 flex items-center gap-2 italic">
           <Video size={18} /> YAYINCI DAVET ET
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="p-6 rounded-[32px] bg-purple-500/10 border border-white/5 font-bold">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">TOPLAM YAYINCI</div>
            <div className="text-2xl font-black text-purple-500">124</div>
         </div>
         <div className="p-6 rounded-[32px] bg-emerald-500/10 border border-white/5 font-bold">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">ŞU AN CANLI</div>
            <div className="text-2xl font-black text-emerald-500 flex items-center gap-2">
               8 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
         </div>
         <div className="p-6 rounded-[32px] bg-amber-500/10 border border-white/5 font-bold">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">BEKLEYEN ADAYLAR</div>
            <div className="text-2xl font-black text-amber-500">{streamers.filter(s=>s.rank==='Aday').length}</div>
         </div>
         <div className="p-6 rounded-[32px] bg-blue-500/10 border border-white/5 font-bold">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">DÜNGECE İZLENME</div>
            <div className="text-2xl font-black text-blue-500">14.2K</div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {[
           { id: 'approved', label: 'AKTİF YAYINCILAR' },
           { id: 'pending', label: 'ADAY BAŞVURULARI', count: streamers.filter(s=>s.rank==='Aday').length }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
               activeTab === tab.id 
                 ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab.label}
             {tab.count !== undefined && tab.count > 0 && (
               <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-white text-purple-600' : 'bg-purple-500 text-white animate-pulse font-black'}`}>
                  {tab.count}
               </span>
             )}
           </button>
         ))}
      </div>

      {/* Streamer Grid/List */}
      <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg leading-none font-bold">
        <div className="overflow-x-auto">
          <table className="w-full text-left order-collapse">
            <thead>
              <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5 font-bold">
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest font-bold">YAYINCI BİLGİSİ</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center font-bold">PLATFORM / KİTLE</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center font-bold">DURUM</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right font-bold">YÖNETİM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {filteredStreamers.map((s) => (
                <tr key={s.id} className="hover:bg-purple-600/[0.02] transition-colors group font-bold">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 text-left">
                       <div className="relative">
                          <img src={s.avatar} className="w-12 h-12 rounded-2xl border border-white/5 object-cover" />
                          {s.status === 'live' && (
                             <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-red-600 text-white text-[7px] font-black italic rounded-md shadow-lg border border-white/20 uppercase tracking-tighter">LIVE</div>
                          )}
                       </div>
                       <div>
                          <div className="text-sm font-black text-armoyu-text leading-tight uppercase italic">{s.displayName}</div>
                          <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1">@{s.username} • {s.rank}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                     <div className="flex flex-col items-center gap-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest italic font-bold ${
                          s.platform === 'Twitch' ? 'text-purple-500' : s.platform === 'Kick' ? 'text-emerald-500' : 'text-red-500'
                        }`}>{s.platform}</span>
                        <div className="text-[11px] font-black text-armoyu-text-muted uppercase tracking-tighter">{(s.followers/1000).toFixed(1)}K Takipçi</div>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                     {s.status === 'live' ? (
                       <div className="space-y-1">
                          <div className="text-[10px] font-black text-emerald-500 uppercase italic font-bold animate-pulse">Canlı Yayında</div>
                          <div className="text-[9px] font-bold text-armoyu-text-muted truncate max-w-[120px] mx-auto italic opacity-70">"{s.liveTitle}"</div>
                       </div>
                     ) : (
                       <span className="text-[10px] font-black text-armoyu-text-muted uppercase italic opacity-50 font-bold">Offline</span>
                     )}
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-3 leading-none">
                        {s.rank === 'Aday' ? (
                           <>
                             <button onClick={() => handleStatusChange(s.id, 'Standart')} className="p-3 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all font-bold">
                                <CheckCircle2 size={18} />
                             </button>
                             <button className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all font-bold">
                                <XCircle size={18} />
                             </button>
                           </>
                        ) : (
                           <>
                             <button 
                               onClick={() => handleStatusChange(s.id, s.rank === 'Partner' ? 'Standart' : 'Partner')}
                               className={`p-3 rounded-2xl transition-all font-bold ${
                                 s.rank === 'Partner' ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white' : 'bg-purple-600/10 text-purple-600 hover:bg-purple-600 hover:text-white'
                               }`}
                             >
                                <Award size={18} />
                             </button>
                             <button className="p-3 bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text rounded-2xl transition-all font-bold">
                                <MoreVertical size={18} />
                             </button>
                           </>
                        )}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       {/* Twitch/Kick Integration Note */}
       <div className="p-8 bg-purple-500/5 border border-purple-500/10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 leading-none">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-500 font-bold">
                <Play size={32} />
             </div>
             <div>
                <h4 className="text-lg font-black text-armoyu-text uppercase italic leading-tight mb-1">CANLI YAYIN <span className="text-purple-500 font-bold">API ENTEGRASYONU</span></h4>
                <p className="text-xs font-medium text-armoyu-text-muted max-w-lg italic font-bold">Bu veriler Twitch ve Kick webhook'ları ile 60 saniyede bir senkronize edilir. Manuel rütbe değişimleri anında site geneline yansır.</p>
             </div>
          </div>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 transition-all font-bold italic">
             WEBHOOK AYARLARI
          </button>
       </div>

    </div>
  );
}
