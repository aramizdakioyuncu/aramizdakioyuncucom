import 'package:aramizdakioyuncucom/app/modules/about/about_module.dart';
import 'package:aramizdakioyuncucom/app/modules/accountdelete/accountdelete_module.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/controlpanel_module.dart';
import 'package:aramizdakioyuncucom/app/modules/employee/employee_module.dart';
import 'package:aramizdakioyuncucom/app/modules/events/events_module.dart';
import 'package:aramizdakioyuncucom/app/modules/forum/forum_module.dart';
import 'package:aramizdakioyuncucom/app/modules/gallery/gallery_module.dart';
import 'package:aramizdakioyuncucom/app/modules/group/group_module.dart';
import 'package:aramizdakioyuncucom/app/modules/home/home_module.dart';
import 'package:aramizdakioyuncucom/app/modules/mod/mod_module.dart';
import 'package:aramizdakioyuncucom/app/modules/news/news_module.dart';
import 'package:aramizdakioyuncucom/app/modules/notFound/notFound_module.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/profile_module.dart';
import 'package:aramizdakioyuncucom/app/modules/raffle/raffle_module.dart';
import 'package:aramizdakioyuncucom/app/modules/register/register_module.dart';
import 'package:aramizdakioyuncucom/app/modules/rules/rules_module.dart';
import 'package:aramizdakioyuncucom/app/modules/securitystandarts/securitystandarts_module.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_module.dart';
import 'package:aramizdakioyuncucom/app/modules/splash/splash_modules.dart';

class Routes {
  // ignore: constant_identifier_names
  static const PROFILE = "/oyuncular";
  // ignore: constant_identifier_names
  static const REGISTER = "/kayit-ol";
  // ignore: constant_identifier_names
  static const SHOP = "/magaza";
  // ignore: constant_identifier_names
  static const ACCOUNT_DELETE = "/hesap-silme";
  // ignore: constant_identifier_names
  static const SECURITY_STANDARTS = "/guvenlik-standartlari";
}

class AppPages {
  static const initial = HomeModule.route;

  static final notFound404page = NotfoundModule.routes;
  static final routes = [
    ...AboutModule.routes,
    ...SplashModule.routes,
    ...HomeModule.routes,
    ...ProfileModule.routes,
    ...GroupModule.routes,
    ...GalleryModule.routes,
    ...NewsModule.routes,
    ...RaffleModule.routes,
    ...RulesModule.routes,
    ...ForumModule.routes,
    ...ModModule.routes,
    ...EmployeeModule.routes,
    ...EventsModule.routes,
    ...ControlpanelModule.routes,
    ...RegisterModule.routes,
    ...ShopModule.routes,
    ...AccountdeleteModule.routes,
    ...SecuritystandartsModule.routes,
  ];
}
