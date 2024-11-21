import 'package:aramizdakioyuncucom/app/widgets/appbar_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/footer_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:country_flags/country_flags.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    return Scaffold(
      appBar: AppbarWidget.costum1(context, scaffoldKey),
      endDrawer: Drawer(
        // endDrawer kullanarak sağdan çıkan drawer
        child: ListView(
          padding: EdgeInsets.zero,
          children: const <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
            ),
            ListTile(
              title: Text('Item 1'),
            ),
            ListTile(
              title: Text('Item 2'),
            ),
            ListTile(
              title: Text('Item 3'),
            ),
          ],
        ),
      ),
      // drawer: Drawer(
      //   child: ListView(
      //     padding: EdgeInsets.zero,
      //     children: const <Widget>[
      //       DrawerHeader(
      //         decoration: BoxDecoration(
      //           color: Colors.blue,
      //         ),
      //         child: Text('Drawer Header'),
      //       ),
      //       ListTile(
      //         title: Text('Item 1'),
      //       ),
      //       ListTile(
      //         title: Text('Item 2'),
      //       ),
      //       ListTile(
      //         title: Text('Item 3'),
      //       ),
      //     ],
      //   ),
      // ),
      body: Stack(
        children: [
          CachedNetworkImage(
            width: Get.width,
            height: Get.height,
            imageUrl:
                "https://aramizdakioyuncu.com/galeri/profilresimleri/1profilsayfaresim1664972413.jpg",
            fit: BoxFit.cover,
          ),
          SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 80.0),
                  child: Column(
                    children: [
                      Stack(
                        children: [
                          Container(
                            height: 380,
                            width: double.infinity,
                            decoration: const BoxDecoration(
                              image: DecorationImage(
                                image: CachedNetworkImageProvider(
                                  "https://aramizdakioyuncu.com/galeri/ana-yapi/banner.jpg",
                                ),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          Positioned(
                            top: 0,
                            left: 10,
                            child: Container(
                              decoration: BoxDecoration(
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black
                                        .withOpacity(0.3), // Gölgenin rengi
                                    offset:
                                        const Offset(4, 4), // Gölgenin kayması
                                    blurRadius: 6, // Gölgenin bulanıklığı
                                  ),
                                ],
                              ),
                              child: RotatedBox(
                                quarterTurns: 1,
                                child: CountryFlag.fromCountryCode(
                                  'tr',
                                  width: 60,
                                  height: 40,
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
                                    color: Colors.red,
                                    shape: BoxShape.circle, // Dairesel şekil
                                    border: Border.all(
                                      color: Colors.blue, // Şerit rengi
                                      width: 3, // Şerit genişliği
                                    ),
                                  ),
                                  child: const CircleAvatar(
                                    foregroundColor: Colors.transparent,
                                    foregroundImage: CachedNetworkImageProvider(
                                      "https://aramizdakioyuncu.com/galeri/profilresimleri/1profilresimufaklik1722033975.jpg",
                                    ),
                                    radius: 60,
                                  ),
                                ),
                                Container(
                                  decoration: BoxDecoration(
                                    color: Colors.black45,
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  child: const Padding(
                                    padding: EdgeInsets.all(4.0),
                                    child: Text(
                                      "Berkay TİKENOĞLU",
                                      style: TextStyle(
                                        color: Colors.white,
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
                        color: Colors.white,
                        child: Column(
                          children: [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.steam,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.instagram,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.facebook,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.twitch,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.youtube,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.linkedin,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.reddit,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.github,
                                      color: Colors.red,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () {},
                                    icon: const FaIcon(
                                      FontAwesomeIcons.discord,
                                      color: Colors.red,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Expanded(
                                  child: Align(
                                    alignment: Alignment.centerLeft,
                                    child: Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            "Hakkımda",
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          Text(
                                            "TÜRKİYE, ORDU",
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          Row(
                                            children: [
                                              FaIcon(
                                                FontAwesomeIcons.calendarDays,
                                                size: 14,
                                              ),
                                              Text(
                                                "10 ŞUBAT 2018",
                                                style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ],
                                          ),
                                          Text(
                                            "OĞLAK",
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          Text(
                                            "HAKKIMDA AÇIKLAMALAR",
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
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
                                          6,
                                          (index) {
                                            return const Padding(
                                              padding: EdgeInsets.all(2.0),
                                              child: CircleAvatar(
                                                backgroundColor:
                                                    Colors.transparent,
                                                foregroundImage:
                                                    CachedNetworkImageProvider(
                                                  "https://steamcdn-a.akamaihd.net/steam/apps/550/header.jpg?t=1568751918",
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
                                                backgroundColor:
                                                    Colors.transparent,
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
                                          6,
                                          (index) {
                                            return const Padding(
                                              padding: EdgeInsets.all(2.0),
                                              child: CircleAvatar(
                                                backgroundColor:
                                                    Colors.transparent,
                                                foregroundImage:
                                                    CachedNetworkImageProvider(
                                                  "https://aramizdakioyuncu.com/galeri/profilresimleri/20profilresimminnak1702810595.png",
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
                                                backgroundColor:
                                                    Colors.transparent,
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
                                                backgroundColor:
                                                    Colors.transparent,
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
                                                backgroundColor:
                                                    Colors.transparent,
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
                    ],
                  ),
                ),
                FooterWidget.custom(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
