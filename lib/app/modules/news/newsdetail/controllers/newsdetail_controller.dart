import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/news/news_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class NewsdetailController extends GetxController {
  Rxn<APINewsDetail> newsInfo = Rxn();
  var fetchProccess = false.obs;

  Rxn<List<APINewsDetail>> newsList = Rxn();
  var fetchnewsProccess = false.obs;
  final news = Get.parameters['news'];
  final category = Get.parameters['category'];

  @override
  void onInit() {
    super.onInit();

    log(category.toString());
    log(news.toString());

    fetchnewsdetail();
    fetchnews();
  }

  fetchnewsdetail() async {
    if (fetchProccess.value) {
      return;
    }

    fetchProccess.value = true;

    NewsFetchResponse response =
        await ARMOYU.service.newsServices.fetchdetail(newsURL: news);

    if (!response.result.status) {
      fetchProccess.value = false;
      return;
    }

    newsInfo.value = response.response!;
    fetchProccess.value = false;
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
