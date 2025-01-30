import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ControlpanelSchoolsView extends StatelessWidget {
  const ControlpanelSchoolsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Table(
        columnWidths: const {
          0: FixedColumnWidth(30),
          // 1: FixedColumnWidth(120),
          2: FixedColumnWidth(150),
          3: FixedColumnWidth(80),
          4: FixedColumnWidth(150),
          5: FixedColumnWidth(100),
        },
        children: [
          const TableRow(
            children: [
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Center(
                  child: Text(
                    '#',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Text(
                  'Okul Adı',
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Text(
                  'İl/İlçe',
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Center(
                  child: Text(
                    'Öğrenci S.',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Center(
                  child: Text(
                    'Temsilci',
                  ),
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Center(
                  child: Text(
                    '',
                  ),
                ),
              ),
            ],
          ),
          ...List.generate(
            10,
            (index) {
              return TableRow(
                decoration: BoxDecoration(
                  color: index % 2 == 0
                      ? Colors.grey.shade200
                      : Colors.white, // Striped Efekti
                ),
                children: [
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        '${index + 1}',
                      ),
                    ),
                  ),
                  const TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Row(
                      children: [
                        CircleAvatar(
                          foregroundImage: CachedNetworkImageProvider(
                            "https://aramizdakioyuncu.com/galeri/okulresimleri/1logominnak1716379394.png",
                          ),
                        ),
                        SizedBox(width: 5),
                        Expanded(
                          child: Text(
                            'Cumhuriyet Üniversitesi',
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      '	SİVAS/MERKEZ',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        '60',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  const TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Column(
                      children: [
                        CircleAvatar(
                          foregroundImage: CachedNetworkImageProvider(
                            "https://aramizdakioyuncu.com/galeri/okulresimleri/1logominnak1716379394.png",
                          ),
                        ),
                        SizedBox(width: 5),
                        Text(
                          'Berkay Tikenoğlu',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ARMOYU.widget.elevatedButton.costum2(
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
    );
  }
}
