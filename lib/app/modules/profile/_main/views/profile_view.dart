import 'package:aramizdakioyuncucom/app/modules/profile/_main/controllers/profile_controller.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/app_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
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
    final controller = Get.put(ProfileController());

    return BodyWidget.custom1(
      context,
      bgImage: controller.bgwallpaper,
      // bgImage: controller.profileInfo.value == null
      //     ? controller.bgwallpaper
      //     : controller.profileInfo.value!.wallpaper!.mediaURL.minURL.value.obs,
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
                    : Container(
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black
                                  .withOpacity(0.3), // Gölgenin rengi
                              offset: const Offset(4, 4), // Gölgenin kayması
                              blurRadius: 6, // Gölgenin bulanıklığı
                            ),
                          ],
                        ),
                        child: RotatedBox(
                          quarterTurns: 1,
                          child: CountryFlag.fromCountryCode(
                            controller
                                .profileInfo.value!.country!.value.countryCode,
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
                  Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle, // Dairesel şekil
                      border: Border.all(
                        color: Colors.blue, // Şerit rengi
                        width: 3, // Şerit genişliği
                      ),
                    ),
                    child: Obx(
                      () => controller.profileInfo.value == null
                          ? const CircleAvatar(
                              radius: 60,
                              child: CupertinoActivityIndicator(),
                            )
                          : CircleAvatar(
                              foregroundColor: Colors.transparent,
                              foregroundImage: CachedNetworkImageProvider(
                                controller.profileInfo.value!.avatar!.mediaURL
                                    .minURL.value,
                              ),
                              radius: 60,
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
                            ? const Text("data")
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
              child: Container(
                decoration: const BoxDecoration(
                  color: Colors.white54,
                ),
                child: const Padding(
                  padding: EdgeInsets.all(2.0),
                  child: Text(
                    "1242141 XP",
                    style: TextStyle(
                      color: Colors.white,
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
                                                  .value!
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
                                                      .value!
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
                                              .value!
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
                                              .value!
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
                                              .value!
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
                                              .value!
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
                                              .value!
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
                                              .value!
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
                                              .value!
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
                                              .value!
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
                      ARMOYU.widget.elevatedButton.costum1(
                        text: "text",
                        onPressed: () {
                          AppWidget.showSettingsDialog(context);
                        },
                        loadingStatus: false,
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      "Hakkımda",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 30,
                                      ),
                                    ),
                                    Text(
                                      "${controller.profileInfo.value!.country!.value.name}${controller.profileInfo.value!.province == null ? "" : ", ${controller.profileInfo.value!.province!.value.name}"}",
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Row(
                                      children: [
                                        const FaIcon(
                                          FontAwesomeIcons.calendarDays,
                                          size: 14,
                                        ),
                                        const SizedBox(
                                          width: 5,
                                        ),
                                        Text(
                                          controller.profileInfo.value!
                                              .registerDate!.value!,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Text(
                                      controller.profileInfo.value!.burc!.value,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Text(
                                      controller
                                          .profileInfo.value!.aboutme!.value,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TabBar(
                                      controller:
                                          controller.tabController.value,
                                      onTap: (value) {
                                        controller.tabControllerIndex.value =
                                            value;
                                      },
                                      tabs: const [
                                        Text("Paylaşımlar"),
                                        Text("Medya"),
                                        Text("Etiketlenmiş"),
                                      ],
                                    ),
                                    Obx(
                                      () =>
                                          controller.tabControllerIndex.value ==
                                                  0
                                              ? controller.widget.value!
                                              : Container(),
                                    ),
                                    Obx(
                                      () =>
                                          controller.tabControllerIndex.value ==
                                                  1
                                              ? controller.widget2.value!
                                              : Container(),
                                    ),
                                    Obx(
                                      () =>
                                          controller.tabControllerIndex.value ==
                                                  2
                                              ? controller.widget3.value!
                                              : Container(),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 270,
                            child: Column(
                              children: [
                                const Text("E-sporlar"),
                                Row(
                                  children: List.generate(
                                    controller.profileInfo.value!.popularGames!
                                        .length,
                                    (index) {
                                      return Padding(
                                        padding: const EdgeInsets.all(2.0),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            controller
                                                .profileInfo
                                                .value!
                                                .popularGames![index]
                                                .logo
                                                .mediaURL
                                                .minURL
                                                .value,
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                const Text("Sporlar"),
                                Row(
                                  children: List.generate(
                                    4,
                                    (index) {
                                      return const Padding(
                                        padding: EdgeInsets.all(2.0),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            "https://aramizdakioyuncu.com/galeri/oyun-logolari/futboll.png",
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                const Text("Arkadaşlar"),
                                Row(
                                  children: List.generate(
                                    controller
                                        .profileInfo.value!.myFriends!.length,
                                    (index) {
                                      return Padding(
                                        padding: const EdgeInsets.all(2.0),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            controller
                                                .profileInfo
                                                .value!
                                                .myFriends![index]
                                                .avatar!
                                                .mediaURL
                                                .minURL
                                                .value,
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                const Text("Gruplar"),
                                Row(
                                  children: List.generate(
                                    6,
                                    (index) {
                                      return const Padding(
                                        padding: EdgeInsets.all(2.0),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            "https://aramizdakioyuncu.com/galeri/gruplar/1gruplarlogominnak1655550694.png",
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                const Text("Albümler"),
                                Row(
                                  children: List.generate(
                                    6,
                                    (index) {
                                      return const Padding(
                                        padding: EdgeInsets.all(2.0),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            "https://aramizdakioyuncu.com/galeri/images/1orijinal23625_minnak16648326273.jpg",
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                const Text("Eğitim"),
                                Row(
                                  children: List.generate(
                                    6,
                                    (index) {
                                      return const Padding(
                                        padding: EdgeInsets.all(2.0),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            "https://aramizdakioyuncu.com/galeri/okulresimleri/1logominnak1716379394.png",
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
