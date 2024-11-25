import 'dart:developer';

import 'package:aramizdakioyuncucom/app/modules/home/controllers/home_controller.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(HomeController());
    log((Applist.currentUser.value == null).toString());

    return BodyWidget.custom1(context, body: [
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
        imageUrl: "https://aramizdakioyuncu.com/galeri/tanitim/tanitim.jpg",
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
    ]);
  }
}
