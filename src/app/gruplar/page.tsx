'use client';

import React, { useState } from 'react';
import { GroupCard } from '@/components/modules/groups/GroupCard';
import { PageWidth } from '@/components/shared/PageWidth';
import { groupList } from '@/lib/constants/seedData';
import { Group } from '@/models';


export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['Hepsi', 'E-Spor/Takım', 'Spor', 'Spor/Takım', 'Yazılım'];
  
  const filteredGroups = groupList.filter(group => {
    const matchesTab = activeTab === 'Hepsi' || group.category === activeTab;
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      group.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter">GRUP TOPLULUKLARI</h1>
        <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
          ARMOYU dünyasındaki klanlara, takımlara ve çalışma gruplarına katılarak oyun deneyimini zirveye taşı.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveTab(cat)}
               className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === cat ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
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
             className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-3 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" 
           />
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute right-4 top-3 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredGroups.map((group, idx) => (
          <GroupCard key={idx} {...group} />
        ))}
        
        {/* Yeni Grup Oluştur Card (İsteğe bağlı) */}
        <div className="border-4 border-dashed border-armoyu-card-border rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:border-blue-500 transition-colors cursor-pointer min-h-[400px]">
           <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           </div>
           <h3 className="font-black text-armoyu-text text-xl mb-2">Kendi Grubunu Kur</h3>
           <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-6">Fikirlerini paylaşacak bir ekip mi arıyorsun? Hemen bir topluluk oluştur.</p>
           <button className="px-6 py-2.5 bg-armoyu-text text-armoyu-bg rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">Başlat</button>
        </div>
      </div>
    </div>
  );
}
