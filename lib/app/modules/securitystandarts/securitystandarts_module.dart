import 'package:aramizdakioyuncucom/app/modules/securitystandarts/views/securitystandarts_view.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:get/get.dart';

class SecuritystandartsModule {
  static const route = Routes.SECURITY_STANDARTS;

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const SecuritystandartsView(),
    ),
  ];
}
