import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/search/search_hashtaglist.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/foreign_currency_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/minecraft_statistics.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/new_registered_users.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/player_pop_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/super_lig.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';
import 'package:armoyu_widgets/data/models/Story/storylist.dart';
import 'package:armoyu_widgets/data/models/user.dart';
import 'package:armoyu_widgets/sources/social/bundle/posts_bundle.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';

class SocialController extends GetxController {
  var discordiframe = PlatformWebViewController(
    const PlatformWebViewControllerCreationParams(),
  ).obs;

  Rxn<List<User>> popList = Rxn<List<User>>(null);
  Rxn<List<User>> xpList = Rxn<List<User>>(null);
  Rxn<List<SuperLigAPI>> teamList = Rxn<List<SuperLigAPI>>(null);
  Rxn<List<APISearcHashtagDetail>> hashtagList =
      Rxn<List<APISearcHashtagDetail>>(null);
  Rxn<List<User>> newregisteredList = Rxn<List<User>>(null);

  Rxn<List<User>> minecraftList = Rxn<List<User>>(null);
  Rxn<List<ForeignCurrencyList>> currentmoneyList =
      Rxn<List<ForeignCurrencyList>>(null);

  Rxn<List<Widget>> postsList = Rxn<List<Widget>>(null);
  Rxn<List<StoryList>> storyContent = Rxn<List<StoryList>>(null);

  var poplistcount = 1.obs;
  var xplistcount = 1.obs;
  var teamcount = 1.obs;
  var hashtagcount = 1.obs;
  var newregisteredcount = 1.obs;
  var minecraftcount = 1.obs;
  var currentmoneycount = 1.obs;
  var postscount = 1.obs;

  var poplistProccess = false.obs;
  var xplistProccess = false.obs;
  var teamlistProccess = false.obs;
  var hashtaglistProccess = false.obs;
  var newregisteredlistProccess = false.obs;
  var minecraftlistProccess = false.obs;
  var currentmoneyProccess = false.obs;
  var postsProccess = false.obs;
  var storyProccess = false.obs;

  var xppopselected = true.obs;

  Rxn<Widget> storywidget = Rxn<Widget>(null);

  late PostsWidgetBundle posts;

  @override
  void onInit() {
    super.onInit();

    fetchpopList();
    fetchxpList();
    fetchteams();
    fetchhashtags();
    fetchnewregisteredusers();
    fetchminecraft();
    fetchcurrentmoney();

    discordiframe.value.loadRequest(
      LoadRequestParams(
        uri: Uri.parse(
            'https://discord.com/widget?id=269811924399685634&theme=dark'),
      ),
    );

    posts = ARMOYU.widget.social.posts(
      context: Get.context!,
      scrollController: ScrollController(),
      shrinkWrap: true,
      profileFunction: (
          {required avatar,
          required banner,
          required displayname,
          required userID,
          required username}) {
        Functions.gotoPage(
          "/oyuncular/$username",
          getnavgiate: true,
        );
      },
    );
  }

  Future<void> fetchhashtags() async {
    if (hashtaglistProccess.value) {
      return;
    }

    hashtaglistProccess.value = true;

    SearchHashtagListResponse response = await ARMOYU.service.searchServices
        .hashtag(hashtag: "", page: hashtagcount.value);

    if (!response.result.status) {
      hashtaglistProccess.value = false;
      return;
    }

    hashtagList.value ??= [];
    for (APISearcHashtagDetail element in response.response!.search) {
      log("hashtag -> ${element.hashtagID} ${element.value} ${element.numberofuses} ");
      hashtagList.value!.add(
        APISearcHashtagDetail(
          hashtagID: element.hashtagID,
          value: element.value,
          numberofuses: element.numberofuses,
        ),
      );
    }

    hashtagList.refresh();

    hashtagcount.value++;
    hashtaglistProccess.value = false;
  }

  Future<void> fetchpopList() async {
    if (poplistProccess.value) {
      return;
    }

    poplistProccess.value = true;

    PlayerPopResponse response = await ARMOYU.service.utilsServices
        .getplayerpop(page: poplistcount.value);

    if (!response.result.status) {
      poplistProccess.value = false;

      return;
    }

    popList.value ??= [];
    for (APIPlayerPop element in response.response!) {
      popList.value!.add(
        User(
          displayName: Rx(element.oyuncuAdSoyad),
          xp: Rx(element.oyuncuPop.toString()),
          userName: Rx(element.oyuncuKullaniciAdi),
          avatar: Media(
            mediaID: element.oyuncuID,
            mediaType: MediaType.image,
            mediaURL: MediaURL(
              bigURL: Rx(element.oyuncuAvatar),
              normalURL: Rx(element.oyuncuAvatar),
              minURL: Rx(element.oyuncuAvatar),
            ),
          ),
        ),
      );
    }

    popList.refresh();

    poplistcount.value++;
    poplistProccess.value = false;
  }

