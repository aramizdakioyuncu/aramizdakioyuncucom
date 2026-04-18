'use client';

import React, { useState } from 'react';
import { PageWidth, GroupApplicationModal as ApplicationModal, roles, YoutubeIcon, TwitterIcon, LinkedinIcon } from '@armoyu/ui';
import { CheckCircle2, Star, Sparkles, PlusCircle } from 'lucide-react';

interface TeamMember {
  displayName: string;
  role: any;
  avatar: string;
  username: string;
  verified?: boolean;
}

interface TeamCategory {
  category: string;
  color: string;
  accent: string;
  glow: string;
  members: TeamMember[];
}

const TEAM_DATA: TeamCategory[] = [
  {
    category: 'KURUCULAR',
    color: 'border-red-500/20',
    accent: 'text-red-500',
    glow: 'from-red-500/10',
    members: [
      { displayName: 'Berkay Tikenoğlu', role: roles.admin, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', username: 'berkaytikenoglu', verified: true },
      { displayName: 'MythX', role: roles.memberMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', username: 'mythx', verified: true },
      { displayName: 'Barış Müftüoğlu', role: roles.discipline, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baris', username: 'barismuftuoglu', verified: true },
      { displayName: 'Bey Ev', role: roles.eventMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah', username: 'beyev', verified: true }
    ]
  },
  {
    category: 'SORUMLULAR',
    color: 'border-blue-500/20',
    accent: 'text-blue-500',
    glow: 'from-blue-500/10',
    members: [
      { displayName: 'Yılmaz Akşahin', role: roles.assettoOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yilmaz', username: 'yilmazaksahin' },
      { displayName: 'Orkun Atılgan', role: roles.mcOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orkun', username: 'orkunatilgan' },
      { displayName: 'Furkan Sarıdiken', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Furkan', username: 'furkansaridiken' },
      { displayName: 'Burakcan TOPAL', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burakcan', username: 'burakcantopal' }
    ]
  },
  {
    category: 'YAZILIM VE GELİŞTİRME',
    color: 'border-emerald-500/20',
    accent: 'text-emerald-500',
    glow: 'from-emerald-500/10',
    members: [
      { displayName: 'Burak Erel', role: roles.gameDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burak', username: 'burakerel' },
      { displayName: 'Engin Kuşkovan', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Engin', username: 'enginkuskovan' },
      { displayName: 'Nariman Rustamli', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nariman', username: 'narimanrustamli' },
      { displayName: 'Ersan Güvenç', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ersan', username: 'ersanguvenc' },
      { displayName: 'Oğuzhan Seslikaya', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oguzhan', username: 'oguzhanseslikaya' },
      { displayName: 'Ömer Efe Dikici', role: roles.frontendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Efe', username: 'omerefedikici' },
      { displayName: 'Ömer Faruk Sayın', role: roles.backendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faruk', username: 'omerfaruksayin' },
      { displayName: 'Emre Sandal', role: roles.fullstackDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emre', username: 'emresandal' }
    ]
  },
  {
    category: 'YAYINCILAR',
    color: 'border-purple-500/20',
    accent: 'text-purple-500',
    glow: 'from-purple-500/10',
    members: [
      { displayName: 'Metehan Çakır', role: roles.streamerContent, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Metehan', username: 'metehancakir' },
      { displayName: 'Bartu Başaran', role: roles.streamerGaming, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bartu', username: 'bartubasaran' },
      { displayName: 'Erhan', role: roles.streamer, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erhan', username: 'erhan' }
    ]
  },
  {
    category: 'E-SPOR LİSANSLI OYUNCULAR',
    color: 'border-orange-500/20',
    accent: 'text-orange-500',
    glow: 'from-orange-500/10',
    members: [
      { displayName: 'Gabriel Eren Gümüşdal', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', username: 'gabrieleren' }
    ]
  }
];

export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <PageWidth width="max-w-[1440px]" />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedRole=""
      />

      <div className="mb-24 pt-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="flex items-center justify-center gap-3 mb-6">
           <Star className="text-amber-500 fill-amber-500" size={16} />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">PROFESSIONAL CREW</span>
           <Star className="text-amber-500 fill-amber-500" size={16} />
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-armoyu-text mb-8 uppercase tracking-tighter italic leading-none">
          EKİBİMİZLE <br/> <span className="text-blue-600">TANIŞIN</span>
        </h1>
        <p className="text-armoyu-text-muted text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-70">
          ARMOYU topluluğunu geleceğe taşıyan, her biri kendi alanında uzman ve tutkulu profesyonellerden oluşan dev kadromuz.
        </p>
      </div>

      <div className="space-y-32">
        {TEAM_DATA.map((group, gIdx) => (
          <div key={gIdx} className="space-y-12">
            <div className="flex items-center justify-between pb-6 border-b border-armoyu-card-border overflow-hidden relative">
               <div className={`absolute bottom-0 left-0 h-[2px] w-48 bg-gradient-to-r ${group.accent.replace('text', 'from')} to-transparent`} />
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center ${group.accent}`}>
                     <Sparkles size={24} />
                  </div>
                  <h2 className={`text-3xl font-black uppercase tracking-tighter italic ${group.accent}`}>{group.category}</h2>
               </div>
               <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{group.members.length} ÜYE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {group.members.map((member, mIdx) => (
                <div key={mIdx} className={`group relative glass-panel p-8 rounded-[48px] border-2 bg-armoyu-card-bg hover:shadow-2xl transition-all duration-700 text-center ${group.color} hover:border-blue-500/50 overflow-hidden`}>
                  {/* Hover Glow Effect */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${group.glow} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="relative mb-8 inline-block">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-700 scale-150" />
                    <div className="relative z-10">
                      <img
                        src={member.avatar}
                        alt={member.displayName}
                        className="w-24 h-24 rounded-[32px] border-4 border-armoyu-bg bg-white/5 object-cover shadow-2xl group-hover:scale-110 transition-transform duration-700"
                      />
                      {member.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-xl p-1.5 border-4 border-armoyu-card-bg shadow-lg z-20">
                          <CheckCircle2 size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 mb-8">
                    <h3 className="text-lg font-black text-armoyu-text mb-1 uppercase tracking-tight line-clamp-1 italic group-hover:text-blue-500 transition-colors">{member.displayName}</h3>
                    <div className={`text-[9px] font-black uppercase tracking-[0.2em] py-1 px-3 rounded-full bg-black/5 dark:bg-white/5 border border-white/5 inline-block ${group.accent}`}>
                      {member.role?.name}
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 relative z-10">
                    <button className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300 group/btn">
                       <YoutubeIcon size={16} strokeWidth={2.5} />
                    </button>
                    <button className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-sky-500 hover:text-white hover:-translate-y-1 transition-all duration-300 group/btn">
                       <TwitterIcon size={16} strokeWidth={2.5} />
                    </button>
                    <button className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-blue-700 hover:text-white hover:-translate-y-1 transition-all duration-300 group/btn">
                       <LinkedinIcon size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Profile Link Button */}
                  <button className="mt-8 w-full py-4 bg-armoyu-text dark:bg-white text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-[1.02] active:scale-95">
                    PROFİLİ GÖRÜNTÜLE
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Join the team section - Modernized */}
      <div className="mt-40 relative overflow-hidden rounded-[80px] border border-blue-500/20 bg-blue-600/[0.03] p-16 md:p-24 text-center group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-blue-600/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 text-blue-600 group-hover:scale-110 transition-transform duration-700">
             <PlusCircle size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic leading-none">
            SEN DE BU EKİBİN <span className="text-blue-600">BİR PARÇASI OL!</span>
          </h2>
          <p className="text-armoyu-text-muted text-xl mb-12 font-medium leading-relaxed opacity-70">
            ARMOYU ailesi sürekli büyüyor. Kendi yeteneklerine uygun bir pozisyon bul ve Türkiye&apos;nin en büyük oyun topluluğunu birlikte inşa edelim.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group/apply relative px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-3xl shadow-2xl shadow-blue-500/40 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10">BAŞVURU SÜRECİNİ BAŞLAT</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/apply:animate-shimmer" />
          </button>
        </div>
      </div>
    </div>
  );
}
