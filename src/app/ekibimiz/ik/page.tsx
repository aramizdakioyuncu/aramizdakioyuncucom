'use client';

import React, { useState } from 'react';
import { PageWidth, GroupApplicationModal as ApplicationModal } from '@armoyu/ui';

const BENEFITS = [
  { icon: '🚀', title: 'Hızlı Yükselme', desc: 'Performansınıza göre yönetim ekibine ve üst rollere kısa sürede yükselebilirsiniz.' },
  { icon: '🤝', title: 'Network', desc: 'Türkiye\'nin farklı yerlerinden binlerce oyuncu ve profesyonelle tanışma fırsatı.' },
  { icon: '💻', title: 'Yazılım Kazanımı', desc: 'Eğer ilginiz varsa sizi yazılıma teşvik ediyor ve gelişim basamaklarında yardımcı oluyoruz.' },
  { icon: '🏟️', title: 'Organizasyon', desc: 'Gerçek zamanlı etkinliklerde operasyon ve yönetim tecrübesi edinin.' }
];

const PROCESS_STEPS = [
  { step: '01', title: 'Başvuru', desc: 'İlgilendiğiniz pozisyonu seçerek formunuzu doldurun.' },
  { step: '02', title: 'İnceleme', desc: 'İK ekibimiz başvurunuzu 48 saat içinde titizlikle inceler.' },
  { step: '03', title: 'Tanışma', desc: 'Sizinle kısa bir sesli görüşme yaparak vizyonumuzdan bahsederiz.' },
  { step: '04', title: 'Ekipte Yer Al', desc: 'Aramıza katılarak Türkiye\'nin en büyük topluluklarından birine güç verin.' }
];

export default function HumanResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedRole="" 
      />

      {/* Hero Section */}
      <div className="mb-24 text-center">
        <h1 className="text-4xl md:text-7xl font-black text-armoyu-text mb-8 uppercase tracking-tighter italic">İNSAN KAYNAKLARI</h1>
        <p className="text-armoyu-text-muted text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
          ARMOYU sadece bir oyun platformu değil, aynı zamanda bir akademi. Sizin yeteneklerinizi keşfedip, profesyonel hayatınıza katkı sağlamak için buradayız.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
         
         {/* Left Side: Benefits */}
         <div className="space-y-12">
            <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tight italic border-b-2 border-blue-500 w-fit pb-2">Neden Bizimle Çalışmalısın?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-xl transition-all">
                     <span className="text-4xl block mb-4">{benefit.icon}</span>
                     <h3 className="text-lg font-black text-armoyu-text mb-2 uppercase tracking-tight">{benefit.title}</h3>
                     <p className="text-sm text-armoyu-text-muted font-medium leading-relaxed opacity-80">
                        {benefit.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* Right Side: Process */}
         <div className="space-y-12">
            <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tight italic border-b-2 border-blue-500 w-fit pb-2">İşe Alım Sürecimiz</h2>
            <div className="space-y-6">
               {PROCESS_STEPS.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start p-6 rounded-[32px] hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
                     <span className="text-4xl font-black text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity">
                        {step.step}
                     </span>
                     <div>
                        <h3 className="text-lg font-black text-armoyu-text mb-1 uppercase tracking-tight">{step.title}</h3>
                        <p className="text-sm text-armoyu-text-muted font-medium leading-relaxed opacity-80">
                           {step.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>

      {/* CTA Section */}
      <div className="mt-32 p-16 md:p-24 rounded-[70px] bg-gradient-to-br from-[#1a2a4e] to-[#0d121c] border border-blue-500/20 text-center relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-32 -mt-32" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 blur-[100px] rounded-full -ml-20 -mb-20" />
         
         <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-8 uppercase tracking-tighter italic">Potansiyelini ARMOYU ile Gerçekleştir!</h2>
            <p className="text-lg lg:text-xl font-medium text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
               Aslında kendimize bir "Organizasyon Şirketi" ve "Koçluk Akademisi" diyoruz. Profesyonel dünyada basamakları daha hızlı çıkmanız için buradayız.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-3xl shadow-2xl shadow-blue-600/30 active:scale-95 transition-all"
            >
               HEMEN BAŞVURU ŞARTI VE FORMU AÇ
            </button>
         </div>
      </div>

    </div>
  );
}
