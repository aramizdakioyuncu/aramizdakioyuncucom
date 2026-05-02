'use client';

import React, { useState } from 'react';
import { useAuth } from '@armoyu/ui';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  ShieldCheck, 
  Edit3, 
  Eye, 
  Trash2,
  Clock,
  MapPin,
  CheckCircle2,
  Trophy,
  ArrowUpRight,
  X,
  UserPlus,
  Save,
  Check,
  AlertCircle,
  Gamepad2,
  Image
} from 'lucide-react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  game: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  official?: string;
  minODP: number; // Required score to join
  status: 'yaklaşan' | 'devam-ediyor' | 'tamamlandı';
  image: string;
  participationType: 'INDIVIDUAL' | 'GROUP' | 'BOTH';
  hasStats: boolean;
}

const MOCK_EVENTS: Event[] = [
  {
    id: 'EVT-101',
    title: 'Assetto Corsa Haftalık Yarış',
    game: 'Assetto Corsa',
    date: '12 Nisan 2024',
    time: '21:00',
    participants: 12,
    maxParticipants: 24,
    official: 'Berkay Tikenoglu',
    minODP: 40,
    status: 'yaklaşan',
    image: 'https://images.unsplash.com/photo-1547915722-c548bc60f11d?q=80&w=800&auto=format&fit=crop',
    participationType: 'INDIVIDUAL',
    hasStats: false
  },
  {
    id: 'EVT-102',
    title: 'Minecraft Survival Games #3',
    game: 'Minecraft',
    date: '15 Nisan 2024',
    time: '20:00',
    participants: 45,
    maxParticipants: 100,
    minODP: 20,
    status: 'yaklaşan',
    image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=800&auto=format&fit=crop',
    participationType: 'INDIVIDUAL',
    hasStats: false
  }
];

