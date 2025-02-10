import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class RegisterView extends StatelessWidget {
  const RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Column(
          children: [
            CachedNetworkImage(
              imageUrl:
                  "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu.png",
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Adı",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Soyadı",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Kullanıcı Adı",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Parola",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Parola Tekrarı",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "E-Posta",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Ülke",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.textField.costum3(
                controller: TextEditingController(),
                onChanged: (val) {},
                title: "Şehir",
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ARMOYU.widget.elevatedButton.costum1(
                text: "KAYIT OL",
                onPressed: () {},
                loadingStatus: false,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
