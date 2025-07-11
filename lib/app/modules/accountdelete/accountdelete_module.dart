import 'package:aramizdakioyuncucom/app/modules/accountdelete/views/accountdelete_view.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:get/get.dart';

class AccountdeleteModule {
  static const route = Routes.ACCOUNT_DELETE;

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const AccountdeleteView(),
    ),
  ];
}
