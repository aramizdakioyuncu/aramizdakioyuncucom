import 'package:aramizdakioyuncucom/app/modules/mod/_main/views/mod_view.dart';
import 'package:aramizdakioyuncucom/app/modules/mod/moddetail/views/moddetail_view.dart';
import 'package:get/get_navigation/src/routes/get_route.dart';

class ModModule {
  static const route = '/modlar';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const ModView(),
    ),
    GetPage(
      name: "$route/:mod",
      page: () => const ModdetailView(),
    ),
  ];
}
