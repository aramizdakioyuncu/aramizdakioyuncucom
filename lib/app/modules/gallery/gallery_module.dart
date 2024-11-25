import 'package:aramizdakioyuncucom/app/modules/gallery/_main/views/gallery_view.dart';
import 'package:aramizdakioyuncucom/app/modules/gallery/gallery_detail/views/gallery_detail_view.dart';
import 'package:get/get.dart';

class GalleryModule {
  static const route = '/galeriler';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const GalleryView(),
    ),
    GetPage(
      name: "$route/:gallery",
      page: () => const GalleryDetailView(),
    ),
  ];
}
