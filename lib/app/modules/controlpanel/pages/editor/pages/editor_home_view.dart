import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EditorHomeView extends StatelessWidget {
  const EditorHomeView({super.key});

  @override
  Widget build(BuildContext context) {
    Rxn<int> selectedIndex = Rxn();

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Column(
                    children: [
                      SizedBox(
                        height: 300,
                        child: ListView(
                          children: List.generate(
                            10,
                            (index) {
                              return Obx(
                                () => ListTile(
                                  selected: selectedIndex.value != null &&
                                      selectedIndex.value == index,
                                  leading: CachedNetworkImage(
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/steam/assetto-corsa.jpg",
                                    width: 50,
                                    height: 50,
                                  ),
                                  title: const Text("Silverstone 1988"),
                                  trailing: const Icon(Icons.error),
                                  onTap: () {
                                    selectedIndex.value = index;
                                  },
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            Expanded(
                              child: ARMOYU.widget.textField.costum3(
                                controller: TextEditingController(),
                                onChanged: (val) {},
                              ),
                            ),
                            ARMOYU.widget.elevatedButton.costum1(
                              text: "Ekle",
                              onPressed: () {},
                              loadingStatus: false,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        CachedNetworkImage(
                          width: double.infinity,
                          imageUrl:
                              "https://aramizdakioyuncu.com/galeri/haritalar/3haritalar1680457553.jpg",
                          fit: BoxFit.cover,
                        ),
                        ARMOYU.widget.elevatedButton.costum1(
                          text: "Güncelle",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        CachedNetworkImage(
                          width: double.infinity,
                          imageUrl:
                              "https://aramizdakioyuncu.com/galeri/haritalar/3haritapist1680457797.jpg",
                          fit: BoxFit.cover,
                        ),
                        ARMOYU.widget.elevatedButton.costum1(
                          text: "Güncelle",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Column(
                    children: [
                      SizedBox(
                        height: 300,
                        child: ListView(
                          children: List.generate(
                            10,
                            (index) {
                              return Obx(
                                () => ListTile(
                                  selected: selectedIndex.value != null &&
                                      selectedIndex.value == index,
                                  leading: CachedNetworkImage(
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/markalar/13markalar1675208419.png",
                                    width: 50,
                                    height: 50,
                                  ),
                                  title: const Text("Nissan"),
                                  trailing: const Icon(Icons.error),
                                  onTap: () {
                                    selectedIndex.value = index;
                                  },
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            Expanded(
                              child: ARMOYU.widget.textField.costum3(
                                controller: TextEditingController(),
                                onChanged: (val) {},
                              ),
                            ),
                            ARMOYU.widget.elevatedButton.costum1(
                              text: "Ekle",
                              onPressed: () {},
                              loadingStatus: false,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Column(
                    children: [
                      SizedBox(
                        height: 300,
                        child: ListView(
                          children: List.generate(
                            10,
                            (index) {
                              return Obx(
                                () => ListTile(
                                  selected: selectedIndex.value != null &&
                                      selectedIndex.value == index,
                                  leading: CachedNetworkImage(
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/ana-yapi/modeller/bilinmeyen-oto.png",
                                    width: 50,
                                    height: 50,
                                  ),
                                  title: const Text("E200"),
                                  trailing: const Icon(Icons.error),
                                  onTap: () {
                                    selectedIndex.value = index;
                                  },
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            Expanded(
                              child: ARMOYU.widget.textField.costum3(
                                controller: TextEditingController(),
                                onChanged: (val) {},
                              ),
                            ),
                            ARMOYU.widget.elevatedButton.costum1(
                              text: "Ekle",
                              onPressed: () {},
                              loadingStatus: false,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        CachedNetworkImage(
                          width: double.infinity,
                          imageUrl:
                              "https://aramizdakioyuncu.com/galeri/markalar/13markalar1675208419.png",
                          fit: BoxFit.cover,
                        ),
                        ARMOYU.widget.elevatedButton.costum1(
                          text: "Güncelle",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        CachedNetworkImage(
                          width: double.infinity,
                          imageUrl:
                              "https://aramizdakioyuncu.com/galeri/ana-yapi/modeller/bilinmeyen-oto.png",
                          fit: BoxFit.cover,
                        ),
                        ARMOYU.widget.elevatedButton.costum1(
                          text: "Güncelle",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
