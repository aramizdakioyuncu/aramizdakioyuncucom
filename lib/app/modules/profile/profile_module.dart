import 'package:aramizdakioyuncucom/app/modules/profile/views/profile_view.dart';
import 'package:get/get.dart';

class ProfileModule {
  static const route = '/oyuncular';

  static final List<GetPage> routes = [
    GetPage(
      name: "$route/:username",
      page: () => const ProfileView(),
    ),
  ];
}
