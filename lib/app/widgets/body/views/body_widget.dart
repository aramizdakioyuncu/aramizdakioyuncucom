import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/appbar_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/controllers/body_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/cookie_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/footer_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class BodyWidget {
  static Widget custom1(
    context, {
    RxString? bgImage,
    bool transparentBody = false,
    bool fullWidth = false,
    required List<Widget> body,
  }) {
    // "${APIConstants.storageDomain}/galeri/ana-yapi/anakisarkaplan.webp"
    // "${APIConstants.storageDomain}/galeri/ana-yapi/anaarkaplan.jpg"
    // "${APIConstants.storageDomain}/galeri/ana-yapi/anakisarkaplan.webp"
    bgImage ??= RxString(
        "https://api.aramizdakioyuncu.com/galeri/ana-yapi/anakisarkaplan.webp");
    if (bgImage.value == "") {
      bgImage.value =
          "https://api.aramizdakioyuncu.com/galeri/ana-yapi/anakisarkaplan.webp";
    }

    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final controller = Get.put(BodyController());

    var scrollController = ScrollController().obs;

    return Scaffold(
      key: scaffoldKey,
      appBar: AppbarWidget.costum1(context, scaffoldKey),
      drawer: Padding(
        padding:
            const EdgeInsets.only(top: 105), // Burada margin-top etkisi sağlar

        child: Drawer(
          backgroundColor: Colors.black,
          child: Column(
            children: [
              ExpansionTile(
                collapsedIconColor: Colors.white,
                title: const Text(
                  'Gruplar',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                children: [
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/gruplar/search/e-spor",
                        getnavgiate: true,
                      );
                    },
                    leading:
                        const Icon(Icons.sports_esports, color: Colors.white),
                    title: const Text(
                      "E-spor",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/gruplar/search/spor",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.sports, color: Colors.white),
                    title: const Text(
                      "spor",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/gruplar/search/yazilim-gelistirme",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.engineering, color: Colors.white),
                    title: const Text(
                      "Yazılım & Geliştirme",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
              ExpansionTile(
                collapsedIconColor: Colors.white,
                title: const Text(
                  'Galeriler',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                children: [
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/galeriler/american-truck-simulator",
                        getnavgiate: true,
                      );
                    },
                    leading:
                        const Icon(Icons.sports_esports, color: Colors.white),
                    title: const Text(
                      "American Truck Simulator",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/galeriler/asseto-corsa",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.sports, color: Colors.white),
                    title: const Text(
                      "Assetto Corsa",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/galeriler/euro-truck-simulator-2",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.engineering, color: Colors.white),
                    title: const Text(
                      "Euro Truck Simulator 2",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/haberler/",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Haberler",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              ExpansionTile(
                collapsedIconColor: Colors.white,
                title: const Text(
                  'Ekibimiz',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                children: [
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/ekibimiz/ekibimiz",
                        getnavgiate: true,
                      );
                    },
                    title: const Text(
                      "Ekibimiz",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/ekibimiz/okul-temsilcileri",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.school, color: Colors.white),
                    title: const Text(
                      "Okul Temsilcileri",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/kurallarimiz",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.rule, color: Colors.white),
                    title: const Text(
                      "Kurallarımız",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/hakkimizda",
                        getnavgiate: true,
                      );
                    },
                    leading: const Icon(Icons.info, color: Colors.white),
                    title: const Text(
                      "Hakkımızda",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  ListTile(
                    onTap: () {
                      Functions.gotoPage(
                        "/gizlilik-politikasi",
                        getnavgiate: true,
                      );
                    },
                    leading:
                        const Icon(Icons.file_copy_sharp, color: Colors.white),
                    title: const Text(
                      "Gizlilik Politikası",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/gizlilik-politikasi",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Çekilişler",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/gizlilik-politikasi",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Forum",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/gizlilik-politikasi",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Modlar",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/etkinlikler",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Etkinlikler",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/magaza",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Mağaza",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
              ListTile(
                onTap: () {
                  Functions.gotoPage(
                    "/projeler",
                    getnavgiate: true,
                  );
                },
                title: const Text(
                  "Projeler",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      endDrawer: Applist.currentUser.value == null
          ? const Drawer()
          : Drawer(
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.zero,
              ),
              backgroundColor: Colors.black,
              child: Column(
                children: [
                  Expanded(
                    child: ListView(
                      padding: EdgeInsets.zero,
                      children: [
                        DrawerHeader(
                          margin: const EdgeInsets.all(0),
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: CachedNetworkImageProvider(
                                Applist.currentUser.value!.banner!.mediaURL
                                    .minURL.value,
                              ),
                              fit: BoxFit.cover,
                            ),
                          ),
                          child: const Text(''),
                        ),
                        ListTile(
                          leading: const FaIcon(
                            FontAwesomeIcons.pencil,
                            color: Colors.white,
                          ),
                          title: const Text('Yazılarım'),
                          tileColor: Colors.black,
                          textColor: Colors.white,
                          onTap: () {
                            final username =
                                Applist.currentUser.value!.userName!;
                            Functions.gotoPage(
                              "/oyuncular/$username/yazilarim",
                              getnavgiate: true,
                            );
                          },
                        ),
                        ListTile(
                          leading: const FaIcon(
                            FontAwesomeIcons.lifeRing,
                            color: Colors.white,
                          ),
                          title: const Text('Bildirimlerim'),
                          tileColor: Colors.black,
                          textColor: Colors.white,
                          onTap: () {
                            final username =
                                Applist.currentUser.value!.userName!;

                            Functions.gotoPage(
                              "/oyuncular/$username/bildirilerim",
                              getnavgiate: true,
                            );
                          },
                        ),
                        ListTile(
                          leading: const FaIcon(
                            FontAwesomeIcons.comment,
                            color: Colors.white,
                          ),
                          title: const Text('Yorumum'),
                          tileColor: Colors.black,
                          textColor: Colors.white,
                          onTap: () {},
                        ),
                        if (Applist.currentUser.value!.role!.roleID == 1)
                          ListTile(
                            leading: const FaIcon(
                              FontAwesomeIcons.userSecret,
                              color: Colors.white,
                            ),
                            title: const Text('Yönetim Paneli'),
                            tileColor: Colors.black,
                            textColor: Colors.white,
                            onTap: () {
                              Functions.gotoPage(
                                "/controlpanel",
                                getnavgiate: true,
                              );
                            },
                          ),
                        ListTile(
                          leading: const FaIcon(
                            FontAwesomeIcons.chartSimple,
                            color: Colors.white,
                          ),
                          title: const Text('Anketler'),
                          tileColor: Colors.black,
                          textColor: Colors.white,
                          onTap: () {
                            final username =
                                Applist.currentUser.value!.userName!;
                            Functions.gotoPage(
                              "/oyuncular/$username/anketler",
                              getnavgiate: true,
                            );
                          },
                        ),
                        Obx(
                          () => ExpansionTile(
                            leading: const FaIcon(
                              FontAwesomeIcons.peopleGroup,
                              color: Colors.white,
                            ),
                            title: const Text(
                              'Gruplar',
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            collapsedIconColor: Colors.white,
                            children: controller.mygroups.value == null
                                ? []
                                : List.generate(
                                    controller.mygroups.value!.length,
                                    (index) {
                                      return ListTile(
                                        leading: CircleAvatar(
                                          backgroundColor: Colors.transparent,
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            controller.mygroups.value![index]
                                                .groupLogo.mediaURL.normalURL,
                                          ),
                                        ),
                                        title: Text(
                                          controller
                                              .mygroups.value![index].groupName,
                                        ),
                                        tileColor: Colors.black,
                                        textColor: Colors.white,
                                        onTap: () {
                                          Functions.gotoPage(
                                            "/gruplar/${controller.mygroups.value![index].groupURL}",
                                            getnavgiate: true,
                                          );
                                        },
                                      );
                                    },
                                  ),
                          ),
                        ),
                        ListTile(
                          leading: const FaIcon(
                            FontAwesomeIcons.ticket,
                            color: Colors.white,
                          ),
                          title: const Text('Çekiliş'),
                          tileColor: Colors.black,
                          textColor: Colors.white,
                          onTap: () {
                            Functions.gotoPage("/cekilisler",
                                getnavgiate: true);
                          },
                        ),
                        ListTile(
                          leading: const FaIcon(
                            FontAwesomeIcons.graduationCap,
                            color: Colors.white,
                          ),
                          title: const Text('Eğitim'),
                          tileColor: Colors.black,
                          textColor: Colors.white,
                          onTap: () {
                            Functions.gotoPage("/okullar/", getnavgiate: true);
                          },
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.elevatedButton.costum2(
                      icon: const Icon(
                        Icons.dark_mode,
                      ),
                      onPressed: () {
                        // ARMOYU.services.darkMode();
                        Get.changeThemeMode(
                          Get.isDarkMode ? ThemeMode.light : ThemeMode.dark,
                        );
                      },
                      loadingStatus: false,
                    ),
                  ),
                ],
              ),
            ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Stack(
            children: [
              Stack(
                children: [
                  MediaQuery.of(context).size.width < 1000
                      ? SizedBox(
                          width: MediaQuery.of(context).size.width,
                          height: MediaQuery.of(context).size.height,
                        )
                      : Obx(
                          () => CachedNetworkImage(
                            imageUrl: bgImage!.value,
                            fit: BoxFit.cover,
                            width: MediaQuery.of(context).size.width,
                            height: MediaQuery.of(context).size.height,
                          ),
                        ),
                  SingleChildScrollView(
                    controller: scrollController.value,
                    child: Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.symmetric(
                            horizontal: fullWidth ||
                                    MediaQuery.of(context).size.width < 1000
                                ? 0.0
                                : MediaQuery.of(context).size.width * 0.080,
                          ),
                          child: Container(
                            color: transparentBody
                                ? null
                                : Get.theme.scaffoldBackgroundColor,
                            child: Column(
                              children: body,
                            ),
                          ),
                        ),
                        FooterWidget.custom(),
                      ],
                    ),
                  ),
                ],
              ),

              // controller.widgetchat.value ?? Container(),
              // controller.widgetchatdetail.value ?? Container(),

              Obx(
                () => !Applist.provicypolity.value
                    ? CookieWidget.custom1()
                    : Container(),
              ),
            ],
          );
        },
      ),
    );
  }
}
