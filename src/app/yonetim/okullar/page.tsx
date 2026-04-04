'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Plus, 
  Search, 
  Filter, 
  GraduationCap, 
  Power, 
  PowerOff,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Building2,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface School {
  id: string;
  name: string;
  location: string;
  students: number;
  isActive: boolean;
  status: 'pending' | 'approved' | 'rejected';
  type: 'Üniversite' | 'Lise';
  lastActivity: string;
}

const MOCK_SCHOOLS: School[] = [
  { id: 'SCH-01', name: 'İstanbul Teknik Üniversitesi', location: 'İstanbul', students: 1240, isActive: true, status: 'approved', type: 'Üniversite', lastActivity: '2 dakika önce' },
  { id: 'SCH-02', name: 'Orta Doğu Teknik Üniversitesi', location: 'Ankara', students: 850, isActive: true, status: 'approved', type: 'Üniversite', lastActivity: '5 saat önce' },
  { id: 'SCH-03', name: 'Yıldız Teknik Üniversitesi', location: 'İstanbul', students: 620, isActive: false, status: 'approved', type: 'Üniversite', lastActivity: '1 gün önce' },
  { id: 'SCH-04', name: 'Kabataş Erkek Lisesi', location: 'İstanbul', students: 120, isActive: true, status: 'approved', type: 'Lise', lastActivity: '10 dakika önce' },
  { id: 'SCH-PEND-1', name: 'Boğaziçi Üniversitesi', location: 'İstanbul', students: 0, isActive: false, status: 'pending', type: 'Üniversite', lastActivity: 'Şimdi' },
  { id: 'SCH-PEND-2', name: 'İzmir Fen Lisesi', location: 'İzmir', students: 0, isActive: false, status: 'pending', type: 'Lise', lastActivity: '1 saat önce' },
];

export default function SchoolsManagementPage() {
  const { user } = useAuth();
  const [schools, setSchools] = useState(MOCK_SCHOOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  // Access check
  const isAuthorized = user && ['admin', 'member_mgmt', 'responsible'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Üye Yönetimi veya Sorumlu rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  const toggleStatus = (id: string) => {
    setSchools(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleApprove = (id: string) => {
    setSchools(prev => prev.map(s => s.id === id ? { ...s, status: 'approved', isActive: true } : s));
  };

  const handleReject = (id: string) => {
    setSchools(prev => prev.filter(s => s.id !== id));
  };

  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = s.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">OKUL <span className="text-blue-500">YÖNETİMİ</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">Sistemdeki üniversite ve liseleri onaylayın, isim ve içerik kontrolü yapın.</p>
        </div>
        
        <button className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2 italic">
           <Plus size={18} /> YENİ OKUL EKLE
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
         {[
           { id: 'approved', label: 'YAYINDA' },
           { id: 'pending', label: 'ONAY BEKLEYENLER', count: schools.filter(s=>s.status==='pending').length }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
               activeTab === tab.id 
                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                 : 'text-armoyu-text-muted hover:text-armoyu-text'
             }`}
           >
             {tab.label}
             {tab.count !== undefined && tab.count > 0 && (
               <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-white text-blue-600' : 'bg-blue-500 text-white animate-pulse'}`}>
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
              placeholder="Okul adı veya şehir ile ara..." 
              className="w-full pl-12 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none italic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
        <button className="p-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl text-armoyu-text-muted hover:text-armoyu-text transition-all">
           <Filter size={20} />
        </button>
      </div>

      {/* Schools List */}
      <div className="glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">OKUL ADI</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">TÜR / KONUM</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">ÖĞRENCİ</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">DURUM</th>
                <th className="px-8 py-5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">EYLEM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {filteredSchools.map((school) => (
                <tr key={school.id} className="hover:bg-blue-600/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                        school.status === 'pending' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                        school.isActive ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 'bg-red-500/10 border-red-500/30 text-red-500'
                      }`}>
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-armoyu-text leading-tight uppercase italic">{school.name}</div>
                        <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1">ID: {school.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest italic">{school.type}</span>
                       <div className="text-[11px] font-bold text-armoyu-text-muted flex items-center gap-1 leading-none">
                          <Building2 size={10} /> {school.location}
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="text-sm font-black text-armoyu-text leading-none">{school.students}</div>
                    <div className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-tighter mt-1">Kayıtlı Oyuncu</div>
                  </td>
                  <td className="px-8 py-6 text-center text-left">
                    {school.status === 'pending' ? (
                       <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit italic text-amber-500 bg-amber-500/10 border border-amber-500/20 animate-pulse">
                          <AlertCircle size={14} /> ONay Bekliyor
                       </span>
                    ) : (
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit italic font-bold border ${
                        school.isActive ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'
                      }`}>
                        {school.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {school.isActive ? 'AKTİF' : 'PASİF'}
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-3 leading-none">
                        {school.status === 'pending' ? (
                          <>
                             <button 
                               onClick={() => handleApprove(school.id)}
                               className="p-3 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                             >
                                <Check size={18} /> 
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">ONAYLA</span>
                             </button>
                             <button 
                               onClick={() => handleReject(school.id)}
                               className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                             >
                                <X size={18} /> 
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">REDDET</span>
                             </button>
                          </>
                        ) : (
                          <>
                             <button 
                               onClick={() => toggleStatus(school.id)}
                               className={`p-3 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 ${
                                 school.isActive 
                                   ? 'bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white shadow-red-600/20' 
                                   : 'bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-emerald-600/20'
                               }`}
                             >
                                {school.isActive ? <PowerOff size={18} /> : <Power size={18} />}
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">
                                   {school.isActive ? 'PASİFE AL' : 'AKTİF ET'}
                                </span>
                             </button>
                             <button className="p-3 bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text rounded-2xl transition-all">
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

        {filteredSchools.length === 0 && (
           <div className="py-20 text-center bg-black/5">
              <GraduationCap size={48} className="mx-auto text-armoyu-text-muted opacity-20 mb-4" />
              <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic opacity-50">Gösterilecek okul bulunamadı.</p>
           </div>
        )}
      </div>
    </div>
  );
}
