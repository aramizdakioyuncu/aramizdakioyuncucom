import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GroupdetailView extends StatelessWidget {
  const GroupdetailView({super.key});

  @override
  Widget build(Object context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    return BodyWidget.custom1(
      context,
      scaffoldKey,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 90.0),
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
                          "https://aramizdakioyuncu.com/galeri/gruplar/1gruplarbanner1661124266.png",
                        ),
                        fit: BoxFit.cover,
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
                              "https://aramizdakioyuncu.com/galeri/gruplar/116gruplarlogoufaklik1664915337.png",
                            ),
                            radius: 60,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.black45,
                            borderRadius: BorderRadius.circular(5),
                          ),
                          child: const Padding(
                            padding: EdgeInsets.all(4.0),
                            child: Text(
                              "RIHTIM",
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              GridView.builder(
                shrinkWrap:
                    true, // GridView içinde kaydırma yapabilmek için shrinkWrap: true ekliyoruz
                physics:
                    const NeverScrollableScrollPhysics(), // GridView'ın kendi kaydırılmasını engelliyoruz
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 5, // 4 sütunlu ızgara düzeni
                  crossAxisSpacing: 1, // Sütunlar arasındaki boşluk
                  mainAxisSpacing: 1, // Satırlar arasındaki boşluk
                  childAspectRatio: 0.5,
                ),
                itemCount: 6, // Toplamda 6 öğe
                itemBuilder: (context, index) {
                  return InkWell(
                    onTap: () {},
                    child: Material(
                      color: Colors.transparent,
                      child: Wrap(
                        children: [
                          Container(
                            height: 400,
                            width: double.infinity,
                            decoration: const BoxDecoration(
                              gradient: LinearGradient(
                                colors: [
                                  Colors.blue,
                                  Color.fromARGB(255, 7, 103, 151),
                                  Color.fromARGB(255, 3, 41, 107),
                                  Colors.black,
                                ],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  InkWell(
                                    onTap: () {
                                      Get.toNamed("/oyuncular/detail");
                                    },
                                    child: const CircleAvatar(
                                      foregroundImage:
                                          CachedNetworkImageProvider(
                                        "https://aramizdakioyuncu.com/galeri/gruplar/116gruplarlogominnak1664915337.png",
                                      ),
                                      radius: 80,
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  const Padding(
                                    padding: EdgeInsets.all(4.0),
                                    child: Text(
                                      "RIHTIM",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  const Text(
                                    "Köy Muhtarı",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ],
    );
  }
}
