
/**
 * GAMES (gameList)
 */
export const gameList: Game[] = [
  new Game({ id: '1', name: 'Counter Strike 2', poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' }),
  new Game({ id: '2', name: 'Valorant', poster: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80' }),
  new Game({ id: '3', name: 'League of Legends', poster: 'https://images.unsplash.com/photo-1542751163-44203649479e?w=800&q=80' }),
  new Game({ id: '4', name: 'Minecraft', poster: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80' }),
  new Game({ id: '5', name: 'Euro Truck Simulator 2', poster: 'https://images.unsplash.com/photo-1601584115167-0effcb193f0c?w=800&q=80' }),
  new Game({ id: '6', name: 'GTA V', poster: 'https://images.unsplash.com/photo-1605898399783-1820b7f53631?w=800&q=80' }),
  new Game({ id: '7', name: 'Assetto Corsa', poster: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80' }),
  new Game({ id: '8', name: 'PUBG', poster: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80' }),
  new Game({ id: '9', name: 'Dota 2', poster: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80' }),
  new Game({ id: '10', name: 'Rocket League', poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' }),
];

/**
 * EVENTS (eventList)
 */
export const eventList: ArmoyuEvent[] = [
  new ArmoyuEvent({
    id: 'cs2-wingman-tr',
    title: 'CS2 Wingman Turnuvası',
    game: 'Counter Strike 2',
    status: 'Kayıtlar Açık',
    participationType: 'BOTH',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80',
    date: '20 Nisan 2026, 20:00',
    location: 'ARMOYU Sunucuları',
    participantLimit: 16,
    currentParticipants: 8,
    isHot: true,
    rewards: 'AWP | Atheris Skin',
    description: 'Yoldaşını al gel, CS2 sahalarında en iyi ikili kim belli olsun!'
  }),
  new ArmoyuEvent({
    id: 'val-bahar-kupasi',
    title: 'Valorant Bahar Kupası',
    game: 'Valorant',
    status: 'Yeni',
    participationType: 'BOTH',
    banner: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1600&q=80',
    date: '15 Mayıs 2026, 19:00',
    location: 'ARMOYU Discord Sahnesi',
    participantLimit: 100,
    currentParticipants: 0,
    isHot: false,
    rewards: '5.000 VP Havuzu',
    description: 'Baharın gelişini harika bir Valorant şöleni ile kutluyoruz.'
  })
];

/**
 * STATIONS (stationList)
 */
export const stationList: Station[] = [
  new Station({
    id: '1',
    name: 'Zerdüşt Coffee & Food',
    type: 'YEMEK',
    description: 'Şehrin en iyi kahvesi ve atıştırmalıkları burada. Oyuncular için özel indirimler ve kuponlar!',
    location: 'Beşiktaş, İstanbul',
    rating: 4.8,
    reviewCount: 156,
    logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&auto=format&fit=crop',
    products: [
      new StationProduct({ id: 'p1', name: 'Americano', price: 65, category: 'Kahve' }),
      new StationProduct({ id: 'p2', name: 'Latte', price: 75, category: 'Kahve' }),
      new StationProduct({ id: 'p3', name: 'Oyuncu Burger', price: 185, category: 'Yemek', isDeal: true, discountRate: '%15' }),
      new StationProduct({ id: 'p4', name: 'Gamer Menü (Tavuk + İçecek)', price: 145, category: 'Yemek', isDeal: true, discountRate: '%20' }),
      new StationProduct({ id: 'p5', name: 'Gece Kuşu Paketi (Sandviç + Kahve)', price: 110, category: 'Yemek', isDeal: true, discountRate: '%25' }),
    ],
    coupons: [
      new StationCoupon({ code: 'ARMOYU10', discount: '%10', expiryDate: '01.01.2027', description: 'Tüm kahvelerde geçerli!' })
    ]
  }),
  new Station({
    id: '2',
    name: 'ARMOYU Elite Gaming Center',
    type: 'INTERNET_KAFE',
    description: 'En son teknoloji PCler, 360Hz monitörler and profesyonel ekipmanlar. Turnuva heyecanı burada yaşanır.',
    location: 'Kadıköy, İstanbul',
    rating: 4.9,
    reviewCount: 842,
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=400&auto=format&fit=crop',
    equipment: [
      new WorkstationEquipment({
        id: 'eq1',
        name: 'VIP Streaming Odası',
        cpu: 'Intel Core i9-14900K',
        gpu: 'NVIDIA RTX 4090',
        ram: '64GB DDR5',
        monitor: 'ASUS ROG 540Hz',
        keyboard: 'Logitech G Pro GX',
        mouse: 'Logitech G Pro Superlight 2'
      }),
      new WorkstationEquipment({
        id: 'eq2',
        name: 'Standart Gamer Alanı',
        cpu: 'AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA RTX 4070 Ti',
        ram: '32GB DDR5',
        monitor: 'Zowie 240Hz',
        keyboard: 'SteelSeries Apex Pro',
        mouse: 'Razer Deathadder V3'
      })
    ],
    pricing: [
      { label: 'Saati', price: 35, unit: 'saat' },
      { label: '3 Saatlik Paket', price: 90, unit: 'paket' },
      { label: 'Gece Paketi', price: 200, unit: 'paket' }
    ]
  }),
  new Station({
    id: '3',
    name: 'Arena Halı Saha',
    type: 'HALI_SAHA',
    description: 'Yapay çim, duş imkanı ve kantin. Maç yapacak takım arayanlar için oyuncu eşleştirme sistemi aktif!',
    location: 'Şişli, İstanbul',
    rating: 4.5,
    reviewCount: 215,
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1529900903114-93da367104e7?w=1200&h=400&auto=format&fit=crop',
    facilities: ['Otopark', 'Duş', 'Kantin', 'Wi-Fi'],
    pricing: [
      { label: 'Gündüz (1 Saat)', price: 800, unit: 'seans' },
      { label: 'Gece (Aydınlatmalı)', price: 1200, unit: 'seans' }
    ]
  })
];

/**
 * GLOBAL MOCK EXPORTS
 */
export const newsList: News[] = MOCK_NEWS;
export const giveawayList: Giveaway[] = MOCK_GIVEAWAYS;
export const projectList: Project[] = [];
export const sessionList: Session[] = [];
export const armoyuProjects: Project[] = [];
export const armoyuGiveaways: Giveaway[] = [];
