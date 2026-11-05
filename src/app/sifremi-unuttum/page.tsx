'use client';

import React, { useEffect, useState } from 'react';
import { KeyRound, Mail, Smartphone, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@armoyu/ui';

type Method = 'email' | 'phone';
type Step = 'request' | 'reset' | 'done';

const RESEND_SECONDS = 60;
const inputClass = 'w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-armoyu-primary transition-colors';

// shortcut: çekirdekte telefonla sıfırlama metodu yok; proxy'ye doğrudan gidiliyor, @armoyu/core'a eklenince ona geçilecek
async function post(path: string, body: Record<string, unknown>) {
  const response = await fetch(`/api/proxy/v1/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: data?.durum === 1, message: String(data?.aciklama || (response.ok ? '' : 'Bir hata oluştu, tekrar dene.')) };
}

/**
 * Şifremi unuttum (Phatsa Kimlik Doğrulama): e-postaya / SMS'e 6 haneli kod ya da e-postadaki bağlantı (?token=).
 * /forgot-password ve /reset-password (Phatsa'nın e-posta bağlantısı) da bu sayfayı açar.
 */
export default function ForgotPasswordPage() {
  const { user, isLoading, setIsLoginModalOpen } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>('request');
  const [method, setMethod] = useState<Method>('email');
  const [target, setTarget] = useState('');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [resendIn, setResendIn] = useState(0);

  // Oturum açıkken şifre sıfırlamaya gerek yok (kayıt da yalnızca oturum kapalıyken açılan giriş penceresinde)
  useEffect(() => {
    if (!isLoading && user) router.replace('/');
  }, [isLoading, user, router]);

  // E-postadaki bağlantıyla gelindiyse kod adımı atlanır
  useEffect(() => {
    const fromLink = new URLSearchParams(window.location.search).get('token');
    if (fromLink) {
      setToken(fromLink);
      setStep('reset');
    }
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const requestCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!target.trim() || busy) return;
    setBusy(true);
    setError('');
    const result = await post('forgot-password', method === 'email' ? { email: target.trim() } : { phone: target.trim() });
    setBusy(false);
    if (!result.ok) return setError(result.message);
    setInfo(result.message);
    setResendIn(RESEND_SECONDS);
    setStep('reset');
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (password.length < 8) return setError('Şifre en az 8 karakter olmalı.');
    if (password !== passwordAgain) return setError('Şifreler aynı değil.');
    setBusy(true);
    setError('');
    const result = await post('reset-password', token
      ? { token, new_password: password }
      : { [method]: target.trim(), code: code.trim(), new_password: password });
    setBusy(false);
    if (!result.ok) return setError(result.message);
    setStep('done');
  };

  // Oturum durumu belli olana kadar ya da yönlendirilirken form gösterilmez
  if (isLoading || user) return <main className="min-h-[70vh]" aria-busy="true" />;

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-armoyu-primary/10 text-armoyu-primary flex items-center justify-center">
            {step === 'done' ? <CheckCircle2 size={28} /> : <KeyRound size={28} />}
          </div>
          <h1 className="text-2xl font-black text-armoyu-text uppercase tracking-tight">
            {step === 'done' ? 'Şifren Değişti' : 'Şifremi Unuttum'}
          </h1>
          <p className="text-sm text-armoyu-text-muted">
            {step === 'request' && 'Hesabına bağlı e-posta ya da telefonu gir, sana 6 haneli bir kod gönderelim.'}
            {step === 'reset' && (token ? 'Yeni şifreni belirle.' : 'Gelen 6 haneli kodu ve yeni şifreni gir.')}
            {step === 'done' && 'Yeni şifrenle giriş yapabilirsin. Güvenlik için bütün oturumların kapatıldı.'}
          </p>
        </div>

        {step === 'request' && (
          <form onSubmit={requestCode} className="space-y-4">
            <div role="tablist" className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/5 dark:bg-white/5">
              {([['email', 'E-posta', Mail], ['phone', 'Telefon (SMS)', Smartphone]] as const).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={method === value}
                  onClick={() => { setMethod(value); setTarget(''); setError(''); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${method === value ? 'bg-armoyu-primary text-white shadow' : 'text-armoyu-text-muted'}`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
            <input
              type={method === 'email' ? 'email' : 'tel'}
              autoComplete={method === 'email' ? 'email' : 'tel'}
              aria-label={method === 'email' ? 'E-posta adresi' : 'Telefon numarası'}
              placeholder={method === 'email' ? 'ornek@eposta.com' : '+90 5xx xxx xx xx'}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
              className={inputClass}
            />
            {error && <p role="alert" className="text-xs font-bold text-red-500">{error}</p>}
            <button type="submit" disabled={busy || !target.trim()} className="w-full py-3.5 rounded-xl bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
              {busy && <Loader2 size={14} className="animate-spin" />} Kod Gönder
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={resetPassword} className="space-y-4">
            {info && <p role="status" className="text-xs font-bold text-emerald-500 text-center">{info}</p>}
            {!token && (
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label="6 haneli kod"
                placeholder="6 haneli kod"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                required
                className={`${inputClass} text-center text-xl tracking-[0.5em]`}
              />
            )}
            <input type="password" autoComplete="new-password" aria-label="Yeni şifre" placeholder="Yeni şifre (en az 8 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className={inputClass} />
            <input type="password" autoComplete="new-password" aria-label="Yeni şifre (tekrar)" placeholder="Yeni şifre (tekrar)" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} required minLength={8} className={inputClass} />
            {error && <p role="alert" className="text-xs font-bold text-red-500">{error}</p>}
            <button type="submit" disabled={busy || (!token && code.length !== 6)} className="w-full py-3.5 rounded-xl bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
              {busy && <Loader2 size={14} className="animate-spin" />} Şifreyi Değiştir
            </button>
            {!token && (
              <div className="flex justify-between text-xs font-bold">
                <button type="button" onClick={() => { setStep('request'); setError(''); setCode(''); }} className="text-armoyu-text-muted hover:text-armoyu-text">
                  ← Geri
                </button>
                <button type="button" disabled={resendIn > 0 || busy} onClick={() => requestCode()} className="text-armoyu-primary disabled:text-armoyu-text-muted disabled:opacity-60">
                  {resendIn > 0 ? `Tekrar gönder (${resendIn} sn)` : 'Kodu tekrar gönder'}
                </button>
              </div>
            )}
          </form>
        )}

        {step === 'done' && (
          <button type="button" onClick={() => setIsLoginModalOpen(true)} className="w-full py-3.5 rounded-xl bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest">
            Giriş Yap
          </button>
        )}
      </div>
    </main>
  );
}
