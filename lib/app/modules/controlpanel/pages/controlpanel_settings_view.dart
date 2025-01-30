import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';

class ControlpanelSettingsView extends StatelessWidget {
  const ControlpanelSettingsView({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController textEditingController = TextEditingController();

    textEditingController.text = """ <h1 class="mt-4">Gizlilik Politikası</h1>
<p class="lead"><em>Son Güncelleme Tarihi: 01.01.2022</em></p>
<h5>1-Toplanan Kişisel Verileriniz, Toplanma Yöntemi ve Hukuki Sebebi</h5>
<p>IP adresiniz ve kullanıcı aracısı bilgileriniz, sadece analiz yapmak amacıyla ve çerezler (cookies) vb. teknolojiler vasıtasıyla, otomatik veya otomatik olmayan yöntemlerle ve bazen de analitik sağlayıcılar, reklam ağları, arama bilgi sağlayıcıları, teknoloji sağlayıcıları gibi üçüncü taraflardan elde edilerek, kaydedilerek, depolanarak ve güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde ve süresince, meşru menfaat işleme şartına dayanılarak işlenecektir.</p>
<h5>2-Kişisel Verilerinizin İşlenme Amacı</h5>
<p>Bizimle paylaştığınız kişisel verileriniz sadece analiz yapmak suretiyle; sunduğumuz hizmetlerin gerekliliklerini en iyi şekilde yerine getirebilmek, bu hizmetlere sizin tarafınızdan ulaşılabilmesini ve maksimum düzeyde faydalanılabilmesini sağlamak, hizmetlerimizi, ihtiyaçlarınız doğrultusunda geliştirebilmek ve sizleri daha geniş kapsamlı hizmet sağlayıcıları ile yasal çerçeveler içerisinde buluşturabilmek ve kanundan doğan zorunlulukların (kişisel verilerin talep halinde adli ve idari makamlarla paylaşılması) yerine getirilebilmesi amacıyla, sözleşme ve hizmet süresince, amacına uygun ve ölçülü bir şekilde işlenecek ve güncellenecektir.</p>
<h5>3-Toplanan Kişisel Verilerin Kimlere ve Hangi Amaçlarla Aktarılabileceği</h5>
<p>Bizimle paylaştığınız kişisel verileriniz; faaliyetlerimizi yürütmek üzere hizmet aldığımız ve/veya verdiğimiz, sözleşmesel ilişki içerisinde bulunduğumuz, iş birliği yaptığımız, yurt içi ve yurt dışındaki 3. şahıslar ile kurum ve kuruluşlara ve talep halinde adli ve idari makamlara, gerekli teknik ve idari önlemler alınması koşulu ile aktarılabilecektir.</p>
<h5>4-Kişisel Verilerin İşlenmesi ve Kullanıcı Hakları</h5>
<p>KVKK madde 11 uyarınca, herkes, veri sorumlusuna başvurarak aşağıdaki haklarını kullanabilir:</p>
<ul>
<li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
<li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
<li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
<li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
<li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
<li>Kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
<li>(e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
<li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
<li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</li>
</ul>
<p>Bu haklarınızı kullanmak üzere <a href="mailto:yonetimekibi@aramizdakioyuncu.com">yonetimekibi@aramizdakioyuncu.com</a> e-posta adresi üzerinden veya +90 537 058 51 50 numaralı telefon ile bizimle iletişime geçebilirsiniz.</p>
<h5>5-Kullanıcı Tarafından Oluşturulan İçerikler</h5>
<p>5.1. Kullanıcılar tarafından oluşturulan içeriklerin aramizdakioyuncu.com (ARMOYU) kullanıcı sözleşmesi/gizlilik politikasına aykırı olduğu durumlarda, kullanıcıya bildirilmeksizin:</p>
<ul>
<li>İçeriğin kaldırılması,</li>
<li>Hesabın kapatılması,</li>
<li>Hesabın askıya alınması,</li>
<li>Adli merci ve kolluk kuvvetlerine başvurma (gerekli görülürse),</li>
</ul>
<p>işlemlerinden birisi veya birden fazlası gerçekleştirilebilir.</p>
<p>5.2. Kullanıcılar tarafından oluşturulan içeriklerin hizmetlere aykırı olduğu durumlarda içeriğin:</p>
<ul>
<li>Amacına aykırı hizmet etmesi,</li>
<li>Haksız kazanç sağlaması,</li>
<li>Yasa dışı faaliyetlerde bulunması,</li>
<li>İzinsiz finansal faaliyetlerde bulunması,</li>
<li>Çocukların tehlikeye atılması,</li>
<li>Gerçek parayla kumar oynama/yarışma da bulunması,</li>
<li>Uygunsuz/müstehcen görsel/metin bulunması,</li>
</ul>
<p>gibi maddelerden bir veya birkaçını içeriyorsa, gerekli görülürse işlemler uygulanır.</p>
<h5>6-Fikri Mülkiyet Hakları İhlali ve Kimlik Hırsızlığı</h5>
<p>Kullanıcılar tarafından oluşturulan içeriklerin fikri mülkiyet haklarına ihlal edilmesi veya kimlik hırsızlığı girişimlerinde bulunulması durumunda, aramizdakioyuncu.com gerekli önlemleri alacaktır.</p>
<h5>7-İtiraz İşlemleri</h5>
<p>Kullanıcı olarak içeriğin aramizdakioyuncu.com kullanıcı sözleşmesi/gizlilik politikasına aykırı olduğu durumlarda:</p>
<ul>
<li>İçeriği bildirme,</li>
<li>Kullanıcıyı bildirme,</li>
<li>Profili bildirme,</li>
</ul>
<p>gibi işlemlerden lütfen kaçınmayınız. İtirazınızı iletmek için gerekli iletişim bilgilerine başvurabilirsiniz.</p>
<h5>8-İletişim/Destek/Bildirim</h5>
<p>Gizlilik ve kişisel verilerin işlenmesi politikasına ilişkin ayrıntılı bilgi almak veya iletişim kurmak için aşağıdaki bilgileri kullanabilirsiniz:</p>
<ul>
<li>Web: <a href="https://aramizdakioyuncu.com">aramizdakioyuncu.com</a></li>
<li>E-posta: <a href="mailto:yonetimekibi@aramizdakioyuncu.com">yonetimekibi@aramizdakioyuncu.com</a></li>
<li>Telefon: +90 537 058 51 50</li>
</ul>
<p>Bu bilgiler, kullanıcı gizliliği ve veri güvenliği konularında bilgi sağlamak için kullanılır. İlgili politikalara uymak ve kullanıcılara en iyi hizmeti sunmak amacıyla düzenli olarak güncellenir.</p> """;
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          ARMOYU.widget.textField.costum3(
            controller: textEditingController,
            minLines: 20,
            onChanged: (val) {},
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: ARMOYU.widget.elevatedButton.costum1(
              text: "Güncelle",
              onPressed: () {},
              loadingStatus: false,
            ),
          )
        ],
      ),
    );
  }
}
