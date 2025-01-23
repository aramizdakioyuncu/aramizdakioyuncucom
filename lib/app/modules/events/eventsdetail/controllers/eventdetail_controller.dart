import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/event/event_participant.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_services/core/models/ARMOYU/user.dart';
import 'package:get/get.dart';

class EventdetailController extends GetxController {
  Rxn<List<UserInfo>> playersList = Rxn();
  Rxn<List<APIEventparticipantGroups>> groupList = Rxn();
  @override
  void onInit() {
    super.onInit();
    fetchEventParticipant();
  }

  Future<void> fetchEventParticipant() async {
    EventParticipantResponse response =
        await ARMOYU.service.eventServices.participantList(eventID: 244);

    if (!response.result.status) {
      return;
    }

    playersList.value ??= [];
    for (UserInfo element in response.response!.players) {
      playersList.value!.add(element);
    }

    groupList.value ??= [];
    for (APIEventparticipantGroups element in response.response!.groups) {
      groupList.value!.add(element);
    }
  }
}
