import 'package:aramizdakioyuncucom/app/modules/social/controllers/social_controller.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';

class SocialView extends StatelessWidget {
  const SocialView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(SocialController());
    Color colorbg = Colors.white70;
    Color colortxt = Colors.black;
    return BodyWidget.custom1(
      bgImage:
          "https://aramizdakioyuncu.com/galeri/ana-yapi/anakisarkaplan.webp",
      context,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 100.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 5),
                  child: Column(
                    children: [
                      Container(
                        color: colorbg,
                        child: Padding(
                          padding: const EdgeInsets.all(2.0),
                          child: Center(
                            child: ARMOYU.widget.elevatedButton.costum2(
                              background: Colors.blueGrey,
                              icon: const Icon(FontAwesomeIcons.steam),
                              text: "STEAM HESABINI BAĞLA",
                              onPressed: () {},
                              loadingStatus: false,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Container(
                        color: colorbg,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: ElevatedButton(
                                      style: const ButtonStyle(
                                        backgroundColor:
                                            WidgetStatePropertyAll(Colors.blue),
                                        shape: WidgetStatePropertyAll(
                                          RoundedRectangleBorder(
                                            borderRadius: BorderRadius.zero,
                                          ),
                                        ),
                                      ),
                                      onPressed: () {
                                        controller.xppopselected.value = true;
                                      },
                                      child: const Text("SEVİYE"),
                                    ),
                                  ),
                                  Expanded(
                                    child: ElevatedButton(
                                      style: const ButtonStyle(
                                        backgroundColor:
                                            WidgetStatePropertyAll(Colors.pink),
                                        shape: WidgetStatePropertyAll(
                                          RoundedRectangleBorder(
                                            borderRadius: BorderRadius.zero,
                                          ),
                                        ),
                                      ),
                                      onPressed: () {
                                        controller.xppopselected.value = false;
                                      },
                                      child: const Text("POP"),
                                    ),
                                  ),
                                ],
                              ),
                              Obx(
                                () => Visibility(
                                  visible: controller.xppopselected.value,
                                  child: SizedBox(
                                    height: 500,
                                    child: controller.xpList.value == null
                                        ? const Center(
                                            child: CupertinoActivityIndicator(),
                                          )
                                        : SingleChildScrollView(
                                            child: Column(
                                              children: List.generate(
                                                controller.xpList.value == null
                                                    ? 0
                                                    : controller
                                                        .xpList.value!.length,
                                                (index) {
                                                  return ListTile(
                                                    onTap: () {
                                                      Get.toNamed(
                                                        "/oyuncular/${controller.xpList.value![index].userName}",
                                                      );
                                                    },
                                                    contentPadding:
                                                        const EdgeInsets.all(0),
                                                    leading: Row(
                                                      mainAxisSize:
                                                          MainAxisSize.min,
                                                      children: [
                                                        SizedBox(
                                                          width: 25,
                                                          child: Text(
                                                            "${(index + 1).toString()}.",
                                                            style:
                                                                const TextStyle(
                                                              fontSize: 16,
                                                              color:
                                                                  Colors.black,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                        ),
                                                        CircleAvatar(
                                                          foregroundImage:
                                                              CachedNetworkImageProvider(
                                                            controller
                                                                .xpList
                                                                .value![index]
                                                                .avatar!
                                                                .mediaURL
                                                                .minURL
                                                                .value,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                    title: Text(
                                                      "${controller.xpList.value![index].displayName}  ${controller.xpList.value![index].xp} XP",
                                                      style: const TextStyle(
                                                        color: Colors.black,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                      ),
                                                    ),
                                                  );
                                                },
                                              ),
                                            ),
                                          ),
                                  ),
                                ),
                              ),
                              Obx(
                                () => Visibility(
                                  visible: !controller.xppopselected.value,
                                  child: SizedBox(
                                    height: 500,
                                    child: controller.popList.value == null
                                        ? const CupertinoActivityIndicator()
                                        : SingleChildScrollView(
                                            child: Column(
                                              children: List.generate(
                                                controller.xpList.value == null
                                                    ? 0
                                                    : controller
                                                        .popList.value!.length,
                                                (index) {
                                                  return ListTile(
                                                    onTap: () {
                                                      Get.toNamed(
                                                        "/oyuncular/${controller.popList.value![index].userName}",
                                                      );
                                                    },
                                                    contentPadding:
                                                        const EdgeInsets.all(0),
                                                    leading: Row(
                                                      mainAxisSize:
                                                          MainAxisSize.min,
                                                      children: [
                                                        SizedBox(
                                                          width: 25,
                                                          child: Text(
                                                            "${(index + 1).toString()}.",
                                                            style:
                                                                const TextStyle(
                                                              fontSize: 16,
                                                              color:
                                                                  Colors.black,
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                            ),
                                                          ),
                                                        ),
                                                        CircleAvatar(
                                                          foregroundImage:
                                                              CachedNetworkImageProvider(
                                                            controller
                                                                .popList
                                                                .value![index]
                                                                .avatar!
                                                                .mediaURL
                                                                .minURL
                                                                .value,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                    title: Text(
                                                      "${controller.popList.value![index].displayName}  ${controller.popList.value![index].xp} POP",
                                                      style: const TextStyle(
                                                        color: Colors.black,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                      ),
                                                    ),
                                                  );
                                                },
                                              ),
                                            ),
                                          ),
                                  ),
                                ),
                              ),
                              ElevatedButton(
                                style: const ButtonStyle(
                                  backgroundColor:
                                      WidgetStatePropertyAll(Colors.blue),
                                  shape: WidgetStatePropertyAll(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.zero,
                                    ),
                                  ),
                                ),
                                onPressed: () {
                                  if (controller.xppopselected.value) {
                                    controller.fetchxpList();
                                  } else {
                                    controller.fetchpopList();
                                  }
                                },
                                child: const Text(
                                  "Daha Fazlası",
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Container(
                        color: colorbg,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Obx(
                            () => controller.currentmoneyList.value == null
                                ? const Center(
                                    child: CupertinoActivityIndicator(),
                                  )
                                : SingleChildScrollView(
                                    child: Column(
                                      children: [
                                        ...List.generate(
                                          controller
                                              .currentmoneyList.value!.length,
                                          (index) {
                                            return ListTile(
                                              leading: CircleAvatar(
                                                foregroundImage:
                                                    CachedNetworkImageProvider(
                                                  controller.currentmoneyList
                                                      .value![index].image,
                                                ),
                                              ),
                                              title: Row(
                                                children: [
                                                  Text(
                                                    controller.currentmoneyList
                                                        .value![index].name,
                                                    style: const TextStyle(
                                                      color: Colors.black,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                  const SizedBox(width: 10),
                                                  Text(
                                                    controller.currentmoneyList
                                                        .value![index].value,
                                                    style: const TextStyle(
                                                      color: Colors.red,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            );
                                          },
                                        ),
                                      ],
                                    ),
                                  ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Container(
                        color: colorbg,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Obx(
                            () => controller.teamList.value == null
                                ? const Center(
                                    child: CupertinoActivityIndicator(),
                                  )
                                : Column(
                                    children: [
                                      Table(
                                        columnWidths: const {
                                          0: FlexColumnWidth(4),
                                          1: FixedColumnWidth(25),
                                          2: FixedColumnWidth(25),
                                        },
                                        children: [
                                          const TableRow(
                                            children: [
                                              Text(
                                                "Takım",
                                                style: TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              Text(
                                                "OM",
                                                style: TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              Text(
                                                "A",
                                                style: TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              Text(
                                                "P",
                                                style: TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ],
                                          ),
                                          ...List.generate(
                                            controller.teamList.value!.length,
                                            (index) {
                                              return TableRow(
                                                children: [
                                                  Row(
                                                    mainAxisSize:
                                                        MainAxisSize.min,
                                                    children: [
                                                      const CircleAvatar(
                                                        foregroundImage:
                                                            CachedNetworkImageProvider(
                                                                "https://upload.wikimedia.org/wikipedia/tr/8/80/Sivasspor.png"),
                                                      ),
                                                      Text(
                                                        controller
                                                            .teamList
                                                            .value![index]
                                                            .teamname,
                                                        style: const TextStyle(
                                                          color: Colors.black,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                  const Text(
                                                    "10",
                                                    style: TextStyle(
                                                      color: Colors.red,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                  const Text(
                                                    "10",
                                                    style: TextStyle(
                                                      color: Colors.red,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                  const Text(
                                                    "2",
                                                    style: TextStyle(
                                                      color: Colors.red,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                ],
                                              );
                                            },
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      Stack(
                        children: [
                          Container(
                            height: 600,
                            width: double.infinity,
                            decoration: const BoxDecoration(
                              image: DecorationImage(
                                  image: CachedNetworkImageProvider(
                                    "https://aramizdakioyuncu.com/galeri/ana-yapi/tanitim/tanitim-minecraft.jpg",
                                  ),
                                  fit: BoxFit.cover),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                children: [
                                  const Spacer(),
                                  const Expanded(
                                    child: Text(
                                      "ARMOYU Topluluk Sunucusu 1.20.4",
                                      style: TextStyle(
                                        fontSize: 25,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                  Expanded(
                                    child: Column(
                                      children: [
                                        CachedNetworkImage(
                                          imageUrl:
                                              "https://aramizdakioyuncu.com/galeri/oyun-logolari/minecraft.png",
                                        ),
                                        const Expanded(
                                          child: Text("mc.armoyu.com"),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const Expanded(
                                    child: Text(
                                      "2/20",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  const Spacer(),
                                ],
                              ),
                            ),
                          ),
                          const Positioned(
                            bottom: 5,
                            left: 5,
                            child: Row(
                              children: [
                                Icon(
                                  Icons.refresh,
                                  color: Colors.red,
                                ),
                                Text(
                                  "Yenile",
                                  style: TextStyle(
                                    color: Colors.red,
                                    fontWeight: FontWeight.bold,
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
              Expanded(
                flex: 3,
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8.0, vertical: 5),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        color: colorbg,
                        child: Column(
                          children: [
                            ListTile(
                              textColor: colortxt,
                              leading: CircleAvatar(
                                foregroundImage: CachedNetworkImageProvider(
                                  Applist.currentUser.value!.avatar!.mediaURL
                                      .minURL.value,
                                ),
                              ),
                              title: Text(
                                Applist.currentUser.value!.displayName!.value,
                              ),
                            ),
                            const TextField(),
                            Row(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CachedNetworkImage(
                                    height: 25,
                                    width: 25,
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/ana-yapi/iconlar/galeriac.png",
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CachedNetworkImage(
                                    height: 25,
                                    width: 25,
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/ana-yapi/iconlar/galeriurl.png",
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CachedNetworkImage(
                                    height: 25,
                                    width: 25,
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/ana-yapi/iconlar/videourl.png",
                                  ),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CachedNetworkImage(
                                    height: 25,
                                    width: 25,
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu64.png",
                                  ),
                                ),
                                SelectableText(
                                  "Herkes",
                                  style: TextStyle(color: colortxt),
                                ),
                                ARMOYU.widget.elevatedButton.costum1(
                                  text: "Gönder",
                                  onPressed: () {},
                                  loadingStatus: false,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 5),
                      ARMOYU.widget.social.widgetStorycircle(),
                      ARMOYU.widget.social.posts(
                        context: context,
                        scrollController: ScrollController(),
                        isPostdetail: false,
                        profileFunction: (userID, username) {
                          Get.toNamed("/oyuncular/$username");
                        },
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: Column(
                  children: [
                    Container(
                      height: 300,
                      color: colorbg,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Obx(
                          () => controller.hashtagList.value == null
                              ? const Center(
                                  child: CupertinoActivityIndicator(),
                                )
                              : SingleChildScrollView(
                                  child: Column(
                                    children: List.generate(
                                      controller.hashtagList.value!.length,
                                      (index) {
                                        return ListTile(
                                          contentPadding:
                                              const EdgeInsets.all(0),
                                          title: Text(
                                            "#${controller.hashtagList.value![index].value} ${controller.hashtagList.value![index].numberofuses}",
                                            style: const TextStyle(
                                              color: Colors.black,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      height: 300,
                      color: colorbg,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: SingleChildScrollView(
                          child: Column(
                            children: [
                              const Text("Aramıza Hoşgeldiniz"),
                              Obx(
                                () => controller.newregisteredList.value == null
                                    ? const Center(
                                        child: CupertinoActivityIndicator(),
                                      )
                                    : SingleChildScrollView(
                                        child: Column(
                                          children: List.generate(
                                            controller.newregisteredList.value!
                                                .length,
                                            (index) {
                                              return ListTile(
                                                onTap: () {
                                                  Functions.gotoPage(
                                                      "${controller.newregisteredList.value![index].userName}");
                                                },
                                                contentPadding:
                                                    const EdgeInsets.all(0),
                                                leading: Row(
                                                  mainAxisSize:
                                                      MainAxisSize.min,
                                                  children: [
                                                    SizedBox(
                                                      width: 25,
                                                      child: Text(
                                                        "${(index + 1).toString()}.",
                                                        style: const TextStyle(
                                                          fontSize: 16,
                                                          color: Colors.black,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                    ),
                                                    CircleAvatar(
                                                      foregroundImage:
                                                          CachedNetworkImageProvider(
                                                        controller
                                                            .newregisteredList
                                                            .value![index]
                                                            .avatar!
                                                            .mediaURL
                                                            .minURL
                                                            .value,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                                title: Text(
                                                  "${controller.newregisteredList.value![index].displayName!} ${controller.newregisteredList.value![index].xp!}",
                                                  style: const TextStyle(
                                                    color: Colors.black,
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                              );
                                            },
                                          ),
                                        ),
                                      ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      height: 300,
                      color: Colors.black.withOpacity(0.5),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Obx(
                          () => controller.minecraftList.value == null
                              ? const Center(
                                  child: CupertinoActivityIndicator(),
                                )
                              : SingleChildScrollView(
                                  child: Column(
                                    children: [
                                      const Text("Minecraft İstatistik"),
                                      Table(
                                        columnWidths: const {
                                          0: FixedColumnWidth(20),
                                          1: FlexColumnWidth(3),
                                          2: FlexColumnWidth(1),
                                        },
                                        children: [
                                          const TableRow(
                                            children: [
                                              Padding(
                                                padding: EdgeInsets.all(8.0),
                                                child: Text("#"),
                                              ),
                                              Padding(
                                                padding: EdgeInsets.all(8.0),
                                                child: Text("Oyuncu Adı"),
                                              ),
                                              Padding(
                                                padding: EdgeInsets.all(8.0),
                                                child: Text("Leş"),
                                              ),
                                            ],
                                          ),
                                          ...List.generate(
                                            5,
                                            (index) {
                                              return TableRow(
                                                children: [
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            8.0),
                                                    child: Text(
                                                        (index + 1).toString()),
                                                  ),
                                                  const Padding(
                                                    padding:
                                                        EdgeInsets.all(8.0),
                                                    child: Text(
                                                        "[ARMOYU] Berkay TIKENOGLU"),
                                                  ),
                                                  const Padding(
                                                    padding:
                                                        EdgeInsets.all(8.0),
                                                    child: Text("45"),
                                                  ),
                                                ],
                                              );
                                            },
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      height: 300,
                      color: Colors.black.withOpacity(0.5),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: SingleChildScrollView(
                          child: Column(
                            children: [
                              const Text("SpaceWar Istatistik"),
                              Table(
                                columnWidths: const {
                                  0: FixedColumnWidth(20),
                                  1: FlexColumnWidth(3),
                                  2: FlexColumnWidth(1),
                                },
                                children: [
                                  const TableRow(
                                    children: [
                                      Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Text("#"),
                                      ),
                                      Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Text("Oyuncu Adı"),
                                      ),
                                      Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Text("Skor"),
                                      ),
                                    ],
                                  ),
                                  ...List.generate(
                                    5,
                                    (index) {
                                      return TableRow(
                                        children: [
                                          Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Text((index + 1).toString()),
                                          ),
                                          const Padding(
                                            padding: EdgeInsets.all(8.0),
                                            child: Text(
                                                "[ARMOYU] Berkay TIKENOGLU"),
                                          ),
                                          const Padding(
                                            padding: EdgeInsets.all(8.0),
                                            child: Text("45"),
                                          ),
                                        ],
                                      );
                                    },
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    Container(
                      color: colorbg,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          children: [
                            SizedBox(
                              height: 200,
                              width: double.infinity,
                              child: CachedNetworkImage(
                                imageUrl:
                                    "https://aramizdakioyuncu.com/galeri/yazi/1poster1715776167.jpg",
                                fit: BoxFit.cover,
                              ),
                            ),
                            const Text(
                              "Fatsa'da Türk Halk Müziği Konseri Yapıldı.",
                              style: TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const Text(
                              "Fatsa'da düzenlenen türk halk müziği etkinliğinden kalan fotoğraflar ve düşün celerimiz.",
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const Align(
                              alignment: Alignment.centerRight,
                              child: Text(
                                "Berkay TİKENOĞLU",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      color: colorbg,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          children: [
                            const Text(
                              "Duyuru",
                            ),
                            CachedNetworkImage(
                              imageUrl:
                                  "https://aramizdakioyuncu.com/galeri/ana-yapi/google-play-logo.png",
                              fit: BoxFit.cover,
                            ),
                            const Text(
                              "Google Play Store a yeni çıkan uygulamamızı indirmeyi unutmayın",
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const Align(
                              alignment: Alignment.centerRight,
                              child: Text(
                                "Berkay TİKENOĞLU",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 600,
                      width: double.infinity,
                      child: PlatformWebViewWidget(
                        PlatformWebViewWidgetCreationParams(
                          controller: controller.discordiframe.value,
                        ),
                      ).build(context),
                    )
                  ],
                ),
              ),
            ],
          ),
        )
      ],
    );
  }
}
