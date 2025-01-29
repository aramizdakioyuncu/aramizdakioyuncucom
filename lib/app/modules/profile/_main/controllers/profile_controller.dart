import 'dart:developer';

import 'package:aramizdakioyuncucom/app/models/game.dart';
import 'package:aramizdakioyuncucom/app/models/socailaccounts.dart';
import 'package:aramizdakioyuncucom/app/models/user.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/country.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/province.dart';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/login&register&password/login.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ProfileController extends GetxController
    with GetSingleTickerProviderStateMixin {
  final profileUsername = Get.parameters['username'];
  Rxn<User> profileInfo = Rxn<User>();
  Rxn<TabController> tabController = Rxn<TabController>();
  Rx<int> tabControllerIndex = Rx<int>(0);

  Rxn<Widget> widget = Rxn();
  Rxn<Widget> widget2 = Rxn();
  Rxn<Widget> widget3 = Rxn();

  @override
  Future<void> onInit() async {
    super.onInit();

    tabController.value = TabController(
      initialIndex: tabControllerIndex.value,
      length: 3,
      vsync: this,
    );

    if (profileUsername != null) {
      await fetchuser(profileUsername);
    }
    widget.value = ARMOYU.widget.social.posts(
      context: Get.context!,
      shrinkWrap: true,
      userID: profileInfo.value!.userID,
      profileFunction: (userID, username) {},
    );

    widget2.value = ARMOYU.widget.gallery.mediaGallery(
      context: Get.context!,
      userID: profileInfo.value!.userID,
    );

    widget3.value = ARMOYU.widget.social.posts(
      context: Get.context!,
      shrinkWrap: true,
      userID: profileInfo.value!.userID,
      category: "etiketlenmis",
      profileFunction: (userID, username) {},
    );
  }

  fetchuser(username) async {
    LookProfilewithUsernameResponse response = await ARMOYU
        .service.utilsServices
        .lookProfilewithusername(userusername: username);

    log(response.result.status.toString());

    if (!response.result.status ||
        response.result.description == "Oyuncu bilgileri yanlış!") {
      return;
    }

    List<Game> populargamelist = [];
    if (response.response!.popularGames != null) {
      for (PopularGame game in response.response!.popularGames!) {
        populargamelist.add(
          Game(
            gameID: game.gameID!,
            name: game.gameName!,
            logo: Media(
              mediaID: game.gameLogo!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx(game.gameLogo!.mediaURL.bigURL),
                normalURL: Rx(game.gameLogo!.mediaURL.normalURL),
                minURL: Rx(game.gameLogo!.mediaURL.minURL),
              ),
            ),
            gameURL: game.gameURL!,
          ),
        );
      }
    }

    List<User> friendsList = [];
    if (response.response!.arkadasliste != null) {
      for (Friend friend in response.response!.arkadasliste!) {
        friendsList.add(
          User(
            displayName: Rx(friend.oyuncuKullaniciAdi),
            avatar: Media(
              mediaID: 0,
              mediaURL: MediaURL(
                bigURL: Rx(friend.oyuncuMinnakAvatar.bigURL),
                normalURL: Rx(friend.oyuncuMinnakAvatar.normalURL),
                minURL: Rx(friend.oyuncuMinnakAvatar.minURL),
              ),
            ),
          ),
        );
      }
    }

    profileInfo.value = User(
      userID: response.response!.playerID,
      userName: Rx(response.response!.username!),
      displayName: Rx<String>(response.response!.displayName!),
      xp: Rx<String>(response.response!.levelXP!),
      aboutme: Rx(response.response!.detailInfo!.about!),
      registerDate: Rxn(response.response!.registeredDate),
      burc: Rx(response.response!.burc!),
      popularGames: RxList<Game>(populargamelist),
      country: response.response!.detailInfo!.country == null
          ? null
          : Rx(
              Country(
                countryID: response.response!.detailInfo!.country!.countryID,
                name: response.response!.detailInfo!.country!.name,
                countryCode: response.response!.detailInfo!.country!.code,
                phoneCode: response.response!.detailInfo!.country!.phonecode,
              ),
            ),
      province: response.response!.detailInfo!.province == null
          ? null
          : Rx(
              Province(
                provinceID: response.response!.detailInfo!.province!.provinceID,
                name: response.response!.detailInfo!.province!.name,
                plateCode: response.response!.detailInfo!.province!.platecode,
                phoneCode: response.response!.detailInfo!.province!.phonecode,
              ),
            ),
      socialaccounts: response.response!.socailAccounts == null
          ? null
          : Rxn<Socialaccounts>(
              Socialaccounts(
                facebook:
                    Rxn<String>(response.response!.socailAccounts!.facebook),
                github: Rxn<String>(response.response!.socailAccounts!.github),
                instagram:
                    Rxn<String>(response.response!.socailAccounts!.instagram),
                linkedin:
                    Rxn<String>(response.response!.socailAccounts!.linkedin),
                reddit: Rxn<String>(response.response!.socailAccounts!.reddit),
                steam: Rxn<String>(response.response!.socailAccounts!.steam),
                twitch: Rxn<String>(response.response!.socailAccounts!.twitch),
                youtube:
                    Rxn<String>(response.response!.socailAccounts!.youtube),
                discord: null,
              ),
            ),
      avatar: response.response!.avatar == null
          ? null
          : Media(
              mediaID: response.response!.avatar!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx<String>(response.response!.avatar!.mediaURL.bigURL),
                normalURL:
                    Rx<String>(response.response!.avatar!.mediaURL.normalURL),
                minURL: Rx<String>(response.response!.avatar!.mediaURL.minURL),
              ),
            ),
      banner: response.response!.banner == null
          ? null
          : Media(
              mediaID: response.response!.banner!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx<String>(response.response!.banner!.mediaURL.bigURL),
                normalURL:
                    Rx<String>(response.response!.banner!.mediaURL.normalURL),
                minURL: Rx<String>(response.response!.banner!.mediaURL.minURL),
              ),
            ),
      wallpaper: response.response!.banner == null
          ? null
          : Media(
              mediaID: response.response!.banner!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx<String>(response.response!.banner!.mediaURL.bigURL),
                normalURL:
                    Rx<String>(response.response!.banner!.mediaURL.normalURL),
                minURL: Rx<String>(response.response!.banner!.mediaURL.minURL),
              ),
            ),
      myFriends: response.response!.ortakarkadasliste == null
          ? null
          : RxList(friendsList),
    );
  }
}
