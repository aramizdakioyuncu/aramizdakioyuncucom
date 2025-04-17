import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class RaffledetailView extends StatelessWidget {
  const RaffledetailView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 180.0),
          child: Container(
            color: Colors.white,
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Row(
                        children: [
                          CircleAvatar(
                            radius: 100,
                          ),
                          Spacer(),
                          Text("Dr.Oetker Hamur Kabartma Tozu 15'li 150 gr*5"),
                        ],
                      ),
                      DataTable(
                        dataRowMaxHeight: double.infinity,
                        columns: const [
                          DataColumn(label: Text('#')),
                          DataColumn(label: Text('Adı Soyadı')),
                          DataColumn(label: Text('kazanma/Katılma')),
                          DataColumn(label: Text('Durum')),
                        ],
                        rows: [
                          ...List.generate(
                            10,
                            (index) {
                              return DataRow(
                                cells: [
                                  DataCell(
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Text(
                                        (index + 1).toString(),
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Row(
                                        children: [
                                          InkWell(
                                            onTap: () {
                                              // Get.toNamed("/oyuncular/nero");
                                              Functions.gotoPage(
                                                "/oyuncular/nero",
                                              );
                                            },
                                            child: const CircleAvatar(
                                              foregroundImage:
                                                  CachedNetworkImageProvider(
                                                "${APIConstants.storageDomain}/galeri/profilresimleri/42profilresimminnak1689979489.jpg",
                                              ),
                                            ),
                                          ),
                                          const SizedBox(width: 10),
                                          const Text(
                                            'Ali Veli',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  const DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Text(
                                        '3/11',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                  const DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Text(
                                        'Hüsrana Uğrayan',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(
                  width: 260,
                  child: Column(
                    children: [
                      Text(
                        "Çekilişlere katılmak için oturum açmak gerekir",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                        textAlign: TextAlign.center,
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        )
      ],
    );
  }
}
