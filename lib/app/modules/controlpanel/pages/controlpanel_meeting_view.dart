import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';

class ControlpanelMeetingView extends StatelessWidget {
  const ControlpanelMeetingView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Row(
            children: [
              SizedBox(
                width: 200,
                child: ARMOYU.widget.textField.costum3(
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  title: "TARİH",
                ),
              ),
              const Spacer(),
              ARMOYU.widget.elevatedButton.costum1(
                text: "TOPLANTI OLUŞTUR",
                onPressed: () {},
                loadingStatus: false,
              ),
            ],
          ),
          Table(
            columnWidths: const {
              1: FixedColumnWidth(100),
              2: FixedColumnWidth(150),
              3: FixedColumnWidth(80),
              4: FixedColumnWidth(100),
            },
            children: [
              const TableRow(
                children: [
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Toplantı',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Yönetim',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Zaman',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Katılım',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      '',
                      overflow: TextOverflow.ellipsis,
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
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'Toplantı 1',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: CircleAvatar(),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          '12:00 28.01.2023',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text('23/30'),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "İNCELE",
                          onPressed: () {},
                          loadingStatus: false,
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
