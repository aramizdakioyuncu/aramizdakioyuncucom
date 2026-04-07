'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@armoyu/ui';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  ShieldCheck,
  Menu,
  X,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  requiredRoles: string[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Genel Bakış', href: '/yonetim', icon: LayoutDashboard, requiredRoles: [] },
  { name: 'Kullanıcılar', href: '/yonetim/kullanicilar', icon: Users, requiredRoles: ['admin', 'member_mgmt'] },
  { name: 'Haberler & Blog', href: '/yonetim/haberler', icon: FileText, requiredRoles: ['admin', 'software_dev', 'responsible'] },
  { name: 'Destek & Bildirim', href: '/yonetim/destek', icon: ShieldCheck, requiredRoles: ['admin', 'discipline'] },
  { name: 'Etkinlik Yönetimi', href: '/yonetim/etkinlikler', icon: Calendar, requiredRoles: ['admin', 'event_mgmt', 'assetto_official', 'mc_official'] },
  { name: 'Okullar', href: '/yonetim/okullar', icon: Users, requiredRoles: ['admin', 'member_mgmt', 'responsible'] },
  { name: 'Gruplar', href: '/yonetim/gruplar', icon: Users, requiredRoles: ['admin', 'member_mgmt', 'responsible'] },
  { name: 'İstasyonlar', href: '/yonetim/istasyonlar', icon: Settings, requiredRoles: ['admin', 'software_dev'] },
  { name: 'Yayıncılar', href: '/yonetim/yayincilar', icon: BarChart3, requiredRoles: ['admin', 'streamer', 'streamer_content', 'streamer_gaming'] },
  { name: 'Sosyal Medya', href: '/yonetim/sosyal-medya', icon: LayoutDashboard, requiredRoles: ['admin', 'responsible'] },
  { name: 'Sistem Ayarları', href: '/yonetim/ayarlar', icon: Settings, requiredRoles: ['admin', 'software_dev'] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();

  // New Granular Security Check
  const currentRole = user?.role?.id || '';
  const isAuthorized = user && [
    'admin', 'member_mgmt', 'discipline', 'event_mgmt',
    'assetto_official', 'mc_official', 'streamer',
    'streamer_content', 'streamer_gaming', 'responsible', 'software_dev'
  ].includes(currentRole);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-armoyu-bg flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <ShieldCheck size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-black text-armoyu-text mb-2">Erişim Reddedildi</h1>
        <p className="text-armoyu-text-muted max-w-md mb-8 font-medium">Bu sayfaya erişmek için yetkiniz bulunmuyor. Eğer bir hata olduğunu düşünüyorsanız lütfen sistem yöneticisi ile iletişime geçin.</p>
        <Link
          href="/"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-armoyu-bg text-armoyu-text flex overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 h-full bg-armoyu-header-bg border-r border-armoyu-header-border transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-[280px]' : 'w-0 lg:w-[80px] overflow-hidden'
          }`}
      >
        {/* Logo Section */}
        <div className="h-[76px] flex items-center px-6 border-b border-armoyu-header-border shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} className="text-white" />
            </div>
            {isSidebarOpen && (
              <span className="font-black text-lg tracking-tighter uppercase italic text-armoyu-text">ARMOYU <span className="text-blue-500">MGM</span></span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 hide-scrollbar">
          {sidebarItems
            .filter(item =>
              item.requiredRoles.length === 0 ||
              (user?.role?.id && item.requiredRoles.includes(user.role.id))
            )
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                >
                  <item.icon size={20} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                  {isSidebarOpen && (
                    <span className="font-bold text-sm truncate">{item.name}</span>
                  )}
                  {isSidebarOpen && isActive && (
                    <ChevronRight size={14} className="ml-auto opacity-50" />
                  )}
                </Link>
              );
            })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-armoyu-header-border space-y-4">
          {isSidebarOpen && user && (
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
                <div className="min-w-0">
                  <div className="text-xs font-black truncate text-armoyu-text">{user.displayName}</div>
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{user.role?.name}</div>
                </div>
              </div>
              <Link href="/" className="flex items-center justify-center gap-2 w-full py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors text-armoyu-text-muted hover:text-armoyu-text">
                <ArrowLeft size={12} /> Paneleden Çık
              </Link>
            </div>
          )}
          {!isSidebarOpen && (
            <Link href="/" className="w-10 h-10 mx-auto bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl flex items-center justify-center text-armoyu-text-muted transition-colors">
              <ArrowLeft size={20} />
            </Link>
          )}
          <div className="text-center">
            <span className="text-[10px] font-bold text-armoyu-text-muted opacity-50 uppercase tracking-widest">ARMOYU V3 ADMIN</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-screen">

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar">
          {/* Mobile Sidebar Toggle (Floating) */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-armoyu-header-bg border border-armoyu-header-border rounded-2xl text-armoyu-text shadow-xl"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Width-Controlled Wrapper */}
          <div className="mx-auto w-full lg:w-[var(--panel-width,var(--armoyu-panel-width,90%))] transition-all duration-300">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
