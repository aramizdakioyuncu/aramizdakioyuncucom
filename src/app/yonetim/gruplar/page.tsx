'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Shield, 
  Search, 
  Filter, 
  Power, 
  PowerOff,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Trophy,
  Activity,
  Plus,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface Group {
  id: string;
  name: string;
  tag: string;
  leader: string;
  members: number;
  isActive: boolean;
  status: 'pending' | 'approved' | 'rejected';
  level: number;
  rank: string;
}

const MOCK_GROUPS: Group[] = [
  { id: 'GRP-01', name: 'Fast Five E-Spor', tag: 'FF', leader: 'Metehan', members: 45, isActive: true, status: 'approved', level: 12, rank: 'Efsanevi' },
  { id: 'GRP-02', name: 'Anadolu Kartalları', tag: 'AK', leader: 'Alperen', members: 120, isActive: true, status: 'approved', level: 25, rank: 'Usta' },
  { id: 'GRP-03', name: 'Troll Team', tag: 'TT', leader: 'Bilinmiyor', members: 5, isActive: false, status: 'approved', level: 1, rank: 'Bronz' },
  { id: 'GRP-04', name: 'Cyber Warriors', tag: 'CW', leader: 'Volkan', members: 88, isActive: true, status: 'approved', level: 18, rank: 'Elmas' },
  { id: 'GRP-PEND-1', name: 'Dark Avengers', tag: 'DA', leader: 'JohnDoe', members: 1, isActive: false, status: 'pending', level: 1, rank: 'Yeni' },
];

export default function GroupsManagementPage() {
  const { user } = useAuth();
  const [groups, setGroups] = useState(MOCK_GROUPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  // Access check
  const isAuthorized = user && ['admin', 'member_mgmt', 'responsible'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Grup Yönetimi veya Sorumlu rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  const toggleStatus = (id: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g));
  };

  const handleApprove = (id: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, status: 'approved', isActive: true } : g));
  };

  const handleReject = (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         g.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = g.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">GRUP <span className="text-emerald-500">YÖNETİMİ</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">Platformdaki klanları ve oyuncu gruplarını onaylayın, topluluk kurallarını denetleyin.</p>
        </div>
        
        <button className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center gap-2 italic">
           <Plus size={18} /> YENİ GRUP OLUŞTUR
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {[
           { id: 'approved', label: 'YAYINDA' },
           { id: 'pending', label: 'ONAY BEKLEYENLER', count: groups.filter(g=>g.status==='pending').length }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
               activeTab === tab.id 
                 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab.label}
             {tab.count !== undefined && tab.count > 0 && (
               <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-white text-emerald-600' : 'bg-emerald-500 text-white animate-pulse font-black'}`}>
                  {tab.count}
               </span>
             )}
           </button>
         ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[28px] p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
           <input 
              type="text" 
              placeholder="Grup adı veya TAG ile ara..." 
              className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none italic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
        <button className="p-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl text-armoyu-text-muted hover:text-armoyu-text transition-all font-bold">
           <Filter size={20} />
        </button>
      </div>

      {/* Groups List */}
      <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">GRUP BİLGİSİ</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">SEVİYE / REKABET</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">ÜYE SAYISI</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">DURUM</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {filteredGroups.map((group) => (
                <tr key={group.id} className="hover:bg-emerald-600/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                        group.status === 'pending' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                        group.isActive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-red-500/10 border-red-500/30 text-red-500'
                      }`}>
                        <Shield size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <div className="text-sm font-black text-armoyu-text leading-tight uppercase italic">{group.name}</div>
                           <span className="px-2 py-0.5 bg-black/5 rounded text-[9px] font-black text-armoyu-text-muted leading-none">[{group.tag}]</span>
                        </div>
                        <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1">Lider: {group.leader}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                       <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${
                         group.rank === 'Efsanevi' ? 'text-amber-500 bg-amber-500/10' :
                         group.rank === 'Elmas' ? 'text-blue-500 bg-blue-500/10' : 'text-armoyu-text-muted bg-black/5'
                       }`}>
                          {group.rank}
                       </span>
                       <div className="flex items-center gap-1 mt-1 leading-none">
                          <Trophy size={10} className="text-amber-500" />
                          <span className="text-[10px] font-black text-armoyu-text">LVL {group.level}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                       <div className="text-sm font-black text-armoyu-text leading-none">{group.members}</div>
                       <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
                          <Activity size={10} /> Aktif
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {group.status === 'pending' ? (
                       <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit italic text-amber-500 bg-amber-500/10 border border-amber-500/20 animate-pulse">
                          <AlertCircle size={14} /> Onay Bekliyor
                       </span>
                    ) : (
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit italic font-bold border ${
                        group.isActive ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'
                      }`}>
                        {group.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {group.isActive ? 'AKTİF' : 'PASİF'}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-3 leading-none">
                        {group.status === 'pending' ? (
                          <>
                             <button 
                               onClick={() => handleApprove(group.id)}
                               className="p-3 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                             >
                                <Check size={18} /> 
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">ONAYLA</span>
                             </button>
                             <button 
                               onClick={() => handleReject(group.id)}
                               className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                             >
                                <X size={18} /> 
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">REDDET</span>
                             </button>
                          </>
                        ) : (
                          <>
                             <button 
                               onClick={() => toggleStatus(group.id)}
                               className={`p-3 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 ${
                                 group.isActive 
                                   ? 'bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white shadow-red-600/20' 
                                   : 'bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-emerald-600/20'
                               }`}
                             >
                                {group.isActive ? <PowerOff size={18} /> : <Power size={18} />}
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline font-bold">
                                   {group.isActive ? 'PASİFE AL' : 'AKTİF ET'}
                                </span>
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

        {filteredGroups.length === 0 && (
           <div className="py-20 text-center bg-black/5">
              <Users size={48} className="mx-auto text-armoyu-text-muted opacity-20 mb-4" />
              <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic opacity-50 font-bold">Aradığınız kriterlerde grup bulunamadı.</p>
           </div>
        )}
      </div>
    </div>
  );
}
