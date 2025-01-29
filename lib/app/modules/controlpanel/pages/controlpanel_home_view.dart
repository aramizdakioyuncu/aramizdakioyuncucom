import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class ControlpanelHomeView extends StatelessWidget {
  const ControlpanelHomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Table(
            columnWidths: const {
              1: FixedColumnWidth(100),
              2: FixedColumnWidth(100),
              3: FixedColumnWidth(50),
              4: FixedColumnWidth(100),
              5: FixedColumnWidth(100),
              6: FixedColumnWidth(80),
            },
            children: [
              const TableRow(
                children: [
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
                      'Yetki',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Kayıt Eden',
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
                    child: Text(
                      'Toplantı E-Y',
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
                          'Kurucu',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'ARMOYU',
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
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Row(
                          children: [
                            Padding(
                              padding: EdgeInsets.all(2.0),
                              child: FaIcon(
                                FontAwesomeIcons.check,
                                size: 12,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.all(2.0),
                              child: FaIcon(
                                FontAwesomeIcons.check,
                                size: 12,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.all(2.0),
                              child: FaIcon(
                                FontAwesomeIcons.check,
                                size: 12,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.all(2.0),
                              child: FaIcon(
                                FontAwesomeIcons.check,
                                size: 12,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.all(2.0),
                              child: FaIcon(
                                FontAwesomeIcons.check,
                                size: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                      TableCell(
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
          )
        ],
      ),
    );
  }
}
