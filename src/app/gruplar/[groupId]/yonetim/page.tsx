'use client';

import React, { useState } from 'react';
import { PageWidth, useAuth, groupList, userList, roles, GroupHeader, Group } from '@armoyu/ui';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GroupManagementPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const groupId = (params?.groupId as string)?.toLowerCase();
  const [activeTab, setActiveTab] = useState<'members' | 'settings' | 'roles'>('members');

  // Find group
  const groupRaw = groupList.find(g =>
    g.slug === groupId ||
    g.name.toLowerCase() === groupId ||
    g.name.toLowerCase().replace(/\s+/g, '-') === groupId
  );

  const initialGroup = groupRaw ? (groupRaw instanceof Group ? groupRaw : new Group(groupRaw)) : null;
  const [group, setGroup] = useState<Group | null>(initialGroup);

  // Authorization check
  const isOwner = group?.owner?.username === user?.username;
  const isMod = group?.moderators?.some(m => m.username === user?.username);
  const canManage = isOwner || isMod || user?.role?.id === 'admin';

  if (!group || !canManage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-armoyu-bg text-armoyu-text">
        <h2 className="text-2xl font-bold mb-4">Yetkisiz Erişim veya Grup Bulunamadı</h2>
        <Link href={`/gruplar/${groupId}`} className="text-blue-500 hover:underline">Gruba geri dön</Link>
      </div>
    );
  }

  // Management Handlers
  const handleKick = (username: string) => {
    if (!group) return;
    if (!confirm(`${username} kullanıcısını gruptan atmak istediğinize emin misiniz?`)) return;
    const updatedMembers = group.members.filter(m => m.username !== username);
    setGroup(new Group({
      ...group,
      members: updatedMembers,
      memberCount: updatedMembers.length
    }));
  };

  const handleRoleChange = (username: string) => {
    alert(`${username} kullanıcısının rolünü değiştirmek için yetki seviyesi seçin (Mock)`);
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Grup ayarları başarıyla güncellendi!');
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />

      {/* Reusable Group Header */}
      <GroupHeader group={group} isMember={true} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { id: 'members', label: 'ÜYE YÖNETİMİ', icon: 'users' },
            { id: 'roles', label: 'ROLLER & YETKİLER', icon: 'shield' },
            { id: 'settings', label: 'GRUP AYARLARI', icon: 'settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 p-5 rounded-3xl border transition-all ${activeTab === tab.id
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-armoyu-card-bg border-armoyu-card-border text-armoyu-text hover:bg-white/5'
                }`}
            >
              <div className={`p-2 rounded-xl ${activeTab === tab.id ? 'bg-white/20' : 'bg-black/5 dark:bg-white/5'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {tab.id === 'members' && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />}
                  {tab.id === 'members' && <circle cx="9" cy="7" r="4" />}
                  {tab.id === 'roles' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {tab.id === 'settings' && <circle cx="12" cy="12" r="3" />}
                  {tab.id === 'settings' && <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />}
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg min-h-[600px]">

            {activeTab === 'members' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">ÜYE LİSTESİ</h2>
                  <div className="px-5 py-2 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{group.members.length} TOPLAM ÜYE</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {group.members.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-white/5 transition-all group">
                      <div className="flex items-center gap-5">
                        <img src={member.avatar} className="w-14 h-14 rounded-2xl border-2 border-blue-500/10 shadow-lg object-cover" alt="Avatar" />
                        <div>
                          <p className="text-sm font-black text-armoyu-text uppercase tracking-tight italic group-hover:text-blue-500 transition-colors">{member.displayName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 uppercase tracking-widest">{member.role?.name || 'Üye'}</span>
                            <span className="text-[8px] font-bold text-armoyu-text-muted opacity-50">@{member.username}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRoleChange(member.username)}
                          className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-[10px] font-black text-armoyu-text rounded-xl hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all uppercase tracking-widest active:scale-95"
                        >
                          ROL DEĞİŞTİR
                        </button>
                        {isOwner && member.username !== user?.username && (
                          <button
                            onClick={() => handleKick(member.username)}
                            className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest active:scale-95"
                          >
                            GRUPTAN AT
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic mb-8">ROLLER VE YETKİLER</h2>
                <div className="p-20 text-center bg-black/5 dark:bg-white/5 rounded-3xl border-2 border-dashed border-armoyu-card-border opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic">Rol Düzenleme Sistemi Pek Yakında</p>
                  <p className="text-xs text-armoyu-text-muted mt-2 font-bold uppercase tracking-tight">Yetki seviyelerini buradan özelleştirebileceksiniz.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic mb-10">GRUP AYARLARI</h2>

                <form className="space-y-8" onSubmit={handleUpdateSettings}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-1">GRUP ADI</label>
                      <input
                        type="text"
                        defaultValue={group.name}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-armoyu-text font-bold focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-1">KATEGORİ</label>
                      <select className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-armoyu-text font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                        <option>{group.category}</option>
                        <option>E-Spor</option>
                        <option>Eğlence</option>
                        <option>Yazılım</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-1">GRUP AÇIKLAMASI</label>
                    <textarea
                      rows={5}
                      defaultValue={group.description}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl px-6 py-4 text-sm text-armoyu-text font-bold focus:outline-none focus:border-blue-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                    <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5">
                      <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-4">GRUP LOGOSU</p>
                      <div className="flex items-center gap-6">
                        <img src={group.logo} className="w-20 h-20 rounded-2xl border border-white/10 shadow-lg object-cover" />
                        <button type="button" className="px-5 py-2.5 bg-blue-600/10 text-blue-500 text-[10px] font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest">DEĞİŞTİR</button>
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5">
                      <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-4">GRUP BANNER</p>
                      <div className="flex items-center gap-6">
                        <img src={group.banner} className="w-20 h-12 rounded-xl border border-white/10 shadow-lg object-cover" />
                        <button type="button" className="px-5 py-2.5 bg-blue-600/10 text-blue-500 text-[10px] font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest">DEĞİŞTİR</button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 flex justify-end">
                    <button type="submit" className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">DEĞİŞİKLİKLERİ KAYDET</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
