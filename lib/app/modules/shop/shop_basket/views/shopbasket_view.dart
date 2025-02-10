import 'package:aramizdakioyuncucom/app/modules/shop/shop_widgets/shopappbar_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ShopbasketView extends StatelessWidget {
  const ShopbasketView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        ShopappbarWidget.asa(),
        Row(
          children: [
            Expanded(
              child: Table(
                children: [
                  const TableRow(
                    children: [
                      TableCell(
                        child: Center(
                          child: Text("#"),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text("Resim"),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text("Adet"),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text("Satıcı"),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text("B.Fiyat"),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text("T.Fiyat"),
                        ),
                      ),
                      TableCell(
                        child: Center(
                          child: Text(""),
                        ),
                      ),
                    ],
                  ),
                  ...List.generate(
                    2,
                    (index) {
                      return TableRow(
                        children: [
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("1"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: CachedNetworkImage(
                                imageUrl:
                                    "https://aramizdakioyuncu.com/galeri/images/1ufaklik21672255178.png",
                              ),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("2"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Column(
                                children: [
                                  CircleAvatar(),
                                  Text("ARMOYU"),
                                ],
                              ),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("110"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("220"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Checkbox(
                                value: true,
                                onChanged: (value) {},
                              ),
                            ),
                          ),
                        ],
                      );
                    },
                  )
                ],
              ),
            ),
            SizedBox(
              width: 300,
              child: Column(
                children: [
                  const Text(
                    "528,00₺",
                    style: TextStyle(
                      fontSize: 50,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Table(
                          children: const [
                            TableRow(
                              children: [
                                TableCell(
                                  child: Text("Ürünler"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: Text(
                                      "440,00 TL",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            TableRow(
                              children: [
                                TableCell(
                                  child: Text("KDV"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: Text(
                                      "88,00 TL",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const Divider(color: Colors.red),
                        Table(
                          children: const [
                            TableRow(
                              children: [
                                TableCell(
                                  child: Text("Toplam"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: Text(
                                      "528,00 TL",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Row(
                    children: [
                      Checkbox(
                        value: false,
                        onChanged: (value) {},
                      ),
                      const Expanded(
                        child: Text(
                          "Uzaktan Satış Sözleşmesini Okudum, Anladım ve Kabul ediyorum",
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(1.0),
                          child: InkWell(
                            onTap: () {},
                            child: CachedNetworkImage(
                              height: 80,
                              imageUrl:
                                  "https://aramizdakioyuncu.com/galeri/odeme/shopier_logo.png",
                              filterQuality: FilterQuality.high,
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(1.0),
                          child: InkWell(
                            onTap: () {},
                            child: CachedNetworkImage(
                              height: 80,
                              imageUrl:
                                  "https://aramizdakioyuncu.com/galeri/odeme/dikdortgen-logo-paytr.jpg",
                              filterQuality: FilterQuality.high,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          ],
        )
      ],
    );
  }
}
