import 'package:aramizdakioyuncucom/app/modules/profile/support/meetings/controllers/meetings_controller.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MeetingsView extends StatelessWidget {
  const MeetingsView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(MeetingsController());

    return BodyWidget.custom1(
      context,
      body: [
        Obx(
          () => Padding(
            padding: const EdgeInsets.all(8.0),
            child: ARMOYU.widget.textField.costum3(
              controller: controller.meetingnameController.value,
              onChanged: (val) {
                controller.meetingnameController.refresh();
              },
              title: "Toplantı Seç",
            ),
          ),
        ),
        Obx(
          () => Padding(
            padding: const EdgeInsets.all(8.0),
            child: ARMOYU.widget.textField.costum3(
              controller: controller.meetingdescriptionController.value,
              onChanged: (val) {
                controller.meetingdescriptionController.refresh();
              },
              title: "Toplantı Mazeret Açıklaması",
              minLines: 5,
              minLength: 10,
              maxLength: 500,
            ),
          ),
        ),
        Obx(
          () => Padding(
            padding: const EdgeInsets.all(8.0),
            child: ARMOYU.widget.elevatedButton.costum1(
              text: "Toplantıya Katıl",
              onPressed: () async {
                await controller.meetingfunction();
              },
              loadingStatus: controller.meetingProccess.value,
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Table(
            children: [
              const TableRow(
                children: [
                  Text("Toplantı"),
                  Text("Zaman"),
                  Text("Katılım Durumu"),
                  Text("Katılımcılar"),
                ],
              ),
              ...List.generate(
                10,
                (index) => TableRow(
                  children: [
                    Text("Toplantı $index"),
                    Text("Zaman $index"),
                    Text("Katılım Durumu $index"),
                    const Text("21/34"),
                  ],
                ),
              ),
            ],
          ),
        )
      ],
    );
  }
}
