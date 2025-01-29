import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class EditorGamesView extends StatelessWidget {
  const EditorGamesView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "Oyun Adı",
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "Yapımcısı/Yapımcı Firma",
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "Oyun Logo",
          ),
        ),
        ARMOYU.widget.elevatedButton.costum2(
          icon: const Icon(Icons.add),
          text: "Oyun Ekle",
          onPressed: () {},
          loadingStatus: false,
        ),
        Table(
          columnWidths: const {
            0: FixedColumnWidth(200),
            // 1: FixedColumnWidth(120),
            2: FixedColumnWidth(200),
            3: FixedColumnWidth(200),
            4: FixedColumnWidth(80),
          },
          children: [
            const TableRow(
              children: [
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Oyun Logo',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Oyun Adı',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Yapımcısı/Yapımcı Firma',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Oyunun Kurulma/Piyasa Tarihi',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(child: Text('İşlem')),
                ),
              ],
            ),
            ...List.generate(
              10,
              (index) {
                return TableRow(
                  children: [
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: CachedNetworkImage(
                          height: 100,
                          width: 200,
                          imageUrl:
                              "https://steamcdn-a.akamaihd.net/steam/apps/563560/header.jpg?t=1568751918",
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'Reactive Drop Team',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'Bilinmeyen yapımcı',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        '02.11.2020',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ARMOYU.widget.elevatedButton.costum2(
                          icon: const Icon(Icons.edit),
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
    );
  }
}
