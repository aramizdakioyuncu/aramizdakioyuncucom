import 'package:aramizdakioyuncucom/app/modules/group/_main/views/group_view.dart';
import 'package:aramizdakioyuncucom/app/modules/group/groupdetail/views/groupdetail_view.dart';
import 'package:get/get.dart';

class GroupModule {
  static const route = '/gruplar';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const GroupView(),
    ),
    GetPage(
      name: "$route/search/:search",
      page: () => const GroupView(),
    ),
    GetPage(
      name: "$route/:group",
      page: () => const GroupdetailView(),
    ),
  ];
}
