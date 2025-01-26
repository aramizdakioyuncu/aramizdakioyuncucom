import 'package:aramizdakioyuncucom/app/modules/profile/_main/views/profile_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/charts/views/charts_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/mywritings/_main/views/mywritings_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/mywritings/editwritings/views/editwritings_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/support/_main/views/support_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/support/meetings/views/meetings_view.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/support/reports/views/reports_view.dart';
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
    GetPage(
      name: "$route/:username/bildirilerim",
      page: () => const SupportView(),
    ),
    GetPage(
      name: "$route/:username/bildirilerim/sikayetler/",
      page: () => const ReportsView(),
    ),
    GetPage(
      name: "$route/:username/bildirilerim/sikayetler/:reportID",
      page: () => const ReportsView(),
    ),
    GetPage(
      name: "$route/:username/bildirilerim/oneriler/",
      page: () => const SupportView(),
    ),
    GetPage(
      name: "$route/:username/bildirilerim/oneriler/:suggestionID",
      page: () => const SupportView(),
    ),
    GetPage(
      name: "$route/:username/bildirilerim/toplantilar/",
      page: () => const MeetingsView(),
    ),
    GetPage(
      name: "$route/:username/bildirilerim/toplantilar/:meetingID",
      page: () => const MeetingsView(),
    ),
    GetPage(
      name: "$route/:username/anketler/",
      page: () => const ChartsView(),
    ),
  ];
}
