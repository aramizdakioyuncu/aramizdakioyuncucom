import 'package:aramizdakioyuncucom/app/modules/raffle/_main/views/raffle_view.dart';
import 'package:aramizdakioyuncucom/app/modules/raffle/raffledetail/views/raffledetail_view.dart';
import 'package:get/get_navigation/src/routes/get_route.dart';

class RaffleModule {
  static const route = '/cekilisler';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const RaffleView(),
    ),
    GetPage(
      name: "$route/:news",
      page: () => const RaffledetailView(),
    ),
  ];
}
