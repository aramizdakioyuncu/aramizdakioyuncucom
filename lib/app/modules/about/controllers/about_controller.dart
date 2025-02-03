import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/joinus/joinus_permission_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/service_result.dart';
import 'package:get/get.dart';

class AboutController extends GetxController {
  var fetchStatus = false.obs;
  var fetchdepartmentStatus = false.obs;
  Rxn<String> about = Rxn();
  Rxn<List<APIJoinusPermissionList>> departments = Rxn();
  @override
  void onInit() {
    super.onInit();

    fetchrules();
    fetchroles();
  }

  fetchrules() async {
    if (fetchStatus.value) {
      return;
    }
    fetchStatus.value = true;
    ServiceResult response = await ARMOYU.service.aboutServices.fetch(
      page: 1,
    );

    if (!response.status) {
      return;
    }
    about.value = response.descriptiondetail;
    about.refresh();
    fetchStatus.value = false;
  }

  fetchroles() async {
    if (fetchdepartmentStatus.value) {
      return;
    }
    fetchdepartmentStatus.value = true;
    JoinUsFetchDepartmentsResponse response =
        await ARMOYU.service.joinusServices.fetchdepartment();

    if (!response.result.status) {
      return;
    }
    departments.value ??= [];
    for (APIJoinusPermissionList element in response.response!) {
      departments.value!.add(element);
    }
    departments.refresh();
    fetchdepartmentStatus.value = false;
  }
}
