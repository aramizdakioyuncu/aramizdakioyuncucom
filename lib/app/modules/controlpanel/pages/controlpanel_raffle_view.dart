import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ControlpanelRaffleView extends StatelessWidget {
  const ControlpanelRaffleView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Table(
        columnWidths: const {
          0: FixedColumnWidth(30),
          // 1: FixedColumnWidth(120),
          2: FixedColumnWidth(100),
          3: FixedColumnWidth(200),
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
                  'Tür',
                  overflow: TextOverflow.ellipsis,
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
                    'Kazanan',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Center(
                  child: Text(
                    'Zaman',
                  ),
                ),
              ),
              TableCell(
                verticalAlignment: TableCellVerticalAlignment.middle,
                child: Center(
                  child: Text(
                    'Katılımcı Sayısı',
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
                    child: Text(
                      'epin',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'steamkey',
                      overflow: TextOverflow.ellipsis,
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
                            'TEst Kullanıcısı',
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        '01.01.2022 22.22.00',
                        overflow: TextOverflow.ellipsis,
                      ),
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
                ],
              );
            },
          )
        ],
      ),
    );
  }
}
