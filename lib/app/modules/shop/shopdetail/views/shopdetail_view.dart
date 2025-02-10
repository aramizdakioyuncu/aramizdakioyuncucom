import 'package:aramizdakioyuncucom/app/modules/shop/shop_widgets/shopappbar_widget.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ShopdetailView extends StatelessWidget {
  const ShopdetailView({super.key});

  @override
  Widget build(BuildContext context) {
    var ordercount = 1.obs;
    return BodyWidget.custom1(
      context,
      body: [
        ShopappbarWidget.asa(),
        Row(
          children: [
            Expanded(
              child: Column(
                children: [
                  SizedBox(
                    height: 200,
                    child: CachedNetworkImage(
                      imageUrl:
                          "https://aramizdakioyuncu.com/galeri/images/1ufaklik21672255178.png",
                      fit: BoxFit.contain,
                    ),
                  ),
                  Wrap(
                    children: List.generate(
                      21,
                      (index) {
                        return Padding(
                          padding: const EdgeInsets.all(1.0),
                          child: Container(
                            width: 60,
                            height: 60,
                            color: Colors.black,
                            child: CachedNetworkImage(
                              imageUrl:
                                  "https://aramizdakioyuncu.com/galeri/images/1ufaklik21672255178.png",
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              width: 300,
              child: Column(
                children: [
                  const Text("2019-2020 ARMOYU Forma"),
                  CachedNetworkImage(
                    imageUrl:
                        "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu.png",
                  ),
                  const Text("ARMOYU - Topluluğu ve Grupları"),
                  const Text("600,00₺"),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            Container(
                              color: Colors.amber,
                              height: 40,
                              width: 50,
                              child: Padding(
                                padding: EdgeInsets.all(8.0),
                                child: Center(
                                  child: Obx(
                                    () => Text(
                                      ordercount.value.toString(),
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                InkWell(
                                  onTap: () {
                                    if (ordercount.value >= 10) {
                                      return;
                                    }
                                    ordercount.value++;
                                  },
                                  child: Container(
                                    width: 40,
                                    height: 20,
                                    color: Colors.grey.shade500,
                                    child: const Icon(
                                      Icons.arrow_upward,
                                      size: 9,
                                    ),
                                  ),
                                ),
                                InkWell(
                                  onTap: () {
                                    if (ordercount.value <= 1) {
                                      return;
                                    }
                                    ordercount.value--;
                                  },
                                  child: Container(
                                    width: 40,
                                    height: 20,
                                    color: Colors.grey.shade500,
                                    child: const Icon(
                                      Icons.arrow_downward,
                                      size: 9,
                                    ),
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "SEPETE EKLE",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        const Text("ÜRÜn açıklaması."),
      ],
    );
  }
}
