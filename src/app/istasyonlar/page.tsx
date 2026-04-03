'use client';

import React, { useState, useMemo } from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import { StationCard } from '@/components/modules/stations/StationCard';
import { stationList } from '@/lib/constants/seedData';
import { MapPin, Search, Filter, Warehouse, Coffee, Monitor, Trophy, Dumbbell } from 'lucide-react';

export default function StationsPage() {
  const [activeType, setActiveType] = useState<string>('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');

  const types = [
    { id: 'Hepsi', label: 'TÜMÜ', icon: Warehouse },
    { id: 'YEMEK', label: 'Yemek & Kahve', icon: Coffee },
    { id: 'INTERNET_KAFE', label: 'İnternet Kafe', icon: Monitor },
    { id: 'HALI_SAHA', label: 'Halı Saha', icon: Trophy },
    { id: 'SPOR_KOMPLEKSI', label: 'Spor Kompleksi', icon: Dumbbell },
  ];

  const filteredStations = useMemo(() => {
    return stationList.filter(station => {
      const matchesType = activeType === 'Hepsi' || station.type === activeType;
      const matchesSearch = 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        station.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesType && matchesSearch;
    });
  }, [activeType, searchQuery]);

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-16 pt-12 text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-600/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
           <span className="w-12 h-[2px] bg-blue-600" />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">ARMOYU ECOSYSTEM</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-6">
           OYUNCU <br/> <span className="text-blue-600">İSTASYONLARI</span>
        </h1>
        <p className="text-armoyu-text-muted text-xl font-medium max-w-2xl opacity-70 leading-relaxed">
           Şehrindeki en iyi internet kafeleri, halı sahaları ve oyuncu dostu mekanları keşfet. 
           AVANTAJLI fiyatlar ve topluluğa özel kuponlar seni bekliyor.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-16">
        {/* Category Tabs */}
        <div className="flex bg-black/5 dark:bg-white/5 p-2 rounded-[32px] border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
           {types.map((type) => {
             const Icon = type.icon;
             return (
               <button
                 key={type.id}
                 onClick={() => setActiveType(type.id)}
                 className={`px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 flex items-center gap-3 ${activeType === type.id ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-2xl' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
               >
                 <Icon size={16} />
                 {type.label}
               </button>
             );
           })}
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full lg:w-96 group">
           <input 
             type="text" 
             placeholder="İstasyon, mekan veya şehir ara..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[28px] px-8 py-5 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:opacity-50" 
           />
           <div className="absolute right-6 top-5 text-blue-500 group-focus-within:scale-110 transition-transform">
              <Search size={22} strokeWidth={2.5} />
           </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-armoyu-card-border">
         <div className="flex items-center gap-3">
            <Filter size={20} className="text-blue-500" />
            <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic">
               {activeType === 'Hepsi' ? 'TÜM MEKANLAR' : types.find(t => t.id === activeType)?.label} 
               <span className="text-blue-600 ml-2 font-black">({filteredStations.length})</span>
            </h2>
         </div>
      </div>

      {/* Grid */}
      {filteredStations.length === 0 ? (
         <div className="py-40 text-center glass-panel rounded-[60px] border border-dashed border-armoyu-card-border">
            <div className="w-24 h-24 bg-blue-500/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/10">
               <MapPin size={48} className="text-blue-500 opacity-20" />
            </div>
            <h3 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-3">ARADIĞIN MEKAN BULUNAMADI</h3>
            <p className="text-armoyu-text-muted font-bold text-sm tracking-widest uppercase opacity-60 mb-10">KRİTERLERİNE UYGUN BİR SONUÇ ELDE EDEMEDİK.</p>
            <button 
              onClick={() => { setActiveType('Hepsi'); setSearchQuery(''); }}
              className="px-10 py-4 bg-armoyu-text dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
               FİLTRELERİ TEMİZLE
            </button>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStations.map((station) => (
            <StationCard key={station.id} {...station} />
          ))}
          
          {/* Create Station Placeholder */}
          <div className="border-4 border-dashed border-armoyu-card-border rounded-[32px] flex flex-col items-center justify-center p-12 text-center group hover:border-blue-500 transition-all cursor-pointer bg-white/5 hover:bg-blue-500/[0.02]">
             <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-blue-500/10">
                <Warehouse size={32} strokeWidth={2.5} />
             </div>
             <h3 className="font-black text-armoyu-text text-2xl mb-3 uppercase tracking-tighter italic">KENDİ İSTASYONUNU EKLE</h3>
             <p className="text-sm font-semibold text-armoyu-text-muted leading-relaxed mb-8 opacity-70">
                İşletmeni ARMOYU topluluğuna tanıt, etkinlikler düzenle ve müşteri portföyünü genişlet.
             </p>
             <button className="w-full py-4 bg-armoyu-text dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity active:scale-95">BAŞVURU YAP</button>
          </div>
        </div>
      )}
    </div>
  );
}
