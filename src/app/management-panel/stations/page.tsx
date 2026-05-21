'use client';

import React, { useState } from 'react';
import { useAuth } from '@armoyu/ui';
import { 
  Search, 
  Filter, 
  Power, 
  PowerOff,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Plus,
  Zap,
  Check,
  X,
  AlertCircle,
  Coffee,
  Gamepad,
  Utensils,
  Trophy,
  Waves,
  MapPin,
  Ticket,
  CalendarDays
} from 'lucide-react';

interface Station {
  id: string;
  name: string;
  location: string;
  occupancy: number; // % Doluluk
  reservations: number; // Bekleyen rezervasyon
  coupons: number; // Kullanılan kuponlar
  isActive: boolean;
  status: 'pending' | 'approved' | 'rejected';
  type: 'İnternet Kafe' | 'PS Kafe' | 'Halı Saha' | 'Restoran' | 'Havuz';
  lastActivity: string;
}

const MOCK_STATIONS: Station[] = [
  { id: 'STN-01', name: 'Zindan İnternet Kafe', location: 'Beşiktaş, İstanbul', occupancy: 85, reservations: 12, coupons: 45, isActive: true, status: 'approved', type: 'İnternet Kafe', lastActivity: '2 dk önce' },
  { id: 'STN-02', name: 'Arena Halı Saha', location: 'Kadıköy, İstanbul', occupancy: 100, reservations: 4, coupons: 12, isActive: true, status: 'approved', type: 'Halı Saha', lastActivity: '1 saat önce' },
  { id: 'STN-03', name: 'Gamer House PS5', location: 'Çankaya, Ankara', occupancy: 30, reservations: 0, coupons: 8, isActive: true, status: 'approved', type: 'PS Kafe', lastActivity: '5 saat önce' },
  { id: 'STN-04', name: 'Mavi Dalga Havuz', location: 'Eskişehir', occupancy: 0, reservations: 0, coupons: 0, isActive: false, status: 'approved', type: 'Havuz', lastActivity: '1 gün önce' },
  { id: 'STN-PEND-1', name: 'Lezzet Durağı', location: 'İzmir', occupancy: 0, reservations: 0, coupons: 0, isActive: false, status: 'pending', type: 'Restoran', lastActivity: 'Şimdi' },
  { id: 'STN-PEND-2', name: 'Matrix Internet Cafe', location: 'Bursa', occupancy: 0, reservations: 0, coupons: 0, isActive: false, status: 'pending', type: 'İnternet Kafe', lastActivity: '30 dk önce' },
];

