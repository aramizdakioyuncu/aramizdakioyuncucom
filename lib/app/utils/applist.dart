import 'package:aramizdakioyuncucom/app/models/user.dart';
import 'package:get/get_rx/src/rx_types/rx_types.dart';

class Applist {
  static Rxn<User?> currentUser = Rxn<User?>();

  static Rx<bool> provicypolity = Rx(false);
  static List defaultslider = [
    "https://aramizdakioyuncu.com/galeri/slider/kulup.jpg",
    "https://aramizdakioyuncu.com/galeri/slider/clash-of-clans.jpg",
    "https://aramizdakioyuncu.com/galeri/images/1orijinal111637792159ufaklik166483443137.png",
    "https://aramizdakioyuncu.com/galeri/slider/assetto-corsa-cupv2.jpg",
  ];

  static List footersocailnetwork = [
    "https://aramizdakioyuncu.com/galeri/ana-yapi/sosyal-hesaplar/instagram-logo.png",
    "https://aramizdakioyuncu.com/galeri/ana-yapi/sosyal-hesaplar/steam-logo.png",
    "https://aramizdakioyuncu.com/galeri/ana-yapi/discord-logo.png",
    "https://aramizdakioyuncu.com/galeri/ana-yapi/telegram-logo.png",
    "https://aramizdakioyuncu.com/galeri/ana-yapi/youtube-logo.png",
    "https://aramizdakioyuncu.com/galeri/ana-yapi/facebook-logo.png",
  ];
}
