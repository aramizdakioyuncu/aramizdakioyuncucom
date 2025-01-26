import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ReportsView extends StatelessWidget {
  const ReportsView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: CachedNetworkImage(
            imageUrl: "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu.png",
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "Konu",
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "Konu",
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "AÇIKLAMA",
            minLines: 5,
            maxLength: 500,
          ),
        ),
        Obx(
          () => Padding(
            padding: const EdgeInsets.all(8.0),
            child: ARMOYU.widget.gallery.mediaList(
              RxList<Media>([]),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.elevatedButton.costum1(
            loadingStatus: false,
            text: "Report",
            onPressed: () async {},
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Table(
            children: [
              const TableRow(
                children: [
                  Text("Şikayet Edilen"),
                  Text("Konu"),
                  Text("Durum"),
                  Text("Tarih"),
                  Text("Sonuç"),
                ],
              ),
              ...List.generate(
                4,
                (index) {
                  return const TableRow(
                    children: [
                      Text("Şikayet Edilen"),
                      Text("Konu"),
                      Text("Durum"),
                      Text("Tarih"),
                      Text("Sonuç"),
                    ],
                  );
                },
              )
            ],
          ),
        )
      ],
    );
  }
}
