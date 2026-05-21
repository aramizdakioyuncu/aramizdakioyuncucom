'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Gamepad2, 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  Ghost,
  AlertTriangle
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-700 relative overflow-hidden">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />

      {/* Main Content */}
      <div className="space-y-8 max-w-2xl relative">
        
        {/* Funny Icon */}
        <div className="relative inline-block group">
           <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/40 transition-all duration-500" />
           <div className="relative p-8 bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] shadow-2xl animate-bounce-slow">
              <Ghost size={80} className="text-blue-500 group-hover:scale-110 transition-transform duration-500" />
           </div>
           <div className="absolute -top-2 -right-2 p-3 bg-red-500 text-white rounded-2xl shadow-lg animate-pulse">
              <AlertTriangle size={20} />
           </div>
        </div>

        {/* Error Code & Message */}
        <div className="space-y-4">
           <h1 className="text-9xl font-black text-armoyu-text tracking-tighter opacity-10 leading-none">404</h1>
           <h2 className="text-4xl font-black text-armoyu-text uppercase italic tracking-tight -mt-16">
              HARİTA <span className="text-blue-500">YÜKLENEMEDİ!</span>
           </h2>
           <p className="text-lg font-medium text-armoyu-text-muted leading-relaxed max-w-md mx-auto">
              Eyvah! Aradığın sayfa ya platformdan banlandı, ya da admin seni yanlışlıkla gerçeklikten kickledi. <br/>
              <span className="text-blue-500 font-black uppercase text-sm italic mt-2 block">Ciddi söylüyoruz, burada hiçbir quest yok.</span>
           </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
           <Link 
             href="/" 
             className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 group uppercase tracking-widest text-xs italic"
           >
              <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              ANA SAYFAYA RESPAWN OL
           </Link>
           
           <button 
             onClick={() => window.history.back()}
             className="flex items-center gap-3 px-8 py-4 bg-armoyu-card-bg border border-armoyu-card-border text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs italic"
           >
              <ArrowLeft size={18} />
              Önceki Checkpoint'e Dön
           </button>
        </div>

        {/* Console-like Footer */}
        <div className="pt-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl border border-armoyu-card-border font-mono text-[10px] text-armoyu-text-muted uppercase tracking-widest">
              <Search size={12} /> console.log("error: target_page_not_found")
           </div>
        </div>

      </div>

    </div>
  );
}
