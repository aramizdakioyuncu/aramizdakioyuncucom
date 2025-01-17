import 'package:aramizdakioyuncucom/app/widgets/chat_widget.dart';
import 'package:armoyu_widgets/data/models/Chat/chat.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BodyController extends GetxController {
  Rxn<Widget> widgetchat = Rxn();
  Rxn<Widget> widgetchatdetail = Rxn();
  var chatdetails = <Rxn<Chat>>[].obs;

  @override
  void onInit() {
    super.onInit();

    widgetchat.value = ChatWidget.chatlistWidget(Get.context, chatdetails);

    widgetchatdetail.value =
        ChatWidget.chatdetailWidgets(Get.context!, chatdetails);
  }
}
