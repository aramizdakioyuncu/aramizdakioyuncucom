import 'dart:developer';

import 'package:aramizdakioyuncucom/app/appinfo.dart';
import 'package:aramizdakioyuncucom/app/routes/routes.dart';
import 'package:aramizdakioyuncucom/app/theme/theme.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: AppInfo.appName,
      theme: appLightThemeData,
      darkTheme: appDarkThemeData,
      themeMode: ThemeMode.dark,
      initialRoute: AppPages.initial,
      unknownRoute: AppPages.notFound404page.first,
      getPages: AppPages.routes,
      enableLog: true,
      popGesture: true,
      routingCallback: (routing) {
        log('Current route: ${routing?.current}');
        log('Previous route: ${routing?.previous}');
      },
    );
  }
}
