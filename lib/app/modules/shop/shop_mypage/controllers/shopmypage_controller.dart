import 'package:aramizdakioyuncucom/app/models/request_status_chart_model.dart';
import 'package:aramizdakioyuncucom/app/models/status_model.dart';
import 'package:get/get.dart';

class ShopmypageController extends GetxController {
  var categoryStatusList = <AppStatusChartRequest>[].obs;
  @override
  void onInit() {
    super.onInit();

    fetchFeedbackStatus();
  }

  void fetchFeedbackStatus() {
    categoryStatusList.clear();
    for (var fetchelement in AppStatus.values) {
      categoryStatusList.add(
        AppStatusChartRequest(status: fetchelement),
      );
    }
  }
}
