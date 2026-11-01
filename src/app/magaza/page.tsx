'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { 
  PageWidth, 
  StoreHeader, 
  StoreSidebar, 
  StoreProductGrid, 
  StoreTrustBadges,
  useArmoyu,
  useCart,
  MOCK_PRODUCTS,
  Product
} from '@armoyu/ui';

export default function StorePage() {
   const { addToCart } = useCart();
   const { ui } = useArmoyu();
   const [products, setProducts] = useState<Product[]>([]);
   const [activeCategory, setActiveCategory] = useState('Tüm Ürünler');
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      async function fetchProducts() {
         // shortcut: en çok 100 ürün yüklenir, katalog büyüyünce sunucu tarafı sayfalama gerekir
         const response = await ui.api.shop.getProducts(1, { limit: 100 });
         setProducts(response.durum === 1 && Array.isArray(response.icerik)
            ? response.icerik.map((p: any) => Product.fromAPI(p))
            : MOCK_PRODUCTS);
      }

      fetchProducts();
   }, [ui.api.shop]);

   const filteredProducts = useMemo(() => {
      let filtered = products;
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
   }, [products, activeCategory, searchQuery]);

   const categories = useMemo(() => ['Tüm Ürünler', ...new Set(products.map((p) => p.category))], [products]);

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
