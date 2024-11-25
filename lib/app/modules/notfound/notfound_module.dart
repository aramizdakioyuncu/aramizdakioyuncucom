import 'package:aramizdakioyuncucom/app/modules/notfound/views/notfound_view.dart';
import 'package:get/get.dart';

class NotfoundModule {
  static const route = '/404';

  static final routes = [
    GetPage(
      name: route,
      page: () => const NotfoundView(),
    ),
  ];
}
