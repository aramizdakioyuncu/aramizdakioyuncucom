'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_KEY, clearCache } from '@armoyu/ui';

/** İşlevsel depolama (önbellek, son bakılanlar) ve çevrimdışı açılış yalnızca "tümü" onayıyla */
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return;
  navigator.serviceWorker.register('/sw.js').catch((error) => console.warn('[CookieConsent] Service worker kaydı başarısız:', error));
}

async function removeServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
  if ('caches' in window) {
    for (const key of await caches.keys()) if (key.startsWith('armoyu-')) await caches.delete(key);
  }
}

/** Çerez / yerel depolama onayı (KVKK): seçim yapılana kadar alt bantta */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(CONSENT_KEY));
  }, []);

  if (!visible) return null;

  const choose = (choice: 'all' | 'necessary') => {
    localStorage.setItem(CONSENT_KEY, choice);
    if (choice === 'all') registerServiceWorker();
    else {
      clearCache();
      removeServiceWorker();
    }
    setVisible(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Çerez tercihleri" className="fixed inset-x-0 bottom-0 z-[95] p-4">
      <div className="max-w-4xl mx-auto bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl shadow-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
        <p className="flex-1 text-sm text-armoyu-text">
          Oturumunu açık tutmak için zorunlu çerezler kullanıyoruz. Sayfaların hızlı ve internetsiz de açılması için
          tarayıcında içerik saklamak istiyoruz. Reklam ya da takip çerezi kullanmıyoruz. Ayrıntılar:{' '}
          <Link href="/cerez-politikasi" className="text-armoyu-primary font-bold hover:underline">Çerez Politikası</Link>
          {' · '}
          <Link href="/kvkk" className="text-armoyu-primary font-bold hover:underline">KVKK Aydınlatma Metni</Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={() => choose('necessary')} className="px-4 py-2.5 rounded-xl border border-armoyu-card-border text-xs font-black uppercase tracking-widest text-armoyu-text">
            Yalnızca zorunlu
          </button>
          <button type="button" onClick={() => choose('all')} className="px-4 py-2.5 rounded-xl bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest">
            Tümünü kabul et
          </button>
        </div>
      </div>
    </div>
  );
}
