'use client';

import React, { useEffect, useState } from 'react';
import { API_VERSION_KEY } from '@/app/Providers';

// İki sistemin oturumu ve önbelleği birbirini tanımaz; geçişte temizlenir
const SESSION_KEYS = ['armoyu_token', 'armoyu_refresh_token'];
const CACHE_PREFIXES = ['armoyu.cache.', 'armoyu.recentProfiles.', 'armoyu_cache:'];

/**
 * Test için eski API ile yeni backend (Phatsa) arasında geçiş.
 * shortcut: herkese görünür; test bitince kaldırılacak ya da yalnızca yetkililere gösterilecek
 */
export function BackendSwitch() {
  const [isOld, setIsOld] = useState<boolean | null>(null);

  useEffect(() => {
    setIsOld(localStorage.getItem(API_VERSION_KEY) === 'old');
  }, []);

  if (isOld === null) return null;

  const toggle = () => {
    const next = isOld ? 'current' : 'old';
    if (!confirm(`${next === 'old' ? 'Eski API' : 'Yeni backend (Phatsa)'} kullanılacak. Oturumun kapanacak ve sayfa yenilenecek. Devam edilsin mi?`)) return;
    localStorage.setItem(API_VERSION_KEY, next);
    SESSION_KEYS.forEach((key) => localStorage.removeItem(key));
    Object.keys(localStorage)
      .filter((key) => CACHE_PREFIXES.some((prefix) => key.startsWith(prefix)))
      .forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title="Test: eski API / yeni backend arasında geç"
      className="fixed bottom-4 left-4 z-[90] flex items-center gap-2 px-3 py-2 rounded-full border border-armoyu-card-border bg-armoyu-card-bg shadow-lg text-[11px] font-black uppercase tracking-widest text-armoyu-text"
    >
      <span className={`w-2.5 h-2.5 rounded-full ${isOld ? 'bg-amber-500' : 'bg-emerald-500'}`} aria-hidden="true" />
      {isOld ? 'Eski API' : 'Yeni (Phatsa)'}
      <span className="text-armoyu-text-muted font-bold normal-case tracking-normal">· değiştir</span>
    </button>
  );
}
