import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/chat_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/my_group_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_widgets/data/models/Chat/chat.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BodyController extends GetxController {
  Rxn<Widget> widgetchat = Rxn();
  Rxn<Widget> widgetchatdetail = Rxn();

  Rxn<List<Chat>> chatdetails = Rxn();

  Rxn<List<APIMyGroupList>> mygroups = Rxn();

  @override
  void onInit() {
    super.onInit();

    widgetchat.value = ChatWidget.chatlistWidget(Get.context, chatdetails);

    widgetchatdetail.value =
        ChatWidget.chatdetailWidgets(Get.context!, chatdetails);

    fetchmygroup();
  }

  fetchmygroup() async {
    APIMyGroupListResponse response =
        await ARMOYU.service.profileServices.myGroups();

    if (!response.result.status) {
      return;
    }
    mygroups.value ??= [];
    for (APIMyGroupList element in response.response!) {
      mygroups.value!.add(element);
    }
  }
}
