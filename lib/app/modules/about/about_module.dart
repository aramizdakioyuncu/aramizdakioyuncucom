import 'package:aramizdakioyuncucom/app/modules/about/views/about_view.dart';
import 'package:get/get.dart';

class AboutModule {
  static const route = '/hakkimizda';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const AboutView(),
    ),
  ];
}
