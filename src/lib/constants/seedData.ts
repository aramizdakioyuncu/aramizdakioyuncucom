import { User, Post, Role, Group, Notification } from '@/models';
import { Chat } from '@/models/social/Chat';
import { ChatMessage } from '@/models/social/ChatMessage';

/**
 * Common Roles
 */
export const roles = {
  admin: new Role({ id: 'admin', name: 'Kurucu', color: '#ff4d4d' }),
  memberMgmt: new Role({ id: 'member_mgmt', name: 'Üye Yönetim', color: '#ff4d4d' }),
  discipline: new Role({ id: 'discipline', name: 'Düzen Ve Disiplin Yönetim', color: '#ff4d4d' }),
  eventMgmt: new Role({ id: 'event_mgmt', name: 'Etkinlik Yönetim', color: '#ff4d4d' }),
  assettoOfficial: new Role({ id: 'assetto_official', name: 'Oyun Yetkilisi (Assetto Corsa)', color: '#3b82f6' }),
  mcOfficial: new Role({ id: 'mc_official', name: 'Oyun Yetkilisi (Minecraft)', color: '#3b82f6' }),
  responsible: new Role({ id: 'responsible', name: 'Sorumlu', color: '#3b82f6' }),
  gameDev: new Role({ id: 'game_dev', name: 'Oyun Geliştiricisi', color: '#10b981' }),
  softwareDev: new Role({ id: 'software_dev', name: 'Yazılım Geliştirici', color: '#10b981' }),
  frontendDev: new Role({ id: 'frontend_dev', name: 'Frontend Developer', color: '#10b981' }),
  backendDev: new Role({ id: 'backend_dev', name: 'Backend Developer', color: '#10b981' }),
  fullstackDev: new Role({ id: 'fullstack_dev', name: 'Full Stack Developer', color: '#10b981' }),
  streamerContent: new Role({ id: 'streamer_content', name: 'Streamer / Content', color: '#a855f7' }),
  streamerGaming: new Role({ id: 'streamer_gaming', name: 'Streamer / Gaming', color: '#a855f7' }),
  streamer: new Role({ id: 'streamer', name: 'Yayıncı', color: '#a855f7' }),
  esports: new Role({ id: 'esports', name: 'E-Sporcu', color: '#f97316' }),
  user: new Role({ id: 'user', name: 'Kullanıcı', color: '#808080' }),
  qualified: new Role({ id: 'qualified', name: 'Nitelikli Oyuncu', color: '#4ade80' }),
};

/**
 * Community Room Constant (Plain data for constructor)
 */
const TOPLULUK_ODASI_DATA = {
  id: 'community-room',
  name: 'Topluluk Odası',
  avatar: 'https://cdn.pixabay.com/photo/2017/02/13/11/44/community-2062409_1280.png',
  time: 'Canlı',
  unreadCount: 42,
  isOnline: true,
  lastSeen: 'Şu an aktif',
  participants: [],
  messages: [
    new ChatMessage({ id: 'c1', sender: new User({ displayName: 'Sistem', avatar: 'https://cdn.pixabay.com/photo/2017/02/13/11/44/community-2062409_1280.png' }), content: 'Topluluk Odası Sohbetine Hoş Geldiniz!', timestamp: 'Hep', isSystem: true }),
    new ChatMessage({ id: 'c2', sender: new User({ displayName: 'Alperen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen' }), content: 'Selamlar herkese!', timestamp: '10:00', isSystem: false }),
    new ChatMessage({ id: 'c3', sender: new User({ displayName: 'Berkay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' }), content: 'V3 yakında yayında!', timestamp: '10:05', isSystem: false })
  ]
};

// Add lastMessage dynamically
const TOPLULUK_ODASI = new Chat({
  ...TOPLULUK_ODASI_DATA,
  lastMessage: TOPLULUK_ODASI_DATA.messages[2]
});

/**
 * Seed data for Groups (Guilds/Communities)
 */
