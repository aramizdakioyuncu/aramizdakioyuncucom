import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/news/news_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class NewsController extends GetxController {
  Rxn<List<APINewsDetail>> newsList = Rxn();
  var fetchnewsProccess = false.obs;
  @override
  void onInit() {
    super.onInit();
    fetchnews();
  }

  fetchnews() async {
    if (fetchnewsProccess.value) {
      return;
    }

    fetchnewsProccess.value = true;

    NewsListResponse response =
        await ARMOYU.service.newsServices.fetch(page: 1);

    if (!response.result.status) {
      fetchnewsProccess.value = false;
      return;
    }

    newsList.value ??= [];

    for (APINewsDetail element in response.response!.news) {
      newsList.value!.add(element);
    }

    fetchnewsProccess.value = false;
  }
}
