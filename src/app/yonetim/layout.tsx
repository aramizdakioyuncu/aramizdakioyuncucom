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
  ShieldCheck
} from 'lucide-react';

const sidebarItems = [
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
  const { user } = useAuth();

  const currentRole = user?.role?.id || '';
  const isAuthorized = !!(user && [
    'admin', 'member_mgmt', 'discipline', 'event_mgmt',
    'assetto_official', 'mc_official', 'streamer',
    'streamer_content', 'streamer_gaming', 'responsible', 'software_dev'
  ].includes(currentRole));

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
