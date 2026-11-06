// shortcut: tasarım önizlemesi için örnek veri; Oyunlar eklentisi kurulunca backend'den gelecek ve bu dosya silinecek

export type Store = 'steam' | 'epic' | 'gog' | 'playstation' | 'xbox' | 'other';
export type Platform = 'pc' | 'playstation' | 'xbox' | 'switch' | 'mobile';

export type StorePrice = { store: Store; url: string; price: number; originalPrice?: number; isFree?: boolean };
export type Dlc = { slug: string; name: string; description: string; cover: string; prices: StorePrice[]; owned?: boolean };
export type Friend = { username: string; displayName: string; avatar: string; platform: Platform; dlcCount: number };

export type Game = {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  logo: string;
  cover: string;
  banner: string;
  screenshots: string[];
  genres: string[];
  platforms: Platform[];
  developer: string;
  publisher: string;
  releaseDate: string;
  isFree: boolean;
  prices: StorePrice[];
  dlcs: Dlc[];
  friends: Friend[];
  eventCount: number;
};

export const STORE_LABELS: Record<Store, string> = {
  steam: 'Steam',
  epic: 'Epic Games',
  gog: 'GOG',
  playstation: 'PlayStation Store',
  xbox: 'Xbox Store',
  other: 'Diğer',
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  pc: 'PC',
  playstation: 'PlayStation',
  xbox: 'Xbox',
  switch: 'Switch',
  mobile: 'Mobil',
};

const img = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const avatar = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

const friends: Friend[] = [
  { username: 'lali', displayName: 'Lali', avatar: avatar('Lali'), platform: 'pc', dlcCount: 2 },
  { username: 'burakerel', displayName: 'Burak Erel', avatar: avatar('Burak'), platform: 'pc', dlcCount: 0 },
  { username: 'gamerx', displayName: 'GamerX', avatar: avatar('X'), platform: 'playstation', dlcCount: 1 },
  { username: 'silver', displayName: 'SilverGamer', avatar: avatar('Silver'), platform: 'pc', dlcCount: 3 },
];

function game(g: Omit<Game, 'logo' | 'cover' | 'banner' | 'screenshots'>): Game {
  return {
    ...g,
    logo: img(`${g.slug}-logo`, 160, 160),
    cover: img(`${g.slug}-cover`, 600, 800),
    banner: img(`${g.slug}-banner`, 1920, 720),
    screenshots: [1, 2, 3, 4].map((n) => img(`${g.slug}-ss${n}`, 1280, 720)),
  };
}

