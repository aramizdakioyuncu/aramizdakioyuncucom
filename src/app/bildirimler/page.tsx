'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import { useArmoyu, useAuth } from '@armoyu/ui';

const PAGE_SIZE = 20;

/** Bildirim geçmişi (Phatsa Bildirimler kutusu + bekleyen arkadaşlık istekleri) */
export default function NotificationsPage() {
  const { api } = useArmoyu();
  const { user, isLoading: authLoading, setIsLoginModalOpen } = useAuth();
  const router = useRouter();
  // shortcut: yayınlanan @armoyu/core tiplerinde bildirim geçmişi / okundu metotları yok; yeni sürüm çıkınca cast kalkacak
  const users = api.users as any;
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (target: number) => {
    setLoading(true);
    const response = await users.getNotificationsHistory(target, PAGE_SIZE);
    setLoading(false);
    if (response.durum !== 1) return setError(response.aciklama || 'Bildirimler yüklenemedi.');
    const list = Array.isArray(response.icerik) ? response.icerik : [];
    setItems((prev) => (target === 1 ? list : [...prev, ...list]));
    setPage(target);
    setHasMore(list.length >= PAGE_SIZE);
    setError('');
  }, [users]);

  useEffect(() => {
    if (!authLoading && user) load(1);
    if (!authLoading && !user) setLoading(false);
  }, [authLoading, user, load]);

  const open = (item: any) => {
    if (!item.isRead && item.type !== 'friend_request') {
      users.markNotificationsRead([item.id]);
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n)));
    }
    if (item.url) router.push(item.url);
  };

  const markAll = async () => {
    const response = await users.markNotificationsRead();
    if (response.durum === 1) setItems((prev) => prev.map((n) => ({ ...n, isRead: n.type === 'friend_request' ? n.isRead : true })));
  };

  if (!authLoading && !user) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-sm font-bold text-armoyu-text-muted">Bildirimlerini görmek için giriş yap.</p>
        <button type="button" onClick={() => setIsLoginModalOpen(true)} className="px-6 py-3 rounded-xl bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest">Giriş Yap</button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-armoyu-text uppercase tracking-tight flex items-center gap-3">
          <Bell size={24} className="text-armoyu-primary" /> Bildirimler
        </h1>
        {items.some((n) => !n.isRead && n.type !== 'friend_request') && (
          <button type="button" onClick={markAll} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-armoyu-primary">
            <CheckCheck size={16} /> Tümünü okundu yap
          </button>
        )}
      </div>

      {error && <p role="alert" className="text-sm font-bold text-red-500">{error}</p>}

      <ul className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[28px] overflow-hidden divide-y divide-armoyu-card-border" aria-busy={loading}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => open(item)}
              className={`w-full text-left flex items-start gap-4 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${item.isRead ? '' : 'bg-armoyu-primary/5'}`}
            >
              <img src={item.sender?.avatar || '/img/logo.png'} alt="" className="w-11 h-11 rounded-full object-cover bg-black/5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-armoyu-text">
                  <span className="font-black mr-1">{item.sender?.displayName || 'ARMOYU'}</span>
                  <span className="text-armoyu-text-muted">{item.content}</span>
                </p>
                <p className="text-[11px] font-bold text-armoyu-text-muted mt-1">{item.title ? `${item.title} · ` : ''}{item.date}</p>
              </div>
              {!item.isRead && <span className="w-2.5 h-2.5 rounded-full bg-armoyu-primary mt-2 shrink-0" aria-label="Okunmadı" />}
            </button>
          </li>
        ))}
        {!loading && items.length === 0 && !error && (
          <li className="py-16 text-center text-sm font-bold text-armoyu-text-muted">Henüz bildirimin yok.</li>
        )}
        {loading && (
          <li className="py-8 flex justify-center"><Loader2 size={20} className="animate-spin text-armoyu-primary" /></li>
        )}
      </ul>

      {hasMore && !loading && (
        <button type="button" onClick={() => load(page + 1)} className="w-full py-3 rounded-xl border border-armoyu-card-border text-xs font-black uppercase tracking-widest text-armoyu-text-muted hover:text-armoyu-text">
          Daha fazla göster
        </button>
      )}
    </main>
  );
}
