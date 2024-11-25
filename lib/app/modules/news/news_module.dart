import 'package:aramizdakioyuncucom/app/modules/news/_main/views/news_view.dart';
import 'package:aramizdakioyuncucom/app/modules/news/newsdetail/views/newsdetail_view.dart';
import 'package:get/get.dart';

class NewsModule {
  static const route = '/haberler';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const NewsView(),
    ),
    GetPage(
      name: "$route/:news",
      page: () => const NewsdetailView(),
    ),
  ];
}
