import 'package:aramizdakioyuncucom/app/modules/group/group_module.dart';
import 'package:aramizdakioyuncucom/app/modules/home/home_module.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/profile_module.dart';
import 'package:aramizdakioyuncucom/app/modules/splash/splash_modules.dart';

class AppPages {
  static const initial = SplashModule.route;

  static final routes = [
    ...SplashModule.routes,
    ...HomeModule.routes,
    ...ProfileModule.routes,
    ...GroupModule.routes,
  ];
}
