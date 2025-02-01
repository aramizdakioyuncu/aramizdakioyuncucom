import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/controlpanel/controlpanel_userslist.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class ControlpanelHomeController extends GetxController {
  Rxn<List<APIControlpanelUserslist>> usersList = Rxn();
  @override
  void onInit() {
    super.onInit();
    fetchuserslist();
  }

  Future<void> fetchuserslist() async {
    ControlPanelHomeResponse response =
        await ARMOYU.service.controlpanelServices.home();

    if (!response.result.status) {
      return;
    }

    usersList.value ??= [];
    for (APIControlpanelUserslist element in response.response!) {
      usersList.value!.add(element);
    }
  }
}
