import 'dart:developer';

import 'package:armoyu_widgets/data/models/ARMOYU/country.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/game.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/province.dart';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/login&register&password/login.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_widgets/data/models/socailaccounts.dart';
import 'package:armoyu_widgets/data/models/user.dart';
import 'package:armoyu_widgets/sources/gallery/bundle/gallery_bundle.dart';
import 'package:armoyu_widgets/sources/social/bundle/posts_bundle.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ProfileController extends GetxController
    with GetSingleTickerProviderStateMixin {
  final profileUsername = Get.parameters['username'];
  Rxn<User> profileInfo = Rxn<User>();
  Rxn<TabController> tabController = Rxn<TabController>();
  Rx<int> tabControllerIndex = Rx<int>(0);

  // Rxn<Widget> widget = Rxn();
  late PostsWidgetBundle widgetPosts;
  late GalleryWidgetBundle widget2;
  late PostsWidgetBundle widgetPosts3;
  // Rxn<Widget> widget3 = Rxn();

  RxString bgwallpaper = RxString("");

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
    widgetPosts = ARMOYU.widget.social.posts(
      context: Get.context!,
      shrinkWrap: true,
      userID: profileInfo.value!.userID,
      profileFunction: (
          {required avatar,
          required banner,
          required displayname,
          required userID,
          required username}) {},
    );

    widget2 = ARMOYU.widget.gallery.mediaGallery(
      context: Get.context!,
      userID: profileInfo.value!.userID,
      username: profileInfo.value!.userName?.value,
    );

    widgetPosts3 = ARMOYU.widget.social.posts(
      context: Get.context!,
      shrinkWrap: true,
      userID: profileInfo.value!.userID,
      category: "etiketlenmis",
      profileFunction: (
          {required avatar,
          required banner,
          required displayname,
          required userID,
          required username}) {},
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
            gameType: "",
            gameID: game.gameID!,
            name: game.gameName!,
            logo: Media(
              mediaID: game.gameLogo!.mediaID,
              mediaType: MediaType.image,
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
              mediaType: MediaType.image,
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
      detailInfo: Rxn(
        response.response!.detailInfo == null
            ? null
            : UserDetailInfo(
                about: Rxn(response.response!.detailInfo!.about),
                age: Rxn(response.response!.detailInfo!.age),
                email: Rxn(response.response!.detailInfo!.email),
                friends: Rxn(response.response!.detailInfo!.friends),
                posts: Rxn(response.response!.detailInfo!.posts),
                awards: Rxn(response.response!.detailInfo!.awards),
                phoneNumber: Rxn(response.response!.detailInfo!.phoneNumber),
                birthdayDate: Rxn(response.response!.detailInfo!.birthdayDate),
                inviteCode: Rxn(response.response!.detailInfo!.inviteCode),
                lastloginDate:
                    Rxn(response.response!.detailInfo!.lastloginDate),
                lastloginDateV2:
                    Rxn(response.response!.detailInfo!.lastloginDateV2),
                lastfailedDate:
                    Rxn(response.response!.detailInfo!.lastfailedDate),
                country: Rxn(
                  Country(
                    countryID:
                        response.response!.detailInfo!.country!.countryID,
                    name: response.response!.detailInfo!.country!.name,
                    countryCode: response.response!.detailInfo!.country!.code,
                    phoneCode:
                        response.response!.detailInfo!.country!.phonecode,
                  ),
                ),
                province: Rxn(
                  Province(
                    provinceID:
                        response.response!.detailInfo!.province!.provinceID,
                    name: response.response!.detailInfo!.province!.name,
                    plateCode:
                        response.response!.detailInfo!.province!.platecode,
                    phoneCode:
                        response.response!.detailInfo!.province!.phonecode,
                  ),
                ),
              ),
      ),
      burc: Rx(response.response!.burc!),
      popularGames: RxList<Game>(populargamelist),
      socialaccounts: response.response!.socailAccounts == null
          ? null
          : Rx<Socialaccounts>(
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
              mediaType: MediaType.image,
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
              mediaType: MediaType.image,
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
              mediaType: MediaType.image,
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

    bgwallpaper.value = response.response!.banner!.mediaURL.minURL;
    bgwallpaper.refresh();
  }
}
