'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Play, Plus, Check, Users, CalendarDays, Package } from 'lucide-react';
import { PageWidth } from '@armoyu/ui';
import { SAMPLE_GAMES, STORE_LABELS, PLATFORM_LABELS, cheapest, formatPrice, discountOf, type StorePrice } from '@/components/games/sampleGames';

function PriceRow({ price }: { price: StorePrice }) {
  const discount = discountOf(price);
  return (
    <a
      href={price.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-armoyu-card-border hover:border-armoyu-primary transition-colors"
    >
      <span className="font-black text-sm text-armoyu-text">{STORE_LABELS[price.store]}</span>
      <span className="flex items-center gap-2">
        {discount > 0 && <span className="bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">-%{discount}</span>}
        {discount > 0 && <span className="text-xs line-through text-armoyu-text-muted">{formatPrice({ ...price, price: price.originalPrice! })}</span>}
        <span className="font-black text-armoyu-primary">{formatPrice(price)}</span>
        <ExternalLink size={14} className="text-armoyu-text-muted" />
      </span>
    </a>
  );
}

export default function GameDetailPage() {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const game = SAMPLE_GAMES.find((g) => g.slug === gameSlug);
  const [inLibrary, setInLibrary] = useState(false);
  const [shot, setShot] = useState(0);

  if (!game) {
    return (
      <main className="py-24 text-center space-y-4">
        <p className="font-black text-armoyu-text">Oyun bulunamadı.</p>
        <Link href="/oyunlar" className="text-armoyu-primary font-bold">Tüm oyunlar</Link>
      </main>
    );
  }

  const prices = [...game.prices].sort((a, b) => a.price - b.price);
  const best = cheapest(prices);

  return (
    <main className="pb-20 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[1280px]" />

      <section className="relative h-[46vh] min-h-[360px] overflow-hidden">
        <img src={game.banner} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-armoyu-bg via-armoyu-bg/70 to-black/30" />
        <div className="relative h-full mx-auto px-4 flex flex-col justify-end pb-10 gap-5">
          <Link href="/oyunlar" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/80 hover:text-white w-fit">
            <ArrowLeft size={14} strokeWidth={3} /> Tüm oyunlar
          </Link>
          <div className="flex items-end gap-5">
            <img src={game.logo} alt={`${game.name} logosu`} className="w-20 h-20 md:w-28 md:h-28 rounded-3xl border-4 border-armoyu-bg object-cover shadow-2xl" />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {game.genres.map((g) => (
                  <span key={g} className="bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl">{g}</span>
                ))}
              </div>
              <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-armoyu-text">{game.name}</h1>
              <p className="text-xs font-bold text-armoyu-text-muted">
                {game.developer} · {new Date(game.releaseDate).toLocaleDateString('tr-TR')} · {game.platforms.map((p) => PLATFORM_LABELS[p]).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0 space-y-10">
          <section className="space-y-3">
            <div className="relative aspect-video rounded-[28px] overflow-hidden border border-armoyu-card-border bg-black">
              {shot === 0 ? (
                <>
                  <img src={game.screenshots[0]} alt="" className="w-full h-full object-cover opacity-60" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-20 h-20 rounded-full bg-armoyu-primary flex items-center justify-center shadow-2xl"><Play size={32} className="text-white ml-1" fill="currentColor" /></span>
                  </span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-widest text-white/80">Fragman</span>
                </>
              ) : (
                <img src={game.screenshots[shot - 1]} alt={`Ekran görüntüsü ${shot}`} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[game.screenshots[0], ...game.screenshots].map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={i === 0 ? 'Fragman' : `Ekran görüntüsü ${i}`}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 ${shot === i ? 'border-armoyu-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {i === 0 && <Play size={16} className="absolute inset-0 m-auto text-white" fill="currentColor" />}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-armoyu-text">Hakkında</h2>
            <p className="text-armoyu-text-muted font-medium leading-relaxed">{game.description}</p>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-sm">
              {[['Geliştirici', game.developer], ['Yayıncı', game.publisher], ['Çıkış', new Date(game.releaseDate).toLocaleDateString('tr-TR')], ['Platform', game.platforms.map((p) => PLATFORM_LABELS[p]).join(', ')]].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">{k}</dt>
                  <dd className="font-bold text-armoyu-text">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-armoyu-text flex items-center gap-2">
              <Package size={22} /> DLC&apos;ler <span className="text-armoyu-text-muted text-base">({game.dlcs.length})</span>
            </h2>
            {game.dlcs.length === 0 ? (
              <p className="text-sm text-armoyu-text-muted font-bold">Bu oyunun ek paketi yok.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {game.dlcs.map((d) => {
                  const p = cheapest(d.prices);
                  return (
                    <div key={d.slug} className="flex gap-4 p-3 rounded-2xl bg-armoyu-card-bg border border-armoyu-card-border">
                      <img src={d.cover} alt="" className="w-32 aspect-video rounded-xl object-cover shrink-0" />
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-black text-sm text-armoyu-text">{d.name}</h3>
                        <p className="text-xs text-armoyu-text-muted line-clamp-2">{d.description}</p>
                        <div className="flex items-center justify-between pt-1">
                          {d.owned
                            ? <span className="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-1"><Check size={12} /> Sende var</span>
                            : <a href={p.url} className="text-[10px] font-black uppercase tracking-widest text-armoyu-primary">{STORE_LABELS[p.store]}&apos;da al</a>}
                          <span className="text-sm font-black text-armoyu-text">{formatPrice(p)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside className="lg:w-[360px] shrink-0 space-y-6">
          <div className="p-5 rounded-[28px] bg-armoyu-card-bg border border-armoyu-card-border space-y-4 lg:sticky lg:top-24">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">En uygun fiyat</p>
              <p className="text-3xl font-black text-armoyu-primary">{formatPrice(best)}</p>
            </div>
            <a
              href={best.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-armoyu-primary text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-armoyu-primary/30"
            >
              {best.isFree ? 'Ücretsiz oyna' : 'Satın al'} · {STORE_LABELS[best.store]} <ExternalLink size={16} />
            </a>
            <button
              type="button"
              onClick={() => setInLibrary(!inLibrary)}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl border text-xs font-black uppercase tracking-widest ${inLibrary ? 'border-green-600 text-green-600' : 'border-armoyu-card-border text-armoyu-text'}`}
            >
              {inLibrary ? <><Check size={16} /> Kütüphanende</> : <><Plus size={16} /> Bende var</>}
            </button>

            {prices.length > 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Tüm mağazalar</p>
                {prices.map((p) => <PriceRow key={p.store} price={p} />)}
              </div>
            )}
          </div>

          <div className="p-5 rounded-[28px] bg-armoyu-card-bg border border-armoyu-card-border space-y-3">
            <h2 className="font-black uppercase tracking-tight text-armoyu-text flex items-center gap-2"><Users size={18} /> Oynayan arkadaşların</h2>
            {game.friends.length === 0 ? (
              <p className="text-xs text-armoyu-text-muted font-bold">Arkadaşlarından bu oyuna sahip olan yok.</p>
            ) : game.friends.map((f) => (
              <Link key={f.username} href={`/oyuncular/${f.username}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-armoyu-primary/5">
                <img src={f.avatar} alt="" className="w-10 h-10 rounded-full bg-armoyu-card-border" />
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-sm text-armoyu-text truncate">{f.displayName}</span>
                  <span className="block text-[10px] font-bold text-armoyu-text-muted">
                    {PLATFORM_LABELS[f.platform]}{game.dlcs.length > 0 && ` · ${f.dlcCount}/${game.dlcs.length} DLC`}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <Link href="/etkinlikler" className="flex items-center justify-between p-5 rounded-[28px] bg-armoyu-card-bg border border-armoyu-card-border hover:border-armoyu-primary">
            <span className="font-black uppercase tracking-tight text-armoyu-text flex items-center gap-2"><CalendarDays size={18} /> Etkinlikler</span>
            <span className="text-sm font-black text-armoyu-primary">{game.eventCount > 0 ? `${game.eventCount} yaklaşan` : 'Yok'}</span>
          </Link>
        </aside>
      </div>
    </main>
  );
}
