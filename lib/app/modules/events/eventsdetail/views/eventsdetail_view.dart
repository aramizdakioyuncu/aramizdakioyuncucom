import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/modules/events/eventsdetail/controllers/eventdetail_controller.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/user.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EventsdetailView extends StatelessWidget {
  const EventsdetailView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(
      EventdetailController(),
      tag: Get.parameters['event'],
    );
    return BodyWidget.custom1(
      context,
      bgImage:
          "${APIConstants.storageDomain}/galeri/images/10632orijinal73025orijinal16648332426.jpg"
              .obs,
      body: [
        Row(
          children: [
            Expanded(
              child: Obx(
                () => controller.eventDetail.value == null
                    ? const CupertinoActivityIndicator()
                    : CachedNetworkImage(
                        imageUrl: controller.eventDetail.value!.event.foto,
                        fit: BoxFit.cover,
                      ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Obx(
                () => controller.eventDetail.value == null
                    ? const CupertinoActivityIndicator()
                    : Column(
                        children: [
                          Text(
                            controller.eventDetail.value!.event.date
                                .split(" ")
                                .last,
                            style: const TextStyle(
                                fontSize: 40, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            controller.eventDetail.value!.event.date
                                .split(" ")
                                .first,
                          ),
                        ],
                      ),
              ),
            ),
            Expanded(
              child: Obx(
                () => controller.eventDetail.value == null
                    ? const CupertinoActivityIndicator()
                    : CachedNetworkImage(
                        imageUrl:
                            controller.eventDetail.value!.event.gameBanner,
                        fit: BoxFit.cover,
                      ),
              ),
            ),
          ],
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 1,
                child: Column(
                  children: [
                    const Text("Kurallar"),
                    Obx(
                      () => controller.eventDetail.value == null
                          ? const CupertinoActivityIndicator()
                          : Text(
                              controller.eventDetail.value!.event.rules,
                            ),
                    )
                  ],
                ),
              ),
              Expanded(
                flex: 1,
                child: Column(
                  children: [
                    const Text("Etkinlik Notu"),
                    Obx(
                      () => controller.eventDetail.value == null
                          ? const CupertinoActivityIndicator()
                          : Text(
                              controller.eventDetail.value!.event.description,
                              textAlign: TextAlign.start,
                            ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Obx(
            () => controller.playersList.value == null
                ? const Center(
                    child: CupertinoActivityIndicator(),
                  )
                : Table(
                    columnWidths: const {
                      0: FixedColumnWidth(40),
                      1: FlexColumnWidth(1),
                      2: FixedColumnWidth(100),
                      3: FixedColumnWidth(50),
                      4: FixedColumnWidth(100),
                      5: FixedColumnWidth(50),
                      6: FixedColumnWidth(50),
                      7: FixedColumnWidth(50),
                    },
                    children: [
                      const TableRow(
                        children: [
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Sıra"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text("Adı Soyadı"),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Oyun Yetkisi"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("ODP"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Bilgilendirme"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Ceza"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Uyarı"),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text("Şikayet"),
                            ),
                          ),
                        ],
                      ),
                      ...List.generate(
                        controller.playersList.value!.length,
                        (index) {
                          UserInfo playerInfo =
                              controller.playersList.value![index];
                          return TableRow(
                            children: [
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text((index + 1).toString()),
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Padding(
                                  padding: const EdgeInsets.all(3.0),
                                  child: Row(
                                    children: [
                                      InkWell(
                                        onTap: () {
                                          Functions.gotoPage(
                                            "/oyuncular/${playerInfo.username}",
                                            getnavgiate: true,
                                          );
                                        },
                                        child: CircleAvatar(
                                          foregroundImage:
                                              CachedNetworkImageProvider(
                                            playerInfo.avatar.minURL,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 10),
                                      Text(
                                        playerInfo.displayname,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text(
                                    playerInfo.role.toString(),
                                  ),
                                ),
                              ),
                              const TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text("0"),
                                ),
                              ),
                              const TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text("1 Mail & 1 SMS"),
                                ),
                              ),
                              const TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text("0"),
                                ),
                              ),
                              const TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text("0"),
                                ),
                              ),
                              const TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text("0"),
                                ),
                              ),
                            ],
                          );
                        },
                      )
                    ],
                  ),
          ),
        )
      ],
    );
  }
}
