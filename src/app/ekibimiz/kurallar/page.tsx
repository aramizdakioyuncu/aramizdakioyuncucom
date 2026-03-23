'use client';

import React from 'react';
import { PageWidth } from '@/components/shared/PageWidth';

const RULES = [
  { 
    title: 'Saygılı Davranın', 
    desc: 'Diğer tüm üyelere karşı her zaman saygı çerçevesinde davranmak zorunludur. Hakaret, küfür ve aşağılayıcı tavırlar kabul edilemez.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
  },
  { 
    title: 'Hile Yapmayın', 
    desc: 'Tüm sunucularımızda ve etkinliklerimizde herhangi bir yazılımsal veya donanımsal hile kullanmak kesinlikle yasaktır.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-500"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
  },
  { 
    title: 'Spam ve Reklam Yasaktır', 
    desc: 'Kanal ve platformlarımızda izinsiz reklam yapmak, sürekli aynı mesajları göndermek ve topluluğu rahatsız etmek yasaktır.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-yellow-500"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  },
  { 
    title: 'Gizliliğe Önem Verin', 
    desc: 'Başkalarının kişisel verilerini paylaşmak (Doxing) kesinlikle yasaktır ve hukuki yaptırımları beraberinde getirebilir.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-purple-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  },
  { 
    title: 'Sunucu Kuralları', 
    desc: 'Her oyun sunucumuzun kendi özel kurallarına da uyum sağlamak her üyenin sorumluluğundadır.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
  },
  { 
    title: 'Yetkililere Saygı', 
    desc: 'Sunucu yetkililerinin kararlarına saygı gösterilmeli ve tartışma ortamı yaratılmamalıdır. Sorunlar bilet sistemiyle çözülmelidir.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
  }
];

export default function RulesPage() {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic">TOPLULUK KURALLARIMIZ</h1>
        <p className="text-armoyu-text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Tüm üyelerimizin huzurlu ve keyifli bir ortamda vakit geçirebilmesi için belirlediğimiz temel prensipler.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {RULES.map((rule, idx) => (
          <div key={idx} className="group glass-panel p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-2xl transition-all duration-500 h-full">
             <div className="w-16 h-16 rounded-[24px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {rule.icon}
             </div>
             
             <h3 className="text-2xl font-black text-armoyu-text mb-4 uppercase tracking-tight">{rule.title}</h3>
             <p className="text-sm text-armoyu-text-muted font-medium leading-relaxed opacity-80 italic">
                "{rule.desc}"
             </p>
          </div>
        ))}
      </div>

      {/* Disiplin Warning */}
      <div className="mt-20 p-8 rounded-[40px] bg-red-600/10 border border-red-500/20 flex flex-col items-center text-center">
         <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
         </div>
         <h2 className="text-2xl font-black text-red-600 dark:text-red-500 mb-4 uppercase tracking-widest">DİSİPLİN UYGULAMALARI</h2>
         <p className="text-armoyu-text-muted text-lg max-w-xl font-medium">Bu kuralların ihlali durumunda, ihlalin derecesine göre uyarı, geçici süreli uzaklaştırma veya kalıcı yasaklama işlemleri uygulanabilir.</p>
      </div>
    </div>
  );
}
