import { LegalPage } from '@/components/legal/LegalPage';

export const metadata = { title: 'KVKK Aydınlatma Metni | ARMOYU' };

// Köşeli parantezli alanlar veri sorumlusunun bilgileriyle doldurulmalı; metin yayından önce hukukçuya gösterilmeli
export default function KvkkPage() {
  return (
    <LegalPage title="KVKK Aydınlatma Metni" updated="6 Kasım 2026">
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, ARMOYU platformunu (aramizdakioyuncu.com
        ve bağlı uygulamalar) kullanırken kişisel verilerinizin hangi amaçlarla ve nasıl işlendiğini aşağıda bilgilerinize sunarız.
      </p>

      <h2>1. Veri sorumlusu</h2>
      <p>
        [Veri sorumlusunun unvanı], [adres]. İletişim: [e-posta adresi]. KEP: [varsa KEP adresi].
      </p>

      <h2>2. İşlenen kişisel veriler</h2>
      <ul>
        <li><strong>Kimlik ve hesap:</strong> ad, soyad, kullanıcı adı, şifrenin geri döndürülemez özeti.</li>
        <li><strong>İletişim:</strong> e-posta adresi, telefon numarası (verdiyseniz).</li>
        <li><strong>Profil:</strong> profil ve kapak fotoğrafı, hakkında yazısı, doğum tarihi, memleket, eğitim, favori takım,
          ruh eşi ve profilinize eklediğiniz diğer bilgiler (görünürlüğünü siz seçersiniz).</li>
        <li><strong>Paylaşım ve iletişim içerikleri:</strong> paylaşımlar, yorumlar, hikayeler, mesajlar, sorular ve cevaplar,
          Bulut&apos;a yüklediğiniz dosyalar, grup, etkinlik ve forum içerikleri.</li>
        <li><strong>İşlem güvenliği:</strong> IP adresi, oturum ve giriş kayıtları, cihaz / tarayıcı bilgisi.</li>
        <li><strong>Alışveriş:</strong> mağaza siparişleri, teslimat adresi; ödeme kart bilgileri bizde tutulmaz, ödeme
          kuruluşu (PayTR) tarafından işlenir.</li>
      </ul>

      <h2>3. İşleme amaçları ve hukuki sebepler</h2>
      <ul>
        <li>Üyeliğin kurulması ve hizmetin sunulması: sözleşmenin kurulması ve ifası (KVKK m.5/2-c).</li>
        <li>Hesap güvenliği, kötüye kullanımın önlenmesi, şikayetlerin incelenmesi: meşru menfaat (m.5/2-f) ve hukuki
          yükümlülük (m.5/2-ç).</li>
        <li>Bildirimler (uygulama içi, e-posta, SMS, anlık bildirim): sözleşmenin ifası; tanıtım amaçlı iletiler yalnızca
          açık rızanızla.</li>
        <li>Mevzuattan doğan saklama ve bildirim yükümlülükleri (ör. 5651 sayılı Kanun kapsamındaki trafik kayıtları):
          hukuki yükümlülük (m.5/2-ç).</li>
      </ul>

      <h2>4. Aktarım</h2>
      <p>
        Verileriniz yalnızca yukarıdaki amaçlar için ve gerektiği ölçüde; altyapı ve barındırma hizmeti aldığımız tedarikçilere
        ([barındırma sağlayıcısı ve sunucuların bulunduğu ülke]), ödeme kuruluşuna, SMS / e-posta / anlık bildirim
        hizmet sağlayıcılarına ve yasal olarak yetkili kamu kurumlarına aktarılabilir. Yurt dışına aktarım söz konusu olduğunda
        KVKK m.9&apos;daki şartlara uyulur.
      </p>

      <h2>5. Toplama yöntemi</h2>
      <p>
        Veriler, kayıt ve profil formları, paylaşım ve mesajlaşma özellikleri ile kullanım sırasında oluşan teknik kayıtlar
        aracılığıyla elektronik ortamda toplanır. Tarayıcıda saklanan veriler için <a href="/cerez-politikasi">Çerez
        Politikası</a>&apos;na bakınız.
      </p>

      <h2>6. Saklama süresi</h2>
      <p>
        Veriler üyeliğiniz süresince ve mevzuattaki zamanaşımı / saklama süreleri boyunca tutulur; süre dolunca silinir, yok
        edilir ya da anonim hale getirilir.
      </p>

      <h2>7. Haklarınız (KVKK m.11)</h2>
      <ul>
        <li>Verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi isteme,</li>
        <li>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Eksik ya da yanlış işlenmişse düzeltilmesini, şartları oluşmuşsa silinmesini isteme ve bunların aktarılan
          kişilere bildirilmesini isteme,</li>
        <li>Otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme,</li>
        <li>Kanuna aykırı işleme nedeniyle zarara uğradıysanız zararın giderilmesini talep etme.</li>
      </ul>
      <p>
        Başvurularınızı [e-posta adresi] adresine ya da [adres]&apos;e yazılı olarak iletebilirsiniz. Başvurular en geç 30
        gün içinde ücretsiz olarak sonuçlandırılır.
      </p>
    </LegalPage>
  );
}
