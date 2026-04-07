'use client';

import React from 'react';
import { PageWidth } from '@armoyu/ui';
import Link from 'next/link';
import { BackToStore } from '@armoyu/ui';

const MOCK_ORDERS = [
  { id: 'AR-2024-812', date: '31 Mart 2024', total: '₺297.48', status: 'Hazırlanıyor', color: '#3b82f6', items: ['Premium VIP Üyelik', '1000 ARMOYU Coin (x2)'] },
  { id: 'AR-2024-754', date: '15 Mart 2024', total: '₺599.00', status: 'Tamamlandı', color: '#10b981', items: ['ARMOYU Kapşonlu (Siyah)'] },
  { id: 'AR-2024-102', date: '02 Ocak 2024', total: '₺89.90', status: 'Tamamlandı', color: '#10b981', items: ['Elite Minecraft Paketi'] }
];

export default function OrdersPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1000px]" />

      <div className="mb-12">
        <BackToStore />
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight">
          SİPARİŞ <span className="text-blue-600">GEÇMİŞİM</span>
        </h1>
        <p className="text-armoyu-text-muted font-medium mt-4">Tüm satın alımlarını buradan takip edebilirsin.</p>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
               
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <span className="text-lg font-black text-armoyu-text tracking-tight italic">#{order.id}</span>
                     <span 
                       style={{ backgroundColor: `${order.color}20`, color: order.color }}
                       className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-current transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                     >
                        {order.status}
                     </span>
                  </div>
                  <div className="flex gap-6 text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-80">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {order.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        {order.items.length} Ürün
                      </div>
                  </div>
               </div>

               <div className="flex flex-col md:items-end justify-between gap-4">
                  <div className="text-2xl font-black text-armoyu-text">{order.total}</div>
                  <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5 flex items-center gap-2 group/btn">
                     DETAYLARI GÖR
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/btn:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
               </div>

            </div>

            {/* Expander Area for Items (Hidden by default for multi-order view, briefly listed here) */}
            <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
               {order.items.map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-armoyu-text-muted opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {item}
                 </div>
               ))}
            </div>

            {/* Status Timeline Visualization (Simplified) */}
            <div className="mt-8 h-1 w-full bg-black/20 dark:bg-white/5 rounded-full overflow-hidden flex">
               <div className={`h-full transition-all duration-1000 ${order.status === 'Tamamlandı' ? 'w-full bg-emerald-500' : 'w-1/3 bg-blue-500 animate-pulse'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Helper Footer */}
      <div className="mt-16 text-center border-t border-white/5 pt-12">
        <p className="text-armoyu-text-muted text-sm font-medium">Bir sorun mu yaşıyorsun?</p>
        <Link href="/destek" className="text-blue-500 font-black text-xs uppercase tracking-widest hover:underline mt-2 inline-block">MÜŞTERİ HİZMETLERİYLE GÖRÜŞ</Link>
      </div>

    </div>
  );
}
