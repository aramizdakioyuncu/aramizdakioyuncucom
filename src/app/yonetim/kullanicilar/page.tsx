'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  ShieldAlert, 
  Ban, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MoreHorizontal,
  User as UserIcon,
  X,
  Send,
  AlertTriangle,
  Clock,
  Lock,
  MessageSquareX,
  FileX,
  UserCheck,
  Edit3,
  Info
} from 'lucide-react';
import { userList, roles } from '@/lib/constants/seedData';
import { PUNISHMENT_RULES, PunishmentRule, getRestrictionLabel, getCommunityComplianceLevel, calculateEscalatedDuration } from '@/lib/constants/punishmentData';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/models';

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const [localUsers, setLocalUsers] = useState(userList);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal States
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'role' | 'message' | 'ban' | null>(null);
  const [banReason, setBanReason] = useState('');
  const [messageText, setMessageText] = useState('');
  const [newRole, setNewRole] = useState('');
  const [selectedRule, setSelectedRule] = useState<PunishmentRule | null>(null);

  // Access check: Admin or Member Management
  const isAuthorized = currentUser && ['admin', 'member_mgmt'].includes(currentUser.role?.id || '');

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center glass-panel rounded-[40px] border border-armoyu-card-border">
         <h1 className="text-2xl font-black text-armoyu-text uppercase italic tracking-tighter">Erişim Yetkiniz Yok</h1>
         <p className="text-armoyu-text-muted mt-2 font-medium uppercase text-xs tracking-widest leading-relaxed">Bu sayfayı görüntülemek için Üye Yönetimi veya Kurucu rolüne sahip olmalısınız.</p>
      </div>
    );
  }

  // Filtering Logic
  const filteredUsers = useMemo(() => {
    return localUsers.filter(u => {
      const matchesSearch = u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           u.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || u.role?.id === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, roleFilter, localUsers]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Actions
  const handlePunish = () => {
    if (!selectedRule || !selectedUser) return;
    
    // Calculate final duration based on compliance level
    const escalatedDuration = (selectedUser.punishmentCount || 0) >= 9 && selectedRule.isMajor
      ? 0 // 10th punishment is PERMANENT only for major rules
      : calculateEscalatedDuration(selectedRule.duration, selectedUser.punishmentCount || 0);

    setLocalUsers(prev => prev.map(u => {
      if (u.username === selectedUser.username) {
        return new User({
          ...u,
          punishmentCount: (u.punishmentCount || 0) + 1,
          distrustScore: getCommunityComplianceLevel((u.punishmentCount || 0) + 1).multiplier
        });
      }
      return u;
    }));

    if (escalatedDuration === 0 || selectedRule.restrictions.includes('PERMANENT_BAN')) {
      setLocalUsers(prev => prev.filter(u => u.username !== selectedUser.username));
    }

    setActiveModal(null);
    setSelectedUser(null);
    setSelectedRule(null);
  };

  const handleRoleChange = () => {
    setLocalUsers(prev => prev.map(u => 
      u.username === selectedUser.username 
        ? new User({ ...u, role: Object.values(roles).find(r => r.id === newRole) as any }) 
        : u
    ));
    setActiveModal(null);
  };

  const getRoleBadge = (roleId?: string) => {
    const role = Object.values(roles).find(r => r.id === roleId);
    if (!role) return null;

    return (
      <span 
        className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm"
        style={{ 
          backgroundColor: `${role.color}15`, 
          color: role.color,
          borderColor: `${role.color}30`
        }}
      >
        {role.name}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative text-left">
      
      {/* Modals Container */}
      {activeModal && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setActiveModal(null)} />
           <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[44px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
              
              {/* Modal Header */}
              <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
                 <div className="flex items-center gap-5 text-left">
                    <div className="relative">
                       <img src={selectedUser.avatar} className="w-14 h-14 rounded-[20px] object-cover border-2 border-white/10" alt="" />
                       <div className="absolute -bottom-1 -right-1 p-1 bg-red-600 border-2 border-armoyu-card-bg rounded-lg text-white">
                          <ShieldAlert size={10} />
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic leading-none">
                          {activeModal === 'role' && 'ROLÜ DEĞİŞTİR'}
                          {activeModal === 'message' && 'MESAJ GÖNDER'}
                          {activeModal === 'ban' && 'TOPLULUK REHBERLİĞİ'}
                       </h3>
                       <div className="flex items-center gap-2 mt-2">
                          <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">@{selectedUser.username}</p>
                          {activeModal === 'ban' && (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-500 uppercase italic">
                              <ShieldAlert size={10} />
                              {(selectedUser.punishmentCount || 0) + 1}. REHBERLİK İŞLEMİ
                            </span>
                          )}
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setActiveModal(null)} className="p-2.5 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 hover:bg-black/20 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 {activeModal === 'role' && (
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-3">
                         {Object.values(roles).map(r => (
                           <button 
                             key={r.id}
                             onClick={() => setNewRole(r.id)}
                             className={`p-5 rounded-3xl border text-left transition-all group relative overflow-hidden ${
                               newRole === r.id ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' : 'border-white/5 bg-black/5 hover:border-white/30'
                             }`}
                           >
                              <div className="text-[11px] font-black uppercase tracking-widest leading-none mb-2" style={{ color: r.color }}>{r.name}</div>
                              <div className="text-[9px] font-bold text-armoyu-text-muted opacity-60">Kimlik: {r.id}</div>
                              {newRole === r.id && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20">
                                   <CheckCircle2 size={32} style={{ color: r.color }} />
                                </div>
                              )}
                           </button>
                         ))}
                      </div>
                      <button onClick={handleRoleChange} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[24px] text-xs uppercase tracking-widest shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                         <UserCheck size={18} className="group-hover:scale-110 transition-transform" />
                         YENİ ROLÜ ONAYLA
                      </button>
                   </div>
                 )}

                 {activeModal === 'message' && (
                    <div className="space-y-6">
                       <textarea 
                         rows={5}
                         placeholder="Yazmak istediğiniz mesajı buraya girin..."
                         className="w-full bg-black/5 border border-armoyu-card-border rounded-[32px] p-8 text-sm font-medium text-armoyu-text focus:outline-none focus:border-emerald-500 transition-all resize-none shadow-inner"
                         value={messageText}
                         onChange={(e) => setMessageText(e.target.value)}
                       />
                       <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-[24px] text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                          MESAJI GÜVENLİ GÖNDER
                       </button>
                    </div>
                 )}

                 {activeModal === 'ban' && (
                    <div className="space-y-6 text-left animate-in zoom-in duration-300">
                       
                       {/* Guidance Warning */}
                       {(selectedUser.punishmentCount || 0) >= 9 && (
                         <div className="p-6 bg-blue-600/10 border-2 border-blue-500/30 rounded-[32px] flex items-start gap-4 ring-4 ring-blue-500/5 transition-all">
                            <Info size={24} className="text-blue-500 shrink-0" />
                            <div className="space-y-1">
                               <div className="text-sm font-black text-armoyu-text uppercase italic tracking-tighter shadow-sm text-left underline decoration-blue-500/30">TOPLULUK REHBERLİĞİ GEREKLİ</div>
                               <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-80 leading-relaxed text-left">Bu kullanıcın {selectedUser.punishmentCount}. uyum ihlali. Lütfen ceza yerine önce saygı ve sevgi çerçevesinde bir uyarı mesajı göndermeyi değerlendirin. Ağır ihlaller hariç kalıcı yasaklama son seçenek olmalıdır.</p>
                            </div>
                         </div>
                       )}

                       <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {PUNISHMENT_RULES.map(rule => (
                            <button 
                              key={rule.id}
                              onClick={() => setSelectedRule(rule)}
                              className={`p-5 rounded-3xl border text-left transition-all relative overflow-hidden group ${
                                selectedRule?.id === rule.id ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' : 'border-white/5 bg-black/5 hover:border-white/20'
                              }`}
                            >
                               <div className="flex justify-between items-start mb-2">
                                  <div className="text-[10px] font-black uppercase tracking-widest leading-none text-blue-500 flex items-center gap-2 italic">
                                     {rule.isMajor ? <ShieldAlert size={12} className="text-red-500" /> : <AlertTriangle size={12} />}
                                     {rule.article}
                                  </div>
                                  <div className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                                     rule.severity === 'critical' ? 'bg-red-600 text-white animate-pulse' :
                                     rule.severity === 'high' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' :
                                     rule.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/20' :
                                     'bg-blue-500/20 text-blue-500 border border-blue-500/20'
                                  }`}>
                                     {rule.severity}
                                  </div>
                               </div>
                               <div className="text-base font-black text-armoyu-text uppercase italic tracking-tighter leading-none mb-3 underline decoration-blue-500/30 decoration-2 underline-offset-4">{rule.name}</div>
                               <p className="text-xs font-medium text-armoyu-text-muted leading-relaxed line-clamp-2 italic mb-2">"{rule.description}"</p>
                               
                               {selectedRule?.id === rule.id && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 transform scale-150">
                                     <CheckCircle2 size={48} />
                                  </div>
                               )}
                            </button>
                          ))}
                       </div>

                       {selectedRule && (
                         <div className="bg-gradient-to-br from-black/40 to-transparent border border-white/5 rounded-[32px] p-8 space-y-6 shadow-inner text-left relative overflow-hidden">
                             {/* Compliance Multiplier Overlay */}
                             {(selectedUser.punishmentCount || 0) > 0 && (
                               <div className="absolute top-2 right-4 text-[8px] font-black text-blue-500 uppercase tracking-[0.2em] opacity-60 italic">
                                 TOPLULUK UYUM KAT SAYISI: x{getCommunityComplianceLevel(selectedUser.punishmentCount || 0).multiplier}
                               </div>
                             )}

                            <div className="flex justify-between items-center text-left">
                               <div className="flex items-center gap-3 text-armoyu-text">
                                  <Clock size={16} className="text-blue-500" />
                                  <span className="text-xs font-black uppercase italic tracking-widest text-armoyu-text-muted">UGULANACAK SÜRE:</span>
                                </div>
                                <div className="flex flex-col items-end">
                                   <span className="text-sm font-black text-white bg-blue-600 px-4 py-1.5 rounded-xl uppercase tracking-widest shadow-lg shadow-blue-600/30 italic">
                                      {(selectedUser.punishmentCount || 0) >= 9 && selectedRule.isMajor ? 'KALICI (PERMANENT)' : (
                                        selectedRule.duration === 0 ? 'KALICI (PERMANENT)' : `${calculateEscalatedDuration(selectedRule.duration, selectedUser.punishmentCount || 0)} SAAT`
                                      )}
                                   </span>
                                   {(selectedUser.punishmentCount || 0) > 0 && selectedRule.duration > 0 && (
                                     <span className="text-[9px] font-bold text-armoyu-text-muted mt-1 uppercase italic tracking-widest">Temel: {selectedRule.duration} sa</span>
                                   )}
                                </div>
                            </div>

                            <div className="space-y-4 text-left">
                               <div className="flex items-center gap-3 text-armoyu-text">
                                  <Lock size={16} className="text-blue-500" />
                                  <span className="text-xs font-black uppercase italic tracking-widest text-armoyu-text-muted">KISITLAMALAR:</span>
                               </div>
                               <div className="flex flex-wrap gap-2 text-left">
                                  {(selectedUser.punishmentCount || 0) >= 9 && selectedRule.isMajor ? (
                                    <span className="flex items-center gap-2.5 px-4 py-2 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-red-600/20">
                                       <Ban size={14} /> KALICI YASAKLAMA (10/10)
                                    </span>
                                  ) : (
                                    selectedRule.restrictions.map(req => (
                                      <span key={req} className="flex items-center gap-2.5 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-[10px] font-black text-blue-500 uppercase tracking-widest italic transition-all hover:bg-blue-500/20">
                                         {req === 'CHAT_BAN' && <MessageSquareX size={14} />}
                                         {req === 'POST_BAN' && <FileX size={14} />}
                                         {req === 'LOGIN_BAN' && <Ban size={14} />}
                                         {req === 'PERMANENT_BAN' && <Lock size={14} />}
                                         {req === 'PROFILE_EDIT_BAN' && <Edit3 size={14} />}
                                         {getRestrictionLabel(req)}
                                      </span>
                                    ))
                                  )}
                               </div>
                            </div>
                         </div>
                       )}

                       <div className="space-y-4 text-left">
                          {selectedRule && (
                            <input 
                               type="text" 
                               placeholder="Rehberlik notu veya kısıtlama nedeni (Opsiyonel)"
                               className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all placeholder:text-armoyu-text-muted/40 italic shadow-inner"
                               value={banReason}
                               onChange={(e) => setBanReason(e.target.value)}
                            />
                          )}
                          <button 
                            onClick={handlePunish} 
                            disabled={!selectedRule}
                            className={`w-full py-6 font-black rounded-[28px] text-[13px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 group ${
                              selectedRule 
                              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40' 
                              : 'bg-black/20 text-armoyu-text-muted cursor-not-allowed opacity-50 grayscale'
                            }`}
                          >
                             <Ban size={22} className={selectedRule ? 'group-hover:rotate-12 transition-transform duration-500' : ''} /> 
                             {selectedRule ? 'İŞLEMİ VE REHBERLİK NOTUNU ONAYLA' : 'LÜTFEN BİR MADDE SEÇİN'}
                          </button>
                       </div>
                    </div>
                 )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/5 flex justify-center border-t border-armoyu-card-border">
                 <button onClick={() => setActiveModal(null)} className="text-[10px] font-black uppercase tracking-[0.3em] text-armoyu-text-muted hover:text-white transition-colors py-2">İptal Et ve Kapat</button>
              </div>
           </div>
        </div>
      )}
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-left">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-1 text-blue-600 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Yönetim Paneli</span>
           </div>
           <h1 className="text-4xl font-black text-armoyu-text uppercase italic tracking-tighter">KULLANICI <span className="text-blue-500">REHBERLİĞİ</span></h1>
           <p className="text-armoyu-text-muted font-medium text-sm mt-1 max-w-xl leading-relaxed uppercase overflow-hidden">Topluluk üyelerini destekle, gelişimlerini takip et ve huzur dolu bir ortam için rehberlik et.</p>
        </div>
        <button className="flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[24px] transition-all shadow-2xl shadow-blue-600/30 active:scale-95 whitespace-nowrap uppercase italic tracking-widest text-xs group">
           <UserPlus size={20} className="group-hover:scale-110 transition-transform" /> Yeni Bir Üye Davet Et
        </button>
      </div>

      {/* Filters & Control Bar */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[36px] p-2 flex flex-col md:flex-row gap-2 items-center shadow-sm">
        <div className="relative flex-1 w-full text-left">
           <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
           <input 
              type="text" 
              placeholder="Oyuncu adı veya kullanıcı adı ile ara..." 
              className="w-full pl-16 pr-6 py-5 bg-black/5 dark:bg-black/20 border border-transparent focus:border-blue-500/30 rounded-[28px] text-sm font-black text-armoyu-text transition-all focus:outline-none placeholder:text-armoyu-text-muted/40 italic uppercase tracking-tight"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
           />
        </div>
        <div className="flex items-center md:w-auto w-full px-2 text-left">
           <Filter size={18} className="text-armoyu-text-muted mx-4 hidden md:block" />
           <select 
             className="w-full md:w-60 px-6 py-5 bg-black/5 dark:bg-black/20 border border-transparent focus:border-blue-500/30 rounded-[28px] text-xs font-black uppercase tracking-widest text-armoyu-text focus:outline-none appearance-none cursor-pointer text-center"
             value={roleFilter}
             onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
           >
              <option value="all">Filtre: Tüm Roller</option>
              {Object.values(roles).map(role => (
                <option key={role.id} value={role.id}>{role.name.toUpperCase()}</option>
              ))}
           </select>
        </div>
      </div>

      {/* Main Content Table Container */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[44px] overflow-hidden shadow-xl text-left">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 dark:bg-black/20 border-b border-armoyu-card-border">
                <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Oyuncu Kimliği</th>
                <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Rol & Seviye</th>
                <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Topluluk Uyumu</th>
                <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {paginatedUsers.map((u) => (
                <tr key={u.username} className="hover:bg-blue-600/[0.03] transition-all group duration-500">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5 text-left">
                       <div className="relative shrink-0">
                          <img src={u.avatar} className="w-14 h-14 rounded-[20px] object-cover ring-2 ring-transparent group-hover:ring-blue-500/40 transition-all font-bold shadow-lg" alt="" />
                          {u.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-lg border-2 border-armoyu-card-bg shadow-sm">
                               <CheckCircle2 size={10} fill="currentColor" />
                            </div>
                          )}
                       </div>
                       <div className="min-w-0">
                          <div className="text-base font-black text-armoyu-text truncate max-w-[200px] uppercase italic tracking-tighter leading-none mb-1.5">{u.displayName}</div>
                          <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none bg-black/5 w-fit px-2 py-1 rounded-md">@{u.username}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2.5 text-left">
                       {getRoleBadge(u.role?.id)}
                       <div className="flex items-center gap-2 text-armoyu-text-muted">
                          <span className="text-[10px] font-black uppercase italic tracking-widest text-blue-500">Seviye {u.level || 1}</span>
                          <span className="text-[9px] font-bold opacity-40">/ {u.xp || 0} TP</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2.5 text-left">
                       <div className="flex justify-between items-center mb-1">
                          <div className="text-[10px] font-black uppercase tracking-widest italic" style={{ color: getCommunityComplianceLevel(u.punishmentCount || 0).color }}>
                             {getCommunityComplianceLevel(u.punishmentCount || 0).label}
                          </div>
                          <div className="text-[9px] font-extrabold text-armoyu-text-muted uppercase bg-black/10 px-2 py-0.5 rounded-md">
                             {u.punishmentCount || 0} İHLAL
                          </div>
                       </div>
                       <div className="w-40 h-2 bg-black/10 dark:bg-black/30 rounded-full overflow-hidden shadow-inner ring-1 ring-white/5 relative">
                          <div 
                            className="h-full transition-all duration-1000 shadow-[0_0_12px_rgba(59,130,246,0.3)]" 
                            style={{ 
                              width: `${Math.min(((u.punishmentCount || 0) / 10) * 100, 100)}%`,
                              backgroundColor: getCommunityComplianceLevel(u.punishmentCount || 0).color
                            }} 
                          />
                       </div>
                       {(u.punishmentCount || 0) > 0 && (
                         <div className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic opacity-60">
                           Uyum Katsayısı: x{getCommunityComplianceLevel(u.punishmentCount || 0).multiplier}
                         </div>
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-left">
                       <button 
                         onClick={() => { setSelectedUser(u); setActiveModal('role'); setNewRole(u.role?.id || ''); }}
                         className="p-3.5 text-armoyu-text-muted hover:text-blue-500 hover:bg-blue-500/10 rounded-[18px] transition-all border border-transparent hover:border-blue-500/20 shadow-sm"
                         title="Yetki Yönetimi"
                       >
                          <ShieldAlert size={22} />
                       </button>
                       <button 
                         onClick={() => { setSelectedUser(u); setActiveModal('message'); setMessageText(''); }}
                         className="p-3.5 text-armoyu-text-muted hover:text-emerald-500 hover:bg-emerald-500/10 rounded-[18px] transition-all border border-transparent hover:border-emerald-500/20 shadow-sm"
                         title="Direkt Mesaj"
                       >
                          <Mail size={22} />
                       </button>
                       <button 
                         onClick={() => { setSelectedUser(u); setActiveModal('ban'); setBanReason(''); setSelectedRule(null); }}
                         className="p-3.5 text-armoyu-text-muted hover:text-blue-500 hover:bg-blue-500/10 rounded-[18px] transition-all border border-transparent hover:border-blue-500/20 shadow-sm"
                         title="Topluluk Rehberliği"
                       >
                          <Edit3 size={22} />
                       </button>
                       <div className="w-px h-10 bg-armoyu-card-border mx-3 opacity-30 px-0" />
                       <button className="p-3.5 text-armoyu-text-muted hover:text-white hover:bg-black/20 rounded-[18px] transition-all px-3.5">
                          <MoreHorizontal size={22} />
                       </button>
                    </div>
                    {/* Mobile indicator */}
                    <div className="md:hidden group-hover:hidden">
                       <MoreHorizontal size={18} className="text-armoyu-text-muted ml-auto opacity-40 px-0" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-8 border-t border-armoyu-card-border flex items-center justify-between bg-black/5 dark:bg-black/20">
             <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] items-center gap-3 hidden lg:flex italic">
                <UserIcon size={14} className="text-blue-500" /> TOPLAM {filteredUsers.length} OYUNCU ARASINDAN SÜZÜLDÜ
             </div>
             <div className="flex items-center gap-6 mx-auto lg:mx-0">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/10 dark:bg-black/40 border border-armoyu-card-border text-armoyu-text-muted hover:text-white disabled:opacity-20 transition-all shadow-md active:scale-90"
                >
                   <ChevronLeft size={24} />
                </button>
                <div className="text-sm font-black text-armoyu-text px-6 uppercase italic tracking-widest bg-black/5 py-3 rounded-2xl border border-white/5 shadow-inner">
                   SAYFA <span className="text-blue-500">{currentPage}</span> / {totalPages}
                </div>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/10 dark:bg-black/40 border border-armoyu-card-border text-armoyu-text-muted hover:text-white disabled:opacity-20 transition-all shadow-md active:scale-90"
                >
                   <ChevronRight size={24} />
                </button>
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
