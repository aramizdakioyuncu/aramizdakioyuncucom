import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';
import { ChatProvider } from '@/context/ChatContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aramızdaki Oyuncu | Oyun Topluluğu',
  description: 'ARMOYU Topluluk Sunucusu ve Platformu. Oyun dünyasındaki gelişmeleri takip et, arkadaşlarınla oyun oyna.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`}>
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>
              {/* Background Decorative Blobs */}
          <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          <Header />

          <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden pt-8 px-4 md:px-8 max-w-7xl mx-auto z-10">
            {children}
          </main>
          
          {/* Sadece giriş yapıldığında ekranda belirlenen posizyonda çıkar */}
          <FloatingChatButton position="bottom-right" />

          <Footer />
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
