'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MailCheck, MailX, Loader2 } from 'lucide-react';

type State = 'checking' | 'ok' | 'error';

/** Phatsa'nın doğrulama e-postasındaki bağlantı: /verify-email?token=... */
export default function VerifyEmailPage() {
  const [state, setState] = useState<State>('checking');
  const [message, setMessage] = useState('');
  // Token tek kullanımlık: geliştirme modunda efekt iki kez çalışınca ikinci istek hata verirdi
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      setState('error');
      setMessage('Doğrulama bağlantısı eksik. E-postadaki bağlantıyı yeniden aç.');
      return;
    }

    // shortcut: yayınlanan @armoyu/core'da verifyEmail yok (1.2.3'te var); proxy'ye doğrudan gidiliyor
    fetch('/api/proxy/v1/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        setState(data?.durum === 1 ? 'ok' : 'error');
        setMessage(data?.aciklama || '');
      })
      .catch(() => {
        setState('error');
        setMessage('Sunucuya ulaşılamadı, biraz sonra tekrar dene.');
      });
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-8 shadow-xl space-y-6 text-center">
        <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${state === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-armoyu-primary/10 text-armoyu-primary'}`}>
          {state === 'checking' && <Loader2 size={28} className="animate-spin" />}
          {state === 'ok' && <MailCheck size={28} />}
          {state === 'error' && <MailX size={28} />}
        </div>
        <h1 className="text-2xl font-black text-armoyu-text uppercase tracking-tight">
          {state === 'checking' ? 'Doğrulanıyor' : state === 'ok' ? 'E-posta Doğrulandı' : 'Doğrulanamadı'}
        </h1>
        <p className="text-sm text-armoyu-text-muted">
          {state === 'checking' && 'Bağlantın kontrol ediliyor…'}
          {state === 'ok' && (message || 'E-posta adresin doğrulandı.')}
          {state === 'error' && (message || 'Bağlantı geçersiz ya da süresi dolmuş.')}
        </p>
        {state === 'error' && (
          <p className="text-xs text-armoyu-text-muted">
            Giriş yaptıktan sonra sayfanın üstündeki uyarıdan yeni bir doğrulama e-postası isteyebilirsin.
          </p>
        )}
        {state !== 'checking' && (
          <Link href="/" className="inline-block px-6 py-3 rounded-xl bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest">
            Ana sayfaya dön
          </Link>
        )}
      </div>
    </main>
  );
}
