'use client';

import React, { useMemo, useState } from 'react';
import { PageWidth, stationList } from '@armoyu/ui';
import { notFound } from 'next/navigation';
import {
   LayoutDashboard, Settings, List, Tag, Trophy,
   Users, BarChart3, TrendingUp, DollarSign, Clock,
   Plus, Edit2, Trash2, Save, Power, CheckCircle2,
   ArrowLeft, Bell, Monitor, Utensils, X, Image as ImageIcon,
   MousePointer2, Keyboard as KeyboardIcon, Cpu, HardDrive, Laptop, Zap
} from 'lucide-react';
import Link from 'next/link';
import { Station, StationProduct, WorkstationEquipment, StationCoupon } from '@armoyu/core';


interface PageProps {
   params: Promise<{ slug: string }>;
}

export default function StationManagementPage({ params }: PageProps) {
   const { slug } = React.use(params);
   const initialStation = useMemo(() => stationList.find(s => s.slug === slug), [slug]);

   // Local state for full CRUD simulation
   const [station, setStation] = useState<Station | undefined>(initialStation);
   const [activeTab, setActiveTab] = useState('Genel Bakış');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState<'PRODUCT' | 'EQUIPMENT' | 'CAMPAIGN' | 'GENERAL'>('PRODUCT');
   const [editingItem, setEditingItem] = useState<any>(null);

   if (!station) {
      notFound();
   }

   const tabs = [
      { name: 'Genel Bakış', icon: LayoutDashboard },
      { name: station.type === 'INTERNET_KAFE' ? 'Ekipmanlar' : 'Tesisler', icon: Monitor },
      { name: 'Ürünler & Fiyatlar', icon: Utensils },
      { name: 'Kampanyalar', icon: Tag },
      { name: 'Ayarlar', icon: Settings },
   ];

   // --- HANDLERS ---
   const handleSaveProduct = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const newProduct = new StationProduct({
         id: editingItem?.id || Math.random().toString(36).substr(2, 9),
         name: formData.get('name') as string,
         price: Number(formData.get('price')),
         category: formData.get('category') as string,
         isDeal: editingItem?.isDeal || false,
         discountRate: editingItem?.discountRate || ''
      });

      const updatedProducts = [...(station.products || [])];
      const index = updatedProducts.findIndex(p => p.id === newProduct.id);
      if (index > -1) updatedProducts[index] = newProduct;
      else updatedProducts.push(newProduct);

      setStation(new Station({ ...station, products: updatedProducts }));
      setIsModalOpen(false);
   };

   const handleDeleteProduct = (id: string) => {
      setStation(new Station({
         ...station,
         products: station.products?.filter(p => p.id !== id)
      }));
   };

   const handleToggleCampaign = (product: StationProduct) => {
      const updatedProducts = station.products?.map(p => {
         if (p.id === product.id) {
            return new StationProduct({
               ...p,
               isDeal: !p.isDeal,
               discountRate: !p.isDeal ? '%20' : ''
            });
         }
         return p;
      });
      setStation(new Station({ ...station, products: updatedProducts }));
   };

   return (
      <div className="pb-32 animate-in fade-in duration-700 bg-armoyu-bg min-h-screen">
         <PageWidth width="max-w-[1440px]" />

         <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pt-8">
               <div className="flex items-center gap-4">
                  <Link
                     href={`/istasyonlar/${station.slug}`}
                     className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-500 transition-all active:scale-95"
                  >
                     <ArrowLeft size={24} strokeWidth={2.5} />
                  </Link>
                  <div>
                     <h1 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">
                        {station.name} <span className="text-blue-500 ml-2 text-xl italic font-black">YÖNETİM</span>
                     </h1>
                     <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mt-1 opacity-60">İŞLETMECİ KONTROL PANELİ</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SİSTEM ÇEVRİMİÇİ</span>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all active:scale-95">
                     DEĞİŞİKLİKLERİ YAYINLA
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Sidebar Tabs */}
               <div className="lg:col-span-3 space-y-2">
                  {tabs.map((tab) => {
                     const Icon = tab.icon;
                     const isActive = activeTab === tab.name;
                     return (
                        <button
                           key={tab.name}
                           onClick={() => setActiveTab(tab.name)}
                           className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 active:scale-95' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                        >
                           <Icon size={18} strokeWidth={2.5} />
                           {tab.name}
                        </button>
                     );
                  })}

                  <div className="pt-8 border-t border-armoyu-card-border mt-8">
                     <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all active:scale-95">
                        <Power size={18} strokeWidth={2.5} />
                        İŞLETMEYİ KAPAT
                     </button>
                  </div>
               </div>

               {/* Main Content Dashboard */}
               <div className="lg:col-span-9 space-y-8">

                  {/* 1. GENEL BAKIŞ */}
                  {activeTab === 'Genel Bakış' && (
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-2">BUGÜNKÜ KAZANÇ</p>
                              <p className="text-4xl font-black text-armoyu-text italic">₺2,450</p>
                              <div className="flex items-center gap-2 mt-3 text-emerald-500">
                                 <TrendingUp size={14} />
                                 <span className="text-[10px] font-black">+14% DÜNE GÖRE</span>
                              </div>
                           </div>
                           <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-2">AKTİF REZERVASYON</p>
                              <p className="text-4xl font-black text-armoyu-text italic">12</p>
                              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-3">4 BEKLEYEN ONAY</p>
                           </div>
                           <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-2">POPLÜLERLİK</p>
                              <p className="text-4xl font-black text-armoyu-text italic">#4</p>
                              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-3">İSTANBUL GENELİ</p>
                           </div>
                        </div>

                        <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl">
                           <div className="flex items-center justify-between mb-8">
                              <h3 className="text-xl font-black text-armoyu-text uppercase tracking-widest italic flex items-center gap-3">
                                 <BarChart3 className="text-blue-500" /> HAFTALIK ZİYARETÇİ ANALİZİ
                              </h3>
                           </div>
                           <div className="flex items-end justify-between h-48 gap-4 pt-10">
                              {[40, 65, 30, 85, 45, 90, 70].map((h, i) => (
                                 <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-blue-500/20 rounded-t-xl group-hover:bg-blue-500 transition-all relative" style={{ height: `${h}%` }}>
                                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black opacity-0 group-hover:opacity-100">{h}</div>
                                    </div>
                                    <span className="text-[8px] font-black opacity-40">GÜN {i + 1}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 2. ÜRÜNLER & FİYATLAR */}
                  {activeTab === 'Ürünler & Fiyatlar' && (
                     <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                              <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-2">ÜRÜN LİSTESİ</h2>
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">MENÜ ÖĞELERİNİ VE FİYATLARINI YÖNET</p>
                           </div>
                           <button
                              onClick={() => { setModalType('PRODUCT'); setEditingItem(null); setIsModalOpen(true); }}
                              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                           >
                              <Plus size={16} strokeWidth={3} /> YENİ ÜRÜN EKLE
                           </button>
                        </div>

                        <div className="space-y-4">
                           {station.products?.map((product) => (
                              <div key={product.id} className="flex justify-between items-center p-6 bg-black/5 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/5 group hover:border-blue-500/30 transition-all">
                                 <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-xl italic">
                                       {product.category[0]}
                                    </div>
                                    <div>
                                       <h4 className="text-lg font-black text-armoyu-text uppercase leading-none mb-1">{product.name}</h4>
                                       <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{product.category}</span>
                                          <span className="w-1 h-1 rounded-full bg-white/20" />
                                          <span className="text-sm font-black text-armoyu-text">₺{product.price}</span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    {product.isDeal && (
                                       <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-500/20">AKTİF KAMPANYA</div>
                                    )}
                                    <button
                                       onClick={() => { setModalType('PRODUCT'); setEditingItem(product); setIsModalOpen(true); }}
                                       className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                    >
                                       <Edit2 size={16} />
                                    </button>
                                    <button
                                       onClick={() => handleDeleteProduct(product.id)}
                                       className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                       <Trash2 size={16} />
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 3. KAMPANYALAR */}
                  {activeTab === 'Kampanyalar' && (
                     <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="mb-12">
                           <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-2">KAMPANYA BAŞLAT</h2>
                           <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">ÜRÜNLERİNE ÖZEL İNDİRİMLER TANIMLAYARAK DAHA ÇOK OYUNCU ÇEK</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {station.products?.map((product) => (
                              <div key={product.id} className={`p-8 rounded-[40px] border transition-all ${product.isDeal ? 'bg-amber-500 border-amber-400 shadow-2xl shadow-amber-500/20' : 'bg-black/5 dark:bg-white/5 border-transparent'}`}>
                                 <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${product.isDeal ? 'bg-white text-amber-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                       <Zap size={24} fill={product.isDeal ? 'currentColor' : 'none'} />
                                    </div>
                                    <button
                                       onClick={() => handleToggleCampaign(product)}
                                       className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${product.isDeal ? 'bg-white text-amber-500' : 'bg-amber-500 text-white'}`}
                                    >
                                       {product.isDeal ? 'KAMPANYAYI DURDUR' : 'HEMEN BAŞLAT'}
                                    </button>
                                 </div>
                                 <h4 className={`text-xl font-black uppercase italic mb-1 ${product.isDeal ? 'text-white' : 'text-armoyu-text'}`}>{product.name}</h4>
                                 <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${product.isDeal ? 'text-white/70' : 'text-armoyu-text-muted'}`}>{product.category}</p>

                                 <div className="flex items-center gap-4">
                                    <div className={`text-2xl font-black ${product.isDeal ? 'text-white' : 'text-armoyu-text'}`}>
                                       ₺{product.isDeal ? Math.round(product.price * 0.8) : product.price}
                                    </div>
                                    {product.isDeal && (
                                       <div className="text-sm font-black text-white/50 line-through">₺{product.price}</div>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 4. EKİPMANLAR (İNTERNET KAFE ÖZEL) */}
                  {activeTab === 'Ekipmanlar' && station.type === 'INTERNET_KAFE' && (
                     <div className="glass-panel p-10 md:p-12 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl animate-in fade-in duration-500">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                              <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-2">DONANIM YÖNETİMİ</h2>
                              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">MASALARIN ÖZELLİKLERİNİ VE DURUMUNU GÜNCELLE</p>
                           </div>
                           <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2">
                              <Plus size={16} strokeWidth={3} /> YENİ MASA EKLE
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                           {station.equipment?.map((eq) => (
                              <div key={eq.id} className="p-8 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[40px] group hover:border-blue-500/30 transition-all">
                                 <div className="flex justify-between items-center mb-8">
                                    <h4 className="text-xl font-black text-armoyu-text uppercase italic flex items-center gap-3">
                                       <div className="w-2 h-6 bg-blue-500 rounded-full" /> {eq.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                       <button className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                                          <Edit2 size={16} />
                                       </button>
                                       <button className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                          <Trash2 size={16} />
                                       </button>
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                       { icon: Cpu, label: 'CPU', value: eq.cpu },
                                       { icon: Zap, label: 'GPU', value: eq.gpu },
                                       { icon: HardDrive, label: 'RAM', value: eq.ram },
                                       { icon: Laptop, label: 'MONİTÖR', value: eq.monitor },
                                    ].map((spec, i) => (
                                       <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                          <spec.icon size={14} className="text-blue-500 mb-2" />
                                          <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{spec.label}</p>
                                          <p className="text-[10px] font-black text-armoyu-text uppercase truncate">{spec.value}</p>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </div>

         {/* FORM MODAL (Simulated) */}
         {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
               <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
               <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[48px] overflow-hidden shadow-2xl border border-white/10 p-10 animate-in zoom-in slide-in-from-bottom-8">
                  <div className="flex justify-between items-center mb-10">
                     <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic">
                        {editingItem ? 'ÜRÜNÜ DÜZENLE' : 'YENİ ÜRÜN EKLE'}
                     </h3>
                     <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                        <X size={20} />
                     </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">ÜRÜN ADI</label>
                        <input
                           name="name"
                           defaultValue={editingItem?.name}
                           required
                           placeholder="Örn: Double Cheeseburger"
                           className="w-full h-16 px-6 bg-black/5 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5 text-armoyu-text font-bold focus:border-blue-500 outline-none transition-all"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">FİYAT (₺)</label>
                           <input
                              name="price"
                              type="number"
                              defaultValue={editingItem?.price}
                              required
                              className="w-full h-16 px-6 bg-black/5 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5 text-armoyu-text font-bold focus:border-blue-500 outline-none transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest px-2">KATEGORİ</label>
                           <select
                              name="category"
                              defaultValue={editingItem?.category || 'Yemek'}
                              className="w-full h-16 px-6 bg-black/5 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5 text-armoyu-text font-bold focus:border-blue-500 outline-none transition-all appearance-none"
                           >
                              <option>Kahve</option>
                              <option>Yemek</option>
                              <option>İçecek</option>
                              <option>Atıştırmalık</option>
                           </select>
                        </div>
                     </div>

                     <div className="pt-6">
                        <button className="w-full py-5 bg-blue-600 text-white rounded-[25px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
                           {editingItem ? 'KAYDET' : 'ÜRÜNÜ EKLE'}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}
