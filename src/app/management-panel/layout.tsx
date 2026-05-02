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
  { name: 'Genel Bakış', href: '/management-panel', icon: LayoutDashboard, requiredRoles: [] },
  { name: 'Üye Yönetimi', href: '/management-panel/users', icon: Users, requiredRoles: ['admin', 'member_mgmt'] },
  { name: 'Düzen & Disiplin', href: '/management-panel/support', icon: ShieldCheck, requiredRoles: ['admin', 'discipline'] },
  { name: 'Etkinlik Yönetimi', href: '/management-panel/events', icon: Calendar, requiredRoles: ['admin', 'event_mgmt', 'assetto_official', 'mc_official'] },
  { name: 'Haberler & Blog', href: '/management-panel/news', icon: FileText, requiredRoles: ['admin', 'software_dev', 'responsible'] },
  { name: 'Gruplar & Forum', href: '/management-panel/groups', icon: Users, requiredRoles: ['admin', 'member_mgmt', 'responsible'] },
  { name: 'Sosyal Medya', href: '/management-panel/social-media', icon: BarChart3, requiredRoles: ['admin', 'responsible'] },
  { name: 'Okullar', href: '/management-panel/schools', icon: Users, requiredRoles: ['admin', 'member_mgmt', 'responsible'] },
  { name: 'İstasyonlar', href: '/management-panel/stations', icon: Settings, requiredRoles: ['admin', 'software_dev'] },
  { name: 'Yayıncılar', href: '/management-panel/streamers', icon: BarChart3, requiredRoles: ['admin', 'streamer', 'streamer_content', 'streamer_gaming'] },
  { name: 'Sistem Ayarları', href: '/management-panel/settings', icon: Settings, requiredRoles: ['admin', 'software_dev'] },
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
