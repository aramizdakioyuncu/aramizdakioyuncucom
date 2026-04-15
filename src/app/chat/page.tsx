import { ChatLayout } from "@armoyu/ui";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mesajlar | ARMOYU',
};

export default function ChatPage() {
  return (
    <div className="w-full pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-16">
      
      {/* Sayfa Üst Bilgisi */}
      <div className="mb-6 px-2 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Mesajların</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Oyuncu topluluğu ile bağlantıda kal.</p>
        </div>
        <button className="hidden sm:block px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-xl shadow-[0_0_10px_rgba(37,99,235,0.4)] hover:bg-blue-600 transition-colors">
          + Yeni Grup
        </button>
      </div>

      {/* Widget Container */}
      <ChatLayout />
      
    </div>
  );
}
