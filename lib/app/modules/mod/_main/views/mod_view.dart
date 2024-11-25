import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ModView extends StatelessWidget {
  const ModView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 180.0),
          child: Container(
            color: Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    const Spacer(),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.home),
                    ),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.add),
                    ),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.list),
                    ),
                  ],
                ),
                DataTable(
                  showCheckboxColumn: false,
                  dataRowMaxHeight: double.infinity,
                  columns: const [
                    DataColumn(
                      label: Text("Mod Adı"),
                    ),
                    DataColumn(
                      label: Text("Oyun"),
                    ),
                    DataColumn(
                      label: Text("Dosya Boyutu"),
                    ),
                    DataColumn(
                      label: Text("Yükleyen"),
                    ),
                    DataColumn(
                      label: Text("Değerlendirme"),
                    ),
                    DataColumn(
                      label: Text("İndirme/Görüntülenme"),
                    ),
                  ],
                  rows: [
                    DataRow(
                      onSelectChanged: (value) {
                        // Get.toNamed("/modlar/$value");
                        Functions.openUrlWeb("/modlar/$value");
                      },
                      cells: [
                        DataCell(
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Row(
                              children: [
                                CachedNetworkImage(
                                  height: 100,
                                  width: 200,
                                  imageUrl:
                                      "https://aramizdakioyuncu.com/galeri/images/1minnak11652557017.png",
                                  fit: BoxFit.cover,
                                ),
                                const SizedBox(width: 10),
                                const SizedBox(
                                  height: 100,
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        "ETS2 SAVE (100 DLCLİ)",
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color:
                                              Color.fromARGB(255, 10, 145, 241),
                                        ),
                                      ),
                                      Spacer(),
                                      Align(
                                        alignment: Alignment.bottomLeft,
                                        child: Text(
                                          "#ets2 #DLC #save",
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold,
                                            color: Color.fromARGB(
                                                255, 140, 140, 140),
                                          ),
                                          textAlign: TextAlign.start,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        DataCell(
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                CachedNetworkImage(
                                  imageUrl:
                                      "https://aramizdakioyuncu.com/galeri/steam/euro-truck-simulator-2.jpg",
                                ),
                                const Text("Euro Truck Simulator 2"),
                              ],
                            ),
                          ),
                        ),
                        const DataCell(
                          Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                Icon(Icons.insert_drive_file),
                                Text("5,7MB"),
                              ],
                            ),
                          ),
                        ),
                        const DataCell(
                          Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                CircleAvatar(
                                  foregroundImage: CachedNetworkImageProvider(
                                    "https://aramizdakioyuncu.com/galeri/profilresimleri/1profilresimminnak1722033975.jpg",
                                  ),
                                ),
                                Text("Berkay TİKENOĞLU"),
                              ],
                            ),
                          ),
                        ),
                        const DataCell(
                          Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                ),
                                Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                ),
                                Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                ),
                                Icon(
                                  Icons.star,
                                  color: Colors.amber,
                                ),
                                Icon(
                                  Icons.star_half,
                                  color: Colors.amber,
                                ),
                              ],
                            ),
                          ),
                        ),
                        const DataCell(
                          Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Row(
                              children: [
                                Row(
                                  children: [
                                    Icon(Icons.download),
                                    Text("10"),
                                  ],
                                ),
                                Spacer(),
                                Row(
                                  children: [
                                    Icon(Icons.history),
                                    Text("10"),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
