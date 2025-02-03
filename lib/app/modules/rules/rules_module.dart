import 'package:aramizdakioyuncucom/app/modules/rules/views/rules_view.dart';
import 'package:get/get_navigation/src/routes/get_route.dart';

class RulesModule {
  static const route = '/kurallarimiz';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const RulesView(),
    ),
  ];
}
