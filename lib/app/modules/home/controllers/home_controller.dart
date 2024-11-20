import 'dart:developer';

import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/media.dart';
import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  var usernameController = TextEditingController().obs;
  var userpassController = TextEditingController().obs;

  @override
  void onInit() {
    super.onInit();
  }

  login() async {
    Map<String, dynamic> response =
        await ARMOYU.service.authServices.previuslogin(
      username: usernameController.value.text,
      password: userpassController.value.text,
    );

    if (response['durum'] == 0) {
      return;
    }
    log(response['icerik'].toString());

    Applist.currentUser.value = User(
      userID: response['icerik']['playerID'],
      displayName: Rx<String>(response['icerik']['displayName']),
      avatar: Media(
        mediaID: response['icerik']['avatar']['media_ID'],
        mediaURL: MediaURL(
          bigURL: Rx<String>(response['icerik']['avatar']['media_bigURL']),
          normalURL: Rx<String>(response['icerik']['avatar']['media_URL']),
          minURL: Rx<String>(response['icerik']['avatar']['media_minURL']),
        ),
      ),
    );

    Applist.currentUser.refresh();

    Get.back();
  }
}
