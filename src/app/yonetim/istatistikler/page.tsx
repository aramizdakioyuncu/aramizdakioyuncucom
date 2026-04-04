'use client';

import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCcw,
  UserCheck,
  Globe,
  PieChart,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { mockGlobalStats } from '@/lib/constants/seedData';
import { PlatformStats } from '@/models';

// --- SVG Chart Components ---

// Simple Line Chart (SVG)
const LineChart = ({ data, color }: { data: number[], color: string }) => {
  const width = 100;
  const height = 40;
  const padding = 5;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12 overflow-visible">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor={color} stopOpacity="0.4" />
           <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        d={`M 0 ${height} L ${points} L ${width} ${height} Z`} 
        fill={`url(#grad-${color})`} 
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

// Simple Donut Chart (SVG)
const DonutChart = ({ percent, label, subLabel, color }: { percent: number, label: string, subLabel: string, color: string }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-40 h-40 transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-black/5 dark:text-white/5"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="text-2xl font-black text-armoyu-text">%{percent}</span>
        <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-tighter">{label}</span>
      </div>
    </div>
  );
};

export default function StatisticsPage() {
  const statsProcessor = useMemo(() => new PlatformStats(mockGlobalStats), []);
  const { malePercent, femalePercent } = statsProcessor.getGenderDistribution();
  const visitorTrend = statsProcessor.getVisitorTrend();
  const activityData = statsProcessor.getActivityBreakdown();

  const primaryStats = [
    { name: 'Aktif Kullanıcı (24s)', value: statsProcessor.activeUsers24h.toLocaleString('tr-TR'), growth: statsProcessor.getGrowthRate('activeUsers24h'), label: 'Aktiflik', icon: UserCheck, color: '#3b82f6' },
    { name: 'Aylık Ziyaretçi', value: statsProcessor.monthlyVisitors.toLocaleString('tr-TR'), growth: statsProcessor.getGrowthRate('monthlyVisitors'), label: 'Trafik', icon: Eye, color: '#10b981' },
    { name: 'Toplam Oyuncu', value: statsProcessor.totalPlayers.toLocaleString('tr-TR'), growth: statsProcessor.getGrowthRate('totalPlayers'), label: 'Kayıtlı', icon: Users, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-armoyu-text uppercase italic">Platform <span className="text-blue-500">Analitiği</span></h1>
           <p className="text-armoyu-text-muted font-medium text-sm">Gerçek zamanlı verilerle ARMOYU topluluğunu analiz et.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 border border-armoyu-header-border text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/10 dark:hover:bg-white/10 font-bold rounded-2xl transition-all active:scale-95 whitespace-nowrap">
           <RefreshCcw size={18} /> Verileri Güncelle
        </button>
      </div>

      {/* Main Growth Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {primaryStats.map((stat) => (
          <div key={stat.name} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 hover:border-blue-500/20 transition-all group relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5" style={{ color: stat.color }}>
                   <stat.icon size={24} />
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-1 text-emerald-500 font-black text-xs">
                      <TrendingUp size={14} /> +{stat.growth}%
                   </div>
                   <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none mt-1">{stat.label} Artışı</div>
                </div>
             </div>
             <div className="mb-4">
                <div className="text-4xl font-black text-armoyu-text tracking-tight">{stat.value}</div>
                <div className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">{stat.name}</div>
             </div>
             <LineChart data={visitorTrend} color={stat.color} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Donut Charts Row */}
         <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[36px] p-8">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                     <PieChart size={20} />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-sm text-armoyu-text italic">Oyuncu Demografisi</h3>
               </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="flex flex-col items-center">
                  <DonutChart percent={malePercent} label="ERKEK" subLabel="Oyuncular" color="#3b82f6" />
                  <div className="mt-4 text-center">
                     <div className="text-sm font-black text-armoyu-text italic">%{malePercent} Erkek</div>
                     <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{statsProcessor.malePlayers.toLocaleString('tr-TR')} Kişi</div>
                  </div>
               </div>
               <div className="flex flex-col items-center">
                  <DonutChart percent={femalePercent} label="KADIN" subLabel="Oyuncular" color="#ec4899" />
                  <div className="mt-4 text-center">
                     <div className="text-sm font-black text-armoyu-text italic">%{femalePercent} Kadın</div>
                     <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{statsProcessor.femalePlayers.toLocaleString('tr-TR')} Kişi</div>
                  </div>
               </div>
            </div>
         </div>

         {/* Activity Bar Chart Row */}
         <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[36px] p-8">
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                     <BarChart3 size={20} />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-sm text-armoyu-text italic">Aktivite Dağılımı</h3>
               </div>
            </div>

            <div className="space-y-6">
               {activityData.map((item) => {
                  const maxVal = Math.max(...activityData.map(d => d.value));
                  const progress = (item.value / maxVal) * 100;
                  
                  return (
                    <div key={item.label} className="space-y-2 group">
                       <div className="flex justify-between items-end">
                          <span className="text-[11px] font-black text-armoyu-text uppercase tracking-widest">{item.label}</span>
                          <span className="text-sm font-black text-armoyu-text">{item.value.toLocaleString('tr-TR')} Kayıt</span>
                       </div>
                       <div className="h-3 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden border border-armoyu-card-border">
                          <div 
                             className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110" 
                             style={{ width: `${progress}%`, backgroundColor: item.color }} 
                          />
                       </div>
                    </div>
                  );
               })}
            </div>

            <div className="mt-12 p-4 bg-black/5 dark:bg-white/5 rounded-[24px] border border-dashed border-armoyu-card-border">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                     <TrendingUp size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-armoyu-text leading-tight">En Çok Etkileşim Forum'da!</p>
                     <p className="text-[10px] font-medium text-armoyu-text-muted">Son 30 gün verilerine göre forum tartışmaları %42 daha fazla trafik çekiyor.</p>
                  </div>
               </div>
            </div>
         </div>

      </div>

      {/* Networking Reach Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
               <Globe size={24} />
            </div>
            <div>
               <div className="text-lg font-black text-armoyu-text">{statsProcessor.totalGuilds}</div>
               <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">Kayıtlı Grup</div>
            </div>
         </div>
         <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500">
               <Calendar size={24} />
            </div>
            <div>
               <div className="text-lg font-black text-armoyu-text">{statsProcessor.totalNews}</div>
               <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">Haber Yayınlandı</div>
            </div>
         </div>
         <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] flex items-center gap-4 overflow-hidden group">
            <div className="text-right flex-1 min-w-0">
               <div className="text-lg font-black text-armoyu-text italic truncate">Sınıf Yönetimi</div>
               <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center justify-end gap-1">
                  İşlemleri Gör <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
            <ArrowUpRight size={20} className="text-blue-500 opacity-20" />
         </div>
         <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
               <Users size={24} />
            </div>
            <div>
               <div className="text-lg font-black text-armoyu-text">{statsProcessor.totalMatchesPlayed.toLocaleString('tr-TR')}</div>
               <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest text-left">Oynanan Maç</div>
            </div>
         </div>
      </div>

    </div>
  );
}
