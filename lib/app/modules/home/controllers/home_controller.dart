import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  @override
  void onInit() {
    super.onInit();
    Functions.cookiesetup();
  }
}
