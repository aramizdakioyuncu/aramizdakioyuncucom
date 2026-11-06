'use client';

import { CONSENT_KEY } from '@armoyu/ui';

/** Çerez tercihini sıfırlar; sayfa yenilenince bant yeniden sorar */
export function CookiePreferenceButton() {
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem(CONSENT_KEY);
        window.location.reload();
      }}
      className="px-5 py-2.5 rounded-xl border border-armoyu-card-border text-xs font-black uppercase tracking-widest"
    >
      Çerez tercihimi değiştir
    </button>
  );
}