  Future<void> fetchteams() async {
    if (teamlistProccess.value) {
      return;
    }

    teamlistProccess.value = true;

    SuperLigResponse response =
        await ARMOYU.service.utilsServices.superlig(page: teamcount.value);

    if (!response.result.status) {
      teamlistProccess.value = false;
      return;
    }

    teamList.value ??= [];
    for (SuperLigAPI element in response.response!) {
      teamList.value!.add(element);
    }

    teamList.refresh();
    teamcount.value++;
    teamlistProccess.value = false;
  }

  Future<void> fetchxpList() async {
    if (xplistProccess.value) {
      return;
    }

    xplistProccess.value = true;

    PlayerPopResponse response =
        await ARMOYU.service.utilsServices.getplayerxp(page: xplistcount.value);

    if (!response.result.status) {
      xplistProccess.value = false;
      return;
    }

    xpList.value ??= [];
    for (APIPlayerPop element in response.response!) {
      xpList.value!.add(
        User(
          displayName: Rx(element.oyuncuAdSoyad),
          xp: Rx(element.oyuncuSeviyeSezonlukXP),
          userName: Rx(element.oyuncuKullaniciAdi),
          avatar: Media(
            mediaID: element.oyuncuID,
            mediaType: MediaType.image,
            mediaURL: MediaURL(
              bigURL: Rx(element.oyuncuAvatar),
              normalURL: Rx(element.oyuncuAvatar),
              minURL: Rx(element.oyuncuAvatar),
            ),
          ),
        ),
      );
    }

    xpList.refresh();
    xplistcount.value++;
    xplistProccess.value = false;
  }

  fetchnewregisteredusers() async {
    if (newregisteredlistProccess.value) {
      return;
    }

    newregisteredlistProccess.value = true;

    NewRegisteredUsersResponse response = await ARMOYU.service.utilsServices
        .newRegisterUsers(page: newregisteredcount.value);

    if (!response.result.status) {
      newregisteredlistProccess.value = false;
      return;
    }

    newregisteredList.value ??= [];
    for (NewRegisteredUsersAPI element in response.response!) {
      newregisteredList.value!.add(
        User(
          displayName: Rx(element.displayname),
          avatar: Media(
            mediaID: 0,
            mediaType: MediaType.image,
            mediaURL: MediaURL(
              bigURL: Rx(element.avatar.minURL),
              normalURL: Rx(element.avatar.normalURL),
              minURL: Rx(element.avatar.minURL),
            ),
          ),
          level: Rx(element.level),
          xp: Rx(element.xp),
          userName: Rx(element.url),
        ),
      );
    }
    newregisteredList.refresh();

    newregisteredcount.value++;
    newregisteredlistProccess.value = false;
  }

  Future<void> fetchminecraft() async {
    if (minecraftlistProccess.value) {
      return;
    }

    minecraftlistProccess.value = true;

    MinecraftStatisticsResponse response = await ARMOYU.service.utilsServices
        .minecraftStatistics(page: minecraftcount.value);

    if (!response.result.status) {
      minecraftlistProccess.value = false;
      return;
    }

    minecraftList.value ??= [];
    for (MinecraftStatisticsAPI element in response.response!) {
      minecraftList.value!.add(
        User(
          displayName: Rx(element.playername),
        ),
      );
    }
    newregisteredList.refresh();

    minecraftcount.value++;
    minecraftlistProccess.value = false;
  }

  Future<void> fetchcurrentmoney() async {
    if (currentmoneyProccess.value) {
      return;
    }

    currentmoneyProccess.value = true;

    ForeignCurrencyListResponse response = await ARMOYU.service.utilsServices
        .foreigncurrencylist(page: currentmoneycount.value);

    if (!response.result.status) {
      currentmoneyProccess.value = false;
      return;
    }

    currentmoneyList.value ??= [];
    for (ForeignCurrencyList element in response.response!) {
      currentmoneyList.value!.add(element);
    }
    newregisteredList.refresh();

    currentmoneycount.value++;
    currentmoneyProccess.value = false;
  }
}
