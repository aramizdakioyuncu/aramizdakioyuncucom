import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SupportView extends StatelessWidget {
  const SupportView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Wrap(
            children: [
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Column(
                  children: [
                    const FaIcon(
                      FontAwesomeIcons.scaleBalanced,
                      size: 70,
                    ),
                    const SizedBox(height: 15),
                    SizedBox(
                      width: 100,
                      child: ARMOYU.widget.elevatedButton.costum1(
                        text: "Şikayet",
                        background: Colors.red,
                        onPressed: () {
                          final username = Applist.currentUser.value!.userName!;

                          Functions.gotoPage(
                            "/oyuncular/$username/bildirilerim/sikayetler",
                            getnavgiate: true,
                          );
                        },
                        loadingStatus: false,
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Column(
                  children: [
                    const FaIcon(
                      FontAwesomeIcons.lightbulb,
                      size: 70,
                    ),
                    const SizedBox(height: 15),
                    SizedBox(
                      width: 100,
                      child: ARMOYU.widget.elevatedButton.costum1(
                        text: "Öneri",
                        background: Colors.amber,
                        onPressed: () {
                          final username = Applist.currentUser.value!.userName!;

                          Functions.gotoPage(
                            "/oyuncular/$username/bildirilerim/oneriler",
                            getnavgiate: true,
                          );
                        },
                        loadingStatus: false,
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Column(
                  children: [
                    const FaIcon(
                      FontAwesomeIcons.users,
                      size: 70,
                    ),
                    const SizedBox(height: 15),
                    SizedBox(
                      width: 100,
                      child: ARMOYU.widget.elevatedButton.costum1(
                        text: "Toplantı",
                        background: Colors.blue,
                        onPressed: () {
                          final username = Applist.currentUser.value!.userName!;

                          Functions.gotoPage(
                            "/oyuncular/$username/bildirilerim/toplantilar",
                            getnavgiate: true,
                          );
                        },
                        loadingStatus: false,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Table(
            children: [
              const TableRow(
                children: [
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text("Şikayet Edilen"),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text("Konu"),
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
                      child: Text("Sonuç"),
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
              ...List.generate(3, (index) {
                return TableRow(
                  children: [
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text("Test Kullanıcısı"),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child:
                            Text("Saygısız (Topluluğa rencide edici tavırlar)"),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text("Yanıtlandı"),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text("Kabul Edildi	"),
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "Detaylar",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ),
                    ),
                  ],
                );
              }),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Table(
            children: [
              const TableRow(
                children: [
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text("Şikayet Edilen"),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text("Konu"),
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
                      child: Text("Sonuç"),
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
              ...List.generate(3, (index) {
                return TableRow(
                  children: [
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text("Test Kullanıcısı"),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child:
                            Text("Saygısız (Topluluğa rencide edici tavırlar)"),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text("Yanıtlandı"),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text("Kabul Edildi	"),
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "Detaylar",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ),
                    ),
                  ],
                );
              }),
            ],
          ),
        ),
      ],
    );
  }
}
