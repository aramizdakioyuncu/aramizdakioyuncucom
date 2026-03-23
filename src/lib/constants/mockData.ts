import { GlobalStats } from "@/types/stats";

export interface StoryType {
  id: string;
  username: string;
  avatar: string;
  media: string;
  hasUnseen: boolean;
  isMe?: boolean;
}

export interface NoteType {
  id: string;
  username: string;
  avatar: string;
  note: string;
  isMe?: boolean;
}

export const MOCK_STORIES: StoryType[] = [
  {
    id: 'me',
    username: 'Hikayen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArmoyuMe',
    media: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
    hasUnseen: false,
    isMe: true
  },
  {
    id: 's1',
    username: 'berkaytikeno',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
    media: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=2698&auto=format&fit=crop',
    hasUnseen: true
  },
  {
    id: 's2',
    username: 'alperen_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen',
    media: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop',
    hasUnseen: true
  },
  {
    id: 's3',
    username: 'zeynocash',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep',
    media: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
    hasUnseen: true
  },
  {
    id: 's4',
    username: 'can_dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Can',
    media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
    hasUnseen: true
  },
  {
    id: 's5',
    username: 'melisa_art',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Melisa',
    media: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop',
    hasUnseen: false
  },
  {
    id: 's6',
    username: 'ayberk_pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayberk',
    media: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2730&auto=format&fit=crop',
    hasUnseen: true
  },
  {
    id: 's7',
    username: 'aslihan_p',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asli',
    media: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop',
    hasUnseen: false
  }
];

export const mockGlobalStats: GlobalStats = {
  totalPlayers: 12540,
  malePlayers: 8200,
  femalePlayers: 4340,
  totalForums: 856,
  totalPolls: 124,
  activeUsers24h: 1240,
  totalMatchesPlayed: 45200,
  totalGuilds: 156,
  monthlyVisitors: 85000,
  totalNews: 342
};

export const MOCK_NOTES: NoteType[] = [
  {
    id: 'n-me',
    username: 'Hikayen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArmoyuMe',
    note: 'Not bırak...',
    isMe: true
  },
  {
    id: 'n1',
    username: 'berkaytikeno',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
    note: 'CS2 mi Valorant mı? 🤔'
  },
  {
    id: 'n2',
    username: 'alperen_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen',
    note: 'V3 sistemleri hazır! 🔨'
  },
  {
    id: 'n3',
    username: 'zeynocash',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep',
    note: 'Aramızdaki Oyuncu 🤍'
  },
  {
    id: 'n4',
    username: 'can_dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Can',
    note: 'Kod yazarken müzik...🧨'
  }
];

