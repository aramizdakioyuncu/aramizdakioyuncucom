'use client';

import React from 'react';
import { PageWidth, MOCK_PROJECTS } from '@armoyu/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ArrowLeft, Layers, User, Calendar, Activity } from 'lucide-react';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const project = MOCK_PROJECTS.find(p => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  // Related projects (just first 2 that are not the current one)
  const relatedProjects = MOCK_PROJECTS.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Navigation */}
      <div className="mb-8">
         <Link href="/projeler" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-armoyu-text-muted hover:text-blue-500 transition-colors">
            <ArrowLeft size={16} /> TÜM PROJELERE DÖN
         </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full aspect-[21/9] min-h-[400px] mb-16 rounded-[40px] overflow-hidden shadow-2xl border border-armoyu-card-border">
         <div className="absolute inset-0">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
         </div>
         
         <div className="absolute top-8 right-8 z-10 flex gap-3">
             <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl backdrop-blur-md shadow-lg ${
               project.status === 'Tamamlandı' ? 'bg-emerald-500/90 text-white border border-emerald-400/50' : 
               project.status === 'Geliştiriliyor' ? 'bg-blue-500/90 text-white border border-blue-400/50' : 
               'bg-orange-500/90 text-white border border-orange-400/50'
             }`}>
               Durum: {project.status}
             </span>
         </div>

         <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6 uppercase drop-shadow-lg">
               {project.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                  {project.group && (
                     <>
                        <img src={project.group.logo} alt={project.group.name} className="w-10 h-10 rounded-lg border-2 border-white/20 object-cover bg-black/20" />
                        <div>
                           <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">GELİŞTİRİCİ GRUP</p>
                           <p className="text-sm font-black text-white">{project.group.name}</p>
                        </div>
                     </>
                  )}
                  
                  {project.group && project.authors && project.authors.length > 0 && (
                     <div className="w-[1px] h-8 bg-white/10 mx-2 hidden md:block"></div>
                  )}

                  {project.authors && project.authors.length > 0 && (
                     <>
                        <div className="flex -space-x-3">
                           {project.authors.map((author, i) => (
                             <img key={i} src={author.user.avatar} alt={author.user.displayName} title={`${author.user.displayName} - ${author.role}`} className="w-10 h-10 rounded-full border-2 border-white/20 bg-black/20" />
                           ))}
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">GELİŞTİRİCİLER</p>
                           <p className="text-sm font-black text-white">{project.authors.map(a => a.user.displayName).join(', ')}</p>
                        </div>
                     </>
                  )}
               </div>

               <div className="flex items-center gap-4">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/30 active:scale-95 transition-all">
                       <ExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> CANLI DEMO
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group px-6 py-3 bg-white hover:bg-gray-100 text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GITHUB
                    </a>
                  )}
               </div>
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
         
         {/* Main Content */}
         <div className="lg:w-2/3">
            <div className="glass-panel p-8 md:p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg mb-12 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
               <h2 className="text-2xl font-black text-armoyu-text mb-6 uppercase tracking-tight flex items-center gap-3">
                  <Activity className="text-blue-500" /> PROJE DETAYLARI
               </h2>
               <p className="text-base text-armoyu-text-muted leading-relaxed font-medium">
                  {project.description}
               </p>
               {/* Varsayılan sahte bir metin ekleyelim proje sayfası dolu görünsün */}
               <p className="text-base text-armoyu-text-muted leading-relaxed font-medium mt-4">
                  Bu proje ARMOYU topluluğunun ihtiyaçları doğrultusunda özel olarak tasarlanmış ve optimize edilmiştir. 
                  En güncel teknolojiler kullanılarak geliştirilen altyapı sayesinde yüksek performans, maksimum güvenlik 
                  ve kesintisiz bir kullanıcı deneyimi sunmayı hedefler. Gelecek vizyonunda birçok yeni modül ve 
                  platform entegrasyonu barındırmaktadır.
               </p>
            </div>

            <h3 className="text-xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic">Benzer Projeler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {relatedProjects.map(rel => (
                 <Link href={`/projeler/${rel.id}`} key={rel.id} className="group glass-panel rounded-3xl overflow-hidden border border-armoyu-card-border hover:border-blue-500/30 transition-all">
                    <div className="aspect-video relative overflow-hidden">
                       <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                       <h4 className="text-sm font-black text-armoyu-text uppercase truncate">{rel.name}</h4>
                       <p className="text-xs text-armoyu-text-muted mt-1 truncate">
                          {[
                             rel.group?.name, 
                             ...(rel.authors?.map(a => a.user.displayName) || [])
                          ].filter(Boolean).join(', ')}
                       </p>
                    </div>
                 </Link>
               ))}
            </div>
         </div>

         {/* Sidebar */}
         <div className="lg:w-1/3 space-y-8">
            
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <h3 className="text-xs font-black text-blue-500 mb-6 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={16} /> KULLANILAN TEKNOLOJİLER
               </h3>
               <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <div key={i} className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-xl text-xs font-black text-armoyu-text flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-default">
                       {tech}
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl space-y-6">
               <div className="flex items-center gap-4 border-b border-armoyu-card-border pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                     <User size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-0.5">YETKİLİ DEPARTMAN</p>
                     <p className="text-sm font-black text-armoyu-text uppercase">ARMOYU YAZILIM EKİBİ</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                     <Calendar size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-0.5">YAYIN TARİHİ</p>
                     <p className="text-sm font-black text-armoyu-text uppercase">Mayıs 2024</p>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
