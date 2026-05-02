'use client';

import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'plyr-react/plyr.css';
import { Header, Footer, FloatingChatButton, MainLayoutWrapper } from '@armoyu/ui';
import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('armoyu_theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`
          }}
        />
      </head>
      <body className={`${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`}>
        <Providers>
          <div className="fixed inset-0 pointer-events-none z-[-1]">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
          </div>

          <Header 
            items={[
              { name: 'Gruplar', href: '/gruplar' },
              { name: 'Etkinlikler', href: '/etkinlikler' },
              { name: 'Okullar', href: '/egitim' },
              { name: 'Forum', href: '/forum' },
              { name: 'Haberler', href: '/haberler' },
              { name: 'Çekilişler', href: '/cekilisler' },
              { name: 'Anketler', href: '/anketler' },
              { name: 'Modlar', href: '/modlar' },
              { name: 'Galeriler', href: '/galeriler' },
              {
                name: 'Kurumsal',
                href: '#',
                submenu: [
                  { name: 'Hakkımızda', href: '/ekibimiz/hakkimizda' },
                  { name: 'Çalışma Ekibi', href: '/ekibimiz/ekip' },
                  { name: 'Topluluk Kuralları', href: '/kurallar' },
                  { name: 'İnsan Kaynakları', href: '/ekibimiz/ik' },
                  { name: 'Gizlilik Politikası', href: '/ekibimiz/gizlilik' }
                ]
              },
              { name: 'Mağaza', href: '/magaza' },
            ]}
            drawerLinks={{
              posts: '/yazilarim',
              comments: '/yazilarim',
              polls: '/anketler',
              giveaways: '/cekilisler',
              education: '/egitim',
              support: '/destek'
            }}
            profilePrefix="/oyuncular"
          />

          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>

          <div className="relative z-[80]">
            <FloatingChatButton position="bottom-right" key="main-floating-chat" />
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
