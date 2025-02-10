import 'dart:developer';

import 'package:aramizdakioyuncucom/app/models/user.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart' as widgetmedia;
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/role.dart';
import 'package:armoyu_widgets/data/models/user.dart' as widgetuser;

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_widgets/data/models/useraccounts.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

class Functions {
  static final box = GetStorage();
//WEB

  static void gotoPage(String url,
      {bool newTab = false, bool getnavgiate = false}) {
    if (newTab) {
      html.window.open(url, '_blank');
      return;
    }
    if (getnavgiate) {
      Get.toNamed(url);
      return;
    }
    html.window.location.href = url;
    return;
  }

  static void reloadPage() {
    html.window.location.reload();
  }

//WEB
  static void cookiesetup() {
    if (Functions.box.read('currentUser') != null &&
        Functions.box.read('userTOKEN') != null) {
      Applist.currentUser.value = User.fromJson(
        Functions.box.read('currentUser'),
      );

      String userToken = Functions.box.read('userTOKEN');
      ARMOYU.widget.accountController.changeUser(
        UserAccounts(
          user: widgetuser.User(
            userID: Applist.currentUser.value!.userID,
            displayName: Rx(Applist.currentUser.value!.displayName!.value),
            userName: Rx(Applist.currentUser.value!.userName!.value),
            avatar: widgetmedia.Media(
              mediaID: Applist.currentUser.value!.avatar!.mediaID,
              mediaURL: widgetmedia.MediaURL(
                bigURL: Rx(
                    Applist.currentUser.value!.avatar!.mediaURL.bigURL.value),
                normalURL: Rx(Applist
                    .currentUser.value!.avatar!.mediaURL.normalURL.value),
                minURL: Rx(
                    Applist.currentUser.value!.avatar!.mediaURL.minURL.value),
              ),
            ),
            banner: widgetmedia.Media(
              mediaID: Applist.currentUser.value!.banner!.mediaID,
              mediaURL: widgetmedia.MediaURL(
                bigURL: Rx(
                    Applist.currentUser.value!.banner!.mediaURL.bigURL.value),
                normalURL: Rx(Applist
                    .currentUser.value!.banner!.mediaURL.normalURL.value),
                minURL: Rx(
                    Applist.currentUser.value!.banner!.mediaURL.minURL.value),
              ),
            ),
            role: Role(
              roleID: Applist.currentUser.value!.role!.roleID,
              name: Applist.currentUser.value!.role!.name,
              color: Applist.currentUser.value!.role!.color,
            ),
          ).obs,
          sessionTOKEN: userToken.obs,
          language: Rxn("tr TR"),
        ),
      );
    }

    if (Applist.currentUser.value == null) {
      Functions.box.remove('userTOKEN');
    }

    if (Functions.box.read('userTOKEN') != null) {
      // Functions.login(
      //   username: Functions.box.read('username'),
      //   password: Functions.box.read('userTOKEN'),
      // );
    } else {
      Applist.currentUser.value = null;
      Functions.box.remove('userTOKEN');
      Functions.box.remove('currentUser');
    }
  }

  static void performSearch(String query, RxList list) async {
    if (query.isEmpty) {
      log("Search query cannot be empty.");
      return;
    }
    if (query.length <= 3) {
      log("less length than 3");
      return;
    }

    log(query.toString());
    SearchListResponse response =
        await ARMOYU.service.searchServices.searchengine(
      searchword: query,
      page: 1,
    );

    if (response.result.status == false) {
      log(response.result.description);
      return;
    }

    for (var element in response.response!.search) {
      list.add(
        User(
          displayName: Rx<String>(element.username!),
          avatar: Media(
            mediaID: 0,
            mediaURL: MediaURL(
              bigURL: Rx<String>(element.avatar!),
              normalURL: Rx<String>(element.avatar!),
              minURL: Rx<String>(element.avatar!),
            ),
          ),
        ),
      );
    }
  }

  static Future<bool> login(
      {required String username, required String password}) async {
    LoginResponse response = await ARMOYU.service.authServices.login(
      username: username,
      password: password,
    );

    if (!response.result.status) {
      return false;
    }

    if (response.result.description == "Oyuncu bilgileri yanlış!") {
      box.remove('userTOKEN');
      return false;
    }

    Applist.currentUser.value = User(
        userID: response.response!.playerID!,
        userName: Rx<String>(username),
        password: Rx<String>(password),
        displayName: Rx<String>(response.response!.displayName!),
        avatar: Media(
          mediaID: response.response!.avatar!.mediaID,
          mediaURL: MediaURL(
            bigURL: Rx<String>(response.response!.avatar!.mediaURL.bigURL),
            normalURL:
                Rx<String>(response.response!.avatar!.mediaURL.normalURL),
            minURL: Rx<String>(response.response!.avatar!.mediaURL.minURL),
          ),
        ),
        banner: Media(
          mediaID: response.response!.banner!.mediaID,
          mediaURL: MediaURL(
            bigURL: Rx<String>(response.response!.banner!.mediaURL.bigURL),
            normalURL:
                Rx<String>(response.response!.banner!.mediaURL.normalURL),
            minURL: Rx<String>(response.response!.banner!.mediaURL.minURL),
          ),
        ),
        role: Role(
            roleID: response.response!.roleID!,
            name: response.response!.roleName!,
            color: response.response!.roleColor!));
    box.write('userTOKEN', response.result.description);
    box.write('currentUser', Applist.currentUser.toJson());

    return true;
  }
}
