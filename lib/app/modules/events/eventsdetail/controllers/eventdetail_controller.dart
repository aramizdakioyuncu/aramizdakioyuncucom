import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/event/event_detail.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/event/event_participant.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_services/core/models/ARMOYU/user.dart';
import 'package:get/get.dart';

class EventdetailController extends GetxController {
  Rxn<APIEventDetail> eventDetail = Rxn();
  Rxn<List<UserInfo>> playersList = Rxn();
  Rxn<List<APIEventparticipantGroups>> groupList = Rxn();

  final event = Get.parameters['event'];

  @override
  void onInit() {
    super.onInit();
    fetcheventInfo();
  }

  fetcheventInfo() async {
    EventDetailResponse response =
        await ARMOYU.service.eventServices.fetchdetail(eventURL: event);

    if (!response.result.status) {
      return;
    }

    eventDetail.value = response.response!;

    fetchEventParticipant(eventDetail.value!.event.eventID);
  }

  Future<void> fetchEventParticipant(eventID) async {
    EventParticipantResponse response =
        await ARMOYU.service.eventServices.participantList(eventID: eventID);

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
