import 'dart:developer';

import 'package:get/get.dart';

class GalleryDetailController extends GetxController {
  var gallery = Get.parameters['gallery'];
  var page = Get.parameters['page'];

  @override
  void onInit() {
    super.onInit();

    log(gallery.toString());

    page ??= "1";
  }
}
