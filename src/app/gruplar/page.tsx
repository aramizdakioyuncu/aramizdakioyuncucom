'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GroupCard, PageWidth, useArmoyu, Group } from '@armoyu/ui';

export default function GroupsPage() {
  const { ui } = useArmoyu();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Hepsi', 'E-Spor/Takım', 'Spor', 'Spor/Takım', 'Yazılım'];

  useEffect(() => {
    async function fetchGroups() {
      setIsLoading(true);
      setError(null);

      try {
        const categoryParam = activeTab === 'Hepsi' ? undefined : activeTab;
        const response = await ui.api.groups.getGroups(1, { category: categoryParam });

        if (response && response.durum === 1 && Array.isArray(response.icerik)) {
          // Kütüphanedeki Group modelini kullanarak verileri sarsılmaz hale getir (Mapping)
          const mappedGroups = response.icerik.map(g => Group.fromAPI(g));
          setGroups(mappedGroups);
        } else {
          setError(response?.aciklama || 'Gruplar yüklenirken bir hata oluştu.');
        }
      } catch (err) {
        console.error('[GroupsPage] API Error:', err);
        setError('Sunucuya bağlanırken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroups();
  }, [activeTab, ui.api.groups]);

  const filteredGroups = useMemo(() => {
    if (!Array.isArray(groups)) return [];

    const safeSearchQuery = (searchQuery || '').toLowerCase();

    return groups.filter(group => {
      if (!group) return false;

      const matchesSearch =
        (group.name || '').toLowerCase().includes(safeSearchQuery) ||
        (group.shortName || '').toLowerCase().includes(safeSearchQuery) ||
        (group.description || '').toLowerCase().includes(safeSearchQuery);

      return matchesSearch;
    });
  }, [groups, searchQuery]);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />

      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter italic">GRUP TOPLULUKLARI</h1>
        <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl italic">
          ARMOYU dünyasındaki gruplara, takımlara ve çalışma gruplarına katılarak oyun deneyimini zirveye taşı.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === cat ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl scale-105' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Grup ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-3 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-bold placeholder:font-bold italic"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute right-4 top-3.5 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="min-h-[400px] relative">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-8 rounded-[40px] text-center max-w-xl mx-auto animate-in zoom-in duration-300">
            <h3 className="text-xl font-black mb-2 uppercase italic tracking-tighter">Bir Hata Oluştu</h3>
            <p className="text-sm font-bold opacity-80 italic">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 h-[400px] animate-pulse flex flex-col justify-between">
                 <div className="space-y-4">
                    <div className="w-16 h-16 bg-black/10 dark:bg-white/10 rounded-[20px]" />
                    <div className="h-6 bg-black/10 dark:bg-white/10 rounded-lg w-3/4" />
                    <div className="h-4 bg-black/10 dark:bg-white/10 rounded-lg w-full" />
                    <div className="h-4 bg-black/10 dark:bg-white/10 rounded-lg w-1/2" />
                 </div>
                 <div className="h-12 bg-black/10 dark:bg-white/10 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGroups.map((group, idx) => {
              if (!group) return null;
              
              return (
                <GroupCard 
                  key={group.id || idx} 
                  {...group} 
                  shortName={group.shortName || ''}
                  description={group.description || ''}
                  logo={group.logo || ''}
                  banner={group.banner || ''}
                  recruitment={group.recruitment || 'Açık'}
                  date={group.date || ''}
                  tag={group.tag || ''}
                  category={group.category || 'Diğer'}
                />
              );
            })}

            {/* Yeni Grup Oluştur Card */}
            <div className="border-4 border-dashed border-armoyu-card-border rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:border-blue-500 transition-colors cursor-pointer min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <h3 className="font-black text-armoyu-text text-xl mb-2 italic">KENDİ GRUBUNU KUR</h3>
              <p className="text-sm font-bold text-armoyu-text-muted leading-relaxed mb-6 italic opacity-60 uppercase">Fikirlerini paylaşacak bir ekip mi arıyorsun? Hemen bir topluluk oluştur.</p>
              <button className="px-6 py-2.5 bg-armoyu-text text-armoyu-bg rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">BAŞLAT</button>
            </div>
          </div>
        )}
        
        {!isLoading && !error && filteredGroups.length === 0 && (
           <div className="text-center py-20 bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] animate-in zoom-in duration-500">
               <h3 className="text-2xl font-black text-armoyu-text mb-2 italic uppercase">Herhangi bir grup bulunamadı</h3>
               <p className="text-armoyu-text-muted font-bold italic uppercase opacity-60">Arama kriterlerinize uygun grup listelenemiyor.</p>
           </div>
        )}
      </div>
    </div>
  );
}

