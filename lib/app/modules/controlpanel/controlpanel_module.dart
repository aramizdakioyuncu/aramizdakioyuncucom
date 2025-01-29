import 'package:aramizdakioyuncucom/app/modules/controlpanel/_main/views/controlpanel_view.dart';
import 'package:get/get.dart';

class ControlpanelModule {
  static const route = '/controlpanel';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const ControlpanelView(),
    ),
  ];
}
