import 'package:aramizdakioyuncucom/app/modules/events/_main/views/events_view.dart';
import 'package:aramizdakioyuncucom/app/modules/events/eventscategorylist/views/eventscategorylist_view.dart';
import 'package:aramizdakioyuncucom/app/modules/events/eventsdetail/views/eventsdetail_view.dart';
import 'package:get/get.dart';

class EventsModule {
  static const route = '/etkinlikler';

  static final List<GetPage> routes = [
    GetPage(
      name: route,
      page: () => const EventsView(),
    ),
    GetPage(
      name: "$route/:eventgame",
      page: () => const EventscategorylistView(),
    ),
    GetPage(
      name: "$route/:eventgame/:event",
      page: () => const EventsdetailView(),
    ),
  ];
}
