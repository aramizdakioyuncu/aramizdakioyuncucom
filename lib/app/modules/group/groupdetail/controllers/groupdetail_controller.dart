import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';

import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_services/core/models/ARMOYU/user.dart' as armoyuuser;
import 'package:armoyu_widgets/data/models/ARMOYU/group.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/role.dart';
import 'package:armoyu_widgets/data/models/user.dart';

import 'package:get/get.dart';

class GroupdetailController extends GetxController {
  final groupscategory = Get.parameters['group'];

  Rxn<Group> groupInfo = Rxn<Group>();
  Rxn<List<User>> groupusers = Rxn<List<User>>();

  @override
  void onInit() {
    super.onInit();
    log(groupscategory.toString());
    fetchgroupInfo();
    fetchgroupusers();
  }

  fetchgroupInfo() async {
    if (groupscategory == null) {
      return;
    }
    GroupDetailResponse response =
        await ARMOYU.service.groupServices.groupFetch(
      groupname: groupscategory,
    );

    if (!response.result.status) {
      return;
    }

    log(response.response!.groupName.toString());

    groupInfo.value = Group(
      groupID: response.response!.groupID,
      description: response.response!.groupDescription,
      groupLogo: Media(
        mediaID: response.response!.groupID,
        mediaURL: MediaURL(
          bigURL: Rx(response.response!.groupLogo.bigURL),
          normalURL: Rx(response.response!.groupLogo.normalURL),
          minURL: Rx(response.response!.groupLogo.minURL),
        ),
      ),
      groupBanner: Media(
        mediaID: response.response!.groupID,
        mediaURL: MediaURL(
          bigURL: Rx(response.response!.groupBanner.bigURL),
          normalURL: Rx(response.response!.groupBanner.normalURL),
          minURL: Rx(response.response!.groupBanner.minURL),
        ),
      ),
      groupName: response.response!.groupName,
      // groupUsers: response.response!
    );
  }

  fetchgroupusers() async {
    if (groupscategory == null) {
      return;
    }
    GroupUsersResponse response =
        await ARMOYU.service.groupServices.groupusersFetch(
      groupname: groupscategory,
    );

    groupusers.value = <User>[];
    if (!response.result.status) {
      return;
    }
    for (armoyuuser.UserInfo element in response.response!.user) {
      groupusers.value!.add(
        User(
          avatar: Media(
            mediaID: element.userID,
            mediaURL: MediaURL(
              bigURL: Rx(element.avatar.bigURL),
              normalURL: Rx(element.avatar.normalURL),
              minURL: Rx(element.avatar.minURL),
            ),
          ),
          displayName: Rx(element.displayname),
          userName: Rx(element.username!),
          role: Role(roleID: 0, name: element.role!, color: "red"),
        ),
      );
    }
  }
}
