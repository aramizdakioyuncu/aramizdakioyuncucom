import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';
import { ChatProvider } from '@/context/ChatContext';
import { LayoutProvider } from '@/context/LayoutContext';
import { MainLayoutWrapper } from '@/components/shared/MainLayoutWrapper';

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
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`}>
        <ThemeProvider>
          <AuthProvider>
            <LayoutProvider>
              <ChatProvider>
                {/* Background Decorative Blobs */}
                <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
                
                <Header />

                <MainLayoutWrapper>
                  {children}
                </MainLayoutWrapper>
                
                {/* Sadece giriş yapıldığında ekranda belirlenen posizyonda çıkar */}
                <FloatingChatButton position="bottom-right" />

                <Footer />
              </ChatProvider>
            </LayoutProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
