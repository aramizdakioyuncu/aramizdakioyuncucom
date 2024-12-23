import 'package:aramizdakioyuncucom/app/app.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:get_storage/get_storage.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';
import 'package:webview_flutter_web/webview_flutter_web.dart';

main() async {
  WebViewPlatform.instance = WebWebViewPlatform();
  WidgetsFlutterBinding.ensureInitialized();
  usePathUrlStrategy();

  await GetStorage.init();
  ARMOYU.service.setup();

  String? barrierToken = Functions.box.read('userTOKEN');

  Functions.cookiesetup();
  if (barrierToken != null) {
    ARMOYU.service.authServices.setbarriertoken(
      barriertoken: barrierToken,
    );
  }

  runApp(const App());
}
