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
  ManagementDashboard
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
    { name: 'Üye Onayla', color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20', path: '/management-panel/users' },
    { name: 'Grup Onayla', color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20', path: '/management-panel/groups' },
    { name: 'Okul Onayla', color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20', path: '/management-panel/schools' },
    { name: 'Sistem Kontrol', color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20', path: '/management-panel/stations' },
  ];

  const memberData = [
    { label: 'Pzt', value: 45 },
    { label: 'Sal', value: 52 },
    { label: 'Çar', value: 38 },
    { label: 'Per', value: 65 },
    { label: 'Cum', value: 48 },
    { label: 'Cmt', value: 82 },
    { label: 'Paz', value: 70 },
  ];

  const eventData = [
    { label: 'Pzt', value: 12 },
    { label: 'Sal', value: 18 },
    { label: 'Çar', value: 15 },
    { label: 'Per', value: 25 },
    { label: 'Cum', value: 20 },
    { label: 'Cmt', value: 35 },
    { label: 'Paz', value: 30 },
  ];

  const reportData = {
    open: 8,
    closed: 42,
    pending: 12
  };

  return (
    <>
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

      <ManagementDashboard
        stats={stats}
        activities={recentActivity}
        quickActions={quickActions}
        pendingCount={totalPending}
        memberData={memberData}
        eventData={eventData}
        reportData={reportData}
        onNewContentClick={() => setToast({ message: 'Yeni içerik oluşturma açılıyor...', type: 'success' })}
        onUpdateNotesClick={() => setToast({ message: 'Güncelleme notları yükleniyor...', type: 'success' })}
      />
    </>
  );
}
