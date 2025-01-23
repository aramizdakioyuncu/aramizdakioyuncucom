import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/event/event.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class EventsController extends GetxController {
  Rxn<List<APIEvent>> eventList = Rxn();
  @override
  void onInit() {
    super.onInit();

    fetcheventsgame();
  }

  Future<void> fetcheventsgame() async {
    EventResponse response = await ARMOYU.service.eventServices.fetch();

    if (!response.result.status) {
      return;
    }

    eventList.value ??= [];
    for (APIEvent element in response.response!) {
      eventList.value!.add(element);
    }
  }
}
