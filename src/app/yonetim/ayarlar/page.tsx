'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  ShieldCheck, 
  Share2, 
  Cpu, 
  Save, 
  RotateCcw, 
  Image as ImageIcon,
  Link as LinkIcon,
  AlertTriangle,
  Mail,
  Play,
  Camera,
  Send,
  UserCheck,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Terminal
} from 'lucide-react';
import { SystemSettings } from '@/models';

type TabType = 'genel' | 'erisim' | 'sosyal' | 'gelismis';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('genel');
  const [settings, setSettings] = useState<SystemSettings>(new SystemSettings());
  const [isSaved, setIsSaved] = useState(false);

  // Tab Definitions
  const tabs = [
    { id: 'genel', name: 'Genel', icon: Globe },
    { id: 'erisim', name: 'Erişim', icon: ShieldCheck },
    { id: 'sosyal', name: 'Sosyal Medya', icon: Share2 },
    { id: 'gelismis', name: 'Gelişmiş', icon: Cpu },
  ];

  const handleToggle = (field: 'isMaintenanceMode' | 'isRegistrationOpen') => {
    setSettings(prev => {
      const next = prev.clone();
      next[field] = !next[field];
      return next;
    });
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-left">
      
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-armoyu-text uppercase italic">Sistem <span className="text-blue-500">Ayarları</span></h1>
           <p className="text-armoyu-text-muted font-medium text-sm">Platform genelindeki tüm yapılandırmaları buradan yönet.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-6 py-3 bg-black/5 dark:bg-white/5 text-armoyu-text hover:bg-black/10 dark:hover:bg-white/10 font-bold rounded-2xl transition-all flex items-center gap-2">
              <RotateCcw size={18} /> Sıfırla
           </button>
           <button 
             onClick={handleSave}
             className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 active:scale-95"
           >
              {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
              {isSaved ? 'Kaydedildi' : 'Değişiklikleri Kaydet'}
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:w-64 space-y-1">
           {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-[20px] transition-all font-bold text-sm ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                   <tab.icon size={20} />
                   {tab.name}
                </button>
              );
           })}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1">
           <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] p-8 md:p-10 min-h-[500px]">
              
              {/* TAB: GENEL */}
              {activeTab === 'genel' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3 mb-8">
                         <Globe className="text-blue-500" /> Temel Yapılandırma
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">Site Başlığı</label>
                            <input 
                               type="text" 
                               defaultValue={settings.siteTitle}
                               className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none"
                            />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">Versiyon Bilgisi</label>
                            <input 
                               type="text" 
                               defaultValue={settings.version}
                               className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none"
                            />
                         </div>
                         <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">SEO Açıklaması</label>
                            <textarea 
                               rows={3}
                               defaultValue={settings.siteDescription}
                               className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold text-armoyu-text transition-all focus:outline-none resize-none"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6 pt-8 border-t border-armoyu-card-border">
                      <h3 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3">
                         <ImageIcon className="text-emerald-500" /> Markalama ve Görsel
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                         <div className="space-y-6">
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">Logo URL</label>
                               <div className="relative">
                                  <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
                                  <input 
                                     type="text" 
                                     defaultValue={settings.branding.logoUrl}
                                     className="w-full pl-12 pr-4 py-3.5 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none"
                                  />
                               </div>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">Favicon URL</label>
                               <div className="relative">
                                  <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
                                  <input 
                                     type="text" 
                                     defaultValue={settings.branding.faviconUrl}
                                     className="w-full pl-12 pr-4 py-3.5 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none"
                                  />
                               </div>
                            </div>
                         </div>
                         <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[32px] border border-armoyu-card-border flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl border border-armoyu-card-border flex items-center justify-center mb-4 shadow-sm">
                               <span className="text-blue-500 font-black italic">AV3</span>
                            </div>
                            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-1 italic">Logo Önizleme</p>
                            <p className="text-[9px] font-medium text-armoyu-text-muted opacity-50">Logonuz tüm platform genelinde bu şekilde görünecektir.</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* TAB: ERİŞİM */}
              {activeTab === 'erisim' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-4">
                      <h3 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3 mb-8">
                         <ShieldCheck className="text-amber-500" /> Platform Erişimi
                      </h3>

                      <div className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border p-6 rounded-[32px] flex items-center justify-between group">
                         <div className="flex gap-4 items-center">
                            <div className={`p-3.5 rounded-2xl transition-all ${settings.isMaintenanceMode ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted'}`}>
                               <AlertTriangle size={24} />
                            </div>
                            <div>
                               <h4 className="font-black text-armoyu-text uppercase italic">Bakım Modu</h4>
                               <p className="text-xs font-medium text-armoyu-text-muted leading-tight">Aktif edildiğinde sadece yöneticiler siteye erişebilir.</p>
                            </div>
                         </div>
                         <button 
                            onClick={() => handleToggle('isMaintenanceMode')}
                            className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings.isMaintenanceMode ? 'bg-amber-500' : 'bg-black/10 dark:bg-white/10'}`}
                         >
                            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${settings.isMaintenanceMode ? 'left-7' : 'left-1'}`} />
                         </button>
                      </div>

                      <div className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border p-6 rounded-[32px] flex items-center justify-between group">
                         <div className="flex gap-4 items-center">
                            <div className={`p-3.5 rounded-2xl transition-all ${settings.isRegistrationOpen ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted'}`}>
                               <UserCheck size={24} />
                            </div>
                            <div>
                               <h4 className="font-black text-armoyu-text uppercase italic">Üye Kayıtları</h4>
                               <p className="text-xs font-medium text-armoyu-text-muted leading-tight">Platforma yeni üye alımını açar veya kapatır.</p>
                            </div>
                         </div>
                         <button 
                            onClick={() => handleToggle('isRegistrationOpen')}
                            className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings.isRegistrationOpen ? 'bg-emerald-500' : 'bg-black/10 dark:bg-white/10'}`}
                         >
                            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${settings.isRegistrationOpen ? 'left-7' : 'left-1'}`} />
                         </button>
                      </div>
                   </div>

                   <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-[32px] flex gap-4">
                      <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                      <div>
                         <h5 className="font-black text-amber-600 dark:text-amber-400 text-sm uppercase italic">Dikkat Gerektirir</h5>
                         <p className="text-xs font-medium text-amber-700/70 dark:text-amber-400/50 leading-relaxed mt-1">Bakım modunu aktif etmek, aktif olan tüm kullanıcı oturumlarını etkileyecektir. Bu işlemi yapmadan önce duyuru geçmeniz önerilir.</p>
                      </div>
                   </div>
                </div>
              )}

              {/* TAB: SOSYAL */}
              {activeTab === 'sosyal' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <h3 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3 mb-8">
                      <Share2 className="text-purple-500" /> Sosyal Entegrasyonlar
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2 flex items-center gap-2 italic">
                            <MessageSquare size={12} fill="currentColor" className="text-[#5865F2]" /> Discord Sunucusu
                         </label>
                         <input type="text" defaultValue={settings.socialLinks.discord} className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#5865F2]/30 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2 flex items-center gap-2 italic">
                            <Play size={14} fill="currentColor" className="text-[#FF0000]" /> YouTube Kanalı
                         </label>
                         <input type="text" defaultValue={settings.socialLinks.youtube} className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#FF0000]/30 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2 flex items-center gap-2 italic">
                            <Camera size={14} className="text-[#E4405F]" /> Instagram Hesabı
                         </label>
                         <input type="text" defaultValue={settings.socialLinks.instagram} className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#E4405F]/30 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2 flex items-center gap-2 italic">
                            <Send size={14} fill="currentColor" className="text-[#1DA1F2]" /> X / Twitter
                         </label>
                         <input type="text" defaultValue={settings.socialLinks.twitter} className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#1DA1F2]/30 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                         <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2 flex items-center gap-2 italic">
                            <Terminal size={14} fill="currentColor" className="text-armoyu-text" /> GitHub Organizasyonu
                         </label>
                         <input type="text" defaultValue={settings.socialLinks.github} className="w-full px-5 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-armoyu-text/20 rounded-2xl text-xs font-bold text-armoyu-text focus:outline-none" />
                      </div>
                   </div>
                </div>
              )}

              {/* TAB: GELİŞMİŞ */}
              {activeTab === 'gelismis' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3">
                         <Cpu className="text-indigo-500" /> Sistem ve Çekirdek
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-6 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-[32px] flex items-center justify-between group">
                            <div>
                               <h4 className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest mb-1 italic">Önbellek (Cache)</h4>
                               <p className="text-sm font-black text-armoyu-text">Platform Nesnelerini Temizle</p>
                            </div>
                            <button className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                               <Trash2 size={24} />
                            </button>
                         </div>
                         <div className="p-6 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-[32px] flex items-center justify-between group">
                            <div>
                               <h4 className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest mb-1 italic">Sürüm Kontrolü</h4>
                               <p className="text-sm font-black text-armoyu-text italic uppercase">ARMOYU Core {settings.version}</p>
                            </div>
                            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                               <CheckCircle2 size={24} />
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3">
                         <Terminal className="text-armoyu-text-muted" /> Sistem Kayıtları (Logs)
                      </h3>
                      <div className="bg-[#12121e] dark:bg-black rounded-[28px] p-6 font-mono text-[11px] space-y-1 text-emerald-500/80 leading-snug shadow-inner border border-white/5">
                         <div>[14:22:04] APP_INIT: Platform objects initialized.</div>
                         <div>[14:22:05] SOCKET_CONNECTED: Connected to real-time sync server.</div>
                         <div>[14:25:31] ADMIN_LOGIN: User 'berkaytikenoglu' authenticated for MGM.</div>
                         <div>[14:30:12] DB_SYNC: Core database synchronized successfully.</div>
                         <div className="animate-pulse">_</div>
                      </div>
                   </div>
                </div>
              )}

           </div>
        </div>
      </div>

    </div>
  );
}
