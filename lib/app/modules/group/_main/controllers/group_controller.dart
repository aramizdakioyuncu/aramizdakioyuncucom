import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/group/group_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class GroupController extends GetxController {
  var groupsfetchStatus = false.obs;
  var groupList = <APIGroupListDetail>[].obs;
  final groupscategory = Get.parameters['search'];

  @override
  void onInit() {
    super.onInit();

    log(groupscategory.toString());
    fetchgroups();
  }

  fetchgroups() async {
    int? categoryID;

    if (groupscategory != null) {
      if (groupscategory!.toLowerCase() == "e-spor") {
        categoryID = 3;
      }
      if (groupscategory!.toLowerCase() == "spor") {
        categoryID = 4;
      }
      if (groupscategory!.toLowerCase() == "yazilim-gelistirme") {
        categoryID = 5;
      }
    }
    groupsfetchStatus.value = true;
    GroupListResponse response = await ARMOYU.service.groupServices.groupList(
      category: categoryID,
      page: 1,
    );

    if (!response.result.status) {
      return;
    }
    log(response.response!.groups.length.toString());
    groupList.addAll(response.response!.groups);

    groupsfetchStatus.value = false;
  }
}
