import 'dart:developer';
import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/media.dart';
import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/translations/app_translation.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/post/post_detail.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/search/search_hashtaglist.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/story/story_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/foreign_currency_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/minecraft_statistics.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/new_registered_users.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/player_pop_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/super_lig.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:armoyu_widgets/data/models/Social/comment.dart';
import 'package:armoyu_widgets/data/models/Social/like.dart';
import 'package:armoyu_widgets/data/models/Social/post.dart';
import 'package:armoyu_widgets/data/models/Story/story.dart';
import 'package:armoyu_widgets/data/models/Story/storylist.dart';
import 'package:armoyu_widgets/data/models/user.dart' as widgetuser;
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart' as widgetmedia;

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';

class SocialController extends GetxController {
  final PlatformWebViewController discordiframe = PlatformWebViewController(
    const PlatformWebViewControllerCreationParams(),
  )..loadRequest(
      LoadRequestParams(
        uri: Uri.parse(
            'https://discord.com/widget?id=269811924399685634&theme=dark'),
      ),
    );

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
  Rxn<List<StoryList>> content = Rxn<List<StoryList>>(null);

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
  var proccess = false.obs;

  var xppopselected = true.obs;

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
    fetchsocailposts();
    fetchsocailstory();
  }

  Future<void> fetchsocailstory() async {
    if (proccess.value) {
      return;
    }

    proccess.value = true;
    StoryFetchListResponse response =
        await ARMOYU.service.storyServices.stories(page: 1);
    if (!response.result.status) {
      proccess.value = false;
      return;
    }

    content.value ??= [];

    if (response.response!.isEmpty) {
      content.value!.add(
        StoryList(
          owner: widgetuser.User(
            userID: ARMOYU.widget.accountController.currentUserAccounts.value
                .user.value.userID,
            userName: (SocialKeys.socialStory.tr).obs,
            avatar: ARMOYU.widget.accountController.currentUserAccounts.value
                .user.value.avatar,
          ),
          story: null,
          isView: true,
        ),
      );
    }
    for (APIStoryList element in response.response!) {
      content.value!.add(
        StoryList(
          owner: widgetuser.User(
              userID: element.oyuncuId,
              userName: Rx(element.oyuncuKadi),
              displayName: Rx(element.oyuncuAdSoyad),
              avatar: widgetmedia.Media(
                mediaID: 0,
                mediaURL: widgetmedia.MediaURL(
                  bigURL: Rx(element.oyuncuAvatar.bigURL),
                  normalURL: Rx(element.oyuncuAvatar.normalURL),
                  minURL: Rx(
                    element.oyuncuAvatar.minURL,
                  ),
                ),
              )),
          story: element.hikayeIcerik
              .map(
                (e) => Story(
                  storyID: e.hikayeId,
                  ownerID: e.hikayeSahip,
                  ownerusername: element.oyuncuAdSoyad,
                  owneravatar: element.oyuncuAvatar.minURL,
                  time: e.hikayeZaman,
                  media: e.hikayeMedya,
                  isLike: e.hikayeBenBegeni,
                  isView: e.hikayeBenGoruntulenme,
                ),
              )
              .toList(),
          isView: false,
        ),
      );
    }

    content.refresh();
    proccess.value = false;

    log(content.value!.length.toString());
  }

  Future<void> fetchsocailposts() async {
    if (postsProccess.value) {
      return;
    }
    postsProccess.value = true;

    PostFetchListResponse response =
        await ARMOYU.service.postsServices.getPosts(page: postscount.value);

    if (!response.result.status) {
      postsProccess.value = false;
      return;
    }

    postsList.value ??= [];
    for (APIPostList element in response.response!) {
      postsList.value!.add(
        ARMOYU.widget.social.postWidget(
          Get.context!,
          post: Post(
            postID: element.postID,
            content: element.content,
            postDate: element.date,
            sharedDevice: element.postdevice,
            likesCount: element.likeCount,
            isLikeme: element.didilikeit == 1 ? true : false,
            commentsCount: element.commentCount,
            iscommentMe: element.didicommentit == 1 ? true : false,
            owner: widgetuser.User(
              userID: element.postOwner.ownerID,
              displayName: Rx(element.postOwner.displayName),
              userName: Rx(element.postOwner.displayName),
              avatar: widgetmedia.Media(
                mediaID: 0,
                mediaURL: widgetmedia.MediaURL(
                  bigURL: Rx(element.postOwner.avatar.bigURL),
                  normalURL: Rx(element.postOwner.avatar.normalURL),
                  minURL: Rx(element.postOwner.avatar.minURL),
                ),
              ),
            ),
            media: element.media!
                .map(
                  (e) => widgetmedia.Media(
                    mediaID: 0,
                    mediaURL: widgetmedia.MediaURL(
                      bigURL: Rx(e.mediaURL.bigURL),
                      normalURL: Rx(e.mediaURL.normalURL),
                      minURL: Rx(e.mediaURL.minURL),
                    ),
                    mediaType: e.mediaType,
                  ),
                )
                .toList(),
            firstthreecomment: element.firstcomments!
                .map(
                  (e) => Comment(
                    postID: e.postID,
                    commentID: e.commentID,
                    content: e.commentContent,
                    date: e.commentTime,
                    didIlike: e.isLikedByMe,
                    likeCount: e.likeCount,
                    user: widgetuser.User(
                      userID: e.postcommenter.userID,
                      userName: Rx(e.postcommenter.mention),
                      displayName: Rx(e.postcommenter.displayname),
                      avatar: widgetmedia.Media(
                        mediaID: 0,
                        mediaURL: widgetmedia.MediaURL(
                          bigURL: Rx(e.postcommenter.avatar.bigURL),
                          normalURL: Rx(e.postcommenter.avatar.normalURL),
                          minURL: Rx(e.postcommenter.avatar.minURL),
                        ),
                      ),
                    ),
                  ),
                )
                .toList(),
            firstthreelike: element.firstlikers!
                .map(
                  (e) => Like(
                    likeID: e.postlikeID,
                    date: e.likedate,
                    user: widgetuser.User(
                      userID: e.likerID,
                      userName: Rx(e.likerusername),
                      displayName: Rx(e.likerdisplayname),
                      avatar: widgetmedia.Media(
                        mediaID: 0,
                        mediaURL: widgetmedia.MediaURL(
                          bigURL: Rx(e.likeravatar.bigURL),
                          normalURL: Rx(e.likeravatar.normalURL),
                          minURL: Rx(e.likeravatar.minURL),
                        ),
                      ),
                    ),
                  ),
                )
                .toList(),
            location: element.location,
          ),
          isPostdetail: false,
        ),
      );
    }
    postsList.refresh();
    postsProccess.value = false;
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
      log("pop ->${element.oyuncuAdSoyad} ${element.oyuncuSeviyeXP}");
      popList.value!.add(
        User(
          displayName: Rx(element.oyuncuAdSoyad),
          xp: Rx(element.oyuncuPop.toString()),
          userName: Rx(element.oyuncuKullaniciAdi),
          avatar: Media(
            mediaID: element.oyuncuID,
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
      log("team ->${element.teamname} ${element.point}");
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
      log("xp ->${element.oyuncuAdSoyad} ${element.oyuncuSeviyeXP}");

      xpList.value!.add(
        User(
          displayName: Rx(element.oyuncuAdSoyad),
          xp: Rx(element.oyuncuSeviyeSezonlukXP),
          userName: Rx(element.oyuncuKullaniciAdi),
          avatar: Media(
            mediaID: element.oyuncuID,
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
      log("nuser -> ${element.displayname} ${element.level} ${element.xp} ");
      newregisteredList.value!.add(
        User(
          displayName: Rx(element.displayname),
          avatar: Media(
            mediaID: 0,
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
      log("minecraftuser -> ${element.playername} ${element.clanname} ${element.point}  ");
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
      log("money -> ${element.image} ${element.name} ${element.value}  ");
      currentmoneyList.value!.add(element);
    }
    newregisteredList.refresh();

    currentmoneycount.value++;
    currentmoneyProccess.value = false;
  }
}
