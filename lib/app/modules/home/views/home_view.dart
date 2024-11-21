import 'package:aramizdakioyuncucom/app/modules/home/controllers/home_controller.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/appbar_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/footer_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(HomeController());
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    return Scaffold(
      key: scaffoldKey,
      backgroundColor: Colors.black87,
      appBar: AppbarWidget.costum1(context, scaffoldKey),
      endDrawer: Applist.currentUser.value == null
          ? null
          : Drawer(
              shape:
                  const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
              backgroundColor: Colors.black,
              child: ListView(
                padding: EdgeInsets.zero,
                children: <Widget>[
                  DrawerHeader(
                    margin: const EdgeInsets.all(0),
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: CachedNetworkImageProvider(
                          Applist
                              .currentUser.value!.banner!.mediaURL.minURL.value,
                        ),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: const Text('Drawer Header'),
                  ),
                  const ListTile(
                    leading: FaIcon(
                      FontAwesomeIcons.pencil,
                      color: Colors.white,
                    ),
                    title: Text('Yazılarım'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
                  ),
                  const ListTile(
                    leading: FaIcon(
                      FontAwesomeIcons.lifeRing,
                      color: Colors.white,
                    ),
                    title: Text('Bildirimlerim'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
                  ),
                  const ListTile(
                    leading: FaIcon(
                      FontAwesomeIcons.comment,
                      color: Colors.white,
                    ),
                    title: Text('Yorumum'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
                  ),
                  const ListTile(
                    leading: FaIcon(
                      FontAwesomeIcons.chartSimple,
                      color: Colors.white,
                    ),
                    title: Text('Anketler'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
                  ),
                  ListTile(
                    leading: const FaIcon(
                      FontAwesomeIcons.peopleGroup,
                      color: Colors.white,
                    ),
                    title: const Text('Gruplar'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
                    onTap: () {
                      Get.toNamed("/gruplar");
                    },
                  ),
                  const ListTile(
                    leading: FaIcon(
                      FontAwesomeIcons.ticket,
                      color: Colors.white,
                    ),
                    title: Text('Çekiliş'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
                  ),
                  const ListTile(
                    leading: FaIcon(
                      FontAwesomeIcons.graduationCap,
                      color: Colors.white,
                    ),
                    title: Text('Eğitim'),
                    tileColor: Colors.black,
                    textColor: Colors.white,
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
      body: SingleChildScrollView(
        child: Column(
          children: [
            CarouselSlider.builder(
              options: CarouselOptions(
                height: 700,
                aspectRatio: 16 / 9,
                viewportFraction: 1,
                initialPage: 0,
                enableInfiniteScroll: true,
                reverse: false,
                autoPlay: true,
                autoPlayInterval: const Duration(seconds: 3),
                autoPlayAnimationDuration: const Duration(milliseconds: 1500),
                autoPlayCurve: Curves.fastOutSlowIn,
                enlargeCenterPage: true,
                enlargeFactor: 0.3,
                onPageChanged: (index, reason) {},
                scrollDirection: Axis.horizontal,
              ),
              itemCount: Applist.defaultslider.length,
              itemBuilder: (context, index, realIndex) {
                return Container(
                  width: Get.width,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: CachedNetworkImageProvider(
                        Applist.defaultslider[index],
                      ),
                      fit: BoxFit.cover,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: const BoxDecoration(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(5)),
                                    color: Colors.black45,
                                  ),
                                  child: const Column(
                                    children: [
                                      Text(
                                        'Spor ',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: Colors.white,
                                        ),
                                      ),
                                      Text(
                                        "Peki sen oynucu olarak yaptığın sporda daha fazla heyecan ve olayın içinde hissetmek mi istiyorsun o zaman normal sporlara alalım da vucüd dengenle beraber en iyi performansını sergile bu sporlar tamamen fiziki bir şekilde oynanır. o zaman seni Futbol ve Voleybol Turnuvalarımıza bekleriz.takımını oluştur...",
                                        style: TextStyle(
                                          color: Colors.white,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: const BoxDecoration(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(5)),
                                    color: Colors.black45,
                                  ),
                                  child: const Column(
                                    children: [
                                      Text(
                                        'E-Spor ',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: Colors.white,
                                        ),
                                      ),
                                      Text(
                                        "Yada sen ekran başında bizim gibi bileklerinin kuvvetleriyle bir şeyler yapmaya bayılıyorsun o zaman seni E-spor turnuvalarımıza alalım ve çeşitli ödülleri ile bileğinin hakkını verelim. E-spor kariyerinde üstün başarılarını bizimle yakala ve milli takımlarımızda senin de yerin olsun hemen gruplardan takımını oluştur...",
                                        style: TextStyle(
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
            CachedNetworkImage(
              imageUrl:
                  "https://aramizdakioyuncu.com/galeri/tanitim/tanitim.jpg",
            ),
            Container(
              height: 120,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Color.fromARGB(255, 0, 245, 212),
                    Color.fromARGB(255, 230, 0, 255),
                  ],
                  begin: Alignment.centerLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: const Row(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.man,
                          color: Colors.white,
                          size: 65,
                        ),
                        Text(
                          "1419",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.woman,
                          color: Colors.white,
                          size: 65,
                        ),
                        Text(
                          "90",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          ),
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
            FooterWidget.custom(),
          ],
        ),
      ),
    );
  }
}
