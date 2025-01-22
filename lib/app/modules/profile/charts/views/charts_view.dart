import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ChartsView extends StatelessWidget {
  const ChartsView({super.key});

  @override
  Widget build(BuildContext context) {
    var textEditingController = TextEditingController().obs;
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Obx(
                () => ARMOYU.widget.textField.costum3(
                  controller: textEditingController.value,
                  onChanged: (val) {
                    textEditingController.refresh();
                  },
                  placeholder: "Bu sene Fenerbahçe şampiyon olur mu ?",
                  minLines: 5,
                  minLength: 10,
                  maxLength: 200,
                ),
              ),
              Table(
                columnWidths: const {
                  0: FlexColumnWidth(4),
                  1: FlexColumnWidth(2),
                  3: FlexColumnWidth(3),
                  4: FixedColumnWidth(80),
                  6: FixedColumnWidth(100),
                },
                children: [
                  const TableRow(
                    children: [
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Anket Sorusu"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Oluşturan"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Kalan Zaman"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Cevaplar"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Oylanma Yüzdesi"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text("Durum"),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text(""),
                        ),
                      ),
                    ],
                  ),
                  ...List.generate(
                    6,
                    (index) {
                      return TableRow(
                        children: [
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text(
                                  "Haftalık Toplantılar 2 haftada 1 mi yoksa ayda 1 kere mi olmalı ?"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Column(
                                children: [
                                  CircleAvatar(),
                                  Text("Test Kullanıcısı"),
                                ],
                              ),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Süre Bitti"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text(
                                  "2 Haftada bir kere %44 \nAyda bir kere %56"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("%50"),
                            ),
                          ),
                          const TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Kapalı"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: ARMOYU.widget.elevatedButton.costum1(
                                text: "SİL",
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
      ],
    );
  }
}
