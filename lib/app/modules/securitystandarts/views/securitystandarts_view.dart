import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';

class SecuritystandartsView extends StatelessWidget {
  const SecuritystandartsView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        const SizedBox(
          width: double.infinity,
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text(
                  'Aramızdaki Oyuncu uygulaması, çocukların çevrimiçi güvenliğini ciddiye alır. Bu sayfa, çocuklara yönelik olası tehlikelerle ilgili politikalarımızı ve alınan önlemleri açıklamaktadır.',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 24),
                Text(
                  'Çocuk Güvenliğini Sağlamaya Yönelik Politikalarımız',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Text(
                    '• Kullanıcı profilleri ve içerikler moderasyon sisteminden geçer.'),
                Text(
                    '• Şüpheli etkinlikler için otomatik filtreleme ve raporlama araçları mevcuttur.'),
                Text(
                    '• 13 yaş altındaki kullanıcıların uygulamayı kullanması yasaktır.'),
                Text(
                    '• Her kullanıcı, başka bir kullanıcıyı şikayet edebilir ve engelleyebilir.'),
                SizedBox(height: 24),
                Text(
                  'CSAE (Çocukların Cinsel İstismarı ve Sömürüsü) ile Mücadele',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Text(
                    'Her türlü cinsel istismar, çocuk istismarı veya uygunsuz içerik, derhal tespit edilir ve yetkili mercilere bildirilir. Uygulamamız, bu tür içerikleri tespit etmek için otomatik tarama ve kullanıcı bildirim sistemlerini kullanmaktadır.'),
                SizedBox(height: 8),
                Text(
                  'Tüm CSAE politikalarımız, Google Play Çocuk Güvenliği Politikası ile uyumludur.',
                  style: TextStyle(fontStyle: FontStyle.italic),
                ),
                SizedBox(height: 24),
                Text(
                  'İletişim',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Text(
                    'Bu politika hakkında daha fazla bilgi için bizimle iletişime geçin:'),
                SizedBox(height: 8),
                Text('E-posta: yonetimekibi@aramizdakioyuncu.com'),
              ],
            ),
          ),
        )
      ],
    );
  }
}
