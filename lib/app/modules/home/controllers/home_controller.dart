import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  @override
  void onInit() {
    super.onInit();
    if (Functions.box.read('currentUser') != null) {
      Applist.currentUser.value =
          User.fromJson(Functions.box.read('currentUser'));
    }

    if (Applist.currentUser.value == null) {
      Functions.box.remove('userTOKEN');
    }

    if (Functions.box.read('username') != null &&
        Functions.box.read('userTOKEN') != null) {
      Functions.login(
        username: Functions.box.read('username'),
        password: Functions.box.read('userTOKEN'),
      );
    } else {
      Applist.currentUser.value = null;
      Functions.box.remove('userTOKEN');
      Functions.box.remove('currentUser');
    }
  }
}