export const groupList: Group[] = [
  new Group({
    name: 'RIHTIM',
    shortName: 'RTM',
    description: 'Denizin verdiği huzur ile içinizi ferahlatacak bir yaşam sizi bekliyor. Topluluğumuzda huzur ve eğlence bir arada.',
    recruitment: '16 Alım Açık',
    date: '13.03.2022',
    category: 'E-Spor/Takım',
    tag: 'Minecraft',
    banner: 'https://images.unsplash.com/photo-1587573089734-09cb6960951b?q=80&w=2672&auto=format&fit=crop',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Rihtim'
  }),
  new Group({
    name: 'CODE MASTERS',
    shortName: 'CODE',
    description: 'Yazılım geliştirme tutkunlarının bir araya geldiği, projelerin havada uçuştuğu dinamik bir topluluk.',
    recruitment: '5 Alım Açık',
    date: '01.01.2023',
    category: 'Yazılım',
    tag: 'Next.js',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Code'
  }),
  new Group({
    name: 'FAST FIVE',
    shortName: 'F5',
    description: 'Valorant rekabetçi dünyasında zirveyi hedefleyen, disiplinli ve yetenekli oyuncuların buluşma noktası.',
    recruitment: '2 Alım Açık',
    date: '15.05.2023',
    category: 'E-Spor/Takım',
    tag: 'Valorant',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
    logo: 'https://api.dicebear.com/7.x/bottts/svg?seed=Fast'
  }),
  new Group({
    name: 'GREEN COURT',
    shortName: 'GRN',
    description: 'Tenis ve açık hava sporlarını sevenler için haftalık turnuvalar ve antrenman grupları düzenliyoruz.',
    recruitment: 'Sınırsız',
    date: '10.10.2022',
    category: 'Spor',
    tag: 'Tenis',
    banner: 'https://images.unsplash.com/photo-1595435064212-c441821ac9ac?q=80&w=2670&auto=format&fit=crop',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Green'
  }),
  new Group({
    name: 'İttihat ve Terakki',
    shortName: 'İttihat',
    description: 'İttihat Ruhu! Köklü geçmişimizle sahalarda ve her alanda mücadeleye devam ediyoruz.',
    recruitment: '25 Alım Açık',
    date: '22.05.2024',
    category: 'Spor/Takım',
    tag: 'Futbol',
    banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2670&auto=format&fit=crop',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IT'
  }),
  new Group({
    name: 'CZAL Hack Team',
    shortName: 'CZAL HT',
    description: 'Türk Yazılımcı ve Robotikciler ile toplandık Kendimizi Geliştirmek için çaba gösteriyoruz Biz Fatsa Cahit Zarifoğlu Anadolu Lisesinde kurulduk ve çalışmalarımıza devam ediyoruz sende bize katılmak istersen bize mail atabilirsin Okulumuzu İnternette araştırabilirsiniz.',
    recruitment: '19 Alım Kapalı',
    date: '14.10.2018',
    category: 'Yazılım',
    tag: 'Robotik Kodlama',
    banner: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop',
    logo: 'https://api.dicebear.com/7.x/bottts/svg?seed=CZAL'
  })
];

/**
 * Seed data for users (Team Members)
 */
