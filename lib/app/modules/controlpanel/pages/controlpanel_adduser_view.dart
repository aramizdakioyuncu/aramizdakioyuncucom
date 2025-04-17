import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ControlpanelAdduserView extends StatelessWidget {
  const ControlpanelAdduserView({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Row(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: CachedNetworkImage(
                  height: 200,
                  width: 200,
                  imageUrl:
                      "${APIConstants.storageDomain}/galeri/ana-yapi/armoyu.png",
                ),
              ),
              Expanded(
                child: ARMOYU.widget.textField.costum3(
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  title: "Oyuncu Ara",
                ),
              ),
              const SizedBox(
                width: 200,
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: ListBody(
                    children: [
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("1- Profil Fotoğrafı Değiştirilmiş Olmalı"),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("2- Telefon Numarası Girilmiş Olmalı"),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                            "3- Kayıtlı Oyuncu Olduktan Sonra oyunlarda discord sunucumuzda bulunmalı"),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("4- Kurallarımızı Okumalı ve Bilmeli"),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                            "5- Topluluk içinde herkese saygılı davranmalı"),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Center(
              child: ARMOYU.widget.elevatedButton.costum1(
                text: "OYUNCU EKLE",
                onPressed: () {},
                loadingStatus: false,
              ),
            ),
          ),
          Table(
            columnWidths: const {
              0: FixedColumnWidth(30),
              2: FixedColumnWidth(100),
              3: FixedColumnWidth(50),
              4: FixedColumnWidth(150),
              5: FixedColumnWidth(180),
            },
            children: [
              const TableRow(
                children: [
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'No',
                      overflow: TextOverflow.ellipsis,
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
                      'Cep Cumarası',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        'Yaş',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'E-posta',
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
                            Expanded(
                              child: Text(
                                '01',
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'Berkay TİKENOĞLU',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          '500 000 00 00',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(child: Text('23')),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'mail@mail.com',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      TableCell(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ARMOYU.widget.elevatedButton.costum2(
                            text: "K.O ÇIKAR",
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
      ),
    );
  }
}
