import 'package:aramizdakioyuncucom/app/modules/shop/shop_addproduct/controllers/shopaddproduct_controller.dart';
import 'package:aramizdakioyuncucom/app/modules/shop/shop_widgets/shopappbar_widget.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ShopaddproductView extends StatelessWidget {
  const ShopaddproductView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ShopaddproductController());
    return BodyWidget.custom1(
      context,
      body: [
        ShopappbarWidget.asa(),
        Container(
          color: Colors.grey,
          height: 200,
          child: Obx(
            () => Row(
              children: controller.visibleCategories
                  .asMap()
                  .entries
                  .map((entry) => buildCategoryColumn(entry.key, entry.value))
                  .toList(),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.gallery
              .mediaList(
                context,
                onMediaUpdated: (onMediaUpdated) {},
              )
              .widget
              .value!,
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            title: "Ürün Başlık",
            onChanged: (val) {},
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            title: "Ürün Açıklaması",
            onChanged: (val) {},
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            title: "Adres",
            onChanged: (val) {},
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            title: "Fiyat",
            type: TextInputType.number,
            onChanged: (val) {},
          ),
        ),
        Row(
          children: [
            Checkbox(
              value: false,
              onChanged: (value) {},
            ),
            const Text("Ücretsiz Kargo")
          ],
        ),
        ARMOYU.widget.elevatedButton.costum1(
          text: "text",
          onPressed: () {},
          loadingStatus: false,
        ),
      ],
    );
  }
}

Widget buildCategoryColumn(int level, List<Map<String, dynamic>> categories) {
  final controller = Get.put(ShopaddproductController());

  return Expanded(
    child: ListView.builder(
      itemCount: categories.length,
      itemBuilder: (context, index) {
        final category = categories[index];
        return Material(
          color: Colors.transparent,
          child: ListTile(
            selected: category['isSelected'],
            title: Text(category['title']),
            onTap: () => controller.selectCategory(level, category),
          ),
        );
      },
    ),
  );
}
