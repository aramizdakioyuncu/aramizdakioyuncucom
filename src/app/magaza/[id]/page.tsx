'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/models';
import { MOCK_PRODUCTS } from '@/lib/constants/mockData';
import { BackToStore } from '@/components/modules/magaza/BackToStore';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="pb-20 text-center">
         <PageWidth width="max-w-[1200px]" />
         <BackToStore />
         <h1 className="text-4xl font-black text-armoyu-text mt-20">ÜRÜN BULUNAMADI</h1>
      </div>
    );
  }

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1200px]" />

      <BackToStore />

      <div className="flex flex-col lg:flex-row gap-16 mt-8 items-start">
        
        {/* Visual Gallery */}
        <div className="w-full lg:w-[500px] shrink-0 space-y-4">
           <div className="relative aspect-square rounded-[40px] overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl group">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             {product.badge && (
               <span className="absolute top-8 left-8 px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shadow-blue-500/30">
                 {product.badge}
               </span>
             )}
           </div>
           {/* Thumbnails (Mock) */}
           <div className="flex gap-4">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-20 h-20 rounded-2xl border transition-colors cursor-pointer overflow-hidden ${i === 0 ? 'border-blue-500' : 'border-armoyu-card-border hover:border-white/20'}`}>
                   <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100" alt="Thumb" />
                </div>
              ))}
           </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-8 lg:py-6">
           <div>
             <span className="text-blue-500 font-black text-[11px] uppercase tracking-widest mb-2 block">{product.category}</span>
             <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight">
               {product.name}
             </h1>
           </div>

           <div className="flex items-center gap-6 border-b border-white/5 pb-8">
              <span className="text-5xl font-black text-armoyu-text">{formatPrice(product.price)}</span>
              <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">STOKTA VAR</div>
           </div>

           <div className="space-y-6">
              <p className="text-armoyu-text-muted text-lg font-medium leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {/* Quantity */}
                <div className="flex items-center gap-4 bg-black/10 dark:bg-white/5 p-2 rounded-2xl border border-white/10 w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-black/20 dark:hover:bg-white/10 text-armoyu-text transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span className="text-lg font-black text-armoyu-text w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-black/20 dark:hover:bg-white/10 text-armoyu-text transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={() => addToCart(Product.fromJSON(product), quantity)}
                  className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-3 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/30 active:scale-95 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-[-2px] transition-transform"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  SEPETE EKLE
                </button>
              </div>
           </div>

           {/* Security / Delivery Badges */}
           <div className="grid grid-cols-2 gap-4 pt-10">
              <div className="flex items-center gap-3 p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black uppercase text-armoyu-text">GÜVENLİ ÖDEME</span>
                   <span className="text-[11px] font-bold text-armoyu-text-muted">SSL Şifreleme</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black uppercase text-armoyu-text">TESLİMAT</span>
                   <span className="text-[11px] font-bold text-armoyu-text-muted">Anında Aktivasyon</span>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Tabs / Extra Details */}
      <div className="mt-20 border-t border-white/5 pt-10">
         <div className="flex gap-10 mb-10 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'description', label: 'ÖZELLİKLER' },
              { id: 'usage', label: 'NASIL KULLANILIR?' },
              { id: 'faq', label: 'SIKÇA SORULANLAR' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] pb-4 transition-all relative ${activeTab === tab.id ? 'text-armoyu-text' : 'text-armoyu-text-muted opacity-40 hover:opacity-100'}`}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in slide-in-from-left-2 duration-300" />}
              </button>
            ))}
         </div>
         <div className="max-w-3xl">
            <p className="text-armoyu-text-muted leading-relaxed font-medium">
               {activeTab === 'description' && `Bu ürün ${product.name} kategorisi altında yer almaktadır. Satın alma sonrası profilinize tanımlanır ve tüm ARMOYU platformunda geçerlidir.`}
               {activeTab === 'usage' && 'Satın alma sonrası "Profilim > Envanter" sekmesinden veya doğrudan siparişlerim sayfasından aktivasyon koduna ulaşabilirsin.'}
               {activeTab === 'faq' && 'Ürün iadesi dijital içeriklerde teslimat sonrası yapılamamaktadır. Herhangi bir sorun oluşması durumunda destek ekibimizle iletişime geçebilirsiniz.'}
            </p>
         </div>
      </div>

      {/* Similar Products */}
      <div className="mt-32">
         <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-widest mb-12 italic">SİZİN İÇİN <span className="text-blue-500">SEÇTİKLERİMİZ</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.slice(0, 4).map((p: Product) => (
              <Link href={`/magaza/${p.id}`} key={p.id} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-2xl hover:shadow-blue-500/10 transition-all group overflow-hidden">
                 <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <h3 className="font-black text-armoyu-text uppercase text-sm tracking-tight mb-2 group-hover:text-blue-500 transition-colors">{p.name}</h3>
                 <span className="text-lg font-black text-armoyu-text">{formatPrice(p.price)}</span>
              </Link>
            ))}
         </div>
      </div>

    </div>
  );
}
