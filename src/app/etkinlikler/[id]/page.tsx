// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { PageWidth, userList, eventList, groupList, getODPStatus } from '@armoyu/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, Calendar, MapPin, Users, ShieldAlert, User, Crown, 
  Share2, CheckCircle2, AlertTriangle, MonitorPlay, Star, 
  Flag, X, Info, ChevronDown, Check, Search, ShieldCheck, Trophy, Zap, AlertOctagon
} from 'lucide-react';


// Current User Simulation (Berkay)
const currentUser = userList[0];

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [isJoined, setIsJoined] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedUserToReport, setSelectedUserToReport] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ABOUT' | 'PARTICIPANTS' | 'STATS' | 'RULES'>('ABOUT');

  // Registration States
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [activeJoinTab, setActiveJoinTab] = useState<'INDIVIDUAL' | 'GROUP'>('INDIVIDUAL');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const eventData = eventList.find(e => e.id === resolvedParams.id) as any;

  useEffect(() => {
    if (eventData) {
      setParticipants(eventData.participants || []);
      if (eventData.participationType === 'GROUP') {
        setActiveJoinTab('GROUP');
      } else {
        setActiveJoinTab('INDIVIDUAL');
      }
    }
  }, [eventData]);

  if (!eventData) {
    notFound();
  }

  const isFinished = eventData.status.toUpperCase() === 'BİTTİ';
  const percentage = (eventData.currentParticipants / eventData.participantLimit) * 100;

  // Simulation Logic: Filter groups where current user is in or responsible
  const myGroups = currentUser.groups || [];
  const selectedGroup = selectedGroupId ? myGroups.find(g => g.id === selectedGroupId || g.name === selectedGroupId) : null;

  const handleJoinAction = () => {
    if (!acceptedRules) return;
    
    if (activeJoinTab === 'GROUP' && !selectedGroupId) {
       alert("Lütfen bir grup seçin.");
       return;
    }

    if (activeJoinTab === 'GROUP' && selectedMemberIds.length === 0) {
       alert("Lütfen en az bir grup üyesi seçin.");
       return;
    }

    // Prepare new participants
    let newEntries: any[] = [];
    if (activeJoinTab === 'INDIVIDUAL') {
      newEntries = [{
        displayName: currentUser.displayName,
        username: currentUser.username,
        avatar: currentUser.avatar,
        odp: currentUser.odp
      }];
    } else {
      const groupMembers = selectedGroup?.members || [];
      newEntries = groupMembers
        .filter((m: any) => selectedMemberIds.includes(m.username))
        .map((m: any) => ({
          displayName: m.displayName,
          username: m.username,
          avatar: m.avatar,
          groupId: selectedGroup?.id || selectedGroup?.name,
          groupName: selectedGroup?.name,
          groupLogo: selectedGroup?.logo,
          groupBanner: selectedGroup?.banner,
          roleInGroup: m.role?.name || 'Oyuncu',
          odp: m.odp || 50
        }));
    }

    // Add to state immediately
    setParticipants(prev => [...prev, ...newEntries]);
    setIsJoined(true);
  };

  const handleMemberToggle = (userId: string) => {
    setSelectedMemberIds(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleReport = (user: any) => {
    setSelectedUserToReport(user);
    setShowReportModal(true);
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans relative text-left">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Navigation */}
      <div className="mb-6 flex items-center justify-between">
         <Link 
            href="/etkinlikler" 
            className="flex items-center gap-3 text-armoyu-text-muted hover:text-blue-500 font-black text-[11px] uppercase tracking-widest transition-colors w-fit px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl border border-transparent hover:border-blue-500/30"
          >
            <ArrowLeft size={16} /> Etkinliklere Dön
         </Link>
         
         <button className="flex items-center gap-2 text-armoyu-text hover:text-blue-500 font-bold text-xs bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl transition-colors">
            <Share2 size={14} /> Paylaş
         </button>
      </div>

      {/* Banner & Hero Area */}
      <div className="relative w-full aspect-[21/9] md:aspect-[24/7] rounded-[40px] overflow-hidden border border-armoyu-card-border shadow-2xl mb-8 group">
         <img 
            src={eventData.banner} 
            alt={eventData.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 md:p-14">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <div className={`mb-4 inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-md rounded-full border ${isFinished ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                      <span className={`w-2 h-2 rounded-full ${isFinished ? 'bg-gray-400' : 'bg-emerald-400 animate-pulse'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{eventData.status}</span>
                   </div>
                   <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic drop-shadow-xl mb-2">
                     {eventData.title}
                   </h1>
                </div>
                
                {/* Hero CTA */}
                {!isJoined && !isFinished && (
                   <div className="flex flex-col items-center md:items-end gap-3">
                      {(currentUser?.odp || 0) < (eventData?.minODP || 0) && (
                         <div className={`px-4 py-2 ${getODPStatus(currentUser.odp).bgColor} backdrop-blur-md border ${getODPStatus(currentUser.odp).borderColor} rounded-xl flex items-center gap-2 ${getODPStatus(currentUser.odp).color} font-black text-[10px] uppercase tracking-widest animate-pulse`}>
                            <ShieldAlert size={14} /> {getODPStatus(currentUser.odp).label.toUpperCase()} PUAN (GEREKLİ: {eventData.minODP})
                         </div>
                      )}
                      <button 
                        onClick={() => document.getElementById('join-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`shrink-0 flex items-center justify-center gap-2 px-8 py-4 lg:px-12 lg:py-5 lg:text-lg font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-black/50 
                          ${(currentUser?.odp || 0) < (eventData?.minODP || 0) 
                             ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed opacity-50' 
                             : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'}`}
                      >
                        <MonitorPlay size={24} /> {(currentUser?.odp || 0) < (eventData?.minODP || 0) ? 'PUANINIZ YETERSİZ' : 'ŞİMDİ BAŞVUR'}
                      </button>
                   </div>
                )}

                {isJoined && (
                   <div className="px-8 py-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest">
                      <CheckCircle2 size={28} /> BAŞVURU İLETİLDİ
                   </div>
                )}

                {isFinished && (
                   <div className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3 text-gray-400 font-black uppercase tracking-widest">
                      <Calendar size={28} /> ETKİNLİK BİTTİ
                   </div>
                )}
            </div>
         </div>
      </div>

      {/* Meta Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {/* ODP REQUIREMENT */}
          <div className={`glass-panel p-6 rounded-3xl border ${getODPStatus(eventData.minODP).borderColor} ${getODPStatus(eventData.minODP).bgColor} flex items-center gap-5 transition-all hover:scale-105`}>
              <div className={`w-14 h-14 shrink-0 rounded-2xl bg-white/10 ${getODPStatus(eventData.minODP).color} flex items-center justify-center`}>
                 <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <div>
                 <span className="block text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Gerekli ODP</span>
                 <span className={`block text-sm font-black ${getODPStatus(eventData.minODP).color} uppercase`}>{eventData.minODP} - {getODPStatus(eventData.minODP).label}</span>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg flex items-center gap-5 hover:border-blue-500/50 transition-colors">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                 <Calendar size={28} strokeWidth={2.5} />
              </div>
              <div>
                 <span className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">Tarih & Zaman</span>
                 <span className="block text-sm font-black text-armoyu-text">{eventData.date}</span>
              </div>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg flex items-center gap-5 hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                 <MapPin size={28} strokeWidth={2.5} />
              </div>
              <div>
                 <span className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">Toplanma Yeri</span>
                 <span className="block text-sm font-black text-armoyu-text">{eventData.location}</span>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg flex items-center gap-5 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                 {eventData.participationType === 'GROUP' ? <Users size={28} /> : <User size={28} />}
              </div>
              <div>
                 <span className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">Katılım Türü</span>
                 <span className="block text-sm font-black text-armoyu-text">
                    {eventData.participationType === 'INDIVIDUAL' ? 'Bireysel' : eventData.participationType === 'GROUP' ? 'Grup / Takım' : 'Karma (Bireysel & Grup)'}
                 </span>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg flex items-center gap-5 hover:border-purple-500/50 transition-colors relative overflow-hidden">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center z-10">
                 <Users size={28} strokeWidth={2.5} />
              </div>
              <div className="z-10 w-full pr-4">
                 <div className="flex justify-between items-end mb-1">
                    <span className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Doluluk</span>
                    <span className="text-xs font-black text-purple-500">{eventData.currentParticipants} / {eventData.participantLimit}</span>
                 </div>
                 <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.max(5, percentage)}%` }} />
                 </div>
              </div>
          </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
          <button 
             onClick={() => setActiveTab('ABOUT')}
             className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'ABOUT' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-white/5'}`}
          >
             Hakkında
          </button>
          <button 
             onClick={() => setActiveTab('PARTICIPANTS')}
             className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'PARTICIPANTS' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-white/5'}`}
          >
             Katılımcılar ({participants.length})
          </button>
          {eventData.hasStats && (
             <button 
                onClick={() => setActiveTab('STATS')}
                className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'STATS' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-white/5'}`}
             >
                İstatistikler
             </button>
          )}
          <button 
             onClick={() => setActiveTab('RULES')}
             className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'RULES' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-white/5'}`}
          >
             Kurallar
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
             
             {/* Tab Content: ABOUT */}
             {activeTab === 'ABOUT' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                  {/* Karma Katılım Notu */}
                  {eventData.participationType === 'BOTH' && !isFinished && (
                     <div className="flex items-start gap-4 p-6 bg-blue-500/10 border border-blue-500/30 rounded-[30px] animate-pulse">
                        <Info className="text-blue-500 shrink-0 mt-1" size={24} />
                        <div>
                           <h4 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-1">ÖNEMLİ BİLGİ</h4>
                           <p className="text-xs font-bold text-armoyu-text tracking-tight uppercase leading-relaxed">
                              Bu etkinlik hem bireysel hem grup katılımlarına açıktır. Bireysel katılımcılar boşluklara göre otomatik olarak eksik takımlara yerleştirilecektir.
                           </p>
                        </div>
                     </div>
                  )}

                  <section className="glass-panel p-8 md:p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                     <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <MonitorPlay className="text-blue-500" size={28} /> Etkinlik Hakkında
                     </h2>
                     <div className="space-y-6 text-armoyu-text-muted font-medium leading-relaxed">
                        {eventData.description.split('\n\n').map((paragraph: string, i: number) => (
                           <p key={i} className="text-base text-balance">{paragraph.split('\n').map((line: string, j: number) => <React.Fragment key={j}>{line}<br/></React.Fragment>)}</p>
                        ))}
                     </div>
                  </section>

                  {isFinished && (
                     <section className="glass-panel p-10 rounded-[40px] border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                           <div className="w-24 h-24 shrink-0 rounded-3xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                              <Star size={48} fill={rating > 0 ? "currentColor" : "none"} />
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter mb-2">ETKİNLİĞİ DEĞERLENDİR</h2>
                              <p className="text-sm font-bold text-armoyu-text-muted mb-6 uppercase tracking-widest">Tecrübeni bizimle paylaş ve topluluğu geliştir.</p>
                              
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                                 {[1, 2, 3, 4, 5].map((s) => (
                                 <button key={s} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)} className="transition-transform active:scale-90">
                                    <Star size={32} strokeWidth={2.5} className={(hoverRating || rating) >= s ? 'text-yellow-500' : 'text-armoyu-text-muted opacity-30'} fill={(hoverRating || rating) >= s ? "currentColor" : "none"} />
                                 </button>
                                 ))}
                              </div>
                              <div className="relative">
                                 <textarea placeholder="Fikirlerin bizim için çok değerli..." className="w-full h-32 bg-black/10 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all uppercase tracking-tight resize-none" />
                                 <button className="mt-4 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl shadow-yellow-500/20 transition-all">Puanı Gönder</button>
                              </div>
                           </div>
                        </div>
                     </section>
                  )}
               </div>
             )}

             {/* Tab Content: RULES */}
             {activeTab === 'RULES' && (
                <section className="glass-panel p-8 md:p-10 rounded-[40px] border border-red-500/20 bg-armoyu-card-bg animate-in fade-in slide-in-from-right-4 duration-500">
                   <h2 className="text-2xl font-black text-red-500 uppercase tracking-tighter mb-8 flex items-center gap-3">
                      <ShieldAlert size={28} /> Kurallar & Şartlar
                   </h2>
                   <ul className="space-y-4 mb-10">
                      {eventData.rules.map((rule, idx) => (
                         <li key={idx} className="flex items-start gap-4">
                            <div className="mt-1 w-6 h-6 shrink-0 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs font-black">
                               {idx + 1}
                            </div>
                            <p className="text-armoyu-text font-medium text-sm pt-0.5 leading-relaxed opacity-90">{rule}</p>
                         </li>
                      ))}
                   </ul>
                   <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-4">
                      <AlertTriangle className="text-red-500 shrink-0" size={24} />
                      <p className="text-[10px] font-bold text-red-500/80 uppercase tracking-widest leading-relaxed">
                        Kurallara uymayan kullanıcılar uyarılmaksızın turnuvadan ihraç edilecektir. Lütfen tüm kuralları dikkatlice okuduğunuzdan emin olun.
                      </p>
                   </div>
                </section>
             )}

             {/* Tab Content: STATS (LoL Template) */}
             {activeTab === 'STATS' && eventData.hasStats && (
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                   {/* MVP Header */}
                   <div className="p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-[40px] flex items-center justify-between overflow-hidden relative group">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                      <div className="relative z-10 flex items-center gap-8">
                         <div className="relative">
                            <div className="w-24 h-24 rounded-[30px] overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/40">
                               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=BerkayMVP" className="w-full h-full object-cover" alt="MVP" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                               <Crown size={20} />
                            </div>
                         </div>
                         <div>
                            <div className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-1">TURNUVA MVP'Sİ</div>
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Berkay Tikenoglu</h3>
                            <div className="flex gap-4 mt-2">
                               <span className="text-[11px] font-bold text-armoyu-text-muted uppercase">KDA: <span className="text-white">12 / 1 / 8</span></span>
                               <span className="text-[11px] font-bold text-armoyu-text-muted uppercase">CS: <span className="text-white">245</span></span>
                            </div>
                         </div>
                      </div>
                      <div className="hidden md:block text-right relative z-10">
                         <Trophy size={60} className="text-purple-500/20 group-hover:text-purple-500 transition-all group-hover:scale-110" />
                      </div>
                   </div>

                   {/* Team Comparison */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Blue Team */}
                      <div className="glass-panel p-8 rounded-[40px] border border-blue-500/20 bg-blue-500/5">
                         <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-blue-500 uppercase italic tracking-tighter flex items-center gap-3">
                               <ShieldCheck size={24} /> Mavi Takım
                            </h3>
                            <span className="px-4 py-1.5 bg-blue-600 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20">GALİP</span>
                         </div>
                         <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                               <div key={i} className="flex items-center justify-between p-4 bg-black/10 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all">
                                  <div className="flex items-center gap-3">
                                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=BluePlayer${i}`} className="w-10 h-10 rounded-xl border border-blue-500/20" alt="" />
                                     <div>
                                        <span className="block text-xs font-black text-armoyu-text uppercase tracking-tight">Oyuncu_{i}</span>
                                        <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest text-blue-500/50">TOP LANE</span>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <span className="block text-sm font-black text-armoyu-text">6/1/4</span>
                                     <span className="text-[9px] font-bold text-armoyu-text-muted uppercase">KDA</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Red Team */}
                      <div className="glass-panel p-8 rounded-[40px] border border-red-500/20 bg-red-500/5">
                         <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-red-500 uppercase italic tracking-tighter flex items-center gap-3">
                               <ShieldAlert size={24} /> Kırmızı Takım
                            </h3>
                            <span className="px-4 py-1.5 bg-black/20 rounded-xl text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">MAĞLUP</span>
                         </div>
                         <div className="space-y-4">
                            {[6, 7, 8, 9, 10].map((i) => (
                               <div key={i} className="flex items-center justify-between p-4 bg-black/10 rounded-2xl border border-white/5 group hover:border-red-500/30 transition-all">
                                  <div className="flex items-center gap-3">
                                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=RedPlayer${i}`} className="w-10 h-10 rounded-xl border-red-500/20" alt="" />
                                     <div>
                                        <span className="block text-xs font-black text-armoyu-text uppercase tracking-tight">Oyuncu_{i}</span>
                                        <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest text-red-500/50">JUNGLE</span>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <span className="block text-sm font-black text-armoyu-text">2/5/3</span>
                                     <span className="text-[9px] font-bold text-armoyu-text-muted uppercase">KDA</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {/* Tab Content: PARTICIPANTS */}
             {activeTab === 'PARTICIPANTS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-up-4 duration-500">
                  <div className="flex items-center justify-between">
                     <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter flex items-center gap-3">
                        <Users className="text-emerald-500" size={28} /> Kayıtlı Oyuncular
                     </h2>
                     <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        {participants.length} Kayıt
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {participants.map((p, idx) => (
                        <div key={idx} className="glass-panel p-6 rounded-[30px] border border-armoyu-card-border bg-armoyu-card-bg flex items-center justify-between group hover:border-emerald-500/30 transition-all overflow-hidden relative">
                           <div className="flex items-center gap-4 relative z-10">
                              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-emerald-500/30 transition-all">
                                 <img src={p.avatar} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div>
                                 <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight mb-1">{p.displayName}</h4>
                                 <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${p.groupName ? 'bg-emerald-500/10 text-emerald-500' : 'bg-black/20 text-armoyu-text-muted'}`}>
                                       {p.groupName || 'Bireysel'}
                                    </span>
                                    {p.odp !== undefined && (
                                       <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${getODPStatus(p.odp).bgColor} ${getODPStatus(p.odp).color} border ${getODPStatus(p.odp).borderColor}`}>
                                          {getODPStatus(p.odp).label}
                                       </span>
                                    )}
                                 </div>
                              </div>
                           </div>
                           <button onClick={() => handleReport(p)} className="p-2 opacity-0 group-hover:opacity-100 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 transition-all hover:text-white z-10">
                              <AlertTriangle size={16} />
                           </button>
                        </div>
                     ))}
                     {participants.length === 0 && (
                        <div className="col-span-2 p-12 text-center glass-panel rounded-[40px] border-dashed border-2 border-white/5 opacity-50">
                           <Users size={48} className="mx-auto mb-4 opacity-20" />
                           <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest">Henüz kimse başvurmadı.</p>
                        </div>
                     )}
                  </div>
                </div>
             )}

             {/* JOIN SECTION */}
             {!isJoined && !isFinished && (
               <section id="join-section" className="glass-panel p-8 md:p-12 rounded-[40px] border-2 border-blue-500/30 bg-blue-500/5 scroll-mt-24 shadow-2xl shadow-blue-500/10 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                     <MonitorPlay size={200} />
                  </div>
                  
                  <div className="relative z-10">
                     <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter mb-2">ETKİNLİĞE BAŞVUR</h2>
                     <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest mb-10">Katılım sürecini başlatmak için formun tamamını doldurunuz.</p>

                     {/* Rules Consent */}
                     <label className="flex items-center gap-4 p-6 bg-black/10 dark:bg-white/5 rounded-3xl border border-armoyu-card-border cursor-pointer hover:bg-black/20 transition-all mb-8 group">
                        <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${acceptedRules ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/30' : 'border-armoyu-card-border bg-transparent'}`}>
                           {acceptedRules && <Check size={20} className="text-white" strokeWidth={4} />}
                        </div>
                        <input type="checkbox" className="hidden" checked={acceptedRules} onChange={() => setAcceptedRules(!acceptedRules)} />
                        <span className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                           Etkinlik kurallarını okudum, anladım ve tüm şartları kabul ediyorum.
                        </span>
                     </label>

                     {/* ODP WARNING BOX */}
                     {(currentUser?.odp || 0) < (eventData?.minODP || 0) && (
                        <div className={`p-8 mb-8 ${getODPStatus(currentUser.odp).bgColor} border-2 ${getODPStatus(currentUser.odp).borderColor} rounded-[35px] flex flex-col items-center text-center animate-in zoom-in-95 duration-500`}>
                           <div className={`w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center ${getODPStatus(currentUser.odp).color} mb-4 shadow-lg shadow-black/20`}>
                              <AlertOctagon size={32} />
                           </div>
                           <h4 className={`text-xl font-black ${getODPStatus(currentUser.odp).color} uppercase tracking-tighter mb-2`}>PUANINIZ {getODPStatus(currentUser.odp).label.toUpperCase()}</h4>
                           <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest max-w-sm leading-relaxed mb-4">
                              Bu etkinliğe katılmak için en az <span className="text-blue-500">{eventData.minODP} ODP</span> puanına sahip olmalısınız.
                           </p>
                           <div className="flex gap-4">
                              <div className="px-6 py-2 bg-black/20 rounded-full border border-white/5">
                                 <span className="text-[10px] font-black text-armoyu-text-muted uppercase block">Gerekli</span>
                                 <span className="text-sm font-black text-blue-500">{eventData.minODP} ODP</span>
                              </div>
                              <div className="px-6 py-2 bg-black/20 rounded-full border border-white/5">
                                 <span className="text-[10px] font-black text-armoyu-text-muted uppercase block">Senin Puanın</span>
                                 <span className={`text-sm font-black ${getODPStatus(currentUser.odp).color}`}>{currentUser.odp} ODP</span>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Participation Type Toggle */}
                     {eventData.participationType === 'BOTH' && (
                        <div className="flex p-1.5 bg-black/20 dark:bg-white/10 rounded-2xl mb-8 w-fit">
                           <button onClick={() => setActiveJoinTab('INDIVIDUAL')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeJoinTab === 'INDIVIDUAL' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}>Bireysel Katıl</button>
                           <button onClick={() => setActiveJoinTab('GROUP')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeJoinTab === 'GROUP' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}>Grup Katıl</button>
                        </div>
                     )}

                     {activeJoinTab === 'INDIVIDUAL' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                           <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-black/10 dark:bg-white/5 rounded-[30px] border border-armoyu-card-border border-dashed mb-10">
                              <img src={currentUser.avatar} className="w-24 h-24 rounded-[30px] border-4 border-blue-500/20" alt="Me" />
                              <div className="text-center md:text-left flex-1">
                                 <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                                    <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight">{currentUser.displayName}</h3>
                                    <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getODPStatus(currentUser.odp).bgColor} ${getODPStatus(currentUser.odp).color} border ${getODPStatus(currentUser.odp).borderColor}`}>
                                       {getODPStatus(currentUser.odp).label} {currentUser.odp >= 60 ? 'ÜYE' : 'OYUNCU'}
                                    </span>
                                 </div>
                                 <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest mb-4">Üye Statüsü: {currentUser.role?.name}</p>
                                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="px-5 py-2 bg-blue-500/10 rounded-xl flex flex-col">
                                       <span className="text-[9px] font-black text-blue-500 uppercase">ODP Puanı</span>
                                       <span className="text-sm font-black text-armoyu-text">{currentUser.odp} ODP</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     <button 
                        disabled={!acceptedRules || (currentUser?.odp || 0) < (eventData?.minODP || 0)}
                        onClick={handleJoinAction}
                        className={`w-full py-6 rounded-[30px] font-black uppercase tracking-widest text-lg transition-all shadow-2xl ${
                           (!acceptedRules || (currentUser?.odp || 0) < (eventData?.minODP || 0))
                           ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed opacity-50' 
                           : activeJoinTab === 'INDIVIDUAL' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30'
                        }`}
                     >
                        {(currentUser?.odp || 0) < (eventData?.minODP || 0) ? `ODP PUANINIZ YETERSİZ (${eventData.minODP} Gerekli)` : activeJoinTab === 'INDIVIDUAL' ? 'BİREYSEL BAŞVURUYU TAMAMLA' : 'GRUP BAŞVURUSUNU TAMAMLA'}
                     </button>
                  </div>
               </section>
             )}
          </div>

          {/* Sağ Kolon */}
          <div className="lg:col-span-1 space-y-8">
             <section className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                <h3 className="text-lg font-black text-armoyu-text uppercase tracking-tighter mb-6 flex items-center gap-2">
                   <Crown className="text-yellow-500" size={20} /> Etkinlik Yöneticileri
                </h3>
                <div className="space-y-5">
                   {eventData.admins && eventData.admins.length > 0 ? (
                      eventData.admins.map((admin, idx) => (
                         <Link key={idx} href={`/oyuncular/${admin.username}`} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-armoyu-card-border">
                            <img src={admin.avatar} alt={admin.name} className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                            <div>
                               <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors">{admin.name}</h4>
                               <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center gap-1.5 mt-0.5"><User size={10} /> {admin.role}</span>
                            </div>
                         </Link>
                      ))
                   ) : (
                      <div className="p-8 bg-black/10 rounded-[25px] border border-dashed border-white/10 text-center">
                         <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] block mb-2 opacity-50">Yönetici Ataması Bekleniyor</span>
                         <span className="text-xs font-black text-armoyu-text uppercase tracking-tighter italic">Henüz Atanmadı</span>
                      </div>
                   )}
                </div>
             </section>

             <div className="sticky top-24 glass-panel p-8 rounded-[40px] border border-blue-500/30 bg-blue-500/5 text-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Zap size={32} className="text-blue-500 animate-pulse" />
                </div>
                <h4 className="text-xl font-black text-armoyu-text uppercase tracking-tighter mb-2">Arena Hazır</h4>
                <p className="text-xs font-bold text-armoyu-text-muted mb-6 leading-relaxed">
                  İstatistiklerin parladığı, rekabetin zirve yaptığı ARMOYU arenasina hoş geldin.
                </p>
                <button 
                  onClick={() => document.getElementById('join-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl"
                >
                  Şimdi Yerini Al
                </button>
             </div>
          </div>
      </div>

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 text-left">
           <div className="w-full max-w-md glass-panel p-8 rounded-[40px] border border-red-500/30 bg-armoyu-card-bg shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter flex items-center gap-3"><Flag className="text-red-500" size={24} /> OYUNCUYU ŞİKAYET ET</h3>
                 <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={20} /></button>
              </div>
              <div className="mb-8 flex items-center gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                 <img src={selectedUserToReport?.avatar} className="w-12 h-12 rounded-xl object-cover" alt="User" />
                 <div>
                    <h4 className="text-sm font-black text-armoyu-text uppercase">{selectedUserToReport?.displayName}</h4>
                    <p className="text-[10px] font-bold text-armoyu-text-muted uppercase">@{selectedUserToReport?.username}</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-3">Şikayet Nedeni</label>
                    <select className="w-full bg-black/10 dark:bg-white/5 border border-armoyu-card-border rounded-xl p-3 text-sm font-bold uppercase outline-none focus:ring-2 focus:ring-red-500/50 appearance-none">
                       <option value="toxic">Toxic Davranış / Küfür</option>
                       <option value="cheat">Hile Kullanımı</option>
                       <option value="grief">Oyun Bozanlık (AFK/Feed)</option>
                       <option value="harass">Taciz / Rahatsız Etme</option>
                       <option value="other">Diğer</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-3">Ek Açıklama</label>
                    <textarea placeholder="Detayları buraya yazabilirsin..." className="w-full h-24 bg-black/10 dark:bg-white/5 border border-armoyu-card-border rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-red-500/50 resize-none uppercase tracking-tight" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setShowReportModal(false)} className="py-4 bg-black/5 dark:bg-white/5 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all border border-armoyu-card-border">İptal</button>
                    <button onClick={() => { alert("Şikayetiniz iletildi."); setShowReportModal(false); }} className="py-4 bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-red-500/30">Şikayeti Gönder</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
