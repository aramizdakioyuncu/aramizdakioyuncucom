import 'package:aramizdakioyuncucom/app/modules/shop/_main/views/shop_view.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_addproduct/views/shopaddproduct_view.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_basket/views/shopbasket_view.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_mypage/views/shopmypage_view.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shopdetail/views/shopdetail_view.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:get/get.dart';

class ShopModule {
  static const route = Routes.SHOP;

  static final routes = [
    GetPage(
      name: route,
      page: () => const ShopView(),
    ),
    GetPage(
      name: "$route/sepetim",
      page: () => const ShopbasketView(),
    ),
    GetPage(
      name: "$route/sayfam",
      page: () => const ShopmypageView(),
    ),
    GetPage(
      name: "$route/urun-ekle",
      page: () => const ShopaddproductView(),
    ),
    GetPage(
      name: "$route/:shopid",
      page: () => const ShopdetailView(),
    ),
  ];
}
