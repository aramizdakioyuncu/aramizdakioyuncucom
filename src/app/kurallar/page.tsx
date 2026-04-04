'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  Clock, 
  Lock, 
  MessageSquareX, 
  FileX, 
  Ban, 
  Edit3,
  ChevronRight,
  Info,
  Scale,
  LayoutGrid,
  List
} from 'lucide-react';
import { PUNISHMENT_RULES, PunishmentRule, getRestrictionLabel, RuleCategory, getCommunityComplianceLevel } from '@/lib/constants/punishmentData';

export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<RuleCategory | 'HEPSİ'>('HEPSİ');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories: (RuleCategory | 'HEPSİ')[] = ['HEPSİ', 'SOHBET', 'İÇERİK', 'GÜVENLİK', 'HESAP', 'ETKİNLİK'];

  const filteredRules = useMemo(() => {
    return PUNISHMENT_RULES.filter(rule => {
      const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rule.article.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'HEPSİ' || rule.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-transparent pb-20 animate-in fade-in duration-1000">
      
      {/* Hero Section */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-4 animate-in slide-in-from-top-4 duration-700">
              <Scale size={18} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-armoyu-text-muted italic">ARMOYU TOPLULUK ANAYASASI</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black text-armoyu-text uppercase italic tracking-tighter leading-none">
              TOPLULUK <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">REHBERİ</span>
           </h1>
           
           <p className="max-w-2xl mx-auto text-armoyu-text-muted font-bold text-sm md:text-base uppercase tracking-widest leading-relaxed italic opacity-80">
              Burası devasa bir aile; saygı ve sevgi bağımız en büyük gücümüz. 
              <span className="text-blue-500 block mt-2 text-xl font-black not-italic tracking-tighter shadow-sm underline decoration-blue-500/30 underline-offset-8">TOPLULUK HUZURU HEPİMİZİN SORUMLULUĞUNDA.</span>
           </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* Compliance Multiplier Legend */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-in slide-in-from-top-12 duration-1000">
           {[0, 2, 5, 8, 10].map((count) => {
             const level = getCommunityComplianceLevel(count);
             return (
               <div key={count} className="p-4 rounded-[28px] border border-white/5 bg-armoyu-card-bg/40 backdrop-blur-md flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black italic shadow-lg" style={{ backgroundColor: level.color }}>
                     {count === 10 ? '10/10' : count > 0 ? `${count}.` : '0'}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-center" style={{ color: level.color }}>{level.label}</div>
                  <div className="text-[10px] font-bold text-armoyu-text-muted italic">x{level.multiplier} Uyum Katsayısı</div>
               </div>
             );
           })}
           <div className="col-span-full mt-2 text-center">
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-[0.3em] italic opacity-60">
                🌱 Topluluk Uyum Rehberi: Kurallara uyum sağladıkça topluluk içindeki saygınlığınız artar. Tekrarlayan hatalarda, huzuru korumak adına kısıtlama süreleri esner.
              </p>
           </div>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="sticky top-24 z-40 space-y-6 bg-armoyu-card-bg/80 backdrop-blur-2xl p-6 rounded-[32px] border border-armoyu-card-border shadow-2xl relative">
           <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={20} />
                  <input 
                    type="text" 
                    placeholder="Kural adı, madde numarası..."
                    className="w-full bg-black/20 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm font-black text-armoyu-text focus:outline-none focus:border-blue-500 transition-all placeholder:text-armoyu-text-muted/30 italic uppercase tracking-widest"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex bg-black/20 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-armoyu-text-muted hover:text-white'}`}
                   title="Kart Görünümü"
                 >
                    <LayoutGrid size={20} />
                 </button>
                 <button 
                   onClick={() => setViewMode('table')}
                   className={`p-3 rounded-xl transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-lg' : 'text-armoyu-text-muted hover:text-white'}`}
                   title="Tablo Görünümü"
                 >
                    <List size={20} />
                 </button>
              </div>
           </div>
           
           <div className="flex flex-wrap gap-2 items-center justify-center">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 shadow-sm transition-all duration-300' 
                    : 'bg-white/5 text-armoyu-text-muted hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Dynamic Rules Content */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
             {filteredRules.length > 0 ? (
               filteredRules.map((rule, idx) => (
                 <div 
                   key={rule.id}
                   className="group relative bg-armoyu-card-bg border border-armoyu-card-border/50 rounded-[40px] p-8 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 animate-in fade-in slide-in-from-bottom-8"
                   style={{ animationDelay: `${idx * 50}ms` }}
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-black italic">
                          {rule.article}
                       </div>
                       <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${
                          rule.severity === 'critical' ? 'bg-red-600 text-white animate-pulse' :
                          rule.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                          rule.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-600' :
                          'bg-blue-500/20 text-blue-500'
                       }`}>
                          {rule.severity} Risk
                       </div>
                    </div>

                    <h3 className="text-2xl font-black text-armoyu-text uppercase italic tracking-tighter leading-none mb-3 group-hover:text-blue-500 transition-colors">
                       {rule.name}
                    </h3>
                    
                    <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed line-clamp-3 mb-8 opacity-80 min-h-[4.5rem]">
                       {rule.description}
                    </p>

                    <div className="space-y-6 pt-6 border-t border-white/5 text-left">
                       <div className="flex justify-between items-center text-left">
                          <div className="flex items-center gap-3">
                             <Clock size={16} className="text-blue-500" />
                             <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">UYGULANAN MÜEYYİDE:</span>
                          </div>
                          <span className="text-xs font-black text-white bg-blue-600/20 border border-blue-600/30 px-3 py-1 rounded-lg italic">
                             {rule.duration === 0 ? 'KALICI BAN' : `${rule.duration} SAAT`}
                          </span>
                       </div>

                       <div className="space-y-4 text-left">
                          <div className="flex items-center gap-3">
                             <Lock size={16} className="text-red-500" />
                             <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">KISITLAMALAR:</span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-left">
                             {rule.restrictions.map(req => (
                               <div 
                                 key={req}
                                 className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-[9px] font-black text-red-500 uppercase tracking-widest italic"
                               >
                                  {req === 'CHAT_BAN' && <MessageSquareX size={12} />}
                                  {req === 'POST_BAN' && <FileX size={12} />}
                                  {req === 'LOGIN_BAN' && <Ban size={12} />}
                                  {req === 'PERMANENT_BAN' && <Lock size={12} />}
                                  {req === 'PROFILE_EDIT_BAN' && <Edit3 size={12} />}
                                  {getRestrictionLabel(req)}
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
               ))
             ) : (
               <NoResults />
             )}
          </div>
        ) : (
          /* Table View */
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[44px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 relative text-left">
             <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-black/20 border-b border-armoyu-card-border">
                         <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Madde</th>
                         <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Başlık & Açıklama</th>
                         <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Süre</th>
                         <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Risk</th>
                         <th className="px-8 py-6 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic text-right">Kısıtlamalar</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {filteredRules.length > 0 ? (
                        filteredRules.map((rule) => (
                          <tr key={rule.id} className="hover:bg-blue-600/[0.03] transition-all group duration-300">
                             <td className="px-8 py-6 whitespace-nowrap">
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black italic">
                                   {rule.article}
                                </span>
                             </td>
                             <td className="px-8 py-6">
                                <div className="text-sm font-black text-armoyu-text uppercase italic tracking-tighter group-hover:text-blue-500 transition-colors">{rule.name}</div>
                                <div className="text-[10px] text-armoyu-text-muted truncate max-w-xs">{rule.description}</div>
                             </td>
                             <td className="px-8 py-6 whitespace-nowrap">
                                <span className="text-[10px] font-black text-white bg-blue-600/20 border border-blue-600/30 px-3 py-1 rounded-lg italic">
                                   {rule.duration === 0 ? 'KALICI' : `${rule.duration} SA`}
                                </span>
                             </td>
                             <td className="px-8 py-6 whitespace-nowrap text-left text-left">
                                <div className={`text-[9px] font-black uppercase tracking-widest ${
                                   rule.severity === 'critical' ? 'text-red-500' :
                                   rule.severity === 'high' ? 'text-orange-500' :
                                   rule.severity === 'medium' ? 'text-yellow-500' :
                                   'text-blue-500'
                                }`}>
                                   {rule.severity}
                                </div>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-1.5 flex-wrap">
                                   {rule.restrictions.map(req => (
                                     <div key={req} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500" title={getRestrictionLabel(req)}>
                                        {req === 'CHAT_BAN' && <MessageSquareX size={12} />}
                                        {req === 'POST_BAN' && <FileX size={12} />}
                                        {req === 'LOGIN_BAN' && <Ban size={12} />}
                                        {req === 'PERMANENT_BAN' && <Lock size={12} />}
                                        {req === 'PROFILE_EDIT_BAN' && <Edit3 size={12} />}
                                     </div>
                                   ))}
                                </div>
                             </td>
                          </tr>
                        ))
                      ) : null }
                   </tbody>
                </table>
                {filteredRules.length === 0 && <NoResults />}
             </div>
          </div>
        )}

        {/* Legal Footer */}
        <div className="p-12 bg-blue-500/5 border border-blue-500/10 rounded-[44px] text-center space-y-6">
           <Shield className="text-blue-500 mx-auto" size={40} />
           <h3 className="text-2xl font-black text-armoyu-text uppercase italic tracking-tighter shadow-sm blur-none">SAYGI, SEVGİ VE GELİŞİM ODAKLI BİR TOPLULUK</h3>
           <p className="max-w-3xl mx-auto text-armoyu-text-muted text-sm font-medium leading-relaxed italic uppercase tracking-wider opacity-80">
              ARMOYU platformuna kayıt olan her birey, bu kuralları ve **TOPLULUK UYUM REHBERİ** sistemini kabul etmiş sayılır. 
              Saygı, topluluğumuzun temel taşıdır. Gelişiminiz ve huzurlu bir ortam için buradayız.
           </p>
           <div className="text-[10px] font-black text-blue-500/50 uppercase tracking-[0.4em] pt-4 italic">BİRLİKTE DAHA GÜÇLÜYÜZ © 2024 ARMOYU YÖNETİMİ</div>
        </div>

      </div>
    </div>
  );
}

function NoResults() {
  return (
    <div className="col-span-full py-20 text-center space-y-4 opacity-40">
       <Info size={48} className="mx-auto" />
       <h4 className="text-xl font-black uppercase italic tracking-widest">Eşleşen Kural Bulunamadı</h4>
       <p className="text-sm font-bold uppercase tracking-widest">Arama kriterlerini değiştirerek tekrar dene.</p>
    </div>
  );
}
