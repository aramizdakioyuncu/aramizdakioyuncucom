'use client';

import React from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';
import { BackToStore } from '@/components/modules/magaza/BackToStore';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  const subtotal = totalPrice;
  const tax = subtotal * 0.20; // %20 KDV
  const total = subtotal + tax;

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1200px]" />

      <div className="mb-12">
        <BackToStore />
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight">
          SEPETİM <span className="text-blue-600">({cart.length})</span>
        </h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Item List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.product.id} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg flex gap-6 items-center group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 z-10 border border-white/10" />
                
                <div className="flex-1 min-w-0 z-10">
                  <h3 className="text-lg font-black text-armoyu-text uppercase tracking-tight truncate">{item.product.name}</h3>
                  <p className="text-blue-500 font-black text-sm">{formatPrice(item.product.price)}</p>
                </div>

                <div className="flex items-center gap-4 bg-black/10 dark:bg-white/5 p-2 rounded-xl border border-white/5 z-10">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/20 dark:hover:bg-white/10 text-armoyu-text transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span className="text-sm font-black text-armoyu-text w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/20 dark:hover:bg-white/10 text-armoyu-text transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.product.id)} className="p-3 text-armoyu-text-muted hover:text-red-500 transition-colors z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl shadow-blue-500/10">
              <h2 className="text-xs font-black text-armoyu-text uppercase tracking-widest mb-8 border-b border-white/5 pb-4">ÖZET</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold text-armoyu-text-muted">
                  <span>ARA TOPLAM</span>
                  <span className="text-armoyu-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-armoyu-text-muted">
                  <span>KDV (%20)</span>
                  <span className="text-armoyu-text">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-armoyu-text pt-4 border-t border-white/5">
                  <span>TOPLAM</span>
                  <span className="text-blue-500">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/magaza/odeme" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 text-center block active:scale-95">
                ÖDEME ADIMINA GEÇ
              </Link>
              
              <p className="text-[10px] text-armoyu-text-muted text-center mt-6 font-bold uppercase tracking-tight opacity-50">
                GÜVENLİ 256-BIT SSL ÖDEME ALTYAPISI
              </p>
            </div>
            
            {/* Promo Code */}
            <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
               <div className="flex gap-2">
                 <input type="text" placeholder="KUPON KODU" className="flex-1 bg-black/10 dark:bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-blue-500 transition-colors" />
                 <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5">UYGULA</button>
               </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-32 space-y-8 animate-in fade-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
           </div>
           <div className="space-y-4">
             <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic">SEPETİN ŞU AN BOŞ</h2>
             <p className="text-armoyu-text-muted font-medium max-w-sm mx-auto">Henüz sepetine bir şey eklemedin. Mağaza sayfamızda harika ürünler seni bekliyor!</p>
           </div>
           <Link href="/magaza" className="inline-block px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95">
             ÜRÜNLERİ İNCELE
           </Link>
        </div>
      )}
    </div>
  );
}
