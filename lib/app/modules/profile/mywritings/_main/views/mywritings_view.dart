import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class MywritingsView extends StatelessWidget {
  const MywritingsView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                  title: "Başlık",
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  placeholder: "Grand Theft Auto VI Çıkış Tarihi Belli Oldu"),
            ),
            ARMOYU.widget.elevatedButton.costum1(
              text: "Oluştur",
              onPressed: () {},
              loadingStatus: false,
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Table(
                columnWidths: const {
                  0: FixedColumnWidth(30),
                  1: FixedColumnWidth(200),
                  2: FlexColumnWidth(1),
                },
                children: [
                  const TableRow(
                    children: [
                      Center(child: Text("No")),
                      Align(
                        alignment: Alignment.center,
                        child: Text("Fotoğraf"),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Başlık"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Kategori"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Görüntülenme"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Yorumlar"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Durum"),
                        ),
                      ),
                    ],
                  ),
                  ...List.generate(
                    10,
                    (index) {
                      return TableRow(
                        children: [
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(child: Text("1")),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: CachedNetworkImage(
                                  imageUrl: "https://picsum.photos/200/100",
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text("Grand Theft Auto"),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text('Oyun'),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("11"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("0"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Column(
                              children: [
                                const Text("Yayında"),
                                ARMOYU.widget.elevatedButton.costum1(
                                  text: "Detay",
                                  onPressed: () {
                                    Functions.gotoPage(
                                      "/oyuncular/deneme/yazilarim/random",
                                      getnavgiate: true,
                                    );
                                  },
                                  loadingStatus: false,
                                )
                              ],
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ],
              ),
            )
          ],
        ),
      ],
    );
  }
}
