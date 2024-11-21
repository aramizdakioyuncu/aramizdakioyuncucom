import 'dart:developer';

import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/media.dart';
import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class Functions {
  static final box = GetStorage();

  static void performSearch(String query, RxList list) async {
    if (query.isEmpty) {
      log("Search query cannot be empty.");
      return;
    }
    if (query.length <= 3) {
      log("less length than 3");
      return;
    }

    // if (Applist.currentUser.value!.userName == null ||
    //     Applist.currentUser.value!.password == null) {
    //   log("is cant be null username or password");
    //   return;
    // }

    log(query.toString());
    Map<String, dynamic> response =
        await ARMOYU.service.searchServices.searchengine(
      // username: Applist.currentUser.value!.userName!.value,
      // password: Applist.currentUser.value!.password!.value,
      searchword: query,
      page: 1,
    );

    if (response['durum'] == 0) {
      log(response['aciklama']);
      return;
    }

    log(response['icerik'].toString());

    for (var element in response['icerik']) {
      list.add(
        User(
          displayName: Rx<String>(element['Value']),
          avatar: Media(
            mediaID: element['ID'],
            mediaURL: MediaURL(
              bigURL: Rx<String>(element['avatar']),
              normalURL: Rx<String>(element['avatar']),
              minURL: Rx<String>(element['avatar']),
            ),
          ),
        ),
      );
    }
  }

  static login({required String username, required String password}) async {
    Map<String, dynamic> response =
        await ARMOYU.service.authServices.previuslogin(
      username: username,
      password: password,
    );

    if (response['durum'] == 0) {
      box.remove('userTOKEN');
      return;
    }

    Applist.currentUser.value = User(
      userID: response['icerik']['playerID'],
      userName: Rx<String>(username),
      password: Rx<String>(password),
      displayName: Rx<String>(response['icerik']['displayName']),
      avatar: Media(
        mediaID: response['icerik']['avatar']['media_ID'],
        mediaURL: MediaURL(
          bigURL: Rx<String>(response['icerik']['avatar']['media_bigURL']),
          normalURL: Rx<String>(response['icerik']['avatar']['media_URL']),
          minURL: Rx<String>(response['icerik']['avatar']['media_minURL']),
        ),
      ),
      banner: Media(
        mediaID: response['icerik']['banner']['media_ID'],
        mediaURL: MediaURL(
          bigURL: Rx<String>(response['icerik']['banner']['media_bigURL']),
          normalURL: Rx<String>(response['icerik']['banner']['media_URL']),
          minURL: Rx<String>(response['icerik']['banner']['media_minURL']),
        ),
      ),
    );

    box.write('username', username);
    box.write('userTOKEN', password);
    box.write('currentUser', Applist.currentUser.toJson());

    Get.back();
  }
}
