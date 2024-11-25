import 'package:aramizdakioyuncucom/app/modules/forum/_main/views/forum_view.dart';
import 'package:aramizdakioyuncucom/app/modules/forum/forumdetail/views/forumdetail_view.dart';
import 'package:get/get.dart';

class ForumModule {
  static const route = '/forum';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const ForumView(),
    ),
    GetPage(
      name: "$route/:forum",
      page: () => const ForumdetailView(),
    ),
  ];
}
