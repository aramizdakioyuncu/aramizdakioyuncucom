'use client';

import React from 'react';
import { ARMOYUManagementLayout } from '@armoyu/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ARMOYUManagementLayout>{children}</ARMOYUManagementLayout>;
}
