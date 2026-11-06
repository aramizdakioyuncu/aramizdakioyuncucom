'use client';

import React, { useEffect, useState } from 'react';
import { ARMOYUCore, ApiVersion } from '@armoyu/core';
import { 
  ArmoyuUI,
  AuthProvider, 
  CartProvider, 
  ThemeProvider, 
  ChatProvider, 
  CallProvider,
  SocketProvider, 
  LayoutProvider,
  ArmoyuProvider,
  Session,
  CONSENT_KEY
} from '@armoyu/ui';
import { registerServiceWorker } from '@/components/CookieConsent';

// Test için eski / yeni backend seçimi (BackendSwitch); varsayılan yeni (Phatsa)
export const API_VERSION_KEY = 'armoyu_api_version';
const apiVersion = typeof window !== 'undefined' && localStorage.getItem(API_VERSION_KEY) === 'old' ? ApiVersion.OLD : ApiVersion.CURRENT;
const api = ARMOYUCore.initForProxy(apiVersion, '/api/proxy');

// Sync token from localStorage to API instance on initial load
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('armoyu_token');
  if (token) {
    api.setAuthToken(token);
    console.log('[Providers] Initial token found and restored to API instance');
  }
}

const ui = new ArmoyuUI(api);

// Çevrimdışı açılış için service worker; yalnızca çerez onayında "tümü" seçildiyse (CookieConsent)
if (typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'all') {
  if (document.readyState === 'complete') registerServiceWorker();
  else window.addEventListener('load', registerServiceWorker, { once: true });
}

export function Providers({ children }: { children: React.ReactNode }) {
  // P2P arama (Phatsa Görüşmeler) yalnızca yeni API'de; adres ve açık anahtar sunucudan
  const [callConfig, setCallConfig] = useState<{ url?: string; key?: string }>({});
  useEffect(() => {
    if (apiVersion !== ApiVersion.CURRENT) return;
    fetch('/api/call-config').then((r) => r.json()).then((c) => c.enabled && setCallConfig(c)).catch(() => undefined);
  }, []);

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
                  <CallProvider phatsaUrl={callConfig.url} phatsaKey={callConfig.key}>
                    {children}
                  </CallProvider>
                </ChatProvider>
              </SocketProvider>
            </LayoutProvider>
          </CartProvider>
        </AuthProvider>
      </ArmoyuProvider>
    </ThemeProvider>
  );
}