export default function EventsManagementPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [activeTab, setActiveTab] = useState<'yaklaşan' | 'tamamlandı'>('yaklaşan');
  
  // Modal States
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeModal, setActiveModal] = useState<'edit' | 'inspect' | 'assign' | 'create' | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Event>>({});
  const [createFormData, setCreateFormData] = useState<Partial<Event>>({
    game: 'Assetto Corsa',
    date: '',
    time: '',
    maxParticipants: 24,
    minODP: 40,
    image: 'https://images.unsplash.com/photo-1547915722-c548bc60f11d?q=80&w=800&auto=format&fit=crop',
    participationType: 'INDIVIDUAL',
    hasStats: false
  });
  const [searchOfficial, setSearchOfficial] = useState('');

  // Access check
  const isAuthorized = user && [
    'admin', 'event_mgmt', 'assetto_official', 'mc_official'
  ].includes(user.role?.id || '');

  const canAssignOfficial = user && ['admin', 'event_mgmt'].includes(user.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2">Bu sayfayı görüntülemek için Etkinlik Yönetim veya Oyun Yetkilisi rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  const handleEditSave = () => {
    if (!selectedEvent) return;
    setEvents(prev => prev.map(e => e.id === selectedEvent.id ? { ...e, ...editFormData } as Event : e));
    setActiveModal(null);
  };

  const handleCreateSave = () => {
    if (!createFormData.title) return;
    
    const newEvent: Event = {
      id: `EVT-${Math.floor(Math.random() * 900) + 100}`,
      title: createFormData.title || 'Yeni Etkinlik',
      game: createFormData.game || 'Assetto Corsa',
      date: createFormData.date || 'Belirlenmedi',
      time: createFormData.time || '00:00',
      participants: 0,
      maxParticipants: createFormData.maxParticipants || 24,
      minODP: createFormData.minODP || 40,
      status: 'yaklaşan',
      image: createFormData.image || 'https://images.unsplash.com/photo-1547915722-c548bc60f11d?q=80&w=800&auto=format&fit=crop',
      participationType: createFormData.participationType || 'INDIVIDUAL',
      hasStats: createFormData.hasStats || false
    };

    setEvents(prev => [newEvent, ...prev]);
    setActiveModal(null);
    setCreateFormData({
      game: 'Assetto Corsa',
      maxParticipants: 24,
      minODP: 40,
      image: 'https://images.unsplash.com/photo-1547915722-c548bc60f11d?q=80&w=800&auto=format&fit=crop',
      participationType: 'INDIVIDUAL',
      hasStats: false
    });
  };

  const handleAssignOfficial = (name: string) => {
    if (!selectedEvent) return;
    setEvents(prev => prev.map(e => e.id === selectedEvent.id ? { ...e, official: name } as Event : e));
    setActiveModal(null);
  };

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left relative">
      
      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveModal(null)} />
           <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
              
              {/* Modal Header */}
              <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                       {activeModal === 'edit' && <Edit3 size={24} />}
                       {activeModal === 'inspect' && <Eye size={24} />}
                       {activeModal === 'assign' && <ShieldCheck size={24} />}
                       {activeModal === 'create' && <Plus size={24} />}
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">
                          {activeModal === 'edit' && 'ETKİNLİĞİ DÜZENLE'}
                          {activeModal === 'inspect' && 'ETKİNLİK DETAYLARI'}
                          {activeModal === 'assign' && 'YETKİLİ GÖREVLENDİR'}
                          {activeModal === 'create' && 'YENİ ETKİNLİK OLUŞTUR'}
                       </h3>
                       <p className="text-xs font-medium text-armoyu-text-muted">
                          {activeModal === 'create' ? 'Platforma yeni bir heyecan kat.' : `ID: ${selectedEvent?.id} • ${selectedEvent?.game}`}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setActiveModal(null)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 {activeModal === 'create' && (
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">ETKİNLİK BAŞLIĞI</label>
                          <input 
                            type="text" 
                            placeholder="Örn: Assetto Corsa Gece Yarışı"
                            className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all italic"
                            onChange={(e) => setCreateFormData({ ...createFormData, title: e.target.value })}
                          />
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">OYUN / KATEGORİ</label>
                             <div className="relative">
                                <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                                <select 
                                  className="w-full pl-11 pr-4 py-4 bg-black/5 border border-armoyu-card-border rounded-2xl text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer italic"
                                  onChange={(e) => setCreateFormData({ ...createFormData, game: e.target.value })}
                                >
                                   <option value="Assetto Corsa">Assetto Corsa</option>
                                   <option value="Minecraft">Minecraft</option>
                                   <option value="Counter-Strike 2">Counter-Strike 2</option>
                                   <option value="VALORANT">VALORANT</option>
                                   <option value="Genel">Genel / Buluşma</option>
                                </select>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">KONTENJAN</label>
                             <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                                <input 
                                  type="number" 
                                  className="w-full pl-11 pr-4 py-4 bg-black/5 border border-armoyu-card-border rounded-2xl text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all italic"
                                  defaultValue="24"
                                  onChange={(e) => setCreateFormData({ ...createFormData, maxParticipants: parseInt(e.target.value) })}
                                />
                             </div>
                          </div>
                          <div className="col-span-2 space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">KATILIM TÜRÜ</label>
                             <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                                <select 
                                  className="w-full pl-11 pr-4 py-4 bg-black/5 border border-armoyu-card-border rounded-2xl text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer italic"
                                  value={createFormData.participationType}
                                  onChange={(e) => setCreateFormData({ ...createFormData, participationType: e.target.value as any })}
                                >
                                   <option value="INDIVIDUAL">Bireysel</option>
                                   <option value="GROUP">Grup / Takım</option>
                                   <option value="BOTH">Karma (Her İkisi)</option>
                                </select>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">TARİH</label>
                             <input 
                               type="text" 
                               placeholder="12 Nisan 2024"
                               className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all italic"
                               onChange={(e) => setCreateFormData({ ...createFormData, date: e.target.value })}
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">SAAT</label>
                             <input 
                               type="text" 
                               placeholder="21:00"
                               className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all italic"
                               onChange={(e) => setCreateFormData({ ...createFormData, time: e.target.value })}
                             />
                          </div>
                       </div>

                       <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-3xl space-y-4">
                          <div className="flex items-center justify-between">
                             <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1 italic">MİNİMUM ODP GEREKSİNİMİ</label>
                             <span className="text-xl font-black text-blue-500 italic">{createFormData.minODP || 40}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="5"
                            className="w-full h-1.5 bg-blue-500/20 rounded-full appearance-none cursor-pointer accent-blue-500"
                            defaultValue="40"
                            onChange={(e) => setCreateFormData({ ...createFormData, minODP: parseInt(e.target.value) })}
                          />
                          <p className="text-[10px] font-medium text-armoyu-text-muted italic">Katılmak isteyen oyuncuların bu puanın üzerinde olması gerekecektir.</p>
                       </div>

                       <div className="p-6 bg-purple-600/5 border border-purple-500/20 rounded-3xl flex items-center justify-between group cursor-pointer" onClick={() => setCreateFormData({ ...createFormData, hasStats: !createFormData.hasStats })}>
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${createFormData.hasStats ? 'bg-purple-600 text-white' : 'bg-black/10 text-armoyu-text-muted'}`}>
                                <Trophy size={20} />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-armoyu-text uppercase tracking-widest block cursor-pointer">İSTATİSTİK MERKEZİ</label>
                                <span className="text-[9px] font-medium text-armoyu-text-muted italic">Oyuncu ve Takım istatistiklerini aktif et.</span>
                             </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full p-1 transition-all ${createFormData.hasStats ? 'bg-purple-600' : 'bg-black/20'}`}>
                             <div className={`w-4 h-4 bg-white rounded-full transition-all ${createFormData.hasStats ? 'translate-x-6' : 'translate-x-0'}`} />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">ETKİNLİK AFİŞİ (URL)</label>
                          <div className="relative">
                             <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                             <input 
                               type="text" 
                               placeholder="https://..."
                               className="w-full pl-11 pr-4 py-4 bg-black/5 border border-armoyu-card-border rounded-2xl text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all italic"
                               onChange={(e) => setCreateFormData({ ...createFormData, image: e.target.value })}
                             />
                          </div>
                          {createFormData.image && (
                            <div className="mt-4 h-32 rounded-2xl overflow-hidden border border-armoyu-card-border animate-in fade-in duration-500">
                               <img src={createFormData.image} className="w-full h-full object-cover" alt="Önizleme" />
                            </div>
                          )}
                       </div>

                       <button 
                         onClick={handleCreateSave}
                         className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 italic"
                       >
                          <Plus size={18} /> ETKİNLİĞİ YAYINLA
                       </button>
                    </div>
                 )}

                 {activeModal === 'edit' && selectedEvent && (
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">ETKİNLİK BAŞLIĞI</label>
                          <input 
                            type="text" 
                            className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all font-bold italic"
                            defaultValue={selectedEvent.title}
                            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                          />
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">KATILIM TÜRÜ</label>
                             <select 
                               className="w-full px-6 py-4 bg-black/5 border border-armoyu-card-border rounded-2xl text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer italic"
                               defaultValue={selectedEvent.participationType}
                               onChange={(e) => setEditFormData({ ...editFormData, participationType: e.target.value as any })}
                             >
                                <option value="INDIVIDUAL">Bireysel</option>
                                <option value="GROUP">Grup / Takım</option>
                                <option value="BOTH">Karma (Her İkisi)</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">İSTATİSTİK MERKEZİ</label>
                             <button 
                               onClick={() => setEditFormData({ ...editFormData, hasStats: !editFormData.hasStats })}
                               className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${editFormData.hasStats ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-black/5 border-white/5 text-armoyu-text-muted'}`}
                             >
                                {editFormData.hasStats ? 'AKTİF' : 'PASİF'}
                             </button>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">TARİH</label>
                             <input 
                               type="text" 
                               className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all font-bold italic"
                               defaultValue={selectedEvent.date}
                               onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">SAAT</label>
                             <input 
                               type="text" 
                               className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all font-bold italic"
                               defaultValue={selectedEvent.time}
                               onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                             />
                          </div>
                       </div>
                       <button onClick={handleEditSave} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 italic font-bold">
                          <Save size={18} /> DEĞİŞİKLİKLERİ KAYDET
                       </button>
                    </div>
                 )}

                 {activeModal === 'inspect' && selectedEvent && (
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-black/5 rounded-3xl border border-white/5">
                             <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1 italic">KATILIMCI SAYISI</div>
                             <div className="flex items-end gap-2">
                                <span className="text-3xl font-black text-armoyu-text">{selectedEvent.participants}</span>
                                <span className="text-sm font-bold text-armoyu-text-muted pb-1">/ {selectedEvent.maxParticipants}</span>
                             </div>
                             <div className="mt-3 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(selectedEvent.participants / selectedEvent.maxParticipants) * 100}%` }} />
                             </div>
                          </div>
                          <div className="p-6 bg-black/5 rounded-3xl border border-white/5">
                             <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1 italic">ATANMIŞ YETKİLİ</div>
                             <div className="flex items-center gap-3 mt-2 text-armoyu-text uppercase italic font-bold">
                                {selectedEvent.official ? (
                                   <>
                                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                         <ShieldCheck size={18} />
                                      </div>
                                      <span className="text-sm font-black">{selectedEvent.official}</span>
                                   </>
                                ) : (
                                   <>
                                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                         <AlertCircle size={18} />
                                      </div>
                                      <span className="text-sm font-bold text-armoyu-text-muted italic">Henüz atanmadı</span>
                                   </>
                                )}
                             </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-armoyu-text uppercase tracking-widest ml-1 italic">SON KATILIMCILAR</h4>
                          <div className="space-y-2">
                             {[1,2,3].map(i => (
                               <div key={i} className="flex items-center justify-between p-4 bg-black/5 rounded-2xl border border-white/5">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-lg bg-white/10" />
                                     <span className="text-sm font-black text-armoyu-text">OYUNCU_{i}</span>
                                  </div>
                                  <span className="text-[10px] font-bold text-armoyu-text-muted italic">Kayıt: 2 saat önce</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 )}

                 {activeModal === 'assign' && (
                    <div className="space-y-6">
                       <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
                          <input 
                            type="text" 
                            placeholder="Yetkili ara..." 
                            className="w-full pl-11 pr-4 py-4 bg-black/5 border border-armoyu-card-border rounded-2xl text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all italic"
                            value={searchOfficial}
                            onChange={(e) => setSearchOfficial(e.target.value)}
                          />
                       </div>
                       <div className="space-y-2">
                          {[
                            { name: 'Berkay Tikenoglu', role: 'admin' },
                            { name: 'MythX', role: 'event_mgmt' },
                            { name: 'Kadir Bey', role: 'mc_official' }
                          ].map((off) => (
                             <button 
                               key={off.name}
                               onClick={() => handleAssignOfficial(off.name)}
                               className="w-full flex items-center justify-between p-5 bg-black/5 hover:bg-blue-600/10 hover:border-blue-500/30 rounded-3xl border border-white/5 transition-all text-left group"
                             >
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-armoyu-text group-hover:text-blue-500 transition-colors">
                                      <ShieldCheck size={20} />
                                   </div>
                                   <div>
                                      <div className="text-sm font-black text-armoyu-text uppercase italic">{off.name}</div>
                                      <div className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest">{off.role}</div>
                                   </div>
                                </div>
                                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                   <Check size={16} />
                                </div>
                             </button>
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">ETKİNLİK <span className="text-blue-500">YÖNETİMİ</span></h2>
          <p className="text-armoyu-text-muted font-medium mt-1">Platform içi ve dışı tüm yarışmaları, turnuvaları ve buluşmaları planla.</p>
        </div>
        
        <button 
          onClick={() => setActiveModal('create')}
          className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2 italic"
        >
           <Plus size={18} /> YENİ ETKİNLİK OLUŞTUR
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl w-fit">
            {['yaklaşan', 'tamamlandı'].map((tab) => (
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
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-armoyu-text hover:text-blue-500 transition-colors uppercase italic font-bold">
               <Filter size={18} /> <span className="text-[10px] tracking-widest">Filtrele</span>
            </button>
         </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {events.filter(e => e.status === activeTab || (activeTab === 'yaklaşan' && e.status === 'devam-ediyor')).map((event) => (
           <div key={event.id} className="glass-panel overflow-hidden rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group">
              <div className="relative h-56">
                 <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                 <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-3 py-1 bg-blue-600 text-[10px] font-black italic rounded-lg text-white uppercase tracking-widest shadow-lg shadow-blue-600/20">
                       {event.game}
                    </span>
                    <span className={`px-3 py-1 ${event.status === 'devam-ediyor' ? 'bg-emerald-600' : 'bg-black/40'} backdrop-blur-md text-[10px] font-black italic rounded-lg text-white uppercase tracking-widest`}>
                       {event.status}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[10px] font-black italic rounded-lg text-white uppercase tracking-widest border border-white/5 flex items-center gap-1.5" title="Gerekli Puan">
                       <ShieldCheck size={12} className="text-blue-500" />
                       ODP {event.minODP}+
                    </span>
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">{event.title}</h3>
                       <div className="flex items-center gap-4 text-white/70 text-[11px] font-medium uppercase tracking-widest">
                          <span className="flex items-center gap-1.5 font-bold"><Calendar size={14} className="text-blue-500"/> {event.date}</span>
                          <span className="flex items-center gap-1.5 font-bold"><Clock size={14} className="text-blue-500"/> {event.time}</span>
                       </div>
                    </div>
                    <Link href={`/etkinlikler/${event.id}`} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white transition-all">
                       <ArrowUpRight size={20} />
                    </Link>
                 </div>
              </div>
              
              <div className="p-8 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="flex -space-x-3">
                          {[1,2,3].map(i => (
                             <div key={i} className="w-9 h-9 rounded-2xl bg-white/10 border-2 border-armoyu-card-bg overflow-hidden ring-1 ring-white/5">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=EventUser${i}`} alt="" />
                             </div>
                          ))}
                          <div className="w-9 h-9 rounded-2xl bg-blue-600/20 border-2 border-armoyu-card-bg flex items-center justify-center text-[10px] font-black text-blue-500">
                             +{event.participants - 3}
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest italic">{event.participants} / {event.maxParticipants} Katılımcı</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       {canAssignOfficial && (
                         <button 
                           onClick={() => { setSelectedEvent(event); setActiveModal('assign'); }}
                           className="p-3 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-armoyu-text-muted hover:text-blue-500 hover:border-blue-500/30 transition-all group/btn" 
                           title="Yetkili Görevlendir"
                         >
                            <ShieldCheck size={18} />
                         </button>
                       )}
                       <button 
                         onClick={() => { setSelectedEvent(event); setActiveModal('edit'); setEditFormData(event); }}
                         className="p-3 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-armoyu-text-muted hover:text-amber-500 hover:border-amber-500/30 transition-all" 
                         title="Etkinliği Düzenle"
                       >
                          <Edit3 size={18} />
                       </button>
                       <button 
                         onClick={() => { setSelectedEvent(event); setActiveModal('inspect'); }}
                         className="p-3 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-armoyu-text-muted hover:text-emerald-500 hover:border-emerald-500/30 transition-all font-bold" 
                         title="Katılımcıları Gör"
                       >
                          <Users size={18} />
                       </button>
                       <div className="w-px h-8 bg-armoyu-card-border mx-1" />
                       <button 
                         onClick={() => handleDelete(event.id)}
                         className="p-3 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-500/50 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all" 
                         title="Etkinliği Sil"
                       >
                          <Trash2 size={18} />
                       </button>
                    </div>
                 </div>

                 {event.official && (
                    <div className="flex items-center gap-3 p-4 bg-blue-600/5 border border-blue-500/10 rounded-3xl group-hover:border-blue-500/30 transition-all">
                       <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                          <CheckCircle2 size={20} />
                       </div>
                       <div className="flex-1">
                          <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-0.5">ATANMIŞ OYUN YETKİLİSİ</div>
                          <div className="text-sm font-black text-armoyu-text uppercase italic">{event.official}</div>
                       </div>
                       <Trophy size={18} className="text-blue-500 opacity-20" />
                    </div>
                 )}
              </div>
           </div>
         ))}
      </div>

    </div>
  );
}
