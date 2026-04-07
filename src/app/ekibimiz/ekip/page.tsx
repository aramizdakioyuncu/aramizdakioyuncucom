'use client';

import React, { useState } from 'react';
import { PageWidth, GroupApplicationModal as ApplicationModal, roles } from '@armoyu/ui';
import { User } from '@armoyu/core';

interface TeamCategory {
  category: string;
  color: string;
  accent: string;
  members: User[];
}

const TEAM_DATA: TeamCategory[] = [
  {
    category: 'KURUCULAR',
    color: 'border-red-500',
    accent: 'text-red-500',
    members: [
      new User({ displayName: 'Berkay Tikenoğlu', role: roles.admin, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', username: 'berkaytikenoglu', verified: true }),
      new User({ displayName: 'MythX', role: roles.memberMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', username: 'mythx', verified: true }),
      new User({ displayName: 'Barış Müftüoğlu', role: roles.discipline, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baris', username: 'barismuftuoglu', verified: true }),
      new User({ displayName: 'Bey Ev', role: roles.eventMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah', username: 'beyev', verified: true })
    ]
  },
  {
    category: 'SORUMLULAR',
    color: 'border-blue-500',
    accent: 'text-blue-500',
    members: [
      new User({ displayName: 'Yılmaz Akşahin', role: roles.assettoOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yilmaz', username: 'yilmazaksahin' }),
      new User({ displayName: 'Orkun Atılgan', role: roles.mcOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orkun', username: 'orkunatilgan' }),
      new User({ displayName: 'Furkan Sarıdiken', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Furkan', username: 'furkansaridiken' }),
      new User({ displayName: 'Burakcan TOPAL', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burakcan', username: 'burakcantopal' })
    ]
  },
  {
    category: 'YAZILIM VE GELİŞTİRME',
    color: 'border-emerald-500',
    accent: 'text-emerald-500',
    members: [
      new User({ displayName: 'Burak Erel', role: roles.gameDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burak', username: 'burakerel' }),
      new User({ displayName: 'Engin Kuşkovan', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Engin', username: 'enginkuskovan' }),
      new User({ displayName: 'Nariman Rustamli', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nariman', username: 'narimanrustamli' }),
      new User({ displayName: 'Ersan Güvenç', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ersan', username: 'ersanguvenc' }),
      new User({ displayName: 'Oğuzhan Seslikaya', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oguzhan', username: 'oguzhanseslikaya' }),
      new User({ displayName: 'Ömer Efe Dikici', role: roles.frontendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Efe', username: 'omerefedikici' }),
      new User({ displayName: 'Ömer Faruk Sayın', role: roles.backendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faruk', username: 'omerfaruksayin' }),
      new User({ displayName: 'Emre Sandal', role: roles.fullstackDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emre', username: 'emresandal' })
    ]
  },
  {
    category: 'YAYINCILAR',
    color: 'border-purple-500',
    accent: 'text-purple-500',
    members: [
      new User({ displayName: 'Metehan Çakır', role: roles.streamerContent, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Metehan', username: 'metehancakir' }),
      new User({ displayName: 'Bartu Başaran', role: roles.streamerGaming, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bartu', username: 'bartubasaran' }),
      new User({ displayName: 'Erhan', role: roles.streamer, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erhan', username: 'erhan' })
    ]
  },
  {
    category: 'E-SPOR LİSANSLI OYUNCULAR',
    color: 'border-orange-500',
    accent: 'text-orange-500',
    members: [
      new User({ displayName: 'Gabriel Eren Gümüşdal', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', username: 'gabrieleren' })
    ]
  }
];

export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedRole=""
      />

      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-6 uppercase tracking-tighter italic">ÇALIŞMA EKİBİMİZ</h1>
        <p className="text-armoyu-text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          ARMOYU&apos;yu daha ileriye taşımak için hiyerarşik bir düzende, profesyonelce çalışan ekibimizle tanışın.
        </p>
      </div>

      <div className="space-y-20">
        {TEAM_DATA.map((group, gIdx) => (
          <div key={gIdx} className="space-y-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-12 bg-armoyu-card-border" />
              <h2 className={`text-2xl font-black uppercase tracking-[0.2em] ${group.accent}`}>{group.category}</h2>
              <div className="h-[2px] w-12 bg-armoyu-card-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {group.members.map((member, mIdx) => (
                <div key={mIdx} className={`group glass-panel p-8 rounded-[40px] border-2 bg-armoyu-card-bg hover:shadow-2xl transition-all duration-500 text-center ${group.color} border-opacity-20 hover:border-opacity-100`}>
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={member.avatar}
                      alt={member.displayName}
                      className="w-20 h-20 rounded-full border-4 border-armoyu-bg bg-white/5 relative z-10 mx-auto"
                    />
                  </div>

                  <h3 className="text-sm font-black text-armoyu-text mb-1 uppercase tracking-tight line-clamp-1">{member.displayName}</h3>
                  <span className={`text-[8px] font-black uppercase tracking-widest block mb-6 opacity-80 ${group.accent}`}>{member.role?.name}</span>

                  <div className="flex justify-center gap-2">
                    <button className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></button>
                    <button className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/5 border border-white/5 flex items-center justify-center hover:bg-sky-400 hover:text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></button>
                    <button className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Join the team section */}
      <div className="mt-24 glass-panel p-10 md:p-16 rounded-[60px] border border-blue-500/20 bg-blue-600/5 text-center">
        <h2 className="text-3xl font-black text-armoyu-text mb-4">Sen de Bu Ekibin Bir Parçası Ol!</h2>
        <p className="text-armoyu-text-muted text-lg mb-8 max-w-xl mx-auto">Yeteneğine uygun bir pozisyon seç ve ARMOYU ailesine hemen katıl.</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
        >
          POZİSYONLARI İNCELE VE BAŞVUR
        </button>
      </div>
    </div>
  );
}

