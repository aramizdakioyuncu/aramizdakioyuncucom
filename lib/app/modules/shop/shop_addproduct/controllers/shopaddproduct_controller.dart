import 'package:get/get.dart';

class ShopaddproductController extends GetxController {
  var categories = <Map<String, dynamic>>[
    {
      'title': 'Bilgisayar',
      'subcategories': [
        {
          'title': 'Parçalar',
          'subcategories': [
            {
              'title': 'Ekran Kartı',
              'subcategories': [
                {'title': 'RTX3050', 'isSelected': false},
                {'title': 'RTX3060', 'isSelected': false},
                {'title': 'RTX3070', 'isSelected': false},
              ],
              'isSelected': false,
            },
            {'title': 'İşlemci', 'isSelected': false},
            {'title': 'RAM Bellek', 'isSelected': false},
          ],
          'isSelected': false,
        },
        {'title': 'Direksiyon Seti', 'isSelected': false},
        {'title': 'Vasıta', 'isSelected': false},
      ],
      'isSelected': false,
    },
    {
      'title': 'Bilgisayar Kasası',
      'subcategories': [
        {'title': 'Monitor', 'isSelected': false},
      ],
      'isSelected': false,
    },
  ].obs;

  var visibleCategories = <List<Map<String, dynamic>>>[].obs;

  @override
  void onInit() {
    super.onInit();
    visibleCategories.value = [
      categories,
    ];
  }

  void selectCategory(int level, Map<String, dynamic> category) {
    // Seçilen seviyeye kadar olanları koru
    visibleCategories.value = visibleCategories.sublist(0, level + 1);

    // Diğer tüm kategorilerin seçimini sıfırla
    visibleCategories[level].forEach((item) {
      item['isSelected'] = false;
    });

    // Seçilen kategoriyi işaretle
    category['isSelected'] = true;

    // Seçilen kategorinin alt kategorilerini ekle (varsa)
    if (category['subcategories'] != null) {
      visibleCategories.add(category['subcategories']);
    }

    // UI'yı güncellemek için observable değişkenleri bildir
    visibleCategories.refresh();
  }
}
