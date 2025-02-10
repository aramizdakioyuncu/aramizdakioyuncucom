import 'package:aramizdakioyuncucom/app/modules/shop/shop_mypage/controllers/shopmypage_controller.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_widgets/shopappbar_widget.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/card_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ShopmypageView extends StatelessWidget {
  const ShopmypageView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ShopmypageController());
    return BodyWidget.custom1(
      context,
      body: [
        ShopappbarWidget.asa(),
        Row(
          children: [
            Container(
              color: Colors.grey,
              width: 300,
              child: const Column(
                children: [
                  ExpansionTile(
                    title: Text("Ürünler (41)"),
                    children: [
                      ListTile(
                        title: Text(
                          "Ürün Ekle",
                          style: TextStyle(
                            color: Colors.red,
                          ),
                        ),
                      ),
                      ListTile(
                        title: Text(
                          "Yayında (0)",
                          style: TextStyle(
                            color: Colors.red,
                          ),
                        ),
                      ),
                      ListTile(
                        title: Text(
                          "Taslak (0)",
                          style: TextStyle(
                            color: Colors.red,
                          ),
                        ),
                      ),
                      ListTile(
                        title: Text(
                          "Yayında Olan İlanlar (0)",
                          style: TextStyle(
                            color: Colors.red,
                          ),
                        ),
                      ),
                    ],
                  ),
                  ExpansionTile(
                    title: Text("Aboneliklerim (2)"),
                    children: [],
                  ),
                  ExpansionTile(
                    title: Text("İstatistik"),
                    children: [],
                  ),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: [
                    CardWidget.analysticcard(controller.categoryStatusList),
                    Table(
                      columnWidths: const {
                        0: FixedColumnWidth(30),
                        1: FixedColumnWidth(200),
                        5: FixedColumnWidth(100),
                      },
                      children: [
                        const TableRow(
                          children: [
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Center(
                                child: Text("#"),
                              ),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Sipariş Tarihi"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Sipariş Özeti"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Alıcı"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Tutar"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Center(
                                child: Text(""),
                              ),
                            ),
                          ],
                        ),
                        ...List.generate(
                          3,
                          (index) {
                            return TableRow(
                              decoration: BoxDecoration(
                                color: index % 2 == 0
                                    ? Colors.grey.shade200
                                    : Colors.white, // Striped Efekti
                              ),
                              children: [
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Center(
                                    child: Text("1"),
                                  ),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("23 Aralık 2021 - 00:25"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("1 Teslimat, 1 Ürün"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("BERKAY TİKENOĞLU"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("128,78 TL"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: ARMOYU.widget.elevatedButton.costum1(
                                      text: "DETAY",
                                      onPressed: () {},
                                      loadingStatus: false,
                                    ),
                                  ),
                                ),
                              ],
                            );
                          },
                        )
                      ],
                    ),
                    const Text("data"),
                    Table(
                      columnWidths: const {
                        0: FixedColumnWidth(30),
                        1: FixedColumnWidth(200),
                        5: FixedColumnWidth(100),
                      },
                      children: [
                        const TableRow(
                          children: [
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Center(
                                child: Text("#"),
                              ),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Depratman"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Konu"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Son Güncellenme"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Durum"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Center(
                                child: Text(""),
                              ),
                            ),
                          ],
                        ),
                        ...List.generate(
                          3,
                          (index) {
                            return TableRow(
                              decoration: BoxDecoration(
                                color: index % 2 == 0
                                    ? Colors.grey.shade200
                                    : Colors.white, // Striped Efekti
                              ),
                              children: [
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Center(
                                    child: Text("1"),
                                  ),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("Satış"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("Ödemenin Gecikmesi"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("2 Saat Önce"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("Açık"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: ARMOYU.widget.elevatedButton.costum1(
                                      text: "DETAY",
                                      onPressed: () {},
                                      loadingStatus: false,
                                    ),
                                  ),
                                ),
                              ],
                            );
                          },
                        )
                      ],
                    ),
                    const Text("data"),
                    Table(
                      columnWidths: const {
                        0: FixedColumnWidth(30),
                        1: FixedColumnWidth(200),
                        6: FixedColumnWidth(100),
                      },
                      children: [
                        const TableRow(
                          children: [
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Center(
                                child: Text("#"),
                              ),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Fatura"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Fatura Tarihi"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Son Ödeme Tarihi"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Tutar"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Durum"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text(""),
                            ),
                          ],
                        ),
                        ...List.generate(
                          3,
                          (index) {
                            return TableRow(
                              decoration: BoxDecoration(
                                color: index % 2 == 0
                                    ? Colors.grey.shade200
                                    : Colors.white, // Striped Efekti
                              ),
                              children: [
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Center(
                                    child: Text("1"),
                                  ),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("Youtube"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("10.02.2025"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("20.02.2025"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("255₺"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("Ödendi"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: ARMOYU.widget.elevatedButton.costum1(
                                      text: "DETAY",
                                      onPressed: () {},
                                      loadingStatus: false,
                                    ),
                                  ),
                                ),
                              ],
                            );
                          },
                        )
                      ],
                    ),
                    const Text("data"),
                    Table(
                      columnWidths: const {
                        0: FixedColumnWidth(30),
                        1: FixedColumnWidth(200),
                        5: FixedColumnWidth(100),
                      },
                      children: [
                        const TableRow(
                          children: [
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Center(
                                child: Text("#"),
                              ),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Ürün/Hizmet"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Tutar"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Kalan Süre"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text("Fiyat"),
                            ),
                            TableCell(
                              verticalAlignment:
                                  TableCellVerticalAlignment.middle,
                              child: Text(""),
                            ),
                          ],
                        ),
                        ...List.generate(
                          3,
                          (index) {
                            return TableRow(
                              decoration: BoxDecoration(
                                color: index % 2 == 0
                                    ? Colors.grey.shade200
                                    : Colors.white, // Striped Efekti
                              ),
                              children: [
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Center(
                                    child: Text("1"),
                                  ),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("Youtube"),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("10 TL"),
                                ),
                                TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Column(
                                    children: [
                                      const Text("20.02.2025"),
                                      Stack(
                                        children: [
                                          LinearProgressIndicator(
                                            value: 0.8,
                                            minHeight: 20,
                                            backgroundColor: Colors.grey[300],
                                            color: Colors.amber,
                                          ),
                                          const Center(
                                            child: Text("10 Gün"),
                                          )
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                                const TableCell(
                                  verticalAlignment:
                                      TableCellVerticalAlignment.middle,
                                  child: Text("255₺"),
                                ),
                                TableCell(
                                  child: Center(
                                    child: ARMOYU.widget.elevatedButton.costum1(
                                      text: "DETAY",
                                      onPressed: () {},
                                      loadingStatus: false,
                                    ),
                                  ),
                                ),
                              ],
                            );
                          },
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        )
      ],
    );
  }
}
