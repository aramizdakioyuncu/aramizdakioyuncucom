import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class EditwritingsView extends StatelessWidget {
  const EditwritingsView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "Başlık",
                      onChanged: (val) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "URL",
                      onChanged: (val) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "İçerik",
                      onChanged: (val) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "Özet",
                      onChanged: (val) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "Kaynak",
                      onChanged: (val) {},
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              width: 220,
              child: Column(
                children: [
                  CachedNetworkImage(
                    height: 100,
                    width: 200,
                    fit: BoxFit.cover,
                    imageUrl:
                        "https://aramizdakioyuncu.com/galeri/yazi/1posterminnak1715776167.jpg",
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "Kategori",
                      onChanged: (val) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ARMOYU.widget.textField.costum3(
                      controller: TextEditingController(),
                      title: "Kategori",
                      onChanged: (val) {},
                    ),
                  ),
                  Wrap(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "Güncelle",
                          onPressed: () {},
                          loadingStatus: false,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ARMOYU.widget.elevatedButton.costum1(
                          text: "Önizle",
                          onPressed: () {},
                          background: Colors.pink,
                          loadingStatus: false,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          ],
        )
      ],
    );
  }
}
