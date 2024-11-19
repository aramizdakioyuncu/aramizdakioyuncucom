import 'dart:developer';

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

    Applist.currentUser = User(userID: 1);
    log(response['icerik']);
  }
}
