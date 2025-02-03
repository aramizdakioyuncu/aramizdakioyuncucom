import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/rules/rules.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class RulesController extends GetxController {
  var fetchStatus = false.obs;
  Rxn<List<APIRules>> rules = Rxn();
  @override
  void onInit() {
    super.onInit();

    fetchrules();
  }

  fetchrules() async {
    if (fetchStatus.value) {
      return;
    }
    fetchStatus.value = true;
    RulesResponse response = await ARMOYU.service.rulesServices.fetch(
      page: 1,
    );

    if (!response.result.status) {
      return;
    }
    rules.value ??= [];
    for (APIRules element in response.response!) {
      rules.value!.add(element);
    }

    rules.refresh();
    fetchStatus.value = false;
  }
}
