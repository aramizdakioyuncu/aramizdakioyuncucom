'use client';

import React, { useState } from 'react';
import { PageWidth } from '@/components/shared/PageWidth';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/lib/constants/seedData';
import { LayoutGrid, List, Search } from 'lucide-react';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Geliştiriliyor' | 'Tamamlandı'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    // 1. Durum filtreleme (Status)
    if (filterStatus !== 'all' && project.status !== filterStatus) return false;
    
    // 2. Arama filtreleme (Search)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (!project.name.toLowerCase().includes(q) && !project.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic drop-shadow-lg">ARMOYU PROJELERİ</h1>
            <p className="text-armoyu-text-muted text-lg font-medium opacity-80 max-w-2xl">
              Topluluk tarafından veya yönetimce geliştirilen tüm açık kaynak ve kapalı projelere buradan göz atabilirsiniz. İnceleyin, ilham alın!
            </p>
         </div>
      </div>

      {/* Filter and View Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-armoyu-card-border">
         <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap transition-all ${filterStatus === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-blue-500'}`}
              >
                TÜM PROJELER
              </button>
              <button 
                onClick={() => setFilterStatus('Geliştiriliyor')}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap transition-all ${filterStatus === 'Geliştiriliyor' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-blue-500'}`}
              >
                GELİŞTİRİLENLER
              </button>
              <button 
                onClick={() => setFilterStatus('Tamamlandı')}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap transition-all ${filterStatus === 'Tamamlandı' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-blue-500'}`}
              >
                TAMAMLANANLAR
              </button>
           </div>
           
           <div className="relative w-full md:w-auto md:min-w-[300px]">
             <input 
               type="text" 
               placeholder="Proje adı veya açıklama ara..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold text-armoyu-text placeholder:text-armoyu-text-muted placeholder:font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
             />
             <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
           </div>
         </div>

         {/* View Toggles */}
         <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-black text-blue-500 shadow-sm' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-black text-blue-500 shadow-sm' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
            >
              <List size={20} />
            </button>
         </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
         <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mx-auto mb-4">
               <Search size={24} />
            </div>
            <h3 className="text-xl font-black text-armoyu-text mb-2 tracking-tighter uppercase">Sonuç Bulunamadı</h3>
            <p className="text-sm font-medium text-armoyu-text-muted">Arama kriterlerinize uyan bir proje yok.</p>
         </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {filteredProjects.map((project) => (
             <Link href={`/projeler/${project.id}`} key={project.id} className="group glass-panel rounded-[30px] overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                   <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   
                   <div className="absolute top-4 right-4 z-20">
                     <span className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-xl backdrop-blur-md shadow-lg ${
                       project.status === 'Tamamlandı' ? 'bg-emerald-500/90 text-white' : 
                       project.status === 'Geliştiriliyor' ? 'bg-blue-500/90 text-white' : 
                       'bg-orange-500/90 text-white'
                     }`}>
                       {project.status}
                     </span>
                   </div>
                </div>
                
                <div className="p-6">
                   <div className="flex gap-2 flex-wrap mb-4">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[9px] font-bold text-armoyu-text-muted bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">{tech}</span>
                      ))}
                      {project.techStack.length > 3 && <span className="text-[9px] font-bold text-armoyu-text-muted bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">+{project.techStack.length - 3}</span>}
                   </div>
                   
                   <h3 className="text-xl font-black text-armoyu-text mb-2 tracking-tight group-hover:text-blue-500 transition-colors uppercase">{project.name}</h3>
                   <p className="text-xs text-armoyu-text-muted font-medium line-clamp-2 leading-relaxed mb-6">{project.description}</p>
                   
                   <div className="flex flex-col gap-3 pt-4 border-t border-armoyu-card-border/50">
                      {project.group && (
                         <div className="flex items-center gap-3">
                           <img src={project.group.logo} alt={project.group.name} className="w-8 h-8 rounded-lg border border-armoyu-card-border bg-black/5 dark:bg-white/5 object-cover" />
                           <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-armoyu-text-muted">Geliştirici Grup</p>
                              <p className="text-xs font-black text-armoyu-text">{project.group.name}</p>
                           </div>
                         </div>
                      )}
                      
                      {project.authors && project.authors.length > 0 && (
                         <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-armoyu-card-border/30">
                           <p className="text-[9px] font-bold uppercase tracking-widest text-armoyu-text-muted w-full">Geliştiriciler</p>
                           <div className="flex -space-x-2 mt-1">
                              {project.authors.map((author, i) => (
                                <img key={i} src={author.user.avatar} alt={author.user.displayName} title={`${author.user.displayName} - ${author.role}`} className="w-8 h-8 rounded-full border border-armoyu-card-border bg-white" />
                              ))}
                           </div>
                         </div>
                      )}
                   </div>
                </div>
             </Link>
           ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
           {filteredProjects.map((project) => (
             <Link href={`/projeler/${project.id}`} key={project.id} className="group flex flex-col md:flex-row gap-6 p-4 glass-panel rounded-[30px] border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="relative w-full md:w-64 h-48 md:h-auto rounded-[20px] overflow-hidden shrink-0">
                   <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute top-3 left-3 z-20">
                     <span className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-xl backdrop-blur-md shadow-lg ${
                       project.status === 'Tamamlandı' ? 'bg-emerald-500/90 text-white' : 
                       project.status === 'Geliştiriliyor' ? 'bg-blue-500/90 text-white' : 
                       'bg-orange-500/90 text-white'
                     }`}>
                       {project.status}
                     </span>
                   </div>
                </div>
                
                <div className="flex-1 py-2 pr-4 flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-black text-armoyu-text mb-2 tracking-tight group-hover:text-blue-500 transition-colors uppercase">{project.name}</h3>
                     <p className="text-sm text-armoyu-text-muted font-medium line-clamp-2 md:line-clamp-none leading-relaxed mb-6 max-w-3xl">{project.description}</p>
                   </div>
                   
                   <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-armoyu-card-border/50">
                      <div className="flex gap-2 flex-wrap">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="text-[10px] font-bold text-armoyu-text bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {project.group && (
                           <div className="flex items-center gap-3">
                              <div className="text-right">
                                 <p className="text-[9px] font-bold uppercase tracking-widest text-armoyu-text-muted">Geliştirici Grup</p>
                                 <p className="text-sm font-black text-armoyu-text">{project.group.name}</p>
                              </div>
                              <img src={project.group.logo} alt={project.group.name} className="w-10 h-10 rounded-lg border-2 border-blue-500/20 object-cover bg-black/5 dark:bg-white/5" />
                           </div>
                        )}
                        
                        {project.authors && project.authors.length > 0 && (
                           <div className="flex items-center gap-3 border-l border-armoyu-card-border/50 pl-6">
                              <div className="text-right">
                                 <p className="text-[9px] font-bold uppercase tracking-widest text-armoyu-text-muted">Geliştiriciler</p>
                                 <p className="text-sm font-black text-armoyu-text">
                                    {project.authors.map(a => a.user.displayName).join(', ')}
                                 </p>
                              </div>
                              <div className="flex -space-x-3">
                                 {project.authors.map((author, i) => (
                                   <img key={i} src={author.user.avatar} alt={author.user.displayName} title={`${author.user.displayName} - ${author.role}`} className="w-10 h-10 rounded-full border-2 border-blue-500/20 bg-white shadow-sm" />
                                 ))}
                              </div>
                           </div>
                        )}
                      </div>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      )}

    </div>
  );
}
