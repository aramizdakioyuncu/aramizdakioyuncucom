import 'package:aramizdakioyuncucom/app/services/audiorecorder_service.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:record/record.dart';

class ControlpanelController extends GetxController {
  var pageController = PageController().obs;

  late AudioRecorderService soundchat;

  soundChat() async {
    soundchat = AudioRecorderService();
    List<InputDevice> mics = await soundchat.listMicrophones();
    soundchat.setMicrophone(mics[mics.length - 1]);
    await soundchat.startRecording();
  }

  @override
  void onInit() {
    super.onInit();

    soundChat();
  }
}
