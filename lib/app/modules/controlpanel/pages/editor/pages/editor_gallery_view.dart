import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class EditorGalleryView extends StatelessWidget {
  const EditorGalleryView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Table(
          columnWidths: const {
            0: FixedColumnWidth(200),
            1: FixedColumnWidth(100),
            // 2: FixedColumnWidth(200),
            3: FixedColumnWidth(200),
            4: FixedColumnWidth(80),
          },
          children: [
            const TableRow(
              children: [
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
                      'Sahip',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Kategori Oyunu',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Durum',
                    overflow: TextOverflow.ellipsis,
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
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: CachedNetworkImage(
                            width: 200,
                            height: 200,
                            imageUrl:
                                "https://aramizdakioyuncu.com/galeri/images/10024ufaklik31723678496.jpg",
                          ),
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
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'Bilinmeyen yapımcı',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ARMOYU.widget.elevatedButton.costum2(
                          text: "Güncelle",
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
