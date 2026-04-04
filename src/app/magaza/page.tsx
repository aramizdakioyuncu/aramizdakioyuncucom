'use client';

import React, { useState, useMemo } from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';
import { StoreHeader } from '@/components/modules/magaza/StoreHeader';
import { useCart } from '@/context/CartContext';
import { Product } from '@/models';
import { MOCK_PRODUCTS } from '@/lib/constants/seedData';

export default function StorePage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('Tüm Ürünler');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS;

    if (activeCategory !== 'Tüm Ürünler') {
      filtered = filtered.filter((p: Product) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p: Product) => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <StoreHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex flex-col lg:flex-row gap-12">
         
         {/* Simple Filter Sidebar */}
         <div className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h3 className="text-xs font-black text-armoyu-text mb-8 uppercase tracking-widest">KATEGORİLER</h3>
               <div className="space-y-3">
                  {['Tüm Ürünler', 'Üyelik & VIP', 'Oyun İçi Paralar', 'Minecraft Eşyaları', 'Lisanslı Giyim', 'Dijital Kodlar'].map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                          : 'text-armoyu-text-muted hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-armoyu-card-border'
                      }`}
                    >
                       {cat}
                    </button>
                  ))}
               </div>
            </div>
            
            {/* Promo Card */}
            <div className="relative rounded-[40px] overflow-hidden group aspect-square">
               <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Promo" />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent p-8 flex flex-col justify-end">
                  <span className="text-white text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">HAFTANIN FIRSATI</span>
                  <h4 className="text-white text-xl font-black uppercase tracking-tighter italic mb-4">GİZEMLİ KUTUDA %40 İNDİRİM!</h4>
                  <button className="w-full py-3 bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl">İNCELE</button>
               </div>
            </div>
         </div>

         {/* Products Grid */}
         <div className="flex-1">
            {filteredProducts.length === 0 ? (
               <div className="w-full flex-1 flex flex-col items-center justify-center p-20 glass-panel rounded-[50px] border border-armoyu-card-border text-center">
                  <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-armoyu-text-muted"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                  <h3 className="text-2xl font-black text-armoyu-text mb-2 uppercase tracking-tighter">Burası Çok Issız</h3>
                  <p className="text-sm font-medium text-armoyu-text-muted">Bu kategoride henüz bir ürün bulunmuyor. Geliştirici ekibimiz burayı yakında dolduracak!</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
                  {filteredProducts.map((product: Product) => (
                    <div key={product.id} className="group glass-panel rounded-[50px] border border-armoyu-card-border overflow-hidden hover:shadow-2xl transition-all duration-500 bg-armoyu-card-bg flex flex-col">
                       <div className="relative h-64 overflow-hidden shrink-0">
                          <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                          <div className="absolute top-6 left-6 flex flex-col gap-2">
                             <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10 w-fit">
                                {product.category}
                             </span>
                             {product.badge && (
                                <span className="px-4 py-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30 w-fit">
                                   {product.badge}
                                </span>
                             )}
                          </div>
                       </div>
                       
                       <div className="p-10 flex-1 flex flex-col">
                          <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight mb-2 group-hover:text-blue-500 transition-colors leading-tight">
                             {product.name}
                          </h3>
                          
                          <div className="mt-4 flex items-baseline gap-2 mb-8">
                             <span className="text-3xl font-black text-armoyu-text">{formatPrice(product.price)}</span>
                             <span className="text-[10px] font-bold text-armoyu-text-muted line-through opacity-50">{formatPrice(product.price * 1.2)}</span>
                          </div>

                          <div className="mt-auto space-y-3">
                              <button 
                                onClick={() => addToCart(product)}
                                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-center flex items-center justify-center"
                              >
                                 SEPETE EKLE
                              </button>
                             <Link href={`/magaza/${product.id}`} className="w-full py-4 bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all border border-transparent hover:border-armoyu-card-border text-center flex items-center justify-center">
                                DETAYLARI GÖR
                             </Link>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            )}
         </div>

      </div>

      {/* Trust Badges */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-20 border-t border-armoyu-card-border">
         <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h4 className="font-black text-armoyu-text uppercase text-sm tracking-widest">GÜVENLİ ÖDEME</h4>
            <p className="text-xs font-medium text-armoyu-text-muted">Tüm ödemeleriniz 256-bit SSL ile korunmaktadır.</p>
         </div>
         <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            </div>
            <h4 className="font-black text-armoyu-text uppercase text-sm tracking-widest">ANINDA TESLİMAT</h4>
            <p className="text-xs font-medium text-armoyu-text-muted">Satın aldığınız dijital ürünler profilinize anında eklenir.</p>
         </div>
         <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h4 className="font-black text-armoyu-text uppercase text-sm tracking-widest">7/24 DESTEK</h4>
            <p className="text-xs font-medium text-armoyu-text-muted">Sorunlarınız için destek ekibimiz her zaman yanınızda.</p>
         </div>
      </div>
    </div>
  );
}
