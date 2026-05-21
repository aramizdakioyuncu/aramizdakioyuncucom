'use client';

import React, { useMemo, useState } from 'react';
import { PageWidth, StationQRModal, stationList } from '@armoyu/ui';
import { notFound } from 'next/navigation';
import {
   MapPin, Star, Coffee, Monitor, Trophy, Dumbbell,
   Clock, Phone, ShieldCheck, Zap, Laptop,
   Cpu, HardDrive, Utensils, Tag,
   Calendar, MessageSquare, ChevronRight, Settings,
   QrCode, Sparkles, UserPlus, Info, CheckCircle2,
   Construction, Map as MapIcon, ParkingCircle, ShowerHead,
   MousePointer2, Keyboard as KeyboardIcon
} from 'lucide-react';
import Link from 'next/link';
import { StationProduct } from '@armoyu/core';


interface PageProps {
   params: Promise<{ slug: string }>;
}

export default function StationDetailPage({ params }: PageProps) {
   const { slug } = React.use(params);
   const station = useMemo(() => stationList.find(s => s.slug === slug), [slug]);
   const [selectedItem, setSelectedItem] = useState<StationProduct | null>(null);
   const [isQRModalOpen, setIsQRModalOpen] = useState(false);

   if (!station) {
      notFound();
   }

   const handleProductClick = (product: StationProduct) => {
      setSelectedItem(product);
      setIsQRModalOpen(true);
   };

   return (
      <div className="pb-32 animate-in fade-in duration-1000">
         {/* Hero Banner */}
         <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
            <img src={station.banner} alt={station.name} className="w-full h-full object-cover animate-in zoom-in duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-armoyu-bg via-armoyu-bg/40 to-transparent" />

            <PageWidth width="max-w-[1440px]" />

            <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12 max-w-[1440px] mx-auto">
               <div className="flex flex-col md:flex-row items-end gap-8">
                  {/* Logo */}
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] border-8 border-armoyu-bg overflow-hidden shadow-2xl bg-white shrink-0 -mb-6 md:-mb-12">
                     <img src={station.logo} alt={station.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 pb-4">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20">
                           {station.type.replace('_', ' ')}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                           <Star size={14} className="text-amber-500 fill-amber-500" />
                           <span className="text-xs font-black text-white">{station.rating}</span>
                        </div>
                     </div>
                     <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                        {station.name}
                     </h1>
                  </div>

                  {/* Top Actions */}
                  <div className="flex gap-4 pb-4">
                     <Link
                        href={`/istasyonlar/${station.slug}/yonetim`}
                        className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
                     >
                        <Settings size={16} /> YÖNETİM
                     </Link>
                     <button className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
                        REZERVASYON YAP
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Sidebar Info */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                     <h3 className="text-lg font-black text-armoyu-text uppercase tracking-widest mb-8 flex items-center gap-2">
                        <MapPin size={20} className="text-blue-500" /> İLETİŞİM & KONUM
                     </h3>
                     <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                           <MapPin className="text-blue-500 shrink-0 mt-1" size={20} />
                           <div>
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">ADRES</p>
                              <p className="text-sm font-bold text-armoyu-text leading-relaxed">{station.location}</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                           <Phone className="text-blue-500 shrink-0 mt-1" size={20} />
                           <div>
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">TELEFON</p>
                              <p className="text-sm font-bold text-armoyu-text">0212 999 00 00</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                           <Clock className="text-blue-500 shrink-0 mt-1" size={20} />
                           <div>
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">AÇILIŞ SAATLERİ</p>
                              <p className="text-sm font-bold text-armoyu-text">Her Gün: 09:00 - 02:00</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8">
                        <button className="w-full py-4 bg-armoyu-text dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all">
                           HARİTALARDA AÇ <ChevronRight size={18} strokeWidth={3} />
                        </button>
                     </div>
                  </div>

                  {/* Pricing Sidebar */}
                  {station.pricing && station.pricing.length > 0 && (
                     <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl overflow-hidden relative group">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                        <h3 className="text-lg font-black text-armoyu-text uppercase tracking-widest mb-8 flex items-center gap-2">
                           <Tag size={20} className="text-emerald-500" /> ÜCRETLENDİRME
                        </h3>
                        <div className="space-y-4">
                           {station.pricing.map((price, idx) => (
                              <div key={idx} className="flex justify-between items-center p-4 rounded-[24px] border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                                 <div>
                                    <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{price.label}</p>
                                    <p className="text-lg font-black text-armoyu-text">{price.price} ₺ <span className="text-[10px] opacity-50 uppercase tracking-widest">/{price.unit}</span></p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>

               {/* Main Content Area */}
               <div className="lg:col-span-8 space-y-12">
                  {/* About */}
                  <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl relative overflow-hidden">
                     <div className="relative z-10">
                        <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-8">İSTASYON HAKKINDA</h2>
                        <p className="text-lg text-armoyu-text-muted font-medium leading-relaxed opacity-80 mb-10">
                           {station.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        {station.facilities && station.facilities.length > 0 && (
                           <div className="flex flex-wrap gap-3">
                              {station.facilities.map((facet, idx) => (
                                 <div key={idx} className="px-5 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-blue-500" />
                                    <span className="text-xs font-black text-armoyu-text uppercase tracking-widest">{facet}</span>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Category Specific Content */}

                  {/* 1. WORKSTATION EQUIPMENT (INTERNET KAFE) */}
                  {station.type === 'INTERNET_KAFE' && station.equipment && station.equipment.length > 0 && (
                     <div className="space-y-8">
                        <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic flex items-center gap-4 px-4">
                           <Monitor size={32} className="text-blue-500" /> EKİPMANLAR / MASALAR
                        </h2>

                        {station.equipment.map((eq, idx) => (
                           <div key={idx} className="glass-panel p-10 md:p-12 rounded-[50px] border border-blue-500/20 bg-blue-500/[0.02] shadow-2xl relative group overflow-hidden">
                              <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

                              <div className="flex items-center justify-between mb-10">
                                 <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight italic flex items-center gap-3">
                                    <div className="w-2 h-8 bg-blue-600 rounded-full" /> {eq.name}
                                 </h3>
                                 {eq.isAvailable ? (
                                    <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">MÜSAİT</span>
                                 ) : (
                                    <span className="px-4 py-1.5 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20">DOLU</span>
                                 )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                 <div className="p-5 rounded-3xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <Cpu className="text-blue-600" size={24} />
                                    <div>
                                       <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">İŞLEMCİ</p>
                                       <p className="text-sm font-black text-armoyu-text uppercase truncate">{eq.cpu}</p>
                                    </div>
                                 </div>
                                 <div className="p-5 rounded-3xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <Zap className="text-indigo-600" size={24} />
                                    <div>
                                       <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">EKRAN KARTI</p>
                                       <p className="text-sm font-black text-armoyu-text uppercase truncate">{eq.gpu}</p>
                                    </div>
                                 </div>
                                 <div className="p-5 rounded-3xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <HardDrive className="text-emerald-600" size={24} />
                                    <div>
                                       <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">BELLEK</p>
                                       <p className="text-sm font-black text-armoyu-text uppercase truncate">{eq.ram}</p>
                                    </div>
                                 </div>
                                 <div className="p-5 rounded-3xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <Laptop className="text-amber-600" size={24} />
                                    <div>
                                       <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">MONİTÖR</p>
                                       <p className="text-sm font-black text-armoyu-text uppercase truncate">{eq.monitor}</p>
                                    </div>
                                 </div>
                                 <div className="p-5 rounded-3xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <KeyboardIcon className="text-purple-600" size={24} />
                                    <div>
                                       <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">KLAVYE</p>
                                       <p className="text-sm font-black text-armoyu-text uppercase truncate">{eq.keyboard}</p>
                                    </div>
                                 </div>
                                 <div className="p-5 rounded-3xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <MousePointer2 className="text-rose-600" size={24} />
                                    <div>
                                       <p className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest">MOUSE</p>
                                       <p className="text-sm font-black text-armoyu-text uppercase truncate">{eq.mouse}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  {/* 2. PRODUCTS (YEMEK) */}
                  {station.type === 'YEMEK' && station.products && station.products.length > 0 && (
                     <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-amber-500/20 bg-amber-500/[0.02] shadow-2xl relative overflow-hidden">
                        <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-3 flex items-center gap-4">
                           <Utensils size={32} className="text-amber-500" /> MENÜ & LEZZETLER
                        </h2>
                        <p className="text-armoyu-text-muted text-xs font-bold uppercase tracking-widest mb-10 opacity-60">MENÜYE TIKLAYARAK QR KODUNUZU OLUŞTURABİLİRSİNİZ.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {station.products.map((item, idx) => (
                              <div
                                 key={idx}
                                 onClick={() => handleProductClick(item)}
                                 className={`relative cursor-pointer flex justify-between items-center p-6 rounded-[32px] group/item transition-all duration-500 ${item.isDeal ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30' : 'bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 hover:border-blue-500/50 shadow-lg'}`}
                              >
                                 {item.isDeal && (
                                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-amber-500 rounded-full flex items-center gap-1.5 shadow-xl shadow-amber-500/20 z-10 animate-bounce">
                                       <Sparkles size={12} className="text-white fill-white" />
                                       <span className="text-[9px] font-black text-white uppercase tracking-widest">AVANTAJLI</span>
                                    </div>
                                 )}

                                 <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${item.isDeal ? 'bg-amber-500 text-white' : 'bg-blue-500/10 text-blue-500'}`}>
                                       {item.isDeal ? <Zap size={20} fill="currentColor" /> : item.category[0]}
                                    </div>
                                    <div>
                                       <p className={`text-lg font-black uppercase group-hover/item:text-blue-500 transition-colors italic ${item.isDeal ? 'text-amber-600 dark:text-amber-400' : 'text-armoyu-text'}`}>
                                          {item.name}
                                       </p>
                                       <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{item.category}</p>
                                    </div>
                                 </div>

                                 <div className="text-right flex flex-col items-end gap-1 relative z-10">
                                    <p className="text-xl font-black text-armoyu-text">{item.price} ₺</p>
                                    {item.isDeal && (
                                       <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.discountRate} İNDİRİMLİ</span>
                                    )}
                                    <div className="mt-2 w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center opacity-40 group-hover/item:opacity-100 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                                       <QrCode size={16} />
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Coupons */}
                        {station.coupons && station.coupons.length > 0 && (
                           <div className="mt-12 pt-12 border-t border-armoyu-card-border">
                              <h3 className="text-xl font-black text-armoyu-text uppercase tracking-widest mb-8 flex items-center gap-3">
                                 <Zap size={24} className="text-amber-500 animate-pulse" /> ÖZEL KUPONLAR
                              </h3>
                              <div className="grid grid-cols-1 gap-6">
                                 {station.coupons.map((coupon, idx) => (
                                    <div key={idx} className="relative p-8 rounded-[35px] bg-gradient-to-r from-amber-500 to-orange-600 text-white overflow-hidden shadow-2xl shadow-amber-500/20 group/coupon">
                                       <div className="absolute right-0 top-0 h-full w-40 bg-white/10 -skew-x-[30deg] translate-x-20 group-hover/coupon:translate-x-10 transition-transform duration-700" />
                                       <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                          <div>
                                             <div className="flex items-center gap-3 mb-2">
                                                <span className="text-4xl font-black italic">{coupon.discount}</span>
                                                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest leading-none">İNDİRİM</span>
                                             </div>
                                             <p className="text-sm font-bold opacity-90">{coupon.description}</p>
                                          </div>
                                          <div className="bg-black/20 backdrop-blur-md p-4 rounded-[25px] border border-white/20 text-center md:min-w-[180px]">
                                             <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1 opacity-70">AKTİVASYON KODU</p>
                                             <p className="text-2xl font-black tracking-[0.2em]">{coupon.code}</p>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  )}

                  {/* 3. HALI SAHA DETAYLARI */}
                  {station.type === 'HALI_SAHA' && (
                     <div className="space-y-8">
                        <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-emerald-500/20 bg-emerald-500/[0.02] shadow-2xl relative overflow-hidden">
                           <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                              <Trophy size={32} className="text-emerald-500" /> SAHA ÖZELLİKLERİ
                           </h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="p-6 rounded-[32px] bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 text-center group hover:border-emerald-500/50 transition-all">
                                 <MapIcon className="mx-auto mb-4 text-emerald-500" size={32} />
                                 <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">BOYUT</p>
                                 <p className="text-lg font-black text-armoyu-text">30m x 50m</p>
                              </div>
                              <div className="p-6 rounded-[32px] bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 text-center group hover:border-emerald-500/50 transition-all">
                                 <Construction className="mx-auto mb-4 text-emerald-500" size={32} />
                                 <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">ZEMİN</p>
                                 <p className="text-lg font-black text-armoyu-text uppercase">Suni Çim S2</p>
                              </div>
                              <div className="p-6 rounded-[32px] bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 text-center group hover:border-emerald-500/50 transition-all">
                                 <ParkingCircle className="mx-auto mb-4 text-emerald-500" size={32} />
                                 <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">OTOPARK</p>
                                 <p className="text-lg font-black text-armoyu-text uppercase">Ücretsiz</p>
                              </div>
                           </div>
                        </div>

                        {/* "Maç Bul" Interactive Section */}
                        <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-blue-500/20 bg-blue-500/[0.02] shadow-2xl relative overflow-hidden group">
                           <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
                           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                              <div>
                                 <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">EKSİK OYUNCU MU VAR?</h2>
                                 <p className="text-armoyu-text-muted font-medium mb-0">Platform üzerinden ilan aç, eksik oyuncunu hemen bul!</p>
                              </div>
                              <button className="px-10 py-5 bg-blue-600 text-white rounded-[25px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-3">
                                 <UserPlus size={20} /> İLAN OLUŞTUR
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 4. SPOR KOMPLEKSİ / GYM */}
                  {station.type === 'SPOR_KOMPLEKSI' && (
                     <div className="space-y-8">
                        <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-purple-500/20 bg-purple-500/[0.02] shadow-2xl relative overflow-hidden">
                           <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                              <Dumbbell size={32} className="text-purple-500" /> TESİS İMKANLARI
                           </h2>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {[
                                 { icon: ShowerHead, label: 'Modern Duşlar' },
                                 { icon: Info, label: 'Özel Dersler' },
                                 { icon: CheckCircle2, label: '7/24 Güvenlik' },
                                 { icon: Zap, label: 'Protein Bar' }
                              ].map((item, idx) => (
                                 <div key={idx} className="p-6 rounded-[32px] bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 text-center flex flex-col items-center justify-center gap-3 group hover:border-purple-500/50 transition-all">
                                    <item.icon className="text-purple-500" size={28} />
                                    <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest leading-none">{item.label}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Common Sections: Reviews & Community */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="glass-panel p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                        <h3 className="text-xl font-black text-armoyu-text uppercase tracking-widest mb-8 flex items-center gap-3">
                           <Calendar size={24} className="text-blue-500" /> TURNUVALAR
                        </h3>
                        <div className="py-12 text-center opacity-40">
                           <Trophy size={48} className="mx-auto mb-4" />
                           <p className="text-xs font-black uppercase tracking-widest">YAKINDA AKTİF OLACAK</p>
                        </div>
                     </div>
                     <div className="glass-panel p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                        <h3 className="text-xl font-black text-armoyu-text uppercase tracking-widest mb-8 flex items-center gap-3">
                           <MessageSquare size={24} className="text-emerald-500" /> YORUMLAR
                        </h3>
                        <div className="py-12 text-center opacity-40">
                           <Star size={48} className="mx-auto mb-4" />
                           <p className="text-xs font-black uppercase tracking-widest">{station.reviewCount} DEĞERLENDİRME</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* QR Modal */}
         <StationQRModal
            isOpen={isQRModalOpen}
            onClose={() => setIsQRModalOpen(false)}
            stationName={station.name}
            item={selectedItem}
         />

         {/* Booking Drawer Footer (Fixed Mobile) */}
         <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
            <button className="w-full py-5 bg-blue-600 text-white rounded-[25px] font-black text-lg uppercase tracking-widest shadow-2xl shadow-blue-500/40 active:scale-95 transition-all">
               Hemen Rezervasyon
            </button>
         </div>
      </div>
   );
}
