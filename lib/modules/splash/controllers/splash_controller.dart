import 'dart:developer';

import 'package:get/get.dart';

class SplashController extends GetxController {
  @override
  void onInit() {
    super.onInit();

    // 2 saniye bekledikten sonra yönlendirme yap
    Future.delayed(const Duration(seconds: 2), () {
      Get.toNamed("/home");
    });
  }

  void passSecurity() {
    log("asd");
    Get.toNamed("/");
  }
}
