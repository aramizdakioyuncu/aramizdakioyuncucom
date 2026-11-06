'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Users, CalendarDays, Gamepad2 } from 'lucide-react';
import { PageWidth } from '@armoyu/ui';
import { SAMPLE_GAMES, PLATFORM_LABELS, cheapest, formatPrice, discountOf, type Platform } from '@/components/games/sampleGames';

type Sort = 'popular' | 'name' | 'price' | 'discount';

export default function GamesPage() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [onlyFree, setOnlyFree] = useState(false);
  const [sort, setSort] = useState<Sort>('popular');

  const genres = useMemo(() => [...new Set(SAMPLE_GAMES.flatMap((g) => g.genres))].sort(), []);

  const games = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    const list = SAMPLE_GAMES.filter((g) =>
      (!q || g.name.toLocaleLowerCase('tr').includes(q) || g.shortName?.toLocaleLowerCase('tr').includes(q))
      && (!genre || g.genres.includes(genre))
      && (!platform || g.platforms.includes(platform))
      && (!onlyFree || g.isFree),
    );
    const by: Record<Sort, (a: typeof list[0], b: typeof list[0]) => number> = {
      popular: (a, b) => b.friends.length + b.eventCount - (a.friends.length + a.eventCount),
      name: (a, b) => a.name.localeCompare(b.name, 'tr'),
      price: (a, b) => cheapest(a.prices).price - cheapest(b.prices).price,
      discount: (a, b) => discountOf(cheapest(b.prices)) - discountOf(cheapest(a.prices)),
    };
    return [...list].sort(by[sort]);
  }, [query, genre, platform, onlyFree, sort]);

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
      active ? 'bg-armoyu-primary text-white border-armoyu-primary' : 'border-armoyu-card-border text-armoyu-text-muted hover:text-armoyu-text'
    }`;

  return (
    <main className="pb-20 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[1280px]" />

      <section className="relative overflow-hidden border-b border-armoyu-card-border">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-armoyu-primary/20 rounded-full blur-3xl" />
        <div className="mx-auto px-4 py-14 relative space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-armoyu-primary flex items-center gap-2">
            <Gamepad2 size={14} strokeWidth={3} /> Oyun Kataloğu
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-armoyu-text">Oyunlar</h1>
          <p className="text-armoyu-text-muted font-medium max-w-2xl">
            Oyunları ara, mağaza fiyatlarını karşılaştır, hangi arkadaşının oynadığını gör ve oyunun etkinliklerine katıl.
          </p>

          <label className="relative block max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Oyun ara: CS2, Minecraft, Assetto Corsa…"
              aria-label="Oyun ara"
              className="w-full pl-14 pr-5 py-4 rounded-2xl bg-armoyu-card-bg border border-armoyu-card-border text-armoyu-text font-bold outline-none focus:border-armoyu-primary"
            />
          </label>
        </div>
      </section>

      <div className="mx-auto px-4 pt-8 space-y-6">
        <div className="rounded-2xl border border-dashed border-armoyu-primary/40 bg-armoyu-primary/5 px-4 py-3 text-xs font-bold text-armoyu-text-muted">
          Tasarım önizlemesi: veriler örnek. Oyunlar eklentisi kurulunca gerçek katalog, fiyatlar ve arkadaş bilgisi bağlanacak.
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(!genre)} onClick={() => setGenre(null)}>Tümü</button>
            {genres.map((g) => (
              <button key={g} type="button" className={chip(genre === g)} onClick={() => setGenre(genre === g ? null : g)}>{g}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={platform ?? ''}
              onChange={(e) => setPlatform((e.target.value || null) as Platform | null)}
              aria-label="Platform"
              className="px-4 py-2 rounded-2xl bg-armoyu-card-bg border border-armoyu-card-border text-xs font-bold text-armoyu-text"
            >
              <option value="">Tüm platformlar</option>
              {Object.entries(PLATFORM_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sıralama"
              className="px-4 py-2 rounded-2xl bg-armoyu-card-bg border border-armoyu-card-border text-xs font-bold text-armoyu-text"
            >
              <option value="popular">Popüler</option>
              <option value="name">A–Z</option>
              <option value="price">En ucuz</option>
              <option value="discount">En çok indirim</option>
            </select>
            <button type="button" className={chip(onlyFree)} onClick={() => setOnlyFree(!onlyFree)}>Ücretsiz</button>
          </div>
        </div>

        {games.length === 0 ? (
          <p className="py-20 text-center text-armoyu-text-muted font-bold">&quot;{query}&quot; için oyun bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {games.map((g) => {
              const best = cheapest(g.prices);
              const discount = discountOf(best);
              return (
                <Link key={g.slug} href={`/oyunlar/${g.slug}`} className="group rounded-[28px] overflow-hidden bg-armoyu-card-bg border border-armoyu-card-border hover:border-armoyu-primary transition-colors">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={g.cover} alt={g.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl">-%{discount}</span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                      {g.genres.map((x) => (
                        <span key={x} className="bg-white/15 backdrop-blur text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">{x}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h2 className="font-black text-armoyu-text leading-tight line-clamp-1">{g.name}</h2>
                    <div className="flex items-baseline gap-2">
                      {discount > 0 && <span className="text-xs line-through text-armoyu-text-muted">{formatPrice({ ...best, price: best.originalPrice! })}</span>}
                      <span className="text-sm font-black text-armoyu-primary">{formatPrice(best)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-armoyu-text-muted">
                      {g.friends.length > 0 && <span className="flex items-center gap-1"><Users size={12} /> {g.friends.length} arkadaşın</span>}
                      {g.eventCount > 0 && <span className="flex items-center gap-1"><CalendarDays size={12} /> {g.eventCount} etkinlik</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
