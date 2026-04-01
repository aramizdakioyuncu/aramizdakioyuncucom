import { Product } from '@/models';

export const MOCK_PRODUCTS = [
  new Product({ 
    id: '1', 
    name: 'Premium VIP Üyelik', 
    category: 'Üyelik', 
    description: 'ARMOYU platformunda en üst düzey deneyim için tasarlanmıştır. Özel rozetler, öncelikli destek ve %20 daha fazla TP kazanırsınız.', 
    price: 149.90, 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', 
    isFeatured: true, 
    badge: 'EN POPÜLER',
    stock: 999
  }),
  new Product({ 
    id: '2', 
    name: '1000 ARMOYU Coin', 
    category: 'Oyun İçi', 
    description: 'Market alışverişlerinde ve özel etkinliklerde kullanabileceğiniz dijital para birimidir.', 
    price: 49.00, 
    image: 'https://images.unsplash.com/photo-1621416848469-8c2033bc699b?w=800&q=80',
    stock: 9999
  }),
  new Product({ 
    id: '3', 
    name: 'Elite Minecraft Paketi', 
    category: 'Oyun İçi', 
    description: 'Minecraft sunucularımızda kullanabileceğiniz efsanevi ekipmanlar ve özel bloklar içerir.', 
    price: 89.90, 
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    stock: 50
  }),
  new Product({ 
    id: '4', 
    name: 'ARMOYU Kapşonlu (Siyah)', 
    category: 'Giyim', 
    description: 'Yüksek kaliteli pamuklu kumaş, şık ARMOYU nakışı ile günlük giyimde fark yaratın.', 
    price: 599.00, 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    stock: 25
  }),
  new Product({ 
    id: '5', 
    name: 'Efsanevi Kasa Anahtarı', 
    category: 'Oyun İçi', 
    price: 25.00, 
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    stock: 500
  }),
  new Product({ 
    id: '6', 
    name: 'Discord Özel Rolü', 
    category: 'Üyelik', 
    price: 19.90, 
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
    stock: 1000
  })
];

export const MOCK_NEWS = [
  {
    slug: 'armoyu-v3-yayinda',
    title: 'ARMOYU V3 Sistemleri Yayına Girdi!',
    excerpt: 'Uzun süredir beklenen ARMOYU V3 sistemlerimiz artık yayında. Yepyeni bir dashboard konsepti sizi bekliyor.',
    content: `
      <p>ARMOYU topluluğu için heyecan verici bir dönemin kapılarını aralıyoruz. Uzun süredir üzerinde çalıştığımız V3 güncellemesi artık tüm sunucularımızda ve web platformumuzda yayında. Bu güncelleme sadece görsel bir değişim değil, aynı zamanda altyapısal bir devrimi de beraberinde getiriyor.</p>
      <h2>Yepyeni Bir Kullanıcı Deneyimi</h2>
      <p>Modern web teknolojilerini kullanarak baştan aşağı yenilediğimiz arayüzümüzle artık çok daha hızlı ve akıcı bir deneyim sunuyoruz. Glassmorphism tasarım dilini benimseyerek hem estetik hem de işlevsel bir yapı oluşturduk.</p>
      <blockquote>"Bu güncellemenin temel odağı kullanıcılarımızın birbiriyle daha kolay etkileşim kurabilmesi ve içeriklere saniyeler içinde ulaşabilmesiydi."</blockquote>
      <h2>Öne Çıkan Yeni Özellikler</h2>
      <ul>
        <li><strong>Yeni Dashboard:</strong> Tamamen özelleştirilebilir bileşenlerle dolu ana sayfanız.</li>
        <li><strong>Hızlı Profil Yükleme:</strong> Profil sayfaları artık %40 daha hızlı açılıyor.</li>
        <li><strong>Gelişmiş Grup Sistemi:</strong> Klan ve takım yönetimleri artık çok daha detaylı.</li>
      </ul>
    `,
    author: 'Berkay Tikenoğlu',
    authorUsername: 'berkaytikenoglu',
    date: '31 Mart 2024',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    category: 'Güncelleme'
  },
  {
    slug: 'yeni-donem-basliyor',
    title: 'Toplulukta Yeni Bir Dönem Başlıyor',
    excerpt: 'ARMOYU olarak topluluğumuzu bir üst seviyeye taşımak için yeni stratejilerimizi açıklıyoruz.',
    content: `
      <p>ARMOYU olarak topluluğumuzu bir üst seviyeye taşımak için yeni stratejilerimizi açıklıyoruz. Gelecek vizyonumuzda daha fazla oyun sunucusu ve daha geniş bir etkinlik takvimi yer alıyor.</p>
      <p>Yeni yılda yapacağımız turnuvalar ve özel buluşmalar ile Türkiye'nin en aktif oyun topluluğu olma yolunda ilerliyoruz.</p>
    `,
    author: 'Alperen',
    authorUsername: 'alperen_admin',
    date: '30 Mart 2024',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
    category: 'Duyuru'
  }
];
