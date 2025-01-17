import 'package:aramizdakioyuncucom/app/modules/news/_main/views/news_view.dart';
import 'package:aramizdakioyuncucom/app/modules/news/newsdetail/views/newsdetail_view.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class NewsModule {
  static const route = '/haberler';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const NewsView(),
    ),
    GetPage(
      name: "$route/:category",
      page: () => const NewsdetailView(),
      middlewares: [ValidateNewsMiddleware()],
    ),
    GetPage(
      name: "$route/:category/:news",
      page: () => const NewsdetailView(),
      middlewares: [ValidateNewsMiddleware()],
    ),
  ];
}

class ValidateCategoryMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    final uri = Uri.parse(route ?? '');
    if (uri.pathSegments.length > 2) {
      // Fazladan bir '/' var, ana rotaya yönlendir
      return const RouteSettings(name: '/haberler');
    }
    return null; // Normalde devam et
  }
}

class ValidateNewsMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    final uri = Uri.parse(route ?? '');
    if (uri.pathSegments.length > 3) {
      // Fazladan bir '/' var, kategori rotasına yönlendir
      return RouteSettings(name: '/haberler/${uri.pathSegments[1]}');
    }
    return null; // Normalde devam et
  }
}
