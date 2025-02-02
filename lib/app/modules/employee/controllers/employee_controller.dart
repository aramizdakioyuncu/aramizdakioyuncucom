import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/crew/crew_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class EmployeeController extends GetxController {
  Rxn<List<APICrewList>> crewList = Rxn();
  var crewListProccess = false.obs;
  var crewListPage = 1.obs;
  @override
  void onInit() {
    super.onInit();
    fetchcrew();
  }

  Future<void> fetchcrew() async {
    if (crewListProccess.value) {
      return;
    }
    crewListProccess.value = true;

    String currentRoute = Get.currentRoute;

    String? category;
    if (currentRoute.split("/").length == 3) {
      if (currentRoute.split("/")[2] == "okul-temsilcileri") {
        category = "okul-temsilcileri";
      }
    }

    CrewResponse response = await ARMOYU.service.crewServices.fetch(
      page: crewListPage.value,
      category: category,
    );

    if (!response.result.status) {
      crewListProccess.value = false;
      return;
    }

    crewList.value ??= [];
    for (APICrewList element in response.response!) {
      crewList.value!.add(element);
    }

    crewList.refresh();

    crewListPage++;
    crewListProccess.value = false;

    if (response.response!.isNotEmpty) {
      fetchcrew();
    }
  }
}