export default function StationsManagementPage() {
  const { user } = useAuth();
  const [stations, setStations] = useState(MOCK_STATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  // Access check
  const isAuthorized = user && ['admin', 'responsible'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text uppercase italic">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için İstasyon Sorumlusu veya Kurucu rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  const toggleStatus = (id: string) => {
    setStations(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleApprove = (id: string) => {
    setStations(prev => prev.map(s => s.id === id ? { ...s, status: 'approved', isActive: true } : s));
  };

  const handleReject = (id: string) => {
    setStations(prev => prev.filter(s => s.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'İnternet Kafe': return <Coffee size={24} />;
      case 'PS Kafe': return <Gamepad size={24} />;
      case 'Halı Saha': return <Trophy size={24} />;
      case 'Restoran': return <Utensils size={24} />;
      case 'Havuz': return <Waves size={24} />;
      default: return <Zap size={24} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'İnternet Kafe': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'PS Kafe': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Halı Saha': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Restoran': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Havuz': return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    }
  };

  const filteredStations = stations.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = s.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left leading-none relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">İSTASYON <span className="text-amber-500">YÖNETİMİ</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">İnternet kafeler, halı sahalar ve diğer sosyal tesisleri denetleyin.</p>
        </div>
        
        <button className="px-6 py-4 bg-amber-600 hover:bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2 italic">
           <Plus size={18} /> YENİ İSTASYON EKLE
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {[
           { id: 'approved', label: 'AKTİF İŞLETMELER' },
           { id: 'pending', label: 'BAŞVURULAR', count: stations.filter(s=>s.status==='pending').length }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
               activeTab === tab.id 
                 ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab.label}
             {tab.count !== undefined && tab.count > 0 && (
               <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-white text-amber-600' : 'bg-amber-500 text-white animate-pulse font-black'}`}>
                  {tab.count}
               </span>
             )}
           </button>
         ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="p-6 rounded-[32px] bg-amber-500/10 border border-white/5">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">TOPLAM MEKAN</div>
            <div className="text-2xl font-black text-amber-500">{stations.length}</div>
         </div>
         <div className="p-6 rounded-[32px] bg-emerald-500/10 border border-white/5">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">AKTİF REZERVASYON</div>
            <div className="text-2xl font-black text-emerald-500">16</div>
         </div>
         <div className="p-6 rounded-[32px] bg-blue-500/10 border border-white/5">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">KULLANILAN KUPON</div>
            <div className="text-2xl font-black text-blue-500">242</div>
         </div>
         <div className="p-6 rounded-[32px] bg-red-500/10 border border-white/5">
            <div className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 italic">KAPALI İŞLETMELER</div>
            <div className="text-2xl font-black text-red-500">{stations.filter(s=>!s.isActive).length}</div>
         </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[28px] p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
           <input 
              type="text" 
              placeholder="Mekan adı veya konum ile ara..." 
              className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-transparent focus:border-amber-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none italic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
        <button className="p-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl text-armoyu-text-muted hover:text-armoyu-text transition-all font-bold">
           <Filter size={20} />
        </button>
      </div>

      {/* Stations List */}
      <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">İŞLETME BİLGİSİ</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">REZERVASYON / KUPON</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">DOLULUK</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">DURUM</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {filteredStations.map((station) => (
                <tr key={station.id} className="hover:bg-amber-600/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${getTypeColor(station.type)}`}>
                        {getTypeIcon(station.type)}
                      </div>
                      <div>
                        <div className="text-sm font-black text-armoyu-text leading-tight uppercase italic">{station.name}</div>
                        <div className="text-[10px] font-extrabold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1 flex items-center gap-2">
                           <MapPin size={10} /> {station.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <div className="flex items-center gap-1.5 text-emerald-500">
                          <CalendarDays size={14} />
                          <span className="text-xs font-black italic">{station.reservations} Bekleyen</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-blue-500">
                          <Ticket size={14} />
                          <span className="text-xs font-black italic">{station.coupons} Onaylı</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <div className="text-[10px] font-black text-armoyu-text uppercase italic font-bold">%{station.occupancy} DOLULUK</div>
                       <div className="w-32 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              station.occupancy > 90 ? 'bg-red-500' : station.occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} 
                            style={{ width: `${station.occupancy}%` }} 
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {station.status === 'pending' ? (
                       <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit italic text-amber-500 bg-amber-500/10 border border-amber-500/20 animate-pulse font-bold">
                          <AlertCircle size={14} /> Onay Bekliyor
                       </span>
                    ) : (
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit italic border font-bold ${
                        station.isActive ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'
                      }`}>
                        {station.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {station.isActive ? 'AÇIK' : 'KAPALI'}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-3 leading-none">
                        {station.status === 'pending' ? (
                           <>
                             <button 
                               onClick={() => handleApprove(station.id)}
                               className="p-3 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                             >
                                <Check size={18} /> 
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline font-bold">ONAYLA</span>
                             </button>
                             <button 
                               onClick={() => handleReject(station.id)}
                               className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                             >
                                <X size={18} /> 
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline font-bold">REDDET</span>
                             </button>
                           </>
                        ) : (
                          <>
                             <button 
                               onClick={() => toggleStatus(station.id)}
                               className={`p-3 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 ${
                                 station.isActive 
                                   ? 'bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white shadow-red-600/20' 
                                   : 'bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-emerald-600/20'
                               }`}
                             >
                                {station.isActive ? <PowerOff size={18} /> : <Power size={18} />}
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline font-bold">
                                   {station.isActive ? 'KAPAT' : 'AÇ'}
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

        {filteredStations.length === 0 && (
           <div className="py-20 text-center bg-black/5 border-t border-armoyu-card-border">
              <Zap size={48} className="mx-auto text-armoyu-text-muted opacity-20 mb-4" />
              <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic opacity-50 font-bold">Aradığınız kriterlerde bir işletme bulunamadı.</p>
           </div>
        )}
      </div>

    </div>
  );
}
