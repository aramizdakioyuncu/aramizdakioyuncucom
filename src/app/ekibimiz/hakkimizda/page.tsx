'use client';

import React from 'react';
import { PageWidth } from '@armoyu/ui';

const STATS = [
  { label: 'Aktif Üye', count: '10.000+', icon: '👥' },
  { label: 'Yıllık Etkinlik', count: '500+', icon: '🎮' },
  { label: 'Çekiliş Ödülü', count: '₺50K+', icon: '🎁' },
  { label: 'Desteklenen Oyun', count: '20+', icon: '⚔️' }
];

export default function AboutPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic">HAKKIMIZDA</h1>
        <p className="text-armoyu-text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          ARMOYU, oyun tutkunlarını bir araya getiren, Türkiye'nin en dinamik ve samimi topluluk platformlarından biridir.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
         <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tight italic">AMACIMIZ VE HİKAYEMİZ</h2>
            <p className="text-armoyu-text-muted text-lg font-medium leading-relaxed">
               Dünya'nın her tarafından yetenekli oyuncuları keşfedip onların kariyer basamaklarında daha iyi yerlere getirebilmek için uğraşıyoruz. Oluşturmuş olduğumuz bu sosyal platformda paylaşımlar yaparak ve etkinliklere katılarak oyuncular sosyal çevrelerini geliştiriyorlar. Bugüne kadar yapmış oldukları tüm etkinlikleri kaydedip oyunculara yol haritası çıkarıyoruz ve yardımcı oluyoruz.
            </p>
            <p className="text-armoyu-text-muted text-lg font-medium leading-relaxed">
               Gruplar kısmından oyuncular kendi kategorileri ile denk grupları bularak kendi aralarında etkinlikler düzenleyebilir veya bizim düzenlemiş olduğumuz etkinliklere katılarak tecrübelerini arttırabilirler. Yazılım konusunda ise, yazılımcıların çoğunluğunu bilgisayar başında vakit geçirmiş ve genellikle oyun oynamış insanlar oluşturuyor. Diğer amacımız ise bu oyuncuları yazılıma teşvik ederek onları gerek kendi bünyemize gerek ise piyasaya yazılımcı olarak kazandırmaktır.
            </p>
            <p className="text-armoyu-text-muted text-lg font-medium leading-relaxed italic border-l-4 border-blue-600 pl-6 py-2">
               "Bizim amacımız tamamen potansiyellerini ortaya çıkaramamış oyunculara koçluk yapmak ve etkinlikler düzenlemektir; aslında kendimize bir Organizasyon Şirketi de diyebiliriz. Türkiye'yi daha iyi hale getirebilmek için her zaman çalışmaya devam edeceğiz."
               <span className="block mt-4 font-black text-armoyu-text">-- YÖNETİM EKİBİ --</span>
            </p>
         </div>
         <div className="flex-1 w-full flex justify-center">
            <div className="relative p-6 glass-panel rounded-[50px] border border-blue-500/20 bg-blue-600/5 overflow-hidden group">
               <div className="absolute inset-0 bg-blue-600/10 blur-xl group-hover:bg-blue-600/20 transition-all duration-700" />
               <img 
                 src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" 
                 alt="Armoyu Team" 
                 className="w-[400px] h-[400px] object-cover rounded-[40px] relative z-10 shadow-2xl"
               />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
         {STATS.map((stat, idx) => (
           <div key={idx} className="glass-panel p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg text-center">
              <span className="text-4xl mb-4 block">{stat.icon}</span>
              <h4 className="text-3xl font-black text-armoyu-text mb-2 tracking-tighter italic">{stat.count}</h4>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{stat.label}</p>
           </div>
         ))}
      </div>

      <div className="p-16 rounded-[60px] bg-gradient-to-br from-zinc-900 to-black text-white text-center shadow-2xl overflow-hidden relative border border-white/5">
         <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 blur-3xl rounded-full" />
         <h2 className="text-3xl font-black relative z-10 mb-6 uppercase italic">BİZE ULAŞIN</h2>
         <p className="text-lg font-medium opacity-80 relative z-10 mb-10 max-w-xl mx-auto">Sorularınız, önerileriniz veya iş birlikleri için bize dilediğiniz zaman ulaşabilirsiniz.</p>
         <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-10">
            <div className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center gap-3 transition-all cursor-pointer">
               <span className="font-black text-xs uppercase tracking-widest">info@armoyu.com</span>
            </div>
            <div className="px-8 py-4 bg-blue-600 hover:bg-blue-500 border border-blue-500 rounded-2xl flex items-center gap-3 transition-all cursor-pointer">
               <span className="font-black text-xs uppercase tracking-widest">Destek Talebi Aç</span>
            </div>
         </div>
      </div>
    </div>
  );
}
