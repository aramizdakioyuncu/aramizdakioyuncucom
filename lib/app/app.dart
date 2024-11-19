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
      theme: appThemeData,
      initialRoute: AppPages.initial,
      getPages: AppPages.routes,
    );
  }
}
