import 'package:aramizdakioyuncucom/app/modules/profile/_main/views/profile_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/mywritings/_main/views/mywritings_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/mywritings/editwritings/views/editwritings_view.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:get/get.dart';

class ProfileModule {
  static const route = Routes.PROFILE;

  static final List<GetPage> routes = [
    GetPage(
      name: "$route/:username",
      page: () => const ProfileView(),
    ),
    GetPage(
      name: "$route/:username/yazilarim",
      page: () => const MywritingsView(),
    ),
    GetPage(
      name: "$route/:username/yazilarim/:newsID",
      page: () => const EditwritingsView(),
    ),
  ];
}
