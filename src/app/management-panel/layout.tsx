'use client';

import React from 'react';
import { ManagementLayout, useAuth } from '@armoyu/ui';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  ShieldCheck,
  Edit3
} from 'lucide-react';

const sidebarItems = [
  { name: 'Genel Bakış', href: '/management-panel', icon: LayoutDashboard, requiredRoles: [] },
  { name: 'İstatistikler', href: '/management-panel/statistics', icon: BarChart3, requiredRoles: [] },
  { 
    name: 'Yönetim Ekibi', 
    href: '#', 
    icon: ShieldCheck, 
    requiredRoles: [],
    subItems: [
      { name: 'Üye Yönetimi', href: '/management-panel/users', icon: Users },
      { name: 'Destek & Bildirim', href: '/management-panel/support', icon: FileText },
      { name: 'Etkinlik Yönetimi', href: '/management-panel/events', icon: Calendar },
    ]
  },
  { 
    name: 'Sorumlular', 
    href: '#', 
    icon: Users, 
    requiredRoles: [],
    subItems: [
      { name: 'Sosyal Medya', href: '/management-panel/social-media' },
      { name: 'Yayıncılar', href: '/management-panel/streamers' },
      { name: 'Topluluk Moderasyonu', href: '/management-panel/recruitment' },
    ]
  },
  { 
    name: 'Editör Araçları', 
    href: '#', 
    icon: Edit3, 
    requiredRoles: [],
    subItems: [
      { name: 'Haberler & Blog', href: '/management-panel/news' },
      { name: 'Okullar', href: '/management-panel/schools' },
      { name: 'Gruplar', href: '/management-panel/groups' },
      { name: 'İstasyonlar', href: '/management-panel/stations' },
    ]
  },
  { name: 'Sistem Ayarları', href: '/management-panel/settings', icon: Settings, requiredRoles: [] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Şimdilik sadece giriş yapmış olmak yeterli (Yetki aramadan)
  const isAuthorized = !!user;

  return (
    <ManagementLayout
      sidebarItems={sidebarItems}
      user={user}
      isAuthorized={isAuthorized}
      brandName="ARMOYU"
      panelVersion="ARMOYU MGM V3"
    >
      {children}
    </ManagementLayout>
  );
}
