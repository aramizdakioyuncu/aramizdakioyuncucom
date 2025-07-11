import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';

class AccountdeleteView extends StatelessWidget {
  const AccountdeleteView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: SizedBox(
            width: double.infinity,
            child: Column(
              children: [
                const Text(
                  'Bu sayfa, Aramızdaki Oyuncu mobil uygulaması kullanıcılarının hesaplarını silmeleri için hazırlanmıştır.',
                  style: TextStyle(fontSize: 16),
                ),
                const SizedBox(height: 24),
                const Text(
                  'Hesap Silme Talimatları',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                const Text('1. Web sitemize giriş yapın ve profilinize gidin.'),
                const Text('2. Profil sayfanızda "Ayarlar" butonuna tıklayın.'),
                const Text('3. Açılan panelde "Hesabımı Sil" butonuna basın.'),
                const Text(
                    '4. Hesabınızı kalıcı olarak silmek istediğinizi onaylayın.'),
                const SizedBox(height: 16),
                const Text(
                  'Uyarı: Hesabınızın silinmesi 30 gün içinde giriş yapmazsanız kesinleşir. Bu süre zarfında giriş yaparsanız işlem iptal edilir.',
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 24),
                const Text(
                  'Silinen Veriler',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                const Text('- Ad, e-posta gibi kişisel bilgileriniz'),
                const Text('- Profil bilgileriniz ve içerikleriniz'),
                const SizedBox(height: 8),
                const Text(
                  'Not: Yasal gereklilikler veya iş ihtiyaçları nedeniyle bazı veriler belirli bir süre boyunca saklanabilir.',
                  style: TextStyle(fontStyle: FontStyle.italic),
                ),
                const SizedBox(height: 24),
                const Text(
                  'İletişim',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                GestureDetector(
                  onTap: () {
                    // Mailto linkini çalıştırmak istersen url_launcher kullan.
                  },
                  child: const Text(
                    'yonetimekibi@aramizdakioyuncu.com',
                    style: TextStyle(color: Colors.blue),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
