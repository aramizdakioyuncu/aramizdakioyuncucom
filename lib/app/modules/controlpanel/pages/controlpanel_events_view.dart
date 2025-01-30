import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ControlpanelEventsView extends StatelessWidget {
  const ControlpanelEventsView({super.key});

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
                child: SizedBox(
                  width: 200,
                  child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      onChanged: (val) {},
                      title: "Oyuncu Seçim"),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SizedBox(
                  width: 200,
                  child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      onChanged: (val) {},
                      title: "Oyun Seçim"),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SizedBox(
                  width: 200,
                  child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      onChanged: (val) {},
                      title: "Mevki Seç"),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ARMOYU.widget.elevatedButton.costum1(
                    text: "EKLE",
                    onPressed: () {},
                    loadingStatus: false,
                  ),
                ),
              ),
            ],
          ),
          Table(
            columnWidths: const {
              0: FixedColumnWidth(30),
              // 1: FixedColumnWidth(120),
              2: FixedColumnWidth(200),
              3: FixedColumnWidth(200),
              4: FixedColumnWidth(150),
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
                      'Oyun',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Text(
                      'Mevki',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        'İşlem',
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
                            CircleAvatar(),
                            SizedBox(width: 5),
                            Expanded(
                              child: Text(
                                'Yılmaz Emre Akşahin',
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'Euro Truck Simulator',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          'Oyun Yetkilisi',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ARMOYU.widget.elevatedButton.costum2(
                            text: "YETKİYİ AL",
                            background: Colors.red,
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
          Wrap(
            alignment: WrapAlignment.center,
            children: [
              SizedBox(
                width: Get.width * 0.5 - 150,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ARMOYU.widget.textField.costum3(
                    controller: TextEditingController(),
                    title: "Etkinlik Adı",
                    onChanged: (val) {},
                  ),
                ),
              ),
              SizedBox(
                width: Get.width * 0.5 - 150,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ARMOYU.widget.textField.costum3(
                    controller: TextEditingController(),
                    title: "Oyun Adı",
                    onChanged: (val) {},
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SizedBox(
                  width: 250,
                  child: ARMOYU.widget.textField.costum3(
                    controller: TextEditingController(),
                    title: "Etkinlik Zaman",
                    onChanged: (val) {},
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SizedBox(
                  width: 250,
                  child: ARMOYU.widget.textField.costum3(
                    controller: TextEditingController(),
                    title: "Katılımcı Sayıs (0 Limit Yok)",
                    onChanged: (val) {},
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SizedBox(
                  width: 400,
                  child: ARMOYU.widget.textField.costum3(
                    controller: TextEditingController(),
                    title: "Minimum Oyuncu Değerlendirme Puanı (ODP)",
                    onChanged: (val) {},
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: ARMOYU.widget.elevatedButton.costum1(
                  text: "EKLE",
                  onPressed: () {},
                  loadingStatus: false,
                ),
              )
            ],
          ),
          Table(
            columnWidths: const {
              0: FixedColumnWidth(30),
              // 1: FixedColumnWidth(100),
              2: FixedColumnWidth(200),
              3: FixedColumnWidth(200),
              4: FixedColumnWidth(150),
              5: FixedColumnWidth(200),
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
                    child: Center(
                      child: Text(
                        'Oyun',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        'Etkinlik Yönetim',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        'Zaman',
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        'Katılım',
                      ),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Center(
                      child: Text(
                        'Katılım',
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
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: CachedNetworkImage(
                                imageUrl:
                                    "https://aramizdakioyuncu.com/galeri/oyun-logolari/futboll.png",
                                height: 50,
                                width: 80,
                                fit: BoxFit.contain,
                              ),
                            ),
                            const SizedBox(width: 5),
                            const Text(
                              'Futbol',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Column(
                          children: [
                            CircleAvatar(
                              foregroundImage: CachedNetworkImageProvider(
                                  "https://aramizdakioyuncu.com/galeri/profilresimleri/10377profilresimminnak1691610524.jpg"),
                            ),
                            SizedBox(width: 5),
                            Text(
                              'Yılmaz Emre Akşahin',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Text(
                          '19:30\n30.05.2024',
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                      const TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Center(
                          child: Text(
                            '14/16',
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ),
                      TableCell(
                        verticalAlignment: TableCellVerticalAlignment.middle,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: ARMOYU.widget.elevatedButton.costum2(
                                icon: const Icon(Icons.search),
                                onPressed: () {},
                                loadingStatus: false,
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: ARMOYU.widget.elevatedButton.costum2(
                                icon: const Icon(Icons.search),
                                text: "SİL",
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
      ),
    );
  }
}
