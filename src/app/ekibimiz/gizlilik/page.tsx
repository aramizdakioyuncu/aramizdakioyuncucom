'use client';

import React from 'react';
import { PageWidth } from '@armoyu/ui';

const POLICY_SECTIONS = [
  {
    title: 'Hangi Verileri Topluyoruz?',
    content: 'Üye kayıt işlemleri sırasında adınız, e-posta adresiniz, Discord ID\'niz ve tercih ettiğiniz oyun kullanıcı adları gibi temel bilgileri topluyoruz. Ayrıca platformumuzu daha iyi hale getirebilmek için anonim kullanım verilerini (log kayıtları) inceliyoruz.'
  },
  {
    title: 'Verilerin Kullanımı',
    content: 'Topladığımız veriler; üyelik işlemlerinin yürütülmesi, size özel çekiliş ve etkinliklerin düzenlenmesi, teknik destek verilmesi ve topluluk güvenliğinin sağlanması amacıyla kullanılır. Verileriniz asla üçüncü şahıslara satılmaz.'
  },
  {
    title: 'Çerez (Cookie) Kullanımı',
    content: 'Sitemiz, giriş yapmanızı kolaylaştırmak ve dil/tema tercihlerini hatırlamak amacıyla çerezleri kullanır. Tarayıcı ayarlarınızdan çerez kullanımını kısıtlayabilirsiniz ancak bu durum bazı fonksiyonların çalışmamasına neden olabilir.'
  },
  {
    title: 'Veri Güvenliği',
    content: 'Tüm verileriniz modern şifreleme yöntemleriyle korunmakta ve güvenli sunucularımızda saklanmaktadır. Güvenlik ihlallerini önlemek için düzenli olarak denetimler yapıyoruz.'
  },
  {
    title: 'Haklarınız',
    content: 'Kişisel verilerinizin silinmesini, değiştirilmesini veya tarafınıza raporlanmasını talep etme hakkına sahipsiniz. Bu taleplerinizi bize bildirdiğiniz andan itibaren en geç 30 gün içinde yanıtlıyoruz.'
  }
];

export default function PrivacyPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic">GİZLİLİK POLİTİKASI</h1>
        <p className="text-armoyu-text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed">
           Verilerinizin güvenliği ve şeffaflık bizim için her zaman önceliklidir. Platformumuzu kullanırken verilerinizi nasıl işlediğimizi buradan öğrenebilirsiniz.
        </p>
      </div>

      <div className="space-y-12 max-w-4xl mx-auto">
         {POLICY_SECTIONS.map((section, idx) => (
           <div key={idx} className="glass-panel p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                 </div>
                 <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight">{section.title}</h3>
              </div>
              <p className="text-armoyu-text-muted text-lg font-medium leading-relaxed opacity-80">
                 {section.content}
              </p>
           </div>
         ))}
      </div>

      <div className="mt-20 p-8 rounded-[40px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border text-center">
         <p className="text-xs font-bold text-armoyu-text-muted italic">Son Güncelleme: 24 Mart 2024 - ARMOYU Team</p>
      </div>
    </div>
  );
}
