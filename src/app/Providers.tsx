'use client';

import React from 'react';
import { ARMOYUCore, ApiVersion } from '@armoyu/core';
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

const api = ARMOYUCore.initForProxy(ApiVersion.CURRENT, '/api/proxy');

// Sync token from localStorage to API instance on initial load
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('armoyu_token');
  if (token) {
    api.setAuthToken(token);
    console.log('[Providers] Initial token found and restored to API instance');
  }
}

const ui = new ArmoyuUI(api);

// Çevrimdışı açılış için service worker; geliştirmede kapalı (anlık yeniden yükleme önbelleğe takılmasın)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  const register = () => navigator.serviceWorker.register('/sw.js').catch((error) => console.warn('[Providers] Service worker kaydı başarısız:', error));
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ArmoyuProvider 
        ui={ui} 
        navigation={{ 
          profilePrefix: '/oyuncular', 
          groupPrefix: '/gruplar', 
          forumPrefix: '/forum', 
          educationPrefix: '/egitim',
          // Kütüphanenin varsayılanları İngilizce (/news, /store…); sitenin sayfaları Türkçe
          newsPrefix: '/haberler',
          storePrefix: '/magaza',
          giveawayPrefix: '/cekilisler',
          galleryPrefix: '/galeriler',
          projectPrefix: '/projeler',
          myArticlesPrefix: '/yazilarim',
          pollPrefix: '/anketler',
          supportPrefix: '/destek'
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
