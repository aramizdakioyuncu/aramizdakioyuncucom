import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_widgets/shopappbar_widget.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ShopView extends StatelessWidget {
  const ShopView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        ShopappbarWidget.asa(),
        Wrap(
          children: List.generate(
            12,
            (index) {
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: InkWell(
                  onTap: () {
                    Functions.gotoPage(
                      "/magaza/urun",
                      getnavgiate: true,
                    );
                  },
                  child: Container(
                    decoration: const BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black,
                          blurRadius: 1,
                        ),
                        BoxShadow(
                          color: Colors.pink,
                          blurRadius: 1,
                        ),
                        BoxShadow(
                          color: Colors.white,
                          blurRadius: 1,
                        ),
                      ],
                    ),
                    width: 200,
                    child: Column(
                      children: [
                        const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Row(
                            children: [
                              CircleAvatar(),
                              SizedBox(width: 5),
                              Expanded(
                                child: Text("Satıcı Adı"),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          height: 200,
                          color: Colors.black,
                          child: CachedNetworkImage(
                            imageUrl:
                                "${APIConstants.storageDomain}/galeri/images/1ufaklik21672255178.png",
                          ),
                        ),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            Text("(0)")
                          ],
                        ),
                        const Text("2019-2020 Forma"),
                        const Text("600"),
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
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
