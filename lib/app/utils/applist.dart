import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:armoyu_widgets/data/models/user.dart';
import 'package:get/get_rx/src/rx_types/rx_types.dart';

class Applist {
  static Rxn<User?> currentUser = Rxn<User?>();

  static Rx<bool> provicypolity = Rx(false);
  static List defaultslider = [
    "${APIConstants.storageDomain}/galeri/slider/kulup.jpg",
    "${APIConstants.storageDomain}/galeri/slider/clash-of-clans.jpg",
    "${APIConstants.storageDomain}/galeri/images/1orijinal111637792159ufaklik166483443137.png",
    "${APIConstants.storageDomain}/galeri/slider/assetto-corsa-cupv2.jpg",
  ];

  static List footersocailnetwork = [
    "${APIConstants.storageDomain}/galeri/ana-yapi/sosyal-hesaplar/instagram-logo.png",
    "${APIConstants.storageDomain}/galeri/ana-yapi/sosyal-hesaplar/steam-logo.png",
    "${APIConstants.storageDomain}/galeri/ana-yapi/discord-logo.png",
    "${APIConstants.storageDomain}/galeri/ana-yapi/telegram-logo.png",
    "${APIConstants.storageDomain}/galeri/ana-yapi/youtube-logo.png",
    "${APIConstants.storageDomain}/galeri/ana-yapi/facebook-logo.png",
  ];
}
