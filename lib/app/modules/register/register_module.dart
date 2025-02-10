import 'package:aramizdakioyuncucom/app/modules/register/views/register_view.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:get/get.dart';

class RegisterModule {
  static const route = Routes.REGISTER;

  static final routes = [
    GetPage(
      name: route,
      page: () => const RegisterView(),
    ),
  ];
}