export const userList: User[] = [
  // YÖNETİM EKİBİ
  new User({ displayName: 'Berkay Tikenoğlu', role: roles.admin, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', username: 'berkaytikenoglu', verified: true, bio: 'ARMOYU Kurucusu & Yazılım Geliştirici', level: 99, xp: 5000, popScore: 15000, groups: [groupList[0], groupList[1], groupList[5]], chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'MythX', role: roles.memberMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', username: 'mythx', verified: true, level: 85, xp: 3200, popScore: 12500, groups: [groupList[1], groupList[2]], chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Barış Müftüoğlu', role: roles.discipline, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baris', username: 'barismuftuoglu', verified: true, level: 82, xp: 2800, popScore: 11000, groups: [groupList[3]], chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Bey Ev', role: roles.eventMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah', username: 'beyev', verified: true, level: 80, xp: 2500, popScore: 10500, chatList: [TOPLULUK_ODASI] }),

  // SORUMLULAR
  new User({ displayName: 'Yılmaz Akşahin', role: roles.assettoOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yilmaz', username: 'yilmazaksahin', level: 65, popScore: 8500, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Orkun Atılgan', role: roles.mcOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orkun', username: 'orkunatilgan', level: 68, popScore: 9200, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Furkan Sarıdiken', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Furkan', username: 'furkansaridiken', level: 60, popScore: 7800, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Burakcan TOPAL', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burakcan', username: 'burakcantopal', level: 58, popScore: 7500, chatList: [TOPLULUK_ODASI] }),

  // YAZILIM VE GELİŞTİRME
  new User({ displayName: 'Burak Erel', role: roles.gameDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burak', username: 'burakerel', level: 75, popScore: 9800, groups: [groupList[0]], chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Engin Kuşkovan', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Engin', username: 'enginkuskovan', level: 72, popScore: 9400, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Nariman Rustamli', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nariman', username: 'narimanrustamli', level: 70, popScore: 9000, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Ersan Güvenç', role: roles.qualified, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ersan', username: 'ersanguvenc', level: 70, popScore: 8900, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Oğuzhan Seslikaya', role: roles.qualified, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oguzhan', username: 'oguzhanseslikaya', level: 70, popScore: 8850, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Ömer Efe Dikici', role: roles.frontendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Efe', username: 'omerefedikici', level: 78, popScore: 10200, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Ömer Faruk Sayın', role: roles.backendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faruk', username: 'omerfaruksayin', level: 77, popScore: 10100, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Emre Sandal', role: roles.fullstackDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emre', username: 'emresandal', level: 79, popScore: 10300, chatList: [TOPLULUK_ODASI] }),

  // YAYINCILAR
  new User({ displayName: 'Metehan Çakır', role: roles.streamerContent, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Metehan', username: 'metehancakir', level: 88, popScore: 13500, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Bartu Başaran', role: roles.streamerGaming, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bartu', username: 'bartubasaran', level: 86, popScore: 12800, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Erhan', role: roles.streamer, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erhan', username: 'erhan', level: 84, popScore: 12200, chatList: [TOPLULUK_ODASI] }),

  // E-SPOR LİSANSLI OYUNCULAR
  new User({ displayName: 'Gabriel Eren Gümüşdal', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', username: 'gabrieleren', level: 92, popScore: 14200, chatList: [TOPLULUK_ODASI] }),

  // Nitelikli Oyuncular
  new User({ displayName: 'Emir K.', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmirK', username: 'emir', level: 92, popScore: 14200, chatList: [TOPLULUK_ODASI] }),
  new User({ displayName: 'Tuğra', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tugra', username: 'tugra', level: 92, popScore: 14200, chatList: [TOPLULUK_ODASI] })
];

// Generate 100 additional mock users
const firstNames = ['Ahmet', 'Mehmet', 'Can', 'Deniz', 'Selin', 'Elif', 'Burak', 'Oğuz', 'Hakan', 'Ayşe', 'Fatma', 'Gökhan', 'Emre', 'Zeynep', 'Kaan'];
const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Öztürk', 'Aydın', 'Özkan', 'Arslan', 'Bulut', 'Yavuz', 'Koç', 'Kurt', 'Aksoy'];

for (let i = 0; i < 100; i++) {
  const fName = firstNames[i % firstNames.length];
  const lName = lastNames[i % lastNames.length];
  userList.push(new User({
    id: `u-${i + 200}`,
    username: `${fName.toLowerCase()}${lName.toLowerCase()}${i}`,
    displayName: `${fName} ${lName}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fName}${lName}${i}`,
    role: roles.user,
    verified: false,
    level: Math.floor(Math.random() * 50) + 1,
    xp: Math.floor(Math.random() * 1000),
    popScore: Math.floor(Math.random() * 5000),
    bio: `Ben ${fName}, aramizdakioyuncu.com topluluğunun bir üyesiyim! Herkese selamlar. 👋`,
    groups: [],
    chatList: [TOPLULUK_ODASI],
    friends: []
  }));
}

// Global Networking (Friends & Chats)
const possibleMessages = [
  'Sunucuya reset atıyorum...',
  'Akşam CS2 giriyor muyuz?',
  'Bildiriminiz çözüme ulaştı.',
  'Yeni güncellemeyi gördün mü?',
  'Selam, müsait misin?',
  'Harika bir paylaşım olmuş!',
  'Grupta bekliyoruz seni.',
  'Sıralamada yükselmişsin tebrikler!',
  'Discord adresini atar mısın?',
  'V4 için heyecanlıyız!'
];

// Specific conversation for Berkay & MythX (Raw data for processing)
const BERKAY_MYTHX_MESSAGES_DATA = [
  { id: 'bm1', senderName: 'MythX', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', content: 'Dostum selam, discord botunda ufak bir arıza var sanırım. Rolleri vermiyor.', timestamp: '10:30' },
  { id: 'bm2', senderName: 'Berkay', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', content: 'Selam. Evet fark ettim, V3 güncellemesi sırasında API token süresi dolmuş.', timestamp: '10:35' },
  { id: 'bm3', senderName: 'Berkay', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', content: 'Tokeni yeniledim, şimdi tekrar test eder misin? Sunucuya da reset atıyorum emin olmak için.', timestamp: '10:36' },
  { id: 'bm4', senderName: 'MythX', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', content: 'Tamamdır deniyorum.', timestamp: '10:40' },
  { id: 'bm5', senderName: 'MythX', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', content: 'Sunucuya reset atıyorum...', timestamp: '10:42' }
];

userList.forEach((user, index) => {
  // Everyone gets the community room
  if (user.chatList.length === 0) user.chatList.push(TOPLULUK_ODASI);

  // Add 5-10 random FRIENDS for everyone
  const friendCount = Math.floor(Math.random() * 6) + 5;
  for (let i = 0; i < friendCount; i++) {
    const randomFriend = userList[(index + 10 + i * 13) % userList.length];
    if (randomFriend.username !== user.username) {
      if (!user.friends.some(f => f.username === randomFriend.username)) {
        user.friends.push(randomFriend);
      }
    }
  }

  // Ensure Berkay & MythX are friends
  if (user.username === 'berkaytikenoglu') {
    const myth = userList.find(u => u.username === 'mythx');
    if (myth && !user.friends.some(f => f.username === 'mythx')) user.friends.push(myth);
  }

  // Add 3-5 random individual chats for everyone
  const chatCount = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < chatCount; i++) {
    const randomUser = userList[(index + 1 + i * 7) % userList.length];
    if (randomUser.username !== user.username) {
      const alreadyExists = user.chatList.some(c => c.id === randomUser.username);
      if (!alreadyExists) {
        
        // Check if this is the Berkay-MythX combo
        const isBerkayMythX = (user.username === 'berkaytikenoglu' && randomUser.username === 'mythx') || 
                             (user.username === 'mythx' && randomUser.username === 'berkaytikenoglu');

        const messages: ChatMessage[] = isBerkayMythX 
          ? BERKAY_MYTHX_MESSAGES_DATA.map(m => new ChatMessage({
              id: m.id,
              sender: new User({ displayName: m.senderName, avatar: m.senderAvatar, username: m.senderName.toLowerCase() }),
              content: m.content,
              timestamp: m.timestamp,
              isSystem: false
            }))
          : [
            new ChatMessage({ 
              id: `m-${index}-${i}`, 
              sender: new User({ displayName: randomUser.displayName, avatar: randomUser.avatar, username: randomUser.username }), 
              content: possibleMessages[(index + i) % possibleMessages.length], 
              timestamp: '10:42',
              isSystem: false
            })
          ];

        user.chatList.push(new Chat({
          id: randomUser.username,
          name: randomUser.displayName,
          avatar: randomUser.avatar,
          lastMessage: messages[messages.length - 1],
          time: messages[messages.length - 1].timestamp,
          unreadCount: (index + i) % 7 === 0 ? Math.floor(Math.random() * 5) + 1 : 0,
          isOnline: (index + i) % 3 === 0,
          messages: messages,
          participants: [user, randomUser]
        }));
      }
    }
  }

  // Assign groups to Group.members list
  user.groups.forEach((group: Group) => {
    if (!group.members.some(m => m.username === user.username)) {
      group.members.push(user);
      group.memberCount = group.members.length;
    }
    // Add default permissions to groups if empty
    if (group.permissions.length === 0) {
      group.permissions = ['GÖNDERİ_PAYLAŞ', 'YORUM_YAP', 'ETKİNLİK_GÖR', 'MESAJ_GÖNDER'];
    }
  });

});

/**
 * Seed data for posts
 */
export const postList: Post[] = [
  new Post({
    id: 'p1',
    author: userList[0],
    content: 'ARMOYU V3 sistemleri üzerinde çalışmaya devam ediyoruz! Çok yakında yeni özelliklerle karşınızda olacağız. #ARMOYU #V3 #Development',
    createdAt: '2 saat önce',
    stats: { likes: 124, comments: 12, reposts: 5, shares: 8 },
    hashtags: ['ARMOYU', 'V3', 'Development']
  }),
  new Post({
    id: 'p2',
    author: userList[1],
    content: 'Bu akşam saat 20:00\'de büyük bir çekilişimiz var, sakın kaçırmayın! 🔥',
    createdAt: '5 saat önce',
    stats: { likes: 85, comments: 45, reposts: 12, shares: 20 },
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop' }]
  }),
  new Post({
    id: 'p3',
    author: userList[2],
    content: 'Bugün harika bir day! Herkese iyi oyunlar dilerim. 🤍',
    createdAt: '1 gün önce',
    stats: { likes: 56, comments: 4, reposts: 1, shares: 2 }
  }),
  new Post({
    id: 'p4',
    author: userList[0], // Berkay
    content: 'Yeni bir blog yazısı paylaştım! "Modern Web Geliştirme Trendleri" hakkındaki düşüncelerimi okuyabilirsiniz. #Blog #WebDev',
    createdAt: '3 saat önce',
    stats: { likes: 210, comments: 15, reposts: 8, shares: 12 }
  }),
  new Post({
    id: 'p5',
    author: userList[4], // Engin
    content: 'Kod yazarken kahve olmazsa olmaz diyenler? ☕️⌨️',
    createdAt: '6 saat önce',
    stats: { likes: 45, comments: 8, reposts: 2, shares: 1 },
    media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop' }]
  }),
  new Post({
    id: 'p6',
    author: userList[13], // Metehan
    content: 'Birazdan yayındayız! Minecraft Survival serisinin yeni bölümü geliyor. Kaçırmayın! 🔴',
    createdAt: '10 dk önce',
    stats: { likes: 890, comments: 120, reposts: 50, shares: 30 }
  })
];

// Final synchronization: link posts to users' myPosts list
postList.forEach(post => {
  if (post.author) {
    const user = userList.find(u => u.username === post.author?.username);
    if (user) {
      if (!user.myPosts.some(p => p.id === post.id)) {
        user.myPosts.push(post);
      }
    }
  }
});

// Seed some notifications for Berkay
const berkay = userList[0];
if (berkay) {
  berkay.notifications = [
    new Notification({
      id: 'n1',
      type: 'like',
      title: 'Gönderin Beğenildi',
      message: 'MythX gönderini beğendi.',
      sender: userList[1],
      createdAt: '2 dk önce',
      isRead: false
    }),
    new Notification({
      id: 'n2',
      type: 'comment',
      title: 'Yeni Yorum',
      message: 'EnginCan gönderine yorum yaptı: "Harika görünüyor!"',
      sender: userList[4],
      createdAt: '1 saat önce',
      isRead: false
    }),
    new Notification({
      id: 'n3',
      type: 'group_invite',
      title: 'Grup Daveti',
      message: 'Code Masters grubuna davet edildin.',
      sender: userList[2],
      createdAt: '3 saat önce',
      isRead: true
    }),
    new Notification({
      id: 'n4',
      type: 'system',
      title: 'Sistem Güncellemesi',
      message: 'ARMOYU V3 Beta 1.2 sürümüne güncellendi.',
      createdAt: '1 gün önce',
      isRead: true
    })
  ];
}
