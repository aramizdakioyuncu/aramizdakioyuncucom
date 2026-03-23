'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useChat } from '@/context/ChatContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: 'Gruplar',
    href: '/gruplar',
  },
  { name: 'Galeriler', href: '/galeriler' },
  { name: 'Haberler', href: '/haberler' },
  { name: 'Çekilişler', href: '/cekilisler' },
  { name: 'Projeler', href: '#' },
  { 
    name: 'Ekibimiz', 
    href: '#',
    submenu: [
      { name: 'Çalışma Ekibi', href: '/ekibimiz/ekip' },
      { name: 'İnsan Kaynakları', href: '/ekibimiz/ik' },
      { name: 'Kurallarımız', href: '/ekibimiz/kurallar' },
      { name: 'Hakkımızda', href: '/ekibimiz/hakkimizda' },
      { name: 'Gizlilik Politikası', href: '/ekibimiz/gizlilik' }
    ]
  },
  { name: 'Forum', href: '/forum' },
  { name: 'Modlar', href: '/modlar' },
  { name: 'Etkinlikler', href: '/etkinlikler' },
  { name: 'Mağaza', href: '/magaza' },
];

export function Header() {
  const { user, logout, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isGroupsSubmenuOpen, setIsGroupsSubmenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openChat } = useChat();
  const router = useRouter();

  const goToMyProfile = () => {
    if (user?.username) {
      const params = new URLSearchParams();
      if (user.displayName) params.set('name', user.displayName);
      if (user.avatar) params.set('avatar', user.avatar);

      router.push(`/oyuncular/${user.username}?${params.toString()}`);
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-armoyu-header-border bg-armoyu-header-bg transition-colors duration-500">
        <div className="flex items-center justify-between px-4 md:px-8 h-16 w-full max-w-[100vw]">

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-armoyu-text hover:text-blue-500 transition-colors border border-transparent hover:border-armoyu-header-border rounded-lg bg-transparent hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(true)}
            title="Menü"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pr-4 md:pr-8 md:border-r border-armoyu-header-border ml-auto md:ml-0">
            <Link href="/" className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-white dark:to-gray-300 hover:opacity-80 transition-opacity">
              ARMOYU
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2 mx-4 md:mx-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 xl:px-4 py-2 rounded-xl text-sm font-bold text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  {item.name}
                  {item.submenu && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  )}
                </Link>

                {/* Dropdown Menu (Submenu) */}
                {item.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden w-48 p-1.5 flex flex-col gap-0.5">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-4 py-2.5 rounded-xl text-sm font-bold text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors block"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex-shrink-0 pl-4 md:pl-8 border-l border-armoyu-header-border flex items-center h-full ml-auto">
            {user ? (
               <button
                 onClick={() => setIsUserMenuOpen(true)}
                 className="flex items-center gap-3 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-armoyu-header-border focus:outline-none"
                 title="Profilim"
               >
                 <img
                   src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"}
                   alt="Avatar"
                   className="w-8 h-8 rounded-full border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] object-cover bg-white/5"
                 />
                 <span className="text-sm font-bold text-armoyu-text hidden md:inline-block pr-2">
                   {user.displayName.split(' ')[0]}
                 </span>
               </button>
            ) : (
               <button
                 onClick={() => setIsLoginModalOpen(true)}
                 className="flex items-center justify-center w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-armoyu-header-border shadow-sm"
                 title="Giriş Yap"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               </button>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-[280px] max-w-[80vw] h-full glass-panel bg-armoyu-drawer-bg border-r border-armoyu-drawer-border shadow-2xl flex flex-col pt-6 pb-8 px-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8 border-b border-armoyu-drawer-border pb-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-extrabold tracking-wider text-armoyu-text hover:text-blue-500 transition-colors">
                ARMOYU
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-armoyu-text-muted hover:text-armoyu-text transition-colors bg-black/5 dark:bg-white/5 p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 border border-armoyu-drawer-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto hide-scrollbar space-y-1 pr-2">
              {navItems.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <div className="space-y-1">
                      <div className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold text-armoyu-text-muted">
                        <span>{item.name}</span>
                      </div>
                      <div className="pl-3 space-y-1 border-l border-black/5 dark:border-white/10 ml-4">
                        {item.submenu.map((sub, sidx) => (
                          <Link
                            key={sidx}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all block"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3.5 px-4 rounded-xl text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all text-sm font-bold border border-transparent"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-armoyu-drawer-border space-y-3">
               <button 
                  onClick={toggleTheme}
                  className="w-full py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text-muted hover:text-armoyu-text flex items-center justify-between transition-colors font-bold text-sm"
               >
                 <span>Tema Değiştir</span>
                 {theme === 'dark' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                 )}
               </button>

               {user ? (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setIsUserMenuOpen(true); }}
                    className="w-full py-4 px-4 rounded-xl font-bold bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text flex justify-center items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    Profil Menüsü
                  </button>
               ) : (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                    className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all text-md font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  >
                    Giriş Yap / Kayıt Ol
                  </button>
               )}
            </div>
          </div>
        </div>
      )}

      {/* User Actions Drawer Overlay */}
      {isUserMenuOpen && user && (
        <div className="fixed inset-0 z-[60] flex justify-end animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setIsUserMenuOpen(false)} 
          />
          <div className="relative w-[340px] max-w-[85vw] h-full glass-panel bg-armoyu-drawer-bg border-l border-armoyu-drawer-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Profil Üst Bilgi */}
            <div className="p-6 border-b border-armoyu-drawer-border flex justify-between items-start relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] -z-10 rounded-full" />
              
              <div className="flex gap-4 items-center">
                 <img 
                   src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"} 
                   alt="Avatar" 
                   className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] object-cover bg-white/5"
                 />
                 <div>
                   <h3 className="text-armoyu-text font-bold text-lg leading-tight truncate max-w-[150px]">{user.displayName}</h3>
                   <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">@{user.username}</span>
                 </div>
              </div>
              <button onClick={() => setIsUserMenuOpen(false)} className="text-armoyu-text-muted hover:text-armoyu-text transition-colors bg-black/5 dark:bg-white/5 p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 border border-armoyu-drawer-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Menü İkonları / Linkleri */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 mt-2 hide-scrollbar">
               <button onClick={goToMyProfile} className="w-full flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-blue-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                 Profilime Git
               </button>
               <a href="#" className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                 Yazılarım
               </a>

               <a href="#" className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                 Yorumlarım
               </a>

               <button onClick={() => { setIsUserMenuOpen(false); openChat(); }} className="w-full flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                 Gelen Mesajlar
                 <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">3</span>
               </button>

               <a href="#" className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="8" y2="16"></line><line x1="16" y1="10" x2="16" y2="16"></line></svg>
                 Anketler
               </a>

               <div className="space-y-1">
                 <button 
                   onClick={() => setIsGroupsSubmenuOpen(!isGroupsSubmenuOpen)}
                   className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none ${isGroupsSubmenuOpen ? 'text-blue-500 bg-blue-500/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                   Gruplarım
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`ml-auto transition-transform duration-300 ${isGroupsSubmenuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                 </button>
                 
                 {isGroupsSubmenuOpen && (
                   <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                      {[
                        { name: 'RIHTIM', tag: 'RTM', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Rihtim' },
                        { name: 'CODE MASTERS', tag: 'CODE', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Code' },
                        { name: 'İttihat ve Terakki', tag: 'İttihat', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IT' }
                      ].map((group, gidx) => (
                        <Link 
                          key={gidx} 
                          href={`/gruplar/${group.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-armoyu-text-muted hover:text-blue-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                        >
                           <img src={group.logo} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-800 border border-armoyu-drawer-border" />
                           <span className="truncate">{group.name}</span>
                        </Link>
                      ))}
                      <Link 
                        href="/gruplar" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center justify-center p-2.5 rounded-xl text-[10px] font-black text-blue-500/60 hover:text-blue-500 hover:bg-blue-500/5 transition-all uppercase tracking-widest"
                      >
                         Tüm Grupları Gör
                      </Link>
                   </div>
                 )}
               </div>

               <a href="#" className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                 Çekiliş
               </a>

               <a href="#" className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                 Eğitim
               </a>

               <a href="#" className="flex items-center gap-3 p-3 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all font-bold border border-transparent hover:border-emerald-500/20 mt-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                 Destek Bildirimleri
               </a>

            </nav>

            {/* Tema Butonu & Çıkış */}
            <div className="p-4 border-t border-armoyu-drawer-border space-y-3">
               <button 
                  onClick={toggleTheme}
                  className="w-full py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text-muted hover:text-armoyu-text flex items-center justify-between transition-colors font-bold text-sm"
               >
                 <span>Koyu / Açık Tema Değiştir</span>
                 {theme === 'dark' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                 )}
               </button>

               <button 
                 onClick={() => {
                   logout();
                   setIsUserMenuOpen(false);
                 }}
                 className="flex items-center gap-3 w-full p-4 text-white hover:text-white bg-red-600 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-transparent rounded-xl transition-all font-bold"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                 Sistemden Çıkış Yap
               </button>
            </div>

          </div>
        </div>
      )}

      {/* Misafirler için Login Popup */}
      <LoginModal isOpen={!user && isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
