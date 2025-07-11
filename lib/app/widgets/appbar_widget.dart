import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
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
    Functions.cookiesetup();

    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight +
          ((MediaQuery.of(context).size.width < 1000) ? 50 : 0)),
      child: LayoutBuilder(
        builder: (context, constraints) {
          return AppBar(
            backgroundColor: Colors.black,
            // forceMaterialTransparency: true,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: InkWell(
                onTap: () => Functions.gotoPage(
                  "/home",
                  getnavgiate: true,
                ),
                child: CachedNetworkImage(
                  imageUrl:
                      "${APIConstants.storageDomain}/galeri/ana-yapi/armoyu64.png",
                ),
              ),
            ),
            actions: [
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : PopupMenuButton<String>(
                      color: const Color.fromARGB(255, 33, 37, 41),
                      icon: const Row(
                        children: [
                          Text(
                            'Gruplar',
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          Icon(
                            Icons.arrow_drop_down_outlined,
                            color: Colors.white,
                          ),
                        ],
                      ),

                      offset: const Offset(0, 48), // Menü aşağıda açılır
                      itemBuilder: (context) => [
                        const PopupMenuItem(
                          value: 'e-spor',
                          child: Row(
                            children: [
                              Icon(Icons.sports_esports, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'E-Spor',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'spor',
                          child: Row(
                            children: [
                              Icon(Icons.sports, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Spor',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'yazilim-gelistirme',
                          child: Row(
                            children: [
                              Icon(Icons.engineering, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Yazılım & Geliştirme',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                      ],
                      onSelected: (value) {
                        // Get.toNamed("/gruplar/$value");
                        Functions.gotoPage(
                          "/gruplar/search/$value",
                          getnavgiate: true,
                        );
                      },
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : PopupMenuButton<String>(
                      icon: const Row(
                        children: [
                          Text(
                            'Galeriler',
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          Icon(
                            Icons.arrow_drop_down_outlined,
                            color: Colors.white,
                          ),
                        ],
                      ),
                      color: const Color.fromARGB(255, 33, 37, 41),
                      offset: const Offset(0, 48), // Menü aşağıda açılır

                      itemBuilder: (context) => [
                        const PopupMenuItem(
                          value: 'american-truck-simulator',
                          child: Row(
                            children: [
                              Icon(Icons.sports_esports, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'American Truck Simulator',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'assetto-Corsa',
                          child: Row(
                            children: [
                              Icon(Icons.sports_esports, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Assetto Corsa',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'euro-truck-simulator-2',
                          child: Row(
                            children: [
                              Icon(Icons.sports_esports, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Euro Truck Simulator 2',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                      ],
                      onSelected: (value) {
                        // Get.toNamed("/galeriler/$value");
                        Functions.gotoPage(
                          "/galeriler/$value",
                          getnavgiate: true,
                        );
                      },
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        // Get.toNamed("/haberler");
                        Functions.gotoPage(
                          "/haberler",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Haberler"),
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : PopupMenuButton<String>(
                      icon: const Row(
                        children: [
                          Text(
                            'Ekibimiz',
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          Icon(
                            Icons.arrow_drop_down_outlined,
                            color: Colors.white,
                          ),
                        ],
                      ),
                      color: const Color.fromARGB(255, 33, 37, 41),
                      offset: const Offset(0, 48), // Menü aşağıda açılır

                      itemBuilder: (context) => [
                        const PopupMenuItem(
                          value: 'ekibimiz',
                          child: Row(
                            children: [
                              Icon(Icons.business_rounded, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Ekibimiz',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'ekibimiz/okul-temsilcileri',
                          child: Row(
                            children: [
                              Icon(Icons.school_rounded, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Okul Temsilcileri',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'kurallarimiz',
                          child: Row(
                            children: [
                              Icon(Icons.rule_rounded, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Kurallarımız',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const PopupMenuItem(
                          value: 'hakkimizda',
                          child: Row(
                            children: [
                              Icon(Icons.info, color: Colors.white),
                              SizedBox(width: 10),
                              Text(
                                'Hakkımızda',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                      ],
                      onSelected: (value) {
                        // Get.toNamed("/$value");
                        Functions.gotoPage(
                          "/$value",
                          getnavgiate: true,
                        );
                      },
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        // Get.toNamed("/cekilisler");
                        Functions.gotoPage(
                          "/cekilisler",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Çekilişler"),
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        // Get.toNamed("/forum");
                        Functions.gotoPage(
                          "/forum",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Forum"),
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        Functions.gotoPage(
                          "/modlar",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Modlar"),
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        Functions.gotoPage(
                          "/etkinlikler",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Etkinlikler"),
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        // Get.toNamed("/magaza");
                        Functions.gotoPage(
                          "/magaza",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Mağaza"),
                    ),
              Get.width < 1000
                  ? const SizedBox.shrink()
                  : TextButton(
                      onPressed: () {
                        // Get.toNamed("/projeler");
                        Functions.gotoPage(
                          "/projeler",
                          getnavgiate: true,
                        );
                      },
                      child: const Text("Projeler"),
                    ),
              IconButton(
                onPressed: () {
                  isTextFieldVisible.value = !isTextFieldVisible.value;

                  SpotlightSearchWidget.showSpotlightDialog(context);
                },
                icon: const Icon(
                  Icons.search,
                  color: Colors.white,
                ),
              ),
              Applist.currentUser.value == null
                  ? IconButton(
                      onPressed: () {
                        AppWidget.loginModal(Get.context!);
                      },
                      icon: const Icon(
                        Icons.person,
                        color: Colors.white,
                      ),
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
                                                color: Colors.black
                                                    .withValues(alpha: 0.2),
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
                                                            const EdgeInsets
                                                                .all(0),
                                                        leading: const Padding(
                                                          padding:
                                                              EdgeInsets.all(
                                                                  4.0),
                                                          child: CircleAvatar(
                                                            backgroundColor:
                                                                Colors
                                                                    .transparent,
                                                            foregroundImage:
                                                                CachedNetworkImageProvider(
                                                              "${APIConstants.storageDomain}/galeri/ana-yapi/armoyu.png",
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
                                                                style:
                                                                    TextStyle(
                                                                  color: Colors
                                                                      .red,
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
                                                                      width:
                                                                          10),
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
                          icon: const Icon(
                            Icons.notifications,
                            color: Colors.white,
                          ),
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
                                        child: Container(
                                          width: 300,
                                          decoration: const BoxDecoration(
                                            boxShadow: [
                                              // BoxShadow(
                                              //   color:
                                              //       Colors.black.withOpacity(0.2),
                                              //   blurRadius: 10,
                                              //   offset: const Offset(0, 5),
                                              // ),
                                            ],
                                          ),
                                          child: Padding(
                                            padding: const EdgeInsets.all(18.0),
                                            child: Column(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                Row(
                                                  children: [
                                                    CircleAvatar(
                                                      backgroundColor:
                                                          Colors.transparent,
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
                                                              child: Text(
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
                                                          const Padding(
                                                            padding:
                                                                EdgeInsets.all(
                                                                    8.0),
                                                            child: Align(
                                                              alignment: Alignment
                                                                  .centerLeft,
                                                              child: Text(
                                                                "Oturum Saati: 0 Saniye",
                                                                style:
                                                                    TextStyle(
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
                                                        Functions.gotoPage(
                                                          "/oyuncular/${Applist.currentUser.value!.userName!.value}",
                                                          getnavgiate: true,
                                                        );
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
                                                        Functions.box.remove(
                                                            'userTOKEN');
                                                        Functions.box.remove(
                                                            'currentUser');
                                                        // Get.back();
                                                        Functions.reloadPage();
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
                            drawer.currentState?.openEndDrawer();
                          },
                          icon: const Icon(
                            Icons.menu,
                            color: Colors.white,
                            size: 40,
                          ),
                        ),
                      ],
                    ),
            ],

            bottom: (Get.width > 1000)
                ? null
                : PreferredSize(
                    preferredSize: const Size.fromHeight(50),
                    child: Container(
                      color: Colors.black,
                      width: double.infinity,
                      height: 50,
                      child: Row(
                        children: [
                          IconButton(
                            onPressed: () {
                              drawer.currentState?.openDrawer();
                            },
                            icon: const Icon(
                              Icons.menu,
                              color: Colors.white,
                              size: 40,
                            ),
                          ),
                          const Expanded(
                            child: Center(
                              child: Text(
                                "",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
          );
        },
      ),
    );
  }
}
