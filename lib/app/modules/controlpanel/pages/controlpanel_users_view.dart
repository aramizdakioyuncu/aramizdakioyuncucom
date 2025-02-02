import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';

class ControlpanelUsersView extends StatelessWidget {
  const ControlpanelUsersView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Table(
            columnWidths: const {
              0: FixedColumnWidth(30),
              2: FixedColumnWidth(200),
              3: FixedColumnWidth(100),
              4: FixedColumnWidth(80),
              5: FixedColumnWidth(30),
              6: FixedColumnWidth(100),
              7: FixedColumnWidth(80),
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
                      'Adı Soyadı',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Kullanıcı Adı',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Kayıt Tarihi',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Yetki',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Yaş',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Son Giriş',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(''),
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
                            (index + 1).toString(),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Row(
                          children: [
                            CircleAvatar(),
                            SizedBox(width: 5),
                            Expanded(
                              child: Text(
                                'Berkay Tikenoğlu',
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'berkaytikenoglu',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          '01.01.2017',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'Kurucu',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text('23'),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'Çevrimiçi',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      TableCell(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ARMOYU.widget.elevatedButton.costum2(
                            icon: const Icon(Icons.search),
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
          )
        ],
      ),
    );
  }
}
