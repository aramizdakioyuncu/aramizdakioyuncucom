import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GroupMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    final group = Get.parameters['group'];
    log(group.toString());
    if (group == null) {
      // Get.toNamed("/");
    }
    return null;
  }
}
