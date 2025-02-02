import 'package:aramizdakioyuncucom/app/modules/employee/views/employee_view.dart';
import 'package:get/get.dart';

class EmployeeModule {
  static const route = '/ekibimiz';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const EmployeeView(),
    ),
    GetPage(
      name: "$route/okul-temsilcileri",
      page: () => const EmployeeView(),
    ),
  ];
}
