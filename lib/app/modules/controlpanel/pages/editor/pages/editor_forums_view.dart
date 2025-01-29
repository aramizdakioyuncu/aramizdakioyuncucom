import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';

class EditorForumsView extends StatelessWidget {
  const EditorForumsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Table(
          columnWidths: const {
            0: FixedColumnWidth(30),
            // 1: FixedColumnWidth(100),
            2: FixedColumnWidth(100),
            3: FixedColumnWidth(100),
            4: FixedColumnWidth(100),
            5: FixedColumnWidth(200),
          },
          children: [
            const TableRow(
              children: [
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'ID',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Konu',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Oluşturan',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Yanıt',
                    overflow: TextOverflow.ellipsis,
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
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      '',
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
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'Java ile 4 basamalı sayıların basamağını parçalama',
                        overflow: TextOverflow.ellipsis,
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
                          'Kapalı',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: ARMOYU.widget.elevatedButton.costum2(
                              text: "Detay",
                              onPressed: () {},
                              loadingStatus: false,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: ARMOYU.widget.elevatedButton.costum2(
                              icon: const Icon(Icons.delete),
                              background: Colors.red,
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
