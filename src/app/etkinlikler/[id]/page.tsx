'use client';

import React, { useState, useEffect } from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';
import { userList, eventList, groupList } from '@/lib/constants/seedData';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, Calendar, MapPin, Users, ShieldAlert, User, Crown, 
  Share2, CheckCircle2, AlertTriangle, MonitorPlay, Star, 
  Flag, X, Info, ChevronDown, Check, Search
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

  // Registration States
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [activeJoinTab, setActiveJoinTab] = useState<'INDIVIDUAL' | 'GROUP'>('INDIVIDUAL');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const eventData = eventList.find(e => e.id === resolvedParams.id);

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
        avatar: currentUser.avatar
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
          roleInGroup: m.role?.name || 'Oyuncu'
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
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans relative">
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
                
                {/* Hero CTA - Changed to Scroll to Join */}
                {!isJoined && !isFinished && (
                   <button 
                     onClick={() => document.getElementById('join-section')?.scrollIntoView({ behavior: 'smooth' })}
                     className="shrink-0 flex items-center justify-center gap-2 px-8 py-4 lg:px-12 lg:py-5 lg:text-lg font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-black/50 bg-blue-600 hover:bg-blue-500 text-white hover:scale-105"
                   >
                     <MonitorPlay size={24} /> Şimdi Başvur
                   </button>
                )}

                {isJoined && (
                   <div className="px-8 py-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest">
                      <CheckCircle2 size={28} /> Başvuru İletildi
                   </div>
                )}

                {isFinished && (
                   <div className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3 text-gray-400 font-black uppercase tracking-widest">
                      <Calendar size={28} /> Etkinlik Bitti
                   </div>
                )}
            </div>
         </div>
      </div>

      {/* Meta Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* ... existing meta info boxes ... */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
             
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

             {/* Rating and Description Sections ... (Skipping for brevity but keeping them in final file) */}
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
                             <button 
                                key={s}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(s)}
                                className="transition-transform active:scale-90"
                             >
                                <Star 
                                  size={32} 
                                  strokeWidth={2.5}
                                  className={(hoverRating || rating) >= s ? 'text-yellow-500' : 'text-armoyu-text-muted opacity-30'}
                                  fill={(hoverRating || rating) >= s ? "currentColor" : "none"}
                                />
                             </button>
                           ))}
                        </div>

                        <div className="relative">
                           <textarea 
                              placeholder="Fikirlerin bizim için çok değerli..."
                              className="w-full h-32 bg-black/10 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all uppercase tracking-tight resize-none"
                           />
                           <button className="mt-4 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl shadow-yellow-500/20 transition-all">
                              Puanı Gönder
                           </button>
                        </div>
                     </div>
                  </div>
               </section>
             )}

             <section className="glass-panel p-8 md:p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter mb-8 flex items-center gap-3">
                   <MonitorPlay className="text-blue-500" size={28} /> Etkinlik Hakkında
                </h2>
                <div className="space-y-6 text-armoyu-text-muted font-medium leading-relaxed">
                   {eventData.description.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-base text-balance">{paragraph.split('\n').map((line, j) => <React.Fragment key={j}>{line}<br/></React.Fragment>)}</p>
                   ))}
                </div>
             </section>

             {/* Rules Section */}
             <section className="glass-panel p-8 md:p-10 rounded-[40px] border border-red-500/20 bg-armoyu-card-bg">
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

             {/* NEW JOIN SECTION (Under Rules) */}
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
                        <input 
                           type="checkbox" 
                           className="hidden" 
                           checked={acceptedRules} 
                           onChange={() => setAcceptedRules(!acceptedRules)} 
                        />
                        <span className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                           Etkinlik kurallarını okudum, anladım ve tüm şartları kabul ediyorum.
                        </span>
                     </label>

                     {/* Participation Type Toggle (if BOTH) */}
                     {eventData.participationType === 'BOTH' && (
                        <div className="flex p-1.5 bg-black/20 dark:bg-white/10 rounded-2xl mb-8 w-fit">
                           <button 
                              onClick={() => setActiveJoinTab('INDIVIDUAL')}
                              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeJoinTab === 'INDIVIDUAL' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
                           >
                              Bireysel Katıl
                           </button>
                           <button 
                              onClick={() => setActiveJoinTab('GROUP')}
                              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeJoinTab === 'GROUP' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
                           >
                              Grup Olarak Katıl
                           </button>
                        </div>
                     )}

                     {/* INDIVIDUAL VIEW */}
                     {activeJoinTab === 'INDIVIDUAL' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                           <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-black/10 dark:bg-white/5 rounded-[30px] border border-armoyu-card-border border-dashed mb-10">
                              <img src={currentUser.avatar} className="w-24 h-24 rounded-[30px] border-4 border-blue-500/20" alt="Me" />
                              <div className="text-center md:text-left flex-1">
                                 <h3 className="text-xl font-black text-armoyu-text mb-1 uppercase tracking-tight">{currentUser.displayName}</h3>
                                 <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest mb-4">Üye Statüsü: {currentUser.role?.name}</p>
                                 
                                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="px-5 py-2 bg-blue-500/10 rounded-xl">
                                       <span className="block text-[9px] font-black text-blue-500 uppercase">Tamamlanan</span>
                                       <span className="text-sm font-black text-armoyu-text">12 Etkinlik</span>
                                    </div>
                                    <div className="px-5 py-2 bg-emerald-500/10 rounded-xl">
                                       <span className="block text-[9px] font-black text-emerald-500 uppercase">Tecrübe Puanı</span>
                                       <span className="text-sm font-black text-armoyu-text">4.8 / 5.0</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* GROUP VIEW */}
                     {activeJoinTab === 'GROUP' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                           {/* Custom Group Selector */}
                           <div>
                              <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-3 ml-2">Yönettiğin Grubu Seç</label>
                              
                              {myGroups.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {myGroups.map((group: any) => (
                                      <button 
                                         key={group.id || group.name}
                                         onClick={() => {
                                            setSelectedGroupId(group.id || group.name);
                                            setSelectedMemberIds([]); // Reset
                                         }}
                                         className={`flex items-center gap-4 p-4 rounded-3xl border-2 transition-all ${
                                            selectedGroupId === (group.id || group.name)
                                            ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.02]' 
                                            : 'bg-black/20 border-white/5 hover:border-white/20 opacity-60 hover:opacity-100'
                                         }`}
                                      >
                                         <img src={group.logo} className="w-12 h-12 rounded-2xl object-cover shadow-md" alt={group.name} />
                                         <div className="text-left">
                                            <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight">{group.name}</h4>
                                            <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{group.shortName}</span>
                                         </div>
                                         {selectedGroupId === (group.id || group.name) && (
                                            <div className="ml-auto w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                               <Check size={14} className="text-white" strokeWidth={4} />
                                            </div>
                                         )}
                                      </button>
                                   ))}
                                </div>
                              ) : (
                                <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-[30px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                                   <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
                                      <ShieldAlert size={40} />
                                   </div>
                                   <h4 className="text-lg font-black text-red-500 uppercase tracking-tighter mb-2">ERİŞİM REDDEDİLDİ</h4>
                                   <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest max-w-xs leading-relaxed">
                                      Herhangi bir yetkili olduğunuz grubunuz bulunmuyor. Etkinliğe grup olarak katılmak için bir grubun lideri veya yetkilisi olmalısınız.
                                   </p>
                                </div>
                              )}

                              {!selectedGroupId && myGroups.length > 0 && (
                                 <div className="mt-4 p-6 border-2 border-dashed border-white/5 rounded-[30px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-3 text-armoyu-text-muted">
                                       <Users size={32} />
                                    </div>
                                    <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest">Devam etmek için bir grup seçmelisiniz</p>
                                 </div>
                              )}
                           </div>

                           {/* Member Selection */}
                           {selectedGroup && (
                              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-2">Grup Üyelerini Dahil Et</label>
                                    
                                    {/* Search Box */}
                                    <div className="relative w-full md:w-64">
                                       <input 
                                          type="text" 
                                          placeholder="Üye Ara (İsim / @KullanıcıAdı)"
                                          value={memberSearchQuery}
                                          onChange={(e) => setMemberSearchQuery(e.target.value)}
                                          className="w-full bg-black/40 dark:bg-white/5 border border-white/10 rounded-xl py-2 px-10 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                       />
                                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={16} />
                                       {memberSearchQuery && (
                                          <button 
                                             onClick={() => setMemberSearchQuery('')}
                                             className="absolute right-3 top-1/2 -translate-y-1/2 text-armoyu-text-muted hover:text-white"
                                          >
                                             <X size={14} />
                                          </button>
                                       )}
                                    </div>
                                 </div>

                                 <div className="overflow-hidden rounded-[30px] border border-white/5 bg-black/20">
                                    <table className="w-full text-left border-collapse">
                                       <thead>
                                          <tr className="bg-white/5 border-b border-white/10">
                                             <th className="px-6 py-4 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Oyuncu</th>
                                             <th className="px-6 py-4 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">Seç</th>
                                          </tr>
                                       </thead>
                                       <tbody className="divide-y divide-white/5">
                                          {(selectedGroup.members || [])
                                             .filter((m: any) => 
                                                m.displayName.toLowerCase().includes(memberSearchQuery.toLowerCase()) || 
                                                m.username.toLowerCase().includes(memberSearchQuery.toLowerCase())
                                             )
                                             .map((member: any) => (
                                                <tr 
                                                   key={member.username}
                                                   onClick={() => handleMemberToggle(member.username)}
                                                   className={`group cursor-pointer transition-colors ${
                                                      selectedMemberIds.includes(member.username) 
                                                      ? 'bg-emerald-500/5' 
                                                      : 'hover:bg-white/5'
                                                   }`}
                                                >
                                                   <td className="px-6 py-4">
                                                      <div className="flex items-center gap-4">
                                                         <img src={member.avatar} className="w-10 h-10 rounded-xl object-cover shadow-lg" alt={member.username} />
                                                         <div>
                                                            <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight">{member.displayName}</h4>
                                                            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">@{member.username}</p>
                                                         </div>
                                                      </div>
                                                   </td>
                                                   <td className="px-6 py-4 text-right">
                                                      <div className={`ml-auto w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                                         selectedMemberIds.includes(member.username) 
                                                         ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' 
                                                         : 'border-white/10 bg-transparent group-hover:border-white/30'
                                                      }`}>
                                                         {selectedMemberIds.includes(member.username) && <Check size={14} className="text-white" strokeWidth={4} />}
                                                      </div>
                                                   </td>
                                                </tr>
                                             ))}
                                          {/* No Results Fallback */}
                                          {(selectedGroup.members || []).filter((m: any) => 
                                             m.displayName.toLowerCase().includes(memberSearchQuery.toLowerCase()) || 
                                             m.username.toLowerCase().includes(memberSearchQuery.toLowerCase())
                                          ).length === 0 && (
                                             <tr>
                                                <td colSpan={2} className="px-6 py-12 text-center">
                                                   <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest">Aranan kriterlere uygun üye bulunamadı.</p>
                                                </td>
                                             </tr>
                                          )}
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           )}
                        </div>
                     )}

                     {/* Action Button */}
                     <button 
                        disabled={!acceptedRules}
                        onClick={handleJoinAction}
                        className={`w-full py-6 rounded-[30px] font-black uppercase tracking-widest text-lg transition-all shadow-2xl ${
                           !acceptedRules 
                           ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed opacity-50' 
                           : activeJoinTab === 'INDIVIDUAL' 
                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30' 
                             : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30'
                        }`}
                     >
                        {activeJoinTab === 'INDIVIDUAL' ? 'BİREYSEL BAŞVURUYU TAMAMLA' : 'GRUP BAŞVURUSUNU TAMAMLA'}
                     </button>
                  </div>
               </section>
             )}

             {/* Participant List */}
             {participants.length > 0 && (
               <section className="glass-panel p-8 md:p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg animate-in fade-in slide-in-from-top-4 duration-700">
                  <div className="flex items-center justify-between mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                           <Users size={28} />
                        </div>
                        <div>
                           <h2 className="text-2xl md:text-3xl font-black text-armoyu-text uppercase tracking-tighter">Katılımcı Listesi</h2>
                           <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-0.5">Toplam {participants.length} Oyuncu Başvurusu</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-14">
                     {/* 1. GRUP KATILIMLARI */}
                     {(() => {
                        const grouped: Record<string, any[]> = {};
                        participants.forEach(p => {
                           const gid = p.groupId || 'SOLO';
                           if (!grouped[gid]) grouped[gid] = [];
                           grouped[gid].push(p);
                        });

                        return Object.entries(grouped).map(([gid, members]) => {
                           if (gid === 'SOLO') return null;
                           const gName = members[0].groupName;
                           const gLogo = members[0].groupLogo;
                           const gBanner = members[0].groupBanner;

                           return (
                              <div key={gid} className="animate-in fade-in zoom-in-95 duration-700">
                                 {/* Premium Group Card */}
                                 <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-3xl mb-8 group/card">
                                    {/* Banner Background */}
                                    <div className="absolute inset-0 z-0">
                                       <img src={gBanner} className="w-full h-full object-cover opacity-40 grayscale-[20%] group-hover/card:scale-110 transition-transform duration-1000" alt="Banner" />
                                       <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
                                    </div>
                                    
                                    {/* Group Content Overlay */}
                                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                                       <div className="relative shrink-0">
                                          <div className="absolute -inset-4 bg-emerald-500/30 blur-2xl rounded-full animate-pulse" />
                                          <img src={gLogo} className="w-28 h-28 md:w-32 md:h-32 rounded-[35px] border-4 border-white/10 shadow-2xl relative z-10 bg-black/40 backdrop-blur-md" alt="Logo" />
                                          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg z-20 border-4 border-[#0a0a0a]">
                                             <ShieldAlert size={20} fill="currentColor" />
                                          </div>
                                       </div>
                                       
                                       <div className="text-center md:text-left">
                                          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-emerald-500/20 backdrop-blur-sm">
                                             <Crown size={12} /> ONAYLI GRUP KATILIMI
                                          </div>
                                          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl">{gName}</h3>
                                          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                                             <div className="flex items-center gap-2 text-armoyu-text-muted text-xs font-bold uppercase tracking-widest">
                                                <Users size={16} className="text-emerald-500" /> {members.length} AKTİF OYUNCU
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Detailed Member List */}
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2 md:ml-12 border-l-2 border-white/5 pl-6 md:pl-10">
                                    {members.map((m, midx) => (
                                       <div key={midx} className="group flex items-center justify-between p-5 bg-black/30 hover:bg-white/5 rounded-[24px] border border-white/5 transition-all animate-in slide-in-from-left duration-500" style={{ animationDelay: `${midx * 100}ms` }}>
                                          <div className="flex items-center gap-4">
                                             <div className="relative">
                                                <img src={m.avatar} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10" alt={m.displayName} />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black" />
                                             </div>
                                             <div>
                                                <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{m.displayName}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                   <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">@{m.username}</span>
                                                   <span className="w-1 h-1 rounded-full bg-white/10" />
                                                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">{m.roleInGroup || 'OYUNCU'}</span>
                                                </div>
                                             </div>
                                          </div>
                                          
                                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                             <Link href={`/oyuncular/${m.username}`} className="p-2.5 hover:bg-blue-500/20 text-blue-500 rounded-xl transition-colors border border-transparent hover:border-blue-500/30">
                                                <User size={14} />
                                             </Link>
                                             <button onClick={() => handleReport(m)} className="p-2.5 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors border border-transparent hover:border-red-500/30">
                                                <Flag size={14} />
                                             </button>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           );
                        });
                     })()}

                     {/* 2. BİREYSEL KATILIMLAR */}
                     {(() => {
                        const soloMembers = participants.filter(p => !p.groupId);
                        if (soloMembers.length === 0) return null;

                        return (
                           <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                              <div className="flex items-center gap-6 mb-8">
                                 <h3 className="text-sm font-black text-armoyu-text-muted uppercase tracking-[0.4em] px-6 py-2.5 bg-black/20 rounded-full border border-white/5 whitespace-nowrap">BİREYSEL KATILIMCILAR</h3>
                                 <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                 {soloMembers.map((participant, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-5 rounded-[28px] bg-black/20 dark:bg-white/5 border border-transparent hover:border-blue-500/30 transition-all group overflow-hidden relative shadow-lg hover:shadow-blue-500/5">
                                       <div className="flex items-center gap-4 relative z-10">
                                          <img src={participant.avatar} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all" alt={participant.displayName} />
                                          <div>
                                             <h4 className="text-base font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors">{participant.displayName}</h4>
                                             <p className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center gap-1">
                                               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> @{participant.username}
                                             </p>
                                          </div>
                                       </div>
                                       
                                       <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 z-10">
                                          <Link href={`/oyuncular/${participant.username}`} className="p-3 hover:bg-blue-500/20 text-blue-500 rounded-2xl transition-colors border border-transparent hover:border-blue-500/30">
                                             <User size={18} />
                                          </Link>
                                          <button onClick={() => handleReport(participant)} className="p-3 hover:bg-red-500/20 text-red-500 rounded-2xl transition-colors border border-transparent hover:border-red-500/30">
                                             <Flag size={18} />
                                          </button>
                                       </div>

                                       {/* Dynamic Abstract Background */}
                                       <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all rotate-12 group-hover:scale-125 duration-1000 z-0">
                                          <Users size={120} />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        );
                     })()}
                  </div>
               </section>
             )}

          </div>

          {/* Sağ Kolon (Yetkililer & Sticky CTAs) */}
          <div className="lg:col-span-1 space-y-8">
             
             {/* Yetkililer */}
             <section className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                <h3 className="text-lg font-black text-armoyu-text uppercase tracking-tighter mb-6 flex items-center gap-2">
                   <Crown className="text-yellow-500" size={20} /> Etkinlik Yöneticileri
                </h3>
                <div className="space-y-5">
                   {eventData.admins.map((admin, idx) => (
                      <Link 
                         key={idx} 
                         href={`/oyuncular/${admin.username}`}
                         className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-armoyu-card-border"
                      >
                         <img src={admin.avatar} alt={admin.name} className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                         <div>
                            <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors">{admin.name}</h4>
                            <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                               <User size={10} /> {admin.role}
                            </span>
                         </div>
                      </Link>
                   ))}
                </div>
             </section>

             {/* Sticky Summary Card */}
             {!isJoined && !isFinished && (
               <div className="sticky top-24 glass-panel p-8 rounded-[40px] border border-blue-500/30 bg-blue-500/5 text-center">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                     <ShieldAlert className="text-blue-500" size={32} />
                  </div>
                  <h4 className="text-xl font-black text-armoyu-text uppercase tracking-tighter mb-2">Kuralları Unutma</h4>
                  <p className="text-xs font-bold text-armoyu-text-muted mb-6 leading-relaxed">
                    Başvurunu tamamlamak için kuralları onaylaman gerekiyor. Detaylar formun içinde seni bekliyor.
                  </p>
                  <button 
                    onClick={() => document.getElementById('join-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl"
                  >
                    Hemen Başvur
                  </button>
               </div>
             )}

             {isFinished && (
               <div className="sticky top-24 glass-panel p-8 rounded-[40px] border border-yellow-500/30 bg-yellow-500/5 text-center">
                  <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Star className="text-yellow-500" size={32} />
                  </div>
                  <h4 className="text-xl font-black text-armoyu-text uppercase tracking-tighter mb-2">Görüşlerin Önemli</h4>
                  <p className="text-xs font-bold text-armoyu-text-muted mb-6 leading-relaxed">
                    Bu etkinlik bitti ama bir sonrakini seninle daha iyi yapabiliriz. Lütfen değerlendirmeyi unutma.
                  </p>
                  <div className="flex justify-center gap-1">
                     {[1,2,3,4,5].map(s => <Star key={s} size={16} className={rating >= s ? 'text-yellow-500 fill-yellow-500' : 'text-armoyu-text-muted'} />)}
                  </div>
               </div>
             )}

          </div>

      </div>

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
           {/* ... same report modal UI ... */}
           <div className="w-full max-w-md glass-panel p-8 rounded-[40px] border border-red-500/30 bg-armoyu-card-bg shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter flex items-center gap-3">
                    <Flag className="text-red-500" size={24} /> OYUNCUYU ŞİKAYET ET
                 </h3>
                 <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <X size={20} />
                 </button>
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
                    <input list="reasons" className="w-full bg-black/10 dark:bg-white/5 border border-armoyu-card-border rounded-xl p-3 text-sm font-bold uppercase outline-none focus:ring-2 focus:ring-red-500/50" placeholder="Bir neden seçin..." />
                    <datalist id="reasons">
                       <option value="Toxic Davranış / Küfür" />
                       <option value="Hile Kullanımı" />
                       <option value="Oyun Bozanlık (AFK/Feed)" />
                       <option value="Taciz / Rahatsız Etme" />
                       <option value="Diğer" />
                    </datalist>
                 </div>

                 <div>
                    <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-3">Ek Açıklama</label>
                    <textarea 
                       placeholder="Detayları buraya yazabilirsin..."
                       className="w-full h-24 bg-black/10 dark:bg-white/5 border border-armoyu-card-border rounded-xl p-3 text-sm font-medium outline-none focus:ring-2 focus:ring-red-500/50 resize-none uppercase tracking-tight"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setShowReportModal(false)} className="py-4 bg-black/5 dark:bg-white/5 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all border border-armoyu-card-border">
                       İptal
                    </button>
                    <button 
                      onClick={() => {
                        alert("Şikayetiniz mod ekibimize iletildi. Hassasiyetiniz için teşekkürler.");
                        setShowReportModal(false);
                      }}
                      className="py-4 bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-red-500/30"
                    >
                       Şikayeti Gönder
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
