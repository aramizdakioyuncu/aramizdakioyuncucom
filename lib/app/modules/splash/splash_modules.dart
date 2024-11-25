import 'package:aramizdakioyuncucom/app/modules/splash/bindings/splash_binding.dart';
import 'package:aramizdakioyuncucom/app/modules/splash/views/splash_view.dart';
import 'package:get/get.dart';

class SplashModule {
  static const route = '/splash';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const SplashView(),
      binding: SplashBinding(),
    ),
  ];
}
