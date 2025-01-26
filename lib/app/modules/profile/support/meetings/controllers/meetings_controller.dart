import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MeetingsController extends GetxController {
  var meetingnameController = TextEditingController().obs;
  var meetingdescriptionController = TextEditingController().obs;
  var meetingProccess = false.obs;

  Future<void> meetingfunction() async {
    if (meetingProccess.value) {
      return;
    }
    meetingProccess.value = true;

    await Future.delayed(const Duration(seconds: 2), () {
      Get.snackbar("Toplantı", "Toplantıya katıldınız");
    });
    meetingProccess.value = false;
  }
}
