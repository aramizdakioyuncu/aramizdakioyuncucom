import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/app_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/spotlightsearch_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppbarWidget {
  static costum1(context, GlobalKey<ScaffoldState> drawer) {
    var isTextFieldVisible = false.obs;

    return PreferredSize(
      preferredSize: const Size.fromHeight(kToolbarHeight),
      child: AppBar(
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: InkWell(
            onTap: () => Get.toNamed("/home"),
            child: CachedNetworkImage(
              imageUrl:
                  "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu64.png",
            ),
          ),
        ),
        actions: [
          TextButton(
              onPressed: () {
                Get.toNamed("/gruplar");
              },
              child: const Text("Gruplar")),
          TextButton(onPressed: () {}, child: const Text("Galeriler")),
          TextButton(onPressed: () {}, child: const Text("Haberler")),
          TextButton(onPressed: () {}, child: const Text("Ekibimiz")),
          TextButton(onPressed: () {}, child: const Text("Çekilişler")),
          TextButton(onPressed: () {}, child: const Text("Forum")),
          TextButton(onPressed: () {}, child: const Text("Modlar")),
          TextButton(onPressed: () {}, child: const Text("Mağaza")),
          TextButton(onPressed: () {}, child: const Text("Projeler")),
          // Obx(
          //   () => AnimatedSize(
          //     duration: const Duration(milliseconds: 300),
          //     curve: Curves.easeInOut,
          //     child: isTextFieldVisible.value
          //         ? SizedBox(
          //             width: 100,
          //             child: TextField(
          //               controller: searchController.value,
          //               style: const TextStyle(
          //                 color: Colors.white,
          //               ),
          //               onChanged: (value) {
          //                 searchText.value = value;
          //                 log(value);
          //               },
          //               decoration: const InputDecoration(
          //                 hintText: "Ara...",
          //                 border: InputBorder.none, // Sınırları kaldır
          //                 focusedBorder:
          //                     OutlineInputBorder(), // Odaklanmış sınır yok
          //                 isCollapsed: true, // İçeriği daralt, kaymayı önler
          //               ),
          //             ),
          //           )
          //         : const SizedBox.shrink(),
          //   ),
          // ),

          IconButton(
            onPressed: () {
              isTextFieldVisible.value = !isTextFieldVisible.value;

              SpotlightSearchWidget.showSpotlightDialog(context);
            },
            icon: const Icon(Icons.search),
          ),
          Obx(
            () => Applist.currentUser.value == null
                ? IconButton(
                    onPressed: () {
                      AppWidget.loginModal(
                        Get.context!,
                      );
                    },
                    icon: const Icon(Icons.person),
                  )
                : Row(
                    children: [
                      IconButton(
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return Stack(
                                children: [
                                  Positioned(
                                    top: 50,
                                    right: 0,
                                    child: Material(
                                      color: Colors.transparent,
                                      child: Container(
                                        width: 500,
                                        height: 300,
                                        decoration: BoxDecoration(
                                          color: const Color.fromARGB(
                                            255,
                                            33,
                                            33,
                                            33,
                                          ),
                                          boxShadow: [
                                            BoxShadow(
                                              color:
                                                  Colors.black.withOpacity(0.2),
                                              blurRadius: 10,
                                              offset: const Offset(0, 5),
                                            ),
                                          ],
                                        ),
                                        child: SingleChildScrollView(
                                          child: Column(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              ...List.generate(
                                                15,
                                                (index) {
                                                  return Material(
                                                    color: Colors.transparent,
                                                    child: ListTile(
                                                      contentPadding:
                                                          const EdgeInsets.all(
                                                              0),
                                                      leading: const Padding(
                                                        padding:
                                                            EdgeInsets.all(4.0),
                                                        child: CircleAvatar(
                                                          backgroundColor:
                                                              Colors
                                                                  .transparent,
                                                          foregroundImage:
                                                              CachedNetworkImageProvider(
                                                            "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu.png",
                                                          ),
                                                        ),
                                                      ),
                                                      title: const Text(
                                                        "Test Kullanıcı",
                                                        style: TextStyle(
                                                          color: Colors.white,
                                                        ),
                                                      ),
                                                      subtitle: Column(
                                                        children: [
                                                          const Align(
                                                            alignment: Alignment
                                                                .centerLeft,
                                                            child: Text(
                                                              "Test Kullanıcı Arkadaşın Olmak istiyor",
                                                              style: TextStyle(
                                                                color:
                                                                    Colors.red,
                                                              ),
                                                            ),
                                                          ),
                                                          Align(
                                                            alignment: Alignment
                                                                .centerLeft,
                                                            child: Row(
                                                              mainAxisSize:
                                                                  MainAxisSize
                                                                      .min,
                                                              children: [
                                                                ElevatedButton(
                                                                  onPressed:
                                                                      () {},
                                                                  child:
                                                                      const Text(
                                                                    "KABUL Et",
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                    width: 10),
                                                                ElevatedButton(
                                                                  style:
                                                                      const ButtonStyle(
                                                                    backgroundColor:
                                                                        WidgetStatePropertyAll(
                                                                      Colors
                                                                          .red,
                                                                    ),
                                                                  ),
                                                                  onPressed:
                                                                      () {},
                                                                  child:
                                                                      const Text(
                                                                    "REDDET",
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          )
                                                        ],
                                                      ),
                                                      onTap: () {},
                                                    ),
                                                  );
                                                },
                                              )
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            },
                          );
                        },
                        icon: const Icon(Icons.notifications),
                      ),
                      InkWell(
                        onTap: () {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return Stack(
                                children: [
                                  Positioned(
                                    top: 50,
                                    right: 0,
                                    child: Material(
                                      color: Colors.transparent,
                                      child: Container(
                                        width: 300,
                                        decoration: BoxDecoration(
                                          color: Colors.white,
                                          boxShadow: [
                                            BoxShadow(
                                              color:
                                                  Colors.black.withOpacity(0.2),
                                              blurRadius: 10,
                                              offset: const Offset(0, 5),
                                            ),
                                          ],
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(18.0),
                                          child: Column(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              Row(
                                                children: [
                                                  Obx(
                                                    () => CircleAvatar(
                                                      foregroundImage:
                                                          CachedNetworkImageProvider(
                                                        Applist
                                                            .currentUser
                                                            .value!
                                                            .avatar!
                                                            .mediaURL
                                                            .minURL
                                                            .value,
                                                      ),
                                                      radius: 32,
                                                    ),
                                                  ),
                                                  Expanded(
                                                    child: Column(
                                                      children: [
                                                        Padding(
                                                          padding:
                                                              const EdgeInsets
                                                                  .all(8.0),
                                                          child: Align(
                                                            alignment: Alignment
                                                                .centerLeft,
                                                            child: Obx(
                                                              () => Text(
                                                                Applist
                                                                    .currentUser
                                                                    .value!
                                                                    .displayName!
                                                                    .value,
                                                                style:
                                                                    const TextStyle(
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                        const Padding(
                                                          padding:
                                                              EdgeInsets.all(
                                                                  8.0),
                                                          child: Align(
                                                            alignment: Alignment
                                                                .centerLeft,
                                                            child: Text(
                                                              "Oturum Saati: 0 Saniye",
                                                              style: TextStyle(
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold,
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              const SizedBox(height: 10),
                                              Row(
                                                children: [
                                                  const Spacer(),
                                                  ElevatedButton(
                                                    style: const ButtonStyle(
                                                      padding:
                                                          WidgetStatePropertyAll(
                                                        EdgeInsets.zero,
                                                      ),
                                                    ),
                                                    onPressed: () {
                                                      Get.toNamed("/oyuncular");
                                                    },
                                                    child: const Padding(
                                                      padding: EdgeInsets.all(
                                                        8.0,
                                                      ),
                                                      child: Text(
                                                        'PROFİLE GİT',
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                          fontSize: 10,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                  const Spacer(),
                                                  ElevatedButton(
                                                    style: const ButtonStyle(
                                                      padding:
                                                          WidgetStatePropertyAll(
                                                        EdgeInsets.zero,
                                                      ),
                                                    ),
                                                    onPressed: () {
                                                      Applist.currentUser
                                                          .value = null;
                                                      Functions.box
                                                          .remove('userTOKEN');
                                                      Functions.box.remove(
                                                          'currentUser');
                                                      Get.back();
                                                    },
                                                    child: const Padding(
                                                      padding:
                                                          EdgeInsets.all(8.0),
                                                      child: Text(
                                                        'OTURUMU KAPAT',
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                          fontSize: 10,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                  const Spacer(),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            },
                          );
                        },
                        child: CircleAvatar(
                          backgroundColor: Colors.transparent,
                          foregroundImage: CachedNetworkImageProvider(
                            Applist.currentUser.value!.avatar!.mediaURL
                                .normalURL.value,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: () {
                          drawer.currentState?.openDrawer();
                          drawer.currentState?.openEndDrawer();
                        },
                        icon: const Icon(
                          Icons.menu,
                          size: 40,
                        ),
                      ),
                    ],
                  ),
          ),
        ],
      ),
    );
  }
}
