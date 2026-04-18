'use client';

import React from 'react';
import { ArmoyuApi, Session } from '@armoyu/core';
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
  const token = localStorage.getItem('armoyu_token');
  if (token) {
    api.setToken(token);
    console.log('[Providers] Initial token restored from localStorage');
  }

  const authService = api.auth as any;
  const originalMe = authService.me.bind(authService);
  
  authService.me = async function(): Promise<any | null> {
    try {
      const activeToken = localStorage.getItem('armoyu_token');
      if (!activeToken) return null;

      const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'dev';
      
      // In ARMOYU legacy API, we might need to send the token in the body too
      const response = await api.post(`/botlar/${apiKey}/0/0/0`, {
        token: activeToken,
        action: 'me'
      });
      
      if (response && (response as any).durum == 1) {
        const icerik = (response as any).icerik;
        const userData = icerik && (icerik.user || icerik);
        
        if (userData) {
          console.log('[Providers] Session successfully recovered for:', userData.ad || userData.kullaniciadi);
          
          // Ensure the token is set on the api instance for all future requests
          api.setToken(activeToken);
          
          // Wrap in ServiceResponse format as expected by AuthProvider
          return {
            durum: 1,
            aciklama: 'Oturum başarıyla kurtarıldı',
            icerik: userData
          };
        }
      }
      
      console.warn('[Providers] Session recovery failed: Invalid response', response);
      return null;
    } catch (e) {
      console.error('[Providers] Local me() patch failed:', e);
      return null;
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
