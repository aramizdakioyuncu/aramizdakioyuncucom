import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { 
  Header, 
  Footer, 
  AuthProvider, 
  CartProvider, 
  ThemeProvider, 
  FloatingChatButton, 
  ChatProvider, 
  SocketProvider, 
  LayoutProvider, 
  MainLayoutWrapper 
} from '@armoyu/ui';

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
    <html lang="tr" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('armoyu_theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <LayoutProvider>
                <SocketProvider>
                  <ChatProvider>
                    <div key="layout-background-layer" className="fixed inset-0 pointer-events-none z-[-1]">
                      <div key="bg-blob-1" className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                      <div key="bg-blob-2" className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
                    </div>
                    
                    <Header key="layout-header" />

                    <MainLayoutWrapper key="layout-main">
                      {children}
                    </MainLayoutWrapper>
                    
                    <div key="layout-chat-layer" className="relative z-[80]">
                      <FloatingChatButton position="bottom-right" />
                    </div>

                    <Footer key="layout-footer" />
                  </ChatProvider>
                </SocketProvider>
              </LayoutProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
