'use client';

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Flag, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Plus,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Mock pending counts across platform
  const pendingApprovals = {
    users: 12,
    groups: 3,
    schools: 2,
    stations: 1
  };
  
  const totalPending = Object.values(pendingApprovals).reduce((a, b) => a + b, 0);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleQuickAction = (actionName: string) => {
    if (actionName === 'Üye Onayla') {
      showToast(`${pendingApprovals.users} yeni üye onay listesine yönlendiriliyorsunuz...`);
    } else if (actionName === 'Bülten Gönder') {
      showToast('Haftalık bülten 1,284 üyeye kuyruğa alındı.');
    } else {
      showToast(`${actionName} işlemi başlatıldı.`);
    }
  };

  const stats = [
    { name: 'Toplam Oyuncu', value: '1,284', change: '+12%', isUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Aktif Haberler', value: '452', change: '+5%', isUp: true, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Bekleyen Destek', value: '18', change: '-24%', isUp: false, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: 'Onay Bekleyenler', value: totalPending.toString(), change: 'Yeni', isUp: true, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const recentActivity = [
    { id: 1, user: 'Alperen', action: 'yeni bir haber paylaştı', target: 'CS2 Güncellemesi', time: '2 dakika önce', type: 'news' },
    { id: 2, user: 'MythX', action: 'bir kullanıcıyı askıya aldı', target: 'trol_oyuncu31', time: '15 dakika önce', type: 'moderation' },
    { id: 3, user: 'Sistem', action: 'yedekleme tamamlandı', target: 'Database_Global', time: '1 saat önce', type: 'system' },
    { id: 4, user: 'Metehan', action: 'yeni grup onayladı', target: 'Fast Five E-Spor', time: '3 saat önce', type: 'group' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative text-left leading-none">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right-10 duration-300">
           <div className={`px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 border border-white/5 backdrop-blur-2xl ${
             toast.type === 'success' ? 'bg-emerald-600/90 text-white' : 'bg-red-600/90 text-white'
           }`}>
              <CheckCircle2 size={20} />
              <span className="text-sm font-black uppercase tracking-tight">{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
                 <X size={16} />
              </button>
           </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black tracking-tight text-armoyu-text mb-1 uppercase italic">Genel <span className="text-blue-500 text-shadow-glow">Bakış</span></h1>
           <p className="text-armoyu-text-muted font-medium">Platformun güncel durumu ve bekleyen görevler.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-xs uppercase tracking-widest">
              <Plus size={18} /> Yeni İçerik
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 hover:border-blue-500/30 transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[40px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
               </div>
            </div>
            <div className="text-3xl font-black text-armoyu-text mb-1">{stat.value}</div>
            <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{stat.name}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] overflow-hidden">
           <div className="p-6 border-b border-armoyu-card-border flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                 <Activity size={20} className="text-blue-500" />
                 <h3 className="font-black uppercase tracking-widest text-[10px] text-armoyu-text">Sistem Aktiviteleri</h3>
              </div>
              <button className="text-[10px] font-black text-armoyu-text-muted hover:text-armoyu-text transition-colors uppercase tracking-widest">Tümünü Gör</button>
           </div>
           <div className="p-2">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group text-left">
                   <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center text-xs font-black text-armoyu-text-muted group-hover:text-blue-500 transition-colors uppercase leading-none">
                      {item.user[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-armoyu-text-muted leading-tight">
                         <span className="font-black text-armoyu-text uppercase italic">{item.user}</span> {item.action} 
                         <span className="text-blue-500 font-bold ml-1">#{item.target}</span>
                      </p>
                      <span className="text-[9px] font-bold text-armoyu-text-muted opacity-50 uppercase tracking-widest italic">{item.time}</span>
                   </div>
                   <button className="p-2 text-armoyu-text-muted hover:text-armoyu-text transition-colors">
                      <ExternalLink size={14} />
                   </button>
                </div>
              ))}
           </div>
           <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] text-center border-t border-armoyu-card-border">
              <Link href="/yonetim/logs" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors flex items-center justify-center gap-2 italic">
                 Detaylı Log Kayıtlarını İncele <ArrowRight size={12} />
              </Link>
           </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 shadow-xl shadow-blue-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -z-10 rounded-full" />
              <h3 className="text-xl font-black text-white mb-2 uppercase italic leading-tight">Platform Versiyonu <br/> <span className="text-black/50 tracking-[0.2em]">ARMOV V3.4</span></h3>
              <p className="text-blue-100 text-[11px] mb-6 font-medium leading-relaxed font-bold italic">Şu an sistem en güncel sürümde çalışıyor. Herhangi bir sorun tespit edilmedi.</p>
              <button className="w-full py-3 bg-white text-blue-600 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all active:scale-95 italic">Güncelleme Notları</button>
           </div>

           <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <h4 className="font-black uppercase tracking-widest text-[10px] text-armoyu-text-muted px-2">Hızlı İşlemler</h4>
                 {totalPending > 0 && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 text-amber-500 rounded-lg animate-pulse">
                       <AlertCircle size={12} />
                       <span className="text-[9px] font-black uppercase tracking-widest">{totalPending} Bekleyen Onay</span>
                    </div>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                 {[
                    { name: 'Üye Onayla', color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20', path: '/yonetim/kullanicilar' },
                    { name: 'Grup Onayla', color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20', path: '/yonetim/gruplar' },
                    { name: 'Okul Onayla', color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20', path: '/yonetim/okullar' },
                    { name: 'Sistem Kontrol', color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20', path: '/yonetim/istasyonlar' },
                 ].map(action => (
                    <Link 
                      key={action.name} 
                      href={action.path}
                      onClick={() => handleQuickAction(action.name)}
                      className={`px-2 py-4 rounded-[24px] ${action.color} border border-transparent transition-all text-[10px] font-black uppercase text-center active:scale-95 hover:shadow-lg flex flex-col items-center justify-center italic`}
                    >
                       {action.name}
                    </Link>
                 ))}
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
