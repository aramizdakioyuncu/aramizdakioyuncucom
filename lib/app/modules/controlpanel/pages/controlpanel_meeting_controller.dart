import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/controlpanel/controlpanel_meetinglist.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class ControlpanelMeetingController extends GetxController {
  Rxn<List<APIControlpanelMeetinglist>> meetingList = Rxn();
  @override
  void onInit() {
    super.onInit();
    fetchuserslist();
  }

  Future<void> fetchuserslist() async {
    ControlPanelMeetingResponse response =
        await ARMOYU.service.controlpanelServices.meeting();

    if (!response.result.status) {
      return;
    }

    meetingList.value ??= [];
    for (APIControlpanelMeetinglist element in response.response!) {
      meetingList.value!.add(element);
    }
  }
}
