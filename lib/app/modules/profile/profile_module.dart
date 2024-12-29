import 'package:aramizdakioyuncucom/app/modules/profile/views/profile_view.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:get/get.dart';

class ProfileModule {
  static const route = Routes.PROFILE;

  static final List<GetPage> routes = [
    GetPage(
      name: "$route/:username",
      page: () => const ProfileView(),
    ),
  ];
}
