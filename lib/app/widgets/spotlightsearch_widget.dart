import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SpotlightSearchWidget {
  static void showSpotlightDialog(BuildContext context) {
    final searchQuery = ''.obs;
    final filteredItems = <String>[].obs;

    final allItems = [
      "Flutter",
    ];

    debounce(
      searchQuery,
      (value) {
        Functions.performSearch(value, filteredItems);
      }, // Yazmayı bırakınca çalışacak fonksiyon
      time: const Duration(milliseconds: 500),
    );

    void onSearch(String query) {
      searchQuery.value = query;

      filteredItems.value = allItems
          .where((item) => item.toLowerCase().contains(query.toLowerCase()))
          .toList();
    }

    filteredItems.value = allItems; // Başlangıçta tüm elemanları göster

    showDialog(
      context: context,
      barrierDismissible: true,
      builder: (BuildContext context) {
        return Center(
          child: Material(
            type: MaterialType.transparency,
            child: Container(
              padding: const EdgeInsets.all(20),
              width: Get.width * 0.8,
              decoration: BoxDecoration(
                color: Colors.black87,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Sabit TextField
                  TextField(
                    autofocus: true,
                    onChanged: onSearch,
                    decoration: InputDecoration(
                      hintText: "Ara...",
                      prefixIcon: const Icon(Icons.search),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                  ),
                  const SizedBox(height: 10),
                  // Öneriler Listesi
                  Obx(() {
                    if (filteredItems.isEmpty) {
                      return const Text("Sonuç bulunamadı");
                    }
                    return Flexible(
                      child: ListView.builder(
                        shrinkWrap: true,
                        itemCount: filteredItems.length,
                        itemBuilder: (context, index) {
                          return ListTile(
                            title: Text(
                              filteredItems[index],
                              style: const TextStyle(color: Colors.white),
                            ),
                            onTap: () {
                              Navigator.pop(context, filteredItems[index]);
                            },
                          );
                        },
                      ),
                    );
                  }),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
