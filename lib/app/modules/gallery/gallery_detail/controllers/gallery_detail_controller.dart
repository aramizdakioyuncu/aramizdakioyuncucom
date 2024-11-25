import 'dart:developer';

import 'package:get/get.dart';

class GalleryDetailController extends GetxController {
  final gallery = Get.parameters['gallery'];

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();

    log(gallery.toString());
  }
}
