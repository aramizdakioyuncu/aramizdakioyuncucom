import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class EditorNewsView extends StatelessWidget {
  const EditorNewsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Table(
          columnWidths: const {
            0: FixedColumnWidth(30),
            1: FixedColumnWidth(100),
            // 2: FixedColumnWidth(200),
            3: FixedColumnWidth(100),
            4: FixedColumnWidth(100),
            5: FixedColumnWidth(100),
            6: FixedColumnWidth(100),
            7: FixedColumnWidth(100),
          },
          children: [
            const TableRow(
              children: [
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'No',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Medya',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Başlık',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Kategori',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Görüntülenme',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Yorumlar',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Yazar',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Durum',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
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
                      child: Center(
                        child: Text(
                          (index + 1).toString(),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: CachedNetworkImage(
                            width: 200,
                            height: 100,
                            imageUrl:
                                "https://aramizdakioyuncu.com/galeri/yazi/1ufaklik17325_.jpg",
                          ),
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text(
                          'Haber Başlığı',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'Teknoloji',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text(
                          '0',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text(
                          '0',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Column(
                        children: [
                          CircleAvatar(),
                          Text(
                            'Test Kullanıcı',
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Column(
                        children: [
                          const Text("Aktif"),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: ARMOYU.widget.elevatedButton.costum2(
                              text: "Güncelle",
                              onPressed: () {},
                              loadingStatus: false,
                            ),
                          ),
                        ],
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
