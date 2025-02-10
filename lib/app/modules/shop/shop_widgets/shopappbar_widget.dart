import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ShopappbarWidget {
  static Widget asa() {
    return Column(
      children: [
        AppBar(
          backgroundColor: Colors.black,
          leading: InkWell(
            onTap: () {
              Functions.gotoPage(
                "/magaza",
                getnavgiate: true,
              );
            },
            child: CachedNetworkImage(
              imageUrl:
                  "https://aramizdakioyuncu.com/galeri/ana-yapi/logolar/armoyu-yemek.jpeg",
            ),
          ),
          title: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            placeholder: "Arama",
            onChanged: (val) {},
          ),
          actions: [
            PopupMenuButton<String>(
              color: const Color.fromARGB(255, 33, 37, 41),
              icon: const Row(
                children: [
                  Icon(
                    Icons.person,
                    color: Colors.white,
                  ),
                  Text(
                    'PROFİLİM',
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

              offset: const Offset(0, 40), // Menü aşağıda açılır
              itemBuilder: (context) => [
                const PopupMenuItem(
                  value: 'sayfam',
                  child: Row(
                    children: [
                      Icon(Icons.stacked_line_chart_outlined,
                          color: Colors.white),
                      SizedBox(width: 10),
                      Text(
                        'Sayfam',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'siparisler',
                  child: Row(
                    children: [
                      Icon(Icons.view_in_ar_outlined, color: Colors.white),
                      SizedBox(width: 10),
                      Text(
                        'Siparişler',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'begendiklerim',
                  child: Row(
                    children: [
                      Icon(Icons.heart_broken_sharp, color: Colors.white),
                      SizedBox(width: 10),
                      Text(
                        'Beğendiklerim',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'degerlendirmeler',
                  child: Row(
                    children: [
                      Icon(Icons.comment, color: Colors.white),
                      SizedBox(width: 10),
                      Text(
                        'degerlendirmeler',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'ayarlar',
                  child: Row(
                    children: [
                      Icon(Icons.settings, color: Colors.white),
                      SizedBox(width: 10),
                      Text(
                        'Ayarlar',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ],
              onSelected: (value) {
                Functions.gotoPage(
                  "/magaza/$value",
                  getnavgiate: true,
                );
              },
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.elevatedButton.costum2(
                background: Colors.amber,
                icon: const Icon(
                  Icons.shopping_cart,
                  color: Colors.white,
                ),
                text: "SEPETİM",
                onPressed: () {
                  Functions.gotoPage(
                    "magaza/sepetim",
                    getnavgiate: true,
                  );
                },
                loadingStatus: false,
              ),
            ),
          ],
        ),
        Container(
          color: Colors.black,
          width: double.infinity,
          height: 50,
          child: Row(
            children: [
              PopupMenuButton<String>(
                color: const Color.fromARGB(255, 33, 37, 41),
                icon: const Row(
                  children: [
                    Text(
                      'Vasıta',
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

                offset: const Offset(0, 40), // Menü aşağıda açılır
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    value: 'otomobil',
                    child: Row(
                      children: [
                        Icon(Icons.sports_esports, color: Colors.white),
                        SizedBox(width: 10),
                        Text(
                          'Otomobil',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                  const PopupMenuItem(
                    value: 'suv',
                    child: Row(
                      children: [
                        Icon(Icons.car_rental, color: Colors.white),
                        SizedBox(width: 10),
                        Text(
                          'SUV',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ],
                onSelected: (value) {
                  // Get.toNamed("/gruplar/$value");
                },
              ),
              PopupMenuButton<String>(
                color: const Color.fromARGB(255, 33, 37, 41),
                icon: const Row(
                  children: [
                    Text(
                      'Bilgisayar',
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

                offset: const Offset(0, 40), // Menü aşağıda açılır
                itemBuilder: (context) => [],
                onSelected: (value) {
                  // Get.toNamed("/gruplar/$value");
                },
              ),
              PopupMenuButton<String>(
                color: const Color.fromARGB(255, 33, 37, 41),
                icon: const Row(
                  children: [
                    Text(
                      'Direksiyon Seti',
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

                offset: const Offset(0, 40), // Menü aşağıda açılır
                itemBuilder: (context) => [],
                onSelected: (value) {
                  // Get.toNamed("/gruplar/$value");
                },
              ),
            ],
          ),
        ),
      ],
    );
  }
}
