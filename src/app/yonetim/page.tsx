'use client';

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Plus,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  ManagementStatsGrid, 
  ManagementActivityFeed, 
  ManagementQuickActions,
  ManagementHeader
} from '@armoyu/ui';

export default function AdminDashboard() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Mock pending counts
  const pendingApprovals = {
    users: 12,
    groups: 3,
    schools: 2,
    stations: 1
  };
  
  const totalPending = Object.values(pendingApprovals).reduce((a, b) => a + b, 0);

  const stats = [
    { name: 'Toplam Oyuncu', value: '1,284', change: '+12%', isUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Aktif Haberler', value: '452', change: '+5%', isUp: true, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Bekleyen Destek', value: '18', change: '-24%', isUp: false, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: 'Onay Bekleyenler', value: totalPending.toString(), change: 'Yeni', isUp: true, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const recentActivity = [
    { id: 1, user: { name: 'Alperen' }, action: 'yeni bir haber paylaştı', target: 'CS2 Güncellemesi', time: '2 dakika önce' },
    { id: 2, user: { name: 'MythX' }, action: 'bir kullanıcıyı askıya aldı', target: 'trol_oyuncu31', time: '15 dakika önce' },
    { id: 3, user: { name: 'Sistem' }, action: 'yedekleme tamamlandı', target: 'Database_Global', time: '1 saat önce' },
    { id: 4, user: { name: 'Metehan' }, action: 'yeni grup onayladı', target: 'Fast Five E-Spor', time: '3 saat önce' },
  ];

  const quickActions = [
    { name: 'Üye Onayla', color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20', path: '/yonetim/kullanicilar' },
    { name: 'Grup Onayla', color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20', path: '/yonetim/gruplar' },
    { name: 'Okul Onayla', color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20', path: '/yonetim/okullar' },
    { name: 'Sistem Kontrol', color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20', path: '/yonetim/istasyonlar' },
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
      <ManagementHeader 
        title={<>Genel <span className="text-blue-500 text-shadow-glow">Bakış</span></>}
        subtitle="Platformun güncel durumu ve bekleyen görevler."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-xs uppercase tracking-widest leading-none">
            <Plus size={18} /> Yeni İçerik
          </button>
        }
      />

      {/* Stats Grid */}
      <ManagementStatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2">
          <ManagementActivityFeed 
            activities={recentActivity}
            viewAllHref="/yonetim/logs"
          />
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6 leading-none">
           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 shadow-xl shadow-blue-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -z-10 rounded-full" />
              <h3 className="text-xl font-black text-white mb-2 uppercase italic leading-tight">Platform Versiyonu <br/> <span className="text-black/50 tracking-[0.2em]">ARMOV V3.4</span></h3>
              <p className="text-blue-100 text-[11px] mb-6 font-medium leading-relaxed font-bold italic">Şu an sistem en güncel sürümde çalışıyor. Herhangi bir sorun tespit edilmedi.</p>
              <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all active:scale-95 italic leading-none">Güncelleme Notları</button>
           </div>

           <ManagementQuickActions 
             actions={quickActions}
             pendingCount={totalPending}
           />
        </div>
      </div>

    </div>
  );
}
