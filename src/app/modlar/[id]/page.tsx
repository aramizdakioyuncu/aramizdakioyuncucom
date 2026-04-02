'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';
import { MOCK_MODS } from '@/lib/constants/seedData';

export default function ModDetailPage() {
  const { id } = useParams();
  
  // Find the requested mod or fallback to the first one
  const modData = MOCK_MODS.find(m => m.id === id) || MOCK_MODS[0];

  const SUGGESTED_MODS = MOCK_MODS
    .filter(m => m.id !== id)
    .slice(0, 3);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] mb-16 overflow-hidden">
        <div className="absolute inset-0">
           <img src={modData.image} alt={modData.name} className="w-full h-full object-cover blur-sm scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
           <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-[1280px] mx-auto w-full px-4 relative h-full">
           <div className="relative h-full flex flex-col justify-end pb-16 z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl shadow-blue-600/20">
                    {modData.game}
                 </span>
                 <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl">
                    SÜRÜM: {modData.version}
                 </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6 max-w-5xl uppercase">
                 {modData.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                 <div className="flex items-center gap-3">
                    <img src={modData.author?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu'} alt={modData.author?.displayName || 'Modcer'} className="w-12 h-12 rounded-full border-2 border-white/20" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Yapımcı</p>
                       <p className="text-sm font-black text-white">{modData.author?.displayName || 'Armoyu Ekibi'}</p>
                    </div>
                 </div>
                 
                 <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                 
                 <div className="flex gap-8">
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> İndirme</p>
                       <p className="text-lg font-black text-white">{modData.downloads}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Puan</p>
                       <p className="text-lg font-black text-white">4.8 <span className="text-[10px] font-medium opacity-60">(125 Oy)</span></p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
             
             {/* Thumbnail & Download Bar */}
             <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border mb-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                
                <div className="w-full md:w-64 aspect-video rounded-3xl overflow-hidden shrink-0 border border-armoyu-card-border relative z-10">
                   <img src={modData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                   <div>
                      <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter mb-2">Kurulum Dosyası</h3>
                      <p className="text-sm font-bold text-armoyu-text-muted flex items-center gap-2">
                         <span className="flex items-center gap-1.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> ZIP Arşivi</span>
                         <span>•</span>
                         <span>45.2 MB</span>
                      </p>
                   </div>
                   
                   <button className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 group">
                      <svg className="group-hover:-translate-y-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      HEMEN İNDİR
                   </button>
                </div>
             </div>

             {/* Description */}
             <div className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-armoyu-text
                prose-p:text-armoyu-text-muted prose-p:font-medium prose-p:leading-relaxed">
                <h2>Hakkında</h2>
                <p>{modData.description}</p>
                <p>Oyun deneyiminizi bir üst seviyeye taşıyacak özellikler barındırır. Bu mod, performansı etkilemeden görselliği ve mekanikleri optimize etmeyi hedefler.</p>
                
                <h2>Özellikler</h2>
                <ul>
                   <li>Düşük donanımlarda bile yüksek performans için optimizasyon.</li>
                   <li>Tamamen Türkçe dil desteği.</li>
                   <li>Otomatik güncellemeler ile en son sürüme uyumluluk.</li>
                   <li>Çoklu sunucu desteği.</li>
                </ul>

                <h2>Nasıl Kurulur?</h2>
                <ol>
                   <li>İndirdiğiniz `.zip` dosyasını klasöre çıkartın.</li>
                   <li>Oyunun kurulu olduğu ana dizine gidin (Örn: `C:\\Games\\Minecraft`).</li>
                   <li>`mods` klasörünün içine çıkarttığınız dosyaları kopyalayın.</li>
                   <li>Oyunu yeniden başlatıp modlar sekmesinden aktif edin.</li>
                </ol>
             </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] shrink-0 space-y-10">
             
             {/* System Requirements */}
             <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest flex items-center gap-2">
                   <svg className="text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 21v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path><path d="M12 7v6"></path><path d="M9 7l3 3 3-3"></path></svg>
                   GEREKSİNİMLER
                </h4>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                      <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-1.5">MİNİMUM OYUN SÜRÜMÜ</p>
                      <p className="text-sm font-black text-armoyu-text">{modData.game} - {modData.version}</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                      <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-1.5">GEREKLİ EKLENTİ</p>
                      <p className="text-sm font-black text-armoyu-text">Forge / Fabric Uyumlu</p>
                   </div>
                </div>
             </div>

             {/* Similar Mods */}
             <div>
                <h4 className="text-lg font-black text-armoyu-text mb-6 uppercase tracking-tighter">İlgini Çekebilir</h4>
                <div className="space-y-4">
                   {SUGGESTED_MODS.map((item, idx) => (
                      <Link key={idx} href={`/modlar/${item.id}`} className="group glass-panel p-4 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-xl hover:border-blue-500/30 transition-all flex gap-4 items-center">
                         <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-armoyu-card-border group-hover:scale-105 transition-transform" />
                         <div className="min-w-0">
                            <h4 className="text-sm font-black text-armoyu-text leading-tight group-hover:text-blue-500 transition-colors truncate mb-1.5">{item.name}</h4>
                            <div className="flex items-center gap-3 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">
                               <span className="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>{item.downloads}</span>
                               <span>{item.version}</span>
                            </div>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
