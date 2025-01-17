import 'dart:developer';

import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class RaffleView extends StatelessWidget {
  const RaffleView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 180.0),
          child: Container(
            color: Get.theme.scaffoldBackgroundColor,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Text(
                        """Yapılan çekilişler tamamen ücretsiz olup hiç bir firmanın (Google,Apple,Meta) sponsoru olmadığını belirtiriz.
                  Her oyuncu çekiliş yapabilir lakin belirttiği ödülü verip veremeyeceği (ARMOYU hariç) ödül yapan oyuncuya bağlıdır.
                  Tamamen eğlence amaçlı kullanılmaktadır.""",
                        style: TextStyle(fontWeight: FontWeight.bold),
                        textAlign: TextAlign.center,
                      ),
                      DataTable(
                        showCheckboxColumn: false,
                        dataRowMaxHeight: double.infinity,
                        columns: const [
                          DataColumn(label: Text('Çekiliş')),
                          DataColumn(label: Text('Düzenleyen')),
                          DataColumn(label: Text('Katılımcı')),
                          DataColumn(label: Text('Kalan Zaman')),
                          DataColumn(label: Text('Çekiliş Kazananı')),
                        ],
                        rows: [
                          ...List.generate(
                            10,
                            (index) {
                              return DataRow(
                                onSelectChanged: (value) {
                                  log(value.toString());
                                },
                                cells: const [
                                  DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          CircleAvatar(
                                            foregroundImage:
                                                CachedNetworkImageProvider(
                                                    "https://aramizdakioyuncu.com/galeri/ana-yapi/sosyal-hesaplar/steam-logo.png"),
                                          ),
                                          Text(
                                            'Yılbaşı Çekilişi',
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        children: [
                                          CircleAvatar(
                                            foregroundImage:
                                                CachedNetworkImageProvider(
                                              "https://aramizdakioyuncu.com/galeri/profilresimleri/42profilresimminnak1689979489.jpg",
                                            ),
                                          ),
                                          Text(
                                            'Ali Veli',
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          FaIcon(
                                            FontAwesomeIcons.users,
                                            color: Colors.red,
                                          ),
                                          Text(
                                            '150',
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          FaIcon(
                                            FontAwesomeIcons.hourglassStart,
                                            color: Colors.red,
                                          ),
                                          Text(
                                            '2 gün',
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          CircleAvatar(
                                            foregroundImage:
                                                CachedNetworkImageProvider(
                                              "https://aramizdakioyuncu.com/galeri/profilresimleri/42profilresimminnak1689979489.jpg",
                                            ),
                                          ),
                                          Text(
                                            "data",
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
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
        ),
      ],
    );
  }
}
