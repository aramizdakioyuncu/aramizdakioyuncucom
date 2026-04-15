'use client';

import React from 'react';
import { ArmoyuApi, User, Session } from '@armoyu/core';
import { 
  ArmoyuUI,
  AuthProvider, 
  CartProvider, 
  ThemeProvider, 
  ChatProvider, 
  SocketProvider, 
  LayoutProvider,
  ArmoyuProvider
} from '@armoyu/ui';

const api = new ArmoyuApi(process.env.NEXT_PUBLIC_API_KEY ?? 'dev', {
  baseUrl: typeof window !== 'undefined' 
    ? `${window.location.origin}/api/proxy`
    : '/api/proxy'
});

// Monkey-patch AuthService.me locally to fix session recovery without library changes
if (typeof window !== 'undefined') {
  const authService = api.auth as any;
  const originalMe = authService.me.bind(authService);
  
  authService.me = async function(): Promise<User | null> {
    try {
      // In ARMOYU legacy API, POST to /0/0/0 with the token returns the current user profile
      const apiKey = api.getApiKey();
      const response = await api.post(`/botlar/${apiKey}/0/0/0`, {});
      
      // Handle the standard icerik extraction logic manually here
      if (response && (response as any).durum == 1) {
        const icerik = (response as any).icerik;
        const userData = icerik && (icerik.user || icerik);
        return userData ? User.fromJSON(userData) : null;
      }
      return null;
    } catch (e) {
      console.warn('[Providers] Local me() patch failed, falling back:', e);
      return originalMe();
    }
  };
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
