'use client';

import React, { useState, useMemo } from 'react';
import { 
  PageWidth, 
  StoreHeader, 
  StoreSidebar, 
  StoreProductGrid, 
  StoreTrustBadges,
  useCart,
  MOCK_PRODUCTS 
} from '@armoyu/ui';
import { Product } from '@armoyu/core';

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
            p.name?.toLowerCase().includes(query) ||
            p.category?.toLowerCase().includes(query)
         );
      }
      return filtered;
   }, [activeCategory, searchQuery]);

   const categories = ['Tüm Ürünler', 'Üyelik & VIP', 'Oyun İçi Paralar', 'Minecraft Eşyaları', 'Lisanslı Giyim', 'Dijital Kodlar'];

   return (
      <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
         <PageWidth width="max-w-[1440px]" />

         <StoreHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

         {/* Layout ve Blok Dağılımı */}
         <div className="flex flex-col lg:flex-row gap-12">
            <StoreSidebar 
               activeCategory={activeCategory} 
               setActiveCategory={setActiveCategory} 
               categories={categories} 
            />
            <StoreProductGrid 
               filteredProducts={filteredProducts} 
               addToCart={addToCart} 
            />
         </div>

         <StoreTrustBadges />
      </div>
   );
}