export const SAMPLE_GAMES: Game[] = [
  game({
    slug: 'counter-strike-2', name: 'Counter-Strike 2', shortName: 'CS2',
    description: 'Takım tabanlı rekabetçi nişancı. 5v5 maçlar, dereceli eşleşme ve topluluk sunucuları. ARMOYU turnuvalarının çoğu burada.',
    genres: ['FPS', 'Rekabetçi'], platforms: ['pc'], developer: 'Valve', publisher: 'Valve', releaseDate: '2023-09-27',
    isFree: true, prices: [{ store: 'steam', url: '#', price: 0, isFree: true }],
    dlcs: [{ slug: 'prime', name: 'Prime Durumu', description: 'Prime eşleşme, özel düşüşler.', cover: img('cs2-prime', 400, 225), prices: [{ store: 'steam', url: '#', price: 520 }], owned: true }],
    friends, eventCount: 3,
  }),
  game({
    slug: 'minecraft', name: 'Minecraft',
    description: 'Bloklardan dünyalar kur, hayatta kal, keşfet. ARMOYU Minecraft sunucusu ve mod paketleriyle birlikte oynanır.',
    genres: ['Sandbox', 'Hayatta Kalma'], platforms: ['pc', 'playstation', 'xbox', 'switch', 'mobile'],
    developer: 'Mojang', publisher: 'Microsoft', releaseDate: '2011-11-18', isFree: false,
    prices: [{ store: 'other', url: '#', price: 899 }, { store: 'xbox', url: '#', price: 949 }],
    dlcs: [], friends: friends.slice(0, 3), eventCount: 1,
  }),
  game({
    slug: 'assetto-corsa', name: 'Assetto Corsa',
    description: 'Gerçekçi sürüş simülasyonu. Direksiyon setiyle drift ve pist günleri; topluluk modları sınırsız araç ve pist ekler.',
    genres: ['Yarış', 'Simülasyon'], platforms: ['pc', 'playstation', 'xbox'], developer: 'Kunos Simulazioni', publisher: '505 Games',
    releaseDate: '2014-12-19', isFree: false,
    prices: [{ store: 'steam', url: '#', price: 66, originalPrice: 330 }, { store: 'epic', url: '#', price: 330 }],
    dlcs: [
      { slug: 'dream-pack', name: 'Dream Pack 1', description: '8 yeni araç ve Nordschleife pisti.', cover: img('ac-dlc1', 400, 225), prices: [{ store: 'steam', url: '#', price: 49 }] },
      { slug: 'ready-to-race', name: 'Ready To Race Pack', description: 'Yarış odaklı 9 araç.', cover: img('ac-dlc2', 400, 225), prices: [{ store: 'steam', url: '#', price: 76 }] },
    ],
    friends: friends.slice(1), eventCount: 2,
  }),
  game({
    slug: 'valorant', name: 'VALORANT',
    description: 'Ajan yetenekleriyle taktik 5v5 nişancı. Ücretsiz oynanır.',
    genres: ['FPS', 'Rekabetçi'], platforms: ['pc', 'playstation', 'xbox'], developer: 'Riot Games', publisher: 'Riot Games',
    releaseDate: '2020-06-02', isFree: true, prices: [{ store: 'other', url: '#', price: 0, isFree: true }, { store: 'epic', url: '#', price: 0, isFree: true }],
    dlcs: [], friends: friends.slice(0, 2), eventCount: 0,
  }),
  game({
    slug: 'euro-truck-simulator-2', name: 'Euro Truck Simulator 2', shortName: 'ETS2',
    description: 'Avrupa yollarında tır sür, şirketini büyüt. Konvoy etkinlikleri için ideal.',
    genres: ['Simülasyon'], platforms: ['pc'], developer: 'SCS Software', publisher: 'SCS Software', releaseDate: '2012-10-19',
    isFree: false, prices: [{ store: 'steam', url: '#', price: 99, originalPrice: 395 }],
    dlcs: [
      { slug: 'going-east', name: 'Going East!', description: 'Doğu Avrupa haritası.', cover: img('ets2-dlc1', 400, 225), prices: [{ store: 'steam', url: '#', price: 89 }], owned: true },
      { slug: 'road-to-the-black-sea', name: 'Road to the Black Sea', description: 'Türkiye, Romanya ve Bulgaristan.', cover: img('ets2-dlc2', 400, 225), prices: [{ store: 'steam', url: '#', price: 179 }] },
    ],
    friends: friends.slice(2), eventCount: 1,
  }),
  game({
    slug: 'league-of-legends', name: 'League of Legends', shortName: 'LoL',
    description: '5v5 MOBA. Şampiyonunu seç, koridorunu tut, Nexus\'u yık.',
    genres: ['MOBA', 'Rekabetçi'], platforms: ['pc'], developer: 'Riot Games', publisher: 'Riot Games', releaseDate: '2009-10-27',
    isFree: true, prices: [{ store: 'other', url: '#', price: 0, isFree: true }], dlcs: [], friends: [], eventCount: 0,
  }),
  game({
    slug: 'rocket-league', name: 'Rocket League',
    description: 'Roketli arabalarla futbol. Kısa maçlar, yüksek tempo.',
    genres: ['Spor', 'Rekabetçi'], platforms: ['pc', 'playstation', 'xbox', 'switch'], developer: 'Psyonix', publisher: 'Epic Games',
    releaseDate: '2015-07-07', isFree: true, prices: [{ store: 'epic', url: '#', price: 0, isFree: true }], dlcs: [], friends: friends.slice(3), eventCount: 0,
  }),
  game({
    slug: 'the-witcher-3', name: 'The Witcher 3: Wild Hunt', shortName: 'Witcher 3',
    description: 'Geniş açık dünyada hikâye odaklı rol yapma oyunu.',
    genres: ['RPG', 'Açık Dünya'], platforms: ['pc', 'playstation', 'xbox', 'switch'], developer: 'CD PROJEKT RED', publisher: 'CD PROJEKT',
    releaseDate: '2015-05-19', isFree: false,
    prices: [{ store: 'gog', url: '#', price: 75, originalPrice: 300 }, { store: 'steam', url: '#', price: 90, originalPrice: 300 }, { store: 'epic', url: '#', price: 300 }],
    dlcs: [
      { slug: 'hearts-of-stone', name: 'Hearts of Stone', description: '10 saatlik yeni macera.', cover: img('w3-dlc1', 400, 225), prices: [{ store: 'gog', url: '#', price: 70 }] },
      { slug: 'blood-and-wine', name: 'Blood and Wine', description: 'Yeni bölge Toussaint.', cover: img('w3-dlc2', 400, 225), prices: [{ store: 'gog', url: '#', price: 140 }] },
    ],
    friends: friends.slice(0, 1), eventCount: 0,
  }),
];

/** En ucuz mağaza fiyatı (eklentide game_detail en ucuzu başa koyacak) */
export const cheapest = (prices: StorePrice[]) => [...prices].sort((a, b) => a.price - b.price)[0];

export const formatPrice = (p: StorePrice) =>
  p.isFree || p.price === 0 ? 'Ücretsiz' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 }).format(p.price);

export const discountOf = (p: StorePrice) =>
  p.originalPrice && p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
