import 'package:aramizdakioyuncucom/app/modules/employee/employee_module.dart';
import 'package:aramizdakioyuncucom/app/modules/forum/forum_module.dart';
import 'package:aramizdakioyuncucom/app/modules/gallery/gallery_module.dart';
import 'package:aramizdakioyuncucom/app/modules/group/group_module.dart';
import 'package:aramizdakioyuncucom/app/modules/home/home_module.dart';
import 'package:aramizdakioyuncucom/app/modules/mod/mod_module.dart';
import 'package:aramizdakioyuncucom/app/modules/news/news_module.dart';
import 'package:aramizdakioyuncucom/app/modules/notFound/notFound_module.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/profile_module.dart';
import 'package:aramizdakioyuncucom/app/modules/raffle/raffle_module.dart';
import 'package:aramizdakioyuncucom/app/modules/splash/splash_modules.dart';

class Routes {
  // ignore: constant_identifier_names
  static const PROFILE = "/oyuncular";
}

class AppPages {
  static const initial = HomeModule.route;

  static final notFound404page = NotfoundModule.routes;
  static final routes = [
    ...SplashModule.routes,
    ...HomeModule.routes,
    ...ProfileModule.routes,
    ...GroupModule.routes,
    ...GalleryModule.routes,
    ...NewsModule.routes,
    ...RaffleModule.routes,
    ...ForumModule.routes,
    ...ModModule.routes,
    ...EmployeeModule.routes,
  ];
}
