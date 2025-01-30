import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';

class ControlpanelAnnouncementView extends StatelessWidget {
  const ControlpanelAnnouncementView({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            SizedBox(
              width: 200,
              height: 100,
              child: ListView(
                children: List.generate(
                  50,
                  (index) {
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ListTile(
                        title: Text('Announcement $index'),
                      ),
                    );
                  },
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 200,
                height: 100,
                child: ARMOYU.widget.textField.costum3(
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  title: "Gönderim Türü",
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 200,
                height: 100,
                child: ARMOYU.widget.textField.costum3(
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  title: "Kategori",
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 200,
                height: 100,
                child: ARMOYU.widget.textField.costum3(
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  title: "Kategori Detay",
                ),
              ),
            ),
          ],
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ARMOYU.widget.textField.costum3(
            controller: TextEditingController(),
            onChanged: (val) {},
            title: "Duyuru İçerik",
            minLines: 10,
          ),
        ),
        ARMOYU.widget.elevatedButton.costum2(
          icon: const Icon(Icons.send),
          text: "Gönder",
          onPressed: () {},
          loadingStatus: false,
        ),
      ],
    );
  }
}
