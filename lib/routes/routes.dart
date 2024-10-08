import 'package:aramizdakioyuncucom/modules/home/home_module.dart';
import 'package:aramizdakioyuncucom/modules/splash/splash_modules.dart';

class AppPages {
  static const initial = SplashModule.route;

  static final routes = [
    ...SplashModule.routes,
    ...HomeModule.routes,
  ];
}
