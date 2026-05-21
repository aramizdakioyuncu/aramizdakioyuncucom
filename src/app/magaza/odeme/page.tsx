'use client';

import React, { useState } from 'react';
import { PageWidth } from '@armoyu/ui';
import Link from 'next/link';
import { BackToStore } from '@armoyu/ui';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1000px]" />

      <div className="mb-12">
        <BackToStore />
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight text-center">
          GÜVENLİ <span className="text-blue-600">ÖDEME</span>
        </h1>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mt-8">
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>1</div>
           <div className={`w-12 h-0.5 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-white/10'}`} />
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>2</div>
           <div className={`w-12 h-0.5 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-white/10'}`} />
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Form Area */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
           {step === 1 && (
             <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <h2 className="text-sm font-black text-armoyu-text uppercase tracking-widest mb-8">İLETİŞİM BİLGİLERİ</h2>
               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Ad Soyad</label>
                    <input type="text" name="name" onChange={handleInputChange} placeholder="Adınız ve Soyadınız" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">E-Posta</label>
                    <input type="email" name="email" onChange={handleInputChange} placeholder="ornek@mail.com" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Telefon</label>
                    <input type="tel" name="phone" onChange={handleInputChange} placeholder="05XX XXX XX XX" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <button onClick={() => setStep(2)} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95">SONRAKİ ADIM</button>
               </div>
             </div>
           )}

           {step === 2 && (
             <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <h2 className="text-sm font-black text-armoyu-text uppercase tracking-widest mb-8">ÖDEME BİLGİLERİ</h2>
               
               {/* Card Preview Mockup */}
               <div className="w-full aspect-[1.586/1] bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  <div className="flex justify-between items-start z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-80"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    <span className="text-[10px] font-black tracking-widest opacity-80 uppercase italic">GÜVENLİ KART</span>
                  </div>
                  <div className="space-y-4 z-10">
                    <div className="text-2xl font-mono tracking-[0.2em] font-medium transition-all group-hover:scale-105 origin-left">
                       {formData.cardNumber ? formData.cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ') : '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                         <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1 leading-none">Kart Sahibi</p>
                         <p className="text-xs uppercase font-bold tracking-tight">{formData.name || 'AD SOYAD'}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1 leading-none">SKT</p>
                         <p className="text-xs font-bold">{formData.expiry || 'MM/YY'}</p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Kart Numarası</label>
                    <input type="text" name="cardNumber" maxLength={16} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Son Kullanma</label>
                       <input type="text" name="expiry" maxLength={5} onChange={handleInputChange} placeholder="AA/YY" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">CVV</label>
                       <input type="password" name="cvv" maxLength={3} onChange={handleInputChange} placeholder="***" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all shadow-inner" />
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-armoyu-text font-black text-xs uppercase tracking-widest rounded-2xl transition-all border border-white/5">GERİ DÖN</button>
                    <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95">ÖDEMEYİ TAMAMLA</button>
                 </div>
               </div>
             </div>
           )}

           {step === 3 && (
             <div className="text-center py-20 glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 animate-bounce">
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-4">SİPARİŞİN ALINDI!</h2>
                <p className="text-armoyu-text-muted font-medium mb-12">Siparişin başarıyla oluşturuldu. <span className="text-blue-500 font-bold">#AR-2024-812</span> numaralı siparişini profilinden takip edebilirsin.</p>
                <div className="flex flex-col gap-4">
                   <Link href="/magaza/siparislerim" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20">SİPARİŞLERİME GİT</Link>
                   <Link href="/magaza" className="w-full py-4 text-armoyu-text-muted hover:text-armoyu-text font-black text-xs uppercase tracking-widest transition-colors tracking-tighter">ALIŞVERİŞE DEVAM ET</Link>
                </div>
             </div>
           )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
              <h2 className="text-xs font-black text-armoyu-text uppercase tracking-widest mb-6">SİPARİŞ ÖZETİ</h2>
              <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center bg-black/10 dark:bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 font-black text-xs">VIP</div>
                       <div className="text-[10px] font-black uppercase text-armoyu-text leading-tight">Premium VIP Üyelik</div>
                    </div>
                    <span className="text-xs font-black text-blue-500">₺149.90</span>
                 </div>
                 <div className="flex justify-between items-center bg-black/10 dark:bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 font-black text-xs">C1K</div>
                       <div className="text-[10px] font-black uppercase text-armoyu-text leading-tight">1000 ARMOYU Coin (x2)</div>
                    </div>
                    <span className="text-xs font-black text-blue-500">₺98.00</span>
                 </div>
              </div>
              <div className="border-t border-white/5 pt-6 space-y-4">
                 <div className="flex justify-between text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest">
                    <span>ARA TOPLAM</span>
                    <span>₺247.90</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest">
                    <span>KDV (%20)</span>
                    <span>₺49.58</span>
                 </div>
                 <div className="flex justify-between text-xl font-black text-armoyu-text pt-4">
                    <span>TOPLAM</span>
                    <span className="text-blue-500">₺297.48</span>
                 </div>
              </div>
           </div>

           {/* Security Badges */}
           <div className="flex flex-col gap-4 text-center">
              <div className="flex items-center justify-center gap-6 opacity-30 invert dark:invert-0 grayscale">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-6 object-contain" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-8 object-contain" alt="Mastercard" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-6 object-contain" alt="PayPal" />
              </div>
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                 TÜM VERİLERİNİZ ŞİFRELENMEKTEDİR
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
