import { LegalPage } from '@/components/legal/LegalPage';
import { CookiePreferenceButton } from './CookiePreferenceButton';

export const metadata = { title: 'Çerez Politikası | ARMOYU' };

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Çerez Politikası" updated="6 Kasım 2026">
      <p>
        ARMOYU, tarayıcınızda yalnızca hizmetin çalışması ve sayfaların hızlı açılması için gereken bilgileri saklar. Reklam,
        profil çıkarma ya da üçüncü taraf takip çerezi kullanılmaz.
      </p>

      <h2>Zorunlu</h2>
      <ul>
        <li><strong>Oturum anahtarları</strong> (<code>armoyu_token</code>, <code>armoyu_refresh_token</code>): giriş yaptığınızı
          hatırlamak için. Çıkış yapınca silinir.</li>
        <li><strong>Çerez tercihiniz</strong> (<code>armoyu_cookie_consent</code>): seçiminizi tekrar sormamak için.</li>
        <li><strong>Sepet</strong> (<code>armoyu_cart</code>): mağaza sepetiniz.</li>
        <li><strong>Arayüz tercihleri</strong> (<code>armoyu_theme</code>, <code>armoyu_accent</code>, <code>team_prompt_dismissed_*</code>):
          açık / koyu tema, vurgu rengi ve kapattığınız uyarılar.</li>
        <li><strong>Test seçimi</strong> (<code>armoyu_api_version</code>): deneme sürümünde eski / yeni sistem arasında geçiş.</li>
      </ul>

      <h2>İşlevsel (yalnızca &quot;Tümünü kabul et&quot; seçilirse)</h2>
      <ul>
        <li><strong>İçerik önbelleği</strong> (<code>armoyu.cache.*</code>): akış, hikayeler, sohbetler ve profilinizin son
          hâli; sayfa açılınca anında ve internet yokken de görünmesi için. Medya saklanmaz, yalnızca adresleri.</li>
        <li><strong>Son bakılan profiller</strong> (<code>armoyu.recentProfiles.*</code>): aramada hızlı erişim için en çok 10 profil.</li>
        <li><strong>Çevrimdışı açılış</strong> (service worker): sayfa ve stil dosyalarının internetsiz açılabilmesi için.</li>
      </ul>
      <p>
        Bu veriler yalnızca sizin tarayıcınızda tutulur, kullanıcıya göre ayrılır ve çıkış yapınca silinir.
      </p>

      <h2>Tercihinizi değiştirmek</h2>
      <p>
        Tercihinizi istediğiniz zaman sıfırlayabilirsiniz; bant yeniden görünür. Tarayıcınızın ayarlarından da bu verileri
        silebilirsiniz.
      </p>
      <CookiePreferenceButton />

      <p>
        Kişisel verilerinizin işlenmesi hakkında ayrıntılı bilgi için <a href="/kvkk">KVKK Aydınlatma Metni</a>.
      </p>
    </LegalPage>
  );
}
