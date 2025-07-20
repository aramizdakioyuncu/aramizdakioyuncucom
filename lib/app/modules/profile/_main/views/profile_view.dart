import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/modules/profile/_main/controllers/profile_controller.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/app_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/profile/profile_friendlist.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/my_group_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/my_school_list.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:country_flags/country_flags.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    final profileUsername = Get.parameters['username'];

    final controller = Get.put(ProfileController(), tag: profileUsername);

    return BodyWidget.custom1(
      context,
      bgImage: controller.bgwallpaper,
      widthScale: 0.125,
      transparentBody: true,
      body: [
        Stack(
          children: [
            Obx(
              () => controller.profileInfo.value == null
                  ? const SizedBox(
                      height: 380,
                      width: double.infinity,
                      child: CupertinoActivityIndicator(),
                    )
                  : Container(
                      height: 380,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: CachedNetworkImageProvider(
                            controller.profileInfo.value!.banner!.mediaURL
                                .minURL.value,
                          ),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
            ),
            Positioned(
              top: 0,
              left: 10,
              child: Obx(
                () => controller.profileInfo.value == null
                    ? Container()
                    : controller.profileInfo.value!.detailInfo!.value == null
                        ? Container()
                        : Container(
                            decoration: BoxDecoration(
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.3),
                                  offset:
                                      const Offset(4, 4), // Gölgenin kayması
                                  blurRadius: 6, // Gölgenin bulanıklığı
                                ),
                              ],
                            ),
                            child: RotatedBox(
                              quarterTurns: 1,
                              child: CountryFlag.fromCountryCode(
                                controller.profileInfo.value!.detailInfo!.value!
                                    .country.value!.countryCode,
                                width: 60,
                                height: 40,
                              ),
                            ),
                          ),
              ),
            ),
            Positioned(
              bottom: 30,
              left: 45,
              child: Column(
                children: [
                  Obx(
                    () => Container(
                      decoration: BoxDecoration(
                        shape: BoxShape.circle, // Dairesel şekil
                        border: controller.profileInfo.value == null
                            ? null
                            : Border.all(
                                color: Color(
                                  int.parse(
                                      "0xFF${controller.profileInfo.value!.levelColor!.value}"),
                                ), // Şerit rengi
                                width: 5, // Şerit genişliği
                              ),
                      ),
                      child: Obx(
                        () => controller.profileInfo.value == null
                            ? const CircleAvatar(
                                radius: 60,
                                child: CupertinoActivityIndicator(),
                              )
                            : CircleAvatar(
                                backgroundColor: Colors.transparent,
                                backgroundImage: CachedNetworkImageProvider(
                                  controller.profileInfo.value!.avatar!.mediaURL
                                      .minURL.value,
                                ),
                                radius: 60,
                                child: Align(
                                  alignment: Alignment.bottomCenter,
                                  child: Container(
                                    height: 40,
                                    width: 40,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle, // Dairesel şekil
                                      color: Color(int.parse(
                                          "0xFF${controller.profileInfo.value!.levelColor!.value}")),
                                      border: controller.profileInfo.value ==
                                              null
                                          ? null
                                          : Border.all(
                                              color:
                                                  Colors.white, // Şerit rengi
                                              width: 1, // Şerit genişliği
                                            ),
                                    ),
                                    child: Center(
                                      child: Text(
                                        controller
                                            .profileInfo.value!.level!.value
                                            .toString(),
                                        style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 22,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                      ),
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.black45,
                      borderRadius: BorderRadius.circular(5),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(4.0),
                      child: Obx(
                        () => controller.profileInfo.value == null
                            ? const Text("Display Name")
                            : Text(
                                controller
                                    .profileInfo.value!.displayName!.value,
                                style: const TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              bottom: 0,
              left: 0,
              child: Obx(
                () => Container(
                  decoration: controller.profileInfo.value == null
                      ? null
                      : BoxDecoration(
                          color: Color(int.parse(
                              "0xFF${controller.profileInfo.value!.levelColor!.value}")),
                        ),
                  child: Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: controller.profileInfo.value == null
                        ? null
                        : Text(
                            "${controller.profileInfo.value!.level!.value} XP",
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                  ),
                ),
              ),
            )
          ],
        ),
        Container(
          color: Get.theme.scaffoldBackgroundColor,
          child: Obx(
            () => controller.profileInfo.value == null
                ? const Center(
                    heightFactor: 20,
                    child: CupertinoActivityIndicator(),
                  )
                : Column(
                    children: [
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Obx(
                          () => controller.profileInfo.value == null
                              ? Container()
                              : Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Obx(
                                      () => controller
                                                  .profileInfo
                                                  .value!
                                                  .socialaccounts!
                                                  .value
                                                  .steam!
                                                  .value ==
                                              ""
                                          ? Container()
                                          : IconButton(
                                              onPressed: () {
                                                Functions.gotoPage(
                                                  controller
                                                      .profileInfo
                                                      .value!
                                                      .socialaccounts!
                                                      .value
                                                      .steam!
                                                      .value!,
                                                );
                                              },
                                              icon: const FaIcon(
                                                FontAwesomeIcons.steam,
                                                color: Colors.red,
                                              ),
                                            ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .instagram!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.instagram,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .facebook!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.facebook,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .twitch!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.twitch,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .youtube!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.youtube,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .linkedin!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.linkedin,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .reddit!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.reddit,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .github!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.github,
                                        color: Colors.red,
                                      ),
                                    ),
                                    IconButton(
                                      onPressed: () {
                                        Functions.gotoPage(
                                          controller
                                              .profileInfo
                                              .value!
                                              .socialaccounts!
                                              .value
                                              .discord!
                                              .value!,
                                        );
                                      },
                                      icon: const FaIcon(
                                        FontAwesomeIcons.discord,
                                        color: Colors.red,
                                      ),
                                    ),
                                  ],
                                ),
                        ),
                      ),
                      Applist.currentUser.value == null
                          ? Container()
                          : controller.profileInfo.value!.userID !=
                                  Applist.currentUser.value!.userID
                              ? Container()
                              : Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child:
                                          ARMOYU.widget.elevatedButton.costum1(
                                        text: "Müzikler",
                                        onPressed: () {
                                          AppWidget.showMusicDialog(context);
                                        },
                                        loadingStatus: false,
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child:
                                          ARMOYU.widget.elevatedButton.costum1(
                                        text: "Galeri",
                                        onPressed: () {
                                          AppWidget.showSettingsDialog(context);
                                        },
                                        loadingStatus: false,
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child:
                                          ARMOYU.widget.elevatedButton.costum1(
                                        text: "Ayarlar",
                                        onPressed: () {
                                          AppWidget.showSettingsDialog(context);
                                        },
                                        loadingStatus: false,
                                      ),
                                    ),
                                  ],
                                ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: controller
                                        .profileInfo.value!.detailInfo!.value ==
                                    null
                                ? Container(
                                    color: Colors.black38,
                                    height: 500,
                                    child: const Center(
                                      child: Icon(
                                        Icons.lock,
                                        color: Colors.white,
                                        size: 50,
                                      ),
                                    ),
                                  )
                                : Align(
                                    alignment: Alignment.centerLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          controller.profileInfo.value!
                                                      .detailInfo!.value ==
                                                  null
                                              ? Container()
                                              : const Text(
                                                  "Hakkımda",
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 30,
                                                  ),
                                                ),
                                          controller.profileInfo.value!
                                                      .detailInfo!.value ==
                                                  null
                                              ? Container()
                                              : Text(
                                                  "${controller.profileInfo.value!.detailInfo!.value!.country.value!.name}${controller.profileInfo.value!.detailInfo!.value!.province.value == null ? "" : ", ${controller.profileInfo.value!.detailInfo!.value!.province.value!.name}"}",
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                          controller.profileInfo.value!
                                                      .detailInfo!.value ==
                                                  null
                                              ? Container()
                                              : Row(
                                                  children: [
                                                    const FaIcon(
                                                      FontAwesomeIcons
                                                          .calendarDays,
                                                      size: 14,
                                                    ),
                                                    const SizedBox(
                                                      width: 5,
                                                    ),
                                                    controller
                                                                .profileInfo
                                                                .value!
                                                                .detailInfo!
                                                                .value ==
                                                            null
                                                        ? Container()
                                                        : Text(
                                                            controller
                                                                .profileInfo
                                                                .value!
                                                                .registerDate
                                                                .toString(),
                                                            style:
                                                                const TextStyle(
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                  ],
                                                ),
                                          controller.profileInfo.value!
                                                      .detailInfo!.value ==
                                                  null
                                              ? Container()
                                              : Text(
                                                  controller.profileInfo.value!
                                                      .burc!.value,
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                          controller.profileInfo.value!
                                                      .detailInfo!.value ==
                                                  null
                                              ? Container()
                                              : Text(
                                                  controller
                                                      .profileInfo
                                                      .value!
                                                      .detailInfo!
                                                      .value!
                                                      .about
                                                      .value
                                                      .toString(),
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                          TabBar(
                                            controller:
                                                controller.tabController.value,
                                            onTap: (value) {
                                              controller.tabControllerIndex
                                                  .value = value;
                                            },
                                            tabs: const [
                                              Text("Paylaşımlar"),
                                              Text("Medya"),
                                              Text("Etiketlenmiş"),
                                            ],
                                          ),
                                          Obx(
                                            () => controller.tabControllerIndex
                                                        .value ==
                                                    0
                                                ? controller
                                                    .widgetPosts.widget.value!
                                                : Container(),
                                          ),
                                          Obx(
                                            () => controller.tabControllerIndex
                                                        .value ==
                                                    1
                                                ? controller
                                                    .widget2.widget.value!
                                                : Container(),
                                          ),
                                          Obx(
                                            () => controller.tabControllerIndex
                                                        .value ==
                                                    2
                                                ? controller
                                                    .widgetPosts3.widget.value!
                                                : Container(),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                          ),
                          SizedBox(
                            width: 270,
                            child: controller
                                        .profileInfo.value!.detailInfo!.value ==
                                    null
                                ? Container(
                                    color: Colors.black38,
                                    height: 500,
                                    child: const Center(
                                      child: Icon(
                                        Icons.lock,
                                        color: Colors.white,
                                        size: 50,
                                      ),
                                    ),
                                  )
                                : Column(
                                    children: [
                                      const Text("E-sporlar"),
                                      // Row(
                                      //   children: List.generate(
                                      //     controller.profileInfo.value!.popularGames!
                                      //         .length,
                                      //     (index) {
                                      //       return Padding(
                                      //         padding: const EdgeInsets.all(2.0),
                                      //         child: CircleAvatar(
                                      //           backgroundColor: Colors.transparent,
                                      //           foregroundImage:
                                      //               CachedNetworkImageProvider(
                                      //             controller
                                      //                 .profileInfo
                                      //                 .value!
                                      //                 .popularGames![index]
                                      //                 .logo
                                      //                 .mediaURL
                                      //                 .minURL
                                      //                 .value,
                                      //           ),
                                      //         ),
                                      //       );
                                      //     },
                                      //   ),
                                      // ),
                                      const Text("Sporlar"),
                                      Row(
                                        children: List.generate(
                                          4,
                                          (index) {
                                            return const Padding(
                                              padding: EdgeInsets.all(2.0),
                                              child: CircleAvatar(
                                                backgroundColor:
                                                    Colors.transparent,
                                                foregroundImage:
                                                    CachedNetworkImageProvider(
                                                  "${APIConstants.storageDomain}/galeri/oyun-logolari/futboll.png",
                                                ),
                                              ),
                                            );
                                          },
                                        ),
                                      ),
                                      const Text("Arkadaşlar"),
                                      controller.friendlist.value == null
                                          ? const CupertinoActivityIndicator()
                                          : SingleChildScrollView(
                                              scrollDirection: Axis.horizontal,
                                              child: Row(
                                                children: List.generate(
                                                  controller
                                                      .friendlist.value!.length,
                                                  (index) {
                                                    APIProfileFriendlist
                                                        friendINFO = controller
                                                            .friendlist
                                                            .value![index];
                                                    return Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              2.0),
                                                      child: InkWell(
                                                        onTap: () {
                                                          Functions.gotoPage(
                                                            "/oyuncular/${friendINFO.username}",
                                                            getnavgiate: true,
                                                          );
                                                        },
                                                        child: CircleAvatar(
                                                          backgroundColor:
                                                              Colors
                                                                  .transparent,
                                                          foregroundImage:
                                                              CachedNetworkImageProvider(
                                                            friendINFO
                                                                .avatar.minURL,
                                                          ),
                                                        ),
                                                      ),
                                                    );
                                                  },
                                                ),
                                              ),
                                            ),
                                      const Text("Gruplar"),
                                      controller.grouplist.value == null
                                          ? const CupertinoActivityIndicator()
                                          : SingleChildScrollView(
                                              scrollDirection: Axis.horizontal,
                                              child: Row(
                                                children: List.generate(
                                                  controller
                                                      .grouplist.value!.length,
                                                  (index) {
                                                    APIMyGroupList groupINFO =
                                                        controller.grouplist
                                                            .value![index];
                                                    return Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              2.0),
                                                      child: InkWell(
                                                        onTap: () {
                                                          Functions.gotoPage(
                                                            "/gruplar/${groupINFO.groupURL}",
                                                            getnavgiate: true,
                                                          );
                                                        },
                                                        child: CircleAvatar(
                                                          backgroundColor:
                                                              Colors
                                                                  .transparent,
                                                          foregroundImage:
                                                              CachedNetworkImageProvider(
                                                            groupINFO
                                                                .groupLogo
                                                                .mediaURL
                                                                .minURL,
                                                          ),
                                                        ),
                                                      ),
                                                    );
                                                  },
                                                ),
                                              ),
                                            ),
                                      const Text("Albümler"),
                                      Row(
                                        children: List.generate(
                                          3,
                                          (index) {
                                            return const Padding(
                                              padding: EdgeInsets.all(2.0),
                                              child: CircleAvatar(
                                                backgroundColor:
                                                    Colors.transparent,
                                                foregroundImage:
                                                    CachedNetworkImageProvider(
                                                  "${APIConstants.storageDomain}/galeri/images/1orijinal23625_minnak16648326273.jpg",
                                                ),
                                              ),
                                            );
                                          },
                                        ),
                                      ),
                                      const Text("Eğitim"),
                                      controller.schoollist.value == null
                                          ? const CupertinoActivityIndicator()
                                          : Row(
                                              children: List.generate(
                                                controller
                                                    .schoollist.value!.length,
                                                (index) {
                                                  APIMySchoolList schoolINFO =
                                                      controller.schoollist
                                                          .value![index];
                                                  return Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            2.0),
                                                    child: InkWell(
                                                      onTap: () {
                                                        Functions.gotoPage(
                                                          "/okullar/${schoolINFO.schoolName}",
                                                          getnavgiate: true,
                                                        );
                                                      },
                                                      child: CircleAvatar(
                                                        backgroundColor:
                                                            Colors.transparent,
                                                        foregroundImage:
                                                            CachedNetworkImageProvider(
                                                          schoolINFO.schoolLogo
                                                              .mediaURL.bigURL,
                                                        ),
                                                      ),
                                                    ),
                                                  );
                                                },
                                              ),
                                            ),
                                    ],
                                  ),
                          )
                        ],
                      ),
                    ],
                  ),
          ),
        ),
      ],
    );
  }
}
