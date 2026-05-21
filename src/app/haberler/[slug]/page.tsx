'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageWidth, NewsCard, NewsComments, MOCK_NEWS, userList } from '@armoyu/ui';
import Link from 'next/link';

// MOCK_NEWS is now returning filled News models.

export default function NewsDetailPage() {
  const { slug } = useParams();
  
  const articleData = MOCK_NEWS.find(n => n.slug === slug) || MOCK_NEWS[0];
  
  const article = articleData;

  const SUGGESTED_NEWS = MOCK_NEWS
    .filter(n => n.slug !== slug)
    .slice(0, 3);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Article Header (Hero) */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
           <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl shadow-blue-600/20">
              {article.category}
           </span>
           <span className="text-xs font-bold text-armoyu-text-muted">{article.date}</span>
           <span className="text-xs font-bold text-armoyu-text-muted">•</span>
           <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{article.author?.displayName || 'Armoyu Ekibi'}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text leading-tight tracking-tighter mb-10 max-w-5xl uppercase">
           {article.title}
        </h1>

        <div className="aspect-[21/9] w-full rounded-[40px] overflow-hidden border border-armoyu-card-border shadow-2xl">
           <img src={article.image} alt="Featured" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
         {/* Article Body */}
         <div className="flex-1 max-w-4xl">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-armoyu-text
              prose-p:text-armoyu-text-muted prose-p:font-medium prose-p:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-600/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-blockquote:italic prose-blockquote:font-bold prose-blockquote:text-armoyu-text
              prose-li:text-armoyu-text-muted prose-li:font-bold
              prose-strong:text-blue-500 prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Paylaş & Etiketler */}
            <div className="mt-16 pt-10 border-t border-armoyu-card-border flex flex-wrap items-center justify-between gap-6">
               <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-armoyu-text-muted">Paylaş:</span>
                  <div className="flex gap-2">
                     <button className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:text-blue-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                     <button className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:text-sky-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></button>
                     <button className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:text-indigo-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></button>
                  </div>
               </div>
               <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
                  <span className="px-3 py-1.5 rounded-xl border border-armoyu-card-border hover:border-blue-500 transition-colors cursor-pointer">#GÜNCELLEME</span>
                  <span className="px-3 py-1.5 rounded-xl border border-armoyu-card-border hover:border-blue-500 transition-colors cursor-pointer">#ARMOYU</span>
                  <span className="px-3 py-1.5 rounded-xl border border-armoyu-card-border hover:border-blue-500 transition-colors cursor-pointer">#V3</span>
               </div>
            </div>

            {/* Comments System */}
            <NewsComments />
         </div>

         {/* Sidebar - Trending / Popular */}
         <div className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-24 pt-2">
               <h3 className="text-xl font-black text-armoyu-text mb-6 uppercase tracking-tighter">İlgini Çekebilir</h3>
               <div className="space-y-6">
                  {SUGGESTED_NEWS.map((item, idx) => (
                    <Link key={idx} href={`/haberler/${item.slug}`} className="group block">
                       <div className="flex gap-4 items-start">
                          <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-armoyu-card-border group-hover:scale-105 transition-transform" alt="News" />
                          <div>
                             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">{item.category}</span>
                             <h4 className="text-sm font-bold text-armoyu-text leading-tight group-hover:text-blue-500 transition-colors line-clamp-2">{item.title}</h4>
                             <span className="text-[10px] text-armoyu-text-muted mt-2 block opacity-70">{item.date}</span>
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>

               {/* Banner/Ad Space Placeholder */}
               <div className="mt-10 p-6 rounded-3xl bg-blue-600 text-white relative overflow-hidden group shadow-xl shadow-blue-500/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
                  <h4 className="text-xl font-black relative z-10 mb-2">Bize Katıl!</h4>
                  <p className="text-xs font-medium relative z-10 opacity-90 mb-5">Premium üyelik ile özel rozetler ve avantajlar kazan.</p>
                  <button className="relative z-10 w-full py-2.5 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-colors">Şimdi Keşfet</button>
               </div>
            </div>
         </div>
      </div>

      {/* Suggested News Grid at Footer */}
      <div className="mt-24">
         <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter">Benzer Yazılar</h2>
            <Link href="/haberler" className="text-sm font-bold text-blue-500 hover:underline">Tüm Haberler</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUGGESTED_NEWS.map((news, idx) => (
              <NewsCard key={idx} {...news} />
            ))}
         </div>
      </div>

    </div>
  );
}
