import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:get/get.dart';

class SplashController extends GetxController {
  @override
  void onInit() {
    super.onInit();

    // 2 saniye bekledikten sonra yönlendirme yap
    Future.delayed(const Duration(seconds: 1), () {
      // Get.toNamed("/home");
      Functions.openUrlWeb("/home");
    });
  }

  void passSecurity() {
    log("asd");
    Get.toNamed("/");
    Functions.openUrlWeb("/home");
  }
}
