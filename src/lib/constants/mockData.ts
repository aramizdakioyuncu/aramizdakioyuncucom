import { GlobalStats } from "@/types/stats";
import { userList } from './seedData';
import { User, Story, Note, Leaderboard } from '@/models';

export const MOCK_STORIES: Story[] = [
  new Story({
    id: 'me',
    user: new User({ 
      username: 'Hikayen', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArmoyuMe',
      displayName: 'Hikayen'
    }),
    media: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
    hasUnseen: false,
    isMe: true
  }),
  ...userList.slice(0, 7).map((user, index) => new Story({
    id: `s${index + 1}`,
    user: user,
    media: [
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=2698&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2730&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop'
    ][index % 7],
    hasUnseen: index % 3 !== 0
  }))
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

const possibleNotes = [
  'CS2 mi Valorant mı? 🤔',
  'V3 sistemleri hazır! 🔨',
  'Aramızdaki Oyuncu 🤍',
  'Kod yazarken müzik...🧨',
  'Yeni video yayında! 📺',
  'Bugün çok yorgunum 😴',
  'Akşam turnuva var! 🏆',
  'Oyun önerisi olan? 🎮',
  'Sistem topluyorum 💻',
  'Herkese iyi oyunlar! ✨'
];

export const MOCK_NOTES: Note[] = [
  new Note({
    id: 'n-me',
    user: new User({ 
      username: 'Hikayen', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArmoyuMe',
      displayName: 'Hikayen'
    }),
    note: 'Not bırak...',
    isMe: true
  }),
  ...userList.slice(0, 9).map((user, index) => new Note({
    id: `n${index + 1}`,
    user: user,
    note: possibleNotes[index % possibleNotes.length],
    isMe: false
  }))
];

// Globally accessible ranking lists (Expanded to top 100 for 'load more' feature)
export const MOCK_RANKING_LEVEL = Leaderboard.getLevelRankings(userList, 100);
export const MOCK_RANKING_POPULARITY = Leaderboard.getPopularityRankings(userList, 100);
