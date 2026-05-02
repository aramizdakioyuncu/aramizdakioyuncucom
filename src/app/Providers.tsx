'use client';

import React from 'react';
import { ArmoyuApi } from '@armoyu/core';
import { 
  ArmoyuUI,
  AuthProvider, 
  CartProvider, 
  ThemeProvider, 
  ChatProvider, 
  SocketProvider, 
  LayoutProvider,
  ArmoyuProvider,
  Session
} from '@armoyu/ui';

const api = new ArmoyuApi(process.env.NEXT_PUBLIC_API_KEY ?? 'dev', {
  baseUrl: typeof window !== 'undefined' 
    ? `${window.location.origin}/api/proxy`
    : '/api/proxy'
});

// Sync token from localStorage to API instance on initial load
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('armoyu_token');
  if (token) {
    api.setToken(token);
    console.log('[Providers] Initial token found and restored to API instance');
  }
}

const ui = new ArmoyuUI(api);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ArmoyuProvider 
        ui={ui} 
        navigation={{ 
          profilePrefix: '/oyuncular', 
          groupPrefix: '/gruplar', 
          forumPrefix: '/forum', 
          educationPrefix: '/egitim' 
        }}
      >
        <AuthProvider>
          <CartProvider>
            <LayoutProvider>
              <SocketProvider>
                <ChatProvider>
                  {children}
                </ChatProvider>
              </SocketProvider>
            </LayoutProvider>
          </CartProvider>
        </AuthProvider>
      </ArmoyuProvider>
    </ThemeProvider>
  );
}
