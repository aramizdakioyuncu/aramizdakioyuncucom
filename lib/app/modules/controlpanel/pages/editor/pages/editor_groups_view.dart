import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class EditorGroupsView extends StatelessWidget {
  const EditorGroupsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Table(
          columnWidths: const {
            0: FixedColumnWidth(80),
            2: FixedColumnWidth(100),
            3: FixedColumnWidth(100),
            4: FixedColumnWidth(200),
            5: FixedColumnWidth(80),
            6: FixedColumnWidth(80),
          },
          children: [
            const TableRow(
              children: [
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Grup Logo',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Grup Adı',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Grup Türü',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(
                    child: Text(
                      'Grup Detay',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text(
                    'Kurucu',
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Center(child: Text('Durum')),
                ),
                TableCell(
                  verticalAlignment: TableCellVerticalAlignment.middle,
                  child: Text('İşlem'),
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
                          imageUrl:
                              "${APIConstants.storageDomain}/galeri/ana-yapi/armoyu.png",
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'Eğlenceli Ekip',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Text(
                        'E-Spor/Takım',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Center(
                        child: Text(
                          'CS:GO',
                        ),
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Row(
                        children: [
                          CircleAvatar(
                            foregroundImage: CachedNetworkImageProvider(
                              "${APIConstants.storageDomain}/galeri/profilresimleri/11107minnak1734823245.jpg",
                            ),
                          ),
                          SizedBox(width: 5),
                          Expanded(
                            child: Text(
                              "sfasfsafasf saf sa ",
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Center(
                          child: Icon(
                            Icons.error,
                            color: Colors.red,
                            size: 35,
                          ),
                        ),
                      ),
                    ),
                    TableCell(
                      verticalAlignment: TableCellVerticalAlignment.middle,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ARMOYU.widget.elevatedButton.costum2(
                          icon: const Icon(Icons.delete),
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
