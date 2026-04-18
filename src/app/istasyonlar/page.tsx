'use client';

import React, { useState, useMemo } from 'react';
import { PageWidth, FilterTabs, SearchBar, StationCard, stationList } from '@armoyu/ui';
import { MapPin, Filter, Warehouse } from 'lucide-react';

export default function StationsPage() {
  const [activeTypeLabel, setActiveTypeLabel] = useState<string>('TÜMÜ');
  const [searchQuery, setSearchQuery] = useState('');

  const typeMapping: Record<string, string> = {
    'TÜMÜ': 'Hepsi',
    'Yemek & Kahve': 'YEMEK',
    'İnternet Kafe': 'INTERNET_KAFE',
    'Halı Saha': 'HALI_SAHA',
    'Spor Kompleksi': 'SPOR_KOMPLEKSI'
  };

  const tabs = Object.keys(typeMapping);

  const filteredStations = useMemo(() => {
    const activeTypeId = typeMapping[activeTypeLabel];
    return stationList.filter(station => {
      const matchesType = activeTypeId === 'Hepsi' || station.type === activeTypeId;
      const matchesSearch = 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        station.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesType && matchesSearch;
    });
  }, [activeTypeLabel, searchQuery]);

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

      {/* Filters & Search - Modularized */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-16">
        <FilterTabs 
          tabs={tabs}
          active={activeTypeLabel}
          onChange={setActiveTypeLabel}
          variant="pill"
        />
        
        <SearchBar 
          placeholder="İstasyon, mekan veya şehir ara..." 
          value={searchQuery}
          onChange={setSearchQuery}
          size="lg"
          className="lg:w-96"
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-armoyu-card-border">
         <div className="flex items-center gap-3">
            <Filter size={20} className="text-blue-500" />
            <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic">
               {activeTypeLabel} 
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
              onClick={() => { setActiveTypeLabel('TÜMÜ'); setSearchQuery(''); }}
              className="px-10 py-4 bg-armoyu-text dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
               FİLTRELERİ TEMİZLE
            </button>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStations.map((station) => (
            /* @ts-ignore - StationCard props mismatch fix */
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
