import 'package:aramizdakioyuncucom/app/app.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:get_storage/get_storage.dart';

main() async {
  usePathUrlStrategy();
  await GetStorage.init();

  await ARMOYU.service.setup();
  runApp(const App());
}
